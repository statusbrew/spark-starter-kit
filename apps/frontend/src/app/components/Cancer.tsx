import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export const Cancerupload: React.FC = () => {
    console.log('hello')
    const [image, setImage] = useState<File | null>(null);
    const [extractedData, setExtractedData] = useState<any>(null)
    const [error,setError]=useState<string | null>(null);
    const onDrop = useCallback((acceptedFiles:any) => {
        setImage(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleUpload = async () => {
        if(!image){
            setError('No image selected.')
            return
        }
        const formData = new FormData();
        formData.append('image', image);
    
        try {
            const response = await fetch('http://localhost:3000/api/v1/proff/cancerupload', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Server error: ' + response.statusText);
            }
    
            const data = await response.json();
            

            if (data.error) {
                setError(data.error);  
                setExtractedData(null);  
            } else {
                setExtractedData(data);  
                setError(null);  
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to upload and process the image. Please try again.');
            setExtractedData(null);  
        }
    };
    
    
    console.log(extractedData)
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className="text-2xl mb-6">Cancer Image Detection</h1>
            <div {...getRootProps()} className="flex justify-center items-center h-1/4 w-1/4 border-2 border-dashed border-gray-400 p-5 cursor-pointer bg-lime-200">
                <input {...getInputProps()} />
                <p className='text-center font-serif font-semibold'>
                    Drag 'n' drop an image here, or click to select one
                </p>
            </div>
    
            {image && (
                <div className="mt-4 text-center">
                    <h3 className="text-lg">Selected Image:</h3>
                    <p>{image.name}</p>
                    <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={handleUpload}>
                        Upload and Process
                    </button>
                </div>
            )}
    
            {error && (
                <div className="text-red-500 mt-4">
                    <p>Error: {error}</p>
                </div>
            )}
    
            {extractedData && (
                <div className="mt-6 text-center">
                    <h3 className="text-lg font-semibold">Extracted Data:</h3>
                    <p><strong>Cancer Prediction:</strong> {extractedData.result === '1' ? 'Positive' : 'Negative'}</p>
                </div>
            )}
        </div>
    );
    
}

export default Cancerupload;
