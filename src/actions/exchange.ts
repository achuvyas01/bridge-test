"use server";
// import { eq, and, sql, desc } from "drizzle-orm";
// import { findUserByDynamicId } from './user';
// import {
//   ExchangeParty,
//   exchangeActivities,
//   ExchangeActivityTypeEnum,
// } from '@/db/schema/exchange';
// import { auth } from '@/auth';
// import { db } from '@/db';
import {
  chainSymbolMap,
  // deserializeJSON,
  openOceanClient,
  // serializeJSON,
} from "./common";
import { ofetch } from "ofetch";

// /**
//  * Parameters for creating a new exchange activity.
//  */
// type CreateExchangeActivityParams = {
//   /** The transaction hash of the exchange activity. */
//   txHash: string;
//   /** The slippage percentage for the exchange. */
//   slippage: number;
//   /** The source party details of the exchange. */
//   from: ExchangeParty;
//   /** The destination party details of the exchange. */
//   to: ExchangeParty;
// };

// /**
//  * Creates a new exchange activity record in the database.
//  *
//  * @param {CreateExchangeActivityParams} params - The parameters for creating the exchange activity.
//  * @throws {Error} If the input data is invalid, user is not authenticated, user is not found, or a duplicate activity exists.
//  * @returns {Promise<typeof exchangeActivities.$inferInsert>} The newly created exchange activity record.
//  */
// export async function createExchangeActivity({
//   txHash,
//   slippage,
//   from,
//   to,
// }: CreateExchangeActivityParams): Promise<boolean> {
//   // Validate the input data (optional, depending on your requirements)
//   if (!from.amount.value || !to.amount.value) {
//     throw new Error('Invalid exchange data');
//   }

//   // Get the authenticated user's session
//   const session = await auth();

//   if (!session || !session.user) {
//     throw new Error('Unauthorized: User not authenticated');
//   }

//   // Fetch the user from the database using the authenticated user's ID
//   const user = await findUserByDynamicId(session.user?.id ?? '');

//   if (!user) {
//     throw new Error('User not found in the database');
//   }

//   // Check if an exchange activity with the same txHash already exists for this user
//   const existingActivity = await db
//     .select()
//     .from(exchangeActivities)
//     .where(
//       and(
//         eq(exchangeActivities.txHash, txHash),
//         eq(exchangeActivities.user, user.id)
//       )
//     )
//     .get();

//   if (existingActivity) {
//     throw new Error(
//       'An exchange activity with this transaction hash already exists'
//     );
//   }

//   // Create the new exchange activity record
//   const newExchangeActivity = {
//     txHash,
//     slippage,
//     from: serializeJSON<ExchangeParty>(from),
//     to: serializeJSON<ExchangeParty>(to),
//     type:
//       from?.chainId === to.chainId
//         ? ExchangeActivityTypeEnum.SWAP
//         : ExchangeActivityTypeEnum.BRIDGE,
//     user: user.id, // Use the authenticated user's ID
//   };

//   await db.insert(exchangeActivities).values(newExchangeActivity).run();

//   // Return the newly created exchange activity record
//   return true;
// }

// type GetExchangeActivitiesParams = {
//   page?: number;
//   pageSize?: number;
//   txHash?: string;
// };

// /**
//  * Retrieves exchange activities for the authenticated user with pagination and optional txHash search.
//  *
//  * @param {GetExchangeActivitiesParams} params - The parameters for fetching exchange activities.
//  * @returns  Paginated exchange activities and metadata.
//  * @throws {Error} If the user is not authenticated or not found in the database.
//  */
// export const getExchangeActivities = async ({
//   page = 1,
//   pageSize = 30,
// }: GetExchangeActivitiesParams) => {
//   // Get the authenticated user's session
//   const session = await auth();

//   if (!session || !session.user) {
//     throw new Error('Unauthorized: User not authenticated');
//   }

//   // Fetch the user from the database using the authenticated user's ID
//   const user = await findUserByDynamicId(session.user?.id ?? '');

//   if (!user) {
//     throw new Error('User not found in the database');
//   }

//   const offset = (page - 1) * pageSize;

//   // Base query conditions
//   const conditions = eq(exchangeActivities.user, user.id);

//   // Fetch the total count of exchange activity records
//   const totalResult = await db
//     .select({ count: sql<number>`count(*)` })
//     .from(exchangeActivities)
//     .where(conditions)
//     .get();

//   const total = totalResult?.count ?? 0;

