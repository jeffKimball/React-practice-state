import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'

class App extends React.Component {
            
    state = { lat: null, errorMessage:''  }     
    
    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({lat: position.coords.latitude}),
            err => this.setState({errorMessage: err.message})            
        )
    }

    // this content was removed from render function - logic should be outside of render
    pageContent() {
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>
        }

        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat}/>
        }

        return <div><Spinner message="Please accept location request"/></div>
    }

    render(){
        return(
            <div className="borderRed">
                {this.pageContent()}
            </div>
        )
        
    }
    
}


ReactDOM.render(<App />, document.getElementById('root'))