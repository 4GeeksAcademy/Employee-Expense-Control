import { fetchId } from "../services/apiServicesFetch"
const IdEmployeeComponent = () => {
    const id = fetchId()
    return (<>
        <h1>Your ID {id} is to give it to your superior so that he can start using the app</h1>
    </>)
}

export default IdEmployeeComponent

