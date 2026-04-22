'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES, GlossaryTerm } from '@/app/data/glossaryData'
import { Search, BookOpen, MessageSquare, ChevronDown, Hash } from 'lucide-react'

type CategoryKey = keyof typeof GLOSSARY_CATEGORIES | 'all'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function GlossarySection({ onAskAssistant }: { onAskAssistant?: (question: string) => void }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<CategoryKey>('all')
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let items = [...GLOSSARY_TERMS]
    if (category !== 'all') {
      items = items.filter(t => t.category === category)
    }
    if (search) {
      const q = search.toLowerCase()
      items = items.filter(t =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
      )
    }
    return items.sort((a, b) => a.term.localeCompare(b.term))
  }, [search, category])

  const handleAsk = useCallback((term: string) => {
    if (onAskAssistant) {
      onAskAssistant(`Tell me more about ${term} in the context of US elections`)
    }
  }, [onAskAssistant])

  const handleRelatedClick = useCallback((term: string) => {
    setSearch(term)
    setCategory('all')
    setExpandedTerm(null)
  }, [])

  // Alphabetical jump
  const scrollToLetter = useCallback((letter: string) => {
    const el = document.getElementById(`glossary-${letter}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Group by first letter
  const grouped = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {}
    for (const term of filtered) {
      const letter = term.term[0].toUpperCase()
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(term)
    }
    return groups
  }, [filtered])

  return (
    <div className="space-y-6 py-6 px-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Election Glossary</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Key terms and definitions to help you understand the electoral process.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search terms..."
          className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl bg-card/80 border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setCategory('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
            category === 'all' ? 'bg-primary/10 border-primary/30 text-primary' : 'border-border/60 text-muted-foreground hover:border-primary/30'
          }`}
        >
          All Terms ({GLOSSARY_TERMS.length})
        </button>
        {(Object.entries(GLOSSARY_CATEGORIES) as [keyof typeof GLOSSARY_CATEGORIES, typeof GLOSSARY_CATEGORIES[keyof typeof GLOSSARY_CATEGORIES]][]).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              category === key ? 'bg-primary/10 border-primary/30 text-primary' : 'border-border/60 text-muted-foreground hover:border-primary/30'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${val.color}`} />
            {val.label}
          </button>
        ))}
      </div>

      {/* Alphabetical jump */}
      <div className="flex flex-wrap items-center justify-center gap-1 max-w-2xl mx-auto">
        {ALPHABET.map(letter => {
          const hasTerms = grouped[letter] && grouped[letter].length > 0
          return (
            <button
              key={letter}
              onClick={() => hasTerms && scrollToLetter(letter)}
              disabled={!hasTerms}
              className={`w-7 h-7 rounded-md text-xs font-medium transition-all ${
                hasTerms ? 'text-foreground hover:bg-primary/10 hover:text-primary' : 'text-muted-foreground/30 cursor-default'
              }`}
            >
              {letter}
            </button>
          )
        })}
      </div>

      {/* Terms */}
      <div className="max-w-3xl mx-auto space-y-1">
        {Object.entries(grouped).map(([letter, terms]) => (
          <div key={letter}>
            <div id={`glossary-${letter}`} className="sticky top-14 z-10 py-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold">
                <Hash className="h-3 w-3" />
                {letter}
              </span>
            </div>
            <div className="space-y-2 py-2">
              {terms.map(term => {
                const isExpanded = expandedTerm === term.term
                const catInfo = GLOSSARY_CATEGORIES[term.category]
                return (
                  <div key={term.term} className="glass rounded-xl overflow-hidden transition-all duration-300 card-hover">
                    <button
                      onClick={() => setExpandedTerm(isExpanded ? null : term.term)}
                      className="w-full text-left p-4 flex items-start gap-3"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isExpanded ? 'bg-primary/15' : 'bg-muted/50'}`}>
                        <BookOpen className={`h-4 w-4 ${isExpanded ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold text-foreground">{term.term}</h3>
                          <span className={`flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted/50 text-muted-foreground`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${catInfo.color}`} />
                            {catInfo.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{term.definition}</p>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 mt-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 space-y-3 animate-slide-up">
                        <div className="ml-11 p-3 rounded-lg bg-muted/30 border border-border/30">
                          <p className="text-xs text-muted-foreground font-medium mb-1">Example</p>
                          <p className="text-sm text-foreground italic leading-relaxed">{term.example}</p>
                        </div>

                        {term.relatedTerms.length > 0 && (
                          <div className="ml-11">
                            <p className="text-xs text-muted-foreground font-medium mb-1.5">Related Terms</p>
                            <div className="flex flex-wrap gap-1.5">
                              {term.relatedTerms.map(rt => (
                                <button
                                  key={rt}
                                  onClick={(e) => { e.stopPropagation(); handleRelatedClick(rt) }}
                                  className="px-2.5 py-1 text-xs rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-all"
                                >
                                  {rt}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {onAskAssistant && (
                          <div className="ml-11">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleAsk(term.term) }}
                              className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
                            >
                              <MessageSquare className="h-3 w-3" />
                              Ask the assistant about this
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No terms found matching &quot;{search}&quot;</p>
        </div>
      )}
    </div>
  )
}
