// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import pinataSDK from "@pinata/sdk";

type Data = {
  IpfsHash: string;
};

// const PINATA_BASE_URL = "https://api.pinata.cloud";
// const endpoint = "/pinning/pinFileToIPFS";

const pinata = pinataSDK(
  //@ts-ignore
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "POST") {
    const data = req.body;
    console.log(data);
    const response = await pinata.pinJSONToIPFS(data);
    res.status(200).json({ IpfsHash: response.IpfsHash });
  } else {
    res.status(404);
  }
}
