import { useState, useEffect } from 'react';

function ShowTime() {
  const [time, setTime] = useState(new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="text-white">{new Date(time).toLocaleTimeString()}</p>
    </div>
  );
}

export default ShowTime;