//   // Fetch the exchange activity records with pagination and sorting by the latest first
//   const userExchangeActivities = await db
//     .select({
//       id: exchangeActivities.id,
//       txHash: exchangeActivities.txHash,
//       slippage: exchangeActivities.slippage,
//       from: exchangeActivities.from,
//       to: exchangeActivities.to,
//       type: exchangeActivities.type,
//       createdTime: exchangeActivities.createdTime,
//     })
//     .from(exchangeActivities)
//     .where(conditions)
//     .orderBy(desc(exchangeActivities.createdTime))
//     .limit(pageSize)
//     .offset(offset)
//     .all();

//   // Process the results to stringify 'from' and 'to' fields
//   const processedExchangeActivities = userExchangeActivities.map(
//     (activity) => ({
//       ...activity,
//       from: deserializeJSON<ExchangeParty>(activity.from),
//       to: deserializeJSON<ExchangeParty>(activity.to),
//     })
//   );

//   // Return the paginated result with processed activities
//   return {
//     exchanges: processedExchangeActivities,
//     page,
//     pageSize: processedExchangeActivities.length,
//     total,
//   };
// };

/**
 * Fetches gas price data for a given chain ID and returns standard, fast, and instant gas prices.
 *
 * @param {string} chainId - The ID of the blockchain network to fetch gas prices for.
 * @returns {Promise<Object>} An object containing gas prices in standard, fast, and instant tiers.
 * @throws {Error} If there's a network issue or an error in the response structure.
 */
export const getGasPrice = async (chainId: string) => {
  // console.log(chainId, "chainId");
  // Get the authenticated user's session
  // const session = await auth();

  // if (!session || !session.user) {
  //   throw new Error("Unauthorized: User not authenticated");
  // }

  // Fetch the user from the database using the authenticated user's ID
  // const user = await findUserByDynamicId(session.user?.id ?? "");

  // if (!user) {
  //   throw new Error("User not found in the database");
  // }

  try {
    const response = await fetch(
      `https://open-api.openocean.finance/v3/${chainId}/gasPrice`,
      {
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9",
        },
        referrerPolicy: "strict-origin-when-cross-origin",
      }
    );

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch gas prices: ${response.statusText}`);
    }

    // Parse the JSON response
    const { without_decimals } = await response.json();

    // Ensure response has the expected structure
    if (!without_decimals) {
      throw new Error(
        "Unexpected response format: missing 'without_decimals' field."
      );
    }

    let gasPrice;

    // Different structure for Ethereum chain
    if (chainId === "eth") {
      const data = without_decimals;
      gasPrice = {
        standard: data.standard?.maxFeePerGas ?? 0,
        fast: data.fast?.maxFeePerGas ?? 0,
        instant: data.instant?.maxFeePerGas ?? 0,
      };
    } else {
      const data = without_decimals;
      gasPrice = {
        standard: data.standard ?? 0,
        fast: data.fast ?? 0,
        instant: data.instant ?? 0,
      };
    }

    return gasPrice;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error fetching gas price for chain ID ${chainId}: ${error.message}`
      );
    } else {
      throw new Error(`Error fetching gas price for chain ID ${chainId}:`);
    }
  }
};

type OoSwapParams = {
  chain: string;
  inTokenAddress: string;
  outTokenAddress: string;
  amount: string;
  slippage: string;
  gasPrice: string;
  account: string;
};

export const ooSwap = async ({
  chain,
  inTokenAddress,
  outTokenAddress,
  amount,
  slippage,
  gasPrice,
  account,
}: OoSwapParams) => {
  // Get the authenticated user's session
  // const session = await auth();

  // if (!session || !session.user) {
  //   throw new Error("Unauthorized: User not authenticated");
  // }

  // // Fetch the user from the database using the authenticated user's ID
  // const user = await findUserByDynamicId(session.user?.id ?? "");

  // if (!user) {
  //   throw new Error("User not found in the database");
  // }

  try {
    const response = await ofetch(
      `https://open-api.openocean.finance/v3/${chain}/swap_quote?inTokenAddress=${inTokenAddress}&outTokenAddress=${outTokenAddress}&amount=${amount}&slippage=${slippage}&gasPrice=${gasPrice}&account=${account}`
    );

    return response.data;
  } catch (error) {
    // Custom error message if error is an instance of Error
    if (error instanceof Error) {
      throw new Error(
        `Error fetching swap quote for ${inTokenAddress} to ${outTokenAddress} on chain ${chain}: ${error.message}`
      );
    } else {
      // Generic error if not an instance of Error
      throw new Error(
        "An unexpected error occurred while fetching the swap quote."
      );
    }
  }
};

