import React, { useState } from 'react';

function App() {
  const [contacts, setContacts] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contacts, message }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('SMS enviado com sucesso!');
        setContacts('');
        setMessage('');
      } else {
        setError('Erro ao enviar SMS: ' + (data.error || 'Erro desconhecido'));
      }
    } catch (err) {
      setError('Erro de conexão com o backend: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, Arial, sans-serif',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '18px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
        padding: '40px 30px',
        width: '100%',
        maxWidth: '420px',
        margin: '30px',
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#5a189a',
          letterSpacing: '1px',
          fontWeight: 700,
        }}>
          SMS Code
        </h1>
        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ fontWeight: 600, color: '#764ba2' }}>Contatos:</label>
            <textarea
              value={contacts}
              onChange={(e) => setContacts(e.target.value)}
              placeholder="Digite os números (um por linha, vírgula ou espaço)"
              style={{
                width: '100%',
                height: '70px',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                marginTop: '6px',
                fontSize: '15px',
                resize: 'vertical',
                background: '#f8f9fa',
              }}
              required
            />
          </div>
          <div>
            <label style={{ fontWeight: 600, color: '#764ba2' }}>Mensagem:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem"
              style={{
                width: '100%',
                height: '70px',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                marginTop: '6px',
                fontSize: '15px',
                resize: 'vertical',
                background: '#f8f9fa',
              }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px',
              fontSize: '17px',
              fontWeight: 700,
              background: loading ? '#bdbdbd' : 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px 0 rgba(118, 75, 162, 0.10)',
              transition: 'background 0.3s',
            }}
          >
            {loading ? 'Enviando...' : 'Enviar SMS'}
          </button>
        </form>
        {success && (
          <div style={{
            marginTop: '18px',
            background: '#d1fae5',
            color: '#065f46',
            padding: '10px',
            borderRadius: '6px',
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '15px',
          }}>{success}</div>
        )}
        {error && (
          <div style={{
            marginTop: '18px',
            background: '#fee2e2',
            color: '#991b1b',
            padding: '10px',
            borderRadius: '6px',
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '15px',
          }}>{error}</div>
        )}
        <div style={{
          marginTop: '30px',
          textAlign: 'center',
          color: '#bdbdbd',
          fontSize: '13px',
        }}>
          Desenvolvido com <span style={{ color: '#764ba2', fontWeight: 700 }}>Twilio</span> & <span style={{ color: '#667eea', fontWeight: 700 }}>React</span>
        </div>
      </div>
    </div>
  );
}

export default App;
