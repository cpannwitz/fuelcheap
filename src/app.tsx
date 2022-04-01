import { useState } from 'preact/hooks'
import getStations from './getStations'
import { TStationsBasic } from './types'
import DirectionsIcon from './directions.svg'

const apikey = import.meta.env.VITE_TANKERKOENIG_API_KEY ?? ''

function getPosition(options?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  )
}
async function onGetLocation() {
  const position = await getPosition()
  const { latitude, longitude } = position.coords
  return { lng: longitude, lat: latitude }
}

export function App() {
  const [stations, setStations] = useState<TStationsBasic>([])
  const [stationsLoading, setStationsLoading] = useState(false)

  const [sort, setSort] = useState<'dist' | 'price'>('dist')
  function onSortChange(e: any) {
    setSort(e.target.value)
  }

  const [type, setType] = useState<'all' | 'e5' | 'e10' | 'diesel'>('all')
  function onTypeChange(e: any) {
    setType(e.target.value)
    if (e.target.value === 'all') {
      setSort('dist')
    }
  }

  const [rad, setRad] = useState(10)
  function onRadChange(e: any) {
    setRad(e.target.value)
  }

  async function onInit() {
    try {
      setStationsLoading(true)
      const { lng, lat } = await onGetLocation()
      const stations = await getStations({ lat, lng, rad, type, sort, apikey })
      setStations(stations)
      setStationsLoading(false)
    } catch (error) {
      alert('Error with location or stations.')
    }
  }

  return (
    <>
      <button onClick={onInit} aria-busy={stationsLoading}>
        {stationsLoading ? 'Lädt' : 'Go'}
      </button>
      <hr />

      <fieldset style={{ display: 'flex', justifyContent: 'space-between' }}>
        <legend>Kraftstoff</legend>
        <label for="large">
          <input
            type="radio"
            id="all"
            name="fuel"
            value="all"
            onChange={onTypeChange}
            checked={type === 'all'}
          />
          Alle
        </label>
        <label for="large">
          <input
            type="radio"
            id="e10"
            name="fuel"
            value="e10"
            onChange={onTypeChange}
            checked={type === 'e10'}
          />
          E10
        </label>
        <label for="medium">
          <input
            type="radio"
            id="e5"
            name="fuel"
            value="e5"
            onChange={onTypeChange}
            checked={type === 'e5'}
          />
          E5
        </label>
        <label for="small">
          <input
            type="radio"
            id="diesel"
            name="fuel"
            value="diesel"
            onChange={onTypeChange}
            checked={type === 'diesel'}
          />
          Diesel
        </label>
      </fieldset>

      {type !== 'all' && (
        <select id="sort" required onChange={onSortChange}>
          <option value="dist" selected={sort === 'dist'}>
            Nach Entfernung sortiert
          </option>
          <option value="price" selected={sort === 'price'}>
            Nach Preis sortiert
          </option>
        </select>
      )}

      <label for="range">
        Radius - {rad} km
        <input
          type="range"
          min="1"
          max="25"
          id="range"
          name="range"
          value={rad}
          onChange={onRadChange}
        />
      </label>

      <div>
        {stations
          .filter(station => station.isOpen === true)
          .map(station => (
            <article className="station" key={station.id}>
              <div>
                <div className="headings">
                  <h2>{station.brand}</h2>
                  <p>
                    {station.dist} km -{' '}
                    {station.isOpen ? <ins>Open</ins> : <del>Closed</del>} -{' '}
                    {station.street} {station.houseNumber}, {station.postCode}{' '}
                    {station.place}
                  </p>
                </div>
                {station.price ? (
                  <>
                    <div className="station-tag tag-orange">
                      {type}: <b>{station.price}</b> €
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      display: 'flex',
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
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${station.lat},${station.lng}`}
              >
                <img
                  className="station-direction"
                  src={DirectionsIcon}
                  alt="directions"
                />
              </a>
            </article>
          ))}
      </div>
    </>
  )
}
