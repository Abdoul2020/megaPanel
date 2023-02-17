import BASE_URL from "../../common/apis/Api";
import axios from "axios";
import { ExpertiseFilterDto } from "../../common/filters/ExpertiseFilter.dto";

const generalQuery = {
  page: 1,
  size: 50,
  sort: "ASC",
  sort_by: "branch_title",
  query_text: "",
};

export const fetchSpecializations = async (query?: ExpertiseFilterDto) => {
  const searchValue = await { ...generalQuery, ...query };
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/specializations`,
    params: searchValue,
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
