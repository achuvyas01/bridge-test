"use server";
import debankClient, {
  chainMap,
  DBankNftList,
  DBankTokenList,
  GetTokensParams,
  NftResponse,
  TokenInfo,
  TokenResponse,
  validateAddress,
} from "./common";
// import { checkUserSession, findUserByDynamicId } from './user';
import { networkLogoMap } from "./network";
import { ofetch } from "ofetch";

export const filterAndFormatTokens = async (
  data: DBankTokenList[],
  searchParam?: string // Optional search parameter
): Promise<TokenResponse[]> => {
  try {
    // Filter and format tokens
    return data
      .filter((item) => {
        // Check for required properties and that the total value is valid
        const hasRequiredFields =
          item.id &&
          item.chain &&
          item.name &&
          item.symbol &&
          item.decimals !== null && // Use != null to check for both null and undefined
          item.logo_url &&
          item.amount !== null && // Check amount is not null or undefined
          item.price !== null; // Check price is not null or undefined

        const totalValue = item.amount * item.price;

        // If searchParam exists, filter by item.name (case-insensitive)
        const matchesSearchParam = searchParam
          ? item.name.toLowerCase().includes(searchParam.toLowerCase())
          : true; // If searchParam is not provided, default to true

        return hasRequiredFields && totalValue >= 0.001 && matchesSearchParam;
      })
      .map((item) => {
        const type: "erc20" | "native" = item.id.startsWith("0x")
          ? "erc20"
          : "native";
        return {
          id: item.id,
          chain: item.chain,
          name: item.name,
          symbol: item.symbol,
          decimal: item.decimals,
          logoUrl: item.logo_url,
          amount: item.amount,
          price: item.price,
          chainLogoUrl: networkLogoMap[item.chain] || "",
          type,
        };
      });
  } catch {
    throw new Error("Failed to filter and format tokens"); // Provide descriptive error message
  }
};

export const filterAndFormatTokensByChain = async (
  data: TokenInfo[],
  searchParam?: string // Optional search parameter
): Promise<TokenResponse[]> => {
  try {
    // Filter and format tokens
    return data
      .filter((item) => {
        // Check for required properties and that the total value is valid
        const hasRequiredFields =
          item.address &&
          item.chain &&
          item.name &&
          item.symbol &&
          item.decimals !== null && // Use != null to check for both null and undefined
          item.icon &&
          item.usd !== null; // Check price is not null or undefine

        // If searchParam exists, filter by item.name or item.symbol (case-insensitive)
        const matchesSearchParam = searchParam
          ? item.name.toLowerCase().includes(searchParam.toLowerCase()) ||
            item.symbol.toLowerCase().includes(searchParam.toLowerCase())
          : true; // If searchParam is not provided, default to true

        return hasRequiredFields && matchesSearchParam;
      })
      .map((item) => {
        const type: "erc20" | "native" = item.address.startsWith("0x")
          ? "erc20"
          : "native";
        return {
          id: item.address,
          amount: 0,
          chain: item.chain,
          name: item.name,
          symbol: item.symbol,
          decimal: item.decimals,
          logoUrl: item.icon,
          price: parseFloat(item.usd),
          chainLogoUrl: networkLogoMap[item.chain] || "",
          type,
        };
      });
  } catch {
    throw new Error("Failed to filter and format tokens"); // Provide descriptive error message
  }
};

export const filterAndFormatNfts = async (
  data: DBankNftList[],
  searchParam?: string // Optional search parameter
): Promise<NftResponse[]> => {
  try {
    return data
      .filter((item) => {
        // Check for required properties
        const hasRequiredFields = item.id && item.chain && item.name;

        const matchesSearchParam = searchParam
          ? item.name?.toLowerCase().includes(searchParam.toLowerCase())
          : true;

        return hasRequiredFields && matchesSearchParam;
      })
      .map((item) => {
        const type: "erc1155" | "erc721" = item.is_erc1155
          ? "erc1155"
          : "erc721";
        return {
          id: item.id,
          contractId: item.contract_id,
          chain: item.chain,
          name: item.name,
          description: item.description,
          contentType: item.content_type,
          thumbnailUrl: item.thumbnail_url,
          collectionId: item.collection_id,
          contractName: item.contract_name,
          isErc1155: item.is_erc1155,
          amount: item.amount,
          usdPrice: item.usd_price,
          chainLogoUrl: networkLogoMap[item.chain] || "",
          detailUrl: item?.detail_url,
          type, // Correctly typed as 'erc1155' | 'erc721'
        };
      });
  } catch {
    throw new Error("Failed to filter and format NFTs");
  }
};

