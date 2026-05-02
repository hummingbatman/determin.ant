"use client";
import { useState, useEffect, useCallback } from "react";

const KEY = "determin-ant-progress";

export function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setCompleted(new Set(JSON.parse(stored) as string[]));
    } catch {}
  }, []);

  const markComplete = useCallback((href: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.add(href);
      try { localStorage.setItem(KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  }, []);

  const toggleComplete = useCallback((href: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.has(href) ? next.delete(href) : next.add(href);
      try { localStorage.setItem(KEY, JSON.stringify([...next])); } catch {}
      return next;
    });
  }, []);

  const isComplete = useCallback((href: string) => completed.has(href), [completed]);

  return { completed, markComplete, toggleComplete, isComplete };
}
