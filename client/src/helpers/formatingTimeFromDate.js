export function getTimeFromDate(dateString) {
  const date = new Date(dateString);
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const time = `${hour.toString().padStart(2, '0')}:${minute
    .toString()
    .padStart(2, '0')}`;
  return time;
}
