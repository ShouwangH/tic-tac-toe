import { useMutation, useQuery } from "@tanstack/react-query"

interface LobbyProps {
    handleId: (id:string) => void

}

function Lobby({ handleId }: LobbyProps) {
    function handleCreate() {
        createGame.mutate()
    }

    const gameList = async () => {
        const res = await fetch('/games')
        if (!res.ok) throw new Error("Failed to get game")
        return await res.json()
    }

    const {isPending, error, data} =useQuery<string>({
        queryKey:['ids'],
        queryFn: gameList
    })

    console.log(data)

    const ids = data

    const newGame = async () => {
        const res = await fetch('/create')
        if (!res.ok) throw new Error("Failed to get game")
        return await res.json()
    }

    const createGame = useMutation({
        mutationFn: newGame,
        onSuccess: (id) => { handleId(id)
        }
    })

    console.log(ids)

    if (isPending) {}
    else{
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen gap-8">
            <button onClick={()=>handleCreate()} className='border rounded-xl p-3'>Create Game</button>
            <label>
                Select a game:
                <select>
                    {ids.map(id=><option value={id} key={id}>{id}</option>)}
                </select>
                </label>

        </div>
    )
}
}

export default Lobby