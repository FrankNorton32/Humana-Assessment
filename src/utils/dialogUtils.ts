import { createPopper } from "@popperjs/core";

const dateDisplay = document.querySelector(
  "#active-date-wrapper"
) as HTMLElement;
const datepickerDialog = document.querySelector(
  "#datepicker-dialog-wrapper"
) as HTMLElement;

export const createCalendarPopper = () =>
  createPopper(dateDisplay, datepickerDialog, {
    placement: "bottom-start",
  });

export const hideShowCalendar = (showCalendar: boolean) => {
  const calendar = document.getElementById("datepicker-dialog-wrapper");
  if (calendar) calendar.style.display = showCalendar ? "inline" : "none";
};
