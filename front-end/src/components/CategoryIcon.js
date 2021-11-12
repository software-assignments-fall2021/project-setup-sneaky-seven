import React from "react";
import { iconNameToComponent } from '../utils';
import { FaMoneyBillWave } from "react-icons/fa";

export default function CategoryIcon({
  icon,
  size = 64,
  color = "black",
  borderColor = "black",
}) {
  const Icon = iconNameToComponent[icon] ?? FaMoneyBillWave;

  return (
    <div
      style={{
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "4px solid " + borderColor,
      }}
    >
      <Icon color={color} size={~~(size * 0.6)} />
    </div>
  );
}
