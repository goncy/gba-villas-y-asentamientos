export const GUID = 'VILLA-Y-ASENT-PRECA'
export const API_KEY = '259d111f7b8978f963c12001c8f85018d43b1b2b'
export const RESOURCE_URL = `http://api.datos.gba.gob.ar/api/v2/datastreams/${GUID}/data.ajson/?auth_key=${API_KEY}`
export const DEFAULT_ZOOM = 10
export const GET_MAP_OPTIONS = maps => ({
  mapTypeId: maps.MapTypeId.SATELLITE
})
export const DEFAULT_STYLE = {
  position: 'relative',
  margin: 0,
  padding: 0,
  flex: 1,
}
export const MAP_CENTER = {
  lat: -34.8804504,
  lng: -58.5923888
}

