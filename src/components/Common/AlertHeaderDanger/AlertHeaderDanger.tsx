import { motion } from "framer-motion";
import { AiFillCheckCircle } from "react-icons/ai";
import { Alertheader } from "../../../common/types/AlertHeader";

type Props = {
  alertHeader: Alertheader;
};

export default function AlertHeaderDanger(props: Props) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
        reapat: 1,
      }}
      className="flex w-full items-center justify-start gap-4 rounded-[15px] bg-color-danger-primary p-6"
    >
      <AiFillCheckCircle className="text-[24px] text-color-white" />
      <h1 className="text-color-white">{props.alertHeader.text}</h1>
    </motion.div>
  );
}
