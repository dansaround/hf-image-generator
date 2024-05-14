import { HfInference } from "@huggingface/inference";
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

function App() {
  const HF_TOKEN = import.meta.env.VITE_API_KEY;
  const inference = new HfInference(HF_TOKEN);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState<null | Blob>(null);
  /* "award winning high resolution photo of a giant tortoise/((ladybird)) hybrid, [trending on artstation]" */

  const createImage = async () => {
    setIsLoading(true);
    const result = await inference.textToImage({
      model: "stabilityai/stable-diffusion-2",
      inputs: inputText,
      parameters: {
        negative_prompt: "blurry",
      },
    });
    setIsLoading(false);
    setImageData(result);
  };

  useEffect(() => {
    console.log(inputText);
  }, [inputText]);

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
          <input
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            className="px-4 py-2"
            type="text"
          />
          <button
            onClick={createImage}
            className=" ml-4 inline-flex px-10 h-8 items-center justify-around rounded-md bg-gray-900 text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          >
            {!isLoading ? (
              "Generar Imagen"
            ) : (
              <>
                <span className="mx-3">Generando Imagen </span>
                <PacmanLoader color="#36d7b7" size={15} />
              </>
            )}
          </button>
        </div>
        <div className="max-w-96 flex flex-col justify-center items-center fit-content ">
          {imageData && (
            <img
              src={URL.createObjectURL(imageData)}
              alt="Generated AI Image with the prompt"
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
