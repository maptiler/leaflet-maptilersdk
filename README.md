<p align="center">
  <a href="https://docs.maptiler.com/sdk-js/">official page →</a><br>
  <img src="maptilersdk-leaflet.png" width="70%">
</p>


This is a binding from [MapTiler SDK JS/TS](https://docs.maptiler.com/sdk-js/) to the familiar
[Leaflet](http://leafletjs.com/) API. This is a fork of the [MapLibre version](https://github.com/maplibre/maplibre-gl-leaflet).

**MapTiler SDK JS** is an extension of MapLibre GL JS, fully backward compatible, tailored for MapTiler Cloud and with plenty of extra features!

## Code example
```javascript

var map = L.map('map').setView([38.912753, -77.032194], 15);
L.marker([38.912753, -77.032194])
    .bindPopup("Hello <b>Leaflet GL</b>!<br>Whoa, it works!")
    .addTo(map)
    .openPopup();
var gl = L.maptilerSDK({
    style: "https://api.maptiler.com/maps/streets-v2/style.json?key=YOUR_MAPTILER_API_KEY",
}).addTo(map);
```

You can also use any of the MapTiler style shorthand alongside the `apiKey` option:
```javascript
var gl = L.maptilerSDK({
	style: "streets-v2",
    apiKey: "YOUR_MAPTILER_API_KEY",
}).addTo(map);
```

Get an API key with the generous free plan at [cloud.maptiler.com](https://cloud.maptiler.com/)

<details>
  <summary>🎨 Expand to list of the MapTiler styles</summary>

- `"streets-v2"`
- `"streets-v2-dark"`
- `"streets-v2-light"`
- `"streets-v2-night"`
- `"streets-v2-pastel"`
- `"dataviz"`
- `"dataviz-dark"`
- `"dataviz-light"`
- `"outdoor-v2"`
- `"outdoor-v2-dark"`
- `"winter-v2"`
- `"winter-v2-dark"`
- `"satellite"`
- `"hybrid"`
- `"basic-v2"`
- `"basic-v2-dark"`
- `"basic-v2-light"`
- `"bright-v2"`
- `"bright-v2-dark"`
- `"bright-v2-light"`
- `"bright-v2-pastel"`
- `"openstreetmap"`
- `"topo-v2"`
- `"topo-v2-dark"`
- `"topo-v2-shiny"`
- `"topo-v2-pastel"`
- `"topo-v2-topographique"`
- `"voyager-v2"`
- `"voyager-v2-darkmatter"`
- `"voyager-v2-positron"`
- `"voyager-v2-vintage"`
- `"toner-v2"`
- `"toner-v2-background"`
- `"toner-v2-lite"`
- `"toner-v2-lines"`
- `"Ocean"`

You can also create your custom styles on [cloud.maptiler.com/maps](https://cloud.maptiler.com/maps/)
</details>  

Once you have created the leaflet layer, the MapTiler SDK `Map` instance can be accessed using
```javascript
gl.getMaptilerMap()....
// add a source to the MapTiler SDK layer
gl.getMaptilerMap().addSource({...})
```

## Examples
The [examples](examples) folder of this repository is a good place to start!

## Installation
Add a script tag referencing maptilersdk-leaflet after adding leaflet and MapTiler SDK in your website:
```html
<!-- Leaflet -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>

<!-- MapTiler SDK -->
<script src="https://cdn.maptiler.com/maptiler-sdk-js/latest/maptiler-sdk.umd.js"></script>
<link href="https://cdn.maptiler.com/maptiler-sdk-js/latest/maptiler-sdk.css" rel="stylesheet" />

<!-- MapTiler SDK + Leaflet bindings -->
<script src="https://cdn.maptiler.com/maptilersdk-leaflet/latest/maptilersdk-leaflet.js"></script>
```

## Motivation
This project makes it possible to easily add a MapTiler SDK JS layer in your Leaflet map. When using maptilersdk-leaflet, you won't be able to use some of the MapTiler SDK features.
Here are the main differences between a "pure" MapTiler SDK map and a Leaflet map using maptilesdk-leaflet:
- No rotation / bearing / pitch support
- Slower performances: When using maptilersdk-leaflet, MapTiler SDK is set as not interactive. Leaflet receives the touch/mouse events and updates the MapTiler SDK map behind the scenes. Because MapTiler SDK doesn't redraw as fast as Leaflet, the map can seem slower.

On the bright side, the maptilersdk-leaflet binding will allow you to use all the leaflet features and plugins.

If you only need the MapTiler SDK features, you are probably better off using it directly.

## API Reference
## `L.maptilerSDK(options)`

Create a new MapTiler SDK layer in a Leaflet-compatible wrapper.

<span class='leaflet icon'>_Extends_: `L.Class`</span>

`options` is an object of options. All options given are passed to a MapTiler SDK `Map` object,
so consult [documentation]https://docs.maptiler.com/sdk-js/api/map/)
for the full range.

| Option | Value | Description |
| ---- | ---- | ---- |
| padding | number | [0.15] | Relative padding of the MapTiler SDK layer to avoid the background flickering around the edges of the map |
| interactive | boolean | [false] | Wheter or not to register the mouse and keyboard events on the MapTiler SDK layer. Turn this on if you intend to use the MapTiler SDK layer events. |

### `layer.addTo(map)`

Same behavior as `.addTo` on any Leaflet layer: this adds the layer to a given
map or group.

### `layer.getMaptilerMap(): maptilersdk.Map`

Returns `mapltilersdk.Map` object.

### `layer.getContainer(): HTMLDivElement`

Returns layer's DOM container `div`.

### `layer.getCanvas(): HTMLCanvasElement`

Returns `maptilersdk.Map` canvas.

### `layer.getSize(): L.Point`

Returns layer size in pixels including padding.

### `layer.getBounds(): L.LatLngBounds`

Returns layer bounds including padding.

### `layer.getPaneName(): string`

Returns the pane name set in options if it is a valid pane, defaults to tilePane.


## Bug Reports & Feature Requests
Please use the [issue tracker](https://github.com/maptiler/maptilersdk-leaflet/issues) to report any bugs or file feature requests.

## Licence
ISC © [MapTiler](https://maptiler.com) - © [MapLibre](https://github.com/maplibre)


