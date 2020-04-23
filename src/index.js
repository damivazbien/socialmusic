import React from 'react'
import ReactDOM from 'react-dom'
import myWEB3 from 'web3'
import './index.css'
import ABI from '../build/contracts/SocialMusic.json'

class Main extends React.Component {
    constructor() {
        super()

        window.myWeb3 = new myWEB3(myWEB3.givenProvider)
        
        
        this.state = {
            isFormHidden : true,
            isAddMusicHidden: true
        }
       


        this.setContractInstance()
    
    }

    async getAccount() {
        return (await myWeb3.length.getAccount())[0]
    }

    async setContractInstance() {
        const contractAddress = ABI.networks['3'].address
        const abi = ABI.abi
        const contractInstance = new myWEB3.eth.Contract(abi,contractAddress, {
            from: await this.getAccount(),
            gasPrice: 2e9
        })
        await this.setState({contractInstance: contractInstance})
    }

    async addMusic(music) {
        await this.state.contractInstance.methods.addSong(music).send({form:
        '0xf163E8A8Cee5eA2aC040699651f0386a3cBCe251'})
    }

    async setupAccount(name, age, status){
        await this.state.contractInstance.methods.setup(this.fillBytes32WithSpaces(name), age, status).send()
    }

    fillBytes32WithSpaces(name) {
        let namehex = myWeb3.utils.toHex(name)
        for(let i = namehex.length; i < 66; i++){
            namehex = namehex + '0'
        }
        return nameHex
    }

    hideAllSections() {
        this.setState({
            isFormHidden : true,
            isAddMusicHidden: true
        })
    }
    
    render() {
        return (
            <div>
                <h1>Welcome to Decentralized Social Music!</h1>
                <p>Setup your account, start adding musical recomendations for your friends people that may interest you</p>
                <div className="buttons-container">
                    <button onClick={()=> {
                        this.hideAllSections()
                        if(this.state.isFormHidden) this.setState({isFormHidden: false})
                        else this.setState({isFormHidden:true})
                        }}>Setup Account</button>
                    <button onClick={() => {
                        this.hideAllSections()
                        if(this.state.isAddMusicHidden)
                            this.setState({isAddMusicHidden:false})
                        else this.setState({isAddMusicHidden: true})
                    }}>Add Music</button>
                    <button>Follow People</button>
                </div>
                <Form 
                    className={this.state.isFormHidden?'hidden':''}
                    cancel={() => this.setState({isFormHidden:true})}
                    setupAccount={(name,age,status) => {
                        this.setupAccount(name,age,status)
                    }}
                    />
                <AddMusic className={this.state.isAddMusicHidden ? 'hidden': ''}
                    cancel={() => { 
                        this.setState({isAddMusicHidden:true}) 
                    }}
                    addMusic = {music => {
                        this.addMusic(music)
                    }}
                />
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

class Form extends React.Component {
    constructor(){
        super()
    }

    render() {
        return (
            <form className={this.props.className}>
                <input className="form-input" type="text" ref="form-name" placeholder="Your name" />
                <input className="form-input" type="number" ref="form-age" placeholder="Your age" />
                <textarea className="form-input form-textarea" ref="form-state" placeholder="Your state, a description about yourself"></textarea>
                <div>
                    <button onClick={event => {
                        event.preventDefault()
                        this.props.cancel()
                    }} className="cancel-button">Cancel</button>
                    <button onClick={event => {
                        event.preventDefault()
                        this.props.setupAccount(
                            this.refs['form-name'].value,
                            this.refs['form-age'].value,
                            this.refs['form-state'].value)

                    }}>Submit</button>
                </div>
            </form>
        )
    }
}

class AddMusic extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className = {this.props.className}>
                <input type="text" ref="add-music-input" className="form-input" placeholder="Your song recommendation"/>
            
                <div>
                    <button onClick={event => {
                        event.preventDefault()
                        this.props.addMusic(this.refs['add-music-input'].value)
                    }}>Submit</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Main />, document.querySelector('#root'))
