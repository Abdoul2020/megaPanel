import BASE_URL from "../../common/apis/Api";
import axios from "axios";
import { AuthClientRegisterDto } from "../../common/dtos/auth/client/authClientRegisterDto.dto";
import { AuthClientLoginDto } from "../../common/dtos/auth/client/authClientLoginDto.dto";
import { AuthClientResetPasswordDto } from "../../common/dtos/auth/client/authClientResetPassword.dto";
import { AuthExpertLoginDto } from "../../common/dtos/auth/expert/authExpertLoginDto.dto";
import { AuthExpertRegisterDto } from "../../common/dtos/auth/expert/authExpertRegisterDto.dto";
import { AuthExpertResetPasswordDto } from "../../common/dtos/auth/expert/authExpertResetPassword.dto";
import { AuthClientForgotPasswordDto } from "../../common/dtos/auth/client/authClientForgotPassword.dto";
import { AuthExpertForgotPasswordDto } from "../../common/dtos/auth/expert/authExpertForgotPassword.dto";
import { AuthClientUpdateProfileDto } from "../../common/dtos/auth/client/authClientUpdateProfileDto.dto";
import { AuthClientUpdatePasswordDto } from "../../common/dtos/auth/client/authClientUpdatePasswordDto.dto";

// Register Endpoints

// Client Register Endpoint
export const authClientRegister = async (body: any) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/auth/client/register`,
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

// Login Endpoints

// Client Login Endpoint
export const authClientLogin = async (body: AuthClientLoginDto) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/auth/client/login`,
    data: {
      client_email: body.client_email,
      client_password: body.client_password,
      client_remind_me_token: body.client_remind_me_token,
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

// Token Check Endpoints

// Client Token Check Endpoint
export const authClientTokenCheck = async (token: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/auth/client/token-check`,
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

// Get Profile Endpoints

// Client Get Profile Endpoint

export const authGetProfile = async (token: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/auth/client/profile`,
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

// Reset Password Endpoints

// Client Reset Password Profile Enddpoint

export const authClientResetPassword = async (
  body: AuthClientResetPasswordDto,
  token: string
) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/auth/client/reset-password`,
    data: {
      client_reset_password: body.client_reset_password,
      client_reset_retype_password: body.client_reset_retype_password,
    },
    params: {
      resetPasswordToken: token,
    },
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

// Forgot Password Endpoints

// Client Reset password Profile Endpoints

export const authClientForgotPassword = async (
  body: AuthClientForgotPasswordDto
) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/auth/client/forgot-password`,
    data: {
      client_forgot_password_email: body.client_forgot_password_email,
    },
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

export const authClientUpdateProfile = async (
  token: string,
  body: AuthClientUpdateProfileDto
) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/auth/client/update-profile`,
    headers: { Authorization: `Bearer ${token}` },
    data: body,
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

export const authClientUploadProfilePicture = async (
  token: string,
  file: any
) => {
  let formData = new FormData();
  formData.append("file", file);
  const response = await axios
    .post(`${BASE_URL}/auth/client/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
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

export const authClientDownloadProfilePicture = async (token: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/auth/client/download`,
    headers: { Authorization: `Bearer ${token}` },
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

export const authClientUpdatePassword = async (
  token: string,
  body: AuthClientUpdatePasswordDto
) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/auth/client/update-password`,
    headers: { Authorization: `Bearer ${token}` },
    data: body,
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

export const authExpertActiveAccount = async (token: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/auth/expert/active`,
    headers: { Authorization: `Bearer ${token}` },
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

export const authExpertPassiveAccount = async (token: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/auth/expert/passive`,
    headers: { Authorization: `Bearer ${token}` },
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
