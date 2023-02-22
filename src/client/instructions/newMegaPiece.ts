import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface NewMegaPieceArgs {
  x: BN
  y: BN
}

export interface NewMegaPieceAccounts {
  authority: PublicKey
  game: PublicKey
  eg: PublicKey
  piece: PublicKey
  player: PublicKey
  systemProgram: PublicKey
  thread: PublicKey
  threadProgram: PublicKey
  h1: PublicKey
  h2: PublicKey
}

export const layout = borsh.struct([borsh.u64("x"), borsh.u64("y")])

export function newMegaPiece(
  args: NewMegaPieceArgs,
  accounts: NewMegaPieceAccounts
) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: false, isWritable: true },
    { pubkey: accounts.game, isSigner: false, isWritable: true },
   // { pubkey: accounts.eg, isSigner: false, isWritable: true },
    { pubkey: accounts.piece, isSigner: false, isWritable: true },
    { pubkey: accounts.player, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.thread, isSigner: false, isWritable: true },
    { pubkey: accounts.threadProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.h1, isSigner: false, isWritable: true },
    { pubkey: accounts.h2, isSigner: false, isWritable: true },/*
    { pubkey: new PublicKey("So11111111111111111111111111111111111111112"), isSigner: false, isWritable: false },
    { pubkey: new PublicKey("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG"), isSigner: false, isWritable: false },
    { pubkey: new PublicKey("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG"),  isSigner: false, isWritable: false },*/

  ]
  const identifier = Buffer.from([125, 133, 191, 35, 80, 226, 97, 183])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      x: args.x,
      y: args.y,
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}
