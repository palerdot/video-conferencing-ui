import { useContext } from "react"

import { AppContext } from "../AppContext"

function useAppState() {
  const state = useContext(AppContext)

  return state
}

export default useAppState
