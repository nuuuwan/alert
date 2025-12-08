# ALERT Data Model

## 1. Ents

An **Ent** is any geographic entity used by the system. There are two forms:

### Places

A **Place** is a point defined by latitude and longitude. Coordinates are stored to four decimal places, giving roughly ten metres of precision. A Place is uniquely identified by its coordinates.

Places have constant attributes, such as name or elevation, and time-varying attributes accessed through Observations.

```javascript
place = await Place.load([6.9157, 79.8636]);

HydrometricStation = await HydrometricStation.load([6.9579, 79.8788]);
HydrometricStation = await HydrometricStation.loadFromName("Nagalagam Street");

elev = place.elevation;
```

### Regions

A **Region** is one or more non-overlapping polygons. Each polygon is a list of latitude–longitude pairs. Administrative areas such as provinces, districts, DSDs and GNDs are Region subtypes.

```javascript
dsdColombo = await DSD.fromMultiPolygon(multiPolygon);
dsdColombo = await DSD.fromID("LK-1103");
```

### Attributes

All Ents have two classes of attributes:

- **Constant attributes**. Fixed at creation. Sourced from external APIs or hardcoded data. Examples: name, elevation, administrative codes.
- **Time-varying attributes**. Accessed via Observations. Immutable once created.

Ents themselves are **immutable**. After creation, neither geometry nor attributes can be modified. Any missing information must be resolved before instantiation.

---

## 2. Observations

An **Observation** is a triple:

- an **Ent**
- a **timestamp** (Unix time, rendered in Sri Lanka time)
- an **observed value**

Observed values are usually numeric, but may be boolean or categorical. Each observation type is a subclass of the base Observation class. Units are standardised.

```javascript
// Single timestamp
r = place.rainfall((t = 1764953258));

// Multiple timestamps
rList = place.rainfall((tList = [1764953258, 1764953259, 1764953260]));
```

Observations are immutable. All observations for an Ent must be present at the moment the Ent is created or loaded.

---

## 3. Alerts

An **Alert** defines a boolean condition on an Ent. The condition is evaluated whenever the application loads. If the condition is true, the alert is active.

An Alert does not modify underlying data; it only queries it.

```javascript
isMajor = HydrometricStation.isMajorFlood();
```

A typical pattern is threshold comparison, for example water level exceeding minor or major flood levels. More complex conditions are supported so long as they can be expressed in terms of Ent attributes and Observations.
