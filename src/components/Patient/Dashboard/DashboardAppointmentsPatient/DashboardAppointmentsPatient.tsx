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
          is_canceled: false,
        };
        const myApoointmentsResponse = await fetchAppointments(query);
        console.log({ myApoointmentsResponse });
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
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <div className="flex w-full flex-col items-start justify-start gap-12">
        <h1 className="font-bold text-color-dark-primary">Randevularım</h1>
      </div>
      {authAppointments.length !== 0 ? (
        <div className="flex min-h-[85vh] w-full flex-col items-start justify-start gap-10 rounded-[25px] bg-color-white p-5 shadow-lg">
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
