import React, { useEffect, useState } from 'react';

const UploadWidget = () => {
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [showUrls, setShowUrls] = useState(false);

  useEffect(() => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dzb1fqdf6',
        uploadPreset: 'yx7zqxkx'
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);
          setUploadedUrls((prevUrls) => [...prevUrls, result.info.secure_url]);
        }
      }
    );

    const openWidget = () => {
      myWidget.open();
    };

    const uploadButton = document.getElementById('upload_widget');
    uploadButton.addEventListener('click', openWidget);

    return () => {
      uploadButton.removeEventListener('click', openWidget);
    };
  }, []);

  const toggleUrls = () => {
    setShowUrls(!showUrls);
  };

  return (
    <div style={{margin:"2vw", marginTop:"3vw"}}>
      <button id="upload_widget" className="cloudinary-button" style={{marginRight:"3vw"}}>Upload files</button>
      <button onClick={toggleUrls} className="cloudinary-button">
        {showUrls ? 'Hide Uploaded URLs' : 'Display Uploaded URLs'}
      </button>
      {showUrls && (
        <div>
          <ul>
            {uploadedUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadWidget;
