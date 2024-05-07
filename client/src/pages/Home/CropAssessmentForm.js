import React, { useState } from 'react';
import axios from 'axios';

const CropAssessmentForm = () => {
  const [formValues, setFormValues] = useState({
    soilType: '',
    temperature: '',
    geographicalLocation: ''
  });
  const [generatedText, setGeneratedText] = useState('');
  const [generatingText, setGeneratingText] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const generateRecommendations = async (event) => {
    event.preventDefault();
    setGeneratingText(true);
    setGeneratedText("Loading recommendations...");

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAY3H6dPdMOppIEM6qw4klbOB7i7yOXOEI",
        {
          contents: [{
            parts: [{
              text: `Farmers input details about their land, including soil type, temperature, and geographical location,
              provide general recommendations on suitable crops for cultivation in that area based on predetermined guidelines and agricultural best practices.
              give a well structured answer with heading and paragraphs
              Based on the user-provided data and pre-defined irrigation schedules for different crop types, generate basic irrigation 
              recommendations.suggest general watering intervals and quantities,considering factors such as soil type and weather conditions.

              Input details:
              Soil type: ${formValues.soilType}
              Temperature: ${formValues.temperature}
              Geographical location: ${formValues.geographicalLocation}`
            }]
          }]
        }
      );

      const recommendedText = response.data.candidates[0].content.parts[0].text;
      setGeneratedText(recommendedText);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      setGeneratedText("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingText(false);
  };

  const renderRecommendations = () => {
    // Split the generated text into sections based on the headings
    const sections = generatedText.split('##');

    return (
      <div>
        {sections.map((section, index) => {
          const lines = section.trim().split('\n');
          // If the section contains lines, render them as paragraphs
          if (lines.length > 0) {
            return (
              <div key={index}>
                {index > 0 && <hr style={{ margin: '20px 0' }} />}
                {lines.map((line, idx) => <p key={idx}>{line}</p>)}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div>
      <h2>Provide Details for Crop Suitability Assessment</h2>
      <form onSubmit={generateRecommendations}>
        <div>
          <label htmlFor="soilType">Soil Type:</label>
          <input
            type="text"
            id="soilType"
            name="soilType"
            value={formValues.soilType}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="temperature">Temperature:</label>
          <input
            type="text"
            id="temperature"
            name="temperature"
            value={formValues.temperature}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="geographicalLocation">Geographical Location:</label>
          <input
            type="text"
            id="geographicalLocation"
            name="geographicalLocation"
            value={formValues.geographicalLocation}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={generatingText}>
          {generatingText ? "Generating..." : "Generate Recommendations"}
        </button>
      </form>
      {generatedText && (
        <div>
          <h2>Generated Recommendations:</h2>
          {renderRecommendations()}
        </div>
      )}
    </div>
  );
};

export default CropAssessmentForm;
