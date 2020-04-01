import React from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

interface Props {
  text: string;
}

const App: React.FC<Props> = ({ text }) => {
  return (
    <div className="App">
      <header className="App-header">
        <span>{`Hello from component ${text}`}</span>
        <DatePicker
          showPopperArrow={false}
          selected={new Date()}
          onChange={(date: any) => console.log(typeof date + " " + date)}
        />
      </header>
    </div>
  );
};

export default App;
