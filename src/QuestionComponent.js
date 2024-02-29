// QuestionComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const QuestionComponent = () => {
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5002/chat', { question, chat_history: '' });
      console.log(response.data);
      if (response.data) {
        setChatHistory([
          ...chatHistory,
          { user: question, type: 'user' },
          { bot: response.data, type: 'bot' },
        ]);
        setQuestion('');
        setError('');
      } else {
        setError('No answer received from the server.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error occurred while fetching the answer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-auto p-4" id="chat-history">
        {chatHistory.map((item, index) => (
          <div key={index} className={`flex items-start gap-2.5 ${item.type === 'user' ? 'justify-end' : ''}`}>
            {item.type === 'user' ? (
              <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 bg-gray-300 rounded-lg mb-5 ${item.type === 'user' ? 'text-gray-800' : 'bg-gray-300 text-white  mb-10'}`}>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className={`${item.type === 'user' ? 'text-gray-900 ' : 'text-sm font-bold text-white '}`}>{item.type === 'user' ? 'You' : 'Bot'}</span>
                </div>
                <p className="text-sm font-normal py-2.5">{item[item.type]}</p>
              </div>
            ) : (
              <div className={`flex flex-col w-full max-w-[600px] leading-1.5 p-4 bg-gray-300 text-white rounded-lg dark:bg-gray-700 mb-10`}>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className={`${item.type === 'user' ? 'text-gray-900 ' : 'text-sm font-bold text-white '}`}>{item.type === 'user' ? 'You' : 'Bot'}</span>
                </div>
                <p className="text-sm font-normal py-2.5">{item[item.type]}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center p-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 px-4 py-2 mr-4 bg-gray-800 border border-gray-700 rounded text-white"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading || !question.trim()}
        >
          {loading ? 'Sending...' : 'Submit'}
        </button>
        {loading && (
          <div className="ml-2 border border-blue-500 rounded-full h-6 w-6 border-t-0 border-4 animate-spin"></div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-red-500 text-center"><strong>Error:</strong> {error}</p>
      )}
    </div>
  );
};

export default QuestionComponent;
