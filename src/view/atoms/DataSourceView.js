import DataMeta from "./DataMeta";

export default function DataSourceView({
  dataSourceList,
  timeUt,
  experimental,
  official,
}) {
  if (!dataSourceList || dataSourceList.length === 0) {
    return null;
  }
  return (
    <DataMeta
      dataSourceList={dataSourceList}
      timeUt={timeUt}
      experimental={experimental}
      official={official}
    />
  );
}
