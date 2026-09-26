# ALERT product and design TODO

This backlog focuses on making ALERT feel trustworthy, calm, and professional while preserving its map-first, trilingual disaster-awareness workflow. Every item is intentionally scoped so it can be designed, built, reviewed, and shipped on its own.

## P0 — Trust and core experience

### [ ] Introduce a complete MUI theme and design tokens

**Goal:** Replace the current mix of one-off `sx` values and a small color constant file with a coherent visual system.

**Implementation:** Expand the theme in `App.js` (or move it to `src/view/theme.js`) with named severity colors, neutral surfaces, typography roles, spacing, radii, shadows, and component overrides for `Button`, `Paper`, `Chip`, `Tabs`, and navigation. Keep severity tokens in one place and remove duplicated magic values as touched. Add CSS variables only where Leaflet or non-MUI CSS needs the same tokens.

**Done when:** The main shell, cards, buttons, tabs, and navigation use shared tokens; there are no visual regressions in English, Sinhala, or Tamil; and new UI can use the theme without copying color or spacing values.

### [ ] Redesign the app header around location and status

**Goal:** Make the selected location, its administrative context, and current alert status understandable at a glance.

**Implementation:** Give the header a neutral brand surface instead of tinting the entire bar by severity. Add the ALERT wordmark, a compact severity chip with icon and text, a two-line location block, and the existing menu. Use a subtle severity accent or border so a red header never becomes the only status signal.

**Done when:** The header clearly identifies the product and selected place at 320 px width, long translated place names truncate gracefully, the severity remains readable without relying on color, and all controls have accessible labels.

### [ ] Turn place search into a persistent location selector

**Goal:** Make changing location obvious without requiring users to drag or tap the map.

**Implementation:** Place a search field or location button in the map surface and expose the existing `PlaceSearch` behavior from the primary flow. Add a clear label, search icon, current-location shortcut, debounced lookup, and a friendly no-results/error state. Keep map-tap selection as an alternative.

**Done when:** A user can search for a Sri Lankan place from the main screen, see loading/no-results/error feedback, select a result, and arrive at that location's alert view using only the keyboard or touch.

### [ ] Add an alert overview before detailed alert tabs

**Goal:** Answer “Am I at risk, from what, and what should I do next?” before showing raw detail.

**Implementation:** Add a summary panel at the top of `AlertsView` with overall severity, active-alert count, affected hazards, the latest update time, and a short action-oriented message. Derive it from the selected entity's existing official and automatic alert data; clearly label experimental automatic alerts.

**Done when:** The panel handles zero, one, and multiple alerts; distinguishes official from automatic information; includes icon + text + color for severity; and remains useful when one data source is unavailable.

### [ ] Standardize alert severity presentation

**Goal:** Make alert meaning consistent across the header, map, badges, cards, and charts.

**Implementation:** Define a single severity model containing level, translated label, color, icon, and recommended presentation. Use it in `getAlertColor`, `AlertLegend`, alert cards, map markers, and navigation badges. Adjust the palette to meet WCAG AA contrast and never use color as the only indicator.

**Done when:** Every level has the same name and visual treatment throughout the app, text contrast passes WCAG AA, color-blind users can distinguish levels by label/icon/shape, and “no alert” looks neutral rather than disabled.

### [ ] Show data freshness and provenance beside critical values

**Goal:** Help users judge whether an alert or metric is current and trustworthy.

**Implementation:** Create a compact metadata row for “Updated … ago”, source name, and official/experimental status. Reuse it in official alerts, automatic alerts, water levels, weather, and charts. Make the source link accessible and reveal the exact timestamp on tap, hover, or focus.

**Done when:** Every safety-critical card shows a human-readable freshness indicator and source; stale data is visibly flagged; exact timestamps include timezone; and missing timestamps display “Update time unavailable” instead of disappearing.

### [ ] Provide explicit loading, empty, error, and offline states

**Goal:** Avoid indefinite spinners and blank sections when a feed is slow or unavailable.

**Implementation:** Create a shared state panel with icon, plain-language message, and optional retry action. Apply it to initial data loading, selected-location loading, nearby places, search, alerts, weather, elevation, earthquakes, satellite imagery, and hydrometric data. Detect offline mode and distinguish it from an API error.

