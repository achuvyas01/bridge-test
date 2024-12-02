import { cn } from '@/lib/utils';
import { RoundedImgProps } from '@/types/global';
import Image from 'next/image';
import React from 'react';

const RoundedImg: React.FC<RoundedImgProps> = ({
  src,
  alt,
  className,
  quality,
  imgClassName,
}) => {
  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden w-[38px] h-[38px]',
        className
      )}
    >
      {src && (
        <Image
          alt={alt || 'img'}
          className={cn('object-cover', imgClassName)}
          fill
          quality={quality || 75}
          src={src}
        />
      )}
    </div>
  );
};

export default RoundedImg;
