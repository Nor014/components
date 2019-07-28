import React from 'react'

function Calendar(props) {
  const { date } = props;

  let daysObj = {
    Sun: 0,
    Mon: 1,
    Tues: 2,
    Wed: 3,
    Thurs: 4,
    Fri: 5,
    Sat: 6
  }

  const monthObj = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  }

  let splitDate = date.toString().split(' ')

  let nameDate = splitDate[0];
  let nameMonth = splitDate[1];

  let currentDay = Number(splitDate[2]);
  let currentYear = Number(splitDate[3]);
  let currentDate = daysObj[nameDate];
  let currentMonth = monthObj[nameMonth];

  // let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  // const fullDate = date.toLocaleDateString('ru', options)

  let daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  let daysInPastMonth = new Date(currentYear, currentMonth, 0).getDate()
  let firstDay = new Date(currentYear, currentMonth, 1).getDay()
  let lastDay = new Date(currentYear, currentMonth + 1, 0).getDay()


  let currentMonthMass = [];
  let calendar = [];

  function createCalendar() {
    // определяем сколько дней нужно закинуть до и после основного месяца
    let daysToAddBefore
    let daysToAddAfter

    daysToAddBefore = firstDay >= 1 ? firstDay - 1 : 6;
    daysToAddAfter = lastDay !== 0 ? daysToAddAfter = 7 - lastDay : 0;

    // формируем основной массив дней календаря
    for (let i = daysInPastMonth - daysToAddBefore; i < daysInPastMonth; i++) {
      currentMonthMass.push(i + 1 + ' class')
    }

    for (let i = 0; i < daysInCurrentMonth; i++) {
      currentMonthMass.push(i + 1)
    }

    for (let i = 0; i < daysToAddAfter; i++) {
      currentMonthMass.push(i + 1 + ' class')
    }

    // разбиваем по неделям для рендера в DOM
    while (currentMonthMass.length) calendar.push(currentMonthMass.splice(0, 7))
  }

  createCalendar()

  function addClassName(day) {
    if (day.toString().includes('class')) {
      return <td className='ui-datepicker-other-month'>{day.replace(/[^0-9]/g, '')}</td>
    }

    if (day === currentDay) {
      return <td className='ui-datepicker-today'>{day}</td>
    } else return <td>{day}</td>
  }

  return (
    <div class="ui-datepicker">
      <div class="ui-datepicker-material-header">
        <div class="ui-datepicker-material-day">{nameDate}</div>
        <div class="ui-datepicker-material-date">
          <div class="ui-datepicker-material-day-num">{currentDay}</div>
          <div class="ui-datepicker-material-month">{nameMonth}</div>
          <div class="ui-datepicker-material-year">{currentYear}</div>
        </div>
      </div>
      <div class="ui-datepicker-header">
        <div class="ui-datepicker-title">
          <span class="ui-datepicker-month">{nameMonth}</span>&nbsp;<span class="ui-datepicker-year">{currentYear}</span>
        </div>
      </div>

      <table class="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col class="ui-datepicker-week-end" />
          <col class="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>

        <tbody>
          {calendar.map(week => (
            <tr>
              {week.map((day) => (addClassName(day)))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Calendar;