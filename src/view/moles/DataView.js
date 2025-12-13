import Box from "@mui/material/Box";
import EntDetails from "./EntDetails";
import DownloadableContent from "./DownloadableContent";

export default function DataView({ downloadRef, selectedEnt, setTitle }) {
  const getFileName = () => {
    return `${selectedEnt.id}.png`;
  };

  return (
    <Box
      sx={{
        marginTop: "54px",
        overflow: "auto",
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
