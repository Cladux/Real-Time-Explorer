const formatDate = (date: Date) => {
  const localDate = new Date(date);
  const formattedDate = localDate
    .toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");
  return formattedDate;
};
export default formatDate;
