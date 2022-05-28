import counters from './counters';
import { svg, Colors } from './display';
import { helpHTML } from './help';

async function route(req: Request, counters: KVNamespace): Promise<Response> {
  const path = getPathParts(req);

  switch (path[0]) {
    case '':
      return handleIndex(new URL(req.url).hostname);
    case 'count':
      return await handleCount(req, counters);
    case 'show':
      return await handleShow(req, counters);
    case 'test':
      return handleTest(req);
  }

  return new Response('not found', { status: 404 });
}

function getPathParts(req: Request): string[] {
  const url = new URL(req.url);
  return url.pathname.replace(/^\//, '').split('/');
}

function handleIndex(baseURL: string): Response {
  return response(helpHTML(baseURL), 'text/html');
}

async function handleCount(req: Request, ns: KVNamespace): Promise<Response> {
  const forSite = getReferringSite(req) || '';
  const counterName = getPathParts(req)[1] || 'default';
  const count = await counters(ns).inc(`${forSite}:${counterName}`);
  const theme = getColors(req);
  return response(svg('' + count, theme), 'image/svg+xml');
}

async function handleShow(req: Request, ns: KVNamespace): Promise<Response> {
  const forSite = getReferringSite(req) || '';
  const counterName = getPathParts(req)[1] || 'default';
  const count = await counters(ns).get(`${forSite}:${counterName}`);
  const theme = getColors(req);
  return response(svg('' + count, theme), 'image/svg+xml');
}

function handleTest(req: Request): Response {
  const text = getText(req) || '4711';
  const theme = getColors(req);
  if (100 < text.length) {
    const statusText = 'only numbers below a googol are supported';
    return new Response(statusText, { status: 400, statusText })
  }
  return response(svg(text, theme), 'image/svg+xml');
}

function getText(req: Request): string {
  return new URL(req.url).searchParams.get('text') || '';
}

function getColors(req: Request): Colors {
  const url = new URL(req.url);
  const on = url.searchParams.get('on') || 'orangered';
  const bg = url.searchParams.get('bg') || 'black';
  const off = url.searchParams.get('off') || bg;
  const gaps = url.searchParams.get('gaps') || bg;
  return { bg, gaps, on, off };
}

function getReferringSite(req: Request): string | null {
  const referer = req.headers.get('Referer');
  if (!referer) {
    return null;
  }
  try {
    return new URL(referer).hostname;
  } catch {
    console.warn('bad referer: ', referer);
  }

  return null;
}

function response(body: string, contentType: string): Response {
  return new Response(body, { headers: { 'content-type': contentType } });
}

export default {
  async fetch(req: Request, env: any): Promise<Response> {
    return route(req, env['COUNTERS']);
  },
};
