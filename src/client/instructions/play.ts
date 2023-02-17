import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface PlayArgs {
  wen: string
}

export interface PlayAccounts {
  game: PublicKey
  thread: PublicKey
  authority: PublicKey
  user: PublicKey
  recentBlockhashes: PublicKey
}

export const layout = borsh.struct([borsh.str("wen")])

export function play(args: PlayArgs, accounts: PlayAccounts) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.game, isSigner: false, isWritable: true },
    { pubkey: accounts.thread, isSigner: true, isWritable: false },
    { pubkey: accounts.authority, isSigner: false, isWritable: true },
    { pubkey: accounts.user, isSigner: false, isWritable: true },
    { pubkey: accounts.recentBlockhashes, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([213, 157, 193, 142, 228, 56, 248, 150])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      wen: args.wen,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}
