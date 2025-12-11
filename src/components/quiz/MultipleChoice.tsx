"use client"

import { useState } from 'react';

interface Option {
  id: string;
  text?: string;
  image?: string;
}

interface MultipleChoiceProps {
  title: string;
  content: string;
  options: Option[];
  correctAnswers: string[];
  onSubmit?: (isCorrect: boolean) => void;
}

export default function MultipleChoice({ title, content, options, correctAnswers, onSubmit }: MultipleChoiceProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleToggle = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  const handleSubmit = () => {
    const correct =
      selectedOptions.length === correctAnswers.length &&
      selectedOptions.every(id => correctAnswers.includes(id));
    setIsCorrect(correct);
    setSubmitted(true);
    if (onSubmit) {
      onSubmit(correct);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div
        className="text-gray-700 mb-6"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${selectedOptions.includes(option.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-blue-300'
              } ${submitted
                ? correctAnswers.includes(option.id)
                  ? 'border-green-500 bg-green-50'
                  : selectedOptions.includes(option.id)
                    ? 'border-red-500 bg-red-50'
                    : ''
                : ''
              }`}
          >
            <input
              type="checkbox"
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleToggle(option.id)}
              disabled={submitted}
              className="mr-3"
            />
            {option.image ? (
              <img src={option.image} alt={option.text || 'Option'} className="max-h-32" />
            ) : (
              <span>{option.text}</span>
            )}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={selectedOptions.length === 0 || submitted}
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
