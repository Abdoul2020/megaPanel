import { MdBusinessCenter } from "react-icons/md";
import { Branch } from "../../../common/types/Branch.entity";

type Props = {
  key: string;
  branch: Branch;
};

export default function BranchCardb(props: Props) {
  return (
    <div className=" flex h-[250px] min-w-[225px] flex-col items-center justify-center gap-2">
      <MdBusinessCenter className="mt-6 text-[64px] text-color-main opacity-80" />
      <h1 className="text-center text-sm font-semibold uppercase tracking-wide text-color-dark-primary opacity-80">
        {props.branch.branch_title}
      </h1>
      {/* <button className="relative overflow-hidden hover:bg-color-main hover:bg-opacity-100 bg-color-secondary bg-opacity-20 w-full rounded-[30px] py-3 group transition-all duration-300">
          <h1 className="group-hover:text-color-white-secondary transition-all duration-300 text-color-main font-bold tracking-wide">
             39 Uzman
          </h1>
        </button> */}
    </div>
  );
}
