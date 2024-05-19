import React, { useEffect, useState } from 'react';
import './index.css';

//Displayed cardlist 

const CardList = () => {
  const [details, setDetails] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({
    card_id: '',
    title: '',
    short_description: '',
    background_image: '',
    logo_image: ''
  });
  const [currentDetailId, setCurrentDetailId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCardData();
  }, []);

  //deletion of cards : delete request

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/details/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setDetails(details.filter(detail => detail._id !== id));
      } else {
        throw new Error('Failed to delete card');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //form submission

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const backgroundBase64 = formData.background_image instanceof File ? await convertToBase64(formData.background_image) : formData.background_image;
      const logoBase64 = formData.logo_image instanceof File ? await convertToBase64(formData.logo_image) : formData.logo_image;

      //Creation of card: POST Request

      const response = await fetch('http://localhost:5000/api/details/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          background_image: backgroundBase64,
          logo_image: logoBase64
        })
      });

      if (response.ok) {
        fetchCardData();
        setFormData({
          card_id: '',
          title: '',
          short_description: '',
          background_image: '',
          logo_image: ''
        });
        setShowForm(false);
      } else {
        throw new Error('Failed to create card');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error creating card:', error);
    }
  };

  //Card Updation : PUT request

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const backgroundBase64 = formData.background_image instanceof File ? await convertToBase64(formData.background_image) : formData.background_image;
      const logoBase64 = formData.logo_image instanceof File ? await convertToBase64(formData.logo_image) : formData.logo_image;

      const response = await fetch(`http://localhost:5000/api/details/update/${currentDetailId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          background_image: backgroundBase64,
          logo_image: logoBase64
        })
      });

      if (response.ok) {
        fetchCardData();
        setFormData({
          card_id: '',
          title: '',
          short_description: '',
          background_image: '',
          logo_image: ''
        });
        setShowUpdateForm(false);
        setCurrentDetailId(null);
      } else {
        throw new Error('Failed to update card');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error updating card:', error);
    }
  };

  //Get All Cards

  const fetchCardData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/details/');
      if (response.ok) {
        const data = await response.json();
        setDetails(data);
      } else {
        throw new Error('Failed to fetch card data');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching card data:', error);
    }
  };

  const handleUpdateClick = (detail) => {
    setFormData({
      card_id: detail.card_id,
      title: detail.title,
      short_description: detail.short_description,
      background_image: detail.background_image,
      logo_image: detail.logo_image
    });
    setCurrentDetailId(detail._id);
    setShowUpdateForm(true);
  };

  //Image-Base^ 64 Converter
  
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="card-container">
      {error && <div className="error-message">{error}</div>}
      <button className="add-card-button" onClick={() => setShowForm(true)}>Add New Card</button>
      {showForm && (
        <form onSubmit={handleFormSubmit} className="card-form">
          <label>
            Card ID:
            <input type="text" name="card_id" value={formData.card_id} onChange={handleFormChange} />
          </label>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleFormChange} />
          </label>
          <label>
            Short Description:
            <input type="text" name="short_description" value={formData.short_description} onChange={handleFormChange} />
          </label>
          <label>
            Background Image:
            <input type="file" name="background_image" onChange={(e) => setFormData({ ...formData, background_image: e.target.files[0] })} />
          </label>
          <label>
            Logo Image:
            <input type="file" name="logo_image" onChange={(e) => setFormData({ ...formData, logo_image: e.target.files[0] })} />
          </label>
          <div className="form-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowForm(false)}>Close</button>
          </div>
        </form>
      )}
      {showUpdateForm && (
        <form onSubmit={handleUpdate} className="card-form">
          <label>
            Card ID:
            <input type="text" name="card_id" value={formData.card_id} onChange={handleFormChange} />
          </label>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleFormChange} />
          </label>
          <label>
            Short Description:
            <input type="text" name="short_description" value={formData.short_description} onChange={handleFormChange} />
          </label>
          <label>
            Background Image:
            <input type="file" name="background_image" onChange={(e) => setFormData({ ...formData, background_image: e.target.files[0] })} />
          </label>
          <label>
            Logo Image:
            <input type="file" name="logo_image" onChange={(e) => setFormData({ ...formData, logo_image: e.target.files[0] })} />
          </label>
          <div className="form-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={() => setShowUpdateForm(false)}>Close</button>
          </div>
        </form>
      )}
      {details.map(detail => (
        <div className="card" key={detail._id}>
          <img src={detail.background_image} alt={`${detail.title} background`} className="card-background" />
          <img src={detail.logo_image} alt={`${detail.title} logo`} className="card-logo" />
          <div className="card-content">
            <h2>{detail.title}</h2>
            <p>{detail.short_description}</p>
          </div>
          <div className="card-actions">
            <button className="update-button" onClick={() => handleUpdateClick(detail)}>Update</button>
            <button className="delete-button" onClick={() => handleDelete(detail._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
    
  );
};

export default CardList;
