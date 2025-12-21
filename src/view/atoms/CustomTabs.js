import { Button, Divider, Typography } from "@mui/material";
import { COLORS } from "../_cons/StyleConstants";
import { useState } from "react";
import CustomPaper from "./CustomPaper";

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
    <CustomPaper>
      {tabKeys.map(function (tabKey, iTab) {
        const color = tabToColor
          ? tabToColor[tabKey] || COLORS.neutral
          : COLORS.neutral;
        const opacity = tabKey === selectedTabKey ? 1.0 : 0.33;

        return (
          <Button
            key={iTab}
            onClick={() => handleChange(tabKey)}
            sx={{
              color,
              m: 0.25,
              p: 0.25,
              opacity,
            }}
          >
            {renderButtonInner(tabKey, color)}
          </Button>
        );
      })}
      {selectedChild}
    </CustomPaper>
  );
}
