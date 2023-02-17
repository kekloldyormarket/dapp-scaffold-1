import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh"

export interface RockJSON {
  kind: "Rock"
}

export class Rock {
  static readonly discriminator = 0
  static readonly kind = "Rock"
  readonly discriminator = 0
  readonly kind = "Rock"

  toJSON(): RockJSON {
    return {
      kind: "Rock",
    }
  }

  toEncodable() {
    return {
      Rock: {},
    }
  }
}

export interface PaperJSON {
  kind: "Paper"
}

export class Paper {
  static readonly discriminator = 1
  static readonly kind = "Paper"
  readonly discriminator = 1
  readonly kind = "Paper"

  toJSON(): PaperJSON {
    return {
      kind: "Paper",
    }
  }

  toEncodable() {
    return {
      Paper: {},
    }
  }
}

export interface ScissorsJSON {
  kind: "Scissors"
}

export class Scissors {
  static readonly discriminator = 2
  static readonly kind = "Scissors"
  readonly discriminator = 2
  readonly kind = "Scissors"

  toJSON(): ScissorsJSON {
    return {
      kind: "Scissors",
    }
  }

  toEncodable() {
    return {
      Scissors: {},
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromDecoded(obj: any): number {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  } 
if (obj){
  if ("Rock" in obj) {
    return 1
  }
  if ("Paper" in obj) {
    return 2
  }
  if ("Scissors" in obj) {
    return 3
  }
}
else {
  return 0
}
  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.TeamJSON): types.TeamKind {
  switch (obj.kind) {
    case "Rock": {
      return new Rock()
    }
    case "Paper": {
      return new Paper()
    }
    case "Scissors": {
      return new Scissors()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Rock"),
    borsh.struct([], "Paper"),
    borsh.struct([], "Scissors"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
