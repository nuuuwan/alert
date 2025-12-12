import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { COLORS } from "../_cons/StyleConstants";

export default function MapCrosshair() {
  const size = 80;
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
        zIndex: 1000,
      }}
    >
      <LocationSearchingIcon sx={{ width, height, color }} />
    </div>
  );
}
