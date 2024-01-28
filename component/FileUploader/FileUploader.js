import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './FileUploader.module.scss';
import Image from 'next/image';


function FileUploader({ label, onFilesSelect,title }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const selectedFileArray = Array.from(files);
    setSelectedFiles(selectedFileArray);

    if (onFilesSelect) {
      onFilesSelect(selectedFileArray);
    }
  };

  return (
    <div className={styles.serviceImage}>
    <div className={styles.beforeService}>{title}</div>
    <div className={styles.uploadbtn}>
        <label htmlFor="fileInput">
            <Image
                src="/assets/wash/plus.png"
                width={32}
                height={40}
                alt="upload"
            />
        </label>
        <input
            id="fileInput"
            type="file"
            className={styles.uploadImg}
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
        />
    </div>
    {selectedFiles.length > 0 && (
        <div className={styles.selectedFiles}>
            <h3>Selected Files:</h3>
            <ul>
                {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                ))}
            </ul>
        </div>
    )}
</div>
  );
}

FileUploader.propTypes = {
  label: PropTypes.string.isRequired,
  onFilesSelect: PropTypes.func,
};

export default FileUploader;
