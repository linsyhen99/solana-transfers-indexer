export interface ParsedTransaction {
  transaction: EncodedTransactionsWithStatusMeta;
  events: Map<string, ParsedEvent[]> | null;
  network: string;
  block_time: number;
}

interface EncodedTransactionsWithStatusMeta {}

interface ParsedEvent {
  name: string;
  data: string;
}
