import BASE_URL from "../../common/apis/Api";
import axios from "axios";
import { CreateAppointmentDto } from "../../common/dtos/createAppointmentDto";
import { AppointmentFilterDto } from "../../common/dtos/filter/AppointmentFilter";

export const createAppointment = async (
  token: string,
  body: CreateAppointmentDto
) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/appointments`,
    data: body,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      return {
        success: true,
        data: response,
      };
    })
    .catch((err) => {
      return {
        success: false,
        data: err,
      };
    });
  return response;
};

export const fetchAppointments = async (query: AppointmentFilterDto) => {
  const resopnse = await axios({
    method: "get",
    url: `${BASE_URL}/appointments`,
    params: query,
  })
    .then((response) => {
      return {
        success: true,
        data: response,
      };
    })
    .catch((err) => {
      return {
        success: false,
        data: err,
      };
    });
  return resopnse;
};

export const acceptAppointment = async (token: string, id: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/appointments/${id}/accept`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      return {
        success: true,
        data: response,
      };
    })
    .catch((err) => {
      return {
        success: false,
        data: err,
      };
    });
  return response;
};

export const declineAppointment = async (token: string, id: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/appointments/${id}/decline`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      return {
        success: true,
        data: response,
      };
    })
    .catch((err) => {
      return {
        success: false,
        data: err,
      };
    });
  return response;
};
