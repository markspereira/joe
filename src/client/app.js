import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render(){
        const {hello} = this.props.greetings;
        return <h1>{hello}</h1>;
    }
}

ReactDOM.render()
