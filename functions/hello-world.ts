import { Handler } from '@netlify/functions'

const handler: Handler = async (event, context) => {
  console.log(`LOG |  ~ file: hello-world.ts ~ line 4 ~ consthandler:Handler= ~ context`, context)
  console.log(`LOG |  ~ file: hello-world.ts ~ line 4 ~ consthandler:Handler= ~ event`, event)
  console.log('ENV:', process.env.TANKERKOENIG_API_KEY)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' })
  }
}

export { handler }
