import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface JoinArgs {
  wager: BN
  wen: string
  team: number
  x: number
  y: number
}

export interface JoinAccounts {
  game: PublicKey
  user: PublicKey
  authority: PublicKey
  recentBlockhashes: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([
  borsh.u64("wager"),
  borsh.str("wen"),
  borsh.u8("team"),
  borsh.u8("x"),
  borsh.u8("y"),
])

export function join(args: JoinArgs, accounts: JoinAccounts) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.game, isSigner: false, isWritable: true },
    { pubkey: accounts.user, isSigner: false, isWritable: true },
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.recentBlockhashes, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([206, 55, 2, 106, 113, 220, 17, 163])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      wager: args.wager,
      wen: args.wen,
      team: args.team,
      x: args.x,
      y: args.y,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}
