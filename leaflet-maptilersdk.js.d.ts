import * as L from 'leaflet';
import type {
  Map,
  MapOptions,
  MapStyleType,
  LanguageString,
  ReferenceMapStyle,
  MapStyleVariant,
  StyleSpecification,
  Language,
} from '@maptiler/sdk';


declare module 'leaflet' {
  type LeafletMaptilerSDKOptions = Omit<MapOptions, "container">;

  class MaptilerLayer extends L.Layer {
    constructor(options: LeafletMaptilerSDKOptions);
    getMaptilerSDKMap(): Map
    getCanvas(): HTMLCanvasElement
    getSize(): L.Point
    getBounds(): L.LatLngBounds
    getContainer(): HTMLDivElement
    getPaneName(): string
    setlanguage(l: LanguageString)
    setStyle(s: ReferenceMapStyle | MapStyleVariant | StyleSpecification | string)
  }

  function maptilerSDK(options: LeafletMaptilerSDKOptions): MaptilerLayer;

  const MapTilerStyle: MapStyleType;
  const mapTilerStyle: MapStyleType;
  const MaptilerLanguage: Language;
  const maptilerLanguage: Language;
}
