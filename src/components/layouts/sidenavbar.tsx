import React from "react";
import {
  ChatIcon,
  ContactIcon,
  ExchangeIcon,
  NetworksIcon,
  SendIcon,
  TokenIcon,
} from "@/lib/index-icons";
import { cn } from "@/lib/utils";
import NavItem from "../atoms/nav-item";

export const iconBaseClass =
  "w-[19px] h-auto text-white group-hover:opacity-100 opacity-50 shrink-0 group-[.active]:opacity-100";
export const SideNavbar = () => {
  return (
    <aside className="hidden lg:inline-block pl-[21px] pr-4 pt-4 pb-10 h-full border-r border-border">
      <nav>
        <NavItem label="Chat" link="chat">
          <ChatIcon className={cn(iconBaseClass)} />
        </NavItem>
        <NavItem label="Send" link="send">
          <SendIcon className={cn(iconBaseClass, "w-[18px]")} />
        </NavItem>
        <NavItem label="Exchange" link="exchange">
          <ExchangeIcon className={cn(iconBaseClass, "w-[23px]")} />
        </NavItem>
        <NavItem label="Contacts" link="contacts">
          <ContactIcon className={cn(iconBaseClass, "w-[23px]")} />
        </NavItem>
        <NavItem label="Networks" link="networks">
          <NetworksIcon className={cn(iconBaseClass, "w-[19px]")} />
        </NavItem>
        <NavItem label="Tokens" link="tokens">
          <TokenIcon className={cn(iconBaseClass, "w-[17px]")} />
        </NavItem>
      </nav>
    </aside>
  );
};
