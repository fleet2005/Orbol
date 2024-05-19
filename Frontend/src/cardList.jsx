import React, { useEffect, useState } from 'react';
import './index.css';

const CardList = () => {
  const [details, setDetails] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({
    card_id: '',
    title: '',
    short_description: '',
    background_image_url: '', 
    logo_image_url: '',  
  });
  const [currentDetailId, setCurrentDetailId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCardData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://orbol-backend.vercel.app/api/details/delete/${id}`, {
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
      setError(error.message);
      console.error('Error deleting card:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://orbol-backend.vercel.app/api/details/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchCardData();
        setFormData({
          card_id: '',
          title: '',
          short_description: '',
          background_image_url: '',
          logo_image_url: ''
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
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log('Updating card...');
    console.log('Current detail ID:', currentDetailId);
    console.log('Form data:', formData);
    try {
  
      console.log('Background image URL:', formData.background_image_url);
      console.log('Logo image URL:', formData.logo_image_url);
  
      const response = await fetch(`https://orbol-backend.vercel.app/api/details/update/${currentDetailId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      console.log('Update response:', response);
  
      if (response.ok) {
        console.log('Card updated successfully');
        const updatedDetail = await response.json();  
        console.log('Updated detail:', updatedDetail);  
        setFormData({
          card_id: updatedDetail.card_id,
          title: updatedDetail.title,
          short_description: updatedDetail.short_description,
          background_image_url: updatedDetail.background_image_url,
          logo_image_url: updatedDetail.logo_image_url,
        });
        console.log('Updated formData:', formData);
        
        console.log('Updated formData:', formData);  
        fetchCardData();
        setShowUpdateForm(false);
        setCurrentDetailId(null);
      } else {
        const responseData = await response.json();  
        console.error('Error updating card:', responseData.error);  
        throw new Error('Failed to update card');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error updating card:', error);
    }
  };
  
  
  

  const fetchCardData = async () => {
    try {
      const response = await fetch('https://orbol-backend.vercel.app/api/details/');
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
      background_image_url: detail.background_image_url,  
      logo_image_url: detail.logo_image_url, 
    });
    setCurrentDetailId(detail._id);
    setShowUpdateForm(true);
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
            Background Image URL: 
            <input type="text" name="background_image_url" value={formData.background_image_url} onChange={handleFormChange} /> {}
          </label>
          <label>
            Logo Image URL: 
            <input type="text" name="logo_image_url" value={formData.logo_image_url} onChange={handleFormChange} /> {}
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
            Background Image URL:  
            <input type="text" name="background_image_url" value={formData.background_image_url} onChange={handleFormChange} /> {/* Changed input name */}
          </label>
          <label>
            Logo Image URL:  
            <input type="text" name="logo_image_url" value={formData.logo_image_url} onChange={handleFormChange} /> {/* Changed input name */}
          </label>
          <div className="form-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={() => setShowUpdateForm(false)}>Close</button>
          </div>
        </form>
      )}
      {details.map(detail => (
        <div className="card" key={detail._id}>
          <img src={detail.background_image_url} alt={`${detail.title} background`} className="card-background" />
          <img src={detail.logo_image_url} alt={`${detail.title} logo`} className="card-logo" />

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
