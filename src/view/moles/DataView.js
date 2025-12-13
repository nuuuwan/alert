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
        width: { xs: "100vw", md: "calc(100vw - 100vh)" },
        height: { xs: "auto", md: "100vh" },
        maxHeight: { xs: "100vh", md: "100vh" },
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
