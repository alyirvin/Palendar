import React, {useContext, useState, useEffect } from 'react';
import './calendar.css'
import { CalendarContext } from './context';

function Calendar() {

    const isLeapYear = (year) => {
        return (
          (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
          (year % 100 === 0 && year % 400 === 0)
        );
    };

    const getFebDays = (year) => {
        return isLeapYear(year) ? 29 : 28;
    };

    const month_names = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [calendarDays, setCalendarDays] = useState([]);
    const { currentCalendar } = useContext(CalendarContext);
    const [currentDay, setCurrentDay] = useState(currentDate.getDate());

    useEffect(() => {  
        console.log("NAME: " + currentCalendar.name);
        console.log(currentCalendar.images);
        console.log(currentYear + " " + currentMonth + " " + currentDay);
    })
    const currentImage = currentCalendar.images.find(image =>
        image.year === currentYear &&
        image.month === currentMonth + 1 &&
        image.day === currentDay
    );
    

    const responses = currentImage ? currentImage.responses : [];
    
    useEffect(() => {
        generateCalendar(currentMonth, currentYear);
    }, [currentMonth, currentYear]);
      
    const generateCalendar = (month, year) => {
        let days_of_month = [
            31,
            getFebDays(year),
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
          ];
      
        let first_day = new Date(year, month).getDay();
        let days = [];
      
        for (let i = 0; i < first_day; i++) {
            days.push('');
        }
      
        for (let i = 1; i <= days_of_month[month]; i++) {
            days.push(i);
        }
        setCalendarDays(days);
      };

      const handlePrevYear = () => {
        setCurrentYear(currentYear - 1);
      };
    
      const handleNextYear = () => {
        setCurrentYear(currentYear + 1);
      };
    
      const handleMonthClick = (index) => {
        setCurrentMonth(index);
      };
    
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentDate(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    
      const todayShowDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
      }).format(currentDate);
    
      const todayShowTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric', minute: 'numeric', second: 'numeric'
      }).format(currentDate);

    //   const responses = currentCalendar.images
    //     .filter(image => {
    //         const imageDate = new Date(image.year, image.month - 1, image.day);
    //         return imageDate.toDateString() === currentDate.toDateString();
    //     })
    //     .flatMap(image => image.responses)
    //     .map(response => ({
    //         user: response.user,
    //         response: response.response
    //     }));

    return (
        <div className="container" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <div className="calendar-name" style={{ marginRight: '20px', width: '20%' }}>
                <h3>Palender {currentCalendar.name}</h3>
            </div>
            <div className="calendar">
            <div className="calendar-header">
                <span className="month-picker" id="month-picker">{month_names[currentMonth]}</span>
                <div className="year-picker" id="year-picker">
                <span className="year-change" id="pre-year" onClick={handlePrevYear}>
                    <pre>&lt;</pre>
                </span>
                <span id="year">{currentYear}</span>
                <span className="year-change" id="next-year" onClick={handleNextYear}>
                    <pre>&gt;</pre>
                </span>
                </div>
            </div>

            <div className="calendar-body" style={{width: '100%'}}>
                <div className="calendar-week-days">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                </div>
                <ol className="calendar-days">
                    {calendarDays.map((day, index) => (
                    <li key={index} id={currentCalendar.name} className={day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() ? `current-date` : ''}>
                        <span className="dayValues">{day}</span>
                    </li>
                    ))}
                </ol>
            </div>
            <div className="calendar-footer">
            </div>
            <div className="date-time-formate">
                <div className="day-text-formate">TODAY</div>
                <div className="date-time-value">
                <div className="time-formate">{todayShowTime}</div>
                <div className="date-formate">{todayShowDate}</div>
                </div>
            </div>
            <div className="month-list"></div>
                {month_names.map((month, index) => (
                    <div key={index} onClick={() => handleMonthClick(index)}>
                        {month}
                    </div>
                ))}
            </div>

            <div className="responses" style={{marginLeft: '20px', width: '20%', position: 'absolute', right: '50px'}}>
                <h3>Responses for {currentDate.toDateString()}</h3>
                {responses.length > 0 ? (
                <ul>
                    {responses.map((response, index) => (
                    <li key={index} style={{backgroundImage: 'none', border: 'none'}}>
                        <strong>{response.user}:</strong> {response.response}
                    </li>
                    ))}
                </ul>
                ) : (
                <p>No responses for today.</p>
                )}
            </div>
        </div>
    );
};

export default Calendar;