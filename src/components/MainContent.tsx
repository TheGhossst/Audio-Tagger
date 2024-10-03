import { useState, useRef, ChangeEvent } from 'react';
import { Music, Image, Download } from 'lucide-react';
import { ID3Writer } from 'browser-id3-writer';

type Metadata = {
    title: string;
    artist: string;
    album: string;
};

export function MainContent() {
    const [file, setFile] = useState<File | null>(null);
    const [metadata, setMetadata] = useState<Metadata>({ title: '', artist: '', album: '' });
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        if (selectedFile) { 
            setFile(selectedFile);
            setMetadata({...metadata, title: selectedFile.name});
        }
    
        console.log(selectedFile);
    };
    

    const handleMetadataChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMetadata((prevMetadata) => ({ ...prevMetadata, [name]: value }));

        console.log(metadata)
    };

    const handleCoverImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files?.[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    // Store the base64-encoded image in state or any other variable
                    setCoverImage(e.target.result as string); // Store the base64 image in state for later use
                }
            };
            reader.readAsDataURL(selectedImage); // Convert the image to base64
        }
        console.log(selectedImage)
    };

    const handleDownload = async () => {
        if (!file) {
            alert("Upload a file first!");
            return;
        }
    
        // Read the file as an ArrayBuffer for the ID3Writer
        const arrayBuffer = await file.arrayBuffer();
    
        const writer = new ID3Writer(arrayBuffer);
        writer.setFrame('TIT2', metadata.title);  // Set the title
        writer.setFrame('TPE1', [metadata.artist]); // Set the artist
        writer.setFrame('TALB', metadata.album); // Set the album
    
        // Add cover image if available
        if (coverImage) {
            // Convert the cover image (base64 string) to binary data
            const imageData = await fetch(coverImage).then(res => res.arrayBuffer());
    
            writer.setFrame('APIC', {
                type: 3, // Cover front
                data: imageData, // Cover image data as ArrayBuffer
                description: 'Cover image',
                useUnicodeEncoding: false,
            });
        }
    
        writer.addTag(); // Add the ID3 tag
    
        // Create a Blob from the tagged audio buffer
        const taggedBlob = new Blob([writer.getBlob()], { type: file.type });

        const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'mp3'; 
    
        // Generate a URL for the Blob
        const url = URL.createObjectURL(taggedBlob);
    
        // Create a hidden link to trigger download
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${metadata.title}.${fileExtension}`;
        document.body.appendChild(a);
        a.click(); // Simulate a click to download the file
        window.URL.revokeObjectURL(url); // Clean up the URL object
    
        // Clear file inputs and reset state after download
        setFile(null);
        setMetadata({ title: '', artist: '', album: '' });
        setCoverImage(null);
    
        // Reset the input file elements
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (imageInputRef.current) {
            imageInputRef.current.value = '';
        }
    };
    
    

    return (
        <div className="card">
            <div className="card-header">
                <h2 className="card-title">Audio File Tagger</h2>
            </div>
            <div className="card-content">
                <div className="form-group">
                    <button className="btn" onClick={() => fileInputRef.current?.click()}>
                        <Music className="icon" /> Select Audio File
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden-input"
                        onChange={handleFileChange}
                        accept=".mp3, .wav"
                    />
                    {file && <p className="file-name">{file.name}</p>}
                </div>

                {file && (
                    <>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                name="title"                             
                                value={metadata.title}
                                onChange={handleMetadataChange}
                                className="input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="artist">Artist</label>
                            <input
                                id="artist"
                                name="artist"
                                value={metadata.artist}
                                onChange={handleMetadataChange}
                                className="input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="album">Album</label>
                            <input
                                id="album"
                                name="album"
                                value={metadata.album}
                                onChange={handleMetadataChange}
                                className="input"
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn" onClick={() => imageInputRef.current?.click()}>
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
                                <div className='cover-image-loaded'>
                                    <p className="file-name">Cover image loaded</p>
                                    <img
                                        src={coverImage}
                                        alt="Cover"
                                        className="cover-preview"
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