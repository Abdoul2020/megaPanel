import BASE_URL from "../../common/apis/Api";
import axios from "axios";

export const fetchCertificates = async (expertID?: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/certificates`,
    params: { certificate_owner: expertID },
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

export const fetchCertificatePdf = async (id?: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/certificates/${id}/download`,
  })
    .then((response: any) => {
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

export const removeCertificatePdf = async (id: string, token: string) => {
  const response = await axios({
    method: "delete",
    url: `${BASE_URL}/certificates/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response: any) => {
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
