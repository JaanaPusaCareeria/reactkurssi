import './App.css'

const CustomerAdd = ({ setLisäysTila }) => {
    return (
        <>
            <p>Tähän tulee lisäyskaavake</p>

            <button onClick={() => setLisäysTila(false)}>Cancel</button>
        </>
    )
}


export default CustomerAdd