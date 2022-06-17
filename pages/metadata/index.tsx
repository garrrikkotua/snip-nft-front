import type { NextPage } from "next";
import Step_2 from "../../components/step_2/step_2";

const Metadata: NextPage = () => {
  return <Step_2 step={1} next_page="/mint" />;
};

export default Metadata;
