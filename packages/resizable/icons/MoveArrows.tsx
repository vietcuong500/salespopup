import React, { SVGProps } from 'react';

export const MoveArrows = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M18.364 8.465 16.95 9.879 18.071 11H13V5.928l1.122 1.122 1.414-1.414L12 2.101 8.464 5.636 9.878 7.05 11 5.928V11H5.929L7.05 9.879 5.636 8.465 2.1 12l3.536 3.535 1.414-1.414L5.929 13H11v5.072L9.878 16.95l-1.414 1.414L12 21.899l3.536-3.535-1.414-1.414L13 18.072V13h5.071l-1.121 1.121 1.414 1.414L21.9 12l-3.536-3.535z" />
    </svg>
  );
};