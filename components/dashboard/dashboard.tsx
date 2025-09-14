"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { Overview } from "./overview"
import { BudgetManager } from "./budget-manager"
import { ProjectManager } from "./project-manager"
import { Reports } from "./reports"

interface DashboardProps {
  user: { id: string; name: string; email: string }
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />
      case "budget":
        return <BudgetManager />
      case "projects":
        return <ProjectManager />
      case "reports":
        return <Reports />
      default:
        return <Overview />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
