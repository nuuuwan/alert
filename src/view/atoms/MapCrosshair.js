import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

export default function MapCrosshair() {
  const size = 68;
  const color = "black";
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
        opacity: 0.25,
      }}
    >
      <LocationSearchingIcon sx={{ width, height, color }} />
    </div>
  );
}
