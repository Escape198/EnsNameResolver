import React, { useState } from 'react';
import axios from 'axios';

export const Resolver: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleResolve = async () => {
    if (input.endsWith('.eth')) {
      const res = await axios.get(`http://localhost:5000/resolve/${input}`);
      setResult(res.data.address);
      setHistory((prev) => [`${input} → ${res.data.address}`, ...prev]);
    } else {
      const res = await axios.get(`http://localhost:5000/lookup/${input}`);
      setResult(res.data.name);
      setHistory((prev) => [`${input} → ${res.data.name}`, ...prev]);
    }
  };

  return (
    <div>
      <h2>ENS Name Resolver</h2>
      <input
        type="text"
        placeholder="ENS name or address"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleResolve}>Resolve</button>
      <p>Result: {result}</p>
      <h3>History</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
