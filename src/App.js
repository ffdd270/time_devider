import CurrentClock from "./current_clock";
import logo from './logo.svg';
import './App.css';
import TimeArea from "./time_area";
import Button from "@material-ui/core/Button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CurrentClock/>
        <TimeArea/>
      </header>
    </div>
  );
}

export default App;
