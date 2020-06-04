/**
 *
 * @param {Error} error
 * @param {number} status
 */
export function wrapError(error, status = 500) {
  return {
    status: {
      http: status,
      message: error.message || "Internal server error",
    },
  };
}

/**
 *
 * @param {any} result
 * @param {any} query
 */
export function wrapResponse(result, query) {
  if (result) {
    return {
      data: result,
      query,
      status: { http: 200, message: "Success" },
    };
  } else {
    return wrapError(new Error("Not found"), 400);
  }
}
