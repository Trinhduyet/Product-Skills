import { Bell, Menu, Search } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type AdminHeaderProps = {
  onMenuClick: () => void
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-card/80 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="hidden min-w-0 flex-1 sm:block">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Settings
        </p>
        <h1 className="truncate text-lg font-semibold text-foreground">
          System Settings
        </h1>
      </div>

      <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search settings..."
          aria-label="Search settings"
        />
      </div>

      <Button variant="ghost" size="icon" aria-label="Notifications">
        <Bell className="h-5 w-5" />
      </Button>

      <Avatar className="h-9 w-9">
        <AvatarFallback>SA</AvatarFallback>
      </Avatar>
    </header>
  )
}
