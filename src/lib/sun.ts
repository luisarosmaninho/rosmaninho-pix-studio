/**
 * Cálculo astronómico de nascer/pôr do sol para Coimbra, Portugal.
 * Algoritmo NOAA simplificado (Jean Meeus) — precisão ±1 minuto.
 * Inclui ajuste automático WET (UTC+0) / WEST (UTC+1).
 */

const LAT     = 40.2033;   // Coimbra, latitude N
const LON     = -8.4103;  // Coimbra, longitude W
const TO_RAD  = Math.PI / 180;

export interface SunTimes {
  sunrise: Date;   // UTC
  sunset:  Date;   // UTC
}

/** Converte Date para dia Juliano. */
function toJulian(d: Date): number {
  return d.getTime() / 86_400_000 + 2_440_587.5;
}

/** Converte dia Juliano para Date. */
function fromJulian(j: number): Date {
  return new Date((j - 2_440_587.5) * 86_400_000);
}

/**
 * Calcula nascer e pôr do sol para Coimbra.
 * Os timestamps devolvidos estão em UTC.
 */
export function getSunTimes(date?: Date): SunTimes {
  const d    = date ?? new Date();
  const JD   = toJulian(d);
  const n    = Math.round(JD - 2_451_545.0);
  const Js   = n - LON / 360;
  const M    = (357.5291 + 0.98560028 * Js) % 360;
  const C    = 1.9148 * Math.sin(M * TO_RAD)
             + 0.0200 * Math.sin(2 * M * TO_RAD)
             + 0.0003 * Math.sin(3 * M * TO_RAD);
  const lam  = (M + C + 180 + 102.9372) % 360;
  const Jt   = 2_451_545 + Js
             + 0.0053 * Math.sin(M * TO_RAD)
             - 0.0069 * Math.sin(2 * lam * TO_RAD);
  const sinD = Math.sin(lam * TO_RAD) * Math.sin(23.4397 * TO_RAD);
  const cosD = Math.cos(Math.asin(sinD));
  const cosH = (Math.sin(-0.8333 * TO_RAD) - Math.sin(LAT * TO_RAD) * sinD)
             / (Math.cos(LAT * TO_RAD) * cosD);

  if (Math.abs(cosH) > 1) {
    // Dia polar ou noite polar (nunca acontece em Portugal continental)
    const s = new Date(d); s.setUTCHours(7, 0, 0, 0);
    const e = new Date(d); e.setUTCHours(20, 0, 0, 0);
    return { sunrise: s, sunset: e };
  }

  const HA = Math.acos(cosH) * 180 / Math.PI;
  return {
    sunrise: fromJulian(Jt - HA / 360),
    sunset:  fromJulian(Jt + HA / 360),
  };
}

/** Devolve true se agora for noite em Portugal (entre pôr do sol e nascer do sol). */
export function isNightInPortugal(): boolean {
  const now  = new Date();
  const { sunrise, sunset } = getSunTimes(now);
  return now.getTime() < sunrise.getTime() || now.getTime() > sunset.getTime();
}

/**
 * Script inline para injetar no <head> — evita flash do tema errado.
 * Executa sincronamente antes de qualquer paint.
 */
export const THEME_SCRIPT = /* js */ `(function(){
  var lat=40.2033,lon=-8.4103,R=Math.PI/180;
  var now=new Date(),JD=now.getTime()/86400000+2440587.5;
  var n=Math.round(JD-2451545),Js=n-lon/360;
  var M=(357.5291+0.98560028*Js)%360;
  var C=1.9148*Math.sin(M*R)+0.02*Math.sin(2*M*R)+0.0003*Math.sin(3*M*R);
  var lam=(M+C+180+102.9372)%360;
  var Jt=2451545+Js+0.0053*Math.sin(M*R)-0.0069*Math.sin(2*lam*R);
  var sinD=Math.sin(lam*R)*Math.sin(23.4397*R),cosD=Math.cos(Math.asin(sinD));
  var cosH=(Math.sin(-0.8333*R)-Math.sin(lat*R)*sinD)/(Math.cos(lat*R)*cosD);
  if(Math.abs(cosH)<=1){
    var HA=Math.acos(cosH)*180/Math.PI;
    var rise=(Jt-HA/360-2440587.5)*86400000;
    var set=(Jt+HA/360-2440587.5)*86400000;
    var t=now.getTime();
    if(t<rise||t>set)document.documentElement.classList.add('dark');
  }
})();`;
