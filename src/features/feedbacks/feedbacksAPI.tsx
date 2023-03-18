import axios from "axios";
import BASE_URL from "../../common/apis/Api";
import { CreateFeedBackDto } from "../../common/dtos/CreateFeedBackDto";

export const createFeedBack = async (body?: CreateFeedBackDto) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/feedbacks`,
    data: body,
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
