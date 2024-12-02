// "use client";
// import { AddNewChatIcon } from "@/lib/index-icons";
// import React, { useCallback, useEffect, useState } from "react";
// import { Input } from "../ui/input";
// import { cn } from "@/lib/utils";
// import { useAppSelector } from "@/redux/redux-provider";
// import { X } from "lucide-react";
// import {
//   setChatSideBarOpen,
//   setSelectedChat,
// } from "@/redux/slices/global.slice";
// import { AnimatePresence, motion } from "framer-motion";
// import { useWindowSize } from "usehooks-ts";
// import { getGroupedUserChats, PaginatedGroupedChats } from "@/app/actions/chat";
// import { useDispatch } from "react-redux";

// const ChatHistorySidebar = () => {
//   const { isChatSideBarOpen, refetchChatSidebarHistory, selectedChat } =
//     useAppSelector((state) => state.global);
//   const { width = 1024 } = useWindowSize();
//   const isMobileView = width < 1024;

//   const [chatThreads, setChatThreads] = useState<PaginatedGroupedChats>({
//     data: [],
//     total: 0,
//     page: 1,
//     pageSize: 10,
//     pageCount: 0,
//   });
//   // const [isLoadingChats, setIsLoadingChats] = useState(false);
//   const dispatch = useDispatch();

//   function onAddNewChatClick() {
//     dispatch(setSelectedChat(null));
//   }

//   const fetchChatThreads = useCallback(
//     async (page: number) => {
//       try {
//         // setIsLoadingChats(true);
//         const response = await getGroupedUserChats({
//           page,
//           pageSize: chatThreads.pageSize,
//         });

//         setChatThreads((prev) => ({
//           ...response,
//           data: page === 1 ? response.data : [...prev.data, ...response.data],
//         }));
//       } catch (error) {
//         console.error("Failed to fetch chat threads:", error);
//       } finally {
//         // setIsLoadingChats(false);
//       }
//     },
//     [chatThreads.pageSize]
//   );

//   useEffect(() => {
//     fetchChatThreads(1);
//   }, [fetchChatThreads, refetchChatSidebarHistory, selectedChat]);

//   return (
//     <AnimatePresence>
//       <motion.div
//         animate={
//           isMobileView ? { right: isChatSideBarOpen ? "0%" : "-100%" } : {}
//         }
//         className="fixed top-[73px] lg:top-0 lg:relative w-full bg-background z-40 lg:inline-block h-full pb-[180px] border-r border-border overflow-auto"
//         initial={isMobileView ? { right: "-100%" } : { right: 0 }}
//         style={isMobileView ? {} : { right: 0 }}
//       >
//         <div
//           className="flex items-center sticky px-4 py-4 top-[-1px] z-10 bg-background"
//           onClick={onAddNewChatClick}
//         >
//           <AddNewChatIcon
//             className="w-[30px] shrink-0 h-auto text-white active:scale-[0.9]"
//             role="button"
//           />
//           <Input
//             className="bg-input ml-4"
//             placeholder="Search Chat"
//             type="search"
//           />
//           <X
//             className="lg:hidden ml-2 w-[30px] shrink-0 h-auto text-white"
//             onClick={() => dispatch(setChatSideBarOpen(false))}
//             role="button"
//           />
//         </div>
//         {chatThreads.data.map((group) => (
//           <ChatHistoryTimeLine dateTime={group.date} key={group.date}>
//             {group.chats.map((chat) => (
//               <ChatHistoryItem
//                 active={selectedChat?.id === chat.id}
//                 key={chat.id}
//                 onClick={() => {
//                   dispatch(setSelectedChat(chat));
//                 }}
//                 title={chat.contextTitle}
//               />
//             ))}
//           </ChatHistoryTimeLine>
//         ))}
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// const ChatHistoryTimeLine = ({
//   dateTime,
//   children,
// }: {
//   dateTime: string;
//   children: React.ReactNode;
// }) => {
//   return (
//     <ul className="chatHistoryTimeLine">
//       <li className="text-left text-sm px-4 mb-2 font-semibold text-white/50">
//         {dateTime}
//       </li>
//       {children}
//     </ul>
//   );
// };

// const ChatHistoryItem = ({
//   active,
//   title,
//   onClick,
// }: {
//   active?: boolean;
//   title: string;
//   onClick: () => void;
// }) => (
//   <li
//     className={cn(
//       "chatHistoryItem w-full h-[50px] last:mb-5 cursor-pointer pl-6 hover:bg-accent group pr-2 flex justify-start items-center",
//       active && "bg-accent"
//     )}
//     onClick={onClick}
//   >
//     <span
//       className={cn(
//         "text-sm opacity-50 truncate group-hover:opacity-100 ",
//         active && "opacity-100"
//       )}
//     >
//       {title}
//     </span>
//   </li>
// );

// export default ChatHistorySidebar;
