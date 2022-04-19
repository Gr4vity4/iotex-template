import Head from 'next/head'

export default function Root({ children }: any) {
  return (
    <>
      <Head>
        <title>Fermented Blockchain Lab (CNX)</title>
      </Head>
      <div>{children}</div>
    </>
  )
}