export const getQuote = async ({
  chain,
  inTokenAddress,
  outTokenAddress,
  amount,
  slippage,
  gasPrice,
  account,
}: OoSwapParams) => {
  // Get the authenticated user's session
  // const session = await auth();

  // if (!session || !session.user) {
  //   throw new Error("Unauthorized: User not authenticated");
  // }

  // // Fetch the user from the database using the authenticated user's ID
  // const user = await findUserByDynamicId(session.user?.id ?? "");

  // if (!user) {
  //   throw new Error("User not found in the database");
  // }

  // console.log(chain, "chain");

  try {
    const response = await ofetch(
      `https://open-api.openocean.finance/v3/${chain}/quote?inTokenAddress=${inTokenAddress}&outTokenAddress=${outTokenAddress}&amount=${amount}&slippage=${slippage}&gasPrice=${gasPrice}&account=${account}`
    );

    // // Check if the response was successful
    // if (!response.ok) {
    //   throw new Error(`Failed to fetch quote: ${response.statusText}`);
    // }

    // // Parse the JSON response
    // const { data } = await response.json();

    // console.log(data, 'data');

    // // Ensure the response contains data
    // if (!data) {
    //   throw new Error("Unexpected response format: missing 'data' field.");
    // }

    return response?.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error fetching quote for ${inTokenAddress} to ${outTokenAddress} on chain ${chain}: ${error.message}`
      );
    } else {
      throw new Error("An unexpected error occurred while fetching the quote.");
    }
  }
};

type CrossChainSwapParams = {
  fromChainId: string; // Source chain ID (e.g., 1 for Ethereum, 56 for BSC)
  toChainId: string; // Destination chain ID (e.g., 137 for Polygon)
  fromSymbol: string; // Symbol of the source chain token (e.g., 'ETH', 'USDT')
  toSymbol: string; // Symbol of the destination chain token (e.g., 'USDT', 'AVAX')
  amount: string; // Amount of the source token to swap
};

export const getCrossChainQuote = async ({
  fromChainId,
  toChainId,
  fromSymbol,
  toSymbol,
  amount,
}: CrossChainSwapParams) => {
  // console.table({ fromChainId, toChainId, fromSymbol, toSymbol, amount });

  // // Get the authenticated user's session
  // const session = await auth();

  // if (!session || !session.user) {
  //   throw new Error("Unauthorized: User not authenticated");
  // }
  // // Fetch the user from the database using the authenticated user's ID
  // const user = await findUserByDynamicId(session.user?.id ?? "");

  // if (!user) {
  //   throw new Error("User not found in the database");
  // }
  const ooFromChainId = chainSymbolMap.get(fromChainId)?.chainId;
  const ooToChainId = chainSymbolMap.get(toChainId)?.chainId;

  try {
    const response = await openOceanClient(`/cross_chain/v1/cross/quoteByOO`, {
      params: {
        fromChainId: ooFromChainId,
        toChainId: ooToChainId,
        fromSymbol,
        toSymbol,
        amount,
      },
    });

    // console.log(response.data, "response.data");

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error fetching cross-chain quote for ${fromSymbol} to ${toSymbol} on chain ${fromChainId} to ${toChainId}: ${error.message}`
      );
    } else {
      throw new Error(
        "An unexpected error occurred while fetching the cross-chain quote."
      );
    }
  }
};

export const ooCrossChainSwap = async ({
  plat,
  account,
  route,
}: {
  plat: string;
  account: string;
  route: any; // Adjust type as necessary for the route object
}) => {
  // // Get the authenticated user's session
  // const session = await auth();

  // if (!session || !session.user) {
  //   throw new Error("Unauthorized: User not authenticated");
  // }

  // // Fetch the user from the database using the authenticated user's ID
  // const user = await findUserByDynamicId(session.user?.id ?? "");

  // if (!user) {
  //   throw new Error("User not found in the database");
  // }

  try {
    const url = `https://open-api.openocean.finance/cross_chain/v1/cross/${plat}/swap`;
    const body = {
      account,
      route,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      referrerPolicy: "strict-origin-when-cross-origin",
    });

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(
        `Failed to execute cross-chain swap: ${response.statusText}`
      );
    }

    // Parse the JSON response
    const { data } = await response.json();

    // Ensure the response contains data
    if (!data) {
      throw new Error("Unexpected response format: missing 'data' field.");
    }

    return data;
  } catch (error) {
    // Custom error message if error is an instance of Error
    if (error instanceof Error) {
      throw new Error(
        `Error executing cross-chain swap using bridge ${plat}: ${error.message}`
      );
    } else {
      // Generic error if not an instance of Error
      throw new Error(
        "An unexpected error occurred during the cross-chain swap."
      );
    }
  }
};
