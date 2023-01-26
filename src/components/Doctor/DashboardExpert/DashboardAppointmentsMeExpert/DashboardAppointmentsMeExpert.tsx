import { useEffect } from "react";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { AppointmentFilterDto } from "../../../../common/dtos/filter/AppointmentFilter";
import { fetchAppointments } from "../../../../features/appointments/appointmentsAPI";
import {
  addAutExperthMyAppointment
} from "../../../../features/authExpert/authExpertSlice";
import DashboardAppointmentMeExpert from "./DashboardAppointmentMeExpert/DashboardAppointmentMeExpert";

type Props = {};

export default function DashboardAppointmentsMeExpert({}: Props) {
  const dispatch = useAppDispatch();

  const authExpertObject = useAppSelector(
    (state) => state.authexpert.auth_expert_object
  );
  const authExpertMyAppointments = useAppSelector(
    (state) => state.authexpert.auth_expert_myappointments
  );
  useEffect(() => {
    async function fetchData() {
      if (authExpertObject !== undefined) {
        const query: AppointmentFilterDto = {
          appointment_client_expert: authExpertObject._id,
        };
        const myAppointmentsResponse = await fetchAppointments(query);
        const myAppointmentsSuccess = myAppointmentsResponse.success;
        if (myAppointmentsSuccess) {
          const data = myAppointmentsResponse.data.data;
          dispatch(addAutExperthMyAppointment(data));
        }
      }
    }
    fetchData();
  }, [authExpertObject]);
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <div className="w-full flex justify-start items-center gap-2">
        <h1 className="text-color-dark-primary font-bold">
          Randevularım{" "}
          <span className="text-color-dark-primary font-bold opacity-50">
            (aldığım)
          </span>
        </h1>
        <HiArrowUturnLeft className="text-color-dark-primary font-bold opacity-80 text-[24px]" />
      </div>
      {authExpertMyAppointments.length !== 0 ? (
        <div className="w-full min-h-[85vh] flex flex-col justify-start items-start gap-10 shadow-lg bg-color-white rounded-[25px] p-5">
          {authExpertMyAppointments.map((appointment) => {
            return (
              <DashboardAppointmentMeExpert
                key={appointment._id}
                appointment={appointment}
              />
            );
          })}
        </div>
      ) : (
        <h1>Henüz burada gösterilecek bir şey yok</h1>
      )}
    </div>
  );
}
