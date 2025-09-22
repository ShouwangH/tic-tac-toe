
type GameState = {
    currentPlayer: Player
    board: (Player|'')[][]
    winner: Player|undefined
}

type Player = 'x' | 'o' 

export const initialGameState: GameState = {
    currentPlayer: 'x',
    board: [['', '', ''], ['', '', ''], ['', '', '']],
    winner: undefined
}

export function makeMove(row:number,col:number, gameState:GameState): GameState {
    var currentGameState = structuredClone(gameState)
    
    if (currentGameState.board[row][col] == '') {
        currentGameState.board[row][col] = currentGameState.currentPlayer
        if (currentGameState.currentPlayer === 'x') {
            currentGameState.currentPlayer = 'o'
        } else {
            currentGameState.currentPlayer = 'x'
        }
        return currentGameState
    }
    return currentGameState
}