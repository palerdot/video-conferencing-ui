import React, { useState, Suspense, lazy } from "react"
import {
  PhoneXMarkIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"

import { type Participant, type AppState } from "../../AppContext"

interface Props extends Participant {
  removeParticipant: AppState["removeParticipant"]
  width: number
  height: number
}

// ref: https://react.dev/reference/react/lazy
// lazy video component
const Video = lazy(() => import("../Video"))

function ParticipantGrid({
  id,
  fullName,
  removeParticipant,
  width,
  height,
  loaded,
}: Props) {
  const [video, setVideo] = useState(false)

  return (
    <div
      className="w-full h-full p-1 rounded-lg shadow-lg bg-transparent delay-50 duration-250 transition-all"
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
      <div className="bg-slate-700 relative flex justify-center h-full w-full overflow-hidden rounded-lg aspect-auto">
        {video ? (
          <Suspense
            fallback={
              <div className="mt-4">
                <Loading />
              </div>
            }
          >
            <Video />
          </Suspense>
        ) : (
          <div
            className={`${
              loaded ? "flex" : "hidden"
            } flex-col justify-center w-full items-center`}
          >
            <div className="text-blue-300 text-sm truncate max-w-fit">
              {`${fullName}`}
            </div>

            <div>
              <UserCircleIcon className="w-16 h-16 text-blue-300" />
            </div>
          </div>
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
              removeParticipant(id)
            }}
          >
            <PhoneXMarkIcon className="w-full h- text-red-400" />
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
      className="w-10 h-10 p-2 cursor-pointer rounded-full bg-slate-800 border-slate-600 hover:bg-slate-700"
    >
      {children}
    </button>
  )
}

function Loading() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-blue-300"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}
