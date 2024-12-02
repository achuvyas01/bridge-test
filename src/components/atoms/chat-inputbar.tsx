import React from "react";
import { Mic, VolumeX } from "lucide-react";
import { Input } from "../ui/input";
import { SendIcon } from "@/lib/index-icons";
import { ChatInputBarProps } from "@/types/global";

const ChatInputBar: React.FC<ChatInputBarProps> = ({
  message,
  setMessage,
  sendMessage,
  handleKeyPress,
}) => {
  return (
    <div className="w-full flex items-center">
      <div
        className="w-[30px] h-[30px] lg:scale-150 bg-primary flex-center shrink-0 grow-0 rounded-full hover:opacity-80 active:opacity-100"
        role="button"
      >
        <VolumeX className="w-[14px] h-auto shrink-0" />
      </div>
      <div className="relative ml-4 h-[50px] lg:h-[60px] w-full">
        <Input
          className="text-sm h-full pr-[80px] lg:pr-[100px]"
          onChange={setMessage}
          onKeyDown={handleKeyPress}
          placeholder="Type your message"
          type="text"
          value={message}
        />
        <Mic
          className="text-white/50 w-[20px] h-auto absolute right-14 lg:right-16 top-1/2 -translate-y-1/2"
          role="button"
        />
        <div
          className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] shrink-0 bg-primary flex-center absolute right-4 top-1/2 -translate-y-1/2 rounded-full hover:opacity-80 active:opacity-100"
          onClick={sendMessage}
          role="button"
        >
          <SendIcon className="w-[14px] h-auto shrink-0 rotate-45 hover:rotate-0 transition-all" />
        </div>
      </div>
    </div>
  );
};

export default ChatInputBar;
