import React from 'react';
import './Cheatcodes.css';

const Cheatcodes = () => {
  const cheatCodes = ['CHEAT20', 'BUZZOFF','KILLTREVOR'];

  return (
    <div className="cheatpage">
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button red"></span>
          <span className="terminal-button yellow"></span>
          <span className="terminal-button green"></span>
        </div>
        <div className="terminal-title">Cheat Codes Terminal</div>
      </div>
      <div className="terminal-body">
        {cheatCodes.map((code, index) => (
          <div key={index} className="terminal-line">
            <span className="terminal-prompt">$</span> {code}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Cheatcodes;
