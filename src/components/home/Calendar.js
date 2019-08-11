import React from "react";
import dateFns from "date-fns";
import "./Calendar.css"

class Calendar extends React.Component {
  state = {
    currentWeek: new Date(),
    selectedDate: new Date()
  };

  nextWeek = () => {
    this.setState(prevState => ({
      currentWeek: dateFns.addWeeks(prevState.currentWeek, 1),
    }))
  }

  prevWeek = () => {
    this.setState(prevState => ({
      currentWeek: dateFns.subWeeks(prevState.currentWeek, 1),
    }))
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevWeek}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {dateFns.format(this.state.currentWeek, dateFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextWeek}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }


  renderDays() {
    const dateFormat = "dddd";
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.currentWeek);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentWeek, selectedDate } = this.state;
    const WeekStart = dateFns.startOfWeek(currentWeek);
    const WeekEnd = dateFns.endOfWeek(WeekStart);
    const startDate = dateFns.startOfWeek(WeekStart);
    //const endDate = dateFns.endOfWeek(WeekEnd);

    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    for (let i = 0; i < 7; i++) {
      formattedDate = dateFns.format(day, dateFormat);
      const cloneDay = day;
      days.push(
        <div
          className={`col cell
          ${!dateFns.isSameWeek(day, WeekStart) ? "disabled" : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
          }`}
          key={day}
          onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
          <span className="number">{formattedDate}</span>
          <span className="bg">{formattedDate}</span>
        </div>
      );
      day = dateFns.addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
    return <div className="body">{rows}</div>;
  }
  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  render() {
    return (
      <div  id ="Calendar" className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );

  }
}

export default Calendar;
