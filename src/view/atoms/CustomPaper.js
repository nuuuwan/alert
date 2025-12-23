import Paper from "@mui/material/Paper";

export default function CustomPaper({ children, sx }) {
  return (
    <Paper
      elevation={3}
      sx={Object.assign(
        {
          background: "rgba(255,2555,255, 0.9)",
          borderRadius: 2,
          minWidth: "fit-content",
          maxWidth: "calc(100vw - 2em)",
          margin: "1em",
          p: 2,
        },
        sx,
      )}
    >
      {children}
    </Paper>
  );
}
