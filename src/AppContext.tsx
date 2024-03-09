import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react"
import { partition, take, times } from "lodash-es"
import { faker } from "@faker-js/faker"

export enum AspectRatio {
  FourThree = 1.33,
  SixteenNine = 1.78,
}

export type Participant = {
  id: string
  fullName: string
  firstName: string
  isOnscreen: boolean
}

export type AppState = {
  participants: Array<Participant>
  onScreenParticipants: Array<Participant>
  addParticipant: () => void
  removeParticipant: (id: Participant["id"]) => void
  aspectRatio: AspectRatio
  setAspectRatio: (ar: AspectRatio) => void
}

const MAX_ONSCREEN_PARTICIPANTS = 49

const DEFAULT_PARTICIPANTS = times(3, generateParticipant)

const defaultState: AppState = {
  participants: [],
  onScreenParticipants: [],
  addParticipant: () => {},
  removeParticipant: () => {},
  aspectRatio: AspectRatio.SixteenNine,
  setAspectRatio: () => {},
}

export const AppContext = createContext(defaultState)

export function useAppState() {
  const state = useContext(AppContext)

  return state
}

export function AppContextWrapper({ children }: { children: React.ReactNode }) {
  const [participants, setParticipants] = useState(DEFAULT_PARTICIPANTS)
  const [aspectRatio, setAspectRatio] = useState(AspectRatio.SixteenNine)

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

  const addParticipant = useCallback(() => {
    const participant: Participant = generateParticipant()
    setParticipants(current => [...current, participant])
  }, [setParticipants])

  const removeParticipant = useCallback(
    (id: Participant["id"]) => {
      setParticipants(current => current.filter(p => p.id !== id))
    },
    [setParticipants]
  )

  return (
    <AppContext.Provider
      value={{
        participants,
        onScreenParticipants,
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

// helper function to generate fake participant
function generateParticipant(): Participant {
  return {
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    firstName: faker.person.firstName(),
    isOnscreen: false,
  }
}
