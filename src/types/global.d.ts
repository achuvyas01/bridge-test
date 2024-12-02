import { NftResponse, TokenResponse } from "@/actions/common";
import { ContactResponseItem, PaginatedContacts } from "@/app/actions/contacts";
import { GetNetworksResponse } from "@/app/actions/network";
import { ProviderEnum } from "@dynamic-labs/types";

type RoundedImgProps = Partial<{
  src: string;
  alt: string;
  className: string;
  quality: number;
  imgClassName: string;
}>;

type SelectBuddyCardProps = {
  index: number;
  title: string;
  description: string;
  caption?: string;
  children: React.ReactNode;
};

type AvatarWithInitialsProps = {
  firstName: string;
  lastName: string;
  className?: string;
};
interface SendOption {
  id: string | number;
  label: string;
}
interface WalletOption {
  id: string | number;
  label: string;
}

interface CustomRadioTogglerProps {
  /** unique name for radio group*/
  uniqueName: string;
  options: SendOption[];
  selectedOption: SendOption;
  onSelectOption: (_: SendOption) => void;
  className?: string;
}
type TokenItemProps = {
  name: string;
  amount: number;
  logo: string;
  className?: string;
  symbol?: string;
  price: number;
};

type NftItemProps = {
  name: string;
  amount: number;
  logo: string;
  className?: string;
  symbol?: string;
};

type WalletItemProps = {
  address: string;
  logo?: string;
  walletInfo: any;
  isPrimary: boolean;
  type?: "wallet" | "chat";
  disabled?: boolean;
};

type WalletSectionProps = {
  type?: "wallet" | "chat";
  disabled?: boolean;
};

type ChatWalletWidgetProps = {
  disabled?: boolean;
  className?: string;
};

type ConnectSocialProps = {
  accountName: string;
  provider: ProviderEnum;
  logo: string;
};

type ConfirmEmailProps = {
  email: string;
  otp: number | null;
  setOtp: React.Dispatch<React.SetStateAction<number | null>>;
  submitOtp: () => void; // Pass this prop
  isSubmittingOtp: boolean;
  goBack: () => void;
};

type WalletMenuProps = {
  walletInfo: any;
  hideMenu: () => void;
  disabled?: boolean;
};
type WalletProfileProps = {
  className?: string;
};

type NetworkWidgetProps = {
  className?: string;
  searchEnabled?: boolean;
  afterSelectSideEffect?: () => void;
  onNetworkClick?: (chainId: string | number) => void;
  selectedNetworkParam?: string | number | null;
};

type TokensWidgetProps = {
  className?: string;
  tokens: TokenResponse[];
  nfts: NftResponse[];
  primaryWallet?: string;
};

type TokensListItemProps = {
  token?: TokenResponse;
  hideValue?: boolean;
};

type NftListItemProps = {
  nft?: NftResponse;
};

type WalletDialogProps = {
  showWalletWidget: boolean;
  setShowWalletWidget: (state: boolean) => void;
};

type NetworkItemType = {
  name: string;
  imgUrl: string;
  isPrimaryNetwork?: boolean;
  networkId: number;
};

type SearchInputProps = {
  value?: string;
  onChange?: (event: react.changeevent<htmlinputelement>) => void;
};

type contactFormScreenType = "Add" | "Edit" | "Remove";

type ContactFormType = {
  rootClassName?: string;
  removeBoxShadow?: boolean;
  formScreen?: contactFormScreenType;
  contact?: ContactResponseItem;
  onSubmit?: () => void;
  changeModalState?: (value: boolean) => void;
  onSuccess?: () => void;
};

type selectedContactItemType = {
  rootClassName?: string;
  contact?: ContactResponseItem;
};

type ContactFormModalType = {
  isOpen?: boolean;
  onOpenChange?: (_: boolean) => void;
  children?: React.ReactNode;
  formScreen?: contactFormScreenType;
  onSubmit?: (data: {
    name: string;
    walletAddress: string;
    contactId: string;
  }) => void;
  contact?: ContactResponseItem;
  refreshContacts?: () => void;
};

type ConnectWalletBtnPops = {
  className?: string;
  routingAction?: () => void;
};

type NetworkItemProps = {
  network: {
    chainId: number;
    name: string;
    logoUrl: string;
  };
  className?: string;
  disabled?: boolean;
};

type ChatNetworkWidgetProps = {
  disabled?: boolean;
};

type NetworkPageProps = {
  data: GetNetworksResponse;
};

type ContactPageProps = {
  data: PaginatedContacts;
};

type ContactWidgetProps = {
  data: ContactResponseItem[];
  searchInput?: string;
  onSearchInputChange?: (event: react.changeevent<htmlinputelement>) => void;
  refreshContacts?: () => void;
  visibleCount?: number;
  loadMore?: () => void;
  hasMore?: boolean;
  totalContacts: number;
  className?: string;
};

type ContactItemProps = {
  contact: ContactResponseItem;
  refreshContacts?: () => void;
};

type NetworkDataProps = {
  data: GetNetworksResponse;
};

type ExchangeItemType = {
  exchangeType: "From" | "To";
  selectToken: (value: TokenResponse) => void;
  disabled?: boolean;
  outAmount?: number;
  isAmountLoading?: boolean;
  selectedToken: TokenResponse | null;
  selectedToken: TokenResponse;
  amountInput: number;
  handleAmountChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectMax?: () => void;
  openTokenModal: () => void;
};

type PillType = {
  className?: string;
  value: string;
  onClick?: () => void;
  active?: boolean;
};

type chatMessageType = {
  text: string;
  messageFrom: "Sender" | "Receiver";
  time: string;
};

type HeaderProps = {
  className?: string;
  handleNavigation?: (route: string) => void;
};

interface IndexClientsTokensProps {
  tokens: TokenResponse[];
  nfts: NftResponse[];
}

type ChatInputBarProps = {
  message: string;
  setMessage: (event: react.changeevent<htmlinputelement>) => void;
  sendMessage: () => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

type SelectTokenModalProps = {
  isLoading: boolean;
  isOpen: boolean;
  searchInput?: string;
  selectedNetwork: number | string | null;
  handleSearchInput?: (event: react.changeevent<htmlinputelement>) => void;
  selectToken: (value: TokenResponse) => void;
  switchWalletNetworkAlso?: boolean;
  showAllTokens?: boolean;
  networks: GetNetworksResponse | null | undefined;
  isNetworkMenuOpen: boolean;
  toggleNetworkMenu: () => void;
  tokens: TokenResponse[] | [];
  onNetworkClick: (chainId: string | number) => void;
  closeTokensModal: () => void;
};

type ExchangeReviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  exchangeFrom: TokenResponse;
  exchangeTo: TokenResponse;
  exchangeAmount: number;
  exchangeOutAmount: number;
  slippage: string;
  executeSwap: () => void;
};
