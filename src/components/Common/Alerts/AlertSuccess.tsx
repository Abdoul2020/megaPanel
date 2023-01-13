import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Alert } from "../../../common/types/Alert";

type Props = {
  alert: Alert;
};

export default function AlertSuccess(props: Props) {
  return (
    <div className="min-w-[350px] mb-10 mr-12 bg-color-success-primary bg-opacity-30 p-6 flex justify-start items-center gap-4 rounded-xl">
      <AiFillCheckCircle className="text-color-success-dark text-[24px]" />
      <h1 className="text-color-success-dark">{props.alert.text}</h1>
    </div>
  );
}
