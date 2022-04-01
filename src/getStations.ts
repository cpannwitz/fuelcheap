import axios from 'axios'
import {
  RadiusSearchParams,
  TRadiusSearchParams,
  TRadiusSearchParamsResult
} from './types'

function getStations(searchParams: TRadiusSearchParams) {
  const params = RadiusSearchParams.check(searchParams)
  return axios
    .get<TRadiusSearchParamsResult>(
      'https://creativecommons.tankerkoenig.de/json/list.php',
      {
        params
      }
    )
    .then(res => res.data.stations)
}

export default getStations
