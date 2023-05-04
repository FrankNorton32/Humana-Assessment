import { setCurrentYearLabel } from "../utils/dateUtils";

export const buildYearSelector = (currentYear: number) => {
  const button = document.getElementById(
    "year-selector-button"
  ) as HTMLButtonElement;
  const menu = document.getElementById("year-selector-menu");
  if (!menu) return;
  for (let year = 1900; year <= 2100; year++) {
    const option = document.createElement("li");
    option.value = year;
    option.textContent = year.toString();
    // if (year === new Date().getFullYear()) {
    //   option.selected = true;
    // }
    menu.appendChild(option);
  }

  if (button)
    button.addEventListener("click", () => {
      menu?.classList.toggle("active");
    });

  if (menu)
    menu.addEventListener("click", (event) => {
      const selectedOption = (event.target as HTMLElement).textContent;
      currentYear = Number(selectedOption);
      setCurrentYearLabel(currentYear);
    });
};
