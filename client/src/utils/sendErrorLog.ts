export const sendErrorLog = (message: string) => {
  fetch(`${process.env.REACT_APP_API_URL}/api/v1/logging/frontendlogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};
