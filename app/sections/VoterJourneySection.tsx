'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { STATES } from '@/app/data/stateData'
import { VOTER_JOURNEY_STEPS } from '@/app/data/stateData'
import {
  CheckCircle, Circle, ExternalLink, ChevronDown,
  Bell, Award, MapPin,
} from 'lucide-react'

const MOTIVATIONAL_MESSAGES = [
  { threshold: 0, message: 'Start your voter journey today!' },
  { threshold: 20, message: 'Great start! Keep going!' },
  { threshold: 40, message: "You're making progress!" },
  { threshold: 60, message: 'More than halfway there!' },
  { threshold: 80, message: 'Almost ready to vote!' },
  { threshold: 100, message: 'You are 100% civic-ready!' },
]

function getMessage(pct: number) {
  let msg = MOTIVATIONAL_MESSAGES[0].message
  for (const m of MOTIVATIONAL_MESSAGES) {
    if (pct >= m.threshold) msg = m.message
  }
  return msg
}

export default function VoterJourneySection() {
  const [selectedState, setSelectedState] = useState('')
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [reminderSet, setReminderSet] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('voter_journey')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        if (data.state) setSelectedState(data.state)
        if (Array.isArray(data.completed)) setCompletedSteps(data.completed)
        if (data.reminderSet) setReminderSet(true)
      } catch { /* ignore */ }
    }
  }, [])

  // Save on change
  useEffect(() => {
    localStorage.setItem('voter_journey', JSON.stringify({
      state: selectedState,
      completed: completedSteps,
      reminderSet,
    }))
  }, [selectedState, completedSteps, reminderSet])

  const toggleStep = useCallback((id: string) => {
    setCompletedSteps(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }, [])

  const handleSetReminder = useCallback(() => {
    setReminderSet(true)
    if (!completedSteps.includes('reminder')) {
      setCompletedSteps(prev => [...prev, 'reminder'])
    }
  }, [completedSteps])

  const totalSteps = VOTER_JOURNEY_STEPS.length
  const completedCount = completedSteps.length
  const progressPct = Math.round((completedCount / totalSteps) * 100)

  const selectedStateData = STATES.find(s => s.abbr === selectedState)

  return (
    <div className="space-y-6 py-6 px-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Your Voter Journey</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Select your state and complete each step to be fully prepared for election day.
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-5">
        {/* State selector */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Select Your State</h3>
              <p className="text-xs text-muted-foreground">Personalize your voter checklist</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-border/60 bg-background/60 text-sm"
            >
              <span className={selectedState ? 'text-foreground' : 'text-muted-foreground'}>
                {selectedStateData ? `${selectedStateData.name} (${selectedStateData.abbr})` : 'Choose your state...'}
              </span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
              <div className="absolute z-20 w-full mt-1 max-h-48 overflow-y-auto rounded-xl border border-border/60 bg-card shadow-xl">
                {STATES.sort((a, b) => a.name.localeCompare(b.name)).map(s => (
                  <button
                    key={s.abbr}
                    onClick={() => { setSelectedState(s.abbr); setShowDropdown(false) }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-muted/50 transition-colors ${
                      selectedState === s.abbr ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
                    }`}
                  >
                    {s.name} ({s.abbr})
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* State-specific info */}
          {selectedStateData && (
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-muted/30 text-center">
                <p className="text-[10px] text-muted-foreground">Electoral Votes</p>
                <p className="text-sm font-bold text-foreground">{selectedStateData.electoralVotes}</p>
              </div>
              <div className="p-2 rounded-lg bg-muted/30 text-center">
                <p className="text-[10px] text-muted-foreground">Registration</p>
                <p className="text-xs font-medium text-foreground">{selectedStateData.votingLaws.registrationDeadline}</p>
              </div>
              <div className="p-2 rounded-lg bg-muted/30 text-center">
                <p className="text-[10px] text-muted-foreground">Voter ID</p>
                <p className="text-xs font-medium text-foreground">{selectedStateData.votingLaws.idRequired}</p>
              </div>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Civic Readiness</span>
            <span className="text-sm font-bold text-primary">{progressPct}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-primary to-accent"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            {progressPct === 100 && <Award className="h-3.5 w-3.5 text-accent" />}
            {getMessage(progressPct)}
          </p>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          {VOTER_JOURNEY_STEPS.map((step, i) => {
            const isCompleted = completedSteps.includes(step.id)
            const isReminder = step.id === 'reminder'

            return (
              <div
                key={step.id}
                className={`glass rounded-xl p-4 transition-all duration-300 ${
                  isCompleted ? 'opacity-80' : ''
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => isReminder ? handleSetReminder() : toggleStep(step.id)}
                    className="mt-0.5 shrink-0"
                    aria-label={isCompleted ? `Mark ${step.title} incomplete` : `Mark ${step.title} complete`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-accent" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                    )}
                  </button>
                  <div className="flex-1">
                    <h4 className={`text-sm font-semibold ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {step.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{step.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {step.link && (
                        <a
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                        >
                          {step.linkText}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {isReminder && !reminderSet && (
                        <button
                          onClick={handleSetReminder}
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                        >
                          <Bell className="h-3 w-3" />
                          Set Reminder
                        </button>
                      )}
                      {isReminder && reminderSet && (
                        <span className="text-xs text-accent font-medium flex items-center gap-1">
                          <Bell className="h-3 w-3" />
                          Reminder set
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
