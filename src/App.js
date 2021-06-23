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
            time: Date.now(),
            fix_area_id: null,
            time_area_list: window.localStorage.getItem("time_area_list")
        };
    }

    componentDidMount()
    {
        this.timeAreaFixCallback = this.timeAreaFixCallback.bind()
    }

    timeAreaFixCallback( id )
    {
        this.setState( { fix_area_id: id } )
    }


    render()
    {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <CurrentClock area={this.state.time_area_list} onRequestTimeArea={(key)=>this.setState( {fix_area_id:key} )}/>
                    <TimeArea onChangeTimeArea={()=>{ this.setState({fix_area_id: null, time_area_list:window.localStorage.getItem("time_area_list")}) }} fix_area_id={this.state.fix_area_id}/>
                </header>
            </div>
        );
    }
}

export default App;
