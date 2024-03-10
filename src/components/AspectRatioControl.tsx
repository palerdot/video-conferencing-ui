import { TvIcon } from "@heroicons/react/24/outline"

import { AspectRatio } from "../utils"
import useAppState from "../hooks/useAppState"

function AspectRatioControl() {
  const { aspectRatio, setAspectRatio } = useAppState()

  return (
    <div className="px-4 flex flex-row items-center justify-center space-x-2">
      <button
        className={`flex flex-row items-center border rounded-md font-semibold px-4 py-2 ${
          aspectRatio === AspectRatio.SixteenNine
            ? "bg-slate-700 border-slate-500 text-blue-300 "
            : "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-800"
        }`}
        onClick={() => setAspectRatio(AspectRatio.SixteenNine)}
      >
        <TvIcon className="w-5 h-5 mr-2" />
        {"16:9"}
      </button>
      <button
        className={`flex flex-row items-center border rounded-md font-semibold px-4 py-2 ${
          aspectRatio === AspectRatio.FourThree
            ? "bg-slate-700 border-slate-500 text-blue-300 "
            : "bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-800"
        }`}
        onClick={() => setAspectRatio(AspectRatio.FourThree)}
      >
        <TvIcon className="w-5 h-5 mr-2" />
        {"4:3"}
      </button>
    </div>
  )
}

export default AspectRatioControl
