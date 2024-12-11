import packagejson from "../../package.json";

const registeredMaps = [];

function registerTelemetry(map) {
  if (registeredMaps.includes(map._mapId)) {
    return;
  }

  /**
   * TODO: Remove when telemetry will be implemented
   */
  map.telemetry = {
    registerModule: (name, version) => {
      console.log(`Telemetry module registered: ${name} ${version}`);
    },
  };
  /* *** */

  map.telemetry.registerModule(packagejson.name, packagejson.version);

  registeredMaps.push(map._mapId);
}

export { registerTelemetry };
