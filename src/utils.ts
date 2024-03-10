import { maxBy, round, times } from "lodash-es"
import { faker } from "@faker-js/faker"

import { type Participant } from "./AppContext"

export type Dimension = {
  width: number
  height: number
}

type GridInput = {
  dimension: Dimension
  total_grids: number
  aspect_ratio: AspectRatio
}

export enum AspectRatio {
  FourThree = 1.33,
  SixteenNine = 1.78,
}

export const MAX_ONSCREEN_PARTICIPANTS = 49

export const DEFAULT_PARTICIPANTS = times(3, generateParticipant)

// helper function to generate fake participant
export function generateParticipant(): Participant {
  return {
    id: faker.string.uuid(),
    fullName: faker.person.fullName(),
    firstName: faker.person.firstName(),
    isOnscreen: false,
    loaded: false,
  }
}

export function calculate_grid_dimension(input: GridInput): Dimension {
  // square fit (landscape and portrait)
  const square_fittings = square_fit(input)
  // horizontal/vertical fit
  const horizontal_vertical_fittings = horizontal_vertical_fit(input)

  // TODO: check if this assumption holds good for all cases
  const { width, height } = maxBy(
    [...square_fittings, ...horizontal_vertical_fittings],
    ({ width }) => {
      return width
    }
  ) || {
    width: 0,
    height: 0,
  }

  return {
    width: round(width, 2),
    height: round(height, 2),
  }
}

function square_fit(input: GridInput): Array<Dimension> {
  const { dimension, total_grids, aspect_ratio } = input
  // max squares for given grids
  const max_squares = nearest_square_root(total_grids)

  const valid_fits: Array<Dimension> = []

  // landscape square fit calculation
  const landscape_width = Math.floor(dimension.width / max_squares)
  const landscape_height = landscape_width / aspect_ratio
  const landscape_fit: Dimension = {
    width: landscape_width,
    height: landscape_height,
  }
  // landscape fit is valid only if we are able to fit all the landscape squares in given dimension
  const is_valid_landscape_fit =
    landscape_fit.width * max_squares <= dimension.width &&
    landscape_fit.height * max_squares <= dimension.height

  if (is_valid_landscape_fit) {
    valid_fits.push(landscape_fit)
  }

  // portrait square fit calculation
  const portrait_height = Math.floor(dimension.height / max_squares)
  const portrait_width = portrait_height * aspect_ratio
  const portrait_fit: Dimension = {
    width: portrait_width,
    height: portrait_height,
  }

  // portrait fit is valid only if we are able to fit all the portrait squares in given dimension
  const is_valid_portrait_fit =
    portrait_fit.width * max_squares <= dimension.width &&
    portrait_fit.height * max_squares <= dimension.height

  if (is_valid_portrait_fit) {
    valid_fits.push(portrait_fit)
  }

  return valid_fits
}

function horizontal_vertical_fit(input: GridInput): Array<Dimension> {
  const { dimension, total_grids, aspect_ratio } = input
  const valid_fits: Array<Dimension> = []

  // horizontal fit: calculating dimensions for fitting grid across length
  const horizontal_fit_width = Math.floor(dimension.width / total_grids)
  const horizontal_fit: Dimension = {
    width: horizontal_fit_width,
    height: horizontal_fit_width / aspect_ratio,
  }
  const overflow_height = dimension.height - horizontal_fit.height
  const is_valid_horizontal_fit = overflow_height < horizontal_fit.height
  // TODO: check if this exclusion logic is valid for all cases
  if (is_valid_horizontal_fit) {
    valid_fits.push(horizontal_fit)
  }

  // vertical fit: calculating dimensions for fitting grid across breadth
  const vertical_fit_height = Math.floor(dimension.height / total_grids)
  const vertical_fit: Dimension = {
    width: vertical_fit_height * aspect_ratio,
    height: vertical_fit_height,
  }
  const overflow_width = dimension.width - vertical_fit.width
  const is_valid_vertical_fit = overflow_width < vertical_fit.width
  // TODO: check if this exclusion logic is valid for all cases
  if (is_valid_vertical_fit) {
    valid_fits.push(vertical_fit)
  }

  return valid_fits
}

// find nearest square
// (ignoring numbers greater than 49 for this particular use case)
export function nearest_square_root(n: number): number {
  if (n === 1) {
    return 1
  }

  if (n > 1 && n <= 4) {
    return 2
  }

  if (n > 4 && n <= 9) {
    return 3
  }

  if (n > 9 && n <= 16) {
    return 4
  }

  if (n > 16 && n <= 25) {
    return 5
  }

  if (n > 25 && n <= 36) {
    return 6
  }

  if (n > 36 && n <= 49) {
    return 7
  }

  return 7
}
