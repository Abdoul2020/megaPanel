import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { GrStatusGoodSmall } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { AuthExpertUpdateProfileDto } from "../../../../common/dtos/auth/expert/authExpertUpdateProfileDto.dto";
import { Alert } from "../../../../common/types/Alert";
import { AppointmentSchedule } from "../../../../common/types/expert/AppointmentSchedule.entity";
import { authExpertUpdateProfile } from "../../../../features/authExpert/authExpertAPI";
import { addAuthExpertObject } from "../../../../features/authExpert/authExpertSlice";
import { updateAlert } from "../../../../features/options/optionsSlice";
import { getCookie } from "../../../../helpers/authExpertHelper";
import { unauthenticate } from "../../../../helpers/authHelper";
import AlertHeaderWarning from "../../../Common/AlertHeaderWarning/AlertHeaderWarning";

type Props = {};

type SpecialConditionDay = {
  day: string;
  hour: string;
  minute: string;
};

export default function DashboardAppointmentsChartExpert({}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  // Appointment Condition, Time Condition | Special Condition
  const [submitDisable, setSubmitDisable] = useState(false);
  const [loader, setLoader] = useState(false);
  const [appointmentCondition, setAppointmentCondition] = useState(1);

  // Appointment Duration
  const [appointmentDuration, setAppointmentDuration] = useState(60);
  const [
    specialConditionAppointmentDuration,
    setSpecialConditionAppointmentDuration,
  ] = useState(60);

  // Between appointments break
  const [betweenAppointmentsBreak, setBetweenAppointmentsBreak] = useState(5);
  const [
    betweenSpecialConditionAppointmentsBreak,
    setBetweenSpecialConditionAppointmentsBreak,
  ] = useState(5);

  // Special Condition Shift Days & Hours
  const [
    specialConditionShiftDaysWithTime,
    setSpecialConditionShiftDaysWithTime,
  ] = useState<SpecialConditionDay[]>([]);

  // Shift Days
  const [shiftDays, setShiftDays] = useState<string[]>([]);
  const [specialConditionShiftDays, setSpecialConditionShiftDays] = useState<
    string[]
  >([]);

  // Appointment Special Condition Shift Time Range
  //Start
  const [specialConditionShiftStartHour, setSpecialConditionShiftStartHour] =
    useState("09");
  // End
  const [
    specialConditionShiftStartMinute,
    setSpecialConditionShiftStartMinute,
  ] = useState("00");

  // Appointment Shift Time Range
  // Start
  const [shiftStartHour, setShiftStartHour] = useState("09");
  const [shiftStartMinute, setShiftStartMinute] = useState("00");
  // End
  const [shiftEndHour, setShiftEndHour] = useState("17");
  const [shiftEndMinute, setShiftEndMinute] = useState("00");

  // Appointment Shift Break Time Rage
  // Start
  const [shiftBreakStartHour, setShiftBreakStartHour] = useState("12");
  const [shiftBreakStartMinute, setShiftBreakStartMinute] = useState("30");
  // End
  const [shiftBreakEndHour, setShiftBreakEndHour] = useState("13");
  const [shiftBreakEndMinute, setShiftBreakEndMinute] = useState("30");
  // Has Break
  const [hasBreak, setHasBreak] = useState(true);

  const onHasBreakChange = (e: any) => {
    const value = e.target.value === "true";
    setHasBreak(value);
  };
  const onAppointmentDurationChange = (e: any) => {
    const value = parseInt(e.target.value);
    setAppointmentDuration(value);
    // const shiftStartTime = shiftStartHour + ":" + shifStartMinute;
    // const shiftEndTime = shiftEndHour + ":" + shiftEndMinute;
    // const shiftBreakStartTime =
    //   shiftBreakStartHour + ":" + shiftBreakStartMinute;
    // const shiftBreakEndTime = shiftBreakEndHour + ":" + shiftBreakEndMinute;
  };
  const onBetweenAppointmentsBreakChange = (e: any) => {
    const value = parseInt(e.target.value);
    setBetweenAppointmentsBreak(value);
  };
  const onBetweenSpecialConditionAppointmentsBreakChange = (e: any) => {
    const value = parseInt(e.target.value);
    setBetweenSpecialConditionAppointmentsBreak(value);
  };
  const onSpecialConditionAppointmentDurationChange = (e: any) => {
    const value = parseInt(e.target.value);
    setSpecialConditionAppointmentDuration(value);
  };
  const handleShiftDays = (day: string) => {
    if (shiftDays.includes(day)) {
      setShiftDays((oldArray) =>
        oldArray.filter((oldArrayDay) => oldArrayDay !== day)
      );
    } else {
      setShiftDays((oldArray) => [...oldArray, day]);
    }
  };
  const handleSpecialConditionShiftDays = (day: string) => {
    if (specialConditionShiftDays.includes(day)) {
      setSpecialConditionShiftDays((oldArray) =>
        oldArray.filter((oldArrayDay) => oldArrayDay !== day)
      );
    } else {
      setSpecialConditionShiftDays((oldArray) => [...oldArray, day]);
    }
  };
  const handleAddSpecialConditionStartTime = async (day: string) => {
    const specialConditionDay: SpecialConditionDay = {
      day: day,
      hour: specialConditionShiftStartHour,
      minute: specialConditionShiftStartMinute,
    };
    const newArray = specialConditionShiftDaysWithTime;
    const valDate = await newArray.filter((date) => {
      return (
        date.day === specialConditionDay.day &&
        parseInt(date.hour) * 60 +
          parseInt(date.minute) +
          specialConditionAppointmentDuration +
          betweenSpecialConditionAppointmentsBreak >
          parseInt(specialConditionDay.hour) * 60 +
            parseInt(specialConditionDay.minute)
      );
    });
    if (valDate.length === 0) {
      setSpecialConditionShiftDaysWithTime((oldArray) => [
        ...oldArray,
        specialConditionDay,
      ]);
    } else {
      const alert: Alert = {
        type: "danger",
        text: "Randevu ve mola sürelerini dikkate alınız.",
        active: true,
        statusCode: 400,
      };
      dispatch(updateAlert(alert));
    }
  };
  const handleRemoveSpecialConditionTime = async (
    specialConditionDay: SpecialConditionDay
  ) => {
    setSpecialConditionShiftDaysWithTime((oldArray) => {
      return oldArray.filter((date) => {
        return (
          `${date.day} ${date.hour} ${date.minute}` !==
          `${specialConditionDay.day} ${specialConditionDay.hour} ${specialConditionDay.minute}`
        );
      });
    });
  };
  const handleDay = (day: string) => {
    switch (day) {
      case "monday":
        return "Pazartesi";
      case "tuesday":
        return "Salı";
      case "wednesday":
        return "Çarşamba";
      case "thursday":
        return "Perşembe";
      case "friday":
        return "Cuma";
      case "saturday":
        return "Cumartesi";
      case "sunday":
        return "Pazar";
      default:
        break;
    }
  };
  const handleTimeConditionSubmit = async () => {
    const shiftStartHourInt = parseInt(shiftStartHour);
    const shiftStartMinuteInt = parseInt(shiftStartMinute);
    const shiftEndHourInt = parseInt(shiftEndHour);
    const shiftEndMinuteInt = parseInt(shiftEndMinute);

    const shiftBreakStartHourInt = parseInt(shiftBreakStartHour);
    const shiftBreakStartMinuteInt = parseInt(shiftBreakStartMinute);
    const shiftBreakEndHourInt = parseInt(shiftBreakEndHour);
    const shiftBreakEndMinuteInt = parseInt(shiftBreakEndMinute);

    let today = new Date();

    const hoursWithBreak: string[] = ItHasBreak(
      today,
      shiftStartHourInt,
      shiftStartMinuteInt,
      shiftEndHourInt,
      shiftEndMinuteInt,
      shiftBreakStartHourInt,
      shiftBreakStartMinuteInt,
      shiftBreakEndHourInt,
      shiftBreakEndMinuteInt
    );

    const hoursWithoutBreak: string[] = ItHasNotBreak(
      today,
      shiftStartHourInt,
      shiftStartMinuteInt,
      shiftEndHourInt,
      shiftEndMinuteInt
    );
    let authExpertAppointmentSchedule: AppointmentSchedule = {
      appointment_schedule_type: 1,
      appointment_duration: appointmentDuration,
      appointment_has_break: hasBreak,
      appointment_shift_start_hour: shiftStartHour,
      appointment_shift_start_minute: shiftStartMinute,
      appointment_shift_end_hour: shiftEndHour,
      appointment_shift_end_minute: shiftEndMinute,
      appointment_break_start_hour: shiftBreakStartHour,
      appointment_break_start_minute: shiftBreakStartMinute,
      appointment_break_end_hour: shiftBreakEndHour,
      appointment_break_end_minute: shiftBreakEndMinute,
      appointment_between_appointments_break: betweenAppointmentsBreak,
    };
    if (hasBreak) {
      shiftDays.forEach((day) => {
        if (day === "monday") {
          authExpertAppointmentSchedule.appointment_schedule_monday =
            hoursWithBreak;
        }
        if (day === "tuesday") {
          authExpertAppointmentSchedule.appointment_schedule_tuesday =
            hoursWithBreak;
        }
        if (day === "wednesday") {
          authExpertAppointmentSchedule.appointment_schedule_wednesday =
            hoursWithBreak;
        }
        if (day === "thursday") {
          authExpertAppointmentSchedule.appointment_schedule_thursday =
            hoursWithBreak;
        }
        if (day === "friday") {
          authExpertAppointmentSchedule.appointment_schedule_friday =
            hoursWithBreak;
        }
        if (day === "saturday") {
          authExpertAppointmentSchedule.appointment_schedule_saturday =
            hoursWithBreak;
        }
        if (day === "sunday") {
          authExpertAppointmentSchedule.appointment_schedule_sunday =
            hoursWithBreak;
        }
      });
    } else {
      shiftDays.forEach((day) => {
        if (day === "monday") {
          authExpertAppointmentSchedule.appointment_schedule_monday =
            hoursWithoutBreak;
        }
        if (day === "tuesday") {
          authExpertAppointmentSchedule.appointment_schedule_tuesday =
            hoursWithoutBreak;
        }
        if (day === "wednesday") {
          authExpertAppointmentSchedule.appointment_schedule_wednesday =
            hoursWithoutBreak;
        }
        if (day === "thursday") {
          authExpertAppointmentSchedule.appointment_schedule_thursday =
            hoursWithoutBreak;
        }
        if (day === "friday") {
          authExpertAppointmentSchedule.appointment_schedule_friday =
            hoursWithoutBreak;
        }
        if (day === "saturday") {
          authExpertAppointmentSchedule.appointment_schedule_saturday =
            hoursWithoutBreak;
        }
        if (day === "sunday") {
          authExpertAppointmentSchedule.appointment_schedule_sunday =
            hoursWithoutBreak;
        }
      });
    }
    const authExpertUpdateProfileDto: AuthExpertUpdateProfileDto = {
      expert_appointment_schedule: authExpertAppointmentSchedule,
    };
    const token = getCookie("m_e_t");
    setLoader(true);
    setSubmitDisable(true);
    const authExpertUpdateProfileResponse = await authExpertUpdateProfile(
      token,
      authExpertUpdateProfileDto
    );
    setLoader(false);
    setSubmitDisable(false);

    const success = authExpertUpdateProfileResponse.success;
    if (success) {
      const alert: Alert = {
        type: "success",
        text: "Randevu Çizelgeniz Güncellendi.",
        active: true,
        statusCode: authExpertUpdateProfileResponse.data.statusCode,
      };
      dispatch(updateAlert(alert));
      dispatch(addAuthExpertObject(authExpertUpdateProfileResponse.data.data));
      setSpecialConditionShiftDays([]);
      setSpecialConditionShiftDaysWithTime([]);
      setSpecialConditionShiftStartHour("09");
      setSpecialConditionShiftStartMinute("00");
    } else {
      if (
        authExpertUpdateProfileResponse.data.response.data.message &&
        authExpertUpdateProfileResponse.data.response.data.message ===
          "error:TokenExpiredError: jwt expired"
      ) {
        const alert: Alert = {
          type: "warning",
          text: "Oturum zaman aşımına uğradı",
          active: true,
          statusCode: authExpertUpdateProfileResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
        dispatch(addAuthExpertObject(undefined));
        unauthenticate(navigate("/experts/login"));
      } else {
        const alert: Alert = {
          type: "danger",
          text: authExpertUpdateProfileResponse.data.response.data.message,
          active: true,
          statusCode: authExpertUpdateProfileResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
      }
    }
  };
  const handleSpecialConditionSubmit = async () => {
    let authExpertAppointmentSchedule2: AppointmentSchedule = {
      appointment_schedule_type: 2,
      appointment_has_break: false,
      appointment_duration: specialConditionAppointmentDuration,
      appointment_between_appointments_break:
        betweenSpecialConditionAppointmentsBreak,
    };
    let monday: string[] = [];
    let tuesday: string[] = [];
    let wednesday: string[] = [];
    let thursday: string[] = [];
    let friday: string[] = [];
    let saturday: string[] = [];
    let sunday: string[] = [];

    specialConditionShiftDaysWithTime.forEach((obj) => {
      if (obj.day === "monday") {
        monday.push(`${obj.hour}:${obj.minute}`);
      }
      if (obj.day === "tuesday") {
        tuesday.push(`${obj.hour}:${obj.minute}`);
      }
      if (obj.day === "wednesday") {
        wednesday.push(`${obj.hour}:${obj.minute}`);
      }
      if (obj.day === "thursday") {
        thursday.push(`${obj.hour}:${obj.minute}`);
      }
      if (obj.day === "friday") {
        friday.push(`${obj.hour}:${obj.minute}`);
      }
      if (obj.day === "saturday") {
        saturday.push(`${obj.hour}:${obj.minute}`);
      }
      if (obj.day === "sunday") {
        sunday.push(`${obj.hour}:${obj.minute}`);
      }
    });

    authExpertAppointmentSchedule2.appointment_schedule_monday = monday;
    authExpertAppointmentSchedule2.appointment_schedule_tuesday = tuesday;
    authExpertAppointmentSchedule2.appointment_schedule_wednesday = wednesday;
    authExpertAppointmentSchedule2.appointment_schedule_thursday = thursday;
    authExpertAppointmentSchedule2.appointment_schedule_friday = friday;
    authExpertAppointmentSchedule2.appointment_schedule_saturday = saturday;
    authExpertAppointmentSchedule2.appointment_schedule_sunday = sunday;

    const token = getCookie("m_e_t");

    const authExpertUpdateProfileDto: AuthExpertUpdateProfileDto = {
      expert_appointment_schedule: authExpertAppointmentSchedule2,
    };

    setLoader(true);
    setSubmitDisable(true);
    const authExpertUpdateProfileResponse = await authExpertUpdateProfile(
      token,
      authExpertUpdateProfileDto
    );
    setLoader(false);
    setSubmitDisable(false);

    const success = authExpertUpdateProfileResponse.success;
    if (success) {
      const alert: Alert = {
        type: "success",
        text: "Randevu Çizelgeniz Güncellendi.",
        active: true,
        statusCode: authExpertUpdateProfileResponse.data.statusCode,
      };
      dispatch(updateAlert(alert));
      dispatch(addAuthExpertObject(authExpertUpdateProfileResponse.data.data));
      setHasBreak(true);
      setShiftDays([]);
      setShiftStartHour("09");
      setShiftStartMinute("00");
      setShiftEndHour("17");
      setShiftEndMinute("00");

      setShiftBreakStartHour("12");
      setShiftBreakStartMinute("30");
      setShiftBreakEndHour("13");
      setShiftBreakEndMinute("30");
    } else {
      if (
        authExpertUpdateProfileResponse.data.response.data.message &&
        authExpertUpdateProfileResponse.data.response.data.message ===
          "error:TokenExpiredError: jwt expired"
      ) {
        const alert: Alert = {
          type: "warning",
          text: "Oturum zaman aşımına uğradı",
          active: true,
          statusCode: authExpertUpdateProfileResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
        dispatch(addAuthExpertObject(undefined));
        unauthenticate(navigate("/experts/login"));
      } else {
        const alert: Alert = {
          type: "danger",
          text: authExpertUpdateProfileResponse.data.response.data.message,
          active: true,
          statusCode: authExpertUpdateProfileResponse.data.statusCode,
        };
        dispatch(updateAlert(alert));
      }
    }
  };
  const ItHasNotBreak = (
    today: any,
    shift_start_hour_int: any,
    shift_start_minute_int: any,
    shift_end_hour_int: any,
    shift_end_minute_int: any
  ) => {
    let dateX = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      shift_start_hour_int,
      shift_start_minute_int,
      0
    );
    let dateY = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      shift_end_hour_int,
      shift_end_minute_int,
      0
    );

    const ifLessThanTen = (num: any) => {
      return ("0" + num).slice(-2);
    };

    let dateXTime = dateX.getTime();
    let dateYTime = dateY.getTime();

    let finalArray: string[] = [];

    while (dateXTime <= dateYTime - appointmentDuration * 60000) {
      const theTime = `${ifLessThanTen(
        new Date(dateXTime).getHours()
      )}:${ifLessThanTen(new Date(dateXTime).getMinutes())}`;
      finalArray.push(theTime);
      dateXTime += appointmentDuration * 10 * 60 * 100;
      dateXTime += betweenAppointmentsBreak * 1000 * 60;
    }
    return finalArray;
  };
  const ItHasBreak = (
    today: any,
    shift_start_hour_int: any,
    shift_start_minute_int: any,
    shift_end_hour_int: any,
    shift_end_minute_int: any,
    shift_break_start_hour_int: any,
    shift_break_start_minute_int: any,
    shift_break_end_hour_int: any,
    shift_break_end_minute_int: any
  ) => {
    let dateX = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      shift_start_hour_int,
      shift_start_minute_int,
      0
    );
    let dateY = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      shift_end_hour_int,
      shift_end_minute_int,
      0
    );
    let dateZ = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      shift_break_start_hour_int,
      shift_break_start_minute_int,
      0
    );
    let dateT = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      shift_break_end_hour_int,
      shift_break_end_minute_int,
      0
    );

    const ifLessThanTen = (num: any) => {
      return ("0" + num).slice(-2);
    };

    let dateXTime = dateX.getTime();
    let dateYTime = dateY.getTime();
    let dateZTime = dateZ.getTime();
    let dateTTime = dateT.getTime();

    let beforeBreak: string[] = [];
    let afterBreak: string[] = [];

    while (dateXTime <= dateZTime - appointmentDuration * 60000) {
      const theTime = `${ifLessThanTen(
        new Date(dateXTime).getHours()
      )}:${ifLessThanTen(new Date(dateXTime).getMinutes())}`;
      beforeBreak.push(theTime);
      dateXTime += appointmentDuration * 10 * 60 * 100;
      dateXTime += betweenAppointmentsBreak * 1000 * 60;
    }

    while (dateTTime <= dateYTime - appointmentDuration * 60000) {
      const theTime = `${ifLessThanTen(
        new Date(dateTTime).getHours()
      )}:${ifLessThanTen(new Date(dateTTime).getMinutes())}`;
      afterBreak.push(theTime);
      dateTTime += appointmentDuration * 10 * 60 * 100;
      dateXTime += betweenAppointmentsBreak * 1000 * 60;
    }
    let finalArray: string[] = beforeBreak.concat(afterBreak);
    return finalArray;
  };
  const orderOfDays = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
  };
  useEffect(() => {
    if (
      authExpertObject?.expert_appointment_schedule &&
      authExpertObject?.expert_appointment_schedule
        .appointment_schedule_type === 1
    ) {
      setBetweenAppointmentsBreak(
        authExpertObject.expert_appointment_schedule
          .appointment_between_appointments_break
          ? authExpertObject.expert_appointment_schedule
              .appointment_between_appointments_break
          : 5
      );
      setAppointmentCondition(1);
      setHasBreak(
        authExpertObject.expert_appointment_schedule.appointment_has_break
      );
      setAppointmentDuration(
        authExpertObject.expert_appointment_schedule.appointment_duration
          ? authExpertObject.expert_appointment_schedule.appointment_duration
          : 60
      );
      setShiftBreakStartHour(
        authExpertObject.expert_appointment_schedule
          .appointment_break_start_hour !== undefined
          ? authExpertObject.expert_appointment_schedule
              .appointment_break_start_hour
          : "12"
      );
      setShiftBreakStartMinute(
        authExpertObject.expert_appointment_schedule
          .appointment_break_start_minute !== undefined
          ? authExpertObject.expert_appointment_schedule
              .appointment_break_start_minute
          : "30"
      );
      setShiftBreakEndHour(
        authExpertObject.expert_appointment_schedule
          .appointment_break_end_hour !== undefined
          ? authExpertObject.expert_appointment_schedule
              .appointment_break_end_hour
          : "13"
      );
      setShiftBreakEndMinute(
        authExpertObject.expert_appointment_schedule
          .appointment_break_end_minute !== undefined
          ? authExpertObject.expert_appointment_schedule
              .appointment_break_end_minute
          : "30"
      );
      if (
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_monday &&
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_monday.length > 0
      ) {
        setShiftDays((oldArray) => [...oldArray, "monday"]);
        setShiftStartHour(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_start_hour || "09"
        );
        setShiftStartMinute(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_start_minute || "00"
        );
        setShiftEndHour(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_end_hour || "17"
        );
        setShiftEndMinute(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_end_minute || "00"
        );
      }
      if (
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_tuesday &&
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_tuesday.length > 0
      ) {
        setShiftDays((oldArray) => [...oldArray, "tuesday"]);
        setShiftStartHour(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_start_hour || "09"
        );
        setShiftStartMinute(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_start_minute || "00"
        );
        setShiftEndHour(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_end_hour || "17"
        );
        setShiftEndMinute(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_end_minute || "00"
        );
      }
      if (
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_wednesday &&
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_wednesday.length > 0
      ) {
        setShiftDays((oldArray) => [...oldArray, "wednesday"]);
        setShiftStartHour(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_start_hour || "09"
        );
        setShiftStartMinute(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_start_minute || "00"
        );
        setShiftEndHour(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_end_hour || "17"
        );
        setShiftEndMinute(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_end_minute || "00"
        );
      }
      if (
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_thursday &&
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_thursday.length > 0
      ) {
        setShiftDays((oldArray) => [...oldArray, "thursday"]);
        setShiftStartHour(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_start_hour || "09"
        );
        setShiftStartMinute(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_start_minute || "00"
        );
        setShiftEndHour(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_end_hour || "17"
        );
        setShiftEndMinute(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_end_minute || "00"
        );
      }
      if (
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_friday &&
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_friday.length > 0
      ) {
        setShiftDays((oldArray) => [...oldArray, "friday"]);
        setShiftStartHour(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_start_hour || "09"
        );
        setShiftStartMinute(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_start_minute || "00"
        );
        setShiftEndHour(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_end_hour || "17"
        );
        setShiftEndMinute(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_end_minute || "00"
        );
      }
      if (
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_saturday &&
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_saturday.length > 0
      ) {
        setShiftDays((oldArray) => [...oldArray, "saturday"]);
        setShiftStartHour(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_start_hour || "09"
        );
        setShiftStartMinute(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_start_minute || "00"
        );
        setShiftEndHour(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_end_hour || "17"
        );
        setShiftEndMinute(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_end_minute || "00"
        );
      }
      if (
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_sunday &&
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_sunday.length > 0
      ) {
        setShiftDays((oldArray) => [...oldArray, "sunday"]);
        setShiftStartHour(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_start_hour || "09"
        );
        setShiftStartMinute(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_start_minute || "00"
        );
        setShiftEndHour(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_end_hour || "17"
        );
        setShiftEndMinute(
          authExpertObject?.expert_appointment_schedule
            .appointment_shift_end_minute || "00"
        );
      }
    } else if (
      authExpertObject?.expert_appointment_schedule &&
      authExpertObject?.expert_appointment_schedule
        .appointment_schedule_type === 2
    ) {
      setBetweenSpecialConditionAppointmentsBreak(
        authExpertObject.expert_appointment_schedule
          .appointment_between_appointments_break
          ? authExpertObject.expert_appointment_schedule
              .appointment_between_appointments_break
          : 5
      );
      setSpecialConditionAppointmentDuration(
        authExpertObject.expert_appointment_schedule.appointment_duration
          ? authExpertObject.expert_appointment_schedule.appointment_duration
          : 60
      );
      setAppointmentCondition(2);
      setSpecialConditionShiftDays([]);
      setSpecialConditionShiftDaysWithTime([]);
      if (
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_monday &&
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_monday.length > 0
      ) {
        setSpecialConditionShiftDays((oldArray) => [...oldArray, "monday"]);
        authExpertObject.expert_appointment_schedule.appointment_schedule_monday.forEach(
          (time) => {
            setSpecialConditionShiftDaysWithTime((oldArray) => [
              ...oldArray,
              {
                day: "monday",
                hour: time[0] + time[1],
                minute: time[3] + time[4],
              },
            ]);
          }
        );
      }
      if (
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_tuesday &&
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_tuesday.length > 0
      ) {
        setSpecialConditionShiftDays((oldArray) => [...oldArray, "tuesday"]);
        authExpertObject.expert_appointment_schedule.appointment_schedule_tuesday.forEach(
          (time) => {
            setSpecialConditionShiftDaysWithTime((oldArray) => [
              ...oldArray,
              {
                day: "tuesday",
                hour: time[0] + time[1],
                minute: time[3] + time[4],
              },
            ]);
          }
        );
      }
      if (
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_wednesday &&
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_wednesday.length > 0
      ) {
        setSpecialConditionShiftDays((oldArray) => [...oldArray, "wednesday"]);
        authExpertObject.expert_appointment_schedule.appointment_schedule_wednesday.forEach(
          (time) => {
            setSpecialConditionShiftDaysWithTime((oldArray) => [
              ...oldArray,
              {
                day: "wednesday",
                hour: time[0] + time[1],
                minute: time[3] + time[4],
              },
            ]);
          }
        );
      }
      if (
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_thursday &&
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_thursday.length > 0
      ) {
        setSpecialConditionShiftDays((oldArray) => [...oldArray, "thursday"]);
        authExpertObject.expert_appointment_schedule.appointment_schedule_thursday.forEach(
          (time) => {
            setSpecialConditionShiftDaysWithTime((oldArray) => [
              ...oldArray,
              {
                day: "thursday",
                hour: time[0] + time[1],
                minute: time[3] + time[4],
              },
            ]);
          }
        );
      }
      if (
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_friday &&
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_friday.length > 0
      ) {
        setSpecialConditionShiftDays((oldArray) => [...oldArray, "friday"]);
        authExpertObject.expert_appointment_schedule.appointment_schedule_friday.forEach(
          (time) => {
            setSpecialConditionShiftDaysWithTime((oldArray) => [
              ...oldArray,
              {
                day: "friday",
                hour: time[0] + time[1],
                minute: time[3] + time[4],
              },
            ]);
          }
        );
      }
      if (
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_saturday &&
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_saturday.length > 0
      ) {
        setSpecialConditionShiftDays((oldArray) => [...oldArray, "saturday"]);
        authExpertObject.expert_appointment_schedule.appointment_schedule_saturday.forEach(
          (time) => {
            setSpecialConditionShiftDaysWithTime((oldArray) => [
              ...oldArray,
              {
                day: "saturday",
                hour: time[0] + time[1],
                minute: time[3] + time[4],
              },
            ]);
          }
        );
      }
      if (
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_sunday &&
        authExpertObject?.expert_appointment_schedule
          .appointment_schedule_sunday.length > 0
      ) {
        setSpecialConditionShiftDays((oldArray) => [...oldArray, "sunday"]);
        authExpertObject.expert_appointment_schedule.appointment_schedule_sunday.forEach(
          (time) => {
            setSpecialConditionShiftDaysWithTime((oldArray) => [
              ...oldArray,
              {
                day: "sunday",
                hour: time[0] + time[1],
                minute: time[3] + time[4],
              },
            ]);
          }
        );
      }
    }
  }, [authExpertObject]);
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <div className="w-full rounded-[15px] bg-color-warning-primary">
        {authExpertObject?.expert_appointment_schedule ? (
          <div></div>
        ) : (
          <AlertHeaderWarning
            alertHeader={{
              type: "warning",
              text: "Randevu almaya başlamanız için randevu çizelgenizi tamamlamanız gerekmektedir.",
            }}
          />
        )}
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-12">
        <h1 className="font-bold text-color-dark-primary">
          Randevu Çizelgesi Oluştur
        </h1>
        <div className="flex w-full flex-col items-start justify-start rounded-[25px] bg-color-white p-5 shadow-lg">
          <div
            className="flex flex-col items-start justify-start gap-10 
        border-b-[1px] border-solid border-color-dark-primary 
        border-opacity-10"
          >
            <h1 className="font-bold text-color-dark-primary">
              Randevu Çizelge Tipini Seçiniz (Gerekli)
            </h1>
            <div className="flex w-full items-center justify-center">
              <div
                className="relative px-10 pb-2 hover:cursor-pointer hover:opacity-80"
                onClick={() => setAppointmentCondition(1)}
              >
                <h1 className="font-bold text-color-dark-primary">
                  Zaman Koşullu
                </h1>
                {appointmentCondition === 1 ? (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    transition={{
                      ease: "backInOut",
                      duration: 0.3,
                      reapat: 1,
                    }}
                    className="absolute right-0 bottom-0 h-1 w-full rounded-full bg-color-main"
                  ></motion.div>
                ) : (
                  <div className="absolute right-0 bottom-0 h-1 w-full"></div>
                )}
                <div className="absolute bottom-full right-0 -mb-2 mr-2 flex w-full items-center justify-end">
                  {authExpertObject?.expert_appointment_schedule &&
                  authExpertObject?.expert_appointment_schedule
                    .appointment_schedule_type === 1 ? (
                    <GrStatusGoodSmall className="text-[16px] text-color-success-primary" />
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div
                className="relative px-10 pb-2 hover:cursor-pointer hover:opacity-80"
                onClick={() => setAppointmentCondition(2)}
              >
                <h1 className="font-bold text-color-dark-primary">
                  Özel Koşullu
                </h1>
                {appointmentCondition === 2 ? (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    transition={{
                      ease: "backInOut",
                      duration: 0.3,
                      reapat: 1,
                    }}
                    className="absolute right-0 bottom-0 h-1 w-full rounded-full bg-color-main"
                  ></motion.div>
                ) : (
                  <div className="absolute right-0 bottom-0 h-1 w-full"></div>
                )}
                <div className="absolute bottom-full right-0 -mb-2 mr-2 flex w-full items-center justify-end">
                  {authExpertObject?.expert_appointment_schedule &&
                  authExpertObject?.expert_appointment_schedule
                    .appointment_schedule_type === 2 ? (
                    <GrStatusGoodSmall className="text-[16px] text-color-success-primary" />
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full py-5">
            {appointmentCondition === 1 ? (
              <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                  reapat: 1,
                }}
                className="flex flex-col items-start justify-start gap-1"
              >
                <h1 className="font-bold text-color-dark-primary">
                  Zaman Koşullu Randevu Oluştur!
                </h1>
                <p className="text-color-dark-primary text-opacity-50">
                  Muayene süreniz kesin bir zaman dilimini kapsıyorsa zaman
                  koşullu randevu çizelgesi oluşturabilirsiniz.
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                  reapat: 1,
                }}
                className="flex flex-col items-start justify-start gap-1"
              >
                <h1 className="font-bold text-color-dark-primary">
                  Özel Koşullu Randevu Oluştur!
                </h1>
                <p className="text-color-dark-primary text-opacity-50">
                  Randevu günlerinizi seçebilir ve seçtiğiniz günler için
                  istediğiniz randevu saatlerini tek tek belirtebilirsiniz.
                </p>
              </motion.div>
            )}
          </div>
          <div
            className="w-full border-t-[1px] border-solid border-color-dark-primary border-opacity-10 
        py-5"
          >
            {appointmentCondition === 1 ? (
              <div className="flex flex-col items-start justify-start gap-10">
                <div className="flex flex-col items-start justify-start gap-1">
                  <h1 className="font-bold text-color-dark-primary">
                    Randevu Günlerini Belirle
                  </h1>
                  <p className="text-color-dark-primary text-opacity-50">
                    Hangi günlerde hasta kabulü yapacağınızı belirtiniz.
                    (gerekli)
                  </p>
                </div>
                <ul className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5">
                  <li
                    className={`p-2 px-6 ${
                      shiftDays.includes("monday")
                        ? "bg-color-success-primary"
                        : "bg-color-gray-primary"
                    } flex cursor-pointer 
                items-center 
                justify-center rounded-[15px] transition-all duration-300`}
                    onClick={() => handleShiftDays("monday")}
                  >
                    <h1 className="text-sm font-bold text-color-dark-primary text-opacity-80">
                      Pazartesi
                    </h1>
                  </li>
                  <li
                    className={`p-2 px-6 ${
                      shiftDays.includes("tuesday")
                        ? "bg-color-success-primary"
                        : "bg-color-gray-primary"
                    } flex cursor-pointer 
                items-center 
                justify-center rounded-[15px] transition-all duration-300`}
                    onClick={() => handleShiftDays("tuesday")}
                  >
                    <h1 className="text-sm font-bold text-color-dark-primary text-opacity-80">
                      Salı
                    </h1>
                  </li>
                  <li
                    className={`p-2 px-6 ${
                      shiftDays.includes("wednesday")
                        ? "bg-color-success-primary"
                        : "bg-color-gray-primary"
                    } flex cursor-pointer 
                items-center 
                justify-center rounded-[15px] transition-all duration-300`}
                    onClick={() => handleShiftDays("wednesday")}
                  >
                    <h1 className="text-sm font-bold text-color-dark-primary text-opacity-80">
                      Çarşamba
                    </h1>
                  </li>
                  <li
                    className={`p-2 px-6 ${
                      shiftDays.includes("thursday")
                        ? "bg-color-success-primary"
                        : "bg-color-gray-primary"
                    } flex cursor-pointer 
                items-center 
                justify-center rounded-[15px] transition-all duration-300`}
                    onClick={() => handleShiftDays("thursday")}
                  >
                    <h1 className="text-sm font-bold text-color-dark-primary text-opacity-80">
                      Perşembe
                    </h1>
                  </li>
                  <li
                    className={`p-2 px-6 ${
                      shiftDays.includes("friday")
                        ? "bg-color-success-primary"
                        : "bg-color-gray-primary"
                    } flex cursor-pointer 
                items-center 
                justify-center rounded-[15px] transition-all duration-300`}
                    onClick={() => handleShiftDays("friday")}
                  >
                    <h1 className="text-sm font-bold text-color-dark-primary text-opacity-80">
                      Cuma
                    </h1>
                  </li>
                  <li
                    className={`p-2 px-6 ${
                      shiftDays.includes("saturday")
                        ? "bg-color-success-primary"
                        : "bg-color-gray-primary"
                    } flex cursor-pointer 
                items-center 
                justify-center rounded-[15px] transition-all duration-300`}
                    onClick={() => handleShiftDays("saturday")}
                  >
                    <h1 className="text-sm font-bold text-color-dark-primary text-opacity-80">
                      Cumartesi
                    </h1>
                  </li>
                  <li
                    className={`p-2 px-6 ${
                      shiftDays.includes("sunday")
                        ? "bg-color-success-primary"
                        : "bg-color-gray-primary"
                    } flex cursor-pointer 
                items-center 
                justify-center rounded-[15px] transition-all duration-300`}
                    onClick={() => handleShiftDays("sunday")}
                  >
                    <h1 className="text-sm font-bold text-color-dark-primary text-opacity-80">
                      Pazar
                    </h1>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex flex-col items-start justify-start gap-10">
                <div className="flex flex-col items-start justify-start gap-1">
                  <h1 className="font-bold text-color-dark-primary">
                    Randevu Günlerini Belirle
                  </h1>
                  <p className="text-color-dark-primary text-opacity-50">
                    Hangi günlerde hasta kabulü yapacağınızı belirtiniz.
                    (gerekli)
                  </p>
                </div>
                <ul className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5">
                  <li
                    className={`p-2 px-6 ${
                      specialConditionShiftDays.includes("monday")
                        ? "bg-color-success-primary"
                        : "bg-color-gray-primary"
                    } flex cursor-pointer 
                items-center 
                justify-center rounded-[15px] transition-all duration-300`}
                    onClick={() => handleSpecialConditionShiftDays("monday")}
                  >
                    <h1 className="text-sm font-bold text-color-dark-primary text-opacity-80">
                      Pazartesi
                    </h1>
                  </li>
                  <li
                    className={`p-2 px-6 ${
                      specialConditionShiftDays.includes("tuesday")
                        ? "bg-color-success-primary"
                        : "bg-color-gray-primary"
                    } flex cursor-pointer 
                items-center 
                justify-center rounded-[15px] transition-all duration-300`}
                    onClick={() => handleSpecialConditionShiftDays("tuesday")}
                  >
                    <h1 className="text-sm font-bold text-color-dark-primary text-opacity-80">
                      Salı
                    </h1>
                  </li>
                  <li
                    className={`p-2 px-6 ${
                      specialConditionShiftDays.includes("wednesday")
                        ? "bg-color-success-primary"
                        : "bg-color-gray-primary"
                    } flex cursor-pointer 
                items-center 
                justify-center rounded-[15px] transition-all duration-300`}
                    onClick={() => handleSpecialConditionShiftDays("wednesday")}
                  >
                    <h1 className="text-sm font-bold text-color-dark-primary text-opacity-80">
                      Çarşamba
                    </h1>
                  </li>
                  <li
                    className={`p-2 px-6 ${
                      specialConditionShiftDays.includes("thursday")
                        ? "bg-color-success-primary"
                        : "bg-color-gray-primary"
                    } flex cursor-pointer 
                items-center 
                justify-center rounded-[15px] transition-all duration-300`}
                    onClick={() => handleSpecialConditionShiftDays("thursday")}
                  >
                    <h1 className="text-sm font-bold text-color-dark-primary text-opacity-80">
                      Perşembe
                    </h1>
                  </li>
                  <li
                    className={`p-2 px-6 ${
                      specialConditionShiftDays.includes("friday")
                        ? "bg-color-success-primary"
                        : "bg-color-gray-primary"
                    } flex cursor-pointer 
                items-center 
                justify-center rounded-[15px] transition-all duration-300`}
                    onClick={() => handleSpecialConditionShiftDays("friday")}
                  >
                    <h1 className="text-sm font-bold text-color-dark-primary text-opacity-80">
                      Cuma
                    </h1>
                  </li>
                  <li
                    className={`p-2 px-6 ${
                      specialConditionShiftDays.includes("saturday")
                        ? "bg-color-success-primary"
                        : "bg-color-gray-primary"
                    } flex cursor-pointer 
                items-center 
                justify-center rounded-[15px] transition-all duration-300`}
                    onClick={() => handleSpecialConditionShiftDays("saturday")}
                  >
                    <h1 className="text-sm font-bold text-color-dark-primary text-opacity-80">
                      Cumartesi
                    </h1>
                  </li>
                  <li
                    className={`p-2 px-6 ${
                      specialConditionShiftDays.includes("sunday")
                        ? "bg-color-success-primary"
                        : "bg-color-gray-primary"
                    } flex cursor-pointer 
                items-center 
                justify-center rounded-[15px] transition-all duration-300`}
                    onClick={() => handleSpecialConditionShiftDays("sunday")}
                  >
                    <h1 className="text-sm font-bold text-color-dark-primary text-opacity-80">
                      Pazar
                    </h1>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="w-full">
            {appointmentCondition === 1 ? (
              <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                  reapat: 1,
                }}
                className="flex w-full flex-col items-start justify-start"
              >
                <div
                  className="flex w-full flex-col items-start justify-start gap-10 border-t-[1px] border-solid border-color-dark-primary border-opacity-10 
      py-5"
                >
                  <div className="flex flex-col items-start justify-start gap-1">
                    <h1 className="font-bold text-color-dark-primary">
                      Mesai Saatlerini Belirle
                    </h1>
                    <p className="text-color-dark-primary text-opacity-50">
                      Mesaiye başlama ve bitiş saatlerinizi belirleyiniz.
                      (gerekli)
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
                    <div
                      className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
                    py-2"
                    >
                      <select
                        name=""
                        id=""
                        className="w-24 text-lg text-opacity-50 outline-none"
                        onChange={(e: any) => setShiftStartHour(e.target.value)}
                      >
                        <option
                          value="00"
                          selected={shiftStartHour === "00" ? true : false}
                        >
                          00
                        </option>
                        <option
                          value="01"
                          selected={shiftStartHour === "01" ? true : false}
                        >
                          01
                        </option>
                        <option
                          value="02"
                          selected={shiftStartHour === "02" ? true : false}
                        >
                          02
                        </option>
                        <option
                          value="03"
                          selected={shiftStartHour === "03" ? true : false}
                        >
                          03
                        </option>
                        <option
                          value="04"
                          selected={shiftStartHour === "04" ? true : false}
                        >
                          04
                        </option>
                        <option
                          value="05"
                          selected={shiftStartHour === "05" ? true : false}
                        >
                          05
                        </option>
                        <option
                          value="06"
                          selected={shiftStartHour === "06" ? true : false}
                        >
                          06
                        </option>
                        <option
                          value="07"
                          selected={shiftStartHour === "07" ? true : false}
                        >
                          07
                        </option>
                        <option
                          value="08"
                          selected={shiftStartHour === "08" ? true : false}
                        >
                          08
                        </option>
                        <option
                          value="09"
                          selected={shiftStartHour === "09" ? true : false}
                        >
                          09
                        </option>
                        <option
                          value="10"
                          selected={shiftStartHour === "10" ? true : false}
                        >
                          10
                        </option>
                        <option
                          value="11"
                          selected={shiftStartHour === "11" ? true : false}
                        >
                          11
                        </option>
                        <option
                          value="12"
                          selected={shiftStartHour === "12" ? true : false}
                        >
                          12
                        </option>
                        <option
                          value="13"
                          selected={shiftStartHour === "13" ? true : false}
                        >
                          13
                        </option>
                        <option
                          value="14"
                          selected={shiftStartHour === "14" ? true : false}
                        >
                          14
                        </option>
                        <option
                          value="15"
                          selected={shiftStartHour === "15" ? true : false}
                        >
                          15
                        </option>
                        <option
                          value="16"
                          selected={shiftStartHour === "16" ? true : false}
                        >
                          16
                        </option>
                        <option
                          value="17"
                          selected={shiftStartHour === "17" ? true : false}
                        >
                          17
                        </option>
                        <option
                          value="18"
                          selected={shiftStartHour === "18" ? true : false}
                        >
                          18
                        </option>
                        <option
                          value="19"
                          selected={shiftStartHour === "19" ? true : false}
                        >
                          19
                        </option>
                        <option
                          value="20"
                          selected={shiftStartHour === "20" ? true : false}
                        >
                          20
                        </option>
                        <option
                          value="21"
                          selected={shiftStartHour === "21" ? true : false}
                        >
                          21
                        </option>
                        <option
                          value="22"
                          selected={shiftStartHour === "22" ? true : false}
                        >
                          22
                        </option>
                        <option
                          value="23"
                          selected={shiftStartHour === "23" ? true : false}
                        >
                          23
                        </option>
                      </select>
                    </div>
                    <div
                      className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
                    py-2"
                    >
                      <select
                        name=""
                        id=""
                        className="w-24 text-lg text-opacity-50 outline-none"
                        onChange={(e: any) =>
                          setShiftStartMinute(e.target.value)
                        }
                      >
                        <option
                          value="00"
                          selected={shiftStartMinute === "00" ? true : false}
                        >
                          00
                        </option>
                        <option
                          value="05"
                          selected={shiftStartMinute === "05" ? true : false}
                        >
                          05
                        </option>
                        <option
                          value="10"
                          selected={shiftStartMinute === "10" ? true : false}
                        >
                          10
                        </option>
                        <option
                          value="15"
                          selected={shiftStartMinute === "15" ? true : false}
                        >
                          15
                        </option>
                        <option
                          value="20"
                          selected={shiftStartMinute === "20" ? true : false}
                        >
                          20
                        </option>
                        <option
                          value="25"
                          selected={shiftStartMinute === "25" ? true : false}
                        >
                          25
                        </option>
                        <option
                          value="30"
                          selected={shiftStartMinute === "30" ? true : false}
                        >
                          30
                        </option>
                        <option
                          value="35"
                          selected={shiftStartMinute === "35" ? true : false}
                        >
                          35
                        </option>
                        <option
                          value="40"
                          selected={shiftStartMinute === "40" ? true : false}
                        >
                          40
                        </option>
                        <option
                          value="45"
                          selected={shiftStartMinute === "45" ? true : false}
                        >
                          45
                        </option>
                        <option
                          value="50"
                          selected={shiftStartMinute === "50" ? true : false}
                        >
                          50
                        </option>
                        <option
                          value="55"
                          selected={shiftStartMinute === "55" ? true : false}
                        >
                          55
                        </option>
                      </select>
                    </div>
                    <h1 className="text-3xl font-light text-color-dark-primary text-opacity-80">
                      -
                    </h1>
                    <div
                      className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
                    py-2"
                    >
                      <select
                        name=""
                        id=""
                        className="w-24 text-lg text-opacity-50 outline-none"
                        onChange={(e: any) => setShiftEndHour(e.target.value)}
                      >
                        <option
                          value="00"
                          selected={shiftEndHour === "00" ? true : false}
                        >
                          00
                        </option>
                        <option
                          value="01"
                          selected={shiftEndHour === "01" ? true : false}
                        >
                          01
                        </option>
                        <option
                          value="02"
                          selected={shiftEndHour === "02" ? true : false}
                        >
                          02
                        </option>
                        <option
                          value="03"
                          selected={shiftEndHour === "03" ? true : false}
                        >
                          03
                        </option>
                        <option
                          value="04"
                          selected={shiftEndHour === "04" ? true : false}
                        >
                          04
                        </option>
                        <option
                          value="05"
                          selected={shiftEndHour === "05" ? true : false}
                        >
                          05
                        </option>
                        <option
                          value="06"
                          selected={shiftEndHour === "06" ? true : false}
                        >
                          06
                        </option>
                        <option
                          value="07"
                          selected={shiftEndHour === "07" ? true : false}
                        >
                          07
                        </option>
                        <option
                          value="08"
                          selected={shiftEndHour === "08" ? true : false}
                        >
                          08
                        </option>
                        <option
                          value="09"
                          selected={shiftEndHour === "09" ? true : false}
                        >
                          09
                        </option>
                        <option
                          value="10"
                          selected={shiftEndHour === "10" ? true : false}
                        >
                          10
                        </option>
                        <option
                          value="11"
                          selected={shiftEndHour === "11" ? true : false}
                        >
                          11
                        </option>
                        <option
                          value="12"
                          selected={shiftEndHour === "12" ? true : false}
                        >
                          12
                        </option>
                        <option
                          value="13"
                          selected={shiftEndHour === "13" ? true : false}
                        >
                          13
                        </option>
                        <option
                          value="14"
                          selected={shiftEndHour === "14" ? true : false}
                        >
                          14
                        </option>
                        <option
                          value="15"
                          selected={shiftEndHour === "15" ? true : false}
                        >
                          15
                        </option>
                        <option
                          value="16"
                          selected={shiftEndHour === "16" ? true : false}
                        >
                          16
                        </option>
                        <option
                          value="17"
                          selected={shiftEndHour === "17" ? true : false}
                        >
                          17
                        </option>
                        <option
                          value="18"
                          selected={shiftEndHour === "18" ? true : false}
                        >
                          18
                        </option>
                        <option
                          value="19"
                          selected={shiftEndHour === "19" ? true : false}
                        >
                          19
                        </option>
                        <option
                          value="20"
                          selected={shiftEndHour === "20" ? true : false}
                        >
                          20
                        </option>
                        <option
                          value="21"
                          selected={shiftEndHour === "21" ? true : false}
                        >
                          21
                        </option>
                        <option
                          value="22"
                          selected={shiftEndHour === "22" ? true : false}
                        >
                          22
                        </option>
                        <option
                          value="23"
                          selected={shiftEndHour === "23" ? true : false}
                        >
                          23
                        </option>
                      </select>
                    </div>
                    <div
                      className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
                    py-2"
                    >
                      <select
                        name=""
                        id=""
                        className="w-24 text-lg text-opacity-50 outline-none"
                        onChange={(e: any) => setShiftEndMinute(e.target.value)}
                      >
                        <option
                          value="00"
                          selected={shiftEndMinute === "00" ? true : false}
                        >
                          00
                        </option>
                        <option
                          value="05"
                          selected={shiftEndMinute === "05" ? true : false}
                        >
                          05
                        </option>
                        <option
                          value="10"
                          selected={shiftEndMinute === "10" ? true : false}
                        >
                          10
                        </option>
                        <option
                          value="15"
                          selected={shiftEndMinute === "15" ? true : false}
                        >
                          15
                        </option>
                        <option
                          value="20"
                          selected={shiftEndMinute === "20" ? true : false}
                        >
                          20
                        </option>
                        <option
                          value="25"
                          selected={shiftEndMinute === "25" ? true : false}
                        >
                          25
                        </option>
                        <option
                          value="30"
                          selected={shiftEndMinute === "30" ? true : false}
                        >
                          30
                        </option>
                        <option
                          value="35"
                          selected={shiftEndMinute === "35" ? true : false}
                        >
                          35
                        </option>
                        <option
                          value="40"
                          selected={shiftEndMinute === "40" ? true : false}
                        >
                          40
                        </option>
                        <option
                          value="45"
                          selected={shiftEndMinute === "45" ? true : false}
                        >
                          45
                        </option>
                        <option
                          value="50"
                          selected={shiftEndMinute === "50" ? true : false}
                        >
                          50
                        </option>
                        <option
                          value="55"
                          selected={shiftEndMinute === "55" ? true : false}
                        >
                          55
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  className="flex w-full flex-col items-start justify-start gap-10 border-t-[1px] border-solid border-color-dark-primary border-opacity-10 
      py-5"
                >
                  <div className="flex flex-col items-start justify-start gap-1">
                    <h1 className="font-bold text-color-dark-primary">
                      Mola Saatlerini Belirle
                    </h1>
                    <p className="text-color-dark-primary text-opacity-50">
                      Mola başlama ve bitiş saatlerinizi belirleyiniz. (gerekli)
                    </p>
                  </div>
                  <div
                    className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
        py-2"
                  >
                    <select
                      name=""
                      id=""
                      className="w-full text-lg text-opacity-50 outline-none"
                      onChange={onHasBreakChange}
                    >
                      <option value="true" selected={hasBreak ? true : false}>
                        Mola Var
                      </option>
                      <option value="false" selected={!hasBreak ? true : false}>
                        Mola Yok
                      </option>
                    </select>
                  </div>
                  {hasBreak ? (
                    <motion.div
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        ease: "easeInOut",
                        duration: 0.5,
                        reapat: 1,
                      }}
                      className="flex flex-col items-center justify-center gap-2 sm:flex-row"
                    >
                      <div
                        className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
                    py-2"
                      >
                        <select
                          name=""
                          id=""
                          className="w-24 text-lg text-opacity-50 outline-none"
                          onChange={(e: any) =>
                            setShiftBreakStartHour(e.target.value)
                          }
                        >
                          <option
                            value="00"
                            selected={
                              shiftBreakStartHour === "00" ? true : false
                            }
                          >
                            00
                          </option>
                          <option
                            value="01"
                            selected={
                              shiftBreakStartHour === "01" ? true : false
                            }
                          >
                            01
                          </option>
                          <option
                            value="02"
                            selected={
                              shiftBreakStartHour === "02" ? true : false
                            }
                          >
                            02
                          </option>
                          <option
                            value="03"
                            selected={
                              shiftBreakStartHour === "03" ? true : false
                            }
                          >
                            03
                          </option>
                          <option
                            value="04"
                            selected={
                              shiftBreakStartHour === "04" ? true : false
                            }
                          >
                            04
                          </option>
                          <option
                            value="05"
                            selected={
                              shiftBreakStartHour === "05" ? true : false
                            }
                          >
                            05
                          </option>
                          <option
                            value="06"
                            selected={
                              shiftBreakStartHour === "06" ? true : false
                            }
                          >
                            06
                          </option>
                          <option
                            value="07"
                            selected={
                              shiftBreakStartHour === "07" ? true : false
                            }
                          >
                            07
                          </option>
                          <option
                            value="08"
                            selected={
                              shiftBreakStartHour === "08" ? true : false
                            }
                          >
                            08
                          </option>
                          <option
                            value="09"
                            selected={
                              shiftBreakStartHour === "09" ? true : false
                            }
                          >
                            09
                          </option>
                          <option
                            value="10"
                            selected={
                              shiftBreakStartHour === "10" ? true : false
                            }
                          >
                            10
                          </option>
                          <option
                            value="11"
                            selected={
                              shiftBreakStartHour === "11" ? true : false
                            }
                          >
                            11
                          </option>
                          <option
                            value="12"
                            selected={
                              shiftBreakStartHour === "12" ? true : false
                            }
                          >
                            12
                          </option>
                          <option
                            value="13"
                            selected={
                              shiftBreakStartHour === "13" ? true : false
                            }
                          >
                            13
                          </option>
                          <option
                            value="14"
                            selected={
                              shiftBreakStartHour === "14" ? true : false
                            }
                          >
                            14
                          </option>
                          <option
                            value="15"
                            selected={
                              shiftBreakStartHour === "15" ? true : false
                            }
                          >
                            15
                          </option>
                          <option
                            value="16"
                            selected={
                              shiftBreakStartHour === "16" ? true : false
                            }
                          >
                            16
                          </option>
                          <option
                            value="17"
                            selected={
                              shiftBreakStartHour === "17" ? true : false
                            }
                          >
                            17
                          </option>
                          <option
                            value="18"
                            selected={
                              shiftBreakStartHour === "18" ? true : false
                            }
                          >
                            18
                          </option>
                          <option
                            value="19"
                            selected={
                              shiftBreakStartHour === "19" ? true : false
                            }
                          >
                            19
                          </option>
                          <option
                            value="20"
                            selected={
                              shiftBreakStartHour === "20" ? true : false
                            }
                          >
                            20
                          </option>
                          <option
                            value="21"
                            selected={
                              shiftBreakStartHour === "21" ? true : false
                            }
                          >
                            21
                          </option>
                          <option
                            value="22"
                            selected={
                              shiftBreakStartHour === "22" ? true : false
                            }
                          >
                            22
                          </option>
                          <option
                            value="23"
                            selected={
                              shiftBreakStartHour === "23" ? true : false
                            }
                          >
                            23
                          </option>
                        </select>
                      </div>
                      <div
                        className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
                    py-2"
                      >
                        <select
                          name=""
                          id=""
                          className="w-24 text-lg text-opacity-50 outline-none"
                          onChange={(e: any) =>
                            setShiftBreakStartMinute(e.target.value)
                          }
                        >
                          <option
                            value="00"
                            selected={
                              shiftBreakStartMinute === "00" ? true : false
                            }
                          >
                            00
                          </option>
                          <option
                            value="05"
                            selected={
                              shiftBreakStartMinute === "05" ? true : false
                            }
                          >
                            05
                          </option>
                          <option
                            value="10"
                            selected={
                              shiftBreakStartMinute === "10" ? true : false
                            }
                          >
                            10
                          </option>
                          <option
                            value="15"
                            selected={
                              shiftBreakStartMinute === "15" ? true : false
                            }
                          >
                            15
                          </option>
                          <option
                            value="20"
                            selected={
                              shiftBreakStartMinute === "20" ? true : false
                            }
                          >
                            20
                          </option>
                          <option
                            value="25"
                            selected={
                              shiftBreakStartMinute === "25" ? true : false
                            }
                          >
                            25
                          </option>
                          <option
                            value="30"
                            selected={
                              shiftBreakStartMinute === "30" ? true : false
                            }
                          >
                            30
                          </option>
                          <option
                            value="35"
                            selected={
                              shiftBreakStartMinute === "35" ? true : false
                            }
                          >
                            35
                          </option>
                          <option
                            value="40"
                            selected={
                              shiftBreakStartMinute === "40" ? true : false
                            }
                          >
                            40
                          </option>
                          <option
                            value="45"
                            selected={
                              shiftBreakStartMinute === "45" ? true : false
                            }
                          >
                            45
                          </option>
                          <option
                            value="50"
                            selected={
                              shiftBreakStartMinute === "50" ? true : false
                            }
                          >
                            50
                          </option>
                          <option
                            value="55"
                            selected={
                              shiftBreakStartMinute === "55" ? true : false
                            }
                          >
                            55
                          </option>
                        </select>
                      </div>
                      <h1 className="text-3xl font-light text-color-dark-primary text-opacity-80">
                        -
                      </h1>
                      <div
                        className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
                    py-2"
                      >
                        <select
                          name=""
                          id=""
                          className="w-24 text-lg text-opacity-50 outline-none"
                          onChange={(e: any) =>
                            setShiftBreakEndHour(e.target.value)
                          }
                        >
                          <option
                            value="00"
                            selected={shiftBreakEndHour === "00"}
                          >
                            00
                          </option>
                          <option
                            value="01"
                            selected={shiftBreakEndHour === "01"}
                          >
                            01
                          </option>
                          <option
                            value="02"
                            selected={shiftBreakEndHour === "02"}
                          >
                            02
                          </option>
                          <option
                            value="03"
                            selected={shiftBreakEndHour === "03"}
                          >
                            03
                          </option>
                          <option
                            value="04"
                            selected={shiftBreakEndHour === "01"}
                          >
                            04
                          </option>
                          <option
                            value="05"
                            selected={shiftBreakEndHour === "05"}
                          >
                            05
                          </option>
                          <option
                            value="06"
                            selected={shiftBreakEndHour === "06"}
                          >
                            06
                          </option>
                          <option
                            value="07"
                            selected={shiftBreakEndHour === "07"}
                          >
                            07
                          </option>
                          <option
                            value="08"
                            selected={shiftBreakEndHour === "08"}
                          >
                            08
                          </option>
                          <option
                            value="09"
                            selected={shiftBreakEndHour === "09"}
                          >
                            09
                          </option>
                          <option
                            value="10"
                            selected={shiftBreakEndHour === "10"}
                          >
                            10
                          </option>
                          <option
                            value="11"
                            selected={shiftBreakEndHour === "11"}
                          >
                            11
                          </option>
                          <option
                            value="12"
                            selected={shiftBreakEndHour === "12"}
                          >
                            12
                          </option>
                          <option
                            value="13"
                            selected={shiftBreakEndHour === "13"}
                          >
                            13
                          </option>
                          <option
                            value="14"
                            selected={shiftBreakEndHour === "14"}
                          >
                            14
                          </option>
                          <option
                            value="15"
                            selected={shiftBreakEndHour === "15"}
                          >
                            15
                          </option>
                          <option
                            value="16"
                            selected={shiftBreakEndHour === "16"}
                          >
                            16
                          </option>
                          <option
                            value="17"
                            selected={shiftBreakEndHour === "17"}
                          >
                            17
                          </option>
                          <option
                            value="18"
                            selected={shiftBreakEndHour === "18"}
                          >
                            18
                          </option>
                          <option
                            value="19"
                            selected={shiftBreakEndHour === "19"}
                          >
                            19
                          </option>
                          <option
                            value="20"
                            selected={shiftBreakEndHour === "20"}
                          >
                            20
                          </option>
                          <option
                            value="21"
                            selected={shiftBreakEndHour === "21"}
                          >
                            21
                          </option>
                          <option
                            value="22"
                            selected={shiftBreakEndHour === "22"}
                          >
                            22
                          </option>
                          <option
                            value="23"
                            selected={shiftBreakEndHour === "23"}
                          >
                            23
                          </option>
                        </select>
                      </div>
                      <div
                        className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
                    py-2"
                      >
                        <select
                          name=""
                          id=""
                          className="w-24 text-lg text-opacity-50 outline-none"
                          onChange={(e: any) =>
                            setShiftBreakEndMinute(e.target.value)
                          }
                        >
                          <option
                            value="00"
                            selected={shiftBreakEndMinute === "00"}
                          >
                            00
                          </option>
                          <option
                            value="05"
                            selected={shiftBreakEndMinute === "05"}
                          >
                            05
                          </option>
                          <option
                            value="10"
                            selected={shiftBreakEndMinute === "10"}
                          >
                            10
                          </option>
                          <option
                            value="15"
                            selected={shiftBreakEndMinute === "15"}
                          >
                            15
                          </option>
                          <option
                            value="20"
                            selected={shiftBreakEndMinute === "20"}
                          >
                            20
                          </option>
                          <option
                            value="25"
                            selected={shiftBreakEndMinute === "25"}
                          >
                            25
                          </option>
                          <option
                            value="30"
                            selected={shiftBreakEndMinute === "30"}
                          >
                            30
                          </option>
                          <option
                            value="35"
                            selected={shiftBreakEndMinute === "35"}
                          >
                            35
                          </option>
                          <option
                            value="40"
                            selected={shiftBreakEndMinute === "40"}
                          >
                            40
                          </option>
                          <option
                            value="45"
                            selected={shiftBreakEndMinute === "45"}
                          >
                            45
                          </option>
                          <option
                            value="50"
                            selected={shiftBreakEndMinute === "50"}
                          >
                            50
                          </option>
                          <option
                            value="55"
                            selected={shiftBreakEndMinute === "55"}
                          >
                            55
                          </option>
                        </select>
                      </div>
                    </motion.div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div
                  className="flex w-full flex-col items-start justify-start gap-10 border-t-[1px] border-solid border-color-dark-primary border-opacity-10 
      py-5"
                >
                  <div className="flex flex-col items-start justify-start gap-1">
                    <h1 className="font-bold text-color-dark-primary">
                      Kısa Mola Süresini Belirle
                    </h1>
                    <p className="text-color-dark-primary text-opacity-50">
                      Randevular arası mola için ayrılacak süreyi belirleyiniz.
                      (gerekli)
                    </p>
                  </div>
                  <div
                    className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
        py-2"
                  >
                    <select
                      name=""
                      id=""
                      className="w-full text-lg text-opacity-50 outline-none"
                      onChange={onBetweenAppointmentsBreakChange}
                    >
                      <option
                        value="5"
                        selected={betweenAppointmentsBreak === 5}
                      >
                        5 Dakika
                      </option>
                      <option
                        value="10"
                        selected={betweenAppointmentsBreak === 10}
                      >
                        10 Dakika
                      </option>
                      <option
                        value="15"
                        selected={betweenAppointmentsBreak === 15}
                      >
                        15 Dakika
                      </option>
                      <option
                        value="20"
                        selected={betweenAppointmentsBreak === 20}
                      >
                        20 Dakika
                      </option>
                      <option
                        value="25"
                        selected={betweenAppointmentsBreak === 25}
                      >
                        25 Dakika
                      </option>
                      <option
                        value="30"
                        selected={betweenAppointmentsBreak === 30}
                      >
                        30 Dakika
                      </option>
                    </select>
                  </div>
                </div>
                <div
                  className="flex w-full flex-col items-start justify-start gap-10 border-t-[1px] border-solid border-color-dark-primary border-opacity-10 
      py-5"
                >
                  <div className="flex flex-col items-start justify-start gap-1">
                    <h1 className="font-bold text-color-dark-primary">
                      Randevu Süresini Belirle
                    </h1>
                    <p className="text-color-dark-primary text-opacity-50">
                      Bir randevu için ayrılacak süreyi belirleyiniz. (gerekli)
                    </p>
                  </div>
                  <div
                    className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
        py-2"
                  >
                    <select
                      name=""
                      id=""
                      className="w-full text-lg text-opacity-50 outline-none"
                      onChange={onAppointmentDurationChange}
                    >
                      <option value="10" selected={appointmentDuration === 10}>
                        10 Dakika
                      </option>
                      <option value="15" selected={appointmentDuration === 15}>
                        15 Dakika
                      </option>
                      <option value="20" selected={appointmentDuration === 20}>
                        20 Dakika
                      </option>
                      <option value="25" selected={appointmentDuration === 25}>
                        25 Dakika
                      </option>
                      <option value="30" selected={appointmentDuration === 30}>
                        30 Dakika
                      </option>
                      <option value="35" selected={appointmentDuration === 35}>
                        35 Dakika
                      </option>
                      <option value="40" selected={appointmentDuration === 40}>
                        40 Dakika
                      </option>
                      <option value="50" selected={appointmentDuration === 50}>
                        50 Dakika
                      </option>
                      <option value="60" selected={appointmentDuration === 60}>
                        60 Dakika
                      </option>
                      <option value="90" selected={appointmentDuration === 90}>
                        90 Dakika
                      </option>
                      <option
                        value="120"
                        selected={appointmentDuration === 120}
                      >
                        120 Dakika
                      </option>
                    </select>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div
                className="w-full border-t-[1px] border-solid border-color-dark-primary border-opacity-10 
        pb-5"
              >
                <div
                  className="flex w-full flex-col items-start justify-start gap-10 border-b-[1px] border-solid border-color-dark-primary border-opacity-10 
  py-5"
                >
                  <div className="flex flex-col items-start justify-start gap-1">
                    <h1 className="font-bold text-color-dark-primary">
                      Randevu Süresini Belirle
                    </h1>
                    <p className="text-color-dark-primary text-opacity-50">
                      Bir randevu için ayrılacak süreyi belirleyiniz. (gerekli)
                    </p>
                  </div>
                  <div
                    className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
    py-2"
                  >
                    <select
                      name=""
                      id=""
                      className="w-full text-lg text-opacity-50 outline-none"
                      onChange={onSpecialConditionAppointmentDurationChange}
                    >
                      <option value="10" selected={specialConditionAppointmentDuration === 10}>
                        10 Dakika
                      </option>
                      <option value="15" selected={specialConditionAppointmentDuration === 15}>
                        15 Dakika
                      </option>
                      <option value="20" selected={specialConditionAppointmentDuration === 20}>
                        20 Dakika
                      </option>
                      <option value="25" selected={specialConditionAppointmentDuration === 25}>
                        25 Dakika
                      </option>
                      <option value="30" selected={specialConditionAppointmentDuration === 30}>
                        30 Dakika
                      </option>
                      <option value="35" selected={specialConditionAppointmentDuration === 35}>
                        35 Dakika
                      </option>
                      <option value="40" selected={specialConditionAppointmentDuration === 40}>
                        40 Dakika
                      </option>
                      <option value="50" selected={specialConditionAppointmentDuration === 50}>
                        50 Dakika
                      </option>
                      <option value="60" selected={specialConditionAppointmentDuration === 60}>
                        60 Dakika
                      </option>
                      <option value="90" selected={specialConditionAppointmentDuration === 90}>
                        90 Dakika
                      </option>
                      <option
                        value="120"
                        selected={specialConditionAppointmentDuration === 120}
                      >
                        120 Dakika
                      </option>
                    </select>
                  </div>
                </div>
                <div
                  className="flex w-full flex-col items-start justify-start gap-10 border-t-[1px] border-solid border-color-dark-primary border-opacity-10 
      py-5"
                >
                  <div className="flex flex-col items-start justify-start gap-1">
                    <h1 className="font-bold text-color-dark-primary">
                      Kısa Mola Süresini Belirle
                    </h1>
                    <p className="text-color-dark-primary text-opacity-50">
                      Randevular arası mola için ayrılacak süreyi belirleyiniz.
                      (gerekli)
                    </p>
                  </div>
                  <div
                    className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
        py-2"
                  >
                    <select
                      name=""
                      id=""
                      className="w-full text-lg text-opacity-50 outline-none"
                      onChange={
                        onBetweenSpecialConditionAppointmentsBreakChange
                      }
                    >
                      <option
                        value="5"
                        selected={
                          betweenSpecialConditionAppointmentsBreak === 5
                        }
                      >
                        5 Dakika
                      </option>
                      <option
                        value="10"
                        selected={
                          betweenSpecialConditionAppointmentsBreak === 10
                        }
                      >
                        10 Dakika
                      </option>
                      <option
                        value="15"
                        selected={
                          betweenSpecialConditionAppointmentsBreak === 15
                        }
                      >
                        15 Dakika
                      </option>
                      <option
                        value="20"
                        selected={
                          betweenSpecialConditionAppointmentsBreak === 20
                        }
                      >
                        20 Dakika
                      </option>
                      <option
                        value="25"
                        selected={
                          betweenSpecialConditionAppointmentsBreak === 25
                        }
                      >
                        25 Dakika
                      </option>
                      <option
                        value="30"
                        selected={
                          betweenSpecialConditionAppointmentsBreak === 30
                        }
                      >
                        30 Dakika
                      </option>
                    </select>
                  </div>
                </div>
                {specialConditionShiftDays.length > 0 ? (
                  <div className="flex flex-col items-start justify-start gap-10 py-5">
                    {specialConditionShiftDays
                      .sort((a, b) => {
                        return orderOfDays[a as keyof typeof orderOfDays] >
                          orderOfDays[b as keyof typeof orderOfDays]
                          ? 1
                          : -1;
                      })
                      .map((day) => {
                        return (
                          <motion.div
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              ease: "easeInOut",
                              duration: 0.5,
                              reapat: 1,
                            }}
                            className="flex flex-col items-start justify-start gap-2"
                          >
                            <div className="flex flex-col items-start justify-start gap-1">
                              <h1 className="font-bold text-color-dark-primary">
                                {handleDay(day)}
                              </h1>
                              <p className="text-color-dark-primary text-opacity-50">
                                {handleDay(day)} günleri için alınabilecek
                                randevu saatlerini giriniz.
                              </p>
                            </div>
                            <ul className="grid grid-cols-5 gap-6">
                              {specialConditionShiftDaysWithTime
                                .filter((date) => date.day === day)
                                .map((time) => {
                                  return (
                                    <li
                                      onClick={() =>
                                        handleRemoveSpecialConditionTime({
                                          day,
                                          hour: time.hour,
                                          minute: time.minute,
                                        })
                                      }
                                      className="group flex cursor-pointer items-center justify-center gap-2 rounded-[15px]
                               bg-color-gray-primary p-2 px-6
                               transition-all duration-300 hover:bg-color-main"
                                    >
                                      <h1
                                        className="text-sm font-bold 
                                    text-color-dark-primary text-opacity-80
                                  transition-all duration-300 group-hover:text-color-white"
                                      >{`${time.hour}:${time.minute}`}</h1>
                                      <AiOutlineCloseCircle className="text-color-dark-primary transition-all duration-300 group-hover:text-color-white" />
                                    </li>
                                  );
                                })}
                            </ul>
                            <div className="flex items-center justify-center gap-2">
                              <div
                                className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
                    py-2"
                              >
                                <select
                                  name=""
                                  id=""
                                  className="w-24 text-lg text-opacity-50 outline-none"
                                  onChange={(e: any) =>
                                    setSpecialConditionShiftStartHour(
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="00">00</option>
                                  <option value="01">01</option>
                                  <option value="02">02</option>
                                  <option value="03">03</option>
                                  <option value="04">04</option>
                                  <option value="05">05</option>
                                  <option value="06">06</option>
                                  <option value="07">07</option>
                                  <option value="08">08</option>
                                  <option value="09" selected>
                                    09
                                  </option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="15">15</option>
                                  <option value="16">16</option>
                                  <option value="17">17</option>
                                  <option value="18">18</option>
                                  <option value="19">19</option>
                                  <option value="20">20</option>
                                  <option value="21">21</option>
                                  <option value="22">22</option>
                                  <option value="23">23</option>
                                </select>
                              </div>
                              <div
                                className="min-w-4 border-[2px] border-solid border-color-dark-primary border-opacity-20 
                    py-2"
                              >
                                <select
                                  name=""
                                  id=""
                                  className="w-24 text-lg text-opacity-50 outline-none"
                                  onChange={(e: any) =>
                                    setSpecialConditionShiftStartMinute(
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="00" selected>
                                    00
                                  </option>
                                  <option value="05">05</option>
                                  <option value="10">10</option>
                                  <option value="15">15</option>
                                  <option value="20">20</option>
                                  <option value="25">25</option>
                                  <option value="30">30</option>
                                  <option value="35">35</option>
                                  <option value="40">40</option>
                                  <option value="45">45</option>
                                  <option value="50">50</option>
                                  <option value="55">55</option>
                                </select>
                              </div>
                              <button
                                onClick={() =>
                                  handleAddSpecialConditionStartTime(day)
                                }
                                className="flex w-full items-center justify-center rounded-[10px] bg-color-secondary p-4 transition-all 
                duration-300 hover:bg-opacity-80"
                              >
                                <h1 className="text-sm font-bold text-color-white">
                                  Ekle
                                </h1>
                              </button>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </div>

          {appointmentCondition === 1 ? (
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                ease: "easeInOut",
                duration: 0.3,
                reapat: 1,
              }}
              className="flex w-full items-center justify-end"
            >
              {shiftDays.length > 0 ? (
                <motion.button
                  disabled={submitDisable}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.3,
                    reapat: 1,
                  }}
                  onClick={handleTimeConditionSubmit}
                  className="flex h-[60px] w-[220px] items-center justify-center rounded-[15px] bg-color-third p-4 transition-all 
                duration-300 hover:bg-color-secondary"
                >
                  {loader ? (
                    <div className="animate-spin">
                      <BiLoaderAlt className="text-[24px] text-color-white text-opacity-80" />
                    </div>
                  ) : (
                    <h1 className="text-lg text-color-white">
                      Zaman Koşullu Kaydet
                    </h1>
                  )}
                </motion.button>
              ) : (
                <div></div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                ease: "easeInOut",
                duration: 0.3,
                reapat: 1,
              }}
              className="flex w-full items-center justify-end"
            >
              {specialConditionShiftDays.length > 0 &&
              specialConditionShiftDaysWithTime.length > 0 ? (
                <motion.button
                  disabled={submitDisable}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    ease: "easeInOut",
                    duration: 0.3,
                    reapat: 1,
                  }}
                  onClick={handleSpecialConditionSubmit}
                  className="flex h-[60px] w-[200px] items-center justify-center rounded-[15px] bg-color-third p-4 transition-all 
                duration-300 hover:bg-color-secondary"
                >
                  {loader ? (
                    <div className="animate-spin">
                      <BiLoaderAlt className="text-[24px] text-color-white text-opacity-80" />
                    </div>
                  ) : (
                    <h1 className="text-lg text-color-white">
                      Özel Koşullu Kaydet
                    </h1>
                  )}
                </motion.button>
              ) : (
                <div></div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
