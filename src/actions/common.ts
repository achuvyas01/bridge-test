import { ofetch } from "ofetch";
// import { ExchangeParty } from "@/db/schema/exchange";

export function validateAddress(address: string): boolean {
  return address.startsWith("0x");
}

const debankClient = ofetch.create({
  baseURL: "https://pro-openapi.debank.com/v1",
  headers: {
    AccessKey: "4384c7168559f9d4d2d66456fa24ac119beac265",
  },
});

export const openOceanClient = ofetch.create({
  baseURL: "https://open-api.openocean.finance",
});

export const chatClient = ofetch.create({
  baseURL: "https://buddy-ai.dappgenie.io",
  mode: "no-cors",
});

export default debankClient;

export enum TokenType {
  NFT = "NFT",
  TOKEN = "TOKEN",
  NATIVE = "NATIVE",
}

export type DBankTokenList = {
  readonly id: string;
  readonly chain: string;
  readonly name: string;
  readonly symbol: string;
  readonly display_symbol: string;
  readonly optimized_symbol: string;
  readonly decimals: number;
  readonly logo_url: string;
  readonly protocol_id: string;
  readonly price: number;
  readonly price_24h_change: number;
  readonly is_verified: boolean;
  readonly is_core: boolean;
  readonly is_wallet: boolean;
  readonly time_at: number;
  readonly amount: number;
  readonly raw_amount: number;
  readonly raw_amount_hex_str: string;
};

export type TokenInfo = {
  id: number; // Unique identifier for the token
  code: string; // Token code (e.g., 'teddy')
  name: string; // Full token name (e.g., 'Teddy Cash')
  address: string; // Smart contract address of the token
  decimals: number; // Decimals of the token (e.g., 18)
  symbol: string; // Symbol of the token (e.g., 'TEDDY')
  icon: string; // URL to the token icon image
  chain: string; // Name of the blockchain (e.g., 'avax')
  hot: string | null; // Optional, can be null
  sort: string; // Sort timestamp
  chainId: number; // Chain ID (e.g., 43114 for Avalanche)
  customSymbol: string | null; // Custom symbol if any, can be null
  customAddress: string | null; // Custom address if any, can be null
  usd: string; // Token's USD price
};

export type DBankNftList = {
  readonly id: string;
  readonly contract_id: string;
  readonly chain: string;
  readonly name: string;
  readonly description: string;
  readonly content_type: string;
  readonly thumbnail_url: string;
  readonly collection_id: string;
  readonly contract_name: string;
  readonly is_erc1155: boolean;
  readonly amount: number;
  readonly usd_price: number;
  readonly detail_url: string;
};

export type TokenResponse = {
  id: string;
  chain: string;
  name: string;
  symbol: string;
  decimal: number;
  logoUrl: string;
  amount: number;
  price: number;
  type: "erc20" | "native";
  chainLogoUrl: string;
};

export type TokenByChainResponse = {
  id: string;
  chain: string;
  name: string;
  symbol: string;
  decimal: number;
  logoUrl: string;
  price: number;
  type: "erc20" | "native";
  chainLogoUrl: string;
};

export type NftResponse = {
  id: string;
  contractId: string;
  chain: string;
  name: string;
  description: string;
  contentType: string;
  chainLogoUrl: string;
  thumbnailUrl: string;
  collectionId: string;
  contractName: string;
  isErc1155: boolean;
  amount: number;
  usdPrice: number;
  type: "erc1155" | "erc721";
  detailUrl: string;
};

export type GetTokensParams = {
  address?: string;
  type?: TokenType;
  chainId?: number;
  searchParam?: string;
};
// Define the type for the chain data
export type ChainData = {
  name: string;
  symbol: string;
  dbank: string;
  chainId?: number;
};

// Define the type for the entire map
export type ChainMap = Map<number, ChainData>;

export const chainMap: ChainMap = new Map([
  [1, { chainId: 1, name: "Ethereum", symbol: "eth", dbank: "eth" }],
  [10, { chainId: 10, name: "Optimism", symbol: "op", dbank: "op" }],
  [42161, { chainId: 42161, name: "Arbitrum", symbol: "arb", dbank: "arb" }],
  [137, { chainId: 137, name: "Polygon", symbol: "matic", dbank: "matic" }],
  [8453, { chainId: 8453, name: "Base", symbol: "base", dbank: "base" }],
  [42220, { chainId: 42220, name: "Celo", symbol: "celo", dbank: "celo" }],
  [81457, { chainId: 81457, name: "Blast", symbol: "blast", dbank: "blast" }],
  [43114, { chainId: 43114, name: "Avalanche", symbol: "avax", dbank: "avax" }],
  [250, { chainId: 250, name: "Fantom", symbol: "ftm", dbank: "ftm" }], // Added Fantom
]);

export const chainSymbolMap: Map<
  string,
  { chainId: number; name: string; symbol: string; dbank: string }
> = new Map([
  ["eth", { chainId: 1, name: "Ethereum", symbol: "eth", dbank: "eth" }],
  ["op", { chainId: 10, name: "Optimism", symbol: "op", dbank: "op" }],
  ["arb", { chainId: 42161, name: "Arbitrum", symbol: "arb", dbank: "arb" }],
  ["matic", { chainId: 137, name: "Polygon", symbol: "matic", dbank: "matic" }],
  [
    "polygon",
    { chainId: 137, name: "Polygon", symbol: "matic", dbank: "matic" },
  ],
  ["base", { chainId: 8453, name: "Base", symbol: "base", dbank: "base" }],
  ["celo", { chainId: 42220, name: "Celo", symbol: "celo", dbank: "celo" }],
  ["blast", { chainId: 81457, name: "Blast", symbol: "blast", dbank: "blast" }],
  [
    "avax",
    { chainId: 43114, name: "Avalanche", symbol: "avax", dbank: "avax" },
  ],
  ["ftm", { chainId: 250, name: "Fantom", symbol: "ftm", dbank: "ftm" }], // Added Fantom
  ["fantom", { chainId: 250, name: "Fantom", symbol: "ftm", dbank: "ftm" }], // Added Fantom
]);

// export type SerializedExchangeParty = string & {
//   __exchangeParty: ExchangeParty;
// };

// export function serializeExchangeParty(
//   party: ExchangeParty
// ): SerializedExchangeParty {
//   return JSON.stringify(party) as SerializedExchangeParty;
// }

// export function deserializeExchangeParty(
//   json: SerializedExchangeParty
// ): ExchangeParty {
//   return JSON.parse(json);
// }

// Utility type for serialized JSON strings
export type SerializedJSON<T> = string & { __type: T };

// Generic serialization function
export function serializeJSON<T>(obj: T): SerializedJSON<T> {
  return JSON.stringify(obj) as SerializedJSON<T>;
}

// Generic deserialization function
export function deserializeJSON<T>(json: SerializedJSON<T>): T {
  return JSON.parse(json) as T;
}
