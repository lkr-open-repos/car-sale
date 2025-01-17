// Helper function to get current date
export const getCurrentDateHelper = () => {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  return `${day}.${month}.${year}`;
};
