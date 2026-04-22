'use client'

import React, { useState, useMemo } from 'react'
import { STATES, StateData } from '@/app/data/stateData'
import { X, MapPin, User, Shield, Calendar, TrendingUp } from 'lucide-react'

const LEAN_COLORS = {
  D: { bg: 'bg-blue-500', text: 'text-blue-600 dark:text-blue-400', light: 'bg-blue-500/15', border: 'border-blue-500/30' },
  R: { bg: 'bg-red-500', text: 'text-red-600 dark:text-red-400', light: 'bg-red-500/15', border: 'border-red-500/30' },
  S: { bg: 'bg-purple-500', text: 'text-purple-600 dark:text-purple-400', light: 'bg-purple-500/15', border: 'border-purple-500/30' },
}

const LEAN_LABELS = { D: 'Leans Democrat', R: 'Leans Republican', S: 'Swing State' }

function StateCard({ state, onClick, isSelected }: { state: StateData; onClick: () => void; isSelected: boolean }) {
  const colors = LEAN_COLORS[state.lean]
  return (
    <button
      onClick={onClick}
      className={`relative w-full aspect-square rounded-lg flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer border ${
        isSelected
          ? `${colors.light} ${colors.border} ring-2 ring-offset-1 ring-primary scale-105 z-10`
          : `${colors.light} ${colors.border} hover:scale-105 hover:z-10 hover:shadow-md`
      }`}
      title={`${state.name} - ${state.electoralVotes} electoral votes`}
      aria-label={`${state.name}, ${state.electoralVotes} electoral votes, ${LEAN_LABELS[state.lean]}`}
    >
      <span className="text-xs font-bold text-foreground leading-none">{state.abbr}</span>
      <span className="text-[10px] text-muted-foreground mt-0.5">{state.electoralVotes}</span>
    </button>
  )
}

function StateDetail({ state, onClose }: { state: StateData; onClose: () => void }) {
  const colors = LEAN_COLORS[state.lean]
  return (
    <div className="glass rounded-2xl p-5 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-foreground">{state.name}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.light} ${colors.text}`}>
              {LEAN_LABELS[state.lean]}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{state.electoralVotes} Electoral Votes</p>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
          <User className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Governor</p>
            <p className="text-sm font-medium text-foreground">{state.governor}</p>
            <span className={`text-xs ${state.governorParty === 'D' ? 'text-blue-500' : state.governorParty === 'R' ? 'text-red-500' : 'text-gray-500'}`}>
              {state.governorParty === 'D' ? 'Democrat' : state.governorParty === 'R' ? 'Republican' : 'Independent'}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
          <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Voter ID</p>
            <p className="text-sm font-medium text-foreground">{state.votingLaws.idRequired}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
          <Calendar className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Early Voting</p>
            <p className="text-sm font-medium text-foreground">{state.votingLaws.earlyVoting}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/30">
          <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Registration Deadline</p>
            <p className="text-sm font-medium text-foreground">{state.votingLaws.registrationDeadline}</p>
          </div>
        </div>
      </div>

      {/* Voting history */}
      <div className="mt-4 p-3 rounded-xl bg-muted/30">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <p className="text-xs text-muted-foreground font-medium">Recent Presidential Voting History</p>
        </div>
        <div className="flex gap-2">
          {state.history.map((h) => (
            <div
              key={h.year}
              className={`flex-1 text-center p-2 rounded-lg ${
                h.party === 'D' ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400' : 'bg-red-500/15 text-red-600 dark:text-red-400'
              }`}
            >
              <div className="text-xs font-bold">{h.year}</div>
              <div className="text-[10px] mt-0.5">{h.party === 'D' ? 'DEM' : 'REP'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ElectoralMapSection() {
  const [selectedState, setSelectedState] = useState<StateData | null>(null)
  const [filter, setFilter] = useState<'all' | 'D' | 'R' | 'S'>('all')

  const filteredStates = useMemo(
    () => (filter === 'all' ? STATES : STATES.filter(s => s.lean === filter)),
    [filter]
  )

  const grid = useMemo(() => {
    const maxRow = Math.max(...STATES.map(s => s.gridRow))
    const maxCol = Math.max(...STATES.map(s => s.gridCol))
    const g: (StateData | null)[][] = Array.from({ length: maxRow + 1 }, () =>
      Array.from({ length: maxCol + 1 }, () => null)
    )
    for (const s of STATES) {
      g[s.gridRow][s.gridCol] = s
    }
    return g
  }, [])

  const totals = useMemo(() => {
    const dem = STATES.filter(s => s.lean === 'D').reduce((sum, s) => sum + s.electoralVotes, 0)
    const rep = STATES.filter(s => s.lean === 'R').reduce((sum, s) => sum + s.electoralVotes, 0)
    const swing = STATES.filter(s => s.lean === 'S').reduce((sum, s) => sum + s.electoralVotes, 0)
    return { dem, rep, swing }
  }, [])

  return (
    <div className="space-y-6 py-6 px-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Interactive Electoral Map</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Click any state to view electoral votes, voting laws, governor, and recent election history.
        </p>
      </div>

      {/* Legend & Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { key: 'all', label: 'All States', color: 'bg-primary/10' },
          { key: 'D', label: `Democrat (${totals.dem} EV)`, color: 'bg-blue-500/15' },
          { key: 'R', label: `Republican (${totals.rep} EV)`, color: 'bg-red-500/15' },
          { key: 'S', label: `Swing (${totals.swing} EV)`, color: 'bg-purple-500/15' },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as typeof filter)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
              filter === f.key
                ? `${f.color} border-primary/30 text-foreground`
                : 'border-border/60 text-muted-foreground hover:border-primary/30'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tile Map */}
      <div className="max-w-3xl mx-auto overflow-x-auto">
        <div className="min-w-[500px]">
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.max(...STATES.map(s => s.gridCol)) + 1}, 1fr)` }}>
            {grid.flat().map((state, i) =>
              state ? (
                <div key={state.abbr} style={{ gridRow: state.gridRow + 1, gridColumn: state.gridCol + 1 }}>
                  {(filter === 'all' || state.lean === filter) ? (
                    <StateCard
                      state={state}
                      onClick={() => setSelectedState(selectedState?.abbr === state.abbr ? null : state)}
                      isSelected={selectedState?.abbr === state.abbr}
                    />
                  ) : (
                    <div className="aspect-square rounded-lg bg-muted/20 border border-border/20" />
                  )}
                </div>
              ) : (
                <div key={`empty-${i}`} />
              )
            )}
          </div>
        </div>
      </div>

      {/* Selected State Detail */}
      {selectedState && (
        <div className="max-w-2xl mx-auto">
          <StateDetail state={selectedState} onClose={() => setSelectedState(null)} />
        </div>
      )}
    </div>
  )
}
