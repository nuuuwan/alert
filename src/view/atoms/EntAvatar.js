import Avatar from "@mui/material/Avatar";
import EntIcon from "./EntIcon";
import { COLORS } from "../_cons/StyleConstants";

export default function EntAvatar({
  ent,
  size = 24,
  iconSize = 18,
  bgcolor = COLORS.neutralLighter,
}) {
  return (
    <Avatar sx={{ width: size, height: size, bgcolor }}>
      <EntIcon ent={ent} size={`${iconSize}px`} />
    </Avatar>
  );
}
