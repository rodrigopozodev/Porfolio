"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabaseClient"

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  signInWithLinkedIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      if (!supabase) {
        setLoading(false)
        return
      }
      const { data } = await supabase.auth.getSession()
      setSession(data.session ?? null)
      setUser(data.session?.user ?? null)
      setLoading(false)
    }
    init()

    if (!supabase) return
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signInWithLinkedIn = async () => {
    if (!supabase) return
    await supabase.auth.signInWithOAuth({
      provider: "linkedin_oidc",
      options: {
        scopes: "openid profile email",
        redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
      },
    })
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  const value = useMemo(
    () => ({ user, session, loading, signInWithLinkedIn, signOut }),
    [user, session, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}