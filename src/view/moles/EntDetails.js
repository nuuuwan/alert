import DetailsHeader from "./DetailsHeader";
import LocationIcon from "../atoms/icons/LocationIcon";

export default function EntDetails({ ent }) {
  if (!ent) {
    return null;
  }

  const entColor = "black";
  const isStale = false;
  const Icon = LocationIcon;
  const overlineText = "";
  const subtitle = "Entity";

  return (
    <DetailsHeader
      overlineText={overlineText}
      title={ent.title}
      titleColor={entColor}
      subtitle={subtitle}
      Icon={Icon}
      iconColor={entColor}
      isStale={isStale}
    />
  );
}
