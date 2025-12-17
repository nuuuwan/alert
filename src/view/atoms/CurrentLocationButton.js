import IconButton from "@mui/material/IconButton";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { COLORS } from "../_cons/StyleConstants";
import { useNavigate } from "react-router-dom";

export default function CurrentLocationButton() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };

  return (
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
  );
}
