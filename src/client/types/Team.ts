import { PublicKey } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh"

export interface RockJSON {
  kind: 1
}

export class Rock {
  static readonly discriminator = 0
  static readonly kind = "Rock"
  readonly discriminator = 0
  readonly kind = "Rock"

  toJSON(): RockJSON {
    // @ts-ignore
    return 1
  }

  toEncodable() {
    return 1
  }
}

export interface PaperJSON {
  kind: 2
}

export class Paper {
  static readonly discriminator = 1
  static readonly kind = "Paper"
  readonly discriminator = 1
  readonly kind = "Paper"

  toJSON(): PaperJSON {
    // @ts-ignore
    return 2
  }

  toEncodable() {
    return 2
  }
}

export interface ScissorsJSON {
  kind: 3
}

export class Scissors {
  static readonly discriminator = 2
  static readonly kind = "Scissors"
  readonly discriminator = 2
  readonly kind = "Scissors"

  toJSON(): ScissorsJSON {
    // @ts-ignore
    return 3
  }

  toEncodable() {
    return 3
  }
}

export interface Flag1JSON {
  kind: "Flag1"
}

export class Flag1 {
  static readonly discriminator = 3
  static readonly kind = "Flag1"
  readonly discriminator = 3
  readonly kind = "Flag1"

  toJSON(): Flag1JSON {
    return {
      kind: "Flag1",
    }
  }

  toEncodable() {
    return {
      Flag1: {},
    }
  }
}

export interface Flag2JSON {
  kind: "Flag2"
}

export class Flag2 {
  static readonly discriminator = 4
  static readonly kind = "Flag2"
  readonly discriminator = 4
  readonly kind = "Flag2"

  toJSON(): Flag2JSON {
    return {
      kind: "Flag2",
    }
  }

  toEncodable() {
    return {
      Flag2: {},
    }
  }
}

export interface Flag3JSON {
  kind: "Flag3"
}

export class Flag3 {
  static readonly discriminator = 5
  static readonly kind = "Flag3"
  readonly discriminator = 5
  readonly kind = "Flag3"

  toJSON(): Flag3JSON {
    return {
      kind: "Flag3",
    }
  }

  toEncodable() {
    return {
      Flag3: {},
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
  if ("Flag1" in obj) {
    return 4
  }
  if ("Flag2" in obj) {
    return 5
  }
  if ("Flag3" in obj) {
    return 6
  }
} else {
  return 0
}

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.TeamJSON): number {
 
  return obj
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([
    borsh.struct([], "Rock"),
    borsh.struct([], "Paper"),
    borsh.struct([], "Scissors"),
    borsh.struct([], "Flag1"),
    borsh.struct([], "Flag2"),
    borsh.struct([], "Flag3"),
  ])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
