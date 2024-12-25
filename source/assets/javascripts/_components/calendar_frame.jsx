var CalendarFrame = React.createClass({
  statics: {
    modalId: "modal",
    miqaatsUrl: ['/data/miqaats.json', '/waras.json']
  },
  getInitialState: function () {
    return {
      day: null,
      calendar: new HijriCalendar(this.props.today.getYear(), this.props.today.getMonth()),
      miqaats: []
    };
  },
  componentDidMount: function () {
    var self = this,
        miqaats = [];

    CalendarFrame.miqaatsUrl.forEach(function(url, index) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onreadystatechange = function () {
        if (this.readyState === this.DONE){
          if (this.status >= 200 && this.status < 400) {
            miqaats = miqaats.concat(JSON.parse(this.responseText));
            if (index === CalendarFrame.miqaatsUrl.length - 1) {
              self.setState({miqaats: miqaats});
            }
          } else {
            console.log(this);
          }
        }
      };
      request.send();
      request = null;
    });
  },
  navigateToToday: function () {
    this.setState({
      calendar: new HijriCalendar(this.props.today.getYear(), this.props.today.getMonth())
    });
  },
  changeMonth: function (monthChange) {
    this.setState({
      calendar: (monthChange < 0) ? this.state.calendar.previousMonth() : this.state.calendar.nextMonth()
    });
  },
  changeYear: function (yearChange) {
    this.setState({
      calendar: (yearChange < 0) ? this.state.calendar.previousYear() : this.state.calendar.nextYear()
    });
  },
  showModal: function (day) {
    this.setState({day: day});
    document.getElementById(CalendarFrame.modalId).getElementsByTagName("input").item(0).checked = true;
  },
  render: function () {
    return (
      <div className="calendar-frame">
        <div className="year-row">
          <YearControls
            year={this.state.calendar.getYear()}
            onYearChange={this.changeYear}
          />
          <TodayButton onClick={this.navigateToToday} />
        </div>
        <div className="month-row">
          <MonthControls
            month={this.state.calendar.getMonth()}
            onMonthChange={this.changeMonth}
          />
        </div>
        <Calendar
          calendar={this.state.calendar} today={this.props.today} modalId={CalendarFrame.modalId} miqaats={this.state.miqaats} onDayClick={this.showModal} />
        <Modal modalId={CalendarFrame.modalId} miqaats={this.state.miqaats} day={this.state.day} />
      </div>
    );
  }
});
