import { useEffect, useState } from "react";

const calculateTimeLeft = () => {
const difference = +new Date("2024-12-31") - +new Date();
  let timeLeft: {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  } = {};

if (difference > 0) {
    timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
    };
}

return timeLeft;
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { days = 0, hours = 0, minutes = 0, seconds = 0 } = timeLeft;

  return (
    <div className="bg-[#F9981B] flex justify-between items-center px-4 py-1.5 rounded-t-lg text-white font-medium">
      <span>SPECIAL OFFER</span>
      <span className="">
        Ends in
        <span className="bg-white text-orange-400 p-0.5 rounded-lg mx-1 ml-5 px-1.5 text-sm">
          {hours}
        </span>
        <span className="bg-white text-orange-400 p-0.5 rounded-lg mx-1 px-1.5 text-sm">
          {minutes}
        </span>
        <span className="bg-white text-orange-400 p-0.5 rounded-lg mx-1 px-1.5 text-sm">
          {seconds}
        </span>
      </span>
    </div>
  );
};

export default Countdown;
