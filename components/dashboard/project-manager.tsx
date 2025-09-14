"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Download } from "lucide-react"
import {
  Plus,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  FolderOpen,
  Target,
  TrendingUp,
  DollarSign,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ExportDialog } from "@/components/ui/export-dialog"
import { generateProjectSummary } from "@/lib/export-utils"

interface Project {
  id: string
  name: string
  description: string
  budget: number
  spent: number
  status: "planning" | "active" | "completed" | "on-hold"
  priority: "low" | "medium" | "high"
  startDate: string
  endDate: string
  progress: number
  teamMembers: string[]
  milestones: Milestone[]
  tasks: Task[]
}

interface Milestone {
  id: string
  name: string
  description: string
  dueDate: string
  status: "pending" | "completed" | "overdue"
  budget: number
}

interface Task {
  id: string
  projectId: string
  name: string
  description: string
  assignee: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate: string
  estimatedHours: number
  actualHours: number
}

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string>("")

  // Load sample data on mount
  useEffect(() => {
    const sampleProjects: Project[] = [
      {
        id: "1",
        name: "Website Redesign",
        description: "Complete overhaul of company website with modern design and improved UX",
        budget: 15000,
        spent: 8500,
        status: "active",
        priority: "high",
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        progress: 65,
        teamMembers: ["John Doe", "Jane Smith", "Mike Johnson"],
        milestones: [
          {
            id: "m1",
            name: "Design Phase",
            description: "Complete UI/UX design and wireframes",
            dueDate: "2024-01-31",
            status: "completed",
            budget: 5000,
          },
          {
            id: "m2",
            name: "Development Phase",
            description: "Frontend and backend development",
            dueDate: "2024-02-28",
            status: "pending",
            budget: 8000,
          },
          {
            id: "m3",
            name: "Testing & Launch",
            description: "QA testing and production deployment",
            dueDate: "2024-03-31",
            status: "pending",
            budget: 2000,
          },
        ],
        tasks: [],
      },
      {
        id: "2",
        name: "Mobile App Development",
        description: "Native iOS and Android app for customer engagement",
        budget: 25000,
        spent: 12000,
        status: "active",
        priority: "high",
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        progress: 40,
        teamMembers: ["Sarah Wilson", "Tom Brown", "Lisa Davis"],
        milestones: [
          {
            id: "m4",
            name: "MVP Development",
            description: "Core features and basic functionality",
            dueDate: "2024-03-15",
            status: "pending",
            budget: 15000,
          },
          {
            id: "m5",
            name: "Beta Testing",
            description: "User testing and feedback collection",
            dueDate: "2024-05-15",
            status: "pending",
            budget: 5000,
          },
          {
            id: "m6",
            name: "App Store Launch",
            description: "Final deployment to app stores",
            dueDate: "2024-06-30",
            status: "pending",
            budget: 5000,
          },
        ],
        tasks: [],
      },
      {
        id: "3",
        name: "Marketing Campaign",
        description: "Q1 digital marketing campaign for product launch",
        budget: 8000,
        spent: 8000,
        status: "completed",
        priority: "medium",
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        progress: 100,
        teamMembers: ["Emma Taylor", "David Lee"],
        milestones: [
          {
            id: "m7",
            name: "Campaign Strategy",
            description: "Develop comprehensive marketing strategy",
            dueDate: "2024-01-15",
            status: "completed",
            budget: 2000,
          },
          {
            id: "m8",
            name: "Content Creation",
            description: "Create all marketing materials and content",
            dueDate: "2024-02-15",
            status: "completed",
            budget: 4000,
          },
          {
            id: "m9",
            name: "Campaign Execution",
            description: "Launch and monitor campaign performance",
            dueDate: "2024-03-31",
            status: "completed",
            budget: 2000,
          },
        ],
        tasks: [],
      },
    ]

    const sampleTasks: Task[] = [
      {
        id: "t1",
        projectId: "1",
        name: "Create wireframes",
        description: "Design wireframes for all main pages",
        assignee: "Jane Smith",
        status: "completed",
        priority: "high",
        dueDate: "2024-01-20",
        estimatedHours: 16,
        actualHours: 18,
      },
      {
        id: "t2",
        projectId: "1",
        name: "Frontend development",
        description: "Implement responsive frontend components",
        assignee: "John Doe",
        status: "in-progress",
        priority: "high",
        dueDate: "2024-02-15",
        estimatedHours: 40,
        actualHours: 25,
      },
      {
        id: "t3",
        projectId: "2",
        name: "API integration",
        description: "Integrate with backend APIs",
        assignee: "Tom Brown",
        status: "todo",
        priority: "medium",
        dueDate: "2024-02-28",
        estimatedHours: 24,
        actualHours: 0,
      },
      {
        id: "t4",
        projectId: "2",
        name: "User authentication",
        description: "Implement login and registration flow",
        assignee: "Sarah Wilson",
        status: "in-progress",
        priority: "high",
        dueDate: "2024-02-10",
        estimatedHours: 20,
        actualHours: 12,
      },
    ]

    setProjects(sampleProjects)
    setTasks(sampleTasks)
  }, [])

  const addProject = (project: Omit<Project, "id" | "progress" | "milestones" | "tasks">) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      progress: 0,
      milestones: [],
      tasks: [],
    }
    setProjects((prev) => [...prev, newProject])
    setIsAddProjectOpen(false)
  }

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: Date.now().toString() }
    setTasks((prev) => [...prev, newTask])
    setIsAddTaskOpen(false)
  }

  const updateTaskStatus = (taskId: string, status: Task["status"]) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status } : task)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
      case "active":
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "planning":
      case "todo":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "on-hold":
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const activeProjects = projects.filter((p) => p.status === "active").length
  const completedProjects = projects.filter((p) => p.status === "completed").length
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0)

  return (
    <div className="space-y-6">
      {/* Project Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeProjects}</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{completedProjects}</div>
            <p className="text-xs text-muted-foreground">Successfully finished</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${totalBudget.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{((totalSpent / totalBudget) * 100).toFixed(1)}% of budget</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <ExportDialog
            data={projects}
            title="Project Management Report"
            type="projects"
            summary={generateProjectSummary(projects)}
          >
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Projects
            </Button>
          </ExportDialog>
        </div>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Portfolio</CardTitle>
                  <CardDescription>Manage your financial projects and track progress</CardDescription>
                </div>
                <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Project</DialogTitle>
                      <DialogDescription>Set up a new financial project with budget and timeline</DialogDescription>
                    </DialogHeader>
                    <ProjectForm onSubmit={addProject} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <CardDescription className="text-sm">{project.description}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      {/* Budget */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Budget</span>
                          <span>
                            ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={(project.spent / project.budget) * 100} className="h-2" />
                      </div>

                      {/* Timeline */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(project.startDate).toLocaleDateString()}</span>
                        </div>
                        <span>→</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(project.endDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Team */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Team</span>
                        </div>
                        <div className="flex -space-x-2">
                          {project.teamMembers.slice(0, 3).map((member, index) => (
                            <Avatar key={index} className="h-6 w-6 border-2 border-background">
                              <AvatarFallback className="text-xs bg-blue-600 text-white">
                                {member
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {project.teamMembers.length > 3 && (
                            <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-background flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">+{project.teamMembers.length - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Milestones */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Milestones</span>
                        </div>
                        <div className="space-y-1">
                          {project.milestones.slice(0, 2).map((milestone) => (
                            <div key={milestone.id} className="flex items-center justify-between text-sm">
                              <span className="truncate">{milestone.name}</span>
                              <Badge className={getStatusColor(milestone.status)} variant="outline">
                                {milestone.status}
                              </Badge>
                            </div>
                          ))}
                          {project.milestones.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{project.milestones.length - 2} more milestones
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Task Management</CardTitle>
                  <CardDescription>Track and manage individual project tasks</CardDescription>
                </div>
                <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Task</DialogTitle>
                      <DialogDescription>Add a new task to a project</DialogDescription>
                    </DialogHeader>
                    <TaskForm projects={projects} onSubmit={addTask} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => {
                  const project = projects.find((p) => p.id === task.projectId)
                  return (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              const newStatus =
                                task.status === "completed"
                                  ? "todo"
                                  : task.status === "todo"
                                    ? "in-progress"
                                    : "completed"
                              updateTaskStatus(task.id, newStatus)
                            }}
                            className={`p-1 rounded-full ${
                              task.status === "completed"
                                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900"
                                : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                            }`}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4
                              className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : ""}`}
                            >
                              {task.name}
                            </h4>
                            <Badge className={getPriorityColor(task.priority)} variant="outline">
                              {task.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Project: {project?.name}</span>
                            <span>Assignee: {task.assignee}</span>
                            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right text-sm">
                          <div className="font-medium">
                            {task.actualHours}h / {task.estimatedHours}h
                          </div>
                          <div className="text-muted-foreground">Time logged</div>
                        </div>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>Visual overview of project schedules and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium">{project.name}</h4>
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(project.startDate).toLocaleDateString()} -{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
                      <div className="space-y-4">
                        {project.milestones.map((milestone, index) => (
                          <div key={milestone.id} className="relative flex items-start space-x-4">
                            <div
                              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                                milestone.status === "completed"
                                  ? "bg-emerald-100 border-emerald-500 text-emerald-600 dark:bg-emerald-900"
                                  : milestone.status === "overdue"
                                    ? "bg-red-100 border-red-500 text-red-600 dark:bg-red-900"
                                    : "bg-background border-border"
                              }`}
                            >
                              {milestone.status === "completed" ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : milestone.status === "overdue" ? (
                                <AlertCircle className="h-4 w-4" />
                              ) : (
                                <Clock className="h-4 w-4" />
                              )}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium">{milestone.name}</h5>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-muted-foreground">
                                    ${milestone.budget.toLocaleString()}
                                  </span>
                                  <Badge className={getStatusColor(milestone.status)} variant="outline">
                                    {milestone.status}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">{milestone.description}</p>
                              <div className="text-xs text-muted-foreground">
                                Due: {new Date(milestone.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Project Form Component
function ProjectForm({
  onSubmit,
}: { onSubmit: (project: Omit<Project, "id" | "progress" | "milestones" | "tasks">) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    spent: "",
    status: "planning" as Project["status"],
    priority: "medium" as Project["priority"],
    startDate: "",
    endDate: "",
    teamMembers: [""],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      description: formData.description,
      budget: Number.parseFloat(formData.budget),
      spent: Number.parseFloat(formData.spent) || 0,
      status: formData.status,
      priority: formData.priority,
      startDate: formData.startDate,
      endDate: formData.endDate,
      teamMembers: formData.teamMembers.filter((member) => member.trim() !== ""),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            placeholder="e.g., Website Redesign"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Budget</Label>
          <Input
            id="budget"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.budget}
            onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Project description and objectives"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: Project["status"]) => setFormData((prev) => ({ ...prev, status: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value: Project["priority"]) => setFormData((prev) => ({ ...prev, priority: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="spent">Amount Spent</Label>
          <Input
            id="spent"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.spent}
            onChange={(e) => setFormData((prev) => ({ ...prev, spent: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Create Project
      </Button>
    </form>
  )
}

// Task Form Component
function TaskForm({
  projects,
  onSubmit,
}: {
  projects: Project[]
  onSubmit: (task: Omit<Task, "id">) => void
}) {
  const [formData, setFormData] = useState({
    projectId: "",
    name: "",
    description: "",
    assignee: "",
    status: "todo" as Task["status"],
    priority: "medium" as Task["priority"],
    dueDate: "",
    estimatedHours: "",
    actualHours: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      projectId: formData.projectId,
      name: formData.name,
      description: formData.description,
      assignee: formData.assignee,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate,
      estimatedHours: Number.parseFloat(formData.estimatedHours),
      actualHours: Number.parseFloat(formData.actualHours) || 0,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="projectId">Project</Label>
        <Select
          value={formData.projectId}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, projectId: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Task Name</Label>
        <Input
          id="name"
          placeholder="e.g., Create wireframes"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Task description and requirements"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="assignee">Assignee</Label>
          <Input
            id="assignee"
            placeholder="e.g., John Doe"
            value={formData.assignee}
            onChange={(e) => setFormData((prev) => ({ ...prev, assignee: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: Task["status"]) => setFormData((prev) => ({ ...prev, status: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value: Task["priority"]) => setFormData((prev) => ({ ...prev, priority: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="estimatedHours">Est. Hours</Label>
          <Input
            id="estimatedHours"
            type="number"
            step="0.5"
            placeholder="0"
            value={formData.estimatedHours}
            onChange={(e) => setFormData((prev) => ({ ...prev, estimatedHours: e.target.value }))}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Create Task
      </Button>
    </form>
  )
}
