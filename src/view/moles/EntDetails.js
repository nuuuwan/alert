import DetailsHeader from "./DetailsHeader";
import LocationIcon from "../atoms/icons/LocationIcon";

export default function EntDetails({ ent }) {
  if (!ent) {
    return null;
  }

  const entColor = "black";
  const isStale = false;
  const Icon = LocationIcon;

  return (
    <DetailsHeader
      overlineText={ent.supertitle}
      title={ent.title}
      subtitle={ent.subtitle}
      titleColor={entColor}
      Icon={Icon}
      iconColor={entColor}
      isStale={isStale}
    />
  );
}
