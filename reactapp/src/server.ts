import express from 'express'
import ViteExpress from 'vite-express';
import { initialGameState, type GameState, makeMove } from "./tictactoe";

interface MovePayload {
    row: number
    col: number
    gameState: GameState
}


const app = express()
app.use(express.json())

let serverGS :GameState = initialGameState

let allGames: GameState[] = []

app.get("/games",(req:Request,res:response<string[]>)=>{
    res.json(allGames.map(game=>game.id))
})

app.get("/game/:id",(req :Request, res:Response<GameState>) => {
    const id = req.params.id
    serverGS = allGames.filter(game=>game.gameID===id)
    res.json(serverGS)
})

app.get("/reset:id",(req :Request, res:Response<GameState>) => {
    serverGS = {...initialGameState, gameID: req.params.id}
    
    res.json(serverGS)
})
    
app.post("/move:id", (req:Request<{},GameState,MovePayload>, res:Response<GameState>) => {
    var newGS = makeMove(req.body.row, req.body.col, serverGS)
    serverGS = newGS
    res.json(newGS)
})

app.get("/create",(req :Request, res:Response<GameState>) => {
    let newGame: GameState = initialGameState
    newGame = {...newGame, gameID:crypto.randomUUID()}
    res.json(newGame)
})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."))



