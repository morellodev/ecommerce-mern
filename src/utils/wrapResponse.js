export function wrapResponse(result, query) {
  if (result) {
    return {
      data: result,
      query,
      status: { http: 200, message: "Success" },
    };
  } else {
    return {
      query,
      status: { http: 400, message: "Not found" },
    };
  }
}
