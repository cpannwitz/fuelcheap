import { Handler } from '@netlify/functions'
import axios from 'axios'

const handler: Handler = async (event, context) => {
  console.log(`LOG |  ~ file: get-stations.ts ~ line 5 ~ consthandler:Handler= ~ context`, context)
  console.log(`LOG |  ~ file: get-stations.ts ~ line 5 ~ consthandler:Handler= ~ event`, event)
  console.log('ENV:', process.env.TANKERKOENIG_API_KEY)

  const res = await axios.get('https://creativecommons.tankerkoenig.de/json/list.php', {
    params: {
      lat: 51.084528,
      lng: 13.727638,
      rad: 25,
      // sort: 'dist',
      sort: 'price',
      // type: 'all',
      type: 'e10',
      apikey: process.env.TANKERKOENIG_API_KEY
    }
  })

  return {
    statusCode: 200,
    // body: JSON.stringify({ message: 'Hello World' })
    body: JSON.stringify(res.data)
  }
}

export { handler }
