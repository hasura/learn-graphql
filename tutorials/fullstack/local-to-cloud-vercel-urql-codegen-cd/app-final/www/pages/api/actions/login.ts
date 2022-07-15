import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import client from "../_utils/client";
import { generateJWT } from "../../../utils/jwt";

import {
  CheckFriend,
  CheckFriendQuery,
  CheckFriendQueryVariables,
} from "../../../generated/graphql";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password }: { username?: string; password: string } =
    req.body;

  return client
    .query<CheckFriendQuery, CheckFriendQueryVariables>(CheckFriend, {
      username,
    })
    .toPromise()
    .then(async (result) => {
      if (result?.error) {
        console.log(result.error.graphQLErrors);
        return res.status(400).json({
          message: "Error with query",
          payload: result.error.graphQLErrors,
        });
      } else {
        const friend = result.data?.friend[0];
        if (!friend)
          return res.status(400).json({ message: "Something went wrong" });

        const validPassword = await bcrypt.compare(password, friend.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid" });

        const token = generateJWT({
          otherClaims: {
            "X-Hasura-User-Id": friend.id.toString(),
          },
        });

        return res.status(200).json({
          token,
          id: friend.id,
          username: friend.username,
        });
      }
    })
    .catch((e: any) => {
      console.log("server error");
      return res.status(400).json({ code: e.name, message: e.message });
    });
}
