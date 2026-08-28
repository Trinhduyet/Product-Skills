import { useState } from 'react'

import { AdminHeader } from '@/features/settings/components/AdminHeader'
import { AdminSidebar } from '@/features/settings/components/AdminSidebar'
import { SystemSettingsPage } from '@/features/settings/components/SystemSettingsPage'

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6">
          <SystemSettingsPage />
        </main>
      </div>
    </div>
  )
}
