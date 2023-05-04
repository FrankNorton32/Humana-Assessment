import { buildRowAndAppend, clearTableRows } from "./tableUtils";

describe("buildRowAndAppend", () => {
  let cells: HTMLTableCellElement[] = [];
  let table: HTMLTableElement;
  let rowAttributes: { className?: string; id?: string };

  beforeEach(() => {
    cells = [
      document.createElement("td"),
      document.createElement("td"),
      document.createElement("td"),
    ];
    table = document.createElement("table");
    rowAttributes = { className: "row-class", id: "row-id" };
  });

  it("creates tr, appends cells, then appends row to table", () => {
    buildRowAndAppend(cells, table, rowAttributes);

    const rows = table.getElementsByTagName("tr");
    expect(rows.length).toBe(1);

    const row = rows[0];
    expect(row.tagName).toBe("TR");
    expect(row.className).toBe(rowAttributes.className);
    expect(row.id).toBe(rowAttributes.id);

    const rowCells = row.getElementsByTagName("td");
    expect(rowCells.length).toBe(cells.length);
    expect(rowCells[0]).toBe(cells[0]);
    expect(rowCells[1]).toBe(cells[1]);
    expect(rowCells[2]).toBe(cells[2]);
  });

  it("appends a row with no attributes if rowAttributes is not provided", () => {
    buildRowAndAppend(cells, table);

    const rows = table.getElementsByTagName("tr");
    expect(rows.length).toBe(1);

    const row = rows[0];
    expect(row.tagName).toBe("TR");
    expect(row.className).toBe("");
    expect(row.id).toBe("");

    const rowCells = row.getElementsByTagName("td");
    expect(rowCells.length).toBe(cells.length);
    expect(rowCells[0]).toBe(cells[0]);
    expect(rowCells[1]).toBe(cells[1]);
    expect(rowCells[2]).toBe(cells[2]);
  });

  it("does not append a row if cells is empty", () => {
    buildRowAndAppend([], table, rowAttributes);

    const rows = table.getElementsByTagName("tr");
    expect(rows.length).toBe(0);
  });
});

describe("clearTableRows", () => {
  let table: HTMLTableElement;
  let rows: HTMLTableRowElement[];

  beforeEach(() => {
    table = document.createElement("table");
    rows = [
      document.createElement("tr"),
      document.createElement("tr"),
      document.createElement("tr"),
    ];
    rows.forEach((row) => table.appendChild(row));
  });

  it("removes all rows from the table", () => {
    expect(table.getElementsByTagName("tr").length).toBe(rows.length);

    clearTableRows(table);

    expect(table.getElementsByTagName("tr").length).toBe(0);
  });

  it("does nothing if the table has no rows", () => {
    clearTableRows(table);

    expect(table.getElementsByTagName("tr").length).toBe(0);
  });
});
