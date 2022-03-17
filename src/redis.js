import { createClient } from "redis";

const REDIS_URL = "";
const pubClient = createClient({ url: REDIS_URL });
const subClient = pubClient.duplicate();

export { pubClient, subClient };