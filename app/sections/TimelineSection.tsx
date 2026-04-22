'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import {
  FiClipboard, FiCheckSquare, FiFlag, FiTrendingUp,
  FiCalendar, FiBarChart2, FiAward, FiStar,
  FiZoomIn, FiZoomOut, FiMapPin,
} from 'react-icons/fi'

interface TimelineNode {
  icon: React.ComponentType<{ className?: string }>
  phase: string
  date: string
  summary: string
  detail: string
  color: 'blue' | 'yellow' | 'red' | 'green'
  months: string
}

const COLOR_MAP = {
  blue: { bg: 'bg-blue-500', light: 'bg-blue-500/10', text: 'text-blue-500', label: 'Registration Phase' },
  yellow: { bg: 'bg-amber-500', light: 'bg-amber-500/10', text: 'text-amber-500', label: 'Campaign Phase' },
  red: { bg: 'bg-red-500', light: 'bg-red-500/10', text: 'text-red-500', label: 'Voting Phase' },
  green: { bg: 'bg-green-500', light: 'bg-green-500/10', text: 'text-green-500', label: 'Certification Phase' },
}

const TIMELINE: TimelineNode[] = [
  { icon: FiClipboard, phase: 'Voter Registration', date: 'Ongoing (Deadlines vary)', summary: 'Citizens register to vote through state or local election offices.', detail: 'Registration deadlines vary by state, typically 15-30 days before the election. Many states offer online registration. Some states have automatic voter registration.', color: 'blue', months: 'Year-round' },
  { icon: FiCheckSquare, phase: 'Primary Elections', date: 'Feb - June', summary: 'Parties select their presidential nominees through state primaries.', detail: 'The Iowa caucuses and New Hampshire primary traditionally kick off the season. "Super Tuesday" sees multiple states vote simultaneously.', color: 'yellow', months: 'Feb-Jun' },
  { icon: FiFlag, phase: 'National Conventions', date: 'July - August', summary: 'Parties formally nominate their candidates and adopt platforms.', detail: 'Delegates officially vote for their party\'s nominee. The vice-presidential pick is announced. The party platform is finalized.', color: 'yellow', months: 'Jul-Aug' },
  { icon: FiTrendingUp, phase: 'General Campaign', date: 'Sep - November', summary: 'Candidates campaign nationally with debates, rallies, and ads.', detail: 'Presidential debates are typically held in September and October. Candidates focus on swing states. Campaign spending reaches its peak.', color: 'yellow', months: 'Sep-Nov' },
  { icon: FiCalendar, phase: 'Election Day', date: 'First Tue after first Mon in Nov', summary: 'Voters across the nation cast their ballots.', detail: 'Polling places are open from early morning to evening. Many voters cast ballots through early voting or mail-in options.', color: 'red', months: 'November' },
  { icon: FiBarChart2, phase: 'Vote Counting', date: 'November - December', summary: 'Ballots are counted and states certify results.', detail: 'Results may take days or weeks to finalize. States must certify results by the "safe harbor" deadline. Recounts may occur if margins are close.', color: 'red', months: 'Nov-Dec' },
  { icon: FiAward, phase: 'Electoral College', date: 'Mid-December', summary: 'Electors meet in state capitals to formally cast votes.', detail: 'The 538 electors cast their votes. A candidate needs 270 electoral votes to win. Congress counts and certifies the votes in January.', color: 'green', months: 'December' },
  { icon: FiStar, phase: 'Inauguration', date: 'January 20th', summary: 'The new or returning President is sworn into office.', detail: 'The ceremony takes place at the U.S. Capitol. The Chief Justice administers the oath. The new President delivers an inaugural address.', color: 'green', months: 'January' },
]

// Determine current phase based on current month
function getCurrentPhaseIndex(): number {
  const month = new Date().getMonth() // 0-indexed
  if (month <= 1) return 0 // Jan-Feb: Registration
  if (month <= 5) return 1 // Mar-Jun: Primaries
  if (month <= 7) return 2 // Jul-Aug: Conventions
  if (month <= 9) return 3 // Sep-Oct: Campaign
  if (month === 10) return 4 // Nov: Election Day
  return 5 // Dec: Counting
}

