import { useTransition } from "react"
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/outline"
import { random } from "lodash-es"

import useAppState from "../hooks/useAppState"

function UserControl() {
  const [_isPending, startTransition] = useTransition()
  const { addParticipant, removeParticipant, onScreenParticipants } =
    useAppState()

  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      <button
        onClick={() => {
          // remove a random onscreen user
          const rand = random(0, onScreenParticipants.length - 1)
          const participant = onScreenParticipants[rand]
          startTransition(() => {
            removeParticipant(participant.id)
          })
        }}
        className="w-12 h-12 p-2 cursor-pointer rounded-full border text-red-400 bg-slate-800 hover:bg-slate-700 border-slate-600"
      >
        <UserMinusIcon className="w-full h-full" />
      </button>
      <button
        onClick={() => {
          startTransition(() => {
            addParticipant()
          })
        }}
        className="w-12 h-12 p-2 cursor-pointer rounded-full border text-blue-300 bg-slate-800 hover:bg-slate-700 border-slate-600"
      >
        <UserPlusIcon className="w-full h-full" />
      </button>
    </div>
  )
}

export default UserControl
