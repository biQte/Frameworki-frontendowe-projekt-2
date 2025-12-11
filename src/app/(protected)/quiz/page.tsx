"use client"

import SingleChoice from '@/components/quiz/SingleChoice';
import MultipleChoice from '@/components/quiz/MultipleChoice';
import FillInBlanks from '@/components/quiz/FillInBlanks';
import MatchPairs from '@/components/quiz/MatchPairs';

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Quiz Demo - Theme 4</h1>

        <div className="space-y-8">
          <SingleChoice
            title="Question 1: Single Choice"
            content="<p>What is the capital of France?</p>"
            options={[
              { id: '1', text: 'London' },
              { id: '2', text: 'Berlin' },
              { id: '3', text: 'Paris' },
              { id: '4', text: 'Madrid' }
            ]}
            correctAnswer="3"
          />

          <MultipleChoice
            title="Question 2: Multiple Choice"
            content="<p>Which of the following are programming languages?</p>"
            options={[
              { id: '1', text: 'Python' },
              { id: '2', text: 'HTML' },
              { id: '3', text: 'JavaScript' },
              { id: '4', text: 'CSS' }
            ]}
            correctAnswers={['1', '3']}
          />

          <FillInBlanks
            title="Question 3: Fill in the Blanks"
            content="<p>Complete the sentence with the correct words.</p>"
            blanks={[
              { id: 'blank1', position: 0 },
              { id: 'blank2', position: 1 }
            ]}
            options={['React', 'Angular', 'Vue', 'Next.js', 'TypeScript', 'JavaScript']}
            correctAnswers={{
              blank1: 'React',
              blank2: 'Next.js'
            }}
          />

          <MatchPairs
            title="Question 4: Match Pairs"
            content="<p>Match each programming language with its primary use case.</p>"
            pairs={[
              { left: 'Python', right: 'Data Science' },
              { left: 'JavaScript', right: 'Web Development' },
              { left: 'Swift', right: 'iOS Development' },
              { left: 'SQL', right: 'Database Queries' }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
