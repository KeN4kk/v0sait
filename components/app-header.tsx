"use client"

import { Menu, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AppHeaderProps {
  onMenuClick: () => void
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-background/50 backdrop-blur-xl flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="hidden sm:flex items-center gap-2 glass rounded-full px-4 py-2 border border-primary/10">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Поиск..." 
            className="border-0 bg-transparent h-auto p-0 text-sm focus-visible:ring-0 w-48"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>
        
        <div className="flex items-center gap-3 glass rounded-full px-3 py-1.5 border border-primary/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center">
            <span className="text-xs font-medium text-foreground">АИ</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground">1,250</p>
            <p className="text-xs text-muted-foreground">токенов</p>
          </div>
        </div>
      </div>
    </header>
  )
}
