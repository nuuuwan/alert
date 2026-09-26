import { useEffect, useRef, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import Nominatim from "../../nonview/core/third_party/Nominatim";
import LatLng from "../../nonview/base/geos/LatLng";
import { useSelectedEntDataContext } from "../../nonview/core/SelectedEntDataContext";

const SEARCH_DELAY_MS = 350;
const MIN_QUERY_LENGTH = 3;

export default function PlaceSearch({ setPageMode }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setSelectedEnt } = useSelectedEntDataContext();
  const containerRef = useRef(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      L.DomEvent.disableClickPropagation(containerRef.current);
      L.DomEvent.disableScrollPropagation(containerRef.current);
    }
  }, []);

  useEffect(() => {
    const query = inputValue.trim();
    if (query.length < MIN_QUERY_LENGTH) {
      setOptions([]);
      setHasSearched(false);
      setError(false);
      return undefined;
    }

    let active = true;
    const timeoutId = window.setTimeout(async () => {
      setLoading(true);
      setError(false);
      try {
        const results = await Nominatim.search(query);
        if (active) {
          setOptions(results || []);
          setHasSearched(true);
        }
      } catch (searchError) {
        if (active) {
          setOptions([]);
          setError(true);
          setHasSearched(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    }, SEARCH_DELAY_MS);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [inputValue]);

  const handleChange = (event, value) => {
    if (!value) return;
    const latLng = LatLng.fromRaw([Number(value.lat), Number(value.lon)]);
    setSelectedEnt(null);
    navigate(`/Place/${latLng.id}`);
    setPageMode("Alerts");
  };

  const helperText = error
    ? t("Place search is unavailable. Please try again.")
    : hasSearched && !loading && options.length === 0
      ? t("No places found. Try a nearby town or landmark.")
      : " ";

  return (
    <Paper
      ref={containerRef}
      elevation={4}
      sx={{
        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 1000,
        width: "min(390px, calc(100% - 88px))",
        p: 1.5,
        overflow: "visible",
      }}
    >
      <Typography
        component="label"
        variant="caption"
        fontWeight={800}
        color="text.secondary"
        sx={{ display: "block", px: 0.5, pb: 0.75 }}
      >
        {t("Find a location")}
      </Typography>
      <Autocomplete
        sx={{ width: "100%" }}
        options={options}
        loading={loading}
        filterOptions={(values) => values}
        inputValue={inputValue}
        onInputChange={(event, value) => setInputValue(value)}
        onChange={handleChange}
        getOptionLabel={(option) => option.display_name || ""}
        isOptionEqualToValue={(option, value) =>
          option.place_id === value.place_id
        }
        noOptionsText={t("No places found")}
        loadingText={t("Searching places")}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={t("Town, village, or landmark")}
            size="small"
            error={error}
            helperText={helperText}
            inputProps={{
              ...params.inputProps,
              "aria-label": t("Find a location"),
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {loading && <CircularProgress size={18} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.place_id}>
            <Typography variant="body2">{option.display_name}</Typography>
          </Box>
        )}
      />
    </Paper>
  );
}
