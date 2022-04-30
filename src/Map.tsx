import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import { TStationsBasic } from './types'
import useDarkMode from './useDarkMode'
import positionSVG from './position.png'

interface MapProps {
  position: { lng: number; lat: number }
  stations: TStationsBasic
}

const positionIcon = new Icon({
  iconUrl: positionSVG,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
})

const tilemapLight = `https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png`
const tilemapDark = `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png`
const attribution =
  '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
const zoomLevel = 13

const Map = ({ position, stations }: MapProps) => {
  const isDarkMode = useDarkMode()

  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={zoomLevel}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution={attribution}
        url={isDarkMode ? tilemapDark : tilemapLight}
        detectRetina={true}
      />
      <Marker icon={positionIcon} position={[position.lat, position.lng]} />
      {stations.map(station => (
        <Marker key={station.id} position={[station.lat, station.lng]}>
          <Popup>
            <b>{station.brand}</b>
            {station.price ? (
              <div className="station-tag tag-orange">
                <b>{station.price}</b> €
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between'
                }}
              >
                <div className="station-tag tag-orange">
                  E10: <b>{station.e10?.toFixed(2)}</b> €
                </div>

                <div className="station-tag tag-teal">
                  E5: <b>{station.e5?.toFixed(2)}</b> €
                </div>

                <div className="station-tag tag-purple">
                  Diesel: <b>{station.diesel?.toFixed(2)}</b> €
                </div>
              </div>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default Map
