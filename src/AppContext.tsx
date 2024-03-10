import { createContext, useState, useEffect, useCallback, useMemo } from "react"
import { partition, take, delay } from "lodash-es"

import {
  DEFAULT_PARTICIPANTS,
  generateParticipant,
  MAX_ONSCREEN_PARTICIPANTS,
  AspectRatio,
} from "./utils"

export type Participant = {
  id: string
  fullName: string
  firstName: string
  isOnscreen: boolean
  // primarily for entry/exit animations, but in real world app could have other uses
  loaded: boolean
}

export type AppState = {
  totalParticipants: number
  participants: Array<Participant>
  onScreenParticipants: Array<Participant>
  addParticipant: () => void
  removeParticipant: (id: Participant["id"]) => void
  aspectRatio: AspectRatio
  setAspectRatio: (ar: AspectRatio) => void
}

const defaultState: AppState = {
  totalParticipants: 0,
  participants: [],
  onScreenParticipants: [],
  addParticipant: () => {},
  removeParticipant: () => {},
  aspectRatio: AspectRatio.SixteenNine,
  setAspectRatio: () => {},
}

export const AppContext = createContext(defaultState)

export function AppContextWrapper({ children }: { children: React.ReactNode }) {
  const [participants, setParticipants] = useState(DEFAULT_PARTICIPANTS)
  const [aspectRatio, setAspectRatio] = useState(AspectRatio.SixteenNine)

  // entry animation for default participants
  useEffect(() => {
    delay(() => {
      setParticipants(current => {
        return current.map(p => {
          return {
            ...p,
            loaded: true,
          }
        })
      })
    }, 150)
  }, [setParticipants])

  // calculate onscreen participants based on participants
  useEffect(() => {
    const [onScreen, offScreen] = partition(
      participants,
      p => p.isOnscreen === true
    )

    // if there is already enough onscreen participants, don't do anything
    if (onScreen.length === MAX_ONSCREEN_PARTICIPANTS) {
      return
    }

    // if there is no offscreen participants, don't do anything
    if (offScreen.length === 0) {
      return
    }

    // on screen participants to fill
    const FILL_COUNT = MAX_ONSCREEN_PARTICIPANTS - onScreen.length
    const pendingOnScreenParticipants = take(offScreen, FILL_COUNT)

    setParticipants(currentParticipants => {
      return currentParticipants.map(participant => {
        // update on screen status for pending participants
        const is_pending = pendingOnScreenParticipants.find(
          p => p.id === participant.id
        )

        if (is_pending) {
          return {
            ...participant,
            isOnscreen: true,
          }
        }

        return participant
      })
    })
  }, [participants, setParticipants])

  // on screen participants
  const onScreenParticipants = useMemo(() => {
    const [onScreen] = partition(participants, p => p.isOnscreen === true)

    return onScreen
  }, [participants])

  // total participants count
  const totalParticipants = useMemo(() => {
    return participants.length
  }, [participants])

  const addParticipant = useCallback(() => {
    const participant: Participant = generateParticipant()
    // initially participant will be added in not loaded state
    setParticipants(current => [...current, participant])
    // setting loading to true for entry animation
    delay(() => {
      setParticipants(current => {
        return current.map(p => {
          if (p.id === participant.id) {
            return {
              ...p,
              loaded: true,
            }
          }
          return p
        })
      })
    }, 150)
  }, [setParticipants])

  const removeParticipant = useCallback(
    (id: Participant["id"]) => {
      // set loaded: false for exit animation
      setParticipants(current => {
        return current.map(p => {
          if (p.id === id) {
            return {
              ...p,
              loaded: false,
            }
          }
          return p
        })
      })

      // and remove the participant after a delay
      delay(() => {
        setParticipants(current => current.filter(p => p.id !== id))
      }, 515)
    },
    [setParticipants]
  )

  return (
    <AppContext.Provider
      value={{
        participants,
        onScreenParticipants,
        totalParticipants,
        addParticipant,
        removeParticipant,
        aspectRatio,
        setAspectRatio,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
