// Export utilities for PDF and Excel generation
export interface ExportData {
  type: "financial" | "budget" | "projects" | "goals"
  title: string
  dateRange: string
  data: any[]
  summary?: Record<string, any>
  charts?: any[]
}

// Generate CSV data from array of objects
export function generateCSV(data: any[], filename: string): void {
  if (!data.length) return

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header]
          // Handle values that might contain commas
          return typeof value === "string" && value.includes(",") ? `"${value}"` : value
        })
        .join(","),
    ),
  ].join("\n")

  downloadFile(csvContent, filename, "text/csv")
}

// Generate Excel-compatible data (CSV with proper formatting)
export function generateExcel(exportData: ExportData): void {
  const { title, dateRange, data, summary } = exportData

  let csvContent = `${title}\n`
  csvContent += `Report Period: ${dateRange}\n`
  csvContent += `Generated: ${new Date().toLocaleDateString()}\n\n`

  // Add summary if provided
  if (summary) {
    csvContent += "SUMMARY\n"
    Object.entries(summary).forEach(([key, value]) => {
      csvContent += `${key},${value}\n`
    })
    csvContent += "\n"
  }

  // Add main data
  if (data.length > 0) {
    csvContent += "DETAILED DATA\n"
    const headers = Object.keys(data[0])
    csvContent += headers.join(",") + "\n"

    data.forEach((row) => {
      csvContent +=
        headers
          .map((header) => {
            const value = row[header]
            return typeof value === "string" && value.includes(",") ? `"${value}"` : value
          })
          .join(",") + "\n"
    })
  }

  const filename = `${title.toLowerCase().replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.csv`
  downloadFile(csvContent, filename, "text/csv")
}

// Generate PDF report (HTML to PDF simulation)
export function generatePDF(exportData: ExportData): void {
  const { title, dateRange, data, summary } = exportData

  // Create a formatted HTML report
  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .metric { display: inline-block; margin: 10px 20px; text-align: center; }
        .metric-value { font-size: 24px; font-weight: bold; color: #2563eb; }
        .metric-label { font-size: 14px; color: #666; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${title}</h1>
        <p>Report Period: ${dateRange}</p>
        <p>Generated: ${new Date().toLocaleDateString()}</p>
      </div>
  `

  // Add summary section
  if (summary) {
    htmlContent += '<div class="summary"><h2>Summary</h2>'
    Object.entries(summary).forEach(([key, value]) => {
      htmlContent += `
        <div class="metric">
          <div class="metric-value">${value}</div>
          <div class="metric-label">${key}</div>
        </div>
      `
    })
    htmlContent += "</div>"
  }

  // Add data table
  if (data.length > 0) {
    htmlContent += "<h2>Detailed Data</h2><table>"
    const headers = Object.keys(data[0])

    htmlContent += "<thead><tr>"
    headers.forEach((header) => {
      htmlContent += `<th>${header.charAt(0).toUpperCase() + header.slice(1)}</th>`
    })
    htmlContent += "</tr></thead><tbody>"

    data.forEach((row) => {
      htmlContent += "<tr>"
      headers.forEach((header) => {
        htmlContent += `<td>${row[header]}</td>`
      })
      htmlContent += "</tr>"
    })
    htmlContent += "</tbody></table>"
  }

  htmlContent += "</body></html>"

  // Create a new window with the report
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(htmlContent)
    printWindow.document.close()

    // Trigger print dialog after content loads
    printWindow.onload = () => {
      printWindow.print()
    }
  }
}

// Utility function to download files
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

// Format currency values
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

// Format percentage values
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

// Generate financial summary data
export function generateFinancialSummary(transactions: any[]): Record<string, string> {
  const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const netIncome = income - expenses
  const savingsRate = income > 0 ? (netIncome / income) * 100 : 0

  return {
    "Total Income": formatCurrency(income),
    "Total Expenses": formatCurrency(expenses),
    "Net Income": formatCurrency(netIncome),
    "Savings Rate": formatPercentage(savingsRate),
    "Number of Transactions": transactions.length.toString(),
  }
}

// Generate project summary data
export function generateProjectSummary(projects: any[]): Record<string, string> {
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0)
  const activeProjects = projects.filter((p) => p.status === "active").length
  const completedProjects = projects.filter((p) => p.status === "completed").length

  return {
    "Total Projects": projects.length.toString(),
    "Active Projects": activeProjects.toString(),
    "Completed Projects": completedProjects.toString(),
    "Total Budget": formatCurrency(totalBudget),
    "Total Spent": formatCurrency(totalSpent),
    "Budget Utilization": formatPercentage((totalSpent / totalBudget) * 100),
  }
}
