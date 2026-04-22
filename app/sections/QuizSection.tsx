'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { QUIZ_QUESTIONS, QuizQuestion } from '@/app/data/quizData'
import {
  FiAward, FiCheck, FiX, FiArrowRight,
  FiRotateCcw, FiShare2, FiZap, FiTarget, FiStar,
} from 'react-icons/fi'

type Difficulty = 'beginner' | 'intermediate' | 'expert' | 'all'

function ConfettiEffect() {
  const [particles, setParticles] = useState<{ id: number; x: number; color: string; delay: number; dur: number }[]>([])

  useEffect(() => {
    const p = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ['#3b82f6', '#ef4444', '#a855f7', '#22c55e', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 6)],
      delay: Math.random() * 2,
      dur: 2 + Math.random() * 2,
    }))
    setParticles(p)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${p.x}%`,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.dur}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  )
}

function getGrade(pct: number) {
  if (pct >= 90) return { letter: 'A', color: 'text-green-500', msg: 'Outstanding! You\'re a civic knowledge expert!' }
  if (pct >= 80) return { letter: 'B', color: 'text-blue-500', msg: 'Great job! You know your elections well!' }
  if (pct >= 70) return { letter: 'C', color: 'text-yellow-500', msg: 'Good effort! Keep learning about civics.' }
  if (pct >= 60) return { letter: 'D', color: 'text-orange-500', msg: 'Room for improvement. Try again!' }
  return { letter: 'F', color: 'text-red-500', msg: 'Don\'t give up! Learn and try again.' }
}

export default function QuizSection() {
  const [difficulty, setDifficulty] = useState<Difficulty>('all')
  const [started, setStarted] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState<{ correct: boolean; questionId: number }[]>([])
  const [showConfetti, setShowConfetti] = useState(false)

  const questions = useMemo(() => {
    const filtered = difficulty === 'all' ? [...QUIZ_QUESTIONS] : QUIZ_QUESTIONS.filter(q => q.difficulty === difficulty)
    // Shuffle
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]]
    }
    return filtered
  }, [difficulty, started]) // re-shuffle on restart

  const currentQuestion = questions[currentIdx]
  const totalQuestions = questions.length

  const handleAnswer = useCallback((idx: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(idx)
    setShowExplanation(true)
    const isCorrect = idx === currentQuestion.correctIndex
    if (isCorrect) setScore(prev => prev + 1)
    setAnswers(prev => [...prev, { correct: isCorrect, questionId: currentQuestion.id }])
  }, [selectedAnswer, currentQuestion])

  const handleNext = useCallback(() => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setFinished(true)
      const finalScore = score + (selectedAnswer === currentQuestion?.correctIndex ? 0 : 0) // score already updated
      const pct = (finalScore / totalQuestions) * 100
      if (pct === 100) setShowConfetti(true)
    }
  }, [currentIdx, totalQuestions, score, selectedAnswer, currentQuestion])

  const restart = useCallback(() => {
    setStarted(false)
    setCurrentIdx(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setFinished(false)
    setAnswers([])
    setShowConfetti(false)
  }, [])

  const startQuiz = useCallback(() => {
    setStarted(true)
    setCurrentIdx(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setFinished(false)
    setAnswers([])
  }, [])

  // Save best score to localStorage
  useEffect(() => {
    if (finished) {
      const pct = Math.round((score / totalQuestions) * 100)
      const key = `quiz_best_${difficulty}`
      const prev = localStorage.getItem(key)
      if (!prev || parseInt(prev) < pct) {
        localStorage.setItem(key, String(pct))
      }
    }
  }, [finished, score, totalQuestions, difficulty])

  const handleShare = () => {
    const pct = Math.round((score / totalQuestions) * 100)
    const grade = getGrade(pct)
    const text = `I scored ${score}/${totalQuestions} (${pct}%, Grade ${grade.letter}) on the US Election Quiz! Test your civic knowledge too!`
    if (navigator.share) {
      navigator.share({ title: 'Election Quiz Results', text }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(text)
    }
  }

  // Difficulty selection screen
  if (!started) {
    const difficulties: { key: Difficulty; label: string; icon: typeof FiZap; desc: string; count: number }[] = [
      { key: 'beginner', label: 'Beginner', icon: FiZap, desc: 'Fundamentals', count: QUIZ_QUESTIONS.filter(q => q.difficulty === 'beginner').length },
      { key: 'intermediate', label: 'Intermediate', icon: FiTarget, desc: 'Deeper knowledge', count: QUIZ_QUESTIONS.filter(q => q.difficulty === 'intermediate').length },
      { key: 'expert', label: 'Expert', icon: FiStar, desc: 'Challenge yourself', count: QUIZ_QUESTIONS.filter(q => q.difficulty === 'expert').length },
      { key: 'all', label: 'All Questions', icon: FiAward, desc: 'Complete quiz', count: QUIZ_QUESTIONS.length },
    ]

    return (
      <div className="space-y-6 py-6 px-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Civic Education Quiz</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Test your knowledge of U.S. elections. Choose a difficulty level to begin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
          {difficulties.map(d => (
            <button
              key={d.key}
              onClick={() => { setDifficulty(d.key); startQuiz() }}
              className={`glass rounded-xl p-5 text-left card-hover group ${
                difficulty === d.key ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <d.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{d.label}</h3>
                  <p className="text-xs text-muted-foreground">{d.desc}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{d.count} questions</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Results screen
  if (finished) {
    const pct = Math.round((score / totalQuestions) * 100)
    const grade = getGrade(pct)

    return (
      <div className="space-y-6 py-6 px-4">
        {showConfetti && <ConfettiEffect />}
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="glass rounded-2xl p-8 space-y-4">
            <div className={`text-7xl font-bold ${grade.color}`}>{grade.letter}</div>
            <div className="text-3xl font-bold text-foreground">{score}/{totalQuestions}</div>
            <div className="text-sm text-muted-foreground">{pct}% correct</div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                style={{ width: `${pct}%` }}
              />
            </div>

            <p className="text-sm text-muted-foreground">{grade.msg}</p>

            {/* Answer summary */}
            <div className="flex flex-wrap justify-center gap-1.5 pt-2">
              {answers.map((a, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium ${
                    a.correct ? 'bg-green-500/15 text-green-600' : 'bg-red-500/15 text-red-600'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <FiRotateCcw className="h-4 w-4" />
              Try Again
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border/60 rounded-xl font-medium text-sm text-foreground hover:bg-muted/50 transition-colors"
            >
              <FiShare2 className="h-4 w-4" />
              Share Score
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Quiz question screen
  return (
    <div className="space-y-6 py-6 px-4">
      <div className="max-w-xl mx-auto space-y-5">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Question {currentIdx + 1} of {totalQuestions}</span>
            <span className="font-medium text-foreground">{score} correct</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="glass rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              currentQuestion.difficulty === 'beginner' ? 'bg-green-500/10 text-green-600' :
              currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-500/10 text-yellow-600' :
              'bg-red-500/10 text-red-600'
            }`}>
              {currentQuestion.difficulty}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-foreground leading-snug">{currentQuestion.question}</h3>

          <div className="space-y-2">
            {currentQuestion.options.map((opt, i) => {
              let cls = 'border-border/60 hover:border-primary/40 hover:bg-primary/5'
              if (selectedAnswer !== null) {
                if (i === currentQuestion.correctIndex) cls = 'border-green-500/50 bg-green-500/10'
                else if (i === selectedAnswer && i !== currentQuestion.correctIndex) cls = 'border-red-500/50 bg-red-500/10'
                else cls = 'border-border/30 opacity-60'
              }

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all duration-200 flex items-center gap-3 ${cls} disabled:cursor-default`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium shrink-0 ${
                    selectedAnswer !== null && i === currentQuestion.correctIndex ? 'bg-green-500 text-white' :
                    selectedAnswer === i && i !== currentQuestion.correctIndex ? 'bg-red-500 text-white' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {selectedAnswer !== null && i === currentQuestion.correctIndex ? (
                      <FiCheck className="h-3.5 w-3.5" />
                    ) : selectedAnswer === i && i !== currentQuestion.correctIndex ? (
                      <FiX className="h-3.5 w-3.5" />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </span>
                  <span className="text-foreground">{opt}</span>
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 animate-slide-up">
              <p className="text-sm text-foreground leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>

        {/* Next button */}
        {selectedAnswer !== null && (
          <button
            onClick={handleNext}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:opacity-90 transition-all animate-slide-up"
          >
            {currentIdx < totalQuestions - 1 ? 'Next Question' : 'See Results'}
            <FiArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
