import { useStore } from "../../hooks/useStore";

export interface MetadataEditorProps {
  language: string;
  color: string;
}

export const MetadataEditor = ({ language, color }: MetadataEditorProps) => {
  const description = useStore((state) => state.description);
  const setDescription = useStore((state) => state.setDescription);
  const nftName = useStore((state) => state.nft_name);
  const setNFTName = useStore((state) => state.setNFTName);

  return (
    <>
      <div className="min-h-[300px] grid grid-cols-[60%_40%] align-middle">
        <div>
          <input
            id="nft-name-input"
            required
            placeholder="Name of your NFT"
            value={nftName}
            onChange={(e) => setNFTName(e.target.value)}
            className="input input-bordered w-full mt-3 ml-10 mr-10"
          />
          <textarea
            className="textarea textarea-bordered w-[100%] h-[200px] resize-none mt-3 ml-10 mr-10"
            placeholder="Add description of your code snippet..."
            id="description-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="stats stats-vertical shadow-lg shadow-primary w-[80%] ml-16 h-[260px] mt-2">
          <div className="stat h-[125px]">
            <div className="stat-title">Language</div>
            <div className="stat-value">{language}</div>
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
