import { useCallback, useState } from 'react'

import { defaultSettings, type SystemSettings } from '@/features/settings/types'

export function useSettingsState() {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings)
  const [savedSettings, setSavedSettings] = useState<SystemSettings>(defaultSettings)
  const [status, setStatus] = useState<'idle' | 'saved' | 'reset'>('idle')

  const updateSetting = useCallback(
    <K extends keyof SystemSettings>(key: K, value: SystemSettings[K]) => {
      setSettings((current) => ({ ...current, [key]: value }))
      setStatus('idle')
    },
    [],
  )

  const saveSettings = useCallback(() => {
    setSavedSettings(settings)
    setStatus('saved')
  }, [settings])

  const resetSettings = useCallback(() => {
    setSettings(savedSettings)
    setStatus('reset')
  }, [savedSettings])

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(savedSettings)

  return {
    settings,
    updateSetting,
    saveSettings,
    resetSettings,
    hasChanges,
    status,
  }
}
