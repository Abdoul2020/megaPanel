import React from "react";
import { isAuth } from "./authHelper";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { Alert } from "../common/types/Alert";
import { updateAlert } from "../features/options/optionsSlice";

type Props = {
  redirect_url: string;
  children: JSX.Element;
};

export default function ProtectedRoute({
  redirect_url,
  children,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();
  if (!isAuth()) {
    const alert: Alert = {
      type: "warning",
      text: "Oturumum zaman aşımına uğradı.",
      active: true,
      statusCode: 408,
    };
    dispatch(updateAlert(alert));
    return <Navigate to={redirect_url} />;
  }
  return children;
}
