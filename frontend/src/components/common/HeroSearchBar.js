import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const HeroSearchBar = ({ colorMode = "light" }) => {
  const navigate = useNavigate();
  const isLight = colorMode === "light";
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "transparent",
        border: isLight ? "1.5px solid #fff" : "1.5px solid #181818",
        borderRadius: 2.5,
        px: 2,
        py: 1,
        boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
        width: 260,
        height: 40,
        width: { xs: "100%", md: 260 },
        height: { xs: 40, md: 40 },
      }}
    >
      <svg
        width="24"
        height="24"
        fill="none"
        stroke={isLight ? "#fff" : "#181818"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: 8, opacity: 0.85 }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder='Search "shirts"'
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: isLight ? "#fff" : "#181818",
          fontSize: "1.08rem",
          width: "100%",
          fontWeight: 400,
          letterSpacing: "0.01em",
        }}
        onFocus={() => navigate("/products")}
        onClick={() => navigate("/products")}
        readOnly
      />
    </Box>
  );
};

export default HeroSearchBar;
