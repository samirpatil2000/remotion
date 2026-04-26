import type { Plugin } from "vite";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { randomUUID } from "crypto";
import type { IncomingMessage, ServerResponse } from "http";

type JobStatus = {
  progress: number;
  status: string;
  done: boolean;
  error?: string;
  outputPath?: string;
};

const jobs = new Map<string, JobStatus>();
let bundleCache: string | null = null;

async function startRender(
  renderId: string,
  compositionId: string,
  props: Record<string, unknown>
) {
  try {
    const { bundle } = await import("@remotion/bundler");
    const { enableTailwind } = await import("@remotion/tailwind-v4");
    const { renderMedia, selectComposition } = await import(
      "@remotion/renderer"
    );

    if (!bundleCache) {
      jobs.set(renderId, {
        progress: 5,
        status: "Bundling composition...",
        done: false,
      });
      bundleCache = await bundle({
        entryPoint: path.resolve("./src/index.ts"),
        webpackOverride: enableTailwind,
      });
    }

    jobs.set(renderId, {
      progress: 15,
      status: "Loading composition...",
      done: false,
    });

    const comp = await selectComposition({
      serveUrl: bundleCache,
      id: compositionId,
      inputProps: props,
    });

    jobs.set(renderId, {
      progress: 20,
      status: "Rendering frames...",
      done: false,
    });

    const outputPath = path.join(os.tmpdir(), `${renderId}.mp4`);

    await renderMedia({
      composition: comp,
      serveUrl: bundleCache,
      codec: "h264",
      outputLocation: outputPath,
      inputProps: props,
      onProgress: ({ progress }) => {
        const pct = Math.round(20 + progress * 78);
        jobs.set(renderId, {
          progress: pct,
          status:
            pct < 60
              ? "Rendering frames..."
              : pct < 90
              ? "Encoding video..."
              : "Finalizing...",
          done: false,
        });
      },
    });

    jobs.set(renderId, {
      progress: 100,
      status: "Done!",
      done: true,
      outputPath,
    });
  } catch (e) {
    jobs.set(renderId, {
      progress: 0,
      status: "Render failed",
      done: true,
      error: String(e),
    });
  }
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export function remotionRenderPlugin(): Plugin {
  return {
    name: "remotion-render",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(
        async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
          const url = new URL(req.url!, "http://localhost");
          const p = url.pathname;

          // POST /api/render
          if (req.method === "POST" && p === "/api/render") {
            try {
              const body = await readBody(req);
              const { compositionId, props } = JSON.parse(body);
              const renderId = randomUUID();
              jobs.set(renderId, {
                progress: 0,
                status: "Starting...",
                done: false,
              });
              startRender(renderId, compositionId, props ?? {});
              json(res, 200, { renderId });
            } catch {
              json(res, 400, { error: "Bad request" });
            }
            return;
          }

          // GET /api/render/progress/:id
          const progMatch = p.match(/^\/api\/render\/progress\/([^/]+)$/);
          if (req.method === "GET" && progMatch) {
            const job = jobs.get(progMatch[1]);
            if (!job) return json(res, 404, { error: "Not found" });
            json(res, 200, job);
            return;
          }

          // GET /api/render/download/:id
          const dlMatch = p.match(/^\/api\/render\/download\/([^/]+)$/);
          if (req.method === "GET" && dlMatch) {
            const job = jobs.get(dlMatch[1]);
            if (!job?.done || !job.outputPath || !fs.existsSync(job.outputPath)) {
              return json(res, 404, { error: "Not ready" });
            }
            const stat = fs.statSync(job.outputPath);
            res.statusCode = 200;
            res.setHeader("Content-Type", "video/mp4");
            res.setHeader(
              "Content-Disposition",
              'attachment; filename="video.mp4"'
            );
            res.setHeader("Content-Length", stat.size);
            fs.createReadStream(job.outputPath).pipe(res);
            return;
          }

          next();
        }
      );
    },
  };
}
