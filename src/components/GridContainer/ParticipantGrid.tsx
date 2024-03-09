import React, { useState, useEffect } from "react"
import { delay } from "lodash-es"
import {
  ArrowLeftStartOnRectangleIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/24/outline"

import { type Participant, type AppState } from "../../AppContext"

interface Props extends Participant {
  removeParticipant: AppState["removeParticipant"]
  width: number
  height: number
}

function ParticipantGrid({
  id,
  fullName,
  removeParticipant,
  width,
  height,
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const [video, setVideo] = useState(false)

  useEffect(() => {
    delay(() => setLoaded(true), 150)
  }, [setLoaded])

  return (
    <div
      className="w-full h-full p-1 rounded-lg shadow-lg bg-pink-500 delay-50 duration-250 transition-all"
      style={
        loaded
          ? {
              maxWidth: `${width}px`,
              maxHeight: `${height}px`,
            }
          : {
              maxWidth: `0px`,
              maxHeight: "0px",
            }
      }
    >
      <div className="bg-purple-600 relative flex justify-center h-full w-full overflow-hidden rounded-lg aspect-auto">
        {video ? (
          <video
            className="aspect-auto"
            src={"https://samplelib.com/lib/preview/mp4/sample-5s.mp4"}
            autoPlay
            loop
          ></video>
        ) : (
          <div className="flex justify-around">{`${fullName}`}</div>
        )}
        <div className="absolute bottom-0 w-full h-10 flex items-center space-x-4 justify-center bg-transparent">
          <IconButton
            onClick={() => {
              setVideo(video => !video)
            }}
          >
            {video ? (
              <VideoCameraIcon className="w-full h-full text-blue-300" />
            ) : (
              <VideoCameraSlashIcon className="w-full h-full text-red-400" />
            )}
          </IconButton>
          <IconButton
            onClick={() => {
              setLoaded(false)
              delay(() => {
                removeParticipant(id)
              }, 150)
            }}
          >
            <ArrowLeftStartOnRectangleIcon className="text-red-400 w-full h-full" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default ParticipantGrid

function IconButton({
  onClick,
  children,
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 p-2 cursor-pointer rounded-full hover:bg-slate-700 bg-slate-800 border-slate-700"
    >
      {children}
    </button>
  )
}
