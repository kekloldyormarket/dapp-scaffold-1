export type CustomError = BoardPositionOccupied | InvalidBoardPosition | BadTeam

export class BoardPositionOccupied extends Error {
  static readonly code = 6000
  readonly code = 6000
  readonly name = "BoardPositionOccupied"
  readonly msg = "This board position is already occupied by another piece"

  constructor(readonly logs?: string[]) {
    super("6000: This board position is already occupied by another piece")
  }
}

export class InvalidBoardPosition extends Error {
  static readonly code = 6001
  readonly code = 6001
  readonly name = "InvalidBoardPosition"
  readonly msg = "Invalid board position"

  constructor(readonly logs?: string[]) {
    super("6001: Invalid board position")
  }
}

export class BadTeam extends Error {
  static readonly code = 6002
  readonly code = 6002
  readonly name = "BadTeam"
  readonly msg = "Invalid team"

  constructor(readonly logs?: string[]) {
    super("6002: Invalid team")
  }
}

export function fromCode(code: number, logs?: string[]): CustomError | null {
  switch (code) {
    case 6000:
      return new BoardPositionOccupied(logs)
    case 6001:
      return new InvalidBoardPosition(logs)
    case 6002:
      return new BadTeam(logs)
  }

  return null
}
