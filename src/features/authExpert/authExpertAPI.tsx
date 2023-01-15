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
import { AuthExpertUpdateProfileDto } from "../../common/dtos/auth/expert/authExpertUpdateProfileDto.dto";
import { AuthExpertUpdatePasswordDto } from "../../common/dtos/auth/expert/authExpertUpdatePassword.dto";

// Register Endpoints

// Expert Register Endpoint
export const authExpertRegister = async (body: AuthExpertRegisterDto) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/auth/expert/register`,
    data: {
      expert_name: body.expert_name,
      expert_surname: body.expert_surname,
      expert_email: body.expert_email,
      expert_password: body.expert_password,
      expert_retype_password: body.expert_retype_password,
      expert_branch: body.expert_branch,
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

// Login Endpoints

// Expert Login Endpoint
export const authExpertLogin = async (body: AuthExpertLoginDto) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/auth/expert/login`,
    data: {
      expert_email: body.expert_email,
      expert_password: body.expert_password,
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

export const authExpertTokenCheck = async (token: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/auth/expert/token-check`,
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

// Expert Get Profile Endpoint

export const authExpertGetProfile = async (token: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/auth/expert/profile`,
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

// Expert Update Profile
export const authExpertUpdateProfile = async (
  token: string,
  body: AuthExpertUpdateProfileDto
) => {
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/auth/expert/update-profile`,
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

// Expert Update Password Endpoint

export const authExpertUpdatePassword = async (
  token: string,
  body: AuthExpertUpdatePasswordDto
) => {
  console.log({ token, body });
  const response = await axios({
    method: "patch",
    url: `${BASE_URL}/auth/expert/update-password`,
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

// Reset Password Endpoints

// Expert Reset Password Profile Enddpoint

export const authExpertResetPassword = async (
  body: AuthExpertResetPasswordDto,
  token: string
) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/auth/expert/reset-password`,
    data: {
      expert_reset_password: body.expert_reset_password,
      expert_reset_retype_password: body.expert_reset_retype_password,
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

// Expert Reset password Profile Endpoints

export const authExpertForgotPassword = async (
  body: AuthExpertForgotPasswordDto
) => {
  const response = await axios({
    method: "post",
    url: `${BASE_URL}/auth/expert/forgot-password`,
    data: {
      expert_forgot_password_email: body.expert_forgot_password_email,
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

export const authExpertUploadProfilePicture = async (
  token: string,
  file: any
) => {
  console.log(file);
  let formData = new FormData();
  formData.append("file", file);
  const response = await axios
    .post(`${BASE_URL}/auth/expert/upload`, formData, {
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

export const authExpertDownloadProfilePicture = async (token: string) => {
  const response = await axios({
    method: "get",
    url: `${BASE_URL}/auth/expert/download`,
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

export const authExpertUploadCertificatePdf = async (
  token: string,
  file: any
) => {
  let formData = new FormData();
  formData.append("file", file);
  const response = await axios
    .post(`${BASE_URL}/auth/expert/upload-certificate`, formData, {
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
