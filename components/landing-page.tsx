"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import UsersPage from "./users/page"

export function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true)
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
      <header className="flex justify-between items-center p-4 bg-background">
        <h1 className="text-2xl font-bold text-foreground">IOHK</h1>
        <Button variant="outline" size="icon" onClick={toggleDarkMode}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </header>
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 text-foreground">IOHK</h1>
          <p className="text-xl max-w-2xl mx-auto text-muted-foreground">
            One of the world's pre-eminent blockchain infrastructure research and engineering companies.
          </p>
        </div>
      </section>
      <main className="flex-grow container mx-auto px-4">
        <Tabs defaultValue="users" className="w-full mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="overview">Users Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Users</h2>
                <p>Here you can manage individual user accounts and their settings.</p>
                <UsersPage></UsersPage>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Users Overview</h2>
                <p>This section provides a high-level overview of all user activities and statistics.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}