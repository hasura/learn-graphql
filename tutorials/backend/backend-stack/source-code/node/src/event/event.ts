import express, { Router, Request, Response } from "express";

interface EventPayload<New, Old> {
    created_at: string;
    delivery_info: {
        current_retry: number;
        max_retries: number;
    },
    event: {
        data: {
            new: New,
            old: Old,
        },
        op: "INSERT" | "UPDATE" | "DELETE" | "MANUAL";
        session_variables: Record<string, string>;
        trace_context: {
            span_id: string;
            trace_id: string;
        }
    },
    id: string;
    table: {
        name: string;
        schema: string;
    }
    trigger: {
        name: string;
    }
}

interface UserTable {
    id: string;
    name: string;
}

const eventRouter: Router = express.Router();

eventRouter.post('', async (req: Request<object, object, EventPayload<UserTable, null>>, res: Response) => {
    console.log(req.body);
    res.sendStatus(200);
});

export { eventRouter };