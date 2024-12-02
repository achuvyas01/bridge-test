import { NftResponse, TokenResponse } from "@/actions/common";
// import { ContactResponseItem } from '@/app/actions/contacts';
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

// Use Required utility to make all fields non-optional
type RequiredTokenResponse = Required<TokenResponse>;

export interface RecipientType {
  id?: string;
  name?: string;
  walletAddress: string;
  ensName?: string;
  ensAvatar?: string;
  isContact?: boolean;
}

interface SendStatesTypes {
  selectedToken: RequiredTokenResponse | null;
  // selectedContact: ContactResponseItem | null;
  selectedNft: NftResponse | null;
  exchangeFrom: TokenResponse | null;
  exchangeTo: TokenResponse | null;
  transferAmount: number | null;
  exchangeAmount: number | null;
  exchangeOutAmount: number | null;
  recipient: RecipientType | null;
  sendToAddress: string | null;
  transactionType: "token" | "nft";
  selectedModalType: "from" | "to" | null;
  routes: any[];
  selectedRoute: any;
  slippage: string;
}

const initialState: SendStatesTypes = {
  selectedToken: null,
  // selectedContact: null,
  selectedNft: null,
  exchangeFrom: null,
  exchangeTo: null,
  transferAmount: null,
  sendToAddress: null,
  recipient: null,
  transactionType: "token",
  selectedModalType: null,
  exchangeAmount: null,
  exchangeOutAmount: null,
  routes: [],
  selectedRoute: null,
  slippage: "3",
};

export const sendSlice = createSlice({
  name: "send",
  initialState,
  reducers: {
    setSelectedToken: (
      state,
      action: PayloadAction<RequiredTokenResponse | null>
    ) => {
      state.selectedToken = action.payload;
    },
    // setSelectedContact: (
    //   state,
    //   action: PayloadAction<ContactResponseItem | null>
    // ) => {
    //   state.selectedContact = action.payload;
    // },
    setRecipient: (state, action: PayloadAction<RecipientType | null>) => {
      state.recipient = action.payload;
    },
    setSelectedNft: (state, action: PayloadAction<NftResponse | null>) => {
      state.selectedNft = action.payload;
    },
    setExchangeFrom: (state, action: PayloadAction<TokenResponse | null>) => {
      state.exchangeFrom = action.payload;
    },
    setExchangeTo: (state, action: PayloadAction<TokenResponse | null>) => {
      state.exchangeTo = action.payload;
    },
    setSelectedModalType: (
      state,
      action: PayloadAction<"from" | "to" | null>
    ) => {
      state.selectedModalType = action.payload;
    },
    setTransferAmount: (state, action: PayloadAction<number | null>) => {
      state.transferAmount = action.payload;
    },
    setExchangeAmount: (state, action: PayloadAction<number | null>) => {
      state.exchangeAmount = action.payload;
    },
    setSendToAddress: (state, action: PayloadAction<string | null>) => {
      state.sendToAddress = action.payload;
    },
    setTransactionType: (state, action: PayloadAction<"token" | "nft">) => {
      state.transactionType = action.payload;
    },
    setExchangeOutAmount: (state, action: PayloadAction<number | null>) => {
      state.exchangeOutAmount = action.payload;
    },
    setRoutes: (state, action: PayloadAction<[]>) => {
      state.routes = action.payload;
    },
    setSelectedRoute: (state, action: PayloadAction<[]>) => {
      state.selectedRoute = action.payload;
    },
    setSlippage: (state, action: PayloadAction<string>) => {
      state.slippage = action.payload;
    },
  },
});

export const {
  setSelectedToken,
  // setSelectedContact,
  setSelectedNft,
  setExchangeFrom,
  setExchangeTo,
  setTransferAmount,
  setSendToAddress,
  setTransactionType,
  setSelectedModalType,
  setExchangeAmount,
  setExchangeOutAmount,
  setRoutes,
  setSelectedRoute,
  setRecipient,
  setSlippage,
} = sendSlice.actions;
export default sendSlice.reducer;
