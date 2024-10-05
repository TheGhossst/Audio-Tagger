//import heroimage from '../assets/images/heroimage.png'

export function Hero(){
    return (
        <div className = "hero-container">
            {/*<img 
                src = { heroimage }
                alt = "Hero Image"
                className = "hero-image"
            />*/}
            <h1>Welcome to TuneTagger</h1>
            <h4>Place where tagging music becomes easy</h4>
            <button>Start Tagging</button>
        </div>
    )
}