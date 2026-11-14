import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

export const dynamic = 'force-dynamic';

// Created lazily so the site still builds/deploys before the GitHub App env vars are set in Vercel.
type Handler = (req: Request) => Promise<Response>;
let handler: { GET: Handler; POST: Handler } | null = null;
const githubMode = config.storage.kind === 'github';
const missing = () => ['KEYSTATIC_GITHUB_CLIENT_ID', 'KEYSTATIC_GITHUB_CLIENT_SECRET', 'KEYSTATIC_SECRET'].filter((k) => !process.env[k]);

function get() {
  if (githubMode && missing().length) return null;
  return (handler ??= makeRouteHandler({ config }) as { GET: Handler; POST: Handler });
}
const notConfigured = () => Response.json(
  { error: 'Keystatic GitHub login is not configured yet', missingEnv: missing() }, { status: 503 });

export async function GET(req: Request) { const h = get(); return h ? h.GET(req) : notConfigured(); }
export async function POST(req: Request) { const h = get(); return h ? h.POST(req) : notConfigured(); }
