"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, TrendingUp, TrendingDown, Target, DollarSign, Download } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ExportDialog } from "@/components/ui/export-dialog"
import { generateFinancialSummary } from "@/lib/export-utils"

interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  category: string
  description: string
  date: string
}

interface Budget {
  id: string
  category: string
  limit: number
  spent: number
  period: "monthly" | "weekly" | "yearly"
}

interface FinancialGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
}

export function BudgetManager() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [goals, setGoals] = useState<FinancialGoal[]>([])
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false)
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)

  // Load sample data on mount
  useEffect(() => {
    const sampleTransactions: Transaction[] = [
      { id: "1", type: "income", amount: 5000, category: "Salary", description: "Monthly salary", date: "2024-01-01" },
      { id: "2", type: "expense", amount: 1200, category: "Housing", description: "Rent payment", date: "2024-01-02" },
      { id: "3", type: "expense", amount: 300, category: "Food", description: "Groceries", date: "2024-01-03" },
      {
        id: "4",
        type: "expense",
        amount: 150,
        category: "Transportation",
        description: "Gas and parking",
        date: "2024-01-04",
      },
      {
        id: "5",
        type: "income",
        amount: 500,
        category: "Freelance",
        description: "Web design project",
        date: "2024-01-05",
      },
    ]

    const sampleBudgets: Budget[] = [
      { id: "1", category: "Food", limit: 500, spent: 300, period: "monthly" },
      { id: "2", category: "Transportation", limit: 200, spent: 150, period: "monthly" },
      { id: "3", category: "Entertainment", limit: 300, spent: 120, period: "monthly" },
      { id: "4", category: "Shopping", limit: 400, spent: 380, period: "monthly" },
    ]

    const sampleGoals: FinancialGoal[] = [
      {
        id: "1",
        name: "Emergency Fund",
        targetAmount: 10000,
        currentAmount: 6500,
        deadline: "2024-12-31",
        category: "Savings",
      },
      {
        id: "2",
        name: "Vacation Fund",
        targetAmount: 3000,
        currentAmount: 1200,
        deadline: "2024-06-30",
        category: "Travel",
      },
      {
        id: "3",
        name: "New Laptop",
        targetAmount: 2000,
        currentAmount: 800,
        deadline: "2024-03-31",
        category: "Technology",
      },
    ]

    setTransactions(sampleTransactions)
    setBudgets(sampleBudgets)
    setGoals(sampleGoals)
  }, [])

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = { ...transaction, id: Date.now().toString() }
    setTransactions((prev) => [newTransaction, ...prev])
    setIsAddTransactionOpen(false)
  }

  const addBudget = (budget: Omit<Budget, "id" | "spent">) => {
    const newBudget = { ...budget, id: Date.now().toString(), spent: 0 }
    setBudgets((prev) => [...prev, newBudget])
    setIsAddBudgetOpen(false)
  }

  const addGoal = (goal: Omit<FinancialGoal, "id">) => {
    const newGoal = { ...goal, id: Date.now().toString() }
    setGoals((prev) => [...prev, newGoal])
    setIsAddGoalOpen(false)
  }

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  const netIncome = totalIncome - totalExpenses

  return (
    <div className="space-y-6">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netIncome >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              ${netIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="budgets">Budgets</TabsTrigger>
            <TabsTrigger value="goals">Financial Goals</TabsTrigger>
          </TabsList>

          <ExportDialog
            data={transactions}
            title="Budget & Transactions Report"
            type="budget"
            summary={generateFinancialSummary(transactions)}
          >
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </ExportDialog>
        </div>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Track your income and expenses</CardDescription>
                </div>
                <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Transaction
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Transaction</DialogTitle>
                      <DialogDescription>Record a new income or expense transaction</DialogDescription>
                    </DialogHeader>
                    <TransactionForm onSubmit={addTransaction} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-full ${transaction.type === "income" ? "bg-emerald-100 dark:bg-emerald-900" : "bg-red-100 dark:bg-red-900"}`}
                      >
                        {transaction.type === "income" ? (
                          <TrendingUp className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.category} • {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${transaction.type === "income" ? "text-emerald-600" : "text-red-600"}`}>
                        {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                      </p>
                      <Badge variant={transaction.type === "income" ? "default" : "destructive"}>
                        {transaction.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budgets Tab */}
        <TabsContent value="budgets" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Budget Overview</CardTitle>
                  <CardDescription>Monitor your spending against budget limits</CardDescription>
                </div>
                <Dialog open={isAddBudgetOpen} onOpenChange={setIsAddBudgetOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Budget
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Budget</DialogTitle>
                      <DialogDescription>Set spending limits for different categories</DialogDescription>
                    </DialogHeader>
                    <BudgetForm onSubmit={addBudget} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {budgets.map((budget) => {
                  const percentage = (budget.spent / budget.limit) * 100
                  const isOverBudget = percentage > 100

                  return (
                    <Card key={budget.id} className={`${isOverBudget ? "border-red-200 dark:border-red-800" : ""}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{budget.category}</CardTitle>
                          <Badge variant={isOverBudget ? "destructive" : "secondary"}>{budget.period}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Spent: ${budget.spent.toLocaleString()}</span>
                          <span>Limit: ${budget.limit.toLocaleString()}</span>
                        </div>
                        <Progress
                          value={Math.min(percentage, 100)}
                          className={`h-2 ${isOverBudget ? "bg-red-100 dark:bg-red-900" : ""}`}
                        />
                        <div className="flex justify-between items-center">
                          <span
                            className={`text-sm font-medium ${isOverBudget ? "text-red-600" : "text-muted-foreground"}`}
                          >
                            {percentage.toFixed(1)}% used
                          </span>
                          {isOverBudget && (
                            <Badge variant="destructive" className="text-xs">
                              Over Budget
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Financial Goals</CardTitle>
                  <CardDescription>Track progress towards your financial objectives</CardDescription>
                </div>
                <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Goal
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Financial Goal</DialogTitle>
                      <DialogDescription>Set a target amount and deadline for your goal</DialogDescription>
                    </DialogHeader>
                    <GoalForm onSubmit={addGoal} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goals.map((goal) => {
                  const percentage = (goal.currentAmount / goal.targetAmount) * 100
                  const remaining = goal.targetAmount - goal.currentAmount

                  return (
                    <Card key={goal.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{goal.name}</CardTitle>
                          <Target className="h-5 w-5 text-blue-600" />
                        </div>
                        <CardDescription>{goal.category}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Current: ${goal.currentAmount.toLocaleString()}</span>
                          <span>Target: ${goal.targetAmount.toLocaleString()}</span>
                        </div>
                        <Progress value={Math.min(percentage, 100)} className="h-3" />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{percentage.toFixed(1)}% complete</span>
                          <span className="text-sm font-medium">${remaining.toLocaleString()} remaining</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Deadline: {new Date(goal.deadline).toLocaleDateString()}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Transaction Form Component
function TransactionForm({ onSubmit }: { onSubmit: (transaction: Omit<Transaction, "id">) => void }) {
  const [formData, setFormData] = useState({
    type: "expense" as "income" | "expense",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  })

  const categories = {
    income: ["Salary", "Freelance", "Investment", "Business", "Other"],
    expense: ["Housing", "Food", "Transportation", "Entertainment", "Shopping", "Healthcare", "Utilities", "Other"],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      type: formData.type,
      amount: Number.parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value: "income" | "expense") =>
            setFormData((prev) => ({ ...prev, type: value, category: "" }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.amount}
          onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories[formData.type].map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Add Transaction
      </Button>
    </form>
  )
}

// Budget Form Component
function BudgetForm({ onSubmit }: { onSubmit: (budget: Omit<Budget, "id" | "spent">) => void }) {
  const [formData, setFormData] = useState({
    category: "",
    limit: "",
    period: "monthly" as "monthly" | "weekly" | "yearly",
  })

  const categories = [
    "Housing",
    "Food",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Healthcare",
    "Utilities",
    "Other",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      category: formData.category,
      limit: Number.parseFloat(formData.limit),
      period: formData.period,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="limit">Budget Limit</Label>
        <Input
          id="limit"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.limit}
          onChange={(e) => setFormData((prev) => ({ ...prev, limit: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="period">Period</Label>
        <Select
          value={formData.period}
          onValueChange={(value: "monthly" | "weekly" | "yearly") =>
            setFormData((prev) => ({ ...prev, period: value }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        Create Budget
      </Button>
    </form>
  )
}

// Goal Form Component
function GoalForm({ onSubmit }: { onSubmit: (goal: Omit<FinancialGoal, "id">) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
    category: "",
  })

  const categories = ["Savings", "Travel", "Technology", "Education", "Investment", "Emergency", "Other"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      targetAmount: Number.parseFloat(formData.targetAmount),
      currentAmount: Number.parseFloat(formData.currentAmount) || 0,
      deadline: formData.deadline,
      category: formData.category,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Goal Name</Label>
        <Input
          id="name"
          placeholder="e.g., Emergency Fund"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetAmount">Target Amount</Label>
        <Input
          id="targetAmount"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.targetAmount}
          onChange={(e) => setFormData((prev) => ({ ...prev, targetAmount: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentAmount">Current Amount</Label>
        <Input
          id="currentAmount"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.currentAmount}
          onChange={(e) => setFormData((prev) => ({ ...prev, currentAmount: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline</Label>
        <Input
          id="deadline"
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData((prev) => ({ ...prev, deadline: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        Create Goal
      </Button>
    </form>
  )
}
