import React from "react";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";
import { Alert } from "../../../common/types/Alert";

type Props = {
  alert: Alert;
};

export default function AlertInfo(props: Props) {
  return (
    <div className="min-w-[350px] mb-10 mr-12 bg-color-info-primary bg-opacity-30 p-6 flex justify-start items-center gap-4 rounded-xl">
      <AiFillExclamationCircle className="text-color-info-dark text-[24px]" />
      <h1 className="text-color-info-dark">{props.alert.text}</h1>
    </div>
  );
}
