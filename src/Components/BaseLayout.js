
import { useMachine } from "@xstate/react"
import bookingMachine from "../Machines/bookingMachine"

const BaseLayout = () =>{
    const [state, send] = useMachine(bookingMachine)

    console.log("nuestra maquina",state)
    console.log("matches true", state.matches("inicial"))
    console.log("matches false", state.matches("tickets"))
    console.log("can", state.can("FINISH"))
    return (
        <div>HOla</div>
    )
}
export  { BaseLayout }