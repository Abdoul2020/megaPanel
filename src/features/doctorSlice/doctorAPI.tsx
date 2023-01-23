import BASE_URL from "../../common/apis/Api";
import axios from "axios";
import { ExpertFilterDto } from "../../common/dtos/filter/ExpertFilter";

const generalQuery = {
  page: 1,
  size: 10,
  sort: "ASC",
  sort_by: "expert_name",
  count: false,
  query_text: "",
  city: "",
  operating_type: 2,
  location: "",
};

export const fetchExperts = async (query?: ExpertFilterDto) => {
  const searchValue = await { ...generalQuery, ...query };
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/experts`,
    params: {
      page: searchValue?.page,
      size: searchValue?.size,
      sort: searchValue?.sort,
      sort_by: searchValue?.sort_by,
      count: searchValue.count,
      query_text: searchValue?.query_text,
      expert_city_location: searchValue?.city,
      expert_operating_type: searchValue?.operating_type,
    },
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

export const fetchExpert = async (expertID?: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/experts/${expertID}`,
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

export const fetchExpertsCount = async (query?: ExpertFilterDto) => {
  const searchValue = await { ...generalQuery, ...query };
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/experts/count`,
    params: {
      page: searchValue?.page,
      size: searchValue?.size,
      sort: searchValue?.sort,
      sort_by: searchValue?.sort_by,
      count: searchValue.count,
      query_text: searchValue?.query_text,
      expert_city_location: searchValue?.city,
      expert_operating_type: searchValue?.operating_type,
    },
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

export const fetchExpertProfilePicture = async (id?: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/experts/${id}/download`,
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
