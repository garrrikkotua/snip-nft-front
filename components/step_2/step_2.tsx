import { MetadataEditor } from "../snippet_editor/metadata_editor";
import { useRouter } from "next/router";
import { ProgressBar } from "../snippet_editor/progress_bar";
import { Steps, StepProps } from "../../types/steps";
import { ToolTips } from "../../types/steps";
import { EditorHeadings } from "../../types/steps";

export default function Step_2({ step, next_page }: StepProps) {
  const router = useRouter();
  return (
    <>
      <h3
        className={
          "font-bold justify-self-center self-center row-start-1 md:row-start-auto tooltip tooltip-primary pt-2"
        }
        data-tip={ToolTips[step]}
      >
        {EditorHeadings[step]}
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(next_page);
        }}
      >
        <MetadataEditor />
        <button className="btn btn-primary mt-5 w-full" type="submit">
          {Steps[step].split("_").join(" ")}
        </button>
      </form>
      <ProgressBar step={step} />
    </>
  );
}
