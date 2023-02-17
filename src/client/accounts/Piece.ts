import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PieceFields {
  authority: PublicKey
  bump: number
  id: BN
  thread: PublicKey
  x: BN
  y: BN
  superPower: number
}

export interface PieceJSON {
  authority: string
  bump: number
  id: string
  thread: string
  x: string
  y: string
  superPower: number
}

export class Piece {
  readonly authority: PublicKey
  readonly bump: number
  readonly id: BN
  readonly thread: PublicKey
  readonly x: BN
  readonly y: BN
  readonly superPower: number

  static readonly discriminator = Buffer.from([
    66, 23, 170, 233, 150, 91, 208, 21,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.u8("bump"),
    borsh.u64("id"),
    borsh.publicKey("thread"),
    borsh.u64("x"),
    borsh.u64("y"),
    borsh.u8("superPower"),
  ])

  constructor(fields: PieceFields) {
    this.authority = fields.authority
    this.bump = fields.bump
    this.id = fields.id
    this.thread = fields.thread
    this.x = fields.x
    this.y = fields.y
    this.superPower = fields.superPower
  }

  static async fetch(c: Connection, address: PublicKey): Promise<Piece | null> {
    const info = await c.getAccountInfo(address)

    if (info === null) {
      return null
    }
    if (!info.owner.equals(PROGRAM_ID)) {
      throw new Error("account doesn't belong to this program")
    }

    return this.decode(info.data)
  }

  static async fetchMultiple(
    c: Connection,
    addresses: PublicKey[]
  ): Promise<Array<Piece | null>> {
    const infos = await c.getMultipleAccountsInfo(addresses)

    return infos.map((info) => {
      if (info === null) {
        return null
      }
      if (!info.owner.equals(PROGRAM_ID)) {
        throw new Error("account doesn't belong to this program")
      }

      return this.decode(info.data)
    })
  }

  static decode(data: Buffer): Piece {
    if (!data.slice(0, 8).equals(Piece.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Piece.layout.decode(data.slice(8))

    return new Piece({
      authority: dec.authority,
      bump: dec.bump,
      id: dec.id,
      thread: dec.thread,
      x: dec.x,
      y: dec.y,
      superPower: dec.superPower,
    })
  }

  toJSON(): PieceJSON {
    return {
      authority: this.authority.toString(),
      bump: this.bump,
      id: this.id.toString(),
      thread: this.thread.toString(),
      x: this.x.toString(),
      y: this.y.toString(),
      superPower: this.superPower,
    }
  }

  static fromJSON(obj: PieceJSON): Piece {
    return new Piece({
      authority: new PublicKey(obj.authority),
      bump: obj.bump,
      id: new BN(obj.id),
      thread: new PublicKey(obj.thread),
      x: new BN(obj.x),
      y: new BN(obj.y),
      superPower: obj.superPower,
    })
  }
}
