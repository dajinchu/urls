import { NextApiRequest, NextApiResponse } from "next";

/**
 * Follow URL redirects
 */
export default async function fixURL(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  console.log(body.url);
  if (body.url) {
    try {
      const redirected = await fetch(body.url);
      res.json({ url: redirected.url });
    } catch (e) {
      res.status(400).send("");
    }
  }
}