export default function TimelineSection() {
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const [zoom, setZoom] = useState(1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const currentPhase = useMemo(() => getCurrentPhaseIndex(), [])

  // Scroll to current phase on mount
  useEffect(() => {
    if (scrollRef.current) {
      const nodeWidth = 220 * zoom
      const targetScroll = currentPhase * nodeWidth - scrollRef.current.clientWidth / 2 + nodeWidth / 2
      scrollRef.current.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' })
    }
  }, [currentPhase, zoom])

  // Phase legend
  const phases = useMemo(() => {
    const unique = new Set(TIMELINE.map(t => t.color))
    return Array.from(unique).map(c => COLOR_MAP[c])
  }, [])

  return (
    <div className="space-y-6 py-6 px-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Election Timeline</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Key milestones in the presidential election cycle. Scroll to explore all phases.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {phases.map(p => (
          <div key={p.label} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${p.bg}`} />
            <span className="text-xs text-muted-foreground">{p.label}</span>
          </div>
        ))}
      </div>

      {/* Zoom controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setZoom(z => Math.max(0.7, z - 0.15))}
          className="p-1.5 rounded-lg border border-border/60 hover:bg-muted/50 transition-colors"
          aria-label="Zoom out"
        >
          <FiZoomOut className="h-4 w-4 text-muted-foreground" />
        </button>
        <span className="text-xs text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
        <button
          onClick={() => setZoom(z => Math.min(1.5, z + 0.15))}
          className="p-1.5 rounded-lg border border-border/60 hover:bg-muted/50 transition-colors"
          aria-label="Zoom in"
        >
          <FiZoomIn className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Horizontal timeline */}
      <div
        ref={scrollRef}
        className="overflow-x-auto timeline-scroll pb-4"
      >
        <div className="relative min-w-max px-8 py-8" style={{ transform: `scale(${zoom})`, transformOrigin: 'left top' }}>
          {/* Connecting line */}
          <div className="absolute top-[60px] left-8 right-8 h-0.5 bg-border" />

          <div className="flex gap-2">
            {TIMELINE.map((node, i) => {
              const colors = COLOR_MAP[node.color]
              const isCurrent = i === currentPhase
              const isSelected = selectedNode === i

              return (
                <button
                  key={i}
                  onClick={() => setSelectedNode(isSelected ? null : i)}
                  className="relative flex flex-col items-center w-[200px] shrink-0 group text-center"
                >
                  {/* "You are here" indicator */}
                  {isCurrent && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 border border-accent/30">
                      <FiMapPin className="h-2.5 w-2.5 text-accent" />
                      <span className="text-[9px] font-medium text-accent whitespace-nowrap">You are here</span>
                    </div>
                  )}

                  {/* Node circle */}
                  <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? `${colors.bg} shadow-lg animate-pulse-ring`
                      : isSelected
                        ? `${colors.bg} shadow-md scale-110`
                        : `${colors.light} group-hover:scale-110`
                  }`}>
                    <node.icon className={`h-4 w-4 ${isCurrent || isSelected ? 'text-white' : colors.text}`} />
                  </div>

                  {/* Label */}
                  <div className="mt-3 space-y-1">
                    <h4 className="text-xs font-semibold text-foreground">{node.phase}</h4>
                    <p className="text-[10px] text-muted-foreground">{node.months}</p>
                  </div>

                  {/* Expanded detail */}
                  {isSelected && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[220px] z-20">
                      <div className="glass rounded-xl p-3 text-left animate-slide-up shadow-xl">
                        <p className="text-xs font-medium text-foreground">{node.date}</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{node.summary}</p>
                        <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed border-t border-border/30 pt-2">{node.detail}</p>
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mini calendar / list view for mobile */}
      <div className="md:hidden space-y-2">
        <h3 className="text-sm font-semibold text-foreground px-1">All Phases</h3>
        {TIMELINE.map((node, i) => {
          const colors = COLOR_MAP[node.color]
          const isCurrent = i === currentPhase
          return (
            <button
              key={i}
              onClick={() => setSelectedNode(selectedNode === i ? null : i)}
              className="w-full text-left"
            >
              <div className={`glass rounded-xl p-3 flex items-start gap-3 transition-all ${
                isCurrent ? 'ring-1 ring-accent/40' : ''
              }`}>
                <div className={`w-8 h-8 rounded-lg ${colors.light} flex items-center justify-center shrink-0`}>
                  <node.icon className={`h-4 w-4 ${colors.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-semibold text-foreground">{node.phase}</h4>
                    {isCurrent && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium">Current</span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground">{node.date}</p>
                  {selectedNode === i && (
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed animate-slide-up">{node.detail}</p>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
