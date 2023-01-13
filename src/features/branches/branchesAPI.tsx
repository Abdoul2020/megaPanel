import BASE_URL from "../../common/apis/Api";
import axios from "axios";

export const fetchBranches = async () => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/branches`,
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
