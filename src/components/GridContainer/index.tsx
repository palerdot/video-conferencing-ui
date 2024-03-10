import { useRef, useState, useEffect, useMemo } from "react"
import { debounce, isEqual } from "lodash-es"

import useAppState from "../../hooks/useAppState"
import { calculate_grid_dimension, type Dimension } from "../../utils"
import ParticipantGrid from "./ParticipantGrid"

function GridContainer() {
  const { onScreenParticipants, aspectRatio, removeParticipant } = useAppState()
  // conference grid container layout dimension; will be updated by resise observer
  const [dimension, setDimension] = useState<Dimension>({ width: 0, height: 0 })
  const container = useRef<HTMLDivElement>(null)

  const dimensionObserver = useMemo(() => {
    return debounce((dimension: Dimension) => {
      setDimension(oldDimension => {
        if (isEqual(oldDimension, dimension)) {
          return oldDimension
        }

        return dimension
      })
    }, 150)
  }, [setDimension])

  // individual grid dimension
  const gridDimension = useMemo(() => {
    return calculate_grid_dimension({
      dimension,
      total_grids: onScreenParticipants.length,
      aspect_ratio: aspectRatio,
    })
  }, [dimension, aspectRatio, onScreenParticipants])

  useEffect(() => {
    if (container === null) {
      return
    }

    if (!container.current) {
      return
    }

    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const cr = entry.contentRect

        dimensionObserver({
          width: cr.width,
          height: cr.height,
        })
      }
    })

    // Observe one or multiple elements
    // ref: https://web.dev/articles/resize-observer
    ro.observe(container.current)
  }, [container, dimensionObserver])

  return (
    <div
      ref={container}
      className="overflow-hidden transition-all duration-200 flex w-full h-full flex-row flex-wrap place-content-center"
    >
      {onScreenParticipants.map(participant => (
        <ParticipantGrid
          key={participant.id}
          {...participant}
          {...gridDimension}
          removeParticipant={removeParticipant}
        />
      ))}
    </div>
  )
}

export default GridContainer
