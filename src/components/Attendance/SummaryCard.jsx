import React from "react";

function SummaryCard({ label, value, color, bgColor, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: bgColor || "#f5f5f5",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
        {label}
      </p>

      <h2 style={{ margin: "10px 0 0", color: color || "#000" }}>
        {value}
      </h2>
    </div>
  );
}

export default SummaryCard;
