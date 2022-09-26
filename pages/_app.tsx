import type { AppProps } from 'next/app'

function FormApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default FormApp
