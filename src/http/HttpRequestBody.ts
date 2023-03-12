type HttpRequestBody =
  | Blob
  | BufferSource
  | FormData
  | URLSearchParams
  | string
  | Document
  | null
  | undefined;

export type { HttpRequestBody };
