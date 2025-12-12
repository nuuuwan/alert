import PlaceIcon from "@mui/icons-material/Place";
import { COLORS } from "../_cons/StyleConstants";

export default function MapCrosshair() {
  const size = 68;
  const color = COLORS.neutral;
  const width = `${size}px`;
  const height = width;
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width,
        height,
        // pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 500,
      }}
    >
      <PlaceIcon sx={{ width, height, color }} />
    </div>
  );
}
