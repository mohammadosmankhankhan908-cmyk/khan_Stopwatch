import { useState } from 'react';
export default function Navbar() {
  const [broken, setBroken] = useState(false);
  return (
    <header className="navbar">
      <div className="brand">
        <span className="logo" />
        <div>
          <h1>khan Stopwatch</h1>
          <p>Time is Precious... Use it Wisely!</p>
        </div>
      </div>
      <div className="avatar">
        {broken ? <span>K</span> : <img src={`${import.meta.env.BASE_URL}photo.png`} alt="Profile" onError={() => setBroken(true)} />}
      </div>
    </header>
  );
}
