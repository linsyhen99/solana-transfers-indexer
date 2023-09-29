export interface ParsedTransaction {
  transaction: EncodedTransactionsWithStatusMeta;
  events: Map<string, ParsedEvent[]> | null;
  network: string;
  block_time: number;
}

interface EncodedTransactionsWithStatusMeta {
  transaction: EncodedTransaction;
  meta: any;
  blockTime: number;
}

interface EncodedTransaction {
  signatures: string[];
  message: EncodedMessage;
}

interface EncodedMessage {
  accountKeys: AcccountKey[];
  recentBlockhash: string;
  instructions: any[];
  addresstableLookups: any;
}

interface AcccountKey {
  pubkey: string;
  writable: boolean;
  signer: boolean;
  source: string;
}

interface ParsedEvent {
  name: string;
  data: string;
}
