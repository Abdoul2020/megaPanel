import React, { useEffect } from "react";
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
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <div className="w-full flex justify-start items-center gap-2">
        <h1 className="text-color-dark-primary font-bold">
          Randevularım{" "}
          <span className="text-color-dark-primary font-bold opacity-50">
            (verdiğim)
          </span>
        </h1>
        <HiArrowUturnRight className="text-color-dark-primary font-bold opacity-80 text-[24px]" />
      </div>
      {authExpertAppointments.length !== 0 ? (
        <div className="w-full min-h-[85vh] flex flex-col justify-start items-start gap-10 shadow-lg bg-color-white rounded-[25px] p-5">
          {authExpertAppointments.map((appointment) => {
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
