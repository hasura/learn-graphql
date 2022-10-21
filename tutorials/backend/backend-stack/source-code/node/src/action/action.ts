import express, { Router, Request, Response } from "express";
import { ActionPayload } from "../main";
import request from 'graphql-request';

import { graphql } from '../gql/client/index'

const userQuery = graphql(`query AllUsers {
    users: user {
      id
    }
}`);

const actionRouter: Router = express.Router();

interface loginArgs {
    username: string
    password: string
}

interface LoginResponse {
    AccessToken: string
}

actionRouter.post('', async (req: Request<object, object, ActionPayload<loginArgs>>, res: Response<LoginResponse>) => {
    const { users } = await request("http://localhost:8080/v1/graphql", userQuery)
    console.log(users, req.body);
    res.send({ AccessToken: "test" });
});

export { actionRouter };
