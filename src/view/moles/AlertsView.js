import Box from "@mui/material/Box";
import EntDetails from "./EntDetails";
import DownloadableContent from "./DownloadableContent";

export default function AlertsView({ downloadRef, selectedEnt, setTitle }) {
  const getFileName = () => {
    return `${selectedEnt.id}.png`;
  };

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        marginTop: "56px",
        zIndex: 200,
        overflow: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <DownloadableContent
        ref={downloadRef}
        getFileName={getFileName}
        selectedItem={selectedEnt}
      >
        <Box>
          <EntDetails ent={selectedEnt} setTitle={setTitle} />
        </Box>
      </DownloadableContent>
    </Box>
  );
}
