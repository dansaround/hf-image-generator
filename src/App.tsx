import { HfInference } from "@huggingface/inference";
import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";

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
    <main
      className={`font-poppins ${
        imageData ? "h-full" : "h-dvh "
      } flex flex-col items-center justify-center  bg-gray-200 dark:bg-gray-800 py-10 md:py-18 lg:py-16 xl:py-20`}
    >
      <div className="container  max-w-[360px] sm:max-w-[580px]  md:max-w-[768px] flex flex-col items-center justify-center px-4 md:px-6 dark:bg-slate-900 bg-slate-300 rounded-xl p-4">
        <div className="mb-8">
          <h1 className="dark:text-neutral-100 text-slate-800 text-4xl font-bold tracking-tighter sm:text-3xl md:text-6xl lg:text-7xl text-center">
            Image Generator
          </h1>
          <h3 className="dark:text-neutral-100 md:text-xl text-slate-800 italic tracking-tighter text-center my-6 sm: text-lg">
            by @dansaround.dev
          </h3>
          <p className="dark:text-neutral-300 text-slate-700 my-8">
            The following project was created using Huggingface.js Inference API
            ! Feel free to try out this image generator by writing something to
            generate an image, for example:
          </p>
          <span className="dark:text-neutral-400 text-slate-700 text-sm max-w-72 italic text-left">
            "award winning high resolution photo of a giant
            tortoise/((ladybird)) hybrid, [trending on artstation]"
          </span>
        </div>
        <div className="flex items-center justify-center mb-8 w-full bg-slate-600 rounded-md p-2">
          <input
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            className="pl-4 py-2 rounded-md md:w-2/5 w-44"
            type="text"
          />
          <button
            onClick={createImage}
            disabled={isLoading}
            className=" ml-4 px-4 h-8 items-center justify-around rounded-md bg-gray-900 text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 "
          >
            {!isLoading ? "Create" : <DotLoader color="#36d7b7" size={20} />}
          </button>
        </div>
        <div className="max-w-68 flex flex-col justify-center items-center fit-content">
          {imageData && (
            <img
              className="max-h-[650px]"
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
