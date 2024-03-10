import { useState } from "react"
import { UserGroupIcon } from "@heroicons/react/24/outline"
import "./App.css"

import { AppContextWrapper } from "./AppContext"
import useAppState from "./hooks/useAppState"
import UserControl from "./components/UserControl"
import AspectRatioControl from "./components/AspectRatioControl"
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
  const { totalParticipants } = useAppState()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex overflow-x-hidden h-screen w-screen bg-slate-800">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 text-green-300 overlflow-hidden">
          <GridContainer />
        </main>
        <div className="relative h-16 flex flex-row justify-center items-center space-x-4 p-1 pb-4">
          <UserControl />
          <AspectRatioControl />
          <button
            className="absolute right-4 flex flex-row items-center border rounded-md font-semibold px-4 py-2 bg-slate-800 border-slate-600 text-blue-300 hover:bg-slate-700"
            onClick={() => setOpen(status => !status)}
          >
            <UserGroupIcon className="w-6 h-6 mr-2" />
            {totalParticipants}
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
