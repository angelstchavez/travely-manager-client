import CollectionItem from "@/components/utils/icons/collection-item";
import Stats from "@/components/utils/stats";
import React from "react";

function page() {
  return (
    <>
      <CollectionItem
        largeImageSrc={"https://i.imgur.com/IODBNjK.png"}
        smallImageSrc={"https://i.imgur.com/IODBNjK.png"}
        title={"Travely Manager"}
      />
      <Stats></Stats>
    </>
  );
}

export default page;
