import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface JoinHarderArgs {
  x: BN
  y: BN
}

export interface JoinHarderAccounts {
  authority: PublicKey
  game: PublicKey
  piece: PublicKey
  player: PublicKey
  thread: PublicKey
  threadProgram: PublicKey
  recentBlockhashes: PublicKey
  systemProgram: PublicKey
  tokenProgram: PublicKey
  printEditionMint: PublicKey
  masterEditionMint: PublicKey
  printEditionToken: PublicKey
  masterEditionToken: PublicKey
  masterEdition: PublicKey
  metadata: PublicKey
  printEdition: PublicKey
  editionMarker: PublicKey
  splToken: PublicKey
  collection: PublicKey
  collection2: PublicKey
  collection3: PublicKey
}

export const layout = borsh.struct([borsh.u64("x"), borsh.u64("y")])

export function joinHarder(args: JoinHarderArgs, accounts: JoinHarderAccounts) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: false, isWritable: true },
    { pubkey: accounts.game, isSigner: false, isWritable: true },
    { pubkey: accounts.piece, isSigner: false, isWritable: true },
    { pubkey: accounts.player, isSigner: false, isWritable: true },
    { pubkey: accounts.thread, isSigner: false, isWritable: false },
    { pubkey: accounts.threadProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.recentBlockhashes, isSigner: false, isWritable: false },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.tokenProgram, isSigner: false, isWritable: false },
    { pubkey: accounts.printEditionMint, isSigner: false, isWritable: true },
    { pubkey: accounts.masterEditionMint, isSigner: false, isWritable: true },
    { pubkey: accounts.printEditionToken, isSigner: false, isWritable: true },
    { pubkey: accounts.masterEditionToken, isSigner: false, isWritable: true },
    { pubkey: accounts.masterEdition, isSigner: false, isWritable: true },
    { pubkey: accounts.metadata, isSigner: false, isWritable: true },
    { pubkey: accounts.printEdition, isSigner: false, isWritable: true },
    { pubkey: accounts.editionMarker, isSigner: false, isWritable: true },
    { pubkey: accounts.splToken, isSigner: false, isWritable: false },
    { pubkey: accounts.collection, isSigner: false, isWritable: false },
    { pubkey: accounts.collection2, isSigner: false, isWritable: false },
    { pubkey: accounts.collection3, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([148, 51, 39, 14, 52, 23, 47, 54])
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
