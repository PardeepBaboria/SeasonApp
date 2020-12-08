import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

    state = { lat: null, errorMessage: "" };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            success => this.setState({ lat: success.coords.latitude }),
            error => this.setState({ errorMessage: error.message })
        );
        setInterval(() => {
            this.setState({time : new Date().toLocaleTimeString()})    
        }, 1000);
    }

    //render healper method
    renderContent() {
        if (this.state.errorMessage && !this.state.lat)
            return <div> Error: {this.state.errorMessage} </div>
        if (this.state.lat && !this.state.errorMessage)
            return <SeasonDisplay lat={this.state.lat} time= {this.state.time} />
        return <Spinner message="Please accept loacation request..." />
    }

    render() {
        return <div className="border green"> {this.renderContent()} </div>
    }
}
ReactDOM.render(<App />, document.querySelector("#root"));