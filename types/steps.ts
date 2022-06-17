export enum Steps {
  Create_Image,
  Add_Description,
  Mint_NFT,
  View_On_OpenSea,
}

export const NUMBER_OF_STEPS = 4;

export const EditorHeadings = {
  0: "Snippet Editor",
  1: "Description Editor",
  2: "Preview your NFT",
  3: "View on OpenSea",
};

export const ToolTips = {
  0: "Add your code, choose colors, style and language",
  1: "This description will be shown alongside NFT on a marketplace",
  2: "Choose network where you want to mint NFT",
  3: "Preview it on OpenSea",
};

export interface StepProps {
  step: number;
  next_page: "/metadata" | "/mint" | "/view";
}
