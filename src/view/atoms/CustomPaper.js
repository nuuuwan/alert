import Paper from "@mui/material/Paper";

export default function CustomPaper({ children, sx }) {
  return (
    <Paper
      elevation={0}
      sx={Object.assign(
        {
          background: "rgba(224, 224, 224, 0.25)",
          borderRadius: 2,
          m: 2,
          p: 2,
          opacity: 0.9,
          width: "fit-content",
          maxWidth: "90vw",
        },
        sx
      )}
    >
      {children}
    </Paper>
  );
}
