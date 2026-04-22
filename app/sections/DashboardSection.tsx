'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { VOTER_TURNOUT, STATES } from '@/app/data/stateData'
import { FiClock, FiBarChart2, FiPieChart, FiCalendar, FiSearch, FiArrowUp, FiArrowDown } from 'react-icons/fi'

// Next major election date
const NEXT_ELECTION = new Date('2026-11-03T00:00:00')

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function calc() {
      const now = new Date()
      const diff = NEXT_ELECTION.getTime() - now.getTime()
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      }
    }
    setTimeLeft(calc())
    const timer = setInterval(() => setTimeLeft(calc()), 1000)
    return () => clearInterval(timer)
  }, [])

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <FiClock className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Next Major Election</h3>
          <p className="text-xs text-muted-foreground">November 3, 2026 - Midterm Elections</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {units.map((u) => (
          <div key={u.label} className="text-center p-3 rounded-xl bg-primary/5">
            <div className="text-2xl md:text-3xl font-bold text-foreground tabular-nums">
              {String(u.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] text-muted-foreground font-medium mt-1">{u.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TurnoutChart() {
  const [animatedHeights, setAnimatedHeights] = useState<number[]>(VOTER_TURNOUT.map(() => 0))
  const ref = useRef<HTMLDivElement>(null)
  const maxTurnout = Math.max(...VOTER_TURNOUT.map(v => v.turnout))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setAnimatedHeights(VOTER_TURNOUT.map(v => (v.turnout / maxTurnout) * 100))
          }, 200)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [maxTurnout])

  return (
    <div ref={ref} className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <FiBarChart2 className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Voter Turnout by Year</h3>
          <p className="text-xs text-muted-foreground">Presidential election turnout (1980-2024)</p>
        </div>
      </div>
      <div className="flex items-end gap-1.5 h-48 pt-4">
        {VOTER_TURNOUT.map((item, i) => (
          <div key={item.year} className="flex-1 flex flex-col items-center gap-1 group">
            <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-medium">
              {item.turnout}%
            </span>
            <div className="w-full relative flex-1 flex items-end">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-primary/80 to-primary/40 transition-all duration-1000 ease-out group-hover:from-primary group-hover:to-primary/60"
                style={{ height: `${animatedHeights[i]}%` }}
              />
            </div>
            <span className="text-[9px] text-muted-foreground tabular-nums">
              {String(item.year).slice(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ElectoralDonut() {
  const demVotes = STATES.filter(s => s.lean === 'D').reduce((sum, s) => sum + s.electoralVotes, 0)
  const repVotes = STATES.filter(s => s.lean === 'R').reduce((sum, s) => sum + s.electoralVotes, 0)
  const swingVotes = STATES.filter(s => s.lean === 'S').reduce((sum, s) => sum + s.electoralVotes, 0)
  const total = 538

  const demPct = (demVotes / total) * 100
  const repPct = (repVotes / total) * 100
  const swingPct = (swingVotes / total) * 100

  const radius = 60
  const circumference = 2 * Math.PI * radius
  const demLen = (demPct / 100) * circumference
  const repLen = (repPct / 100) * circumference
  const swingLen = (swingPct / 100) * circumference

  const demOffset = 0
  const repOffset = demLen
  const swingOffset = demLen + repLen

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <FiPieChart className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Electoral Vote Distribution</h3>
          <p className="text-xs text-muted-foreground">By current state lean (538 total)</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <div className="relative w-36 h-36">
          <svg viewBox="0 0 140 140" className="transform -rotate-90">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="hsl(220 20% 90%)" strokeWidth="16" className="dark:stroke-[hsl(220,20%,20%)]" />
            <circle
              cx="70" cy="70" r={radius} fill="none"
              stroke="#3b82f6" strokeWidth="16"
              strokeDasharray={`${demLen} ${circumference - demLen}`}
              strokeDashoffset={-demOffset}
              className="transition-all duration-1000"
            />
            <circle
              cx="70" cy="70" r={radius} fill="none"
              stroke="#ef4444" strokeWidth="16"
              strokeDasharray={`${repLen} ${circumference - repLen}`}
              strokeDashoffset={-repOffset}
              className="transition-all duration-1000"
            />
            <circle
              cx="70" cy="70" r={radius} fill="none"
              stroke="#a855f7" strokeWidth="16"
              strokeDasharray={`${swingLen} ${circumference - swingLen}`}
              strokeDashoffset={-swingOffset}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">538</span>
            <span className="text-[10px] text-muted-foreground">Total</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-blue-500" />
            <div>
              <span className="text-sm font-medium text-foreground">{demVotes}</span>
              <span className="text-xs text-muted-foreground ml-1">Democrat</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-red-500" />
            <div>
              <span className="text-sm font-medium text-foreground">{repVotes}</span>
              <span className="text-xs text-muted-foreground ml-1">Republican</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-purple-500" />
            <div>
              <span className="text-sm font-medium text-foreground">{swingVotes}</span>
              <span className="text-xs text-muted-foreground ml-1">Swing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DeadlineTable() {
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState<'name' | 'deadline' | 'ev'>('name')
  const [sortAsc, setSortAsc] = useState(true)

  const sorted = useMemo(() => {
    let data = [...STATES]
    if (search) {
      const q = search.toLowerCase()
      data = data.filter(s => s.name.toLowerCase().includes(q) || s.abbr.toLowerCase().includes(q))
    }
    data.sort((a, b) => {
      let cmp = 0
      if (sortField === 'name') cmp = a.name.localeCompare(b.name)
      else if (sortField === 'ev') cmp = a.electoralVotes - b.electoralVotes
      else cmp = a.votingLaws.registrationDeadline.localeCompare(b.votingLaws.registrationDeadline)
      return sortAsc ? cmp : -cmp
    })
    return data
  }, [search, sortField, sortAsc])

  function toggleSort(field: typeof sortField) {
    if (sortField === field) setSortAsc(!sortAsc)
    else { setSortField(field); setSortAsc(true) }
  }

  const SortIcon = sortAsc ? FiArrowUp : FiArrowDown

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <FiCalendar className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-foreground">Registration Deadlines by State</h3>
          <p className="text-xs text-muted-foreground">Sortable table with search</p>
        </div>
      </div>

      <div className="relative mb-3">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search states..."
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-background/60 border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="max-h-64 overflow-y-auto rounded-lg">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-muted/80 backdrop-blur-sm z-10">
            <tr>
              <th className="text-left p-2 cursor-pointer select-none" onClick={() => toggleSort('name')}>
                <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  State {sortField === 'name' && <SortIcon className="h-3 w-3" />}
                </span>
              </th>
              <th className="text-center p-2 cursor-pointer select-none" onClick={() => toggleSort('ev')}>
                <span className="flex items-center justify-center gap-1 text-xs font-medium text-muted-foreground">
                  EV {sortField === 'ev' && <SortIcon className="h-3 w-3" />}
                </span>
              </th>
              <th className="text-left p-2 cursor-pointer select-none" onClick={() => toggleSort('deadline')}>
                <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                  Deadline {sortField === 'deadline' && <SortIcon className="h-3 w-3" />}
                </span>
              </th>
              <th className="text-left p-2">
                <span className="text-xs font-medium text-muted-foreground">Early Voting</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(s => (
              <tr key={s.abbr} className="border-t border-border/30 hover:bg-muted/20 transition-colors">
                <td className="p-2">
                  <span className="font-medium text-foreground">{s.name}</span>
                  <span className="text-muted-foreground ml-1 text-xs">({s.abbr})</span>
                </td>
                <td className="p-2 text-center font-medium text-foreground">{s.electoralVotes}</td>
                <td className="p-2 text-muted-foreground text-xs">{s.votingLaws.registrationDeadline}</td>
                <td className="p-2 text-muted-foreground text-xs">{s.votingLaws.earlyVoting}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function DashboardSection() {
  return (
    <div className="space-y-6 py-6 px-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Election Data Dashboard</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Real-time election data, voter turnout trends, and registration deadlines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CountdownTimer />
        <ElectoralDonut />
      </div>

      <TurnoutChart />
      <DeadlineTable />
    </div>
  )
}
