import { Logo } from './logo'
// import { useEffect } from 'preact/hooks'
// import axios from 'axios'

export function App() {
  // process.env
  // import.meta.env.TANKERKOENIG_API_KEY

  // useEffect(() => {
  //   axios
  //     // .get(`/.netlify/functions/hello-world`)
  //     .get(`/.netlify/functions/get-stations`)
  //     .then(res => {
  //       console.log('RES:', res.data)
  //       return res.data
  //     })
  //     .catch(e => console.error(e))
  // }, [])

  return (
    <>
      <Logo />
      <p>Hello Vite + Preact!</p>
      <p>
        <a class="link" href="https://preactjs.com/" target="_blank" rel="noopener noreferrer">
          Learn Preact
        </a>
      </p>
    </>
  )
}
