export interface ProgressBarProps {
  step: number;
}

export const ProgressBar = ({ step }: ProgressBarProps) => {
  return (
    <ul className="steps steps-vertical lg:steps-horizontal mt-5">
      <li className="step step-primary">Create Image</li>
      <li className={"step" + (step > 0 ? " step-primary" : "")}>
        Add Description
      </li>
      <li className={"step" + (step > 1 ? " step-primary" : "")}>Mint NFT</li>
      <li className={"step" + (step > 2 ? " step-primary" : "")}>
        View on OpenSea
      </li>
    </ul>
  );
};
