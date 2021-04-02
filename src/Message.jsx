import './App.css'

// Message-komponentti. Kun tätä halutaan näyttää, voidaan mistä tahansa kutsua.
// Parametrinä laitetaan viesti, mitä halutaan lähettää ja onko isPositive true tai false eli onko sisältö positiivinen tai negatiivinen
// palauttaa ainoastaan yhden divin, jossa näytetään propsina saatu message-teksti ja sitten className johon sijoitetaan joko pos tai neg
// sen mukaan, mikä on isPositiven arvo
const Message = ({ message, isPositive }) => {

    let tyyli = '';

    if (isPositive === true) {
        tyyli = "pos"
    }
    else {
        tyyli = "neg"
    }

    return (
        <div className={tyyli}>
            {message}
        </div>
    )
}

export default Message