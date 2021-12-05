import React from "react";
import { iconNameToComponent } from "../utils";
import { FaMoneyBillWave } from "react-icons/fa";

export default function CategoryIcon({
  icon,
  size = 10,
  color = "black",
  borderColor = "black",
}) {
  const Icon = iconNameToComponent[icon] ?? FaMoneyBillWave;
  return (
    <div
      style={{
        borderRadius: "50%",
        width: `${size}vh`,
        height: `${size}vh`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid " + borderColor,
        overflow: "hidden",
      }}
    >
      <Icon color={color} size={size * 5} overflow="hidden" />
    </div>
  );
}
