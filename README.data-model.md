# ALERT Data Model

ALERT is a map-centred platform for presenting Awareness, Logistics, Evacuation, Recovery and Tracking information for disaster management, prevention and recovery.

The data model consists of three main layers:

- **Entities (ents)**: Geographic entities like Places and Regions
- **Roles**: Functional roles that entities can have (e.g., GaugingStationPlaceRole)
- **Events**: Time-based data associated with entities (e.g., RiverWaterLevelMeasurement)

## Entities

### Place

Represents a single point on the map (e.g., weather stations, police stations).

- `id`: Unique identifier
- `name`: Name of the place
- `latLng`: Geographic coordinates (latitude, longitude pair)

### BaseRegion

Abstract base class for all regions. A region is an area or collection of areas on a map.

- `id`: Unique identifier
- `name`: Name of the region
- `async getLatLngListList()`: Returns list of polygon coordinates

### BaseAdminRegion

Extends `BaseRegion` for administrative regions (Province, District, DSD, GND etc).

- `id`: Region identifier
- `name`: Region name
- `population2012`: Population count from the 2012 census
- `static getAdminRegionType()`:

#### Province

Administrative region type: `"province"`

#### District

Administrative region type: `"district"`

#### DSD

Administrative region type: `"dsd"` (Divisional Secretariat Division)

#### GND

Administrative region type: `"gnd"` (Grama Niladhari Division)

## Roles

Roles describe the functional purpose of a Place or Region.

### BaseRole

Abstract base class for all roles.

- `id`: Unique identifier (references a Place or Region)
- `static getEntClass`: The Ent which is allowed to play that role

### GaugingStationPlaceRole

Role for river water level monitoring stations.

- `riverName`: Name of the river being monitored
- `alertLevelM`: Alert threshold in meters
- `minorFloodLevelM`: Minor flood threshold in meters
- `majorFloodLevelM`: Major flood threshold in meters

## Events

Events are time-based events associated with a particular Ent in a particular Role

### BaseEvent

Abstract base class for all events.

**Properties:**

- `id`: Entity ID this event relates to
- `timeUt`: Unix timestamp
- `static getRoleClass`: The Role which has that type of event

### RiverWaterLevelMeasurement

Water level measurements from gauging stations.

- `waterLevelM`: Water level in meters

### LandslideWarning

- `threatLevel`

