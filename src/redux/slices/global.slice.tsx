// import { userChats } from '@/db/schema/user-chat';
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GlobalStatesTypes {
  isSendHistoryOpen: boolean;
  botInfoActive: 0 | 1 | 2 | 3;
  isSelectTokenOpen: boolean;
  isSelectNFTOpen: boolean;
  isSelectContactOpen: boolean;
  isSendReviewOpen: boolean;
  isExchangeReviewOpen: boolean;
  isWalletWidgetOpen: boolean;
  isNetworkWidgetOpen: boolean;
  redirectRoute: 0 | 1 | 2 | 3;
  isContactFormModalOpen: boolean;
  isChatSideBarOpen: boolean;
  isMoreSidebarOpen: boolean;
  isSendSuccessModalOpen: boolean;
  isExchangeSuccessModalOpen: boolean;
  refetchChatSidebarHistory: boolean;
  openedChatThreadId: string;
  // selectedChat: typeof userChats.$inferSelect | null;
}

const initialState: GlobalStatesTypes = {
  isSendHistoryOpen: false,
  botInfoActive: 0,
  isSelectTokenOpen: false,
  isSelectNFTOpen: false,
  isSelectContactOpen: false,
  isSendReviewOpen: false,
  isExchangeReviewOpen: false,
  isWalletWidgetOpen: false,
  isNetworkWidgetOpen: false,
  redirectRoute: 0,
  isContactFormModalOpen: false,
  isChatSideBarOpen: false,
  isMoreSidebarOpen: false,
  isSendSuccessModalOpen: false,
  isExchangeSuccessModalOpen: false,
  refetchChatSidebarHistory: false,
  openedChatThreadId: "",
  // selectedChat: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSendHistoryOpen: (state, action: PayloadAction<boolean>) => {
      state.isSendHistoryOpen = action.payload;
    },
    setBotInfoActive: (state, action: PayloadAction<0 | 1 | 2 | 3>) => {
      state.botInfoActive = action.payload;
    },
    setSelectTokenOpen: (state, action: PayloadAction<boolean>) => {
      state.isSelectTokenOpen = action.payload;
    },
    setSelectContactOpen: (state, action: PayloadAction<boolean>) => {
      state.isSelectContactOpen = action.payload;
    },
    setSelectNFTOpen: (state, action: PayloadAction<boolean>) => {
      state.isSelectNFTOpen = action.payload;
    },
    setSendReviewOpen: (state, action: PayloadAction<boolean>) => {
      state.isSendReviewOpen = action.payload;
    },
    setExchangeReviewOpen: (state, action: PayloadAction<boolean>) => {
      state.isExchangeReviewOpen = action.payload;
    },
    setWalletWidgetOpen: (state, action: PayloadAction<boolean>) => {
      state.isWalletWidgetOpen = action.payload;
    },
    setNetworkWidgetOpen: (state, action: PayloadAction<boolean>) => {
      state.isNetworkWidgetOpen = action.payload;
    },
    setRedirectRoute: (state, action: PayloadAction<0 | 1 | 2 | 3>) => {
      state.redirectRoute = action.payload;
    },
    setContactFormModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isContactFormModalOpen = action.payload;
    },
    setChatSideBarOpen: (state, action: PayloadAction<boolean>) => {
      state.isChatSideBarOpen = action.payload;
    },
    setMoreSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isMoreSidebarOpen = action.payload;
    },
    setSendSuccessModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isSendSuccessModalOpen = action.payload;
    },
    setExchangeSuccessModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isExchangeSuccessModalOpen = action.payload;
    },

    setRefetchChatSidebarHistory: (state, action: PayloadAction<boolean>) => {
      state.refetchChatSidebarHistory = action.payload;
    },
    setOpenedChatThreadId: (state, action: PayloadAction<string>) => {
      state.openedChatThreadId = action.payload;
    },
    // setSelectedChat: (
    //   state,
    //   action: PayloadAction<typeof userChats.$inferSelect | null>
    // ) => {
    //   state.selectedChat = action.payload;
    // },
  },
});

export const {
  setSendHistoryOpen,
  setBotInfoActive,
  setSelectTokenOpen,
  setSelectContactOpen,
  setSelectNFTOpen,
  setSendReviewOpen,
  setExchangeReviewOpen,
  setWalletWidgetOpen,
  setNetworkWidgetOpen,
  setRedirectRoute,
  setContactFormModalOpen,
  setChatSideBarOpen,
  setMoreSidebarOpen,
  setSendSuccessModalOpen,
  setExchangeSuccessModalOpen,
  setRefetchChatSidebarHistory,
  setOpenedChatThreadId,
  // setSelectedChat,
} = globalSlice.actions;
export default globalSlice.reducer;
