import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface MovePieceAccounts {
  game: PublicKey
  piece: PublicKey
  thread: PublicKey
}

export function movePiece(accounts: MovePieceAccounts) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.game, isSigner: false, isWritable: true },
    { pubkey: accounts.piece, isSigner: false, isWritable: true },
    { pubkey: accounts.thread, isSigner: true, isWritable: false },
  ]
  const identifier = Buffer.from([136, 133, 16, 117, 173, 226, 233, 76])
  const data = identifier
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}
