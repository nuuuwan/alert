export default function LoadingView({ isLoaded, children }) {
  if (!isLoaded) {
    return "Loading...";
  }
  return children;
}
