// src/components/admin/MessagesClient.tsx
"use client"

import { useState, useEffect } from "react"
import { ContactMessage } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, 
  Phone, 
  User, 
  Calendar, 
  MessageSquare,
  Trash2,
  ExternalLink
} from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function MessagesClient() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact")
      const result = await response.json()
      
      if (response.ok) {
        setMessages(result.data || [])
      } else {
        toast.error("Mesajlar yüklenirken hata oluştu")
      }
    } catch (error) {
      console.error("Mesaj yükleme hatası:", error)
      toast.error("Mesajlar yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setMessages(prev => prev.filter(msg => msg.id !== id))
        toast.success("Mesaj silindi")
      } else {
        toast.error("Mesaj silinirken hata oluştu")
      }
    } catch (error) {
      console.error("Mesaj silme hatası:", error)
      toast.error("Mesaj silinirken hata oluştu")
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mesajlar</h1>
        </div>
        
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-2">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-3 bg-muted rounded w-1/3"></div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mesajlar</h1>
          <p className="text-muted-foreground">
            Toplam {messages.length} mesaj
          </p>
        </div>
        
        <Button onClick={fetchMessages} variant="outline">
          Yenile
        </Button>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Henüz mesaj yok</h3>
            <p className="text-muted-foreground text-center">
              İletişim formundan gelen mesajlar burada görünecektir.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {messages.map((message) => (
            <Card key={message.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {message.name}
                    </CardTitle>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <a 
                          href={`mailto:${message.email}`}
                          className="hover:text-primary transition-colors"
                        >
                          {message.email}
                        </a>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </div>
                      
                      {message.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <a 
                            href={`tel:${message.phone}`}
                            className="hover:text-primary transition-colors"
                          >
                            {message.phone}
                          </a>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(message.created_at)}
                      </div>
                    </div>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        disabled={deletingId === message.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Mesajı Sil</AlertDialogTitle>
                        <AlertDialogDescription>
                          Bu mesajı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(message.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Sil
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {message.subject}
                  </Badge>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
