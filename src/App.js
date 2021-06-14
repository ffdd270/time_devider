import CurrentClock from "./current_clock";
import logo from './logo.svg';
import './App.css';
import TimeArea from "./time_area";
import Button from "@material-ui/core/Button";
import React from "react";


class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            time: Date.now()
        };
    }

    componentDidMount()
    {
    }

    render()
    {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <CurrentClock area={window.localStorage.getItem("time_area_list")}/>
                    <TimeArea onChangeTimeArea={()=>{ this.setState({}) }}/>
                </header>
            </div>
        );
    }
}

export default App;
