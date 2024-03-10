import { useState } from "react"
import {
  TvIcon,
  UserPlusIcon,
  UserMinusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import { random } from "lodash-es"
import "./App.css"

import { AppContextWrapper } from "./AppContext"
import useAppState from "./hooks/useAppState"
import { AspectRatio } from "./utils"
import GridContainer from "./components/GridContainer"
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <AppContextWrapper>
      <ConferenceUI />
    </AppContextWrapper>
  )
}

export default App

function ConferenceUI() {
  const {
    aspectRatio,
    setAspectRatio,
    addParticipant,
    removeParticipant,
    participants,
    onScreenParticipants,
  } = useAppState()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex overflow-x-hidden h-screen w-screen">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 text-green-300 overlflow-hidden">
          <GridContainer />
        </main>
        <div className="relative h-16 flex flex-row justify-center items-center space-x-4 p-1 pb-4">
          <div className="flex flex-row items-center justify-center space-x-2">
            <button
              onClick={() => {
                // remove a random onscreen user
                const rand = random(0, onScreenParticipants.length - 1)
                const participant = onScreenParticipants[rand]
                removeParticipant(participant.id)
              }}
              className="w-12 h-12 p-2 cursor-pointer rounded-full border text-red-400 bg-slate-800 hover:bg-slate-700 border-slate-600"
            >
              <UserMinusIcon className="w-full h-full" />
            </button>
            <button
              onClick={() => addParticipant()}
              className="w-12 h-12 p-2 cursor-pointer rounded-full border text-blue-300 bg-slate-800 hover:bg-slate-700 border-slate-600"
            >
              <UserPlusIcon className="w-full h-full" />
            </button>
          </div>

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
          <button
            className="absolute right-4 flex flex-row items-center border rounded-md font-semibold px-4 py-2 bg-slate-800 border-slate-600 text-blue-300 hover:bg-slate-700"
            onClick={() => setOpen(status => !status)}
          >
            <UserGroupIcon className="w-6 h-6 mr-2" />
            {participants.length}
          </button>
        </div>
      </div>
      <aside
        className={`flex-shrink-0 w-64 flex flex-col border-r transition-all duration-250 ${
          open ? "" : "-mr-64"
        }`}
      >
        <Sidebar close={() => setOpen(false)} />
      </aside>
    </div>
  )
}
