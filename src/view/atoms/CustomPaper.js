import Paper from "@mui/material/Paper";

export default function CustomPaper({ children, sx }) {
  return (
    <Paper
      elevation={3}
      sx={Object.assign(
        {
          background: "rgba(255, 255, 255, 0.96)",
          borderRadius: 2,
          minWidth: "fit-content",
          maxWidth: "calc(100vw - 2em)",
          margin: "1em",
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
        },
        sx,
      )}
    >
      {children}
    </Paper>
  );
}
