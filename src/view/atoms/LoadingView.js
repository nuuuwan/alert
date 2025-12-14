import { CircularProgress } from "@mui/material";

export default function LoadingView({ isLoaded, children }) {
  if (isLoaded) {
    return children;
  }
  return <CircularProgress />;
}
