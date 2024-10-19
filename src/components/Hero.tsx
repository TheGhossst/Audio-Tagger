//import heroimage from '../assets/images/heroimage.png'
import { useState } from 'react';
import { InfoPopup } from './InfoPopup'

export function Hero(){
    const [showPopup, setShowPopup] = useState(false);

    const handleStartTagging = () => {
        setShowPopup(true);
    };
    return (
        <div className = "hero-container">
            {/*<img 
                src = { heroimage }
                alt = "Hero Image"
                className = "hero-image"
            />*/}
            <h1>Welcome to TuneTagger</h1>
            <h4>Place where tagging music becomes easy</h4>
            <button onClick={handleStartTagging}>
                Start Tagging
            </button>
            {showPopup && <InfoPopup onClose={() => setShowPopup(false)} />}
        </div>
    )
}