interface ErrorResponse extends Error {
  statusCode?: number;
}

interface CustomRequest extends Request {
  headers: {
    authorization?: string;
  };
}
