function App() {
  return (
    <main className="font-poppins w-full h-full py-24 md:py-18 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h1 className="dark:text-neutral-100 text-slate-800 text-4xl font-bold tracking-tighter sm:text-3xl md:text-6xl lg:text-7xl">
            Image Generator
          </h1>
          <h3 className="dark:text-neutral-100 text-slate-800  tracking-tighter">
            por @dansaround.dev
          </h3>
          <p className="dark:text-neutral-300 text-slate-700">
            Escribe algo para poder generar una imagen
          </p>
        </div>
        <div>
          <input className="px-4 py-2" type="text" />
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
            Generar Imagen
          </button>
        </div>
        <div className="result-container"></div>
      </div>
    </main>
  );
}

export default App;
