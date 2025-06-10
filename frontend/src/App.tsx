import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface Notes {
  id: number;
  content: string | null;
}

interface Note {
  id?: number;
  content: string;
}

function App() {
  const [notes, setNotes] = useState<Notes[] | null>(null);
  const [noteContent, setNoteContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:5000/notes')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setNotes(data))
      .catch(err => console.error('Error fetching weather:', err));
  }, []);

  const handleSubmitNote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!noteContent.trim()) {
      setSubmitMessage('Please enter a note before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('http://localhost:5000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: noteContent }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdNote: Note = await response.json();
      setSubmitMessage(`Note saved successfully! ID: ${createdNote.id}`);
      setNoteContent(''); // Clear the input
    } catch (error) {
      console.error('Error submitting note:', error);
      setSubmitMessage('Failed to save note. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
         <form onSubmit={handleSubmitNote} style={{ marginTop: '20px' }}>
          <div>
            <input
              type="text"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Enter your note here..."
              disabled={isSubmitting}
              style={{
                padding: '10px',
                fontSize: '16px',
                marginRight: '10px',
                minWidth: '300px'
              }}
            />
            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: isSubmitting ? '#ccc' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Saving...' : 'Save Note'}
            </button>
          </div>
          {submitMessage && (
            <p style={{ 
              marginTop: '10px', 
              color: submitMessage.includes('successfully') ? 'green' : 'red',
              fontSize: '14px'
            }}>
              {submitMessage}
            </p>
          )}
        </form>
        {notes ? (
          <ul>
            {notes.map(note => (
              <li key={note.id}>
                {note.id}: {note.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading notes...</p>
        )}

       
      </header>
    </div>
  );
}

export default App;