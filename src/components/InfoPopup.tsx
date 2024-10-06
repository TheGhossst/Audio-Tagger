import { X } from 'lucide-react';

type InfoPopupProps = {
    isOpen: boolean;
    onClose: () => void;
}
export function InfoPopup({ isOpen, onClose }: InfoPopupProps) {
    if (!isOpen) return null;
    return (
        <div className = "popup">
        <div className= "popup-container">
            <button 
            /*onClick={() => alert("Click1")}*/
            onClick={ onClose }
            className= "popup-btn"
            aria-label="Close"
            >
            <X size={24} />
            </button>
        </div>
        </div>
    );
};