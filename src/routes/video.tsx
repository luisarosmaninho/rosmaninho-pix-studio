import { createFileRoute } from "@tanstack/react-router";
import VideoTemplate from "@/components/video/VideoTemplate";

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "Rosmaninho Fotografia — Arquivo Lento" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: VideoPage,
});

function VideoPage() {
  return (
    <div className="w-full h-screen overflow-hidden bg-[#0e0e0d]">
      <VideoTemplate />
    </div>
  );
}
