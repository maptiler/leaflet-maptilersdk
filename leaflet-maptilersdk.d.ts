import * as L from 'leaflet';
import { Map, MapOptions } from '@maptiler/sdk';


declare module 'leaflet' {
    type LeafletMaptilerSDKOptions = Omit<MapOptions, "container">;

    class MaptilerSDK extends L.Layer {
        constructor(options: LeafletMaptilerSDKOptions);
        getMaptilerMap(): Map
        getCanvas(): HTMLCanvasElement
        getSize(): L.Point
        getBounds(): L.LatLngBounds
        getContainer(): HTMLDivElement
        getPaneName(): string
    }

    function maptilerSDK(options: LeafletMaptilerSDKOptions): MaptilerSDK;

}
