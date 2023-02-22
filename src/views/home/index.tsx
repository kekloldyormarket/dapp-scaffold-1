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

declare global {
  interface Window {
    xnft: any;
  }
}
import React from 'react';
import { Connection, PublicKey, SystemProgram, SYSVAR_RECENT_BLOCKHASHES_PUBKEY, Transaction,  ComputeBudgetProgram } from "@solana/web3.js";
import * as anchor from '@coral-xyz/anchor'
import { PROGRAM_ID } from "../../client/programId";
// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import { movePiece, newGame, newMegaPiece, newPiece, newPlayer } from 'client/instructions';
import { Scissors, Rock, Paper } from 'client/types/Team';
import { EG, Player, PlayerJSON } from 'client/accounts';

export const HomeView: FC = ({ }) => {
  let [gameState, setGameState] = useState<any>()
  let [players, setPlayers] = useState<Player[]>([])

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()
  
  const  wallet  = useWallet()
  const  connection  = new Connection("https://solana-devnet.g.alchemy.com/v2/4q5fsmngz3snzir01s-znwatdfdndb9l", "recent")
 
  const provider = new anchor.AnchorProvider(connection, wallet, { preflightCommitment: 'recent' });
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
        setPot((await connection.getBalance(game)) / 10 ** 9)
        let player = (PublicKey.findProgramAddressSync(
          // @ts-ignore
          [Buffer.from("player"),wallet.publicKey.toBuffer()]
        , PROGRAM_ID))[0]
        let eg = new PublicKey("DgV69FTydstFKEvqMU43chPcQvhdyX3eZcfpj7xhGUvG")
        let hehe = await Player.fetch(connection, player)
        if (hehe){
          setHeehe(hehe)
        let team = hehe.team 
        let div = 0
        if (team == 1){
          div = await (await Game.fetch(connection, game)).numPlayersRock.toNumber()
        }
        else if (team == 2){
          div = await (await Game.fetch(connection, game)).numPlayersPaper.toNumber()
        }
        else if (team == 3){
          div = await (await Game.fetch(connection, game)).numPlayersScissors.toNumber()
        }
      //  setWinTimes(Math.ceil(((await EG.fetch(connection, eg)).flag1Timer.toNumber() / 60 - 27950623.033333335 )).toString() + ' mins rock winnin ' +
     //   Math.ceil(((await EG.fetch(connection, eg)).flag2Timer.toNumber() / 60)).toString() + ' mins paper winnin ' +
      ///  Math.ceil( ((await EG.fetch(connection, eg)).flag3Timer.toNumber() / 60)).toString() + ' mins scissors winnin')
        setYourRake((await connection.getBalance(game)) / 10 ** 9 /await (await Game.fetch(connection, game)).numPieces.toNumber() * (await Player.fetch(connection, player)).numPieces.toNumber() )
      }
        if (ahh){
    if (grid!=ahh.board){
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
          setGrid(ahh.board); 
    }
        }
      }, 2000)
    }
    }, [gameState && gameState.board])
    async function oops(){
      setGameState(await Game.fetch(connection, game))
       
    }
    const [first, setFirst] = useState(true);

    const [heeHe, setHeehe] = useState<Player>();

    if (first && wallet && wallet.connected){
      setFirst(false)
      oops()
    }
  const [currentOption, setCurrentOption] = useState<string>();
  const [op, setOp] = useState(false);
  const [yourRake, setYourRake] = useState<number>();
  const [winTimes, setWinTimes] = useState<string>();
  const [pot, setPot] = useState<number>();
  useEffect(() => {
    if (wallet.connected && currentOption){
    setTimeout(async function(){
      let player = (PublicKey.findProgramAddressSync(
        // @ts-ignore
        [Buffer.from("player"),wallet.publicKey.toBuffer()]
      , PROGRAM_ID))[0]
      
      let hmm = await newPlayer({team: currentOption == 'scissors' ? 3 : currentOption == 'paper' ?  2 :  1},
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
  
  const Leaderboard = ({ players, team }) => {
    const filteredPlayers = players.filter(player => player.team === team);
    const sortedPlayers = filteredPlayers.sort((a, b) => (a.kills.toNumber() < b.kills.toNumber()) ? 1 : -1)

    console.log(sortedPlayers)
    const topThreePlayers = sortedPlayers.slice(0,3)
  
    const colorTheme = {
      '1': 'red',
      '2': 'blue',
      '3': '  yellow'
    };
  
    return (
      <div style={{ display: 'flex', width: '50%', textAlign: 'center' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {topThreePlayers.map((player, index) => (
            <li key={player.authority.toBase58().substring(0,3)} style={{ backgroundColor: colorTheme[team], padding: '10px', margin: '10px' }}>
              <span style={{color:"black"}}>{player.authority.toBase58().substring(0,3)} - Kills: {player.kills.toNumber()} - Earnings: {(player.earnings.toNumber() / 10 ** 9).toFixed(3)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  useEffect(() => { 

    const fetchPlayers = async () => {
      const ps = await connection.getProgramAccounts(PROGRAM_ID, {dataSlice: {offset :8, length: 96}})
      let tplayers: Player[] = []
      for (var p in ps){
        try {
          let player = await Player.fetch(connection, ps[p].pubkey)
          console.log(player)
          console.log(ps[p].pubkey.toBase58())
          tplayers.push(player);
          setPlayers(tplayers)
        }
        catch (err){

        }
      }
    setTimeout(async function(){
      fetchPlayers()
    }, 10000)

    };
    fetchPlayers();
    
  }, []);
  function ClickableBoard() {
      const handleClick =async(row, col) => {
  if (heeHe){
    let team = 0
    let newOption;

    if (heeHe.team == 1 ){

      newOption = ('rock')
      team = 1
    }
    else if (heeHe.team == 2 ){
      team = 2
      newOption = 'paper';
    }
    else if (heeHe.team == 3 ){
      team = 3
      newOption = 'scissors';
    }
    const newGrid = [...grid];
    setGrid(newGrid); 
    newGrid[row][col] = team; // Set the clicked cell to a new value
const wager = 1000
let wen = new Date().getTime()
let eg = (PublicKey.findProgramAddressSync(
  // @ts-ignore
  [Buffer.from("egg")],
PROGRAM_ID))[0]

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
  setTimeout(async function(){

const tx = new Transaction()//.add(tx4)
   
  let piece = (PublicKey.findProgramAddressSync(
    // @ts-ignore
    [Buffer.from("piece"),( (await Game.fetch(connection, game)).numPieces.toArray('le', 8))]
  , PROGRAM_ID))[0]

  
  
  const tx2 = await newPiece( {x:new anchor.BN(row),y:new anchor.BN(col) },{
    authority: wallet.publicKey,
    game,
    eg,
    piece,
    player,
    systemProgram: SystemProgram.programId,
    thread,
    threadProgram: CLOCKWORK_THREAD_PROGRAM_ID,
  h1: new PublicKey("HCdi5XxeX3pK9A7DXU2JkegXhP791m5i6d4CqQADLjJN")
, h2: new PublicKey("AZhn9xCHzqSAX1zKn9w6crSApHguRM2RAGWVoXBCHGRu")  });
  const tx22 = await newMegaPiece( {x:new anchor.BN(row),y:new anchor.BN(col) },{
    authority: wallet.publicKey,
    game,
    eg,
    piece,
    player,
    systemProgram: SystemProgram.programId,
    thread,
    threadProgram: CLOCKWORK_THREAD_PROGRAM_ID,
    h1: new PublicKey("HCdi5XxeX3pK9A7DXU2JkegXhP791m5i6d4CqQADLjJN")
  , h2: new PublicKey("AZhn9xCHzqSAX1zKn9w6crSApHguRM2RAGWVoXBCHGRu")  });
    
  
    const additionalComputeBudgetInstruction =
    ComputeBudgetProgram.requestUnits({
        units: 2100000,
        additionalFee: 0,
});
console.log(op)
console.log(op)
console.log(op)
console.log(op)
console.log(op)
console.log(op)
console.log(op)
console.log(op)
console.log(op)
console.log(op)
console.log(op)
console.log(op)
console.log(op)
try {
tx.add(additionalComputeBudgetInstruction)
    tx.add(op ? tx22 : tx2)
    tx.feePayer = wallet.publicKey
    
    tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash
await provider.sendAndConfirm(tx, [], {skipPreflight: true})
  }
   catch (err){
    console.log(err)

   }
   newGrid[row][col] = newOption;
   setGrid(newGrid);
  })}
    };
    function Op({ onSelectOption, op }) {
      return (
        <div className='options'>
           <button
          style={{backgroundColor: 'red'}}
            className={`option ${!op? 'selected' : ''}`}
            onClick={() => onSelectOption(false)}
          >
            not OP
          </button><br/> 
          <button
          style={{backgroundColor: 'blue'}}
          className={`option ${op? 'selected' : ''}`}
          onClick={() => onSelectOption(true)}
          >
            OP
          </button><br/>
          </div>
      )
      }
  function Options({ onSelectOption, currentOption }) {
    console.log(heeHe)
    console.log(heeHe)
    console.log(heeHe)
    console.log(heeHe)
    console.log(heeHe)
    console.log(heeHe)
    console.log(heeHe)
    console.log(heeHe)
    console.log(heeHe)
    console.log(heeHe)
    console.log(heeHe)
    console.log(heeHe)
    return (
      <div className="options">
        
        <button
        disabled={heeHe ? true : false}
        style={heeHe && heeHe.team !=1 ?  { backgroundColor: 'black'} : { backgroundColor: 'red'}}
          className={`option ${currentOption === 'rock' ? 'selected' : ''}`}
          onClick={() => onSelectOption('rock')}
        >
          Rock
        </button><br/> 
        <button
                disabled={heeHe ? true : false}

                style={heeHe && heeHe.team != 2 ?  { backgroundColor: 'black'} : { backgroundColor: 'blue'}}
                className={`option ${currentOption === 'paper' ? 'selected' : ''}`}
          onClick={() => onSelectOption('paper')}
        >
          Paper
        </button><br/>
        <button
                disabled={heeHe ? true : false}

        style={heeHe && heeHe.team != 3 ?  { backgroundColor: 'black'} : { backgroundColor: 'yellow'}}
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
                              <Op onSelectOption={setOp} op={op} />

      <div className="board">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                
                className={ cell == 5 ? "square clicked-6" :cell == 4 ? "square clicked-5" :cell == 3 ? "square clicked-4" :cell == 2 ? "square clicked-3" :cell == 0? "square clicked-1" : 
                cell == 1 ? "square clicked-2" : 
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
  
  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
      
        <div className="md:hero-title" style={{justifyContent: 'center', alignItems: 'center', height: '10vh', marginBottom:"3%"}}>


        {players.length > 0 &&
    <div style={{ display: 'flex', justifyContent: 'center' }}>

         <Leaderboard players={players} team={1}/>

         <Leaderboard players={players} team={2}/>

         <Leaderboard players={players} team={3}/></div>}
                  </div>
                  <br /><br /> 
                  <br /><br />  {pot && <div> 
 pot is {pot} SOL and your rake would be {yourRake}<br/>{winTimes}</div>}
       {balance && <div className="md:hero-title">your balance is {balance} SOL</div>}
          <ClickableBoard />
          

          <p className="text-xl mt-2">You can play with your friends by sending them the link to this page! </p>
        <p className="text-xl mt-2">and also twitter.com/staccoverflow</p>
        <p className="text-xl mt-2">You can also play with yourself by opening this page in another tab! weirdo</p>
      
        <p className="text-xl mt-2">Last team standing divides pot. Rock paper scissors</p>

        <p className="text-xl mt-2">   Op costs 10x as much and moves 10 times over the course of every few mins vs 1nce a minute </p>
        <p className="text-xl mt-2">There is only upfront cost. No delegations</p>
        
      </div>
    </div>
  );
};
