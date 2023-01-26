import { motion } from "framer-motion";
import { AiFillCheckCircle } from "react-icons/ai";
import { Alertheader } from "../../../common/types/AlertHeader";

type Props = {
  alertHeader: Alertheader;
};

export default function AlertHeaderWarning(props: Props) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.5,
        reapat: 1,
      }}
      className="w-full bg-color-warning-primary bg-opacity-30 p-6 flex justify-start items-center gap-4 rounded-[30px]"
    >
      <AiFillCheckCircle className="text-color-white text-[24px]" />
      <h1 className="text-color-white">{props.alertHeader.text}</h1>
    </motion.div>
  );
}
