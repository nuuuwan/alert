import { Box, Button, Typography } from "@mui/material";
import { COLORS } from "../_cons/StyleConstants";
import { useState } from "react";

export default function CustomTabs({
  tabToChild,
  tabToColor,
  renderButtonInner = (text, color) => (
    <Typography variant="title1" style={{ color }}>
      {text}
    </Typography>
  ),
}) {
  const tabKeys = Object.keys(tabToChild);
  if (tabKeys.length === 0) {
    throw new Error("CustomTabs requires at least one tab.");
  }
  const [selectedTabKey, setSelectedTabKey] = useState(tabKeys[0]);

  const handleChange = (newSelectedTabKey) => {
    setSelectedTabKey(newSelectedTabKey);
  };

  const selectedChildGenerator = tabToChild[selectedTabKey];
  const selectedChild = selectedChildGenerator();

  return (
    <Box>
      {tabKeys.map(function (tabKey, iTab) {
        const color = tabToColor ? tabToColor[tabKey] : COLORS.neutral;
        const textDecoration =
          tabKey === selectedTabKey ? "underline" : "none ";

        return (
          <Button
            key={iTab}
            onClick={() => handleChange(tabKey)}
            sx={{
              color,
              textDecoration,
              textDecorationThickness: "2px",
              textDecorationSkipInk: "none",
              textUnderlineOffset: "4px",
              m: 1,
              p: 1,
            }}
          >
            {renderButtonInner(tabKey, color)}
          </Button>
        );
      })}
      {selectedChild}
    </Box>
  );
}
