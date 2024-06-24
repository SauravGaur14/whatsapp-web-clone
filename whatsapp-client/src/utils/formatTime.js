export default function formatTime(dateStr) {
  const date = new Date(dateStr);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  // Determine AM or PM
  const ampm = hours >= 12 ? "pm" : "am";

  // Convert to 12-hour format
  if (hours > 12) hours = hours - 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Pad hours with leading zero if necessary
  const formattedHours = String(hours).padStart(2, "0");

  // Construct the formatted time string
  return `${formattedHours}:${minutes} ${ampm}`;
}
