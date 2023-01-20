import React from "react";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";
import { Alert } from "../../../common/types/Alert";

type Props = {
  alert: Alert;
};

export default function AlertInfo(props: Props) {
  return (
    <div className="flex min-w-full items-center justify-start gap-4 rounded-none bg-color-info-primary p-6 sm:mb-10 sm:mr-12 sm:min-w-[350px] sm:rounded-xl">
      <AiFillExclamationCircle className="text-[24px] text-color-white" />
      <h1 className="text-color-white">{props.alert.text}</h1>
    </div>
  );
}
