// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import { NFTStorage } from "nft.storage";

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
    const image = req.body;
    const newData = image.replace(/^data:image\/png;base64,/, "");
    // const newData = image.replace(
    //   /^data:image\/svg + xml;charset = utf - 8,/,
    //   ""
    // );
    console.log("Hit API route");
    const buff = Buffer.from(newData, "base64");
    const stream = Readable.from(buff);

    // ¡¡ THE HACK !!
    //@ts-ignore
    stream.path = "another_filename.jpg";
    const response = await pinata.pinFileToIPFS(stream);
    res.status(200).json({ IpfsHash: response.IpfsHash });
  } else {
    res.status(404);
  }
}
