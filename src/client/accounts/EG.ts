import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface EGFields {
  flagTimer: BN
  flag1Timer: BN
  flag2Timer: BN
  flag3Timer: BN
  bump: number
}

export interface EGJSON {
  flagTimer: string
  flag1Timer: string
  flag2Timer: string
  flag3Timer: string
  bump: number
}

export class EG {
  readonly flagTimer: BN
  readonly flag1Timer: BN
  readonly flag2Timer: BN
  readonly flag3Timer: BN
  readonly bump: number

  static readonly discriminator = Buffer.from([
    200, 206, 97, 86, 141, 217, 151, 136,
  ])

  static readonly layout = borsh.struct([
    borsh.u64("flagTimer"),
    borsh.u64("flag1Timer"),
    borsh.u64("flag2Timer"),
    borsh.u64("flag3Timer"),
    borsh.u8("bump"),
  ])

  constructor(fields: EGFields) {
    this.flagTimer = fields.flagTimer
    this.flag1Timer = fields.flag1Timer
    this.flag2Timer = fields.flag2Timer
    this.flag3Timer = fields.flag3Timer
    this.bump = fields.bump
  }

  static async fetch(c: Connection, address: PublicKey): Promise<EG | null> {
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
  ): Promise<Array<EG | null>> {
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

  static decode(data: Buffer): EG {
 

    const dec = EG.layout.decode(data.slice(8))

    return new EG({
      flagTimer: dec.flagTimer,
      flag1Timer: dec.flag1Timer,
      flag2Timer: dec.flag2Timer,
      flag3Timer: dec.flag3Timer,
      bump: dec.bump,
    })
  }

  toJSON(): EGJSON {
    return {
      flagTimer: this.flagTimer.toString(),
      flag1Timer: this.flag1Timer.toString(),
      flag2Timer: this.flag2Timer.toString(),
      flag3Timer: this.flag3Timer.toString(),
      bump: this.bump,
    }
  }

  static fromJSON(obj: EGJSON): EG {
    return new EG({
      flagTimer: new BN(obj.flagTimer),
      flag1Timer: new BN(obj.flag1Timer),
      flag2Timer: new BN(obj.flag2Timer),
      flag3Timer: new BN(obj.flag3Timer),
      bump: obj.bump,
    })
  }
}
