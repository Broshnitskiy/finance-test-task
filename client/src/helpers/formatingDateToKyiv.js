export function convertUtcToKyivTime(utcDateString) {
  const kievOffset = 3; // UTC+3, це залежить від поточного часового поясу Києва
  const utcDate = new Date(utcDateString);
  const kievDate = new Date(utcDate.getTime() + kievOffset * 60 * 60 * 1000);

  const day = kievDate.getDate().toString().padStart(2, '0');
  const month = (kievDate.getMonth() + 1).toString().padStart(2, '0');
  const year = kievDate.getFullYear().toString();

  const hours = kievDate.getHours().toString().padStart(2, '0');
  const minutes = kievDate.getMinutes().toString().padStart(2, '0');
  const seconds = kievDate.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
