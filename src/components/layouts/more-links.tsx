// import { useAppDispatch, useAppSelector } from '@/redux/redux-provider';
// import { motion, AnimatePresence } from 'framer-motion';
// import React from 'react';
// import NavItem from '../atoms/nav-item';
// import { NetworksIcon, TokenIcon } from '@/lib/index-icons';
// import { cn } from '@/lib/utils';
// import { iconBaseClass } from './sidenavbar';
// import { X } from 'lucide-react';
// import { setMoreSidebarOpen } from '@/redux/slices/global.slice';

// const MoreLinks = () => {
//   const isMoreSidebarOpen = useAppSelector(
//     (state) => state.global.isMoreSidebarOpen
//   );
//   const dispatch = useAppDispatch();
//   return (
//     <AnimatePresence>
//       <motion.div
//         animate={{ left: isMoreSidebarOpen ? '0%' : '-80%' }}
//         className='fixed bg-secondary top-[73px] w-[80%] h-full z-50 pl-[21px] pr-4 pt-4 pb-10'
//         initial={{ left: '-80%' }}
//       >
//         <X
//           className='ml-auto w-[18px] h-auto text-white'
//           onClick={() => dispatch(setMoreSidebarOpen(false))}
//           role='button'
//         />
//         <NavItem
//           className='flex-row gap-x-4 mt-4'
//           label='Networks'
//           link='networks'
//           textClass='text-sm mt-0'
//         >
//           <NetworksIcon className={cn(iconBaseClass, 'w-[19px]')} />
//         </NavItem>
//         <NavItem
//           className='flex-row gap-x-4 mt-7'
//           label='Tokens'
//           link='tokens'
//           textClass='text-sm mt-0'
//         >
//           <TokenIcon className={cn(iconBaseClass, 'w-[17px]')} />
//         </NavItem>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default MoreLinks;
