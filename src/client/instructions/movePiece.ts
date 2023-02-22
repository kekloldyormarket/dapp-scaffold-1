import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface MovePieceArgs {
  answer: boolean
  answer2: boolean
}

export interface MovePieceAccounts {
  player: PublicKey
  game: PublicKey
  eg: PublicKey
  piece: PublicKey
  thread: PublicKey
  authority: PublicKey
}

export const layout = borsh.struct([
  borsh.bool("answer"),
  borsh.bool("answer2"),
])

export function movePiece(args: MovePieceArgs, accounts: MovePieceAccounts) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.player, isSigner: false, isWritable: true },
    { pubkey: accounts.game, isSigner: false, isWritable: true },
    { pubkey: accounts.eg, isSigner: false, isWritable: true },
    { pubkey: accounts.piece, isSigner: false, isWritable: true },
    { pubkey: accounts.thread, isSigner: true, isWritable: false },
    { pubkey: accounts.authority, isSigner: false, isWritable: true },
  ]
  const identifier = Buffer.from([136, 133, 16, 117, 173, 226, 233, 76])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      answer: args.answer,
      answer2: args.answer2,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}
