import { postToken } from './auth';

const SERVER_BASE_URL = process.env.REACT_APP_API_SERVER_BASE_URL || '';

const USER_NAME = process.env.REACT_APP_USER_NAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;

interface Options {
  body?: unknown;
  rule?: string;
  signal?: AbortSignal;
  contentType?: string;
  fileOpenKbn?: 'download' | 'open_new_tab';
  header?: Record<string, string>;
}

const globalHeader = new Map<string, string>();

export const addGlobalHeader = (key: string, value: string): void => {
  globalHeader.set(key, value);
};

export const removeGlobalHeader = (key: string): void => {
  globalHeader.delete(key);
};

async function request<T>(
  path: string,
  method: string,
  { body, contentType = 'application/json', header = {} }: Options = {},
  rule = 'admin',
  fileOpenKbn = ''
): Promise<T> {
  const url = `${SERVER_BASE_URL}${path}`;

  const fetchOption: RequestInit = {
    method,
    redirect: 'follow',
  };
  const headers: Record<string, string> = {
    ...Object.fromEntries(globalHeader.entries()),
    ...header,
  };

  if (contentType !== 'multipart/form-data') {
    headers['Content-Type'] = contentType;
  }

  if (body !== undefined) {
    fetchOption.body = JSON.stringify(body);
  }

  if (body instanceof FormData) {
    fetchOption.body = body;
  }

  if (rule !== 'admin') {
    headers['Authorization'] = `Basic ${btoa(USER_NAME + ':' + PASSWORD)}`;
  }

  let response = await fetch(url, { ...fetchOption, headers });

  // Re-fetch if token timeout
  if (response.status === 401) {
    const resp = await postToken(globalHeader);
    headers['Authorization'] = resp.data.token;
    response = await fetch(url, { ...fetchOption, headers });
  }

  const disposition = response.headers.get('Content-Disposition');
  if (disposition && disposition.indexOf('attachment') !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      const response2 = response.clone();
      const fileName = decodeURIComponent(matches[1].replace(/['"]/g, ''));
      const blob = await response2.blob();
      const regex = /.(jpg|jpeg|png|pdf)$/g;
      const preview = regex.test(fileName.toLowerCase());
      // Preview filenames ending in .jpg|.jpeg|.png|.pdf in a new tab
      if (fileOpenKbn === 'open_new_tab' && preview) {
        const file = new Blob([blob], {
          type: fileName.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
        });
        window.open(URL.createObjectURL(file), fileName);
        return { result: '0' } as T;
      }

      const fileTag = document.createElement('a');
      fileTag.href = URL.createObjectURL(blob);
      fileTag.download = fileName;
      fileTag.click();
      // Return because the current File doesn't have JSON format
      return { result: '0' } as T;
    }
  }

  const json = await response.json();
  return json;
}

export async function post<T>(
  path: string,
  rule?: string,
  body?: unknown,
  signal?: AbortSignal,
  contentType?: string,
  fileOpenKbn?: 'download' | 'open_new_tab'
): Promise<T> {
  return request(path, 'POST', { body, signal, contentType, fileOpenKbn }, rule);
}

export async function get<T>(
  path: string,
  rule?: string,
  headers: Record<string, string> = {},
  signal?: AbortSignal
): Promise<T> {
  return request(path, 'GET', { signal, header: headers }, rule);
}

export async function put<T>(
  path: string,
  body: unknown,
  rule?: string,
  signal?: AbortSignal,
  contentType?: string
): Promise<T> {
  return request(path, 'PUT', { body, signal, contentType }, rule);
}

export async function del<T>(path: string, rule?: string, signal?: AbortSignal): Promise<T> {
  return request(path, 'DELETE', { signal });
}

export const excludeInvalidValues = (entries: [string, string | undefined | null][]): Record<string, string> => {
  return entries.reduce<Record<string, string>>((pre, [key, value]) => {
    if (value !== undefined && value !== null) {
      pre[key] = String(value);
    }
    return pre;
  }, {});
};
export interface HelmetProps {
  property: string;
  content: string;
}
export interface AbstractResponse {
  statusCode: number;
  message: string;
  seoHelmet?: HelmetProps[];
}
