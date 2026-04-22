'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FiArrowRight, FiStar, FiMapPin, FiUsers, FiFlag, FiCheckCircle, FiZap } from 'react-icons/fi'

interface HomeSectionProps {
  onNavigateToChat: () => void
  onNavigateToMap: () => void
  onNavigateToQuiz: () => void
}

const STATS = [
  { label: 'States', value: 50, icon: FiMapPin, desc: 'Participating states & DC', suffix: '+DC' },
  { label: 'Electoral Votes', value: 538, icon: FiStar, desc: 'Total electoral college votes', suffix: '' },
  { label: 'House Seats', value: 435, icon: FiUsers, desc: 'Congressional representatives', suffix: '' },
  { label: 'Senators', value: 100, icon: FiFlag, desc: 'U.S. Senate members', suffix: '' },
]

const FACTS = [
  'The first U.S. presidential election was held in 1789, and George Washington won unanimously.',
  'The 26th Amendment lowered the voting age from 21 to 18 in 1971.',
  'Maine and Nebraska are the only states that split their electoral votes by congressional district.',
  'The longest ballot in U.S. history was in 2020, with some jurisdictions featuring over 100 items.',
  'Early voting has been available in some U.S. states since the 1980s.',
  'The Electoral College meets in December after the general election to formally cast votes.',
  'Voter turnout in U.S. presidential elections typically ranges between 50% and 66%.',
  'The 15th Amendment (1870) prohibited denying the right to vote based on race.',
  'Washington D.C. residents gained the right to vote for president with the 23rd Amendment in 1961.',
]

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 1500
          const steps = 40
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold text-foreground tabular-nums">
      {count.toLocaleString()}{suffix}
    </div>
  )
}

function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/10 dark:bg-primary/5"
          style={{
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            left: `${Math.random() * 100}%`,
            top: `${60 + Math.random() * 40}%`,
            animation: `float-particle ${6 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function HomeSection({ onNavigateToChat, onNavigateToMap, onNavigateToQuiz }: HomeSectionProps) {
  const [factIndex, setFactIndex] = useState(0)
  const [factFading, setFactFading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFactFading(true)
      setTimeout(() => {
        setFactIndex(prev => (prev + 1) % FACTS.length)
        setFactFading(false)
      }, 300)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl mx-4">
        <div
          className="absolute inset-0 animate-gradient rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, hsl(230 70% 55%) 0%, hsl(260 60% 50%) 25%, hsl(200 70% 50%) 50%, hsl(170 60% 45%) 75%, hsl(230 70% 55%) 100%)',
          }}
        />
        <ParticleBackground />
        <div className="relative z-10 text-center space-y-6 py-16 md:py-24 px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium">
            <FiCheckCircle className="h-4 w-4" />
            Your Civic Education Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Understanding the<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
              Election Process
            </span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Learn how elections work in the United States &mdash; from voter registration to inauguration.
            Get clear, non-partisan answers to all your questions.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onNavigateToChat}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20"
            >
              Ask the Assistant
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onNavigateToMap}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 hover:bg-white/25"
            >
              <FiMapPin className="h-4 w-4" />
              Explore the Map
            </button>
            <button
              onClick={onNavigateToQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 hover:bg-white/25"
            >
              <FiZap className="h-4 w-4" />
              Take the Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Stats with animated counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="glass rounded-2xl p-5 text-center space-y-2 card-hover"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="mx-auto w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            <div className="text-sm font-medium text-foreground">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.desc}</div>
          </div>
        ))}
      </div>

      {/* Did You Know - Enhanced */}
      <div className="px-4">
        <div className="glass rounded-2xl p-6 md:p-8 overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <FiStar className="h-4 w-4 text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Did You Know?</h3>
          </div>
          <div className="min-h-[60px] flex items-center">
            <p
              className={`text-muted-foreground leading-relaxed text-base transition-all duration-300 ${
                factFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              {FACTS[factIndex]}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 mt-5">
            {FACTS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFactFading(true); setTimeout(() => { setFactIndex(i); setFactFading(false); }, 300) }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === factIndex ? 'bg-primary w-6' : 'bg-muted-foreground/20 w-2 hover:bg-muted-foreground/40'
                }`}
                aria-label={`Fact ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
