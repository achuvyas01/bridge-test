"use client";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { ConnectWalletBtnPops } from "@/types/global";

const ConnectWalletBtn: React.FC<ConnectWalletBtnPops> = ({
  className,
  routingAction,
}) => {
  const { setShowAuthFlow, isAuthenticated } = useDynamicContext();

  if (isAuthenticated) {
    return null;
  }

  return (
    <Button
      className={cn(
        "w-[310px] h-[40px] lg:h-[52px] text-sm lg:text-base font-semibold text-white rounded-[6px]",
        className
      )}
      onClick={() => {
        if (routingAction) {
          routingAction();
        }
        setShowAuthFlow(true);
      }}
      variant={"default"}
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWalletBtn;
