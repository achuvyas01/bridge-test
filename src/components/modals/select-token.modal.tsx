'use client';
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import SearchInput from '../atoms/search-input';
import TokenListItem from '../atoms/token-list-item';
import Image from 'next/image';
import { Button } from '../ui/button';
import NetworkList from '../network-dropdown/network-list';
import { SelectTokenModalProps } from '@/types/global';
import FadeLoader from 'react-spinners/FadeLoader';

const SelectTokenModal: React.FC<SelectTokenModalProps> = ({
  isLoading,
  isOpen,
  searchInput,
  handleSearchInput,
  selectToken,
  switchWalletNetworkAlso = false,
  showAllTokens,
  networks,
  selectedNetwork,
  isNetworkMenuOpen = false,
  toggleNetworkMenu,
  tokens,
  onNetworkClick,
  closeTokensModal,
}) => {
  // const { isSelectTokenOpen } = useAppSelector((state) => state.global);
  // const [selectedNetwork, setSelectedNetwork] = useState<
  //   number | string | null
  // >(null);
  // const { primaryWallet } = useDynamicContext();
  // const [tokens, setTokens] = useState<TokenResponse[] | []>();
  // const [networks, setNetworks] = useState<GetNetworksResponse | null>();
  // const [isNetworkMenuOpen, setNetworkMenuOpen] = useState(false);
  // const [searchTerm, setSearchTerm] = useState<string>('');
  // const [isLoading, setIsLoading] = useState(false);

  // const dispatch = useAppDispatch();
  // const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  // const networkMenuRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       networkMenuRef.current &&
  //       !networkMenuRef.current.contains(event.target as Node)
  //     ) {
  //       setNetworkMenuOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  // const toggleNetworkMenu = () => {
  //   setNetworkMenuOpen(!isNetworkMenuOpen);
  // };

  // // Handle input change and debounce the fetch calls
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputValue = event.target.value;
  //   const filteredValue = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');
  //   setSearchTerm(inputValue);

  //   // Clear the previous debounce timer
  //   if (debounceTimeout.current) {
  //     clearTimeout(debounceTimeout.current);
  //   }
  //   // Set a new debounce timer for fetching after delay
  //   debounceTimeout.current = setTimeout(() => {
  //     fetchTokens(filteredValue);
  //   }, 300);
  // };

  // const fetchNetworks = useCallback(async () => {
  //   const data = await getNetworks();
  //   if (!data) {
  //     throw new Error('Failed to fetch tokens');
  //   }
  //   setNetworks(data);
  // }, []);

  const selectedNetworkLogoUrl = networks
    ? networks?.find((network) => network.chainId === selectedNetwork)?.logoUrl
    : '';

  // const fetchTokens = useCallback(
  //   async (searchParam?: string) => {
  //     setIsLoading(true);
  //     try {
  //       let response;
  //       if (showAllTokens) {
  //         response = await getTokensByChain({
  //           chainId: selectedNetwork as string,
  //           searchParam,
  //         });
  //       } else {
  //         response = await getTokens({
  //           searchParam: searchParam || '', // Default to empty string if no search term
  //           address: primaryWallet?.address,
  //           chainId: selectedNetwork as number,
  //         });
  //       }

  //       setTokens(response);
  //       setIsLoading(false);
  //     } catch {
  //       setIsLoading(false);
  //       toast.error('Failed to fetch tokens.');
  //     }
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [primaryWallet?.address, selectedNetwork, isSelectTokenOpen]
  // );

  // useEffect(() => {
  //   const fetchCurrentNetwork = async () => {
  //     if (primaryWallet) {
  //       const walletConnector = primaryWallet.connector;
  //       try {
  //         const network = await getNetwork(walletConnector);
  //         if (network) {
  //           setSelectedNetwork(network);
  //         }
  //       } catch {
  //         toast.error('failed to fetch current network');
  //       }
  //     }
  //   };

  //   fetchNetworks();
  //   fetchCurrentNetwork();
  // }, [primaryWallet, fetchNetworks]);

  // useEffect(() => {
  //   if (primaryWallet?.address && selectedNetwork) {
  //     fetchTokens();
  //   }
  // }, [primaryWallet?.address, fetchTokens, selectedNetwork, isSelectTokenOpen]);

  // const onNetworkClick = (chainId: string | number) => {
  //   setSelectedNetwork(chainId);
  // };

  return (
    <Dialog
      // onOpenChange={() => dispatch(setSelectTokenOpen(false))}
      onOpenChange={closeTokensModal}
      open={isOpen}
    >
      <DialogContent className='w-[calc(100%-16px)] mx-auto lg:w-full max-w-[646px] max-h-[80svh] overflow-scroll '>
        <DialogTitle>Select Token </DialogTitle>
        <div className='relative flex items-center gap-x-3'>
          <SearchInput onChange={handleSearchInput} value={searchInput} />

          {selectedNetworkLogoUrl && (
            <Button className='p-0 bg-transparent' onClick={toggleNetworkMenu}>
              <Image
                alt='network-logo'
                className='
    w-[42px] h-[42px]
    sm:min-w-[35px] sm:min-h-[35px]  
    md:min-w-[33px] md:min-h-[33px]  
    max-w-full object-contain'
                height={50}
                src={selectedNetworkLogoUrl}
                width={50}
              />
            </Button>
          )}

          {/* Absolutely positioned dialog below the RoundedImg */}
          {isNetworkMenuOpen && (
            <div
              className='absolute w-[200px] h-[400px] mt-[15px] border shadow-lg z-50'
              // ref={networkMenuRef}
              style={{
                top: '100%', // Position it below the RoundedImg
                left: 'calc(100% - 200px)', // Adjust this to move it left
              }}
            >
              <NetworkList
                selectedNetworkParam={selectedNetwork}
                {...(switchWalletNetworkAlso && { onNetworkClick })}
              />
            </div>
          )}
        </div>
        {/*
        popular hidden for now
 <div className='flex gap-x-4 gap-y-3 flex-wrap'>
          {[...Array(5)].map((_, index) => (
            <TokenPill key={index} />
          ))}
        </div>
      */}
        <div>
          <span className='text-lg opacity-50 font-bold'>Your Tokens</span>
          <ul className='overflow-auto flex-col flex h-[90%] pb-[30px] mt-2 hideScrollbar min-h-[350px]'>
            {isLoading ? (
              <div className='flex justify-center items-center h-full'>
                <FadeLoader
                  color={'#A3A3A3'}
                  height={15}
                  margin={4}
                  radius={8}
                  width={4}
                />{' '}
              </div>
            ) : (
              tokens &&
              tokens.length > 0 &&
              tokens.map((item, index) => (
                <div
                  className='py-[2px]'
                  key={index}
                  onClick={() => selectToken(item)}
                >
                  <TokenListItem hideValue={showAllTokens} token={item} />
                </div>
              ))
            )}
          </ul>
        </div>{' '}
      </DialogContent>
    </Dialog>
  );
};

export default SelectTokenModal;
