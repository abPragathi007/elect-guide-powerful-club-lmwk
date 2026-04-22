'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Send, User, Cpu, AlertCircle, Copy, Check,
  ThumbsUp, ThumbsDown, Mic, MicOff, Clock,
  ChevronDown,
} from 'lucide-react'
import { callAIAgent } from '@/lib/aiAgent'
import { copyToClipboard } from '@/lib/clipboard'

const AGENT_ID = '69e904acb6acff9e335690e7'

const QUICK_QUESTIONS = [
  'How do I register to vote?',
  'What is the Electoral College?',
  'What ID do I need to vote?',
  'How does mail-in voting work?',
  'How are votes counted?',
  'What is a swing state?',
]

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  followUps?: string[]
  isError?: boolean
  timestamp: number
  feedback?: 'up' | 'down' | null
  copied?: boolean
}

function renderMarkdown(text: string) {
  if (!text) return null
  return (
    <div className="space-y-1.5">
      {text.split('\n').map((line, i) => {
        if (line.startsWith('### ')) return <h4 key={i} className="font-semibold text-sm mt-3 mb-1">{line.slice(4)}</h4>
        if (line.startsWith('## ')) return <h3 key={i} className="font-semibold text-base mt-3 mb-1">{line.slice(3)}</h3>
        if (line.startsWith('# ')) return <h2 key={i} className="font-bold text-lg mt-4 mb-2">{line.slice(2)}</h2>
        if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="ml-4 list-disc text-sm">{formatInline(line.slice(2))}</li>
        if (/^\d+\.\s/.test(line)) return <li key={i} className="ml-4 list-decimal text-sm">{formatInline(line.replace(/^\d+\.\s/, ''))}</li>
        if (!line.trim()) return <div key={i} className="h-1" />
        return <p key={i} className="text-sm">{formatInline(line)}</p>
      })}
    </div>
  )
}

function formatInline(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  if (parts.length === 1) return text
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold">{part}</strong> : part
  )
}

function formatTime(ts: number) {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function SkeletonMessage() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Cpu className="h-4 w-4 text-primary" />
      </div>
      <div className="max-w-[80%] space-y-2">
        <div className="rounded-2xl px-4 py-4 bg-muted/60 border border-border/40 space-y-2">
          <div className="h-3 skeleton rounded w-3/4" />
          <div className="h-3 skeleton rounded w-5/6" />
          <div className="h-3 skeleton rounded w-2/3" />
        </div>
      </div>
    </div>
  )
}

export default function AskAssistantSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const sessionIdRef = useRef(Date.now().toString())
  const recognitionRef = useRef<any>(null)

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current
      const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100
      if (isNearBottom || loading) {
        el.scrollTop = el.scrollHeight
      }
    }
  }, [messages, loading])

  // Scroll detection
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    function onScroll() {
      const isNearBottom = el!.scrollHeight - el!.scrollTop - el!.clientHeight < 100
      setShowScrollBtn(!isNearBottom)
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToBottom = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }

  const handleSend = useCallback(async (message: string) => {
    if (!message.trim() || loading) return
    const userMsg = message.trim()
    setInput('')
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMsg,
      timestamp: Date.now(),
    }
    setMessages(prev => [...prev, userMessage])
    setLoading(true)

    try {
      const result = await callAIAgent(userMsg, AGENT_ID, { session_id: sessionIdRef.current })
      const answer = result?.response?.result?.answer ?? result?.response?.message ?? 'Sorry, I could not process your request.'
      const followUps = Array.isArray(result?.response?.result?.follow_up_questions) ? result.response.result.follow_up_questions : []
      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: answer,
        followUps,
        timestamp: Date.now(),
      }])
    } catch {
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'I encountered an error while processing your question. Please try again.',
        isError: true,
        timestamp: Date.now(),
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }, [loading])

  const handleCopy = useCallback(async (msgId: string, content: string) => {
    await copyToClipboard(content)
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, copied: true } : m))
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, copied: false } : m))
    }, 2000)
  }, [])

  const handleFeedback = useCallback((msgId: string, type: 'up' | 'down') => {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, feedback: m.feedback === type ? null : type } : m))
  }, [])

  // Voice input
  const toggleVoice = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInput(prev => prev + transcript)
      setIsListening(false)
    }
    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }, [isListening])

  const hasSpeechApi = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[750px] py-4 px-4">
      {/* Quick questions */}
      <div className="flex flex-wrap gap-2 mb-3">
        {QUICK_QUESTIONS.map(q => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="px-3 py-1.5 text-xs font-medium rounded-full border border-border/60 bg-card/80 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200 disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat area */}
      <div className="flex-1 glass rounded-2xl overflow-hidden flex flex-col relative">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse-ring">
                <Cpu className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Election Education Assistant</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Ask any question about the election process, voter registration, the Electoral College, or how democracy works.
              </p>
            </div>
          )}

          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
              {msg.role === 'assistant' && (
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.isError ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                  {msg.isError ? <AlertCircle className="h-4 w-4 text-destructive" /> : <Cpu className="h-4 w-4 text-primary" />}
                </div>
              )}

              <div className={`max-w-[80%] space-y-1.5 ${msg.role === 'user' ? 'order-first' : ''}`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : msg.isError
                      ? 'bg-destructive/5 border border-destructive/20'
                      : 'bg-muted/60 border border-border/40'
                }`}>
                  {msg.role === 'assistant' ? renderMarkdown(msg.content) : <p className="text-sm">{msg.content}</p>}
                </div>

                {/* Message meta */}
                <div className={`flex items-center gap-2 px-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {formatTime(msg.timestamp)}
                  </span>

                  {msg.role === 'assistant' && !msg.isError && (
                    <>
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                        title="Copy answer"
                        aria-label="Copy answer"
                      >
                        {msg.copied ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id, 'up')}
                        className={`transition-colors p-0.5 ${msg.feedback === 'up' ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}
                        title="Helpful"
                        aria-label="Mark as helpful"
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id, 'down')}
                        className={`transition-colors p-0.5 ${msg.feedback === 'down' ? 'text-destructive' : 'text-muted-foreground hover:text-foreground'}`}
                        title="Not helpful"
                        aria-label="Mark as not helpful"
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </button>
                    </>
                  )}
                </div>

                {/* Follow-up suggestions */}
                {Array.isArray(msg.followUps) && msg.followUps.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pl-1 pt-1">
                    {msg.followUps.slice(0, 3).map((q, j) => (
                      <button
                        key={j}
                        onClick={() => handleSend(q)}
                        disabled={loading}
                        className="px-2.5 py-1 text-xs rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-all duration-200 disabled:opacity-50"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}

          {loading && <SkeletonMessage />}
        </div>

        {/* Scroll to bottom button */}
        {showScrollBtn && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-20 right-4 w-8 h-8 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary transition-all z-10"
            aria-label="Scroll to bottom"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border/40">
          <form
            onSubmit={e => { e.preventDefault(); handleSend(input) }}
            className="flex gap-2"
          >
            {hasSpeechApi && (
              <button
                type="button"
                onClick={toggleVoice}
                className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={isListening ? 'Stop listening' : 'Voice input'}
                aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
            )}
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={isListening ? 'Listening...' : 'Ask about the election process...'}
              disabled={loading}
              className="flex-1 h-10 px-4 text-sm rounded-xl bg-background/60 border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="shrink-0 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-all disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
