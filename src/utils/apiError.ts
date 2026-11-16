/**
 * Pull a readable message from RTK Query / fetch errors.
 */
export function getApiErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (!error) return fallback;

  if (typeof error === 'string' && error.trim()) return error;

  if (error instanceof Error && error.message) {
    return error.message;
  }

  const err = error as {
    data?: { message?: string; error?: string; errors?: Array<{ message?: string }> };
    error?: string;
    message?: string;
    status?: number | string;
  };

  if (err?.data?.message && typeof err.data.message === 'string') {
    return err.data.message;
  }
  if (err?.data?.error && typeof err.data.error === 'string') {
    return err.data.error;
  }
  if (Array.isArray(err?.data?.errors) && err.data.errors[0]?.message) {
    return String(err.data.errors[0].message);
  }
  if (err?.error && typeof err.error === 'string' && err.error !== 'FETCH_ERROR') {
    return err.error;
  }
  if (err?.message && typeof err.message === 'string') {
    return err.message;
  }
  if (err?.status === 'FETCH_ERROR') {
    return 'Cannot reach the server. Check your connection and try again.';
  }

  return fallback;
}
