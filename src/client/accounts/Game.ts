import { PublicKey, Connection } from "@solana/web3.js"
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface GameFields {
  over: boolean
  ss: BN
  startTime: BN
  crashTime: BN
  wagers: BN
  numusers: number
  authority: PublicKey
  lastAward: BN
  avec: Array<Array<number>>
  onecount: number
  zerocount: number
  twocount: number
  wen: string
}

export interface GameJSON {
  over: boolean
  ss: string
  startTime: string
  crashTime: string
  wagers: string
  numusers: number
  authority: string
  lastAward: string
  avec: Array<Array<number>>
  onecount: number
  zerocount: number
  twocount: number
  wen: string
}

export class Game {
  readonly over: boolean
  readonly ss: BN
  readonly startTime: BN
  readonly crashTime: BN
  readonly wagers: BN
  readonly numusers: number
  readonly authority: PublicKey
  readonly lastAward: BN
  readonly avec: Array<Array<number>>
  readonly onecount: number
  readonly zerocount: number
  readonly twocount: number
  readonly wen: string

  static readonly discriminator = Buffer.from([
    27, 90, 166, 125, 74, 100, 121, 18,
  ])

  static readonly layout = borsh.struct([
    borsh.bool("over"),
    borsh.u64("ss"),
    borsh.i64("startTime"),
    borsh.i64("crashTime"),
    borsh.u64("wagers"),
    borsh.u8("numusers"),
    borsh.publicKey("authority"),
    borsh.u64("lastAward"),
    borsh.vec(borsh.vec(borsh.u8()), "avec"),
    borsh.u8("onecount"),
    borsh.u8("zerocount"),
    borsh.u8("twocount"),
    borsh.str("wen"),
  ])

  constructor(fields: GameFields) {
    this.over = fields.over
    this.ss = fields.ss
    this.startTime = fields.startTime
    this.crashTime = fields.crashTime
    this.wagers = fields.wagers
    this.numusers = fields.numusers
    this.authority = fields.authority
    this.lastAward = fields.lastAward
    this.avec = fields.avec
    this.onecount = fields.onecount
    this.zerocount = fields.zerocount
    this.twocount = fields.twocount
    this.wen = fields.wen
  }

  static async fetch(c: Connection, address: PublicKey): Promise<Game | null> {
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
  ): Promise<Array<Game | null>> {
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

  static decode(data: Buffer): Game {
    if (!data.slice(0, 8).equals(Game.discriminator)) {
      throw new Error("invalid account discriminator")
    }

    const dec = Game.layout.decode(data.slice(8))

    return new Game({
      over: dec.over,
      ss: dec.ss,
      startTime: dec.startTime,
      crashTime: dec.crashTime,
      wagers: dec.wagers,
      numusers: dec.numusers,
      authority: dec.authority,
      lastAward: dec.lastAward,
      avec: dec.avec,
      onecount: dec.onecount,
      zerocount: dec.zerocount,
      twocount: dec.twocount,
      wen: dec.wen,
    })
  }

  toJSON(): GameJSON {
    return {
      over: this.over,
      ss: this.ss.toString(),
      startTime: this.startTime.toString(),
      crashTime: this.crashTime.toString(),
      wagers: this.wagers.toString(),
      numusers: this.numusers,
      authority: this.authority.toString(),
      lastAward: this.lastAward.toString(),
      avec: this.avec,
      onecount: this.onecount,
      zerocount: this.zerocount,
      twocount: this.twocount,
      wen: this.wen,
    }
  }

  static fromJSON(obj: GameJSON): Game {
    return new Game({
      over: obj.over,
      ss: new BN(obj.ss),
      startTime: new BN(obj.startTime),
      crashTime: new BN(obj.crashTime),
      wagers: new BN(obj.wagers),
      numusers: obj.numusers,
      authority: new PublicKey(obj.authority),
      lastAward: new BN(obj.lastAward),
      avec: obj.avec,
      onecount: obj.onecount,
      zerocount: obj.zerocount,
      twocount: obj.twocount,
      wen: obj.wen,
    })
  }
}
