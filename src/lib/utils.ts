import { NftResponse, TokenResponse } from "@/actions/common";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const maskWalletAddress = (address: string) => {
  if (address?.length <= 10) {
    return address;
  } // In case the address is too short
  const start = address?.slice(0, 10); // First 6 characters
  const end = address?.slice(-2); // Last 2 characters
  return `${start}..${end}`;
};

// Function to truncate a number to 4 decimal places without rounding
export function truncateToFourDecimals(number: number) {
  const numberStr = number.toString();
  const [integerPart, decimalPart] = numberStr.split(".");

  // Truncate the decimal part to 4 digits if it exists
  return decimalPart && decimalPart.length > 4
    ? parseFloat(`${integerPart}.${decimalPart.slice(0, 4)}`)
    : number;
}

// export function debounce<T extends (...args: any[]) => void>(
//   func: T,
//   wait: number
// ): (...args: Parameters<T>) => void {
//   let timeout: ReturnType<typeof setTimeout>;
//   return function (...args: Parameters<T>): void {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }

export const isValidEthereumAddress = (address: string) => {
  const regex = /^0x[a-fA-F0-9]{40}$/;
  return regex.test(address);
};

export const validateSendTokenData = ({
  selectedItem,
  amount,
  recipientAddress,
}: {
  selectedItem: TokenResponse | NftResponse | null;
  amount: number;
  recipientAddress: string;
}): void => {
  if (!selectedItem) {
    throw new Error("Select a token to continue");
  }
  if (
    !isValidEthereumAddress(recipientAddress) &&
    !recipientAddress.endsWith(".eth")
  ) {
    throw new Error("Invalid recipient address");
  }
  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }

  if (selectedItem.amount < amount) {
    throw new Error("Insufficient token balance");
  }
};

export const checkIfSameChain = (chainIn: string, chainOut: string) => {
  // Normalize special cases for Polygon/Matic and Fantom/FTM
  const normalizeChain = (chain: string) => {
    const chainLower = chain.toLowerCase();
    if (chainLower === "polygon" || chainLower === "matic") {
      return "polygon";
    }
    if (chainLower === "fantom" || chainLower === "ftm") {
      return "fantom";
    }
    return chainLower;
  };

  return normalizeChain(chainIn) === normalizeChain(chainOut);
};

type ResponseType = TokenResponse | NftResponse | null;
type ResponseCategory = "token" | "nft";
/**
 * Determines if the provided response is a native token or NFT.
 *
 * @param {ResponseType} response - The token or NFT response.
 * @param {ResponseCategory} type - The type of the response ('token' or 'nft').
 * @returns {boolean} - Returns true if it is a native token or NFT; otherwise, false.
 */
export const isNative = (
  response: ResponseType,
  type: ResponseCategory
): boolean => {
  if (type === "token") {
    // Check if token chain matches its id (indicating it's a native token)
    return (
      (response as TokenResponse)?.chain === (response as TokenResponse).id
    );
  } else if (type === "nft") {
    // Check if NFT chain matches its contractId (indicating it's a native NFT)
    return (
      (response as NftResponse).chain === (response as NftResponse).contractId
    );
  }

  // Default return if type is neither 'token' nor 'nft'
  return false;
};

export const toBigIntAmount = (
  amount: number,
  decimals?: number
): bigint | null => {
  if (!decimals) {
    return null;
  }
  return BigInt(Math.floor(amount * 10 ** decimals));
};
