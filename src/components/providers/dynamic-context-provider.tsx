"use client";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { setAuthCookie, signOut } from "../../../auth";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/redux-provider";
import { setRedirectRoute } from "@/redux/slices/global.slice";
// import { handleUserLogin } from "@/app/actions/user";
import { createConfig, WagmiProvider } from "wagmi";
import { CHAINS, transports } from "@/lib/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import * as Tooltip from "@radix-ui/react-tooltip";
import MainLayout from "../layouts/main-layout";
// import MainLayou

export default function DynamicAuthProvider({
  children,
}: React.PropsWithChildren) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { redirectRoute } = useAppSelector((state) => state.global);

  const config = createConfig({
    chains: CHAINS,
    transports: transports,
    multiInjectedProviderDiscovery: true,
  });

  const queryClient = new QueryClient();

  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID || "",
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess: async (event) => {
            const { authToken } = event;

            if (event.primaryWallet && event.user.userId) {
              //   await handleUserLogin({
              //     walletAddress: event.primaryWallet?.address,
              //     dynamicId: event.user.userId,
              //   });

              await setAuthCookie(authToken);

              if (redirectRoute === 1) {
                dispatch(setRedirectRoute(0));
                router.push("/chat");
              }
            }
          },
          onLogout: async () => {
            await signOut();
            router.push("/");
          },
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            <Tooltip.Provider delayDuration={800} skipDelayDuration={500}>
              <MainLayout>{children}</MainLayout>
            </Tooltip.Provider>
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
