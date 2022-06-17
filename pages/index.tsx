import type { NextPage } from "next";
import Step_1 from "../components/step_1/step_1";

const Home: NextPage = () => {
  return <Step_1 step={0} next_page={"/metadata"} />;
};

export default Home;
