import { getToken } from "./client-token";

type Method = 'GET'|'DELETE'|'POST'|'PATCH'|'PUT';
type Headers = Record<string, string>;

async function maybeDecodeJSON<RET = any>(response: Response): Promise<RET> {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    // If server says the content type is JSON, then decode it like JSON
    return await response.json();
  } else {
    // Otherwise don't!
    const textContent = await response.text();
    console.warn(`Got non-JSON response from API: `, textContent);
    return textContent as unknown as RET;
  }
}

async function doRequest<RET = any>(
    method: Method,
    path: string,
    bodyData: unknown|null = null
): Promise<RET> {
  const authToken = getToken();

  const body = bodyData ? JSON.stringify(bodyData) : null;
  const contentHeaders: Headers = bodyData ? { 'Content-Type': 'application/json' } : {};
  const authHeaders: Headers = authToken ? { 'Authorization': `Bearer ${authToken}` } : {};
  const headers = { ...contentHeaders, ...authHeaders };

  const response = await fetch(path, { method, body, headers });

  return maybeDecodeJSON(response);
}

export function apiGet<RET = any>(path: string): Promise<RET> {
    return doRequest<RET>('GET', path);
}

export function apiDelete<RET = any>(path: string): Promise<RET> {
    return doRequest<RET>('DELETE', path);
}

export function apiPost<RET = any>(path: string, body: unknown): Promise<RET> {
    return doRequest<RET>('POST', path, body);
}

export function apiPatch<RET = any>(path: string, body: unknown): Promise<RET> {
    return doRequest<RET>('PATCH', path, body);
}

export function apiPut<RET = any>(path: string, body: unknown): Promise<RET> {
    return doRequest<RET>('PUT', path, body);
}
