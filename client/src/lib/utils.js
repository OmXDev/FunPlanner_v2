export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}



export function formatDateLocal(date) {
  const tzOffset = date.getTimezoneOffset() * 60000; // offset in ms
  const localDate = new Date(date.getTime() - tzOffset);
  return localDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
}