export const getTokens = async ({
  address,
  chainId,
  searchParam,
}: GetTokensParams = {}) => {
  try {
    console.log("getTokens", address, chainId, searchParam);
    if (address && !validateAddress(address)) {
      throw new Error("Address must start with 0x.");
    }

    // // Check the authenticated user's session
    // const user = await checkUserSession();

    // // Fetch the user from the database using the authenticated user's ID
    // const dbUser = await findUserByDynamicId(user.id);

    // if (!dbUser) {
    //   throw new Error("User not found in the database");
    // }

    let tokenUrl: string;
    if (chainId) {
      const dbankChainId = chainMap.get(chainId)?.dbank;
      tokenUrl = `/user/token_list?id=${address}&chain_id=${dbankChainId}`;
    } else {
      tokenUrl = `/user/all_token_list?id=${address}&is_all=true`;
    }

    const data = (await debankClient(tokenUrl)) as DBankTokenList[];
    const res = await filterAndFormatTokens(data, searchParam);
    return res;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get tokens: ${error.message}`);
    } else {
      throw new Error("Failed to get tokens: An unknown error occurred");
    }
  }
};

export const getNfts = async ({
  address,
  chainId,
  searchParam,
}: GetTokensParams) => {
  try {
    // // Check the authenticated user's session
    // const user = await checkUserSession();

    // // Fetch the user from the database using the authenticated user's ID
    // const fetchedUser = await findUserByDynamicId(user.id);
    // if (!fetchedUser) {
    //   throw new Error("User not found in the database");
    // }

    let nftUrl;
    if (chainId) {
      const dbankChainId = chainMap.get(chainId)?.dbank;
      nftUrl = `/user/nft_list?id=${address}&chain_id=${dbankChainId}`;
    } else {
      nftUrl = `/user/all_nft_list?id=${address}&is_all=true`;
    }

    const data = (await debankClient(nftUrl)) as DBankNftList[];
    return await filterAndFormatNfts(data, searchParam);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get NFTs: ${error.message}`);
    } else {
      throw new Error("Failed to get NFTs: An unknown error occurred");
    }
  }
};

export const fetchTokens = async ({
  address,
  chainId,
}: GetTokensParams = {}) => {
  console.log("fetchTokens", address, chainId);
  try {
    if (address && !validateAddress(address)) {
      throw new Error("Address must start with 0x.");
    }
    let tokenUrl: string;
    if (chainId) {
      const dbankChainId = chainMap.get(chainId)?.dbank;
      tokenUrl = `/user/token_list?id=${address}&chain_id=${dbankChainId}`;
    } else {
      tokenUrl = `/user/all_token_list?id=${address}&is_all=true`;
    }

    const data = (await debankClient(tokenUrl)) as DBankTokenList[];
    const tokens = await filterAndFormatTokens(data);

    return tokens;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get tokens: ${error.message}`);
    } else {
      throw new Error("Failed to get tokens: An unknown error occurred");
    }
  }
};

export const fetchNfts = async ({ address, chainId }: GetTokensParams) => {
  try {
    let nftUrl;
    if (chainId) {
      const dbankChainId = chainMap.get(chainId)?.dbank;
      nftUrl = `/user/nft_list?id=${address}&chain_id=${dbankChainId}`;
    } else {
      nftUrl = `/user/all_nft_list?id=${address}&is_all=true`;
    }

    const data = (await debankClient(nftUrl)) as DBankNftList[];
    return await filterAndFormatNfts(data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get NFTs: ${error.message}`);
    } else {
      throw new Error("Failed to get NFTs: An unknown error occurred");
    }
  }
};

export const getTokensByChain = async ({
  chainId,
  searchParam,
}: {
  chainId: string; // The chain ID (e.g., 'eth', 'bsc', 'matic')
  searchParam?: string; // Optional search parameter for filtering tokens
}) => {
  try {
    // Construct the URL based on the chainId
    const tokenUrl = `https://open-api.openocean.finance/v3/${chainId}/tokenList`;

    // Fetch the token list from OpenOcean's API
    const res = await ofetch(tokenUrl);

    // Filter and format tokens based on the optional searchParam
    const filteredTokens = await filterAndFormatTokensByChain(
      res.data,
      searchParam
    );

    return filteredTokens;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to fetch tokens for chain ${chainId}: ${error.message}`
      );
    } else {
      throw new Error("Failed to fetch tokens: An unknown error occurred");
    }
  }
};
