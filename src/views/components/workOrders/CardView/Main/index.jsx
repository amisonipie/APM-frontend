import React from "react";
import WOProgress from "views/components/workOrders/WOProgress";

function MainContent({ item }) {
  return (
    <main className="cardView__main">
      <h2 className="cardView__main--subject"><span dangerouslySetInnerHTML={{ __html: item?.description }} /></h2>
      <div className="cardView__main--asset">
        <p className="cardView__main--asset-name">
          {item?.inventory?.equipment?.nameEnglish || "IQon Spectral CT"}
        </p>
        <p className="cardView__main--asset-assetId">{`Asset ID: ${item?.inventory?.inventoryId}`}</p>
      </div>
      <WOProgress item={item} />
    </main>
  );
}

export default MainContent;
