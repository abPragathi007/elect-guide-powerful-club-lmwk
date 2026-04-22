'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  Home, Map, BarChart3, Zap, CheckSquare,
  MessageSquare, List, Clock, BookOpen,
  Menu, X, Moon, Sun, Cpu, Activity,
} from 'lucide-react'

import HomeSection from './sections/HomeSection'
import ElectoralMapSection from './sections/ElectoralMapSection'
import DashboardSection from './sections/DashboardSection'
import QuizSection from './sections/QuizSection'
import VoterJourneySection from './sections/VoterJourneySection'
import AskAssistantSection from './sections/AskAssistantSection'
import HowItWorksSection from './sections/HowItWorksSection'
import TimelineSection from './sections/TimelineSection'
import GlossarySection from './sections/GlossarySection'

const TABS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'map', label: 'Map', icon: Map },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'quiz', label: 'Quiz', icon: Zap },
  { id: 'journey', label: 'My Journey', icon: CheckSquare },
  { id: 'ask', label: 'Assistant', icon: MessageSquare },
  { id: 'how', label: 'How It Works', icon: List },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'glossary', label: 'Glossary', icon: BookOpen },
] as const

type TabId = (typeof TABS)[number]['id']

const AGENT_INFO = {
  id: '69e904acb6acff9e335690e7',
  name: 'Election Education Agent',
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: '' }
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          <div className="text-center p-8 max-w-md">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-4 text-sm">{this.state.error}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: '' })}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default function AppContent() {
  const [activeTab, setActiveTab] = useState<TabId>('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Dark mode init
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = saved === 'dark' || (!saved && prefersDark)
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
  }, [])

  const toggleDarkMode = useCallback(() => {
    setIsDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }, [])

  // Scroll detection for sticky header
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigateToTab = useCallback((tab: TabId) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground font-sans">
        {/* Animated gradient background */}
        <div
          className="fixed inset-0 -z-10 animate-gradient"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, hsl(224 30% 8%) 0%, hsl(240 20% 12%) 40%, hsl(220 25% 10%) 70%, hsl(230 20% 8%) 100%)'
              : 'linear-gradient(135deg, hsl(230 50% 97%) 0%, hsl(260 40% 96%) 40%, hsl(220 50% 97%) 70%, hsl(200 40% 96%) 100%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Sticky Header */}
        <header
          className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled
              ? 'bg-card/80 backdrop-blur-2xl border-b border-border/60 shadow-sm'
              : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="h-4 w-4 text-primary" />
              </div>
              <h1 className="text-sm font-semibold text-foreground tracking-tight hidden sm:block">
                Election Education
              </h1>
            </div>

            {/* Desktop tabs - scrollable */}
            <nav className="hidden lg:flex items-center gap-0.5 overflow-x-auto max-w-[600px]">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => navigateToTab(tab.id)}
                  className={`relative flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center hover:bg-muted/50 transition-colors"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <Sun className="h-4 w-4 text-amber-400" />
                ) : (
                  <Moon className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-border/40 bg-card/95 backdrop-blur-2xl animate-slide-up">
              <div className="p-2 grid grid-cols-3 gap-1">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => navigateToTab(tab.id)}
                    className={`flex flex-col items-center gap-1 p-3 text-center rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="text-[10px] font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto">
          {activeTab === 'home' && (
            <HomeSection
              onNavigateToChat={() => navigateToTab('ask')}
              onNavigateToMap={() => navigateToTab('map')}
              onNavigateToQuiz={() => navigateToTab('quiz')}
            />
          )}
          {activeTab === 'map' && <ElectoralMapSection />}
          {activeTab === 'dashboard' && <DashboardSection />}
          {activeTab === 'quiz' && <QuizSection />}
          {activeTab === 'journey' && <VoterJourneySection />}
          {activeTab === 'ask' && <AskAssistantSection />}
          {activeTab === 'how' && <HowItWorksSection />}
          {activeTab === 'timeline' && <TimelineSection />}
          {activeTab === 'glossary' && (
            <GlossarySection onAskAssistant={() => navigateToTab('ask')} />
          )}
        </main>

        {/* Agent Status Footer */}
        <footer className="max-w-7xl mx-auto px-4 py-6 mt-8">
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Cpu className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{AGENT_INFO.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-border/40 text-muted-foreground font-mono">
                      {AGENT_INFO.id.slice(0, 8)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Powered by AI -- Non-partisan civic education</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  )
}
