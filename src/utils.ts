export const response = (statusCode: number, data = {}) => {
  return {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    }
  };
};
