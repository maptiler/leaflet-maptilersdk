# MapTiler Client Changelog

## 4.0.3
- Move @leaflet/types to dependencies to ensure they're included when project is installed.

## 4.0.2
- Fix ES release to use correct declarations


## 4.0.1
- Fix ES release to include correct declarations files


## 4.0.0
### Other
- Updated with SDK v3 (rc) that in theory supports globe, though this is not enabled in the Leaflet plugin due to inherent limitations of Leaflet


### 3.0.0
### Others
- Update MapTiler SDK to v2


## 2.0.0
### New Features
- Major rework of the library to nmake it fully compatible with ES module installable from NPM, yet designed to be fully backward compatible and still usable from CDN/UMD
- The custom layer exposes the MapTiler SDK layer helpers to make it easy to add polyline/point/polygon/heatmap layers
- The custom layer now has a "ready" event that happens when the internal MapTiler SDK Map instance is fully loaded


## 1.0.0
### New Features
- First release. This was essentially a fork of the [MapLibre version](https://github.com/maplibre/maplibre-gl-leaflet) adapted to MapTiler SDK.
