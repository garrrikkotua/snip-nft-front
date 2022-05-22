import { useStore } from "../../hooks/useStore";

export interface MetadataEditorProps {
  language: string;
  color: string;
}

export const MetadataEditor = ({ language, color }: MetadataEditorProps) => {
  const [description, setDescription] = useStore((state) => [
    state.description,
    state.setDescription,
  ]);
  return (
    <>
      <div className="min-h-[300px] grid grid-cols-[60%_40%] align-middle">
        <textarea
          className="textarea textarea-bordered w-[100%] h-[250px] resize-none mt-3 ml-10 mr-10"
          placeholder="Add description of your code snippet..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="stats stats-vertical shadow-lg shadow-primary w-[80%] ml-16 h-[250px] mt-2">
          <div className="stat h-[125px]">
            <div className="stat-title">Language</div>
            <div className="stat-value">{language}</div>
            <div className="stat-desc">Extension .py</div>
          </div>

          <div className="stat h-[125px]">
            <div className="stat-title">Background color</div>
            <div className="stat-value">{color}</div>
          </div>
        </div>
      </div>
    </>
  );
};
