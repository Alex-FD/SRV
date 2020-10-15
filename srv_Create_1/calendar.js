function Calendar() {
  this.dayNames = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  this.monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  this.date = new Date();
  this.currentYear = this.date.getFullYear();
  this.currentMonth = this.date.getMonth();
}
Calendar.prototype.monthData = function (month, year) {
  return {
    year: year,
    month: month,
    getNumberOfDays: function () {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    getDayNumber: function (day) {
      return new Date(this.year, this.month, day).getDay();
    },
  };
};

Calendar.prototype.matchMonthName = function (monthNumber) {
  for (let i = 0; i < this.monthNames.length; i++) {
    if (i === monthNumber) {
      return this.monthNames[i];
    }
  }
};
Calendar.prototype.createMonthNameWrap = function (monthData) {
  let div = document.createElement("div");
  div.classList.add("month-container");
  let span = document.createElement("span");
  span.classList.add("month-name");
  span.innerHTML =
    "&nbsp;" + this.matchMonthName(monthData.month) + "&nbsp;" + monthData.year;
  div.appendChild(span);
  return div;
};
Calendar.prototype.createMonthThead = function () {
  let thead = document.createElement("thead");
  thead.classList.add("calendar-header");
  let tr = document.createElement("tr");
  tr.classList.add("month-row");

  for (let i = 0; i < this.dayNames.length; i++) {
    let th = document.createElement("th");
    th.innerHTML = this.dayNames[i];
    tr.appendChild(th);
    if (i === 6 || i === 5) {
      th.style.color = "#fe5e5e";
    }
  }
  thead.appendChild(tr);
  return thead;
};
Calendar.prototype.placeDaysInCells = function (monthData, tbody) {
  let day = 1;
  let daysCount = monthData.getNumberOfDays();
  while (day <= daysCount) {
    let weekRow = document.createElement("tr");
    for (let i = 0; i < 7; i++) {
      if (monthData.getDayNumber(day - 1) === i) {
        let cell = document.createElement("td");
        if (i === 6 || i === 5) {
          cell.setAttribute("data-weekend", "yes");
          cell.style.color = "#fe5e5e";
        }
        cell.setAttribute("data-cell", day);
        cell.innerHTML = String(day);
        weekRow.appendChild(cell);
        day++;
      } else {
        let cell = document.createElement("td");
        cell.innerHTML = "";
        weekRow.appendChild(cell);
      }
      if (day > daysCount) {
        break;
      }
    }
    tbody.appendChild(weekRow);
  }
};
Calendar.prototype.createMonthTableBody = function (monthData) {
  let tbody = document.createElement("tbody");
  tbody.classList.add("calendar-body");
  this.placeDaysInCells(monthData, tbody);
  return tbody;
};
Calendar.prototype.createMonthTableWrapper = function (monthData) {
  let div = document.createElement("div");
  div.classList.add("calendar-month");
  let table = document.createElement("table");
  table.classList.add("calendar");
  table.appendChild(this.createMonthThead());
  table.appendChild(this.createMonthTableBody(monthData));
  div.appendChild(table);
  return div;
};
Calendar.prototype.createMonthWrapper = function (monthData) {
  let div = document.createElement("div");
  div.classList.add("calendar-wrap");
  div.appendChild(this.createMonthNameWrap(monthData));
  div.appendChild(this.createMonthTableWrapper(monthData));
  return div;
};
Calendar.prototype.updateMonthData = function (monthData, counter) {
  if (counter !== 0) {
    if (monthData.month < 11) {
      monthData.month++;
    } else {
      monthData.month = 0;
      monthData.year++;
    }
  }
  return monthData;
};
Calendar.prototype.parseInputData = function (id, count, month, year) {
  this.startMonth =
    month > 11 || month === undefined ? this.currentMonth : month;
  this.startMonthYear =
    year < 1970 || year === undefined ? this.currentYear : year;
  this.monthCount = count === 0 || count === undefined ? 1 : count;
  this.containerID = id;
};
Calendar.prototype.renderCalendar = function (id, count, month, year) {
  this.parseInputData(id, count, month, year);
  let monthData = this.monthData(this.startMonth, this.startMonthYear);
  let calendarContainer = document.getElementsByClassName(this.containerID)[0];
  for (let i = 0; i < this.monthCount; i++) {
    let updateData = this.updateMonthData(monthData, i);
    calendarContainer.appendChild(this.createMonthWrapper(updateData));
  }
};
let calendar = new Calendar();
calendar.renderCalendar("srv-cal-container", 15, 9, 2020);
