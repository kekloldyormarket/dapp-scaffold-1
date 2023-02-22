import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import BN from "bn.js" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "@project-serum/borsh" // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types" // eslint-disable-line @typescript-eslint/no-unused-vars
import { PROGRAM_ID } from "../programId"

export interface NewPlayerArgs {
  team: number
}

export interface NewPlayerAccounts {
  authority: PublicKey
  game: PublicKey
  player: PublicKey
  systemProgram: PublicKey
}

export const layout = borsh.struct([types.Team.layout("team")])

export function newPlayer(args: NewPlayerArgs, accounts: NewPlayerAccounts) {
  const keys: Array<AccountMeta> = [
    { pubkey: accounts.authority, isSigner: true, isWritable: true },
    { pubkey: accounts.game, isSigner: false, isWritable: true },
    { pubkey: accounts.player, isSigner: false, isWritable: true },
    { pubkey: accounts.systemProgram, isSigner: false, isWritable: false },
  ]
  const identifier = Buffer.from([53, 6, 141, 90, 215, 247, 26, 80])
  const buffer = Buffer.alloc(1000)
  const len = layout.encode(
    {
      team: args.team == 1 ? { Rock: {}} : args.team == 2 ? { Paper: {}} : 
      args.team == 3 ? { Scissors: {}} : null
    },
    buffer
  )
  const data = Buffer.concat([identifier, buffer]).slice(0, 8 + len)
  const ix = new TransactionInstruction({ keys, programId: PROGRAM_ID, data })
  return ix
}
