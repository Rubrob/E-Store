import React from "react";
import ExpandedPanel from "components/ExpandedPanel";

const FilterBlock = ({ globalFilter, currentFilter, label, renderItem, ...props }) => {
  const renderItems = () => {
    return currentFilter.map(item => {
      const active =
        typeof globalFilter === "object" && globalFilter.length
          ? globalFilter.indexOf(item) > -1
          : globalFilter === item;

      return renderItem({ item, active });
    });
  };

  return (
    <div className="FilterBlock">
      <ExpandedPanel title={label} defaultExpanded>
        <div className={props.containerClass}>{renderItems()}</div>
      </ExpandedPanel>
    </div>
  );
};

export default FilterBlock;
