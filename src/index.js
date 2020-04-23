import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Main extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <h1>Welcome to Decentralized Social Music!</h1>
                <p>Setup your account, start adding musical recomendations for your friends people that may interest you</p>
                <div className="buttons-container">
                    <button>Setup Account</button>
                    <button>Add Music</button>
                    <button>Follow People</button>
                </div>
                <h3>Lastest musical recommendations from people using the dApp</h3>
                <div ref="general-recomendations">
                    <Recomendation name="John" address="0xf163E8A8Cee5eA2aC040699651f0386a3cBCe251" song="Regulate - Nate Dogg" />
                </div>
            </div>
        )
    }
}

class Recomendation extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="recomendation">
                <div className="recommendation-name">{this.props.name}</div>
                <div className="recommendation-address">{this.props.address}</div>
                <div className="recommendation-song">{this.props.song}</div>
            </div> 
        )
    }
}

ReactDOM.render(<Main />, document.querySelector('#root'))
