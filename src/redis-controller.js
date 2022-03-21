import { createClient } from "redis";

const REDIS_URL = "redis://localhost:6379";
const client = createClient({ url: REDIS_URL });

export default {
    client
};

// const subClient = pubClient.duplicate();

// export { pubClient, subClient };

/*export default function () {
    return Promise.all([pubClient.connect(), subClient.connect()]).then((resolve) => {

        resolve([pubClient, subClient]);


    }).catch(err => console.error(err));
};
/*const promise = Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
    io.adapter(createAdapter(pubClient, subClient));

    httpServer.listen(9001, () => {
        console.log("listening on *:9001");
    });
}).catch(err => console.error(err));

export default promise;*/