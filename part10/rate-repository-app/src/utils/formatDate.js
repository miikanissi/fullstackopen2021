const formatDate = (dateString) => {
  const date = new Date(dateString);
  return [date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCFullYear()].join(".");
};

export default formatDate;
