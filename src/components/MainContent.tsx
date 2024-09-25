import { useState, useRef, ChangeEvent } from 'react';
import { Music, Image, Download } from 'lucide-react';
import * as mmb from 'music-metadata-browser';

type Metadata  = {
  title: string;
  artist: string;
  album: string;
  picture?: Blob;
}

export function MainContent(){
    const [file, setFile] = useState<File | null>(null);
    const [metadata, setMetadata] = useState<Metadata>({
        title: '',
        artist: '',
        album: '',
    });
    const [coverImage, setCoverImage] = useState<Blob | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    };

    const handleMetadataChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMetadata((prev) => ({ ...prev, [name]: value }));
    };

    const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedImage = e.target.files?.[0];
        if (selectedImage) {
        setCoverImage(selectedImage);
        }
    };

    const handleDownload = () => {
        if (file) {
        const element = document.createElement('a');
        element.href = URL.createObjectURL(file);
        element.download = `${metadata.title}.mp3`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        }
    };

    return (
        <div className = "card">
            <div className = "card-header">
                <h2 className = "card-title">Audio File Tagger</h2>
            </div>
            <div className = "card-content">
                <div className = "form-group">
                    <button className = "btn" onClick={() => fileInputRef.current?.click()}>
                        <Music className = "icon" /> Select Audio File
                    </button>
                    <input
                        type = "file"
                        ref = { fileInputRef }
                        className = "hidden-input"
                        onChange={ handleFileChange }
                        accept = "audio/*"
                    />
                    {file && <p className = "file-name">{file.name}</p>}
                </div>

                {file && (
                <>
                    <div className = "form-group">
                        <label htmlFor = "title">Title</label>
                        <input
                            id = "title"
                            name = "title"
                            value = { metadata.title }
                            onChange ={ handleMetadataChange }
                            className = "input"
                        />
                    </div>

                    <div className = "form-group">
                        <label htmlFor = "artist">Artist</label>
                        <input
                            id = "artist"
                            name = "artist"
                            value = { metadata.artist }
                            onChange ={ handleMetadataChange }
                            className = "input"
                        />
                    </div>

                    <div className = "form-group">
                        <label htmlFor = "album">Album</label>
                        <input
                            id = "album"
                            name = "album"
                            value = { metadata.album }
                            onChange = { handleMetadataChange }
                            className = "input"
                        />
                    </div>

                    <div className = "form-group">
                        <button 
                            className = "btn" 
                            onClick={() => imageInputRef.current?.click()}
                        >
                        <Image className="icon" /> Change Cover Image
                        </button>
                        <input
                            type="file"
                            ref={imageInputRef}
                            className="hidden-input"
                            onChange={handleCoverImageChange}
                            accept="image/*"
                        />
                        {coverImage && (
                            <div className = 'cover-image-loaded'>
                                <p className="file-name">Cover image loaded</p>
                                <img 
                                    src = { URL.createObjectURL(coverImage) } 
                                    alt="Cover"  
                                />
                            </div>
                        )}
                    </div>

                    <button className="btn btn-download" onClick={handleDownload}>
                    <Download className="icon" /> Download Tagged File
                    </button>
                </>
                )}
            </div>
        </div>
    );
}