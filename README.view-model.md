# ALERT View Model

The View Model defines how the UI presents Ents, Alerts and Observations, and how user interactions operate on the map. It describes visible behaviour and layout rules, not business logic.

## 1. Map Behaviour

### Default State

- When there are no active Alerts, the map displays nothing.
- Places and Regions are not drawn unless they have an active Alert.
- Region boundaries are hidden by default.

### Display of Alerts

- Any Ent with an active Alert is shown on the map.
- Inactive Alerts are not shown, except via possible historical lookup (not in v1).
- Alert filters apply to both the map and EntView.
- Colour palette: red indicates severe, amber indicates moderate, green indicates safe.
- Icons represent Place types, Region types and Observation types where applicable.

### Map Interaction

- No hover behaviour.
- Selection persists through panning and zooming.
- Only one EntView may be open at a time.
- Clicking an alert marker or region opens its EntView.
- Clicking any arbitrary point opens the EntView for the Place at that coordinate. Every coordinate corresponds to a Place Ent.
- Regions of the same type never overlap, so there is no ambiguity.
- Nested regions and Places never conflict.

## 2. EntView Structure

The EntView opens when the user selects an Ent. Sections appear when data is available, and may collapse if space is limited.

### Header

- Name.
- Type (Place or Region).
- Coordinates for Places, or administrative code for Regions.

### Status Summary

- All active Alerts for the Ent.
- Sorted by severity, highest first.
- Includes colour and icon.

### Context

- Parent Region in the administrative hierarchy.
- Container Regions (e.g. GND within DSD, DSD within District).
- Nearby Places if applicable.
- A Place’s enclosing Region is always shown.

### Attributes

- Constant attributes in a consistent order.
- Standard formatting for numbers, units and labels.
- Examples: elevation, administrative codes, names.

### Observations

- Numeric time series (temperature, rainfall, river level):
  - Latest value, trend and time-series chart.
  - Time windows: last hour, 24 hours, 7d, 30 days.
- Boolean or categorical observations:
  - Displayed as icons or concise text.
- Missing timestamps appear as gaps in charts.
- Stale observations are marked, with thresholds defined per observation type.
- Users can expand collapsed sections for additional detail.

### Related Ents

- A Place belongs to exactly one Region at each administrative level.
- Regions form a strict containment hierarchy (GND → DSD → District → Province).
- Nearby Places or Regions may be shown if relevant.

## 3. State Handling

### Loading

- EntView displays a loading indicator while fetching data.
- Map markers may show loading states if alert evaluation is incomplete.

### Errors

- Failure to load an Ent displays a standard error panel with retry.
- Alerts that fail to evaluate are marked but do not block interaction.

### Stale Data

- Observations older than the defined freshness threshold are marked as stale.
- Thresholds vary by observation type.

### Missing Observations

- Charts display explicit gaps for missing data.
- A note clarifies when observations were unavailable.
