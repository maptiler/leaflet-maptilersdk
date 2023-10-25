<p align="center">
  <a href="https://docs.maptiler.com/leaflet/">official page →</a><br>
  <img src="header.png" width="70%">
</p>


This is a binding from [MapTiler SDK JS/TS](https://docs.maptiler.com/sdk-js/) to the familiar
[Leaflet](http://leafletjs.com/) API. This is a fork of the [MapLibre version](https://github.com/maplibre/maplibre-gl-leaflet).

**MapTiler SDK JS** is an extension of MapLibre GL JS, fully backward compatible, tailored for MapTiler Cloud and with plenty of extra features!

## Code example
```javascript

const map = L.map('map').setView([38.912753, -77.032194], 15);
L.marker([38.912753, -77.032194])
    .bindPopup("Hello <b>Leaflet GL</b>!<br>Whoa, it works!")
    .addTo(map)
    .openPopup();

const mtLayer = L.maptilerLayer({
    style: "https://api.maptiler.com/maps/streets-v2/style.json?key=YOUR_MAPTILER_API_KEY",
}).addTo(map);
```

You can also use any of the MapTiler style shorthand alongside the `apiKey` option:
```javascript
const mtLayer = L.maptilerLayer({
  apiKey: "YOUR_MAPTILER_API_KEY",
  style: L.MaptilerStyle.STREETS, // optional
}).addTo(map);
```

Get an API key with the generous free plan at [cloud.maptiler.com](https://cloud.maptiler.com/)

Once you have created the leaflet layer, the MapTiler SDK `Map` instance can be accessed using
```javascript
const maptilerMap = mtLayer.getMaptilerMap();

// add a source to the MapTiler SDK layer, just like you would do with the MapTiler SDK
mtLayer.getMaptilerMap().addSource({...});
```

## Examples
The [examples](examples) folder of this repository is a good place to start!

## Installation
Add a script tag referencing leaflet-maptilersdk after adding leaflet and MapTiler SDK in your website:
```html
<!-- Leaflet -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>

<!-- MapTiler SDK -->
<script src="https://cdn.maptiler.com/maptiler-sdk-js/latest/maptiler-sdk.umd.js"></script>
<link href="https://cdn.maptiler.com/maptiler-sdk-js/latest/maptiler-sdk.css" rel="stylesheet" />

<!-- MapTiler SDK + Leaflet bindings -->
<script src="https://cdn.maptiler.com/leaflet-maptilersdk/latest/leaflet-maptilersdk.js"></script>
```

## Motivation
This project makes it possible to easily add a MapTiler SDK JS layer in your Leaflet map. When using leaflet-maptilersdk, you won't be able to use some of the MapTiler SDK features.
Here are the main differences between a "pure" MapTiler SDK map and a Leaflet map using maptilesdk-leaflet:
- No rotation / bearing / pitch support
- Slower performances: When using leaflet-maptilersdk, MapTiler SDK is set as not interactive. Leaflet receives the touch/mouse events and updates the MapTiler SDK map behind the scenes. Because MapTiler SDK doesn't redraw as fast as Leaflet, the map can seem slower.
- Terrain elevation is possible but will create a parallax effect that will result in a missalignment of other Leaflet features (markers, overlays, etc.)

On the bright side, the leaflet-maptilersdk binding will allow you to use all the leaflet features and plugins.

If you only need the MapTiler SDK features, you are probably better off using it directly.

## API Reference
## `L.maptilerLayer(options)`

Create a new MapTiler SDK layer in a Leaflet-compatible wrapper. This is a *factory function* that under the hood creates an instance `new L.MaptilerLayer(options)` and returns it. Wrapping the contructor call with a factory function makes chaining possible, which is a concept at the heart of Leaflet API design.

<span class='leaflet icon'>_Extends_: `L.Class`</span>

`options` is an object of options. All options given are passed to a MapTiler SDK `Map` object,
so consult [documentation]https://docs.maptiler.com/sdk-js/api/map/)
for the full range.

Here are the major options:

- `geolocate`: [boolean] if `true`, will locate the user and center the map accordingly. Note that Leaflet still requires the use of `.setView()` but this will be ignored. Default: `false`.
- `language`: [string] by default is using the language from the system settings, and falls back to local names. Yet the language can be enforced with one from the list below. Default: `L.MaptilerLanguage.AUTO` <details>
  <summary>See the list of possible languages</summary>

  - `L.MaptilerLanguage.AUTO` uses the language of the browser 
  - `L.MaptilerLanguage.STYLE_LOCK` maintains the language as defined in the `style.json`
  - `L.MaptilerLanguage.LATIN` default language that uses latin charset
  - `L.MaptilerLanguage.NON_LATIN` default language that uses non-latin charset
  - `L.MaptilerLanguage.LOCAL` Labels are in their local language, when available
  - `L.MaptilerLanguage.ALBANIAN`
  - `L.MaptilerLanguage.AMHARIC`
  - `L.MaptilerLanguage.ARABIC`
  - `L.MaptilerLanguage.ARMENIAN`
  - `L.MaptilerLanguage.AZERBAIJANI`
  - `L.MaptilerLanguage.BASQUE`
  - `L.MaptilerLanguage.BELORUSSIAN`
  - `L.MaptilerLanguage.BOSNIAN`
  - `L.MaptilerLanguage.BRETON`
  - `L.MaptilerLanguage.BULGARIAN`
  - `L.MaptilerLanguage.CATALAN`
  - `L.MaptilerLanguage.CHINESE`
  - `L.MaptilerLanguage.CORSICAN`
  - `L.MaptilerLanguage.CROATIAN`
  - `L.MaptilerLanguage.CZECH`
  - `L.MaptilerLanguage.DANISH`
  - `L.MaptilerLanguage.DUTCH`
  - `L.MaptilerLanguage.ENGLISH`
  - `L.MaptilerLanguage.ESPERANTO`
  - `L.MaptilerLanguage.ESTONIAN`
  - `L.MaptilerLanguage.FINNISH`
  - `L.MaptilerLanguage.FRENCH`
  - `L.MaptilerLanguage.FRISIAN`
  - `L.MaptilerLanguage.GEORGIAN`
  - `L.MaptilerLanguage.GERMAN`
  - `L.MaptilerLanguage.GREEK`
  - `L.MaptilerLanguage.HEBREW`
  - `L.MaptilerLanguage.HINDI`
  - `L.MaptilerLanguage.HUNGARIAN`
  - `L.MaptilerLanguage.ICELANDIC`
  - `L.MaptilerLanguage.INDONESIAN`
  - `L.MaptilerLanguage.IRISH`
  - `L.MaptilerLanguage.ITALIAN`
  - `L.MaptilerLanguage.JAPANESE`
  - `L.MaptilerLanguage.JAPANESE_HIRAGANA`
  - `L.MaptilerLanguage.JAPANESE_KANA`
  - `L.MaptilerLanguage.JAPANESE_LATIN`
  - `L.MaptilerLanguage.JAPANESE_2018`
  - `L.MaptilerLanguage.KANNADA`
  - `L.MaptilerLanguage.KAZAKH`
  - `L.MaptilerLanguage.KOREAN`
  - `L.MaptilerLanguage.KOREAN_LATIN`
  - `L.MaptilerLanguage.KURDISH`
  - `L.MaptilerLanguage.ROMAN_LATIN`
  - `L.MaptilerLanguage.LATVIAN`
  - `L.MaptilerLanguage.LITHUANIAN`
  - `L.MaptilerLanguage.LUXEMBOURGISH`
  - `L.MaptilerLanguage.MACEDONIAN`
  - `L.MaptilerLanguage.MALAYALAM`
  - `L.MaptilerLanguage.MALTESE`
  - `L.MaptilerLanguage.NORWEGIAN`
  - `L.MaptilerLanguage.OCCITAN`
  - `L.MaptilerLanguage.POLISH`
  - `L.MaptilerLanguage.PORTUGUESE`
  - `L.MaptilerLanguage.ROMANIAN`
  - `L.MaptilerLanguage.ROMANSH`
  - `L.MaptilerLanguage.RUSSIAN`
  - `L.MaptilerLanguage.SCOTTISH_GAELIC`
  - `L.MaptilerLanguage.SERBIAN_CYRILLIC`
  - `L.MaptilerLanguage.SERBIAN_LATIN`
  - `L.MaptilerLanguage.SLOVAK`
  - `L.MaptilerLanguage.SLOVENE`
  - `L.MaptilerLanguage.SPANISH`
  - `L.MaptilerLanguage.SWEDISH`
  - `L.MaptilerLanguage.TAMIL`
  - `L.MaptilerLanguage.TELUGU`
  - `L.MaptilerLanguage.THAI`
  - `L.MaptilerLanguage.TURKISH`
  - `L.MaptilerLanguage.UKRAINIAN`
  - `L.MaptilerLanguage.WELSH`

</details>

- `style`: [string | style definition] MapTiler has created many professional-looking styles that may suit your particular need. Directly from the constructor, you can specify the short style ID. Alternatively, a style URL or a complete style definition object can also be used. Default: `L.MaptilerStyle.STREETS`. <details>
  <summary>🎨 Expand to list of the MapTiler style IDs</summary>

  - `L.MaptilerStyle.STREETS`, reference style for navigation and city exploration
    - `L.MaptilerStyle.STREETS.DARK` (variant)
    - `L.MaptilerStyle.STREETS.LIGHT` (variant)
    - `L.MaptilerStyle.STREETS.PASTEL` (variant)
  - `L.MaptilerStyle.SATELLITE` reference style satellite and airborne imagery (no variants)
  - `L.MaptilerStyle.HYBRID` reference style satellite and airborne imagery with labels (no variants)
  - `L.MaptilerStyle.OUTDOOR` reference style for adventure
    - `L.MaptilerStyle.OUTDOOR.DARK` (variant)
  - `L.MaptilerStyle.WINTER` reference style for winter adventure
    - `L.MaptilerStyle.WINTER.DARK` (variant)
  - `L.MaptilerStyle.DATAVIZ`, the perfect style for data visualization, with very little noise
    - `L.MaptilerStyle.DATAVIZ.DARK` (variant)
    - `L.MaptilerStyle.DATAVIZ.LIGHT` (variant)
  - `L.MaptilerStyle.BASIC` reference style for minimalist design and general purpose
    - `L.MaptilerStyle.BASIC.DARK` (variant)
    - `L.MaptilerStyle.BASIC.LIGHT` (variant)
  - `L.MaptilerStyle.BRIGHT` reference style for high contrast navigation
    - `L.MaptilerStyle.BRIGHT.DARK` (variant)
    - `L.MaptilerStyle.BRIGHT.LIGHT` (variant)
    - `L.MaptilerStyle.BRIGHT.PASTEL` (variant)
  - `L.MaptilerStyle.TOPO` reference style for topographic study
    - `L.MaptilerStyle.TOPO.SHINY` (variant)
    - `L.MaptilerStyle.TOPO.PASTEL` (variant)
    - `L.MaptilerStyle.TOPO.TOPOGRAPHIQUE` (variant)
  - `L.MaptilerStyle.VOYAGER` reference style for stylish yet minimalist maps
    - `L.MaptilerStyle.VOYAGER.DARK` (variant)
    - `L.MaptilerStyle.VOYAGER.LIGHT` (variant)
    - `L.MaptilerStyle.VOYAGER.VINTAGE` (variant)
  - `L.MaptilerStyle.TONER` reference style for very high contrast stylish maps 
    - `L.MaptilerStyle.TONER.BACKGROUND` (variant)
    - `L.MaptilerStyle.TONER.LITE` (variant)
    - `L.MaptilerStyle.TONER.LINES` (variant)
  - `L.MaptilerStyle.OPENSTREETMAP` reference style for the classic OSM look
  - `L.MaptilerStyle.OCEAN` reference style with seabed isoline, hilshading and trenches info

  You can also create your custom styles on [cloud.maptiler.com/maps](https://cloud.maptiler.com/maps/)
</details>  

- `apiKey`: [string] your MapTiler Cloud API key. Default: empty string


### `mtLayer.addTo(map)`

Same behavior as `.addTo` on any Leaflet layer: this adds the layer to a given
map or group.

### `mtLayer.getMaptilerMap(): maptilerLayer.Map`

Returns `mapltilersdk.Map` object.

### `mtLayer.getContainer(): HTMLDivElement`

Returns layer's DOM container `div`.

### `mtLayer.getCanvas(): HTMLCanvasElement`

Returns `maptilerLayer.Map` canvas.

### `mtLayer.getSize(): L.Point`

Returns layer size in pixels including padding.

### `mtLayer.getBounds(): L.LatLngBounds`

Returns layer bounds including padding.

### `mtLayer.getPaneName(): string`

Returns the pane name set in options if it is a valid pane, defaults to tilePane.

### `mtLayer.setStyle(s)`

Update the style with a style ID, style URL or a style definition. The easiest is to use a built-in style ID such as listed above with the form `L.MaptilerStyle.STREETS`.

### `mtLayer.setLanguage(l)`

Update the map language. The argument `l` can be a one of the supported 2-char ISO language code or the simpler solution is to use a built-in language shorthand with the form `L.MaptilerLanguage.JAPANESE`, such as listed above.


## Bug Reports & Feature Requests
Please use the [issue tracker](https://github.com/maptiler/leaflet-maptilersdk/issues) to report any bugs or file feature requests.

## Licence
ISC © [MapTiler](https://maptiler.com) - © [MapLibre](https://github.com/maplibre)


