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

let allGames: GameState[] = []

app.get("/games",(req,res)=>{
    res.json(allGames.map(game=>game.id))
})

app.get("/game/:id",(req, res) => {
    const id = req.params.id
    const selectedGS = allGames.filter(game=>game.gameID===id)
    res.json(selectedGS[0])
})

app.get("/reset/:id",(req, res) => {
    const resetGS = {...initialGameState, gameID: req.params.id}
    const findGameIndex = allGames.findIndex(game => game.gameID === req.params.id)
    if (findGameIndex != -1) {
        allGames[findGameIndex] = resetGS
    }
    res.json(resetGS)
})
    
app.post("/move/:id", (req, res) => {
    var newGS = allGames.filter(game=>game.gameID==req.params.id)
    var moveGS = makeMove(req.body.row, req.body.col, newGS[0])
    const findGameIndex = allGames.findIndex(game => game.gameID === req.params.id)
    if (findGameIndex != -1) {
        allGames[findGameIndex] = moveGS
    }
    res.json(moveGS)
})

app.get("/create",(req, res) => {
    let newGame: GameState = initialGameState
    newGame = {...newGame, gameID:crypto.randomUUID()}
    allGames.push(newGame)
    res.json(newGame.gameID)
})

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."))



