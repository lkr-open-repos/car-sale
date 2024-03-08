export const sendErrorLog = async (message: string) => {
  try {
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}api/v1/logging/frontendlogs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );
  } catch (error) {
    // Just to avoid crash. Not much to do if error logging can't be done.
  }
};
