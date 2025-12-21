import Paper from "@mui/material/Paper";

export default function CustomPaper({ children, sx }) {
  return (
    <Paper
      elevation={5}
      sx={Object.assign(
        {
          background: "rgba(255,2555,255, 0.9)",
          borderRadius: 2,
          m: 1,
          p: 1,
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
