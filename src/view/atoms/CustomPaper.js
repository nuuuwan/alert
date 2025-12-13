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
          width: "fit-content",
          opacity: 0.9,
        },
        sx,
      )}
    >
      {children}
    </Paper>
  );
}
