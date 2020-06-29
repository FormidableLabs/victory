/* eslint-disable react/no-multi-comp */
import React, { useLayoutEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import clamp from "lodash/clamp";
import styled from "styled-components";

const BAR_HEIGHT = 8;
const LIGHT_GREY = "hsl(355, 32%, 87%)";
const GREY = "hsl(355, 10%, 60%)";

const isTouchEvent = event => {
  return event.touches !== undefined;
};

const Container = styled.div`
  width: 100%;
  cursor: pointer;
  user-drag: none;
  user-select: none;
  height: 7px;
  padding: 40px 0;
  position: relative;
`;

const UnfilledBar = styled.div`
  position: absolute;
  height: ${BAR_HEIGHT}px;
  width: 100%;
  margin-top: 10px;
  background-color: ${GREY};
  border-radius: 6px;
`;

const ColoredBar = styled.div.attrs(({ percentage }) => ({
  style: {
    transform: `scaleX(${percentage})`
  }
}))`
  position: absolute;
  height: ${BAR_HEIGHT}px;
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
  transform-origin: 0 0;
  background-color: ${({ color }) => color};
  border-radius: 6px;
  transition: transform 0.45s ease-out;
`;

const CircleTransitionContainer = styled.div.attrs(({ value }) => ({
  style: {
    transform: `translateX(${value}%)`
  }
}))`
  width: 100%;
  height: ${BAR_HEIGHT}px;
  position: relative;
  margin-top: 1px;
`;

const Circle = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  height: 25px;
  width: 25px;
  cursor: ${({ dragging }) => (dragging ? "grabbing" : "grab")};
  border-radius: 50%;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-color: ${({ color }) => color};
  user-select: none;
  z-index: 10;
  transform: translate(-50%, -50%);

  a & {
    height: 20px;
    width: 20px;
  }
`;

const BiggerCircle = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  height: 42px;
  width: 42px;
  border-radius: 50%;
  cursor: ${({ dragging }) => (dragging ? "grabbing" : "grab")};
  background-color: ${LIGHT_GREY};
  opacity: ${({ dragging }) => (dragging ? 0.3 : 0)};
  z-index: 9;
  transform: translate(-50%, -50%);
  transition: opacity 0.25s ease-out;
  :hover,
  ${Circle}:hover + & {
    opacity: ${({ dragging }) => (dragging ? 0.3 : 0.2)};
  }

  a & {
    height: 36px;
    width: 36px;
  }
`;

const TooltipContainer = styled(CircleTransitionContainer)``;

const Tooltip = styled.div`
  position: absolute;
  left: 0;
  bottom: 100%;
  display: flex;
  justify-content: center;
  background: ${({ color }) => color};
  color: #fff;
  text-align: center;
  padding: 10px;
  pointer-events: none;
  z-index: 100;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
  transition: transform 0.3s ease-out;
  transform: ${({ dragging }) =>
    `translate(-50%, ${dragging ? "-36px" : "-25px"})`};
  border-radius: 3px;
  font-weight: bold;
  font-size: 16px;

  a & {
    padding: 6px;
    font-size: 12px;
  }
`;

const Triangle = styled.div`
  position: absolute;
  left: 0;
  border-left: solid transparent 14px;
  border-right: solid transparent 14px;
  border-top: solid ${({ color }) => color} 14px;
  transform: ${({ dragging }) =>
    `translate(-50%, ${dragging ? "-36px" : "-25px"})`};
  transition: color 0.3s ease-out, transform 0.3s ease-out;
`;

const Notch = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ value }) => `${value}%`};
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: ${({ active, color }) => (active ? color : LIGHT_GREY)};
  margin-top: 14px;
  transform: translate(-50%, -50%);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: background-color 0.45s ease-out;

  a & {
    display: none;
  }
`;

const Slider = ({ tooltipValues, color, value, maxValue, onChange }) => {
  const [dragging, setDragging] = useState(false);
  const [percentage, setPercentage] = useState(value / maxValue);
  const containerRef = useRef();

  const handleDrag = useCallback(
    ev => {
      if (dragging) {
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
    [dragging, maxValue, onChange, percentage]
  );

  const handleDragDone = useCallback(() => {
    setDragging(false);
    onChange(percentage * maxValue);
  }, [maxValue, onChange, percentage]);

  const handleDragStart = ev => {
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
    <Container
      ref={containerRef}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      <UnfilledBar />
      <ColoredBar percentage={percentage} color={color} />

      {tooltipValues.map((tooltip, index) => {
        const tooltipPercentage = index / (tooltipValues.length - 1);

        return (
          <Notch
            key={index}
            value={tooltipPercentage * 100}
            color={color}
            active={tooltipPercentage <= percentage}
          />
        );
      })}

      <TooltipContainer value={percentage * 100}>
        <Tooltip dragging={dragging} color={color}>
          {getTooltipText()}
        </Tooltip>
        <Triangle dragging={dragging} color={color} />
      </TooltipContainer>

      <CircleTransitionContainer value={percentage * 100}>
        <Circle
          dragging={dragging}
          color={color}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        />
        <BiggerCircle
          dragging={dragging}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        />
      </CircleTransitionContainer>
    </Container>
  );
};

Slider.propTypes = {
  color: PropTypes.string.isRequired,
  maxValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  tooltipValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.number.isRequired
};

export default Slider;
