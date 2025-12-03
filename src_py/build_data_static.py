import os

from utils import JSONFile, Log

log = Log("build_data_static")
DIR_DATA_STATIC = os.path.join("public", "data", "static")


def places_check_very_close():
    places = JSONFile(os.path.join(DIR_DATA_STATIC, "places.json")).read()
    n = len(places)
    for i1 in range(n - 1):
        for i2 in range(i1 + 1, n):
            p1 = places[i1]
            p2 = places[i2]
            dLat2 = (p1["lat_lng"][0] - p2["lat_lng"][0]) ** 2
            dLng2 = (p1["lat_lng"][1] - p2["lat_lng"][1]) ** 2
            dist = (dLat2 + dLng2) ** 0.5
            if dist < 0.01:
                log.warning(f"Places very close: {p1} and {p2} (dist={dist})")


def build(intput_file_id, output_file_id, func_mapper):
    input_json_file = JSONFile(
        os.path.join(DIR_DATA_STATIC, f"{intput_file_id}.json")
    )
    input_d_list = input_json_file.read()
    log.debug(f"Read {len(input_d_list):,} items from {input_json_file}")

    output_d_list = [func_mapper(d) for d in input_d_list]
    output_d_list.sort(key=lambda d: d["id"])
    output_json_file = JSONFile(
        os.path.join(DIR_DATA_STATIC, f"{output_file_id}.json")
    )
    output_json_file.write(output_d_list)
    log.info(f"Wrote {len(output_d_list):,} items to {output_json_file}")


def merge(file_id1, file_id2, file_id_merged):
    json_file1 = JSONFile(os.path.join(DIR_DATA_STATIC, f"{file_id1}.json"))
    d_list1 = json_file1.read()
    log.debug(f"Read {len(d_list1):,} items from {json_file1}")

    json_file2 = JSONFile(os.path.join(DIR_DATA_STATIC, f"{file_id2}.json"))
    d_list2 = json_file2.read()
    log.debug(f"Read {len(d_list2):,} items from {json_file2}")

    d_map = {d["id"]: d for d in d_list1}
    for d in d_list2:
        d_map[d["id"]] = d

    merged_d_list = list(d_map.values())
    merged_d_list.sort(key=lambda d: d["id"])
    output_json_file = JSONFile(
        os.path.join(DIR_DATA_STATIC, f"{file_id_merged}.json")
    )
    output_json_file.write(merged_d_list)
    log.info(f"Wrote {len(merged_d_list):,} items to {output_json_file}")


if __name__ == "__main__":
    build(
        "_old_stations",
        "gauging_stations",
        lambda d: {
            "id": d["name"],
            "river_name": d["river_name"],
            "alert_level_m": d["alert_level_m"],
            "minor_flood_level_m": d["minor_flood_level_m"],
            "major_flood_level_m": d["major_flood_level_m"],
        },
    )

    build(
        "_old_locations",
        "_places_from_old_locations",
        lambda d: {
            "id": d["name"],
            "name": d["name"],
            "lat_lng": d["lat_lng"],
        },
    )

    build(
        "_old_stations",
        "_places_from_old_stations",
        lambda d: {
            "id": d["name"],
            "name": d["name"],
            "lat_lng": d["lat_lng"],
        },
    )

    merge(
        "_places_from_old_locations",
        "_places_from_old_stations",
        "places",
    )

    places_check_very_close()
