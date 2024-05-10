export const isBeforeToday = (d) => {
  let date = new Date(d)
  // Get today's date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Convert both dates to milliseconds since epoch (1970-01-01)
  const dateInMilliseconds = date.getTime();
  const todayInMilliseconds = today.getTime();

  // Check if the input date is less than today's date
  return dateInMilliseconds < todayInMilliseconds;
};
