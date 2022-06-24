import { addMinutes } from "date-fns/esm";
import { useEffect, useState } from "react";

// const init = {
//   id: "",
//   title: "",
//   timezone: {
//     type: "",
//     offset: "",
//   },
//   date_utc: null,
//   date: null,
// };

const TIMEZONE_OFFSET = {
  PST: -7,
  EST: -4,
  EDT: -4,
  BST: 1,
  MST: -6,
};
const utcOffset = new Date().getTimezoneOffset();
/* 
    Calculation -> 

    UTC is ahead of 7 hours from PST = UTC - PST => 7 or 14 - 7 = +7
    UTC is Behind of 6 hours from local = UTC - Local => -6 or 15 - 21 = -6 

    UTC+0, ahead means we need to add to UTC+0
           behind means we need to substract from UTC+0
    
    For Example, 
    we have UTC+0 and we have offset = -6 , that means UTC is behind of 6 hours from the desired timezone offset. UTC+0 + -(-6) => UTC+0 + 6 => UTC+6

    Another Example, 
    We want to have the time of PST and We know that UTC is ahead of 7 hours from PST. That means UTC needs to go back 7 hours from UTC+0 time to get the PST Time.
    So we have offset = +7. 

    We can do, 

    UTC+0 + -(+7) => UTC+0 + (-7) => UTC+0 - 7 = UTC-7

*/

const useClock = (timezone, offset = 0) => {
  const [localDate, setLocalDate] = useState(null);
  const [localOffset, setLocalOffset] = useState(0);
  const [utc, setUTC] = useState(null);

  useEffect(() => {
    const ld = new Date();
    const lo = ld.getTimezoneOffset();
    const d = addMinutes(ld, lo);

    setUTC(d);
    setLocalOffset(lo);
  }, []);

  useEffect(() => {
    if (utc !== null) {
      if (timezone) {
        offset = TIMEZONE_OFFSET[timezone] ?? offset;
      } else {
        offset = -localOffset / 60;
      }
      const newUTC = addMinutes(utc, offset * 60);
      setLocalDate(newUTC);
    }
  }, [utc]);

  return {
    date: localDate,
    dateUTC: utc,
    offset,
    localOffset,
    timezone,
  };
};

export default useClock;
