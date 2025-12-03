# ALERT Data Model

ALERT is a map-centred platform for presenting Awareness, Logistics, Evacuation, Recovery and Tracking information for disaster management, prevention and recovery.  
Version 0 works with two types of mappable entities: **Places** and **Regions**.  
Places represent individual points, such as weather stations or police stations.  
Regions represent geographical areas, such as DSDs or GNDs, defined by one or more polygons.

Roles describe what a Place or Region represents, or what condition applies to it.  
Each role is modelled as its own class and links back to either a Place or a Region through their primary keys.

## Core Classes

### Map Entities

#### Place

Represents a single point on the map.

- `id`
- `name`
- `latLng`

#### Region

Represents an area defined by polygons.

- `id`
- `name`
- `polygons`: list of `Polygon`

Region can be extended for specific types of regions, like Province, DSD, GND, Country etc

### Geo Entities

#### LatLng

A coordinate pair.

- `lat`
- `lng`

#### Polygon

A polygon forming part of a Region.

- `coordinates`: list of `LatLng`

### Roles

Roles capture the functional meaning or status of a Place or Region.  
Each specific role is its own class and contains a foreign key to either a Place or a Region.

#### BaseRole

Abstract parent for shared fields.

- `id`
- `appliesTo`: enum(`place`, `region`)
- `placeId` (nullable)
- `regionId` (nullable)
- `validFrom`
- `validTo`
- `status`
- `metadata`

### WaterGaugingStationRole

- `stationCode`
- `riverName`
- `currentLevel`
- `thresholds`

#### WeatherStationRole

- `stationCode`
- `temperature`
- `rainfall`
- `wind`

#### PoliceStationRole

- `stationCode`
- `contact`
- `jurisdiction`

#### DSDOfficeRole

- `officeCode`
- `contact`

#### LandslideWarningRole

- `warningLevel`
- `issuedAt`
- `expiresAt`