**Done when:** Each data surface has distinct loading, empty, error, and offline behavior; loading states use stable skeletons where practical; retry works without a full-page refresh; and errors never expose raw exception text to users.

## P1 — Visual hierarchy and interaction polish

### [ ] Create one reusable content-card pattern

**Goal:** Replace inconsistent papers and metric tiles with a clear, repeatable information hierarchy.

**Implementation:** Redesign `CustomPaper`, `InformationGroup`, `MetricCard`, and `OldMetricCard` around one card anatomy: optional status accent, icon/title, primary value, supporting label, freshness/source footer, and optional action. Use restrained borders and shadows, consistent padding, and content-driven height instead of fixed 90 × 90 tiles where text can overflow.

**Done when:** Weather, elevation, water, alert-score, and nearby-content cards share spacing and hierarchy; translated labels wrap without clipping; primary values are visually dominant; and cards align cleanly in both list and grid layouts.

### [ ] Replace button-based tabs with an accessible tab system

**Goal:** Make the nested Official/Automatic, hazard, and data categories easier to scan and navigate.

**Implementation:** Replace `CustomTabs` button rows with MUI `Tabs`/`Tab` or an equivalent ARIA tab pattern. Add a selected indicator, horizontal scrolling on small screens, keyboard navigation, stable panels, and count badges that do not change tab contrast.

**Done when:** Tabs fit at 320 px without clipping the page, support arrow-key navigation and visible focus, expose correct tab semantics to screen readers, preserve the selected tab while its data refreshes, and show long translated labels cleanly.

### [ ] Improve the map's controls, markers, and legend

**Goal:** Make the map feel like a deliberate product surface rather than a default Leaflet embed.

**Implementation:** Restyle markers with severity shape/icon/label, cluster overlapping alert locations, place map controls in consistent floating panels, and collapse the legend behind a labelled control on narrow screens. Add a small instruction such as “Move the map or tap to choose a location” until the first interaction.

**Done when:** Markers remain distinguishable in grayscale, overlapping alerts are discoverable, controls do not cover attribution or navigation, the legend is operable by keyboard, and the selection instruction disappears after a place is chosen.

### [ ] Build a responsive two-pane desktop layout

**Goal:** Use larger screens efficiently while preserving the current focused mobile flow.

**Implementation:** At a desktop breakpoint, keep the map in one pane and show Alerts/Data in a scrollable side panel with a practical max width. On mobile, retain full-screen map/content switching and fixed bottom navigation. Ensure the selected map location remains visible when the panel opens.

**Done when:** The app has deliberate layouts at 320, 768, 1024, and 1440 px; desktop users can inspect data without losing the map; neither pane causes page-level horizontal scrolling; and mobile behavior remains one-handed and touch-friendly.

### [ ] Polish bottom navigation and safe-area behavior

**Goal:** Make primary navigation look intentional and work correctly on modern phones.

**Implementation:** Use a consistent 64 px navigation region plus `env(safe-area-inset-bottom)`, remove the large hard-coded bottom padding, and show the active state without disabling the active action. Use selected color, indicator, icon weight, and label weight consistently; cap alert badges at `99+`.

**Done when:** All three destinations remain tappable, the active destination is announced correctly, focus states are visible, content is never hidden behind the bar, and iOS safe areas and Android browser chrome do not create excess or missing space.

### [ ] Upgrade typography for all three languages

**Goal:** Create a calmer hierarchy and render English, Sinhala, and Tamil with equal quality.

**Implementation:** Define responsive type roles for page title, section title, body, metadata, metric value, and labels. Load font families with verified Sinhala and Tamil glyph coverage, appropriate fallbacks, and non-blocking delivery. Remove invalid variants such as `title1` and avoid computing font size from string length.

**Done when:** All roles use theme typography, no translated text clips at 200% zoom, numerals and units align consistently, font loading does not leave invisible text, and screenshots in all three languages have comparable hierarchy.

### [ ] Redesign nearby places as actionable emergency-service rows

**Goal:** Make hospitals, police, fire stations, cities, and hydrometric stations quicker to identify and use.

**Implementation:** Replace the wrapping chip-like links with compact rows or cards containing a type icon, place name, localized distance, current status where relevant, and a clear “View” action. Group or filter by service type when several results are present.

