import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

    state = { lat: null, errorMessage: "" };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            success => this.setState({ lat: success.coords.latitude }),
            error => this.setState({ errorMessage: error.message })
        );
    }

    //render healper method
    renderContent() {
        if (this.state.errorMessage && !this.state.lat)
            return <div> Error: {this.state.errorMessage} </div>
        if (this.state.lat && !this.state.errorMessage)
            return <SeasonDisplay lat={this.state.lat} />
        return <Spinner message="Please accept loacation request..." />
    }

    render() {
        return <div className="border green"> {this.renderContent} </div>
    }
}
ReactDOM.render(<App />, document.querySelector("#root"));