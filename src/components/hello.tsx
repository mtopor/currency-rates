import { text } from "express";
import React from "react";

interface Props {
  text: string;
}

const App: React.FC<Props> = ({ text }) => {
  return (
    <div>
      <span>{`Hello from component ${text}`}</span>
    </div>
  );
};

export default App;
