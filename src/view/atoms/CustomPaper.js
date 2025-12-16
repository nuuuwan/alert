import Paper from "@mui/material/Paper";

export default function CustomPaper({ children, sx }) {
  return (
    <Paper
      elevation={10}
      sx={Object.assign(
        {
          background: "white",
          borderRadius: 2,
          m: 2,
          p: 2,
          opacity: 0.9,
          maxWidth: "90vw",
        },
        sx
      )}
    >
      {children}
    </Paper>
  );
}
