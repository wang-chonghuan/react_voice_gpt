import React, {useState} from "react";
import {textToSpeech} from "../api/textToSpeech";
import Container from '@mui/material/Container';
import {AppBar, Typography} from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const SpeechTestPage: React.FC = () => {
  const [inputText, setInputText] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      await textToSpeech(inputText, process.env.REACT_APP_AZURE_T2S_KEY!, process.env.REACT_APP_AZURE_ZONE!);
    } catch (error) {
      console.error("Error synthesizing speech:", error);
    }
  };

  return (
      <div style={{ width: '24rem', margin: 'auto', marginTop: '1.5rem' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Text to Speech Test Page</Typography>
          </Toolbar>
        </AppBar>

        <div style={{ marginTop: '16px', marginBottom: '8px' }}>
          <TextField
            type="text"
            value={inputText}
            onChange={handleTextChange}
            fullWidth
            style={{ width: '100%' }}
          />
        </div>
        <Button onClick={handleButtonClick} fullWidth style={{ width: '100%' }}>
          Convert to speech
        </Button>
      </div>
  );
};

export default SpeechTestPage;
