import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PlayerFields {
  authority: PublicKey
  bump: number
  numPieces: BN
  team: types.TeamKind
}

export interface PlayerJSON {
  authority: string
  bump: number
  numPieces: string
  team: types.TeamJSON
}

export class Player {
  readonly authority: PublicKey
  readonly bump: number
  readonly numPieces: BN
  readonly team: types.TeamKind

  static readonly discriminator = Buffer.from([
    205, 222, 112, 7, 165, 155, 206, 218,
  ])

  static readonly layout = borsh.struct([
    borsh.publicKey("authority"),
    borsh.u8("bump"),
    borsh.u64("numPieces"),
    types.Team.layout("team"),
  ])

  constructor(fields: PlayerFields) {
    this.authority = fields.authority
    this.bump = fields.bump
    this.numPieces = fields.numPieces
    this.team = fields.team
  }

  static async fetch(
    c: Connection,
    address: PublicKey
  ): Promise<Player | null> {
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
  ): Promise<Array<Player | null>> {
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

  static decode(data: Buffer): Player {
    if (!data.slice(0, 8).equals(Player.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Player.layout.decode(data.slice(8))

    return new Player({
      authority: dec.authority,
      bump: dec.bump,
      numPieces: dec.numPieces,
      team: types.Team.fromDecoded(dec.team),
    })
  }

  toJSON(): PlayerJSON {
    return {
      authority: this.authority.toString(),
      bump: this.bump,
      numPieces: this.numPieces.toString(),
      team: this.team.toJSON(),
    }
  }

  static fromJSON(obj: PlayerJSON): Player {
    return new Player({
      authority: new PublicKey(obj.authority),
      bump: obj.bump,
      numPieces: new BN(obj.numPieces),
      team: types.Team.fromJSON(obj.team),
    })
  }
}
