"use client"

import { useAuth } from "@/app/lib/AuthContext";
import { useState, useEffect } from "react";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter, useParams } from "next/navigation";

type QuestionType = 'text' | 'single' | 'multiple' | 'truefalse';

interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
}

interface TextQuestion extends BaseQuestion {
  type: 'text';
  answer: string;
}

interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single';
  options: string[];
  correctAnswer: number;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple';
  options: string[];
  correctAnswers: number[];
}

interface TrueFalseQuestion extends BaseQuestion {
  type: 'truefalse';
  correctAnswer: boolean;
}

type Question = TextQuestion | SingleChoiceQuestion | MultipleChoiceQuestion | TrueFalseQuestion;

export default function EditQuiz() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const quizId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestionType, setNewQuestionType] = useState<QuestionType>('text');

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  const fetchQuiz = async () => {
    try {
      const quizDoc = await getDoc(doc(db, "quizzes", quizId));
      if (quizDoc.exists()) {
        const data = quizDoc.data();
        setTitle(data.title);
        setDescription(data.description);
        setQuestions(data.questions || []);
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "quizzes", quizId), {
        title,
        description,
        questions
      });
      router.push("/myquizzes");
    } catch (error) {
      console.error("Error saving quiz:", error);
      alert("Error saving quiz");
    } finally {
      setSaving(false);
    }
  };

  const handleAddQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const questionText = formData.get("question") as string;

    let newQuestion: Question;

    switch (newQuestionType) {
      case 'text':
        newQuestion = {
          id: Date.now().toString(),
          type: 'text',
          question: questionText,
          answer: formData.get("answer") as string
        };
        break;
      case 'single':
        const singleOptions = [
          formData.get("option1"),
          formData.get("option2"),
          formData.get("option3"),
          formData.get("option4")
        ].filter(Boolean) as string[];
        newQuestion = {
          id: Date.now().toString(),
          type: 'single',
          question: questionText,
          options: singleOptions,
          correctAnswer: parseInt(formData.get("correctAnswer") as string)
        };
        break;
      case 'multiple':
        const multiOptions = [
          formData.get("option1"),
          formData.get("option2"),
          formData.get("option3"),
          formData.get("option4")
        ].filter(Boolean) as string[];
        const correctAnswers: number[] = [];
        multiOptions.forEach((_, index) => {
          if (formData.get(`correct${index}`)) {
            correctAnswers.push(index);
          }
        });
        newQuestion = {
          id: Date.now().toString(),
          type: 'multiple',
          question: questionText,
          options: multiOptions,
          correctAnswers
        };
        break;
      case 'truefalse':
        newQuestion = {
          id: Date.now().toString(),
          type: 'truefalse',
          question: questionText,
          correctAnswer: formData.get("correctAnswer") === "true"
        };
        break;
    }

    setQuestions([...questions, newQuestion]);
    setShowAddQuestion(false);
    (e.target as HTMLFormElement).reset();
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm("Are you sure you want to delete this question?")) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleEditQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, ...updates } as Question : q
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Quiz</h1>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/myquizzes")}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              {saving ? 'Saving...' : 'Save Quiz'}
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Quiz Details</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Questions ({questions.length})</h2>
            <button
              onClick={() => setShowAddQuestion(!showAddQuestion)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              {showAddQuestion ? 'Cancel' : 'Add Question'}
            </button>
          </div>

          {showAddQuestion && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Type
                </label>
                <select
                  value={newQuestionType}
                  onChange={(e) => setNewQuestionType(e.target.value as QuestionType)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="text">Text Answer</option>
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choice</option>
                  <option value="truefalse">True/False</option>
                </select>
              </div>

              <form onSubmit={handleAddQuestion} className="space-y-4">
                <div>
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    id="question"
                    name="question"
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter question"
                  />
                </div>

                {newQuestionType === 'text' && (
                  <div>
                    <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
                      Answer
                    </label>
                    <input
                      type="text"
                      id="answer"
                      name="answer"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter answer"
                    />
                  </div>
                )}

                {newQuestionType === 'single' && (
                  <>
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Option {num}
                        </label>
                        <input
                          type="text"
                          name={`option${num}`}
                          required={num <= 2}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder={`Option ${num}${num > 2 ? ' (optional)' : ''}`}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Correct Answer
                      </label>
                      <select
                        name="correctAnswer"
                        required
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="0">Option 1</option>
                        <option value="1">Option 2</option>
                        <option value="2">Option 3</option>
                        <option value="3">Option 4</option>
                      </select>
                    </div>
                  </>
                )}

                {newQuestionType === 'multiple' && (
                  <>
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name={`correct${num - 1}`}
                          id={`correct${num - 1}`}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <input
                          type="text"
                          name={`option${num}`}
                          required={num <= 2}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder={`Option ${num}${num > 2 ? ' (optional)' : ''}`}
                        />
                      </div>
                    ))}
                    <p className="text-sm text-gray-500">Check the boxes for correct answers</p>
                  </>
                )}

                {newQuestionType === 'truefalse' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Correct Answer
                    </label>
                    <select
                      name="correctAnswer"
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Add Question
                </button>
              </form>
            </div>
          )}

          {questions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No questions yet. Click "Add Question" to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={q.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Question {index + 1}</span>
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {q.type === 'text' && 'Text Answer'}
                        {q.type === 'single' && 'Single Choice'}
                        {q.type === 'multiple' && 'Multiple Choice'}
                        {q.type === 'truefalse' && 'True/False'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Question
                      </label>
                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) => handleEditQuestion(q.id, { question: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    {q.type === 'text' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Answer
                        </label>
                        <input
                          type="text"
                          value={q.answer}
                          onChange={(e) => handleEditQuestion(q.id, { answer: e.target.value })}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>
                    )}

                    {q.type === 'single' && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Options</label>
                        {q.options.map((option, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="radio"
                              checked={q.correctAnswer === idx}
                              onChange={() => handleEditQuestion(q.id, { correctAnswer: idx })}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...q.options];
                                newOptions[idx] = e.target.value;
                                handleEditQuestion(q.id, { options: newOptions });
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {q.type === 'multiple' && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Options</label>
                        {q.options.map((option, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={q.correctAnswers.includes(idx)}
                              onChange={(e) => {
                                const newCorrectAnswers = e.target.checked
                                  ? [...q.correctAnswers, idx]
                                  : q.correctAnswers.filter(i => i !== idx);
                                handleEditQuestion(q.id, { correctAnswers: newCorrectAnswers });
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...q.options];
                                newOptions[idx] = e.target.value;
                                handleEditQuestion(q.id, { options: newOptions });
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {q.type === 'truefalse' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Correct Answer
                        </label>
                        <select
                          value={q.correctAnswer.toString()}
                          onChange={(e) => handleEditQuestion(q.id, { correctAnswer: e.target.value === 'true' })}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
