export function getErrorMessage(error: unknown, fallback = "Failed to update") {
  return error instanceof Error ? error.message : fallback;
}
