// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NFTStorage, Blob } from "nft.storage";

type Data = {
  IpfsHash: string;
};

// const PINATA_BASE_URL = "https://api.pinata.cloud";
// const endpoint = "/pinning/pinFileToIPFS";

const API_KEY = process.env.NFT_STORAGE_API_KEY;
const client = new NFTStorage({
  //@ts-ignore
  token: API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") {
    const blob = req.body.blob;
    const nft_name = req.body.nft_name;
    const description = req.body.description;
    const nft = {
      name: nft_name,
      description: description,
      image: new Blob([blob], { type: "image/png" }),
    };
    const response = await client.store(nft);
    console.log(response.url);
    res.status(200).json({ IpfsHash: response.url });
  } else {
    res.status(404);
  }
}
