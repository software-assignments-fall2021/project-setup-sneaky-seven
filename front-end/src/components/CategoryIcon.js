import React from "react";
import { FaUtensils, FaMoneyBillAlt, FaShoppingCart } from "react-icons/fa";

const textToIcon = {
  food: FaUtensils,
  shopping: FaShoppingCart,
};

export default function CategoryIcon({ text, size = 64, color = "black" }) {
  const Icon = textToIcon[text] ?? FaMoneyBillAlt;

  return (
    <div
      style={{
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "4px solid black",
      }}
    >
      <Icon color={color} size={~~(size * 0.6)} />
    </div>
  );
}
