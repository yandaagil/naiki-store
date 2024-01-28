import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await retrieveData("products");
  if (req.method === "GET") {
    res
      .status(200)
      .json({ status: true, statusCode: 200, message: "success", data });
  }
}
