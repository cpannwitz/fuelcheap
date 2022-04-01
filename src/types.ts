import * as RT from 'runtypes'

export const StationBasic = RT.Record({
  id: RT.String, // UUID, eindeutige Tankstellen-ID
  name: RT.String, // String, Name
  brand: RT.String, // String, Marke
  street: RT.String, // String, Straße
  place: RT.String, // String, Ort
  houseNumber: RT.String, // String, Hausnummer
  postCode: RT.String, // integer, PLZ
  lat: RT.Number, // float, geographische Breite
  lng: RT.Number, // float, geographische Länge
  dist: RT.Number, // float, Entfernung zum Suchstandort in km
  diesel: RT.Number.optional(), // float, Spritpreise in Euro
  e5: RT.Number.optional(), // float, Spritpreise in Euro
  e10: RT.Number.optional(), // float, Spritpreise in Euro
  price: RT.Number.optional(), // float, Spritpreise in Euro
  isOpen: RT.Boolean // boolean, true, wenn die Tanke zum Zeitpunkt der Abfrage offen hat, sonst false
})
export type TStationBasic = RT.Static<typeof StationBasic>

const StationsBasic = RT.Array(StationBasic)
export type TStationsBasic = RT.Static<typeof StationsBasic>

export const RadiusSearchParams = RT.Record({
  lat: RT.Number,
  lng: RT.Number,
  rad: RT.Number.withConstraint(n => n <= 25 && n >= 1), //max 25
  type: RT.Union(
    RT.Literal('e5'),
    RT.Literal('e10'),
    RT.Literal('diesel'),
    RT.Literal('all')
  ),
  sort: RT.Union(RT.Literal('price'), RT.Literal('dist')),
  apikey: RT.String
})
export type TRadiusSearchParams = RT.Static<typeof RadiusSearchParams>

export const RadiusSearchParamsResult = RT.Record({
  data: RT.String,
  license: RT.String,
  ok: RT.Boolean,
  stations: RT.Array(StationBasic),
  status: RT.String,
  message: RT.String
})
export type TRadiusSearchParamsResult = RT.Static<
  typeof RadiusSearchParamsResult
>
