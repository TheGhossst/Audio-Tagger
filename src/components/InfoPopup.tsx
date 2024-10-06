import { X } from 'lucide-react';

export function InfoPopup(){
  return (
    <div className = "popup">
      <div className= "popup-container">
        <button 
          onClick={() => alert("Click1")}
          className= "popup-btn"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};