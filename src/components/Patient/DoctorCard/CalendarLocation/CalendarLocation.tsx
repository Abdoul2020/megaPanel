import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Doctor } from "../../../../common/types/Doctor.entity";
import { AppointmentSchedule } from "../../../../common/types/expert/AppointmentSchedule.entity";

type Props = {
  expert: Doctor | null;
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
      props.expert?.expert_appointment_schedule[
        string as keyof AppointmentSchedule
      ] !== undefined &&
      props.expert.expert_appointment_schedule[
        string as keyof AppointmentSchedule
      ].length > 0
    );
  };

  const calHours: any = (week_date: string) => {
    const string = "appointment_schedule_" + week_date.toLowerCase();
    return props.expert?.expert_appointment_schedule[
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
    navigate(
      `/checkout?date=${appointment_date.toLocaleString()}&online=${false}&expertID=${
        props.expert?._id
      }`
    );
  };

  return (
    <div className="flex items-center justify-center">
      {hourSection ? (
        <div className="flex w-full flex-col items-start justify-start gap-4">
          <div className="flex w-full items-center justify-start gap-2">
            <BiChevronLeft
              className="text-gray-900 cursor-pointer text-[40px] font-bold opacity-60"
              onClick={() => setHourSection(false)}
            />
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-gray-900 text-2xl font-bold opacity-80">
                {selectedDate}
              </h1>
              <h1 className="text-gray-900 text-2xl font-bold opacity-80">
                {toMonthTr(months_string[month])}
              </h1>
              <h1 className="text-gray-900 text-2xl font-bold opacity-80">
                {year},
              </h1>
              <h1 className="text-gray-900 text-lg font-bold opacity-80">
                {toDayTr(selectedDay)}
              </h1>
            </div>
          </div>
          <ul className="grid-center grid w-full grid-cols-5 place-items-center gap-6">
            {calHours(selectedDay) !== undefined
              ? calHours(selectedDay).map((hour: any, index: number) => {
                  return (
                    <li
                      className="cursor-pointer rounded-[15px] bg-color-gray-primary p-2 px-4 hover:opacity-80"
                      key={index}
                      onClick={() => handleNavigateCheckout(hour)}
                    >
                      <h1 className="text-sm font-bold text-color-dark-primary lg:text-base">
                        {hour}
                      </h1>
                    </li>
                  );
                })
              : ""}
          </ul>
        </div>
      ) : (
        <div className="flex w-full flex-col items-start justify-start gap-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-gray-900 text-2xl font-bold opacity-80">
                {toMonthTr(months_string[month])}
              </h1>
              <h1 className="text-gray-900 text-2xl font-bold opacity-80">
                {year}
              </h1>
            </div>
            <div className="flex items-center justify-center gap-2">
              <BiChevronLeft
                className="text-gray-900 cursor-pointer text-[32px] font-bold opacity-80"
                onClick={handleMonthDecrease}
              />
              <BiChevronRight
                className="text-gray-900 cursor-pointer text-[32px] font-bold opacity-80"
                onClick={handleMonthIncrease}
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-4">
            <div className="grid-center grid w-full grid-cols-7 place-items-center gap-4">
              <h1 className="text-gray-900 text-lg font-bold opacity-60">
                Pzt
              </h1>
              <h1 className="text-gray-900 text-lg font-bold opacity-60">
                Sal
              </h1>
              <h1 className="text-gray-900 text-lg font-bold opacity-60">
                Çrş
              </h1>
              <h1 className="text-gray-900 text-lg font-bold opacity-60">
                Prş
              </h1>
              <h1 className="text-gray-900 text-lg font-bold opacity-60">
                Cum
              </h1>
              <h1 className="text-gray-900 text-lg font-bold opacity-60">
                Cmt
              </h1>
              <h1 className="text-gray-900 text-lg font-bold opacity-60">
                Pzr
              </h1>
            </div>
            <ul className="grid-center grid w-full grid-cols-7 place-items-center gap-4">
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
                      key={i}
                      className={`cursor-pointer rounded-full p-1 px-2 hover:bg-opacity-50 ${
                  props.expert?.expert_appointment_schedule && cal(i - 1)
                    ? "bg-color-success-primary"
                    : "bg-color-gray-secondary"
                }`}
                    >
                      <h2 key={i} className="text-base font-bold">
                        {i - days_string.indexOf(weekDate) + 1}
                      </h2>
                    </li>
                  );
                } else {
                  return (
                    <li
                      className="cursor-pointer rounded-full p-2 
              hover:bg-color-gray-primary hover:bg-opacity-50"
                    >
                      <h2 key={i} className="text-base font-bold opacity-0">
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
