import "./style.css";
import { buildCalendarTable } from "./utils/tableUtils";
import {
  nextAvailableDate,
  setCurrentDateLabel,
  setCurrentMonthLabel,
  setCurrentYearLabel,
} from "./utils/dateUtils";
import { createCalendarPopper, hideShowCalendar } from "./utils/dialogUtils";
import { buildYearSelector } from "./components/yearPicker";

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectedDate = today;
let showCalendar = false;
const blockedDates: string[] = []; // as dateString
const calendarTable = document.getElementById(
  "calendar-table"
) as HTMLTableElement;

export const isSelectedDate = (date: Date) =>
  selectedDate.toDateString() === date.toDateString();

export const isBlockedDate = (date: Date) =>
  blockedDates.includes(date.toDateString());

export const handleCalendarDateClick = (dayOfMonth: number) => {
  const dateCell = document.getElementById(`calDay-${dayOfMonth}`);
  if (!dateCell) return;
  if (dateCell.className === "active-date") {
    const newDate = new Date(currentYear, currentMonth, dayOfMonth);
    selectedDate = newDate;
    setCurrentDateLabel(selectedDate);

    const formerSelected = document.getElementsByClassName("selected-date");
    if (formerSelected)
      for (let i = 0; i < formerSelected.length; i++) {
        const element = formerSelected[i] as HTMLElement;
        element.classList.replace("selected-date", "active-date");
      }
    dateCell.className = "selected-date";
  } else if (dateCell.className === "selected-date") {
    blockedDates.push(
      new Date(currentYear, currentMonth, dayOfMonth).toDateString()
    );
    dateCell.className = "blocked-date";
    const newDate = nextAvailableDate(blockedDates, selectedDate);
    selectedDate = newDate;
    if (newDate.getMonth() !== currentMonth) {
      currentMonth = newDate.getMonth();
      setCurrentMonthLabel(currentMonth);
    }
    if (newDate.getFullYear() !== currentYear) {
      currentYear = newDate.getFullYear();
      setCurrentYearLabel(currentYear);
    }
    setCurrentDateLabel(selectedDate);
    buildCalendarTable(currentMonth, currentYear, calendarTable);
  } else {
    const blockedIndex = blockedDates.indexOf(
      new Date(currentYear, currentMonth, dayOfMonth).toDateString()
    );
    blockedIndex && blockedDates.splice(blockedIndex, 1);
    dateCell.className = "active-date";
  }
};

document
  .getElementById("active-date-wrapper")
  ?.addEventListener("click", () => {
    showCalendar = !showCalendar;
    hideShowCalendar(showCalendar);
  });

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

setCurrentDateLabel(selectedDate);
setCurrentMonthLabel(currentMonth);
setCurrentYearLabel(currentYear);
buildYearSelector(currentYear);
buildCalendarTable(currentMonth, currentYear, calendarTable);
createCalendarPopper();
hideShowCalendar(showCalendar);
