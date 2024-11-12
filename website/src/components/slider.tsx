/* eslint no-magic-numbers: ["error", { "ignore": [0, 1, 100] }]*/

import React, { useLayoutEffect, useState, useRef, useCallback } from "react";
import clamp from "lodash/clamp";

const LIGHT_GREY = "hsl(355, 32%, 87%)";

const isTouchEvent = (event) => {
  return event.touches !== undefined;
};

const Slider = ({ tooltipValues, color, value, maxValue, onChange }) => {
  const [dragging, setDragging] = useState(false);
  const [percentage, setPercentage] = useState(value / maxValue);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = useCallback(
    (ev) => {
      if (dragging && containerRef.current) {
        const left = containerRef.current.getBoundingClientRect().left;
        const sliderWidth = containerRef.current.clientWidth;
        const location = isTouchEvent(ev)
          ? ev.touches[0].clientX - left
          : ev.clientX - left;

        const newPercentage = clamp(location / sliderWidth, 0, 1);

        window.requestAnimationFrame(() => {
          setPercentage(newPercentage);
          onChange(percentage * maxValue);
        });
      }
    },
    [dragging, maxValue, onChange, percentage],
  );

  const handleDragDone = useCallback(() => {
    setDragging(false);
    onChange(percentage * maxValue);
  }, [maxValue, onChange, percentage]);

  const handleDragStart = (ev) => {
    if (!containerRef.current) {
      return;
    }
    const left = containerRef.current.getBoundingClientRect().left;
    const sliderWidth = containerRef.current.clientWidth;
    const location = isTouchEvent(ev)
      ? ev.touches[0].clientX - left
      : ev.clientX - left;

    const newPercentage = location / sliderWidth;

    setPercentage(newPercentage);
    setDragging(true);
  };

  const getTooltipText = () => {
    const length = tooltipValues.length;

    const index = Math.round((length - 1) * percentage);

    return tooltipValues[index];
  };

  useLayoutEffect(() => {
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("touchmove", handleDrag);
    window.addEventListener("touchend", handleDragDone);
    window.addEventListener("mouseup", handleDragDone);

    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("touchmove", handleDrag);
      window.removeEventListener("touchend", handleDragDone);
      window.removeEventListener("mouseup", handleDragDone);
    };
  }, [handleDrag, handleDragDone]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      className="w-full cursor-pointer select-none h-2 relative py-10"
      draggable="false"
    >
      <div className="absolute h-2 w-full mt-2 rounded-md bg-[#A38F91]" />
      <div
        style={{
          transform: `scaleX(${percentage})`,
          backgroundColor: color,
          transition: "transform 0.45s ease-out",
        }}
        className="absolute h-2 w-full mt-2 cursor-pointer rounded-md origin-top-left"
      />

      {tooltipValues.map((tooltip, index) => {
        const tooltipPercentage = index / (tooltipValues.length - 1);

        return (
          <div
            key={index}
            className="absolute top-2/4 h-[12px] w-[12px] rounded-[50%] mt-[14px] -translate-x-1/2 -translate-y-1/2 [box-shadow:0_10px_20px_rgba(0,_0,_0,_0.19),_0_6px_6px_rgba(0,_0,_0,_0.23)] [transition:background-color_0.45s_ease-out]"
            style={{
              backgroundColor:
                tooltipPercentage <= percentage ? color : LIGHT_GREY,
              left: `${tooltipPercentage * 100}%`,
            }}
          />
        );
      })}

      <div
        style={{
          transform: `translateX(${percentage * 100}%)`,
        }}
        className="w-full h-[8px] relative mt-px"
      >
        <div
          style={{
            background: color,
            transform: `translate(-50%, ${dragging ? "-36px" : "-25px"})`,
          }}
          className="absolute left-[0] bottom-full flex justify-center text-[#fff] text-center p-[10px] pointer-events-none [box-shadow:2px_2px_6px_rgba(0,_0,_0,_0.28)] [transition:transform_0.3s_ease-out] rounded-[3px] font-bold text-[16px]"
        >
          {getTooltipText()}
        </div>
        <div
          style={{
            transform: `translate(-50%, ${dragging ? "-36px" : "-25px"})`,
            borderTop: `solid ${color} 14px`,
          }}
          className="absolute left-[0] border-solid border-[14px] border-l-[transparent] border-r-[transparent] [transition:color_0.3s_ease-out,_transform_0.3s_ease-out]"
        />
      </div>

      <div
        style={{
          transform: `translateX(${percentage * 100}%)`,
        }}
        className="w-full h-[8px] relative mt-px"
      >
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className="peer absolute left-[0] top-2/4 h-[25px] w-[25px] rounded-[50%] [box-shadow:0_14px_28px_rgba(0,_0,_0,_0.25),_0_10px_10px_rgba(0,_0,_0,_0.22)] select-none z-10 -translate-x-1/2 -translate-y-1/2"
          style={{
            cursor: dragging ? "grabbing" : "grab",
            backgroundColor: color,
          }}
        />
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          style={{
            backgroundColor: "hsl(355, 32%, 87%)",
            cursor: dragging ? "grabbing" : "grab",
          }}
          className="opacity-0 peer-hover:opacity-30 hover:opacity-30 bigger-circle absolute left-[0] top-2/4 h-[42px] w-[42px] rounded-[50%] -translate-x-1/2 -translate-y-1/2 [transition:opacity_0.25s_ease-out] z-[9]"
        />
      </div>
    </div>
  );
};

export default Slider;
