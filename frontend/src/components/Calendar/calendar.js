import './calendar.css';

export default function Calendar() {
  let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

  let currentDate = new Date();


  // GETTING THE DAYS OF THE CALENDAR
  let firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  let dayOfWeek = firstDayOfMonth.getDay();

  let daysOfMonth = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && dayOfWeek === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - dayOfWeek));
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    let calendarDay = {
      currentMonth: (firstDayOfMonth.getMonth() === currentDate.getMonth()),
      date: (new Date(firstDayOfMonth)),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: (firstDayOfMonth.toDateString() === currentDate.toDateString()),
      year: firstDayOfMonth.getFullYear()
    }

    daysOfMonth.push(calendarDay);
    // console.log("DAYS OF MONTH", daysOfMonth)
  }

  return (
    <div>
      <div>
        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
      </div>
      <table>
        <tr>
          {weekdays.map(day => (
            <th colSpan='1' scope="col">{day.slice(0, 3)}</th>
          ))}
        </tr>
        <tr>
          {daysOfMonth.slice(0,7).map(day => (
              <td>{day.number}</td>
          ))}
        </tr>
        <tr>
          {daysOfMonth.slice(7, 14).map(day => (
              <td>{day.number}</td>
          ))}
        </tr>
        <tr>
          {daysOfMonth.slice(14, 21).map(day => (
              <td>{day.number}</td>
          ))}
        </tr>
        <tr>
          {daysOfMonth.slice(21, 28).map(day => (
              <td>{day.number}</td>
          ))}
        </tr>
        <tr>
          {daysOfMonth.slice(28, 35).map(day => (
              <td>{day.number}</td>
          ))}
        </tr>
        <tr>
          {daysOfMonth.slice(35).map(day => (
              <td>{day.number}</td>
          ))}
        </tr>
      </table>

      <div>

      </div>

    </div>
  )
}
