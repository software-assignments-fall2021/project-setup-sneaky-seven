import React from "react";
import { iconNameToComponent } from "../utils";
import { FaMoneyBillWave } from "react-icons/fa";

export default function CategoryIcon({
  icon,
  size = 64,
  color = "black",
  borderColor = "black",
  name,
}) {
  const Icon = iconNameToComponent[icon] ?? FaMoneyBillWave;
  return (
    <div>
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
        <Icon color={color} size={~~(size * 0.8)} />
      </div>
      <p
        style={{
          width: `${size}px`,
          fontSize: `15px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          wordBreak: "break-all",
        }}
      >
        {" "}
        {name}{" "}
      </p>
    </div>
  );
}
