"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExportDialog } from "@/components/ui/export-dialog"
import { generateFinancialSummary } from "@/lib/export-utils"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChartIcon,
  BarChart3,
  Download,
  Calendar,
  Target,
  Wallet,
} from "lucide-react"
import { useState } from "react"

export function Reports() {
  const [timeRange, setTimeRange] = useState("6months")
  const [reportType, setReportType] = useState("overview")

  // Sample data for charts
  const monthlyData = [
    { month: "Jan", income: 5500, expenses: 3200, savings: 2300, projects: 2 },
    { month: "Feb", income: 6200, expenses: 3800, savings: 2400, projects: 3 },
    { month: "Mar", income: 5800, expenses: 4200, savings: 1600, projects: 2 },
    { month: "Apr", income: 7100, expenses: 4500, savings: 2600, projects: 4 },
    { month: "May", income: 6800, expenses: 3900, savings: 2900, projects: 3 },
    { month: "Jun", income: 7500, expenses: 4100, savings: 3400, projects: 5 },
  ]

  const expenseCategories = [
    { name: "Housing", value: 1200, color: "#3b82f6" },
    { name: "Food", value: 800, color: "#10b981" },
    { name: "Transportation", value: 400, color: "#f59e0b" },
    { name: "Entertainment", value: 300, color: "#ef4444" },
    { name: "Healthcare", value: 250, color: "#8b5cf6" },
    { name: "Shopping", value: 350, color: "#06b6d4" },
    { name: "Utilities", value: 200, color: "#84cc16" },
    { name: "Other", value: 150, color: "#6b7280" },
  ]

  const projectBudgetData = [
    { name: "Website Redesign", budget: 15000, spent: 8500, remaining: 6500 },
    { name: "Mobile App", budget: 25000, spent: 12000, remaining: 13000 },
    { name: "Marketing Campaign", budget: 8000, spent: 8000, remaining: 0 },
    { name: "Office Setup", budget: 12000, spent: 7500, remaining: 4500 },
  ]

  const savingsGoalData = [
    { goal: "Emergency Fund", target: 10000, current: 6500, progress: 65 },
    { goal: "Vacation", target: 3000, current: 1200, progress: 40 },
    { goal: "New Laptop", target: 2000, current: 800, progress: 40 },
    { goal: "Investment", target: 5000, current: 2100, progress: 42 },
  ]

  const cashFlowData = [
    { week: "Week 1", inflow: 1200, outflow: 800, net: 400 },
    { week: "Week 2", inflow: 1500, outflow: 1100, net: 400 },
    { week: "Week 3", inflow: 1800, outflow: 950, net: 850 },
    { week: "Week 4", inflow: 1300, outflow: 1200, net: 100 },
  ]

  const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0)
  const totalExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0)
  const totalSavings = monthlyData.reduce((sum, month) => sum + month.savings, 0)
  const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Financial Reports</h2>
          <p className="text-muted-foreground">Comprehensive analysis of your financial data</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <ExportDialog
            data={monthlyData}
            title="Financial Overview Report"
            type="financial"
            summary={generateFinancialSummary([
              ...monthlyData.map((m) => ({ type: "income", amount: m.income })),
              ...monthlyData.map((m) => ({ type: "expense", amount: m.expenses })),
            ])}
          >
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </ExportDialog>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last period</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8.2% from last period</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <Wallet className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${totalSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+18.7% from last period</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{savingsRate}%</div>
            <p className="text-xs text-muted-foreground">Target: 30%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="financial" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financial">Financial Overview</TabsTrigger>
          <TabsTrigger value="expenses">Expense Analysis</TabsTrigger>
          <TabsTrigger value="projects">Project Reports</TabsTrigger>
          <TabsTrigger value="goals">Goals & Savings</TabsTrigger>
        </TabsList>

        {/* Financial Overview Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income vs Expenses Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Income vs Expenses Trend</span>
                </CardTitle>
                <CardDescription>Monthly comparison of income and expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                    <Legend />
                    <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} name="Income" />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} name="Expenses" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Savings Growth */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Savings Growth</span>
                </CardTitle>
                <CardDescription>Monthly savings accumulation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                    <Area
                      type="monotone"
                      dataKey="savings"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      name="Monthly Savings"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Cash Flow Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Weekly Cash Flow</span>
              </CardTitle>
              <CardDescription>Weekly inflow vs outflow analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                  <Legend />
                  <Bar dataKey="inflow" fill="#10b981" name="Inflow" />
                  <Bar dataKey="outflow" fill="#ef4444" name="Outflow" />
                  <Bar dataKey="net" fill="#3b82f6" name="Net Flow" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expense Analysis Tab */}
        <TabsContent value="expenses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expense Categories Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChartIcon className="h-5 w-5" />
                  <span>Expense Categories</span>
                </CardTitle>
                <CardDescription>Breakdown of expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Spending Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Category Spending Details</CardTitle>
                <CardDescription>Monthly spending by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseCategories.map((category) => {
                    const percentage =
                      (category.value / expenseCategories.reduce((sum, cat) => sum + cat.value, 0)) * 100
                    return (
                      <div key={category.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">${category.value.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: category.color,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Project Reports Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Budget Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Project Budget Analysis</span>
                </CardTitle>
                <CardDescription>Budget vs actual spending by project</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectBudgetData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                    <Legend />
                    <Bar dataKey="budget" fill="#3b82f6" name="Budget" />
                    <Bar dataKey="spent" fill="#ef4444" name="Spent" />
                    <Bar dataKey="remaining" fill="#10b981" name="Remaining" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Project Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Project Status Overview</CardTitle>
                <CardDescription>Current status of all projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectBudgetData.map((project) => {
                    const spentPercentage = (project.spent / project.budget) * 100
                    const isOverBudget = spentPercentage > 100

                    return (
                      <div key={project.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{project.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant={isOverBudget ? "destructive" : "secondary"}>
                              {spentPercentage.toFixed(1)}% spent
                            </Badge>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>${project.spent.toLocaleString()} spent</span>
                          <span>${project.budget.toLocaleString()} budget</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div
                            className={`h-2 rounded-full ${isOverBudget ? "bg-red-500" : "bg-blue-500"}`}
                            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                          />
                        </div>
                        {project.remaining > 0 && (
                          <div className="text-sm text-emerald-600">
                            ${project.remaining.toLocaleString()} remaining
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Goals & Savings Tab */}
        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Savings Goals Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Savings Goals Progress</span>
                </CardTitle>
                <CardDescription>Progress towards financial goals</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={savingsGoalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="goal" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                    <Legend />
                    <Bar dataKey="current" fill="#10b981" name="Current Amount" />
                    <Bar dataKey="target" fill="#e5e7eb" name="Target Amount" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Goal Details */}
            <Card>
              <CardHeader>
                <CardTitle>Goal Achievement Details</CardTitle>
                <CardDescription>Detailed progress for each financial goal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savingsGoalData.map((goal) => (
                    <div key={goal.goal} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{goal.goal}</h4>
                        <Badge variant={goal.progress >= 50 ? "default" : "secondary"}>{goal.progress}% complete</Badge>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${goal.current.toLocaleString()} saved</span>
                        <span>${goal.target.toLocaleString()} target</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <div className="text-sm text-blue-600">
                        ${(goal.target - goal.current).toLocaleString()} remaining
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Savings Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Monthly Savings Trend</span>
              </CardTitle>
              <CardDescription>Track your savings progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                    name="Monthly Savings"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
