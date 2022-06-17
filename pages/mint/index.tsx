import type { NextPage } from "next";
import Step_3 from "../../components/step_3/step_3";

const Mint: NextPage = () => {
  return <Step_3 step={2} next_page={"/view"} />;
};

export default Mint;
