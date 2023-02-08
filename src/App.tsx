import "./index.css";

function App() {
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-violet-400 via-purple-200 to-zinc-200 h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col md:px-10 lg:p-24 h-full lg:h-[500px] bg-violet-600 bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded align-center justify-center gap-8 text-center">
        <h1 className="text-3xl text-center text-zinc-800 uppercase font-thin">
          Weather <span className="font-bold">
            Forecast
            </span> 
        </h1>
        <p className="text-zinc-600">
          Enter below a place you want to know the weather of and select an
          option from the dropwdown
        </p>
        <div className="flex align-center justify-center">

        <input
          type="text"
          className="px-2 py-1 rounded-l-md border-2 border-white outline-none focus:border-zinc-100 transition-all duration-200 w-1/2 md:w-full"
          />
        <button className="rounded-r-md border-2 border-zinc-100 hover:text-zinc-500 hover:bg-white text-zinc-100 px-2 py-1 cursor-pointer transition-all duration-200">
          Search
        </button>
          </div>
      </section>
    </main>
  );
}

export default App;
