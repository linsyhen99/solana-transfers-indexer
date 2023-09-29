import Fastify from "fastify";
import dotenv from "dotenv";
import axios from "axios";
import { ParsedTransaction } from "./models/transaction";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

// This endpoint listens to webhooks posted from the dev-portal webhook feature,
// you can expose your application on a localhost through a proxy/localtunnel
// or you can host this server somewhere to receive webhooks.
fastify.post("/", async (request, reply) => {
  console.log(request.body);
  process.exit(1);
  const transactionEvent: ParsedTransaction = request.body as ParsedTransaction;
  // const result = await retrieveTransfers();
});

fastify.listen(
  {
    port: parseInt(process.env.SERVER_PORT || "3000"),
    host: "0.0.0.0",
  },
  (request, reply) => {
    fastify.log.info(`Server listening on ${process.env.SERVER_PORT}`);
  }
);

const retrieveTransfers = async (transactionHash: string) => {
  const response = await axios.post(
    process.env.SOLANAFM_API_URL + "/vo/transfers",
    {
      transactionHashes: [transactionHash],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SOLANAFM_API_KEY}`,
      },
    }
  );

  console.log("Transfers data retrieved: ", response.data);
};
