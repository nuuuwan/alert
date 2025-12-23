export const MIN_LAT = 5.9186;
export const MAX_LAT = 9.8352;
export const MIN_LNG = 79.6954;
export const MAX_LNG = 81.8815;

export const MIN_LAT_LNG = [MIN_LAT, MIN_LNG];
export const MAX_LAT_LNG = [MAX_LAT, MAX_LNG];

export const DEFAULT_CENTER = [
  (MIN_LAT + MAX_LAT) / 2,
  (MIN_LNG + MAX_LNG) / 2,
];
export const DEFAULT_ZOOM = 8;

const MapConstants = {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
};

export default MapConstants;
