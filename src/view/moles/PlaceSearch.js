import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Nominatim from "../../nonview/core/third_party/Nominatim";
import LatLng from "../../nonview/base/geos/LatLng";

function PlaceSearch({ onPlaceSelect, latLng }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [initialTextValue, setInitialTextValue] = useState("");

  useEffect(() => {
    async function loadInitialPlace() {
      if (!latLng) {
        return;
      }
      const searchResult = await Nominatim.reverseGeocode(latLng);
      if (searchResult) {
        const placeName = searchResult.display_name;
        setInitialTextValue(placeName);
      }
    }
    loadInitialPlace();
  }, [latLng]);

  const handleInputChange = async (event, newInputValue) => {
    setInputValue(newInputValue);
    if (!newInputValue || newInputValue.trim().length <= 4) {
      return;
    }
    setLoading(true);
    try {
      const results = await Nominatim.search(newInputValue);
      setOptions(results || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event, newValue) => {
    if (newValue && onPlaceSelect) {
      onPlaceSelect(
        LatLng.fromRaw([parseFloat(newValue.lat), parseFloat(newValue.lon)]),
      );
    }
  };

  if (!initialTextValue) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 400 }}>
      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        options={options}
        loading={loading}
        loadingText="Searching places..."
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleChange}
        getOptionLabel={(option) => option.display_name || ""}
        isOptionEqualToValue={(option, value) =>
          option.place_id === value.place_id
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            size="small"
            placeholder={initialTextValue}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    fontSize="small"
                    sx={{ color: "text.secondary" }}
                  />
                </InputAdornment>
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
    </Box>
  );
}

export default PlaceSearch;
