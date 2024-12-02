"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import RoundedImg from "../atoms/rounded-img";
import { cn } from "@/lib/utils";
import ConnectWalletBtn from "../atoms/connect-wallet-btn";
import {
  getNetwork,
  useDynamicContext,
  useIsLoggedIn,
} from "@dynamic-labs/sdk-react-core";
import { useAppDispatch } from "@/redux/redux-provider";
import { setNetworkWidgetOpen } from "@/redux/slices/global.slice";
import { GetNetworksResponse, getNetworks } from "@/actions/network";
import Image from "next/image";
import { Button } from "../ui/button";
import UserInfo from "../atoms/user-info";
import { HeaderProps } from "@/types/global";
// import { storePrimaryWalletAddress } from "@/app/actions/user";
import { toast } from "react-toastify";

const headerShadow = {
  boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.3)",
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const dynamicLoggedInStatus = useIsLoggedIn();
  const isConnected = dynamicLoggedInStatus;
  const headerRef = useRef<HTMLDivElement>(null);
  const { primaryWallet } = useDynamicContext();
  const [networks, setNetworks] = useState<GetNetworksResponse | null>();
  const [selectedNetwork, setSelectedNetwork] = useState<
    number | string | null
  >(null);

  const dispatch = useAppDispatch();

  const selectedNetworkLogoUrl = useCallback(
    () =>
      networks?.find((network) => network.chainId === selectedNetwork)?.logoUrl,
    [networks, selectedNetwork]
  )();

  const fetchNetworks = useCallback(async () => {
    const data = await getNetworks();
    if (!data) {
      throw new Error("Failed to fetch tokens");
    }
    setNetworks(data);
  }, []);

  useEffect(() => {
    const fetchCurrentNetwork = async () => {
      if (primaryWallet) {
        const walletConnector = primaryWallet.connector;
        try {
          const network = await getNetwork(walletConnector);
          // Handle the network data here
          if (network) {
            setSelectedNetwork(network);
          }
        } catch {
          toast.error("failed to find networks");
        }
      }
    };

    fetchCurrentNetwork();
  }, [primaryWallet]);

  useEffect(() => {
    const updateWalletAddress = async () => {
      if (primaryWallet) {
        try {
          // Call the server action with the wallet address
          // await storePrimaryWalletAddress(primaryWallet.address);
        } catch {
          toast.error("failed to update wallet address in the app");
        }
      }
    };

    updateWalletAddress();
  }, [primaryWallet]);

  useEffect(() => {
    fetchNetworks();
  }, [fetchNetworks]);

  return (
    <header
      className={cn(
        " relative w-full h-[73px] border-b border-border   flex items-center justify-between ",
        className
      )}
      ref={headerRef}
      style={headerShadow}
    >
      <div className="flex items-center gap-x-2 lg:gap-3 ml-4 lg:ml-7">
        <RoundedImg
          alt="buddy-logo"
          quality={100}
          src="/img/buddy-app-logo.png"
        />
        <h5 className="text-xs lg:text-xl">Buddy App</h5>
      </div>
      {isConnected ? (
        <div className=" flex items-center gap-3 mr-4 lg:mr-7">
          <div className="relative z-60">
            <Button
              className="bg-transparent focus:outline-none px-0"
              onClick={() => {
                dispatch(setNetworkWidgetOpen(true));
              }}
            >
              {selectedNetworkLogoUrl ? (
                <Image
                  alt="network-logo"
                  className="
    w-[36px] h-[36px]
    sm:min-w-[30px] sm:min-h-[30px]  
    md:min-w-[28px] md:min-h-[28px]  
    max-w-full object-contain"
                  height={36}
                  src={selectedNetworkLogoUrl}
                  width={36}
                />
              ) : (
                <RoundedImg
                  alt="currency"
                  className="w-[36px] h-[36px] f"
                  src="/img/empty-token-logo.png"
                />
              )}
            </Button>
          </div>
          <UserInfo />
        </div>
      ) : (
        <ConnectWalletBtn className="mr-7" />
      )}
    </header>
  );
};

export default Header;
