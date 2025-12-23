import { Badge, Button, Typography } from "@mui/material";
import { COLORS } from "../_cons/StyleConstants";
import { useState } from "react";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

export default function CustomTabs({
  tabToChild,
  tabToColor,
  tabToNAlerts,
  renderButtonInner = (text, color) => (
    <Typography variant="title1" style={{ color }}>
      {text}
    </Typography>
  ),
}) {
  const { t } = useTranslation();
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
        const tabColor = tabToColor
          ? tabToColor[tabKey] || COLORS.neutral
          : COLORS.neutral;
        const isSelected = tabKey === selectedTabKey;
        const opacity = tabColor ? 1.0 : 0.22;
        const color = isSelected ? "white" : tabColor;
        const backgroundColor = isSelected ? tabColor : "white";
        const nAlerts = tabToNAlerts ? tabToNAlerts[tabKey] : 0;
        return (
          <Badge
            key={iTab}
            badgeContent={nAlerts}
            slotProps={{
              badge: {
                sx: {
                  backgroundColor: tabColor,
                  color: "white",
                },
              },
            }}
          >
            <Button
              onClick={() => handleChange(tabKey)}
              sx={{
                color,
                backgroundColor,
                m: 0.25,
                ml: 1,
                mb: 1,
                p: 0.5,
                opacity,
              }}
            >
              {renderButtonInner(t(tabKey), color)}
            </Button>
          </Badge>
        );
      })}

      {selectedChild}
    </Box>
  );
}
