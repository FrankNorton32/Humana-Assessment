import "./style.css";
import { buildCalendarTable } from "./tableUtils";
import {
  setCurrentDateLabel,
  setCurrentMonthLabel,
  setCurrentYearLabel,
} from "./dateUtils";

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let activeDate = today;

export const handleCalendarDateClick = (dayOfMonth: number) => {
  console.log("handleCalendarDateClick");
  const newDate = new Date(currentYear, currentMonth, dayOfMonth);
  activeDate = newDate;
  setCurrentDateLabel(activeDate);
};

const calendarTable = document.getElementById(
  "calendar-table"
) as HTMLTableElement;

document.getElementById("prev-month")?.addEventListener("click", () => {
  if (currentMonth === 0) {
    currentYear--;
    setCurrentYearLabel(currentYear);
    currentMonth = 11;
  } else {
    currentMonth--;
  }
  setCurrentMonthLabel(currentMonth);
  buildCalendarTable(currentMonth, currentYear, calendarTable);
});

document.getElementById("next-month")?.addEventListener("click", () => {
  if (currentMonth === 11) {
    currentYear++;
    setCurrentYearLabel(currentYear);
    currentMonth = 0;
  } else {
    currentMonth++;
  }
  setCurrentMonthLabel(currentMonth);
  buildCalendarTable(currentMonth, currentYear, calendarTable);
});

setCurrentDateLabel(activeDate);
setCurrentMonthLabel(currentMonth);
setCurrentYearLabel(currentYear);
buildCalendarTable(currentMonth, currentYear, calendarTable);
