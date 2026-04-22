'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Clipboard, CheckSquare, Flag, TrendingUp,
  Calendar, BarChart3, Award, Star,
  ChevronDown, ChevronUp, ArrowRight,
} from 'lucide-react'

interface Step {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  details: string
  color: string
}

const STEPS: Step[] = [
  { icon: Clipboard, title: 'Register to Vote', description: 'Citizens register to vote through their state or local election office.', details: 'Eligible citizens must register before the deadline set by their state. Many states offer online registration, and some have same-day registration. Requirements typically include U.S. citizenship, state residency, and being at least 18 years old by Election Day. The National Voter Registration Act allows registration when applying for a driver\'s license.', color: 'from-blue-500 to-blue-600' },
  { icon: CheckSquare, title: 'Primary Elections', description: 'Political parties hold elections to choose their candidates.', details: 'Primaries can be open (any registered voter may participate), closed (only party members), or semi-closed. Some states use caucuses instead. Delegates are awarded to candidates based on results, which determines the party nominee at the national convention.', color: 'from-indigo-500 to-indigo-600' },
  { icon: Flag, title: 'National Conventions', description: 'Each party formally nominates its presidential and vice-presidential candidates.', details: 'Delegates from each state formally cast their votes for the party nominee. The conventions also finalize the party platform. The nominee delivers an acceptance speech, and the vice-presidential candidate is officially announced.', color: 'from-purple-500 to-purple-600' },
  { icon: TrendingUp, title: 'Campaign Season', description: 'Candidates campaign across the country with debates and rallies.', details: 'Candidates travel to key battleground states, participate in televised debates, run advertising campaigns, and hold rallies. Campaign finance laws regulate donations and spending. Super PACs and political action committees also play significant roles.', color: 'from-pink-500 to-pink-600' },
  { icon: Calendar, title: 'Election Day', description: 'Voters cast ballots on the first Tuesday after the first Monday in November.', details: 'Polling places open early in the morning and close in the evening. Voters can cast ballots in person, by mail (absentee), or through early voting where available. Federal law prohibits voter intimidation.', color: 'from-red-500 to-red-600' },
  { icon: BarChart3, title: 'Vote Counting', description: 'Ballots are counted and results are reported.', details: 'Votes are counted at the county level, with results reported to the state. Mail-in and provisional ballots may take additional time. States certify results after thorough canvassing. Recounts may occur if margins are very close.', color: 'from-orange-500 to-orange-600' },
  { icon: Award, title: 'Electoral College', description: 'Electors formally cast their votes based on state results.', details: 'The Electoral College consists of 538 electors. A candidate needs 270 electoral votes to win. Most states use a winner-take-all system. Electors meet in their state capitals in December to cast votes. Congress counts and certifies the votes in January.', color: 'from-amber-500 to-amber-600' },
  { icon: Star, title: 'Inauguration', description: 'The President-elect is sworn into office on January 20th.', details: 'The inauguration ceremony takes place on the steps of the U.S. Capitol. The President-elect takes the oath of office, administered by the Chief Justice of the Supreme Court, and delivers an inaugural address.', color: 'from-green-500 to-green-600' },
]

function AnimatedStep({ step, index, isExpanded, onToggle }: {
  step: Step; index: number; isExpanded: boolean; onToggle: () => void
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex gap-4 items-start">
        {/* Connector line and dot */}
        <div className="flex flex-col items-center shrink-0">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg transition-transform duration-300 ${isExpanded ? 'scale-110' : ''}`}>
            <step.icon className="h-5 w-5 text-white" />
          </div>
          {index < STEPS.length - 1 && (
            <div className="w-0.5 h-full min-h-[40px] bg-gradient-to-b from-border to-transparent mt-2" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          <button onClick={onToggle} className="w-full text-left group">
            <div className="glass rounded-xl p-4 card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-medium text-muted-foreground">Step {index + 1}</span>
                  <h3 className="text-base font-semibold text-foreground mt-0.5">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.description}</p>
                </div>
                <div className="shrink-0 ml-3">
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-border/40 animate-slide-up">
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.details}</p>
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function HowItWorksSection() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null)

  return (
    <div className="space-y-8 py-6 px-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">How Elections Work</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Follow the journey from voter registration to inauguration in 8 key steps.
        </p>
      </div>

      {/* Flow diagram */}
      <div className="max-w-2xl mx-auto">
        {/* Quick overview chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {STEPS.map((step, i) => (
            <button
              key={i}
              onClick={() => setExpandedStep(expandedStep === i ? null : i)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                expandedStep === i
                  ? 'bg-primary/10 text-primary border border-primary/30'
                  : 'bg-muted/50 text-muted-foreground border border-transparent hover:bg-muted'
              }`}
            >
              <step.icon className="h-3 w-3" />
              {step.title}
              {i < STEPS.length - 1 && <ArrowRight className="h-2.5 w-2.5 ml-0.5 text-muted-foreground/50" />}
            </button>
          ))}
        </div>

        {/* Animated steps */}
        <div>
          {STEPS.map((step, i) => (
            <AnimatedStep
              key={i}
              step={step}
              index={i}
              isExpanded={expandedStep === i}
              onToggle={() => setExpandedStep(expandedStep === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
