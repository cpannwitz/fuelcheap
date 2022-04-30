import { useMedia } from 'react-use'

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

function useDarkMode(): boolean {
  const isDarkOS = useMedia(COLOR_SCHEME_QUERY)
  return isDarkOS
}

export default useDarkMode
