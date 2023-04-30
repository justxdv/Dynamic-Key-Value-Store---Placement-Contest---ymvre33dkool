import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/App.css';

const KeyValueStore = () => {
  const { key1, value1, key2, value2 } = useParams();
  const navigate = useNavigate();

  const [keyValues, setKeyValues] = useState({});

  const updateKeyValue = (key, value) => {
    setKeyValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdateClick = () => {
    const urlSearchParams = new URLSearchParams();
    Object.entries(keyValues).forEach(([key, value]) => {
      urlSearchParams.append(key, value);
    });
    navigate(`/?${urlSearchParams.toString()}`);
  };

  const handleDeleteClick = (key) => {
    const newKeyValues = { ...keyValues };
    delete newKeyValues[key];
    setKeyValues(newKeyValues);
  
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.delete(key);
    navigate(`/?${urlSearchParams.toString()}`);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const newKeyValues = {};
    urlSearchParams.forEach((value, key) => {
      newKeyValues[key] = value;
    });
    setKeyValues(newKeyValues);
  }, []);

  return (
    <div>
      <h1>Key Value Store</h1>
      {Object.keys(keyValues).length ? (
        <>
          {Object.entries(keyValues).map(([key, value]) => (
            <div key={key} className="key-value-div">
              <span className="key-field">{key}:</span>
              <input
                className="value-field"
                type="text"
                value={value}
                onChange={(e) => updateKeyValue(key, e.target.value)}
              />
              <button className="delete-btn" onClick={() => handleDeleteClick(key)}>
                Delete
              </button>
            </div>
          ))}
          <button className="update-btn" onClick={handleUpdateClick}>
            Update Values
          </button>
        </>
      ) : (
        <p>No key values found in URL.</p>
      )}
    </div>
  );
      };

export default KeyValueStore;
