import { Search } from 'lucide-react';
import React from 'react';
import { Input } from '../ui/input';
import { SearchInputProps } from '@/types/global';

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className='relative flex items-center w-full bg-background rounded-[10px]'>
      <Search className='w-[19px] h-auto text-white opacity-50 absolute left-4 focus-visible:ring-offset-0 focus-visible:outline-none border-none' />
      <Input
        className='pl-11 pr-3 py-1 bg-transparent'
        onChange={onChange}
        placeholder='Search'
        type='text'
        value={value}
      />
    </div>
  );
};

export default SearchInput;
