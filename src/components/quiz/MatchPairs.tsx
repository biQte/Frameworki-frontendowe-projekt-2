"use client"

import { useState, useEffect, useMemo } from 'react';

interface Pair {
  left: string;
  right: string;
}

interface MatchPairsProps {
  title: string;
  content: string;
  pairs: Pair[];
  onSubmit?: (isCorrect: boolean) => void;
}

export default function MatchPairs({ title, content, pairs, onSubmit }: MatchPairsProps) {
  const [selectedMatches, setSelectedMatches] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [rightItems, setRightItems] = useState<string[]>([]);

  const leftItems = useMemo(() => pairs.map(p => p.left), [pairs]);

  useEffect(() => {
    const shuffled = [...pairs.map(p => p.right)].sort(() => Math.random() - 0.5);
    setRightItems(shuffled);
  }, [pairs]);

  const handleMatch = (left: string, right: string) => {
    setSelectedMatches({
      ...selectedMatches,
      [left]: right
    });
  };

  const handleSubmit = () => {
    const correct = pairs.every(pair => selectedMatches[pair.left] === pair.right);
    setIsCorrect(correct);
    setSubmitted(true);
    if (onSubmit) {
      onSubmit(correct);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div
        className="text-gray-700 mb-6"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {rightItems.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Column A</h3>
              <div className="space-y-2">
                {leftItems.map((left, idx) => (
                  <div key={idx} className="p-3 bg-gray-100 rounded-lg">
                    {left}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Column B</h3>
              <div className="space-y-2">
                {leftItems.map((left, idx) => {
                  const correctRight = pairs.find(p => p.left === left)?.right;
                  return (
                    <select
                      key={idx}
                      value={selectedMatches[left] || ''}
                      onChange={(e) => handleMatch(left, e.target.value)}
                      disabled={submitted}
                      className={`w-full p-3 border-2 rounded-lg ${submitted
                        ? selectedMatches[left] === correctRight
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-gray-300'
                        }`}
                    >
                      <option value="">Select match...</option>
                      {rightItems.map((right, ridx) => (
                        <option key={ridx} value={right}>{right}</option>
                      ))}
                    </select>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={leftItems.some(left => !selectedMatches[left]) || submitted}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Submit Answer
          </button>

          {submitted && (
            <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect. Try again!'}
            </div>
          )}
        </>
      )}
    </div>
  );
}
