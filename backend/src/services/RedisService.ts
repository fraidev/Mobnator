import { createClient } from "redis";

export const redisService = async (url: string) => {
  const client = await createClient({url})
    .on("error", function (error) {
      console.error(error);
    })
    .connect();

  return client;
};

export default redisService;
