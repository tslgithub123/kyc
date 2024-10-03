import React, { useState } from 'react';
import axios from 'axios';

const Transmission = () => {

     const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        // console.log("hello");
        if (selectedFile) {
            setFile(selectedFile);
            setFileUrl(URL.createObjectURL(selectedFile)); // Create a URL for the file
        }
    };

    // const handleUpload = (event) => {
    //     event.preventDefault();
    //     console.log("file");
    
    //     if (file) {
    //         alert(`File uploaded: ${file.name}`);
            
    //     }else{
    //         console.log("File submit Error.")
    //     }
    // };

    const handleUpload = async (event) => {
        event.preventDefault();
    
        if (!file) {
            console.log("File submit Error.");
            alert("Please select a file to upload.");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file); // Use "file" to match the backend
    
        try {
            const response = await axios.post("http://localhost:8080/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert(`File uploaded: ${response.data}`);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error uploading file.");
        }
    };
    
    

    return (
        <div>
            <h1>File Upload</h1>

            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} required />
                <button type="submit" disabled={!file}>
                    Upload File
                </button>
            </form>

            {/* {file && (
                <div>
                    <p>Uploaded File: {file.name}</p>
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">View File</a>
                </div>
            )} */}
        </div>
    );
};

//     const [file, setFile] = useState(null);
//     const [filename, setFilename] = useState('');

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const handleUpload = async (event) => {
//         event.preventDefault();
//         if (!file) return;

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('api/file/upload', formData);
//             alert(response.data);
//         } catch (error) {
//             alert('Failed to upload file: ' + error.message);
//         }
//     };

//     const handleDownload = async (event) => {
//         event.preventDefault();
//         if (!filename) return;

//         try {
//             const response = await axios.get(`api/file/download/${filename}`, {
//                 responseType: 'blob',
//             });
//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', filename);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//         } catch (error) {
//             alert('Failed to download file: ' + error.message);
//         }
//     };

//     return (
//         <div>
//             <h1>File Upload and Download</h1>

//             <form onSubmit={handleUpload}>
//                 <input type="file" onChange={handleFileChange} required />
//                 <button type="submit">Upload File</button>
//             </form>

//             <form onSubmit={handleDownload}>
//                 <input
//                     type="text"
//                     placeholder="Enter filename to download"
//                     value={filename}
//                     onChange={(e) => setFilename(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Download File</button>
//             </form>
//         </div>
//     );
// };

export default Transmission;
