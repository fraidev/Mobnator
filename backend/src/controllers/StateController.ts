import express from "express";
import crypto from "crypto";
import { RedisClientType } from "redis";

const stateControllerRouter = (redis: RedisClientType<any, any, any>) => {
  const stateControllerRouter = express.Router();

  stateControllerRouter.get(
    "/state",
    async (req, res): Promise<void> => {
      try {
        const token = req.query.token as string;
        const state = await redis.get(token);
        console.log(state);
        res.json(state);
      } catch (err:any) {
        res.status(err.status).json({
          message: err.message,
          status: err.status,
        });
      }
    }
  );

  stateControllerRouter.post(
    "/share",
    async (req, res): Promise<void> => {
      try {
        const token = crypto.randomBytes(5).toString("hex");
        await redis.setEx(token, 60 * 60 * 24 * 7, JSON.stringify(req.body));

        // console.log(req.body)
        res.json(token);
      } catch (error: any) {
        res.status(error.status).json(error);
      }
    }
  );

  return stateControllerRouter;
};

export default stateControllerRouter;
