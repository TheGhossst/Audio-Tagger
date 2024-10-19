import { X } from 'lucide-react';

interface InfoPopupProps {
  onClose: () => void;
}

export function InfoPopup({ onClose }: InfoPopupProps) {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>
        <div className="popup-content">
          <h2>Welcome to TuneTagger!</h2>
          <p>Here's how to get started with tagging your music:</p>
          <ol>
            <li>Upload your music files</li>
            <li>Select a file to tag</li>
            <li>Edit the metadata (artist, title, album, etc.)</li>
            <li>Save your changes</li>
          </ol>
          <p>Happy tagging!</p>
        </div>
      </div>
    </div>
  );
}