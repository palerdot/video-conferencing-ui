import { describe, test, expect } from "vitest"

import { AspectRatio } from "./AppContext"
import { calculate_grid_dimension } from "./utils"

describe("grid dimensions test", () => {
  test("landscape fit works fine", () => {
    const output = calculate_grid_dimension({
      total_grids: 3,
      dimension: {
        width: 1440,
        height: 464,
      },
      aspect_ratio: AspectRatio.SixteenNine,
    })

    expect(output).toMatchObject({
      width: 480,
      height: 269.66,
    })
  })

  test("portrait fit works fine", () => {
    const output = calculate_grid_dimension({
      total_grids: 3,
      dimension: {
        width: 744,
        height: 685,
      },
      aspect_ratio: AspectRatio.SixteenNine,
    })

    expect(output).toMatchObject({
      width: 405.84,
      height: 228,
    })
  })

  test("square fit works fine", () => {
    const output = calculate_grid_dimension({
      total_grids: 3,
      dimension: {
        width: 1184,
        height: 464,
      },
      aspect_ratio: AspectRatio.SixteenNine,
    })

    expect(output).toMatchObject({
      width: 412.96,
      height: 232,
    })
  })
})
