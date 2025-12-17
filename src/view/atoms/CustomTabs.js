import Tabs from "@mui/material/Tabs";

export default function CustomTabs({ value, onChange, children }) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      aria-label="scrollable force tabs example"
    >
      {children}
    </Tabs>
  );
}
