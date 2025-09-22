import { useState } from 'react'
import {makeMove, initialGameState} from './components/tictactoe'
import './App.css'

function App() {
  const [gameState, setGameState] = useState(initialGameState)


  return (
    <>

      <h1 className='text-xl'>Tic Tac Toe</h1>
      <div className="h-50 grid grid-cols-3 grid-rows-3">
        <div className='border text-5xl text-center'onClick={()=>setGameState(makeMove(0,0,gameState))}> {gameState.board[0][0]} </div>
        <div className='border text-5xl text-center'onClick={()=>setGameState(makeMove(0,1,gameState))}> {gameState.board[0][1]} </div>
        <div className='border text-5xl text-center'onClick={()=>setGameState(makeMove(0,2,gameState))}> {gameState.board[0][2]} </div>
        <div className='border text-5xl text-center'onClick={()=>setGameState(makeMove(1,0,gameState))}> {gameState.board[1][0]} </div>
        <div className='border text-5xl text-center'onClick={()=>setGameState(makeMove(1,1,gameState))}> {gameState.board[1][1]} </div>
        <div className='border text-5xl text-center'onClick={()=>setGameState(makeMove(1,2,gameState))}> {gameState.board[1][2]} </div>
        <div className='border text-5xl text-center'onClick={()=>setGameState(makeMove(2,2,gameState))}> {gameState.board[2][2]} </div>
        <div className='border text-5xl text-center'onClick={()=>setGameState(makeMove(2,0,gameState))}> {gameState.board[2][0]} </div>
        <div className='border text-5xl text-center'onClick={()=>setGameState(makeMove(2,1,gameState))}> {gameState.board[2][1]} </div>
      </div>
      
        

      
    </>
  )
}

export default App
