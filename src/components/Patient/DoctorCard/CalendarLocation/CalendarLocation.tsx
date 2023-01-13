import React, { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ObjectType } from "typescript";
import { AuthExpertAppointmentScheduleDto } from "../../../../common/dtos/auth/expert/authExpertAppointmentSchedule.dto";
import { Doctor } from "../../../../common/types/Doctor.entity";
import { AppointmentSchedule } from "../../../../common/types/expert/AppointmentSchedule.entity";

type Props = {
  expert: Doctor;
};

export default function CalendarLocation(props: Props) {
  const navigate = useNavigate();

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [date, setDate] = useState(0);
  const [weekDate, setWeekDate] = useState("");
  const [hourSection, setHourSection] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState(0);

  const months_string = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days_string: any = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const days_string_leap = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const toDayTr = (str: string) => {
    switch (str) {
      case "Monday":
        return "Pazartesi";
      case "Tuesday":
        return "Salı";
      case "Wednesday":
        return "Çarşamba";
      case "Thursday":
        return "Perşembe";
      case "Friday":
        return "Cuma";
      case "Saturday":
        return "Cumartesi";
      case "Sunday":
        return "Pazar";
      default:
        break;
    }
  };

  const toMonthTr = (str: string) => {
    switch (str) {
      case "January":
        return "Ocak";
      case "February":
        return "Şubat";
      case "March":
        return "Mart";
      case "April":
        return "Nisan";
      case "May":
        return "Mayıs";
      case "June":
        return "Haziran";
      case "July":
        return "Temmuz";
      case "August":
        return "Ağustos";
      case "September":
        return "Eylül";
      case "October":
        return "Ekim";
      case "November":
        return "Kasım";
      case "December":
        return "Aralık";
      default:
        break;
    }
  };
  const months: any = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };

  const handleMonthIncrease = () => {
    const date_here = new Date();
    let newDate = new Date(date_here.setMonth(date_here.getMonth() + 12));
    if (month !== new Date().getMonth() || year !== newDate.getFullYear()) {
      if (month === 11) {
        setMonth(0);
        setYear((value) => value + 1);
      } else {
        setMonth((value) => value + 1);
      }
    }
  };
  const handleMonthDecrease = () => {
    console.log(year !== new Date().getFullYear());
    if (month !== new Date().getMonth() || year !== new Date().getFullYear()) {
      if (month === 0) {
        setMonth(11);
        setYear((value) => value - 1);
      } else {
        setMonth((value) => value - 1);
      }
    }
  };
  const handleHourSectionChange = (i: number, day: number) => {
    const theDay: string = days_string[(i + 1) % 7];
    if (cal(i)) {
      setHourSection(true);
      setSelectedDay(theDay);
      setSelectedDate(day);
    }
  };
  const calculateWeekDate = () => {
    const Dte = new Date();
    Dte.setMonth(month);
    Dte.setDate(1);
    Dte.setFullYear(year);
    if (Dte.getDay() === 0) {
      setWeekDate(days_string[6]);
    } else {
      setWeekDate(days_string[Dte.getDay() - 1]);
    }
  };
  useEffect(() => {
    calculateWeekDate();
  }, [month, date, year]);

  const cal: any = (i: number) => {
    const theDay: string = days_string[(i + 1) % 7];
    const string = "appointment_schedule_" + theDay.toLowerCase();
    return (
      props.expert.expert_appointment_schedule[
        string as keyof AppointmentSchedule
      ] !== undefined &&
      props.expert.expert_appointment_schedule[
        string as keyof AppointmentSchedule
      ].length > 0
    );
  };

  const calHours: any = (week_date: string) => {
    const string = "appointment_schedule_" + week_date.toLowerCase();
    return props.expert.expert_appointment_schedule[
      string as keyof AppointmentSchedule
    ];
  };

  const handleNavigateCheckout = (hour: string) => {
    const appointment_hour = parseInt(hour.split(":")[0]);
    const appointment_minute = parseInt(hour.split(":")[1]);
    const appointment_date = new Date();
    appointment_date.setFullYear(year);
    appointment_date.setMonth(month);
    appointment_date.setHours(appointment_hour, appointment_minute, 0);
    appointment_date.setDate(selectedDate);
    console.log(appointment_date.toLocaleString());
    navigate(
      `/checkout?date=${appointment_date.toLocaleString()}&online=${false}&expertID=${
        props.expert._id
      }`
    );
  };

  return (
    <div className="flex justify-center items-center">
      {hourSection ? (
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <div className="w-full flex justify-start items-center gap-2">
            <BiChevronLeft
              className="text-gray-900 font-bold text-[40px] opacity-60 cursor-pointer"
              onClick={() => setHourSection(false)}
            />
            <div className="flex justify-center items-center gap-2">
              <h1 className="text-gray-900 font-bold opacity-80 text-2xl">
                {selectedDate}
              </h1>
              <h1 className="text-gray-900 font-bold opacity-80 text-2xl">
                {toMonthTr(months_string[month])}
              </h1>
              <h1 className="text-gray-900 font-bold opacity-80 text-2xl">
                {year},
              </h1>
              <h1 className="text-gray-900 font-bold opacity-80 text-lg">
                {toDayTr(selectedDay)}
              </h1>
            </div>
          </div>
          <ul className="w-full grid grid-cols-5 gap-6 grid-center place-items-center">
            {calHours(selectedDay) !== undefined
              ? calHours(selectedDay).map((hour: any) => {
                  return (
                    <li
                      className="cursor-pointer hover:opacity-80 p-2 px-4 bg-color-gray-primary rounded-[15px]"
                      onClick={() => handleNavigateCheckout(hour)}
                    >
                      <h1 className="text-color-dark-primary font-bold">
                        {hour}
                      </h1>
                    </li>
                  );
                })
              : ""}
          </ul>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-start items-start gap-4">
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-center items-center gap-2">
              <h1 className="text-gray-900 font-bold opacity-80 text-2xl">
                {toMonthTr(months_string[month])}
              </h1>
              <h1 className="text-gray-900 font-bold opacity-80 text-2xl">
                {year}
              </h1>
            </div>
            <div className="flex justify-center items-center gap-2">
              <BiChevronLeft
                className="text-gray-900 font-bold text-[32px] opacity-80 cursor-pointer"
                onClick={handleMonthDecrease}
              />
              <BiChevronRight
                className="text-gray-900 font-bold text-[32px] opacity-80 cursor-pointer"
                onClick={handleMonthIncrease}
              />
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-4">
            <div className="w-full grid grid-cols-7 gap-4 grid-center place-items-center">
              <h1 className="text-lg text-gray-900 font-bold opacity-60">
                Pzt
              </h1>
              <h1 className="text-lg text-gray-900 font-bold opacity-60">
                Sal
              </h1>
              <h1 className="text-lg text-gray-900 font-bold opacity-60">
                Çrş
              </h1>
              <h1 className="text-lg text-gray-900 font-bold opacity-60">
                Prş
              </h1>
              <h1 className="text-lg text-gray-900 font-bold opacity-60">
                Cum
              </h1>
              <h1 className="text-lg text-gray-900 font-bold opacity-60">
                Cmt
              </h1>
              <h1 className="text-lg text-gray-900 font-bold opacity-60">
                Pzr
              </h1>
            </div>
            <ul className="grid grid-cols-7 gap-4 w-full grid-center place-items-center">
              {Array.from(
                Array(
                  months[months_string[month]] + days_string.indexOf(weekDate)
                )
              ).map((e, i) => {
                if (i > days_string.indexOf(weekDate) - 1) {
                  return (
                    <li
                      onClick={() =>
                        handleHourSectionChange(
                          i - 1,
                          i - days_string.indexOf(weekDate) + 1
                        )
                      }
                      className={`p-1 px-2 rounded-full hover:bg-color-gray-primary 
                hover:bg-opacity-50 cursor-pointer ${
                  props.expert.expert_appointment_schedule && cal(i - 1)
                    ? "bg-color-success-primary"
                    : "bg-color-gray-secondary"
                }`}
                    >
                      <h2 key={i} className="font-bold text-base">
                        {i - days_string.indexOf(weekDate) + 1}
                      </h2>
                    </li>
                  );
                } else {
                  return (
                    <li
                      className="p-2 rounded-full hover:bg-color-gray-primary 
              hover:bg-opacity-50 cursor-pointer"
                    >
                      <h2 key={i} className="font-bold opacity-0 text-base">
                        a
                      </h2>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
