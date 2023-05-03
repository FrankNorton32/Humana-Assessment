const monthLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const setCurrentDateLabel = (date: Date) => {
  const dateLabel = document.getElementById("current-date");
  if (dateLabel)
    dateLabel.textContent = date.toLocaleString("en-US").split(",")[0];
};
const setCurrentMonthLabel = (monthIndex: number) => {
  const monthLabel = document.getElementById("current-month");
  if (monthLabel) monthLabel.textContent = monthLabels[monthIndex];
};
const setCurrentYearLabel = (year: number) => {
  const yearLabel = document.getElementById("current-year");
  if (yearLabel) yearLabel.textContent = year.toString();
};

export {
  monthLabels,
  setCurrentDateLabel,
  setCurrentMonthLabel,
  setCurrentYearLabel,
};
