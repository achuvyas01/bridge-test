// import React from 'react';
// import NavItem from '../atoms/nav-item';
// import {
//   ChatIcon,
//   ContactIcon,
//   ExchangeIcon,
//   MoreIcon,
//   SendIcon,
// } from '@/lib/index-icons';
// import { cn } from '@/lib/utils';
// import { iconBaseClass } from './sidenavbar';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useAppDispatch, useAppSelector } from '@/redux/redux-provider';
// import { setMoreSidebarOpen } from '@/redux/slices/global.slice';

// const FooterMobile = () => {
//   const pathname = usePathname();

//   const { isChatSideBarOpen } = useAppSelector((state) => state.global);
//   const isActive = pathname === '/chat' && !isChatSideBarOpen;

//   const dispatch = useAppDispatch();
//   const isMoreSidebarOpen = useAppSelector(
//     (state) => state.global.isMoreSidebarOpen
//   );

//   if (isActive) {
//     return null;
//   }
//   return (
//     <div className='fixed bottom-0 w-full h-[80px] lg:hidden z-40'>
//       <footer className='fixed lg:hidden flex items-center justify-evenly bottom-0 left-0 right-0 w-full h-[80px] bg-secondary'>
//         <NavItem label='Send' link='send'>
//           <SendIcon className={cn(iconBaseClass, 'w-[18px]')} />
//         </NavItem>
//         <NavItem label='Exchange' link='exchange'>
//           <ExchangeIcon className={cn(iconBaseClass, 'w-[23px]')} />
//         </NavItem>
//         <Link
//           className={cn(
//             'text-[10px] mt-7 opacity-50',
//             isActive && 'opacity-100'
//           )}
//           href={'/chat'}
//         >
//           Chat
//         </Link>
//         <NavItem label='Contacts' link='contacts'>
//           <ContactIcon className={cn(iconBaseClass, 'w-[23px]')} />
//         </NavItem>
//         <div
//           className={cn(
//             'text-[10px] opacity-50',
//             isMoreSidebarOpen && 'opacity-100'
//           )}
//           onClick={() => dispatch(setMoreSidebarOpen(!isMoreSidebarOpen))}
//           role='button'
//         >
//           <MoreIcon className={cn(iconBaseClass, 'w-[23px] mb-2')} />
//           More
//         </div>
//       </footer>
//       <ChatButton />
//     </div>
//   );
// };

// const ChatButton = () => {
//   return (
//     <Link href={'/chat'}>
//       <div
//         className={cn(
//           'bg-primary w-[55px] h-[55px] rounded-full flex-center absolute left-1/2 -translate-x-1/2 bottom-[53px] active:scale-[0.95] '
//         )}
//         role='button'
//       >
//         <ChatIcon className='w-[19px] h-auto text-white' />
//       </div>
//     </Link>
//   );
// };
// export default FooterMobile;
