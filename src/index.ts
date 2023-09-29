import Fastify from "fastify";
import dotenv from "dotenv";
import axios from "axios";
import { ParsedTransaction } from "./models/transaction";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

let transactionSignatures: string[] = [];

// This endpoint listens to webhooks posted from the dev-portal webhook feature,
// you can expose your application on a localhost through a proxy/localtunnel
// or you can host this server somewhere to receive webhooks.
fastify.post("/", async (request, reply) => {
  const transactionEvent: ParsedTransaction = request.body as ParsedTransaction;
  transactionSignatures.push(
    transactionEvent.transaction.transaction.signatures[0]
  );
  // console.log(
  //   "Received transaction signature for transfer instruction: ",
  //   transactionEvent.transaction.transaction.signatures[0]
  // );

  if (transactionSignatures.length == 100) {
    await retrieveTransfers();
  }
});

fastify.listen(
  {
    port: parseInt(process.env.SERVER_PORT || "6969"),
    host: "0.0.0.0",
  },
  (request, reply) => {
    fastify.log.info(`Server listening on ${process.env.SERVER_PORT}`);
  }
);

const retrieveTransfers = async () => {
  const response = await axios.post(
    process.env.SOLANAFM_API_URL + "/v0/transfers",
    {
      transactionHashes: transactionSignatures,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SOLANAFM_API_KEY}`,
      },
    }
  );

  transactionSignatures = [];
  console.log("Transfers data retrieved: ", response.data);
};
