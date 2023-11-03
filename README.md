<p align="center">
  <a href="https://docs.maptiler.com/sdk-js/">official page →</a><br>
  <img src="images/header.png" width="70%">
</p>


This is a binding from [MapTiler SDK JS/TS](https://docs.maptiler.com/sdk-js/) to the familiar
[Leaflet](http://leafletjs.com/) API.

**MapTiler SDK JS** is an extension of MapLibre GL JS, fully backward compatible, tailored for MapTiler Cloud and with plenty of extra features!

![](images/leaflet-maptilersdk.jpg)

## Usage
### From ES module using `import`
For the following examples, we are using the [Vite vanilla JS app](https://vitejs.dev/guide/) as a starting point.

The typical Leaflet plugin usualy adds new elements directly in the global object `L` and even though this API design is now a bit dated and somewhat frown uppon, we did not want to disrupt the dev experiece for those used to this. For this reason, you will need to import the plugin but not a specific object from it, as `MaptilerLayer` is internally added to `L`:

```js
// import Leaflet and its style
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import the Leaflet MapTiler Plugin
import "@maptiler/leaflet-maptilersdk";

// Import your custom style, 
// depending on your configuration, you may have to change how this is done
import './style.css';
```

Then, in the Vite vanilla app, we would have to do exactely like in regular vanilla JS:
```js
// Center the map on Manhattan, zoom level 13
const map = L.map("map").setView([40.7468, -73.98775], 13);

// Center the map on Manhattan, zoom level 13
L.marker([40.7468, -73.98775])
  .bindPopup("Hello <b>Leaflet with MapTiler SDK</b>")
  .addTo(map)
  .openPopup();

// Create a MapTiler Layer inside Leaflet
const mtLayer = new L.MaptilerLayer({
  // Get your free API key at https://cloud.maptiler.com
  apiKey: "YOUR_MAPTILER_API_KEY",
}).addTo(map);
```

If you would rather stick to more modern API design and do not feel like using the `L` object, we got you covered:

```js
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

// ...

const mtLayer = new MaptilerLayer( options );
```


### From CDN with the UMD bundle
The UDM *leaflet-maptilersdk* bundle is not package with Leaflet nor with MapTiler SDK, so those will have to be imported as `<script>` separately as follow in the `<head>` HTML element:

```html
<!-- Leaflet -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>

<!-- MapTiler SDK -->
<script src="https://cdn.maptiler.com/maptiler-sdk-js/latest/maptiler-sdk.umd.js"></script>
<link href="https://cdn.maptiler.com/maptiler-sdk-js/latest/maptiler-sdk.css" rel="stylesheet" />

<!-- Leaflet plugin for MapTiler SDK Layers -->
<script src="../build/leaflet-maptilersdk.umd.js"></script>
```

Then, in the HTML `<body>`, decalre the container that will host the map:
```html
<div id="map"></div>
```

Finally, add a `<script>` to initialize the Leaflet Map that contains a MapTiler SDK Layer:

```js
// Center the map on Manhattan, zoom level 13
const map = L.map('map').setView([40.7468, -73.98775], 13);

// Add a marker with a popup
L.marker([40.7468, -73.98775])
  .bindPopup("Hello <b>Leaflet with MapTiler SDK</b>!<br>Whoa, it works!")
  .addTo(map)
  .openPopup();

// Create a MapTiler Layer inside Leaflet
const mtLayer = L.maptilerLayer({
  // Get your free API key at https://cloud.maptiler.com
  apiKey: "YOUR_MAPTILER_API_KEY",
}).addTo(map);
```

The notation `L.maptilerLayer` is the typical Leaflet way to expose a factory function that creates a layer. Though, our plugin exposes other ways to do exactely the same thing but that may suit your programming style better.  
The following are all yielding the same result:
- `const mtLayer = L.maptilerLayer( options )`
- `const mtLayer = new L.MaptilerLayer( options )` (mind the upper case `M`)
- `const mtLayer = leafletmaptilersdk.maptilerLayer( options )`
- `const mtLayer = new leafletmaptilersdk.MaptilerLayer( options )` (mind the upper case `M`)

### API and options
#### Constructor and Factory function
The option object passed to the factory function `maptilerLayer` or to the constructor `MaptilerLayer` is then passed to the constructor of the Maptiler SDK `Map` class. Read more about the possible options on our [SDK documentation](https://docs.maptiler.com/sdk-js/api/map/).

Here are the major options:

- `geolocate`: [boolean] if `true`, will locate the user and center the map accordingly. Note that Leaflet still requires the use of `.setView()` but this will be ignored. Default: `false`.
- `language`: [string] by default is using the language from the system settings, and falls back to local names. Yet the language can be enforced with one from the list below. Depending on how you are importing, you could use `L.MaptilerLanguage.ENGLISH`, `MaptilerLanguage.ENGLISH` or `leafletmaptilersdk.MaptilerLanguage.ENGLISH`. <details>
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

- `style`: [string | style definition] MapTiler has created many professional-looking styles that may suit your particular need. Directly from the constructor, you can specify the short style ID. Alternatively, a style URL or a complete style definition object can also be used. Default: `L.MaptilerStyle.STREETS`. Depending on how you are importing, you could use `L.MaptilerStyle.STREETS`, `MaptilerStyle.STREETS` or `leafletmaptilersdk.MaptilerStyle.STREETS`. <details>
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

The `MaptilerLayer` constructor and/or `maptilerLayer` factory function returns a Leaflet Maptiler layer, that we will call `mtLayer`.

#### `mtLayer.addTo(map)`
Same behavior as `.addTo` on any Leaflet layer: this adds the layer to a given
map or group.

#### `mtLayer.getMaptilerMap(): maptilerLayer.Map`
Returns `mapltilersdk.Map` object.

#### `mtLayer.getContainer(): HTMLDivElement`
Returns layer's DOM container `div`.

#### `mtLayer.getCanvas(): HTMLCanvasElement`
Returns `maptilerLayer.Map` canvas.

#### `mtLayer.getSize(): L.Point`
Returns layer size in pixels including padding.

#### `mtLayer.getBounds(): L.LatLngBounds`
Returns layer bounds including padding.

#### `mtLayer.getPaneName(): string`
Returns the pane name set in options if it is a valid pane, defaults to tilePane.

#### `mtLayer.setStyle(s)`
Update the style with a style ID, style URL or a style definition. The easiest is to use a built-in style ID such as listed above with the form `L.MaptilerStyle.STREETS`.

#### `mtLayer.setLanguage(l)`
Update the map language. For this, the best is to use a built-in language shorthand with the form `L.MaptilerLanguage.JAPANESE`, such as listed above.

## Bug Reports & Feature Requests
Please use the [issue tracker](https://github.com/maptiler/leaflet-maptilersdk/issues) to report any bugs or file feature requests.

## Licence
ISC © [MapTiler](https://maptiler.com) - © [MapLibre](https://github.com/maplibre)


