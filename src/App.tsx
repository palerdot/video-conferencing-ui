import { useState } from "react"
import "./App.css"

import { AppContextWrapper, useAppState, AspectRatio } from "./AppContext"
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
  const { setAspectRatio, addParticipant, onScreenParticipants } = useAppState()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex overflow-x-hidden h-screen w-screen">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 text-green-300 overlflow-hidden">
          <GridContainer />
        </main>
        <div className="h-12 space-x-4">
          <button onClick={() => setOpen(status => !status)}>
            {"Sidebar"}
          </button>
          <button
            onClick={() => addParticipant()}
          >{`Add User ${onScreenParticipants.length}`}</button>
          <button onClick={() => setAspectRatio(AspectRatio.SixteenNine)}>
            {"16:9"}
          </button>
          <button onClick={() => setAspectRatio(AspectRatio.FourThree)}>
            {"4:3"}
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
