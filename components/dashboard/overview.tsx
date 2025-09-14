"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Target, Wallet, PieChart } from "lucide-react"

export function Overview() {
  // Sample data for overview
  const financialSummary = {
    totalIncome: 5500,
    totalExpenses: 3850,
    netIncome: 1650,
    savingsRate: 30,
  }

  const recentTransactions = [
    { id: "1", type: "income", amount: 5000, description: "Monthly salary", category: "Salary", date: "2024-01-01" },
    { id: "2", type: "expense", amount: 1200, description: "Rent payment", category: "Housing", date: "2024-01-02" },
    { id: "3", type: "expense", amount: 300, description: "Groceries", category: "Food", date: "2024-01-03" },
  ]

  const budgetStatus = [
    { category: "Food", spent: 300, limit: 500, percentage: 60 },
    { category: "Transportation", spent: 150, limit: 200, percentage: 75 },
    { category: "Entertainment", spent: 120, limit: 300, percentage: 40 },
  ]

  const financialGoals = [
    { name: "Emergency Fund", current: 6500, target: 10000, percentage: 65 },
    { name: "Vacation Fund", current: 1200, target: 3000, percentage: 40 },
    { name: "New Laptop", current: 800, target: 2000, percentage: 40 },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Financial Overview</h1>
        <p className="text-blue-100">Track your financial health and progress towards your goals</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">${financialSummary.totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${financialSummary.totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${financialSummary.netIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <Wallet className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{financialSummary.savingsRate}%</div>
            <p className="text-xs text-muted-foreground">Of total income</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Recent Transactions</span>
            </CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
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
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold text-sm ${transaction.type === "income" ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <span>Budget Status</span>
            </CardTitle>
            <CardDescription>How you're tracking against your budgets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetStatus.map((budget) => (
                <div key={budget.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{budget.category}</span>
                    <span className="text-sm text-muted-foreground">
                      ${budget.spent} / ${budget.limit}
                    </span>
                  </div>
                  <Progress value={budget.percentage} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{budget.percentage}% used</span>
                    {budget.percentage > 80 && (
                      <Badge variant={budget.percentage > 100 ? "destructive" : "secondary"} className="text-xs">
                        {budget.percentage > 100 ? "Over Budget" : "Near Limit"}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Financial Goals Progress</span>
          </CardTitle>
          <CardDescription>Track your progress towards financial objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {financialGoals.map((goal) => (
              <div key={goal.name} className="space-y-3 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{goal.name}</h4>
                  <Target className="h-4 w-4 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>${goal.current.toLocaleString()}</span>
                    <span>${goal.target.toLocaleString()}</span>
                  </div>
                  <Progress value={goal.percentage} className="h-2" />
                  <div className="text-center">
                    <span className="text-sm font-medium text-blue-600">{goal.percentage}% Complete</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
