import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface NewFlagAccounts {
  authority: PublicKey
  game: PublicKey
  piece: PublicKey
  player: PublicKey
  systemProgram: PublicKey
  thread: PublicKey
  threadProgram: PublicKey
  h1: PublicKey
  h2: PublicKey
}

export function newFlag(accounts: NewFlagAccounts) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: false, isWritable: true },
    { pubkey: accounts.game, isSigner: false, isWritable: true },
    { pubkey: accounts.piece, isSigner: false, isWritable: true },
    { pubkey: accounts.player, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.thread, isSigner: false, isWritable: true },
    { pubkey: accounts.threadProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.h1, isSigner: false, isWritable: true },
    { pubkey: accounts.h2, isSigner: false, isWritable: true },
    { pubkey: new PublicKey("So11111111111111111111111111111111111111112"), isSigner: false, isWritable: false },
    { pubkey: new PublicKey("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG"), isSigner: false, isWritable: false },
    { pubkey: new PublicKey("H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG"),  isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([73, 100, 95, 228, 145, 145, 179, 184])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}
