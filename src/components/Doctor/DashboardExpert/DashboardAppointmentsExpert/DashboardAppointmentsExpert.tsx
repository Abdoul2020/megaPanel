import { useEffect } from "react";
import { HiArrowUturnRight } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { AppointmentFilterDto } from "../../../../common/dtos/filter/AppointmentFilter";
import { fetchAppointments } from "../../../../features/appointments/appointmentsAPI";
import { addAutExperthAppointment } from "../../../../features/authExpert/authExpertSlice";
import DashboardAppointmentExpert from "./DashboardAppointmentExpert/DashboardAppointmentExpert";

type Props = {};

export default function DashboardAppointmentsExpert({}: Props) {
  const dispatch = useAppDispatch();

  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  const authExpertAppointments = useAppSelector(
    (state) => state.authexpert.auth_expert_appointments
  );
  useEffect(() => {
    async function fetchData() {
      if (authExpertObject !== undefined) {
        const query: AppointmentFilterDto = {
          appointment_owner: authExpertObject._id,
        };
        const myAppointmentsResponse = await fetchAppointments(query);
        const myAppointmentsSuccess = myAppointmentsResponse.success;
        if (myAppointmentsSuccess) {
          const data = myAppointmentsResponse.data.data;
          dispatch(addAutExperthAppointment(data));
        }
      }
    }
    fetchData();
  }, [authExpertObject]);
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <div className="flex w-full items-center justify-start gap-2">
        <h1 className="font-bold text-color-dark-primary">
          Randevularım
          <span className="font-bold text-color-dark-primary opacity-50">
            (verdiğim)
          </span>
        </h1>
        <HiArrowUturnRight className="text-[24px] font-bold text-color-dark-primary opacity-80" />
      </div>
      {authExpertAppointments.length !== 0 ? (
        <div className="flex min-h-[85vh] w-full flex-col items-start justify-start gap-5 rounded-[25px] bg-color-white p-5 shadow-lg">
          {authExpertAppointments.map((appointment: any) => {
            return (
              <DashboardAppointmentExpert
                key={appointment._id}
                appointment={appointment}
              />
            );
          })}
        </div>
      ) : (
        <h1>Henüz burada gösterilecek bir şey yok.</h1>
      )}
    </div>
  );
}
