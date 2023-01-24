export type AppointmentSchedule = {
  appointment_schedule_type: number;
  appointment_has_break: boolean;
  appointment_duration?: number;
  appointment_shift_start_hour?: string;
  appointment_shift_start_minute?: string;
  appointment_shift_end_hour?: string;
  appointment_shift_end_minute?: string;
  appointment_schedule_monday?: any[];
  appointment_schedule_tuesday?: any[];
  appointment_schedule_wednesday?: any[];
  appointment_schedule_thursday?: any[];
  appointment_schedule_friday?: any[];
  appointment_schedule_saturday?: any[];
  appointment_schedule_sunday?: any[];
  appointment_break_start_hour?: any;
  appointment_break_start_minute?: any;
  appointment_break_end_hour?: any;
  appointment_break_end_minute?: any;
  appointment_between_appointments_break?:number;
};
