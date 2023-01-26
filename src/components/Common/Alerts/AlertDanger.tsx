import { AiFillCloseCircle } from "react-icons/ai";
import { Alert } from "../../../common/types/Alert";

type Props = {
  alert: Alert;
};

export default function AlertDanger(props: Props) {
  return (
    <div className="flex min-w-full items-center justify-start gap-4 rounded-none bg-color-danger-primary p-6 sm:mb-10 sm:mr-12 sm:min-w-[350px] sm:rounded-xl">
      <AiFillCloseCircle className="text-[24px] text-color-white" />
      <h1 className="text-color-white">{props.alert.text}</h1>
    </div>
  );
}
