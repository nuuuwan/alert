import Paper from "@mui/material/Paper";

export default function CustomPaper({ children, sx }) {
  return (
    <Paper
      elevation={0}
      sx={Object.assign(
        {
          background: "rgba(224, 224, 224, 0.1)",
          borderRadius: 1,
          m: 0,
          p: 0,
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
