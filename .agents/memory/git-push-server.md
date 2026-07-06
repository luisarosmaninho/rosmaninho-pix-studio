---
name: Git push from server
description: How to safely run git commands from a server function in this app
---

# Git push from server function

## The rule
Always use `spawnSync` with an argument array, never `execSync` with shell string interpolation. Shell interpolation is RCE risk even when sanitizing quotes.

**Correct:**
```typescript
const { spawnSync } = await import("child_process");
const opts = { cwd: process.cwd(), stdio: "pipe" as const };
const run = (cmd: string, args: string[]) => {
  const r = spawnSync(cmd, args, opts);
  if (r.status !== 0) throw new Error((r.stderr?.toString() ?? "").slice(0, 300) || `${cmd} failed`);
};
run("git", ["commit", "--allow-empty", "-m", userMessage]);
```

**Wrong:**
```typescript
execSync(`git commit -m "${userMessage}"`, ...); // RCE risk
```

## Why
Shell metacharacters (backticks, `$(...)`, `&`, `;`) still execute inside double-quoted strings. Replacing `"` with `'` is insufficient. spawnSync with shell:false (default) bypasses the shell entirely.

## How to apply
Any server fn that takes user-supplied strings and passes them to system commands must use spawnSync/execFile with arg arrays.