**Done when:** Place type is identifiable without reading the name, distance uses consistent local units, rows have at least 44 × 44 px touch targets, long names wrap cleanly, and an empty result explains that no nearby data was found.

### [ ] Make charts easier to interpret on small screens

**Goal:** Turn weather and water-level plots into legible decision-support visuals.

**Implementation:** Apply consistent chart colors, axis typography, units, gridlines, threshold bands, “now” marker, accessible tooltip, and source/freshness footer. Reduce label density on narrow screens and include a concise text summary of the trend above each chart.

**Done when:** Axes never overlap at 320 px, thresholds match the shared severity model, touch tooltips work, every series has a non-color identifier, and a screen-reader-accessible trend summary is present.

### [ ] Refine loading into a branded first-run experience

**Goal:** Make the initial wait feel intentional and reassuring.

**Implementation:** Replace the large spinner/checklist presentation with the ALERT mark, a short purpose statement, a determinate progress indicator where progress is real, and skeletons for the shell that will appear. Move technical version information to the About/menu area.

**Done when:** The header and navigation do not jump when loading completes, progress labels accurately reflect loaded dependencies, a slow load explains what is happening, and a failed dependency transitions to an actionable error state.

## P2 — Brand, quality, and finishing details

### [ ] Replace Create React App metadata with ALERT branding

**Goal:** Present a finished product when installed, shared, or shown in browser UI.

**Implementation:** Update `public/manifest.json` and `public/index.html` with the ALERT name, description, theme/background colors, icons, canonical URL, and Open Graph/social metadata. Create maskable PWA icons and ensure the page title includes the selected location when available.

**Done when:** Browser tabs, add-to-home-screen prompts, installed-app launch screens, and shared links all show ALERT branding; Lighthouse reports valid install metadata; and no “React App” or Create React App placeholder copy remains.

### [ ] Add a focused Help and About panel

**Goal:** Explain what ALERT does, how to interpret it, and where its limits are without cluttering primary screens.

**Implementation:** Add a Help/About destination to the existing menu with a three-step usage guide, legend, official-versus-automatic explanation, emergency disclaimer, data-source summary, version, and feedback links. Translate the user-facing copy through i18n.

**Done when:** A first-time user can learn how to select a place and interpret an alert in under a minute, the automatic-alert limitation is clear, emergency guidance does not imply ALERT replaces authorities, and all content is available in English, Sinhala, and Tamil.

### [ ] Complete an accessibility pass for critical journeys

**Goal:** Ensure location selection and alert review work for keyboard, screen-reader, low-vision, and motion-sensitive users.

**Implementation:** Add a skip link, semantic landmarks/headings, visible focus, accessible names for icon controls and map markers, reduced-motion support, correct live regions for data updates, and 44 px minimum touch targets. Audit at 200% zoom and with automated axe checks.

**Done when:** A keyboard-only user can search/select a location and review alerts without a trap, automated tests have no serious/critical axe violations, status changes are announced without excessive chatter, and the UI remains usable at 200% zoom.

### [ ] Add visual regression coverage for the design system

**Goal:** Keep the polished UI stable as data and translations evolve.

**Implementation:** Add component or browser-level screenshot tests for the app shell, header, navigation, alert summary, tabs, cards, empty/error states, and map overlays. Cover mobile and desktop widths, all four severity levels, and at least one English, Sinhala, and Tamil fixture. Replace the obsolete “learn react” test with assertions relevant to ALERT.

**Done when:** Tests use deterministic fixture data, run in CI, produce reviewable diffs, cover the defined viewports/languages/severities, and fail on unintended clipping, overflow, or layout shifts.

### [ ] Fix visible UI inconsistencies and small defects

**Goal:** Remove details that make the interface feel unfinished before or alongside larger redesign work.

**Implementation:** Correct the invalid `rgba(255,2555,255, 0.9)` value, the “automtically” typo, invalid typography variants, inconsistent margins, mixed loading checks, and unused download callbacks/props. Move user-visible hard-coded strings through the existing translation flow and verify that each key exists in all locale files.

**Done when:** The app builds without lint errors or console warnings, no placeholder/typo is visible, equivalent components use equivalent spacing, every visible string renders in all three languages, and obsolete props/imports are removed.
