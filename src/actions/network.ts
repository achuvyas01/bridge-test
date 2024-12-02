// Define the type for a network object
export type Network = {
  id: string;
  name: string;
  nativeTokenId: string;
  logoUrl: string;
  chainId: number;
};

// Define the type for the function's return value
export type GetNetworksResponse = Network[];

// The list of networks
export const networks: Network[] = [
  {
    id: 'eth',
    chainId: 1,
    name: 'Ethereum',
    nativeTokenId: 'eth',
    logoUrl:
      'https://static.debank.com/image/chain/logo_url/eth/42ba589cd077e7bdd97db6480b0ff61d.png',
  },
  {
    id: 'bsc',
    chainId: 56,
    name: 'BNB',
    nativeTokenId: 'bsc',
    logoUrl:
      'https://static.debank.com/image/chain/logo_url/bsc/bc73fa84b7fc5337905e527dadcbc854.png',
  },

  {
    id: 'matic',
    chainId: 137,
    name: 'Polygon',
    nativeTokenId: 'matic',
    logoUrl:
      'https://static.debank.com/image/chain/logo_url/matic/52ca152c08831e4765506c9bd75767e8.png',
  },
  {
    id: 'base',
    chainId: 8453,
    name: 'Base',
    nativeTokenId: 'base',
    logoUrl:
      'https://static.debank.com/image/chain/logo_url/base/ccc1513e4f390542c4fb2f4b88ce9579.png',
  },
  {
    id: 'ftm',
    chainId: 250,
    name: 'Fantom',
    nativeTokenId: 'ftm',
    logoUrl:
      'https://static.debank.com/image/chain/logo_url/ftm/14133435f89637157a4405e954e1b1b2.png',
  },
  {
    id: 'avax',
    chainId: 43114,
    name: 'Avalanche',
    nativeTokenId: 'avax',
    logoUrl:
      'https://static.debank.com/image/chain/logo_url/avax/4d1649e8a0c7dec9de3491b81807d402.png',
  },
  {
    id: 'arb',
    chainId: 42161,
    name: 'Arbitrum',
    nativeTokenId: 'arb',
    logoUrl:
      'https://static.debank.com/image/chain/logo_url/arb/854f629937ce94bebeb2cd38fb336de7.png',
  },
  {
    id: 'op',
    chainId: 10,
    name: 'OP',
    nativeTokenId: 'op',
    logoUrl:
      'https://static.debank.com/image/chain/logo_url/op/01ae734fe781c9c2ae6a4cc7e9244056.png',
  },

  {
    id: 'cro',
    chainId: 25,
    name: 'Cronos',
    nativeTokenId: 'cro',
    logoUrl:
      'https://static.debank.com/image/chain/logo_url/cro/f947000cc879ee8ffa032793808c741c.png',
  },
  {
    id: 'celo',
    chainId: 42220,
    name: 'Celo',
    nativeTokenId: 'celo',
    logoUrl:
      'https://static.debank.com/image/chain/logo_url/celo/41da5c1d3c0945ae822a1f85f02c76cf.png',
  },
  {
    id: 'xdai',
    chainId: 100,
    name: 'Gnosis Chain',
    nativeTokenId: 'xdai',
    logoUrl:
      'https://static.debank.com/image/chain/logo_url/xdai/43c1e09e93e68c9f0f3b132976394529.png',
  },
];

// Create a lookup object for network logos
export const networkLogoMap = networks.reduce<Record<string, string>>(
  (acc, network) => {
    acc[network.id] = network.logoUrl;
    return acc;
  },
  {}
);

export const getNetworks = async (): Promise<GetNetworksResponse> => {
  return networks;
};
