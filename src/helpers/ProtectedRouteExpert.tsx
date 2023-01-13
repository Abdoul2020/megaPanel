import React from "react";
import { isAuth } from "./authHelper";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { Alert } from "../common/types/Alert";
import { updateAlert } from "../features/options/optionsSlice";
import { isAuthExpert } from "./authExpertHelper";

type Props = {
  redirect_url: string;
  children: JSX.Element;
};

export default function ProtectedRouteExpert({
  redirect_url,
  children,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  if (!isAuthExpert()) {
    const alert: Alert = {
      type: "warning",
      text: "Oturumunuzun süresi doldu",
      active: true,
      statusCode: 408,
    };
    dispatch(updateAlert(alert));
    return <Navigate to={redirect_url} />;
  }
  return children;
}
