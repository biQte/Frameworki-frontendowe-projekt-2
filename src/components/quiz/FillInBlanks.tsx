"use client"

import { useState } from 'react';

interface FillInBlanksProps {
  title: string;
  content: string;
  blanks: { id: string; position: number }[];
  options: string[];
  correctAnswers: { [key: string]: string };
  onSubmit?: (isCorrect: boolean) => void;
}

export default function FillInBlanks({ title, content, blanks, options, correctAnswers, onSubmit }: FillInBlanksProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (blankId: string, value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [blankId]: value
    });
  };

  const handleSubmit = () => {
    const correct = blanks.every(blank => selectedAnswers[blank.id] === correctAnswers[blank.id]);
    setIsCorrect(correct);
    setSubmitted(true);
    if (onSubmit) {
      onSubmit(correct);
    }
  };

  const renderContentWithBlanks = () => {
    return (
      <div className="text-gray-700 mb-6">
        {blanks.map((blank, index) => (
          <div key={blank.id} className="inline-block mx-1">
            <select
              value={selectedAnswers[blank.id] || ''}
              onChange={(e) => handleSelect(blank.id, e.target.value)}
              disabled={submitted}
              className={`px-3 py-1 border-2 rounded ${submitted
                  ? selectedAnswers[blank.id] === correctAnswers[blank.id]
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300'
                }`}
            >
              <option value="">Select...</option>
              {options.map((option, idx) => (
                <option key={idx} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div
        className="text-gray-700 mb-6"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="mb-6">
        <p className="font-semibold mb-3">Fill in the blanks:</p>
        {renderContentWithBlanks()}
      </div>

      <button
        onClick={handleSubmit}
        disabled={blanks.some(blank => !selectedAnswers[blank.id]) || submitted}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
      >
        Submit Answer
      </button>

      {submitted && (
        <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isCorrect ? '✓ Correct!' : '✗ Incorrect. Try again!'}
        </div>
      )}
    </div>
  );
}
