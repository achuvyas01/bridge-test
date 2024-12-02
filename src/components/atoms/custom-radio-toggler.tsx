'use client';
import { cn } from '@/lib/utils';
import { CustomRadioTogglerProps, SendOption } from '@/types/global';
import React, { useState, useEffect, useRef } from 'react';

const CustomRadioToggler: React.FC<CustomRadioTogglerProps> = ({
  uniqueName,
  options,
  selectedOption,
  onSelectOption,
  className,
}) => {
  const [spanStyle, setSpanStyle] = useState({ width: 0, left: 0 });

  const labelsRef = useRef<(HTMLLabelElement | null)[]>([]);

  useEffect(() => {
    const selectedIndex = options.findIndex(
      (option) => option.id === selectedOption.id
    );
    const selectedLabel = labelsRef.current[selectedIndex];
    if (selectedLabel) {
      setSpanStyle({
        width: selectedLabel.offsetWidth,
        left: selectedLabel.offsetLeft,
      });
    }
  }, [selectedOption, options]);

  const handleOptionChange = (option: SendOption) => {
    onSelectOption(option);
  };

  return (
    <div
      className={cn(
        'relative z-10 flex items-center gap-1 rounded-[5px] p-1 bg-accent',
        className
      )}
    >
      <span
        className='absolute top-1 -z-10 h-8 rounded-[4px] bg-primary duration-200'
        style={spanStyle}
      />
      {options.map((option, index) => (
        <label
          className={cn(
            'inline-flex h-8 items-center justify-center hover:bg-white/5 px-3 text-xs font-medium duration-200 cursor-pointer rounded-[4px]',
            { 'font-bold': selectedOption.id === option.id }
          )}
          key={option.id}
          ref={(el) => {
            labelsRef.current[index] = el;
          }}
        >
          <input
            checked={selectedOption.id === option.id}
            className='sr-only'
            name={uniqueName}
            onChange={() => handleOptionChange(option)}
            type='radio'
            value={option.id}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CustomRadioToggler;
