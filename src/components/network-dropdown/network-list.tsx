import { getNetworks, GetNetworksResponse } from "@/actions/network";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { CircleCheck } from "lucide-react";
import {
  getNetwork,
  useDynamicContext,
  useSwitchNetwork,
} from "@dynamic-labs/sdk-react-core";
import { NetworkWidgetProps } from "@/types/global";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/redux-provider";
import { setNetworkWidgetOpen } from "@/redux/slices/global.slice";

const NetworkList: React.FC<NetworkWidgetProps> = ({
  afterSelectSideEffect,
  onNetworkClick,
  selectedNetworkParam,
}) => {
  const [networks, setNetworks] = useState<GetNetworksResponse | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<
    number | string | null
  >(null);

  const { primaryWallet } = useDynamicContext();

  const switchNetwork = useSwitchNetwork();
  const dispatch = useAppDispatch();

  const fetchNetworks = useCallback(async () => {
    const data = await getNetworks();
    if (!data) {
      throw new Error("Failed to fetch tokens");
    }
    setNetworks(data);
  }, []);

  useEffect(() => {
    fetchNetworks();
  }, [fetchNetworks]);

  useEffect(() => {
    if (selectedNetworkParam !== undefined && selectedNetworkParam !== null) {
      // If selectedNetworkParam is provided, use it
      setSelectedNetwork(selectedNetworkParam);
    } else {
      // Otherwise, fetch current network if there's no param
      const fetchCurrentNetwork = async () => {
        if (primaryWallet) {
          const walletConnector = primaryWallet.connector;
          try {
            const network = await getNetwork(walletConnector);
            if (network) {
              setSelectedNetwork(network);
            }
          } catch {
            return null;
          }
        }
      };

      fetchCurrentNetwork();
    }
  }, [primaryWallet, selectedNetworkParam]); // Depend on selectedNetworkParam

  return (
    <div
      className={cn(
        "relative z-50 flex flex-col bg-background shadow-lg rounded-[5px]",
        "w-full h-full max-w-full",
        " p-[6px] overflow-y-auto  space-y-2 scrollbar-hide"
      )}
    >
      {primaryWallet &&
        networks?.map((network) => (
          <div
            className={cn(
              "flex items-center justify-between h-[53px] rounded-[5px] focus:outline-none p-2 px-3 cursor-pointer space-x-4",
              {
                "bg-primary": network.chainId === selectedNetwork, // Apply custom color if selected
              },
              "hover:bg-blue-100/10"
            )}
            key={network.id}
            onClick={async () => {
              try {
                if (onNetworkClick) {
                  onNetworkClick(network.chainId);
                } else {
                  await switchNetwork({
                    wallet: primaryWallet,
                    network: network.chainId,
                  });
                  setSelectedNetwork(network.chainId); // Update selected network
                  toast.success(`switched network to ${network.name}`);
                  if (afterSelectSideEffect) {
                    afterSelectSideEffect();
                  }

                  dispatch(setNetworkWidgetOpen(false));
                }
              } catch {
                toast.error("failed to switch network");
              }
            }}
          >
            <Image
              alt="bot"
              className="w-[30px] h-[30px]"
              height={30}
              src={network.logoUrl}
              width={30}
            />

            <span className="flex-1 truncate text-sm text-normal">
              {network.name}
            </span>
            {network.chainId === selectedNetwork && (
              <CircleCheck className="stroke-foreground w-[18px] h-[18px]" />
            )}
          </div>
        ))}
    </div>
  );
};

export default NetworkList;
