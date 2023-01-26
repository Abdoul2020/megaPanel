import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { AppointmentFilterDto } from "../../../../common/dtos/filter/AppointmentFilter";
import { fetchAppointments } from "../../../../features/appointments/appointmentsAPI";
import { addAuthAppointment } from "../../../../features/auth/authSlice";
import DashboardAppointment from "./DashboardAppointment/DashboardAppointment";

type Props = {};

export default function DashboardAppointmentsPatient({}: Props) {
  const dispatch = useAppDispatch();

  const authObject = useAppSelector((state) => state.auth.auth_object);
  const authAppointments = useAppSelector(
    (state) => state.auth.auth_appointments
  );
  useEffect(() => {
    async function fetchData() {
      if (authObject !== undefined) {
        const query: AppointmentFilterDto = {
          appointment_client_client: authObject._id,
        };
        const myApoointmentsResponse = await fetchAppointments(query);
        const myApoointmentsSuccess = myApoointmentsResponse.success;
        if (myApoointmentsSuccess) {
          const data = myApoointmentsResponse.data.data;
          dispatch(addAuthAppointment(data));
        }
      }
    }
    fetchData();
  }, [authObject]);
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <div className="w-full flex flex-col justify-start items-start gap-12">
        <h1 className="text-color-dark-primary font-bold">Randevularım</h1>
      </div>
      {authAppointments.length !== 0 ? (
        <div className="w-full min-h-[85vh] flex flex-col justify-start items-start gap-10 shadow-lg bg-color-white rounded-[25px] p-5">
          {authAppointments.map((appointment) => {
            return (
              <DashboardAppointment
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
