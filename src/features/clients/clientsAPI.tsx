import BASE_URL from "../../common/apis/Api";
import axios from "axios";

export const fetchClient = async (clientID: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/clients/${clientID}`,
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

export const fetchClientProfilePicture = async (id: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/clients/${id}/download`,
  })
    .then((response) => {
      return { success: true, data: response };
    })
    .catch((err) => {
      return {
        success: false,
        data: err,
      };
    });
  return response;
};
