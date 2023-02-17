export type CustomError = BadArtithmetic | AlreadyClaimed | BadTeam

export class BadArtithmetic extends Error {
  static readonly code = 6000
  readonly code = 6000
  readonly name = "BadArtithmetic"
  readonly msg = "Encountered an arithmetic error"

  constructor(readonly logs?: string[]) {
    super("6000: Encountered an arithmetic error")
  }
}

export class AlreadyClaimed extends Error {
  static readonly code = 6001
  readonly code = 6001
  readonly name = "AlreadyClaimed"
  readonly msg = "some1 lives here"

  constructor(readonly logs?: string[]) {
    super("6001: some1 lives here")
  }
}

export class BadTeam extends Error {
  static readonly code = 6002
  readonly code = 6002
  readonly name = "BadTeam"
  readonly msg = "naughty naughty"

  constructor(readonly logs?: string[]) {
    super("6002: naughty naughty")
  }
}

export function fromCode(code: number, logs?: string[]): CustomError | null {
  switch (code) {
    case 6000:
      return new BadArtithmetic(logs)
    case 6001:
      return new AlreadyClaimed(logs)
    case 6002:
      return new BadTeam(logs)
  }

  return null
}
