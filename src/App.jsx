import { useState } from "react";
import ClockList from "./components/clock-list";
import LocalClock from "./components/local-clock";
import useClock from "./hooks/useClock";

function App() {
  const { date: localDate } = useClock();
  console.log(localDate);
  return (
    <div>
      <LocalClock date={localDate} />
      <ClockList />
    </div>
  );
}

export default App;
