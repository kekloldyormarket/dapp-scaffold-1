// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ThreadProgram as ThreadProgramType,
  IDL as ThreadProgramIdl_v1_3_15, 
} from '../../threadprogram';
export const CLOCKWORK_THREAD_PROGRAM_ID = new PublicKey(
  '3XXuUFfweXBwFgFfYaejLvZE4cGZiHgKiGfMtdxNzYmv',
);
import { Game } from '../../client/accounts/Game'

import React from 'react';
import { Connection, PublicKey, SystemProgram, SYSVAR_RECENT_BLOCKHASHES_PUBKEY, Transaction,  ComputeBudgetProgram } from "@solana/web3.js";
import * as anchor from '@coral-xyz/anchor'
import { PROGRAM_ID } from "../../client/programId";

import { initialize } from '../../client/instructions/initialize'
import { join } from '../../client/instructions/join'
import { play } from '../../client/instructions/play'
// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import { movePiece, newGame, newPiece, newPlayer } from 'client/instructions';
import { Scissors, Rock, Paper } from 'client/types/Team';
import { Player } from 'client/accounts';

export const HomeView: FC = ({ }) => {
  let [gameState, setGameState] = useState<any>()

  const wallet = useWallet();
  const { connection } = useConnection();
  const balance = useUserSOLBalanceStore((s) => s.balance)
  const provider = new anchor.AnchorProvider(connection, wallet, { preflightCommitment: 'recent' });
  const { getUserSOLBalance } = useUserSOLBalanceStore()
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < 64; i++) {
      const row = [];
      for (let j = 0; j < 64; j++) {
        row.push(0); // Add a default value to each cell
      }
      rows.push(row);
    }
    return rows;
  });

  let game = (PublicKey.findProgramAddressSync(
    [Buffer.from("game")]
  , PROGRAM_ID))[0]/*
  */
  useEffect(() => {
    if (wallet.connected){
    setTimeout(async function(){
      let ahh  = (await Game.fetch(connection, game))
      setGameState(await Game.fetch(connection, game))
        
        if (ahh){
          console.log(ahh)
          console.log(ahh.numPlayersPaper.toNumber())
         
          setGrid(ahh.board); 
        }
      }, 2000)
    }
    }, [game])

  const [currentOption, setCurrentOption] = useState();
  useEffect(() => {
    if (wallet.connected && currentOption){
    setTimeout(async function(){
      console.log(currentOption)
      let player = (PublicKey.findProgramAddressSync(
        // @ts-ignore
        [Buffer.from("player"),wallet.publicKey.toBuffer()]
      , PROGRAM_ID))[0]
      let hmm = await newPlayer({team: currentOption == 'scissors' ? new Scissors : currentOption == 'paper' ?  new Paper :  new Rock},
        { authority: wallet.publicKey, game: game, player, systemProgram: SystemProgram.programId })
        const additionalComputeBudgetInstruction =
        ComputeBudgetProgram.requestUnits({
            units: 2100000,
            additionalFee: 0,
    });
      let atx = new Transaction().add(additionalComputeBudgetInstruction).add(hmm)
       atx.feePayer = wallet.publicKey
    
  atx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash
       await provider.sendAndConfirm(atx, [], {skipPreflight: true})
      }, 2000)
    }
  }, [currentOption])
  function ClickableBoard() {
      const handleClick =async(row, col) => {
  
    
    console.log(row)
    const newGrid = [...grid];
    setGrid(newGrid); 
       let newOption;
    let team = 0
    switch (currentOption) {
      case 'rock':
        team =1
        newOption = 'rock';
        break;
      case 'paper':
        team = 2
        newOption = 'paper';
        break;
      case 'scissors':
        team = 3
        newOption = 'scissors';
        break;
      default:
        newOption = 'rock';
        break;
    }
    newGrid[row][col] = team; // Set the clicked cell to a new value
const wager = 1000
let wen = new Date().getTime()
  let player = (PublicKey.findProgramAddressSync(
    // @ts-ignore
    [Buffer.from("player"),wallet.publicKey.toBuffer()]
  , PROGRAM_ID))[0]
  const SEED_QUEUE = 'thread';
  var threadName = (Math.floor(Math.random()*9999999)).toString()
  var [thread] = PublicKey.findProgramAddressSync(   

    [Buffer.from(SEED_QUEUE, 'utf-8'), game.toBuffer(),Buffer.from( (await Game.fetch(connection, game)).numPieces.toString())],
    CLOCKWORK_THREAD_PROGRAM_ID,
  );
  console.log(thread.toBase58())
  const tx4 = await initialize(   {wen:   (wen.toString())},{ 

    game: game,
    authority: wallet.publicKey,
    systemProgram: SystemProgram.programId
  })

const tx = new Transaction()//.add(tx4)
   
  console.log(team)
  console.log(team)
  
  console.log(team)
  
  console.log(team)
  
  console.log(team)
  
  
  
      console.log((await Game.fetch(connection, game)).numPieces.toNumber())
  let piece = (PublicKey.findProgramAddressSync(
    // @ts-ignore
    [Buffer.from("piece"),( (await Game.fetch(connection, game)).numPieces.toArray('le', 8))]
  , PROGRAM_ID))[0]

  
  
  const tx2 = await newPiece( {x:new anchor.BN(row),y:new anchor.BN(col) },{
    authority: wallet.publicKey,
    game,
    piece,
    player,
    systemProgram: SystemProgram.programId,
    thread,
    threadProgram: CLOCKWORK_THREAD_PROGRAM_ID  });
    
  
    const additionalComputeBudgetInstruction =
    ComputeBudgetProgram.requestUnits({
        units: 2100000,
        additionalFee: 0,
});
try {
tx.add(additionalComputeBudgetInstruction)
    tx.add(tx2)
    tx.feePayer = wallet.publicKey
    
    tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash
         await provider.sendAndConfirm(tx, [], {skipPreflight: true})
  }
   catch (err){
    console.log(err)

   }
   newGrid[row][col] = newOption;
   setGrid(newGrid);
   
    };
    
  function Options({ onSelectOption, currentOption }) {
    return (
      <div className="options">
        <button
        style={{backgroundColor: 'red'}}
          className={`option ${currentOption === 'rock' ? 'selected' : ''}`}
          onClick={() => onSelectOption('rock')}
        >
          Rock
        </button><br/> 
        <button
        style={{backgroundColor: 'blue'}}
          className={`option ${currentOption === 'paper' ? 'selected' : ''}`}
          onClick={() => onSelectOption('paper')}
        >
          Paper
        </button><br/>
        <button
        style={{backgroundColor: 'yellow'}}
          className={`option ${currentOption === 'scissors' ? 'selected' : ''}`}
          onClick={() => onSelectOption('scissors')}
        >
          Scissors
        </button><br/>
      </div>
    );
  }
    return (
      <div className="board-container">
                              <Options onSelectOption={setCurrentOption} currentOption={currentOption} />

      <div className="board">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={ cell == 3 ? "square clicked-3" :cell == 1? "square clicked-1" : 
                cell == 2 ? "square clicked-2" : 
                "square" + ` cell-${rowIndex}-${colIndex}`}
                onClick={() => handleClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>

    );

  }
  
  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <div className='mt-6'>
        <div className='text-sm font-normal align-bottom text-right text-slate-600 mt-4'>v{pkg.version}</div>
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
          Solana Next
        </h1>
        </div>
        <h4 className="md:w-full text-2x1 md:text-4xl text-center text-slate-300 my-2">
          <p>Unleash the full power of blockchain with Solana and Next.js 13.</p>
          <p className='text-slate-500 text-2x1 leading-relaxed'>Full-stack Solana applications made easy.</p>
        </h4>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-lg blur opacity-40 animate-tilt"></div>
          <div className="max-w-md mx-auto mockup-code bg-primary border-2 border-[#5252529f] p-6 px-10 my-2">
            <pre data-prefix=">">
              <code className="truncate">{`npx create-solana-dapp <dapp-name>`} </code>
            </pre>
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <ClickableBoard />
          <h4 className="md:w-full text-2xl text-slate-300 my-2">
          {wallet &&
          <div className="flex flex-row justify-center">
            <div>
              {(balance || 0).toLocaleString()}
              </div>
              <div className='text-slate-600 ml-2'>
                SOL
              </div>
          </div>
          }
          </h4>
        </div>
      </div>
    </div>
  );
};
