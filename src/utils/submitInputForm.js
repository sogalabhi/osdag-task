// src/api.js or utils/api.js (if you have a file like this)
export const submitBeamToBeamForm = async (formData) => {
    const response = await fetch('http://localhost:8000/api/beam-to-beam/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to submit form');
    }
  
    return response.json();
  };
  