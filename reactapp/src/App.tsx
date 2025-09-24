import { useState } from 'react'
import './App.css'
import Game from './Game'
import Lobby from './lobby'


function App() {
  const [gameID, setGameID] = useState('')

  const handleID = (id:string) =>{
    setGameID(id)
  }


  return (
    <>
    {gameID? 
    <Game gameId={gameID}/>:
    <Lobby handleId={handleID}/> 
    }
    </>
  )
}


export default App
