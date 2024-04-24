/* eslint-disable @next/next/no-img-element */
import React from "react";

interface CollectionItemProps {
  largeImageSrc: string;
  smallImageSrc: string;
  title: string;
}

const CollectionItem: React.FC<CollectionItemProps> = ({
  largeImageSrc,
  smallImageSrc,
  title,
}) => {
  return (
    <div className="group relative">
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
        <img
          src={largeImageSrc}
          alt={title}
          className="hidden lg:block h-full w-full object-cover object-center"
        />
        <img
          src={smallImageSrc}
          alt={title}
          className="block lg:hidden h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default CollectionItem;
