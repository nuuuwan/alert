import IconButton from "@mui/material/IconButton";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { COLORS } from "../_cons/StyleConstants";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useEffect, useRef } from "react";
import L from "leaflet";

export default function CurrentLocationButton() {
  const navigate = useNavigate();

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      L.DomEvent.disableClickPropagation(ref.current);
    }
  }, []);

  const onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate("/");
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "16px",
        right: "0px",
        zIndex: 2000,
        margin: "16px",
      }}
      ref={ref}
    >
      <IconButton
        onClick={onClick}
        sx={{
          backgroundColor: COLORS.neutralLightest,
          "&:hover": {
            backgroundColor: COLORS.neutralLight,
          },
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        <MyLocationIcon />
      </IconButton>
    </Box>
  );
}
