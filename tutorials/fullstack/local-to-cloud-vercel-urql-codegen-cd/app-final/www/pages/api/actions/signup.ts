import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import client from "../_utils/client";

import { generateJWT } from "../../../utils/jwt";

import checkMessage from "../../../utils/checkMessage";

import {
  InsertFriendOne,
  InsertFriendOneMutation,
  InsertFriendOneMutationVariables,
} from "../../../generated/graphql";

const notUnique = checkMessage("Uniqueness violation");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password }: { username?: string; password: string } =
    req.body;

  const hashedPass = await bcrypt.hash(password, 10);

  return client
    .mutation<InsertFriendOneMutation, InsertFriendOneMutationVariables>(
      InsertFriendOne,
      {
        username,
        password: hashedPass,
      }
    )
    .toPromise()
    .then((result) => {
      if (result?.error) {
        if (notUnique(result.error.graphQLErrors)) {
          return res.status(400).json({ message: "Not Permitted" });
        } else {
          console.log("Bad Query", result.error.graphQLErrors);
          return res.status(400).json({ message: "Error with query" });
        }
      } else {
        const friend = result.data?.insert_friend_one;
        if (!friend)
          return res.status(400).json({ message: "Something went wrong" });

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
