import { useState, useLayoutEffect, useRef } from "react"
import { FixedSizeList as List } from "react-window"
import {
  XMarkIcon,
  UserGroupIcon,
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline"

import { type Participant, useAppState } from "../AppContext"

const Row = ({
  index,
  style,
  data,
}: {
  index: number
  style: any
  data: Array<Participant>
}) => {
  const { removeParticipant } = useAppState()
  const participant = data[index]

  if (!participant) {
    return null
  }

  return (
    <div
      style={style}
      className="border-b border-slate-700 flex items-center px-2 flex-row justify-between"
    >
      <div className="flex flex-row items-center w-5/6">
        <UserIcon
          className={`w-5 h-5 mr-2 ${
            participant.isOnscreen ? "text-blue-400" : "text-slate-400"
          }`}
        />
        <div className="text-sm text-gray-300 truncate w-fit text-ellipsis">
          {participant.fullName}
        </div>
      </div>
      <div className="w-1/6 flex justify-end">
        <ArrowLeftStartOnRectangleIcon
          className="w-6 h-6 text-red-400 hover:text-red-500 cursor-pointer hover:bg-slate-200 rounded-full p-0.5"
          onClick={() => {
            removeParticipant(participant.id)
          }}
        />
      </div>
    </div>
  )
}

type Props = {
  close: () => void
}

function Sidebar({ close }: Props) {
  const { participants } = useAppState()
  const [height, setHeight] = useState(500)
  const container = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (container.current) {
      const containerHeight = container.current.getBoundingClientRect().height
      setHeight(containerHeight - 48)
    }
  }, [])

  return (
    <nav
      ref={container}
      className="overflow-hidden flex-1 flex flex-col border border-gray-800 rounded-md bg-slate-800 text-gray-200"
    >
      <div className="h-[48px] border-b border-slate-700 flex items-center justify-between p-2 pr-1">
        <div className="flex flex-row items-center">
          <UserGroupIcon className="w-6 h-6 text-blue-400 mr-2" />
          <span className="text-base font-medium text-blue-400">
            {`${participants.length} in call`}
          </span>
        </div>
        <XMarkIcon
          className="w-8 h-8 hover:bg-slate-700 rounded-full p-0.5"
          onClick={() => close()}
        />
      </div>
      <List
        className="overflow-x-hidden"
        height={height}
        itemCount={participants.length}
        itemSize={48}
        width={256}
        itemData={participants}
        itemKey={(index, data) => {
          const person = data[index]
          return person ? person.id : index
        }}
      >
        {Row}
      </List>
    </nav>
  )
}

export default Sidebar
