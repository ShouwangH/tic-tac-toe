
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

    if (!currentGameState.winner) {
    if (currentGameState.board[row][col] == '') {
        currentGameState.board[row][col] = currentGameState.currentPlayer
        currentGameState = checkWin(currentGameState)
        if (currentGameState.winner) {
            return currentGameState
        }
        if (currentGameState.currentPlayer === 'x') {
            currentGameState.currentPlayer = 'o'
        } else {
            currentGameState.currentPlayer = 'x'
        }
        return currentGameState
        
    }}
    return currentGameState
}

function checkWin(gameState:GameState):GameState {
    var currentGS = structuredClone(gameState)
   
    var rowCount:number = 0
    for (var i = 0; i< 3; i++) {
        for (var j = 0; j< 3; j++) {
            if (gameState.currentPlayer === gameState.board[i][j]) {
                rowCount++
                if (rowCount === 3){
                    currentGS.winner = currentGS.currentPlayer
                    return currentGS
                }
            }
        }
        rowCount = 0  
    }

    var colCount:number = 0
    for (var i = 0; i< 3; i++) {
        for (var j = 0; j< 3; j++) {
            if (gameState.currentPlayer === gameState.board[j][i]) {
                colCount++
                console.log(colCount)
                if (colCount === 3){
                    currentGS.winner = currentGS.currentPlayer
                    return currentGS
                }
            }
        }
        colCount = 0  
    }

    if ((currentGS.board[0][0] === currentGS.currentPlayer && currentGS.board[1][1] === currentGS.currentPlayer && currentGS.board[2][2]== currentGS.currentPlayer) 
        || (currentGS.board[2][0] === currentGS.currentPlayer && currentGS.board[1][1] === currentGS.currentPlayer && currentGS.board[0][2] == currentGS.currentPlayer)) {
        currentGS.winner = currentGS.currentPlayer
        return currentGS
    }
    return currentGS

}
