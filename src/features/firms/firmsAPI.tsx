import BASE_URL from "../../common/apis/Api";
import axios from "axios";
import { FirmFilterDto } from "../../common/filters/FirmFilter.dto";

const generalQuery = {
  page: 1,
  size: 5,
  sort: "ASC",
  sort_by: "branch_title",
  query_text: "",
  firmType:""
};

export const fetchFirms = async (query?: FirmFilterDto) => {
  const searchValue = await { ...generalQuery, ...query };
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/firms`,
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
