import { makeMove, initialGameState, type GameState } from './tictactoe'
import './App.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

interface GameProps {
    gameId: string
}

function Game({gameId}:GameProps) {
    const fetchGame = async (): Promise<GameState> => {

        const res = await fetch("/game/" + gameId)

        if (!res.ok) throw new Error("Failed to get game")
        return await res.json()
    }

    const reset = async (): Promise<GameState> => {
        const res = await fetch("/reset/" + gameId)
        if (!res.ok) throw new Error("Failed to reset game")
        return await res.json()
    }

    const newMove = async ({ row, col }: { row: number, col: number }): Promise<GameState> => {
        const res = await fetch("/move/" + gameId, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ row, col })
        })

        if (!res.ok) throw new Error('Move Failed')
        return await res.json()
    }

    const queryClient = useQueryClient()

    const { isPending, error, data } = useQuery<GameState>({
        queryKey: ['game'],
        queryFn: fetchGame
    })

    const state = data as GameState

    const resetGame = useMutation({
        mutationFn: reset,
        onSuccess: () => {
            console.log('received')
            queryClient.invalidateQueries({ queryKey: ['game'] })
        }
    })

    const gameMove = useMutation({
        mutationFn: newMove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['game'] })
        }
    })

    function handleClick(row: number, col: number) {
        gameMove.mutate({ row: row, col: col })
    }
    console.log(state)

    if (isPending) { console.log("pending")}
    else if (!state){ console.log('state')}
        else{
        return (
            <>
                <div className='flex flex-col items-center'>
                    {state.winner ? <h1>{state.winner} has won</h1> : <h1>Tic Tac Toe</h1>}
                    <div className="h-120 w-120 grid grid-cols-3 grid-rows-3">
                        <div className='border text-5xl text-center' onClick={() => handleClick(0, 0)}> {state.board[0][0]} </div>
                        <div className='border text-5xl text-center' onClick={() => handleClick(0, 1)}> {state.board[0][1]} </div>
                        <div className='border text-5xl text-center' onClick={() => handleClick(0, 2)}> {state.board[0][2]} </div>
                        <div className='border text-5xl text-center' onClick={() => handleClick(1, 0)}> {state.board[1][0]} </div>
                        <div className='border text-5xl text-center' onClick={() => handleClick(1, 1)}> {state.board[1][1]} </div>
                        <div className='border text-5xl text-center' onClick={() => handleClick(1, 2)}> {state.board[1][2]} </div>
                        <div className='border text-5xl text-center' onClick={() => handleClick(2, 0)}> {state.board[2][0]} </div>
                        <div className='border text-5xl text-center' onClick={() => handleClick(2, 1)}> {state.board[2][1]} </div>
                        <div className='border text-5xl text-center' onClick={() => handleClick(2, 2)}> {state.board[2][2]} </div>
                        <button className='border' onClick={() => resetGame.mutate()}>Reset</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Game