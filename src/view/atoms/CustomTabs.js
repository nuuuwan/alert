import { Box, Button } from "@mui/material";
import { COLORS } from "../_cons/StyleConstants";
import { useState } from "react";

export default function CustomTabs({ tabToChild, tabToColor }) {
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
        const backgroundColor =
          tabKey === selectedTabKey ? COLORS.neutralLighter : "transparent";

        return (
          <Button
            key={iTab}
            onClick={() => handleChange(tabKey)}
            sx={{
              color,
              backgroundColor,
              m: 1,
              p: 1,
            }}
          >
            {tabKey}
          </Button>
        );
      })}
      {selectedChild}
    </Box>
  );
}
