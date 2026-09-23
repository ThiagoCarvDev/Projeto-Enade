const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:8080';

export const dynamic = 'force-dynamic';

async function proxy(request: Request, context: { params: Promise<{ path: string[] }> }) {
    const { path } = await context.params;
    const incomingUrl = new URL(request.url);
    const targetUrl = `${BACKEND_URL}/api/${path.join('/')}${incomingUrl.search}`;
    const headers = new Headers(request.headers);

    headers.delete('host');
    headers.delete('origin');
    headers.delete('referer');
    headers.delete('content-length');

    const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer();
    const response = await fetch(targetUrl, {
        method: request.method,
        headers,
        body,
        cache: 'no-store',
    });

    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete('transfer-encoding');
    responseHeaders.delete('content-encoding');

    return new Response(response.body, {
        status: response.status,
        headers: responseHeaders,
    });
}

export const GET = proxy;
export const HEAD = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;