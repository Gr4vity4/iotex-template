export default function Main({ component: Component, pageProps }: any) {
  return (
    <main className="container max-w-screen-xl grid-cols-12 mx-auto lg:grid">
      {pageProps?.column === 1 ? (
        <div className="col-span-12">
          <Component {...pageProps} />
        </div>
      ) : (
        <>
          {/* <div className="flex col-span-2">
            <Sidebar />
          </div> */}
          <div className="col-span-12">
            <Component {...pageProps} />
          </div>
        </>
      )}
    </main>
  )
}
