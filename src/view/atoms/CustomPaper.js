import Paper from "@mui/material/Paper";
import { COLORS } from "../_cons/StyleConstants";

export default function CustomPaper({ children, sx }) {
  return (
    <Paper
      sx={Object.assign(
        {
          background: COLORS.neutralLightest,
          borderRadius: 2,
          m: 2,
          p: 2,
          width: "fit-content",
        },
        sx
      )}
    >
      {children}
    </Paper>
  );
}
