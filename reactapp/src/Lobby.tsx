import { useMutation } from "@tanstack/react-query"

interface LobbyProps {
    handleId: (id:string) => void

}

function Lobby({ handleId }: LobbyProps) {
    function handleCreate() {
        createGame.mutate()
    }


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

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen gap-8">
            <button onClick={()=>handleCreate()} className='border rounded-xl p-3'>Create Game</button>
            <form className="">
                <input className='border' />
                <button className='border rounded-xl p-3'>Join Game</button>
            </form>

        </div>
    )
}

export default Lobby