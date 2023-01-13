import BASE_URL from "../../common/apis/Api";
import axios from "axios";
import { CreateAppointmentDto } from "../../common/dtos/createAppointmentDto";

export const fetchAppointmentTypes = async () => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/appointment-types`,
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
