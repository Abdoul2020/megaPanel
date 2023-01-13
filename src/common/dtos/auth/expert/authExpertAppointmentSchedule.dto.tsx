export interface AuthExpertAppointmentScheduleDto {
  appointment_schedule_type?: number;
  appointment_schedule_duration?: number;
  appointment_schedule_monday?: string[];
  appointment_schedule_tuesday?: string[];
  appointment_schedule_wednesday?: string[];
  appointment_schedule_thursday?: string[];
  appointment_schedule_friday?: string[];
  appointment_schedule_saturday?: string[];
  appointment_schedule_sunday?: string[];
}
