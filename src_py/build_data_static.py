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


def build_places_from_place_to_lat_lng():
    place_to_lat_lng = JSONFile(
        os.path.join(DIR_DATA_STATIC, "_place_to_latlng.json")
    ).read()
    places_from_place_to_latlng = []
    for place, lat_lng in place_to_lat_lng.items():
        if "(" in place:
            continue
        places_from_place_to_latlng.append(
            dict(
                id=place,
                name=place,
                lat_lng=lat_lng,
            )
        )

    places_validate = JSONFile(
        os.path.join(DIR_DATA_STATIC, "_places_validated.json")
    ).read()

    places = places_from_place_to_latlng + places_validate

    places = list({place["id"]: place for place in places}.values())
    places.sort(key=lambda x: x["id"])

    json_file = JSONFile(os.path.join(DIR_DATA_STATIC, "places.json"))
    json_file.write(places)
    log.info(f"Wrote {len(places):,} places to {json_file}")


if __name__ == "__main__":
    build_places_from_place_to_lat_lng()
    places_check_very_close()
