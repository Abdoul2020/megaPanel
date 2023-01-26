type Props = {};

export default function DashboardNotFoundPageExpert({}: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <img
        src={require("../../../../assets/images/page_not_found_tsp.png")}
        alt=""
        className="h-1/2"
      />
    </div>
  );
}
