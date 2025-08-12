import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

export default function CaloriesRangeFilter({ selectedRange, onChange }) {
  return (
    <div className="mb-6">
      {/* Calories Range Filter */}
      <h3 className="font-semibold text-lg mb-3">Calories Range</h3>
      <Slider
        range
        min={0}
        max={500}
        step={10}
        value={selectedRange}
        onChange={onChange}
        handleRender={(node, props) => (
          <Tooltip
            overlay={`${props.value} cal`}
            placement="top"
            key={props.index}
          >
            {node}
          </Tooltip>
        )}
        trackStyle={[{ backgroundColor: "#16a34a" }]}
        handleStyle={[
          { borderColor: "#16a34a", backgroundColor: "#16a34a" },
          { borderColor: "#16a34a", backgroundColor: "#16a34a" }
        ]}
      />
      <div className="flex justify-between text-sm mt-2">
        <span>{selectedRange[0]} cal</span>
        <span>{selectedRange[1]} cal</span>
      </div>
    </div>
  );
}
