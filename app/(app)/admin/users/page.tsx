"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, 
  MoreHorizontal,
  Plus,
  Minus,
  Ban,
  CheckCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

const users = [
  { id: 1, name: "Алексей Иванов", username: "@alexey_ivanov", balance: 1250, status: "active", joined: "15.03.2024", requests: 1247 },
  { id: 2, name: "Мария Козлова", username: "@maria_k", balance: 580, status: "active", joined: "12.03.2024", requests: 456 },
  { id: 3, name: "Дмитрий Петров", username: "@dmitry_p", balance: 0, status: "banned", joined: "10.03.2024", requests: 89 },
  { id: 4, name: "Анна Сидорова", username: "@anna_s", balance: 2100, status: "active", joined: "08.03.2024", requests: 2341 },
  { id: 5, name: "Иван Михайлов", username: "@ivan_m", balance: 340, status: "active", joined: "05.03.2024", requests: 178 },
  { id: 6, name: "Елена Новикова", username: "@elena_n", balance: 890, status: "active", joined: "01.03.2024", requests: 567 },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [balanceDialog, setBalanceDialog] = useState<{ open: boolean; user: typeof users[0] | null; type: "add" | "remove" }>({
    open: false,
    user: null,
    type: "add"
  })
  const [balanceAmount, setBalanceAmount] = useState("")
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  return (
    <div className="p-6 space-y-6">
      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Поиск пользователей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass border-primary/20"
          />
        </div>
      </motion.div>
      
      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass border-primary/20">
          <CardHeader>
            <CardTitle>Пользователи ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary/10">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Пользователь</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Баланс</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Статус</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Запросов</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Регистрация</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr 
                      key={user.id}
                      className="border-b border-primary/5 hover:bg-primary/5 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                            <span className="text-xs font-medium text-foreground">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-foreground">{user.balance}</span>
                        <span className="text-xs text-muted-foreground ml-1">токенов</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "active" 
                            ? "bg-green-500/20 text-green-400" 
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {user.status === "active" ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Активен
                            </>
                          ) : (
                            <>
                              <Ban className="w-3 h-3" />
                              Заблокирован
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-muted-foreground">{user.requests.toLocaleString()}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-muted-foreground">{user.joined}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="glass border-primary/20">
                            <DropdownMenuItem 
                              className="gap-2 cursor-pointer"
                              onClick={() => setBalanceDialog({ open: true, user, type: "add" })}
                            >
                              <Plus className="w-4 h-4 text-green-400" />
                              Добавить баланс
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="gap-2 cursor-pointer"
                              onClick={() => setBalanceDialog({ open: true, user, type: "remove" })}
                            >
                              <Minus className="w-4 h-4 text-red-400" />
                              Списать баланс
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-primary/10" />
                            <DropdownMenuItem className="gap-2 cursor-pointer text-red-400">
                              <Ban className="w-4 h-4" />
                              {user.status === "active" ? "Заблокировать" : "Разблокировать"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Balance Dialog */}
      <Dialog open={balanceDialog.open} onOpenChange={(open) => setBalanceDialog({ ...balanceDialog, open })}>
        <DialogContent className="glass border-primary/20">
          <DialogHeader>
            <DialogTitle>
              {balanceDialog.type === "add" ? "Добавить баланс" : "Списать баланс"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Пользователь: <span className="text-foreground font-medium">{balanceDialog.user?.name}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Текущий баланс: <span className="text-foreground font-medium">{balanceDialog.user?.balance} токенов</span>
            </p>
            <Input
              type="number"
              placeholder="Количество токенов"
              value={balanceAmount}
              onChange={(e) => setBalanceAmount(e.target.value)}
              className="glass border-primary/20"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBalanceDialog({ ...balanceDialog, open: false })}>
              Отмена
            </Button>
            <Button 
              className={balanceDialog.type === "add" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}
              onClick={() => {
                setBalanceDialog({ ...balanceDialog, open: false })
                setBalanceAmount("")
              }}
            >
              {balanceDialog.type === "add" ? "Добавить" : "Списать"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
