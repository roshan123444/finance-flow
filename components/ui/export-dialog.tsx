"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Download, FileText, FileSpreadsheet } from "lucide-react"
import { generatePDF, generateExcel, generateCSV, type ExportData } from "@/lib/export-utils"

interface ExportDialogProps {
  data: any[]
  title: string
  type: "financial" | "budget" | "projects" | "goals"
  summary?: Record<string, any>
  children: React.ReactNode
}

export function ExportDialog({ data, title, type, summary, children }: ExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState<"pdf" | "excel" | "csv">("pdf")
  const [dateRange, setDateRange] = useState("last-6-months")
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeSummary, setIncludeSummary] = useState(true)
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    try {
      const exportData: ExportData = {
        type,
        title,
        dateRange: getDateRangeLabel(dateRange),
        data,
        summary: includeSummary ? summary : undefined,
        charts: includeCharts ? [] : undefined, // Charts would be implemented with canvas/svg export
      }

      switch (exportFormat) {
        case "pdf":
          generatePDF(exportData)
          break
        case "excel":
          generateExcel(exportData)
          break
        case "csv":
          generateCSV(data, `${title.toLowerCase().replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.csv`)
          break
      }

      // Close dialog after successful export
      setTimeout(() => {
        setIsOpen(false)
      }, 1000)
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const getDateRangeLabel = (range: string): string => {
    switch (range) {
      case "last-month":
        return "Last Month"
      case "last-3-months":
        return "Last 3 Months"
      case "last-6-months":
        return "Last 6 Months"
      case "last-year":
        return "Last Year"
      case "all-time":
        return "All Time"
      default:
        return "Last 6 Months"
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "excel":
        return <FileSpreadsheet className="h-4 w-4" />
      case "csv":
        return <FileSpreadsheet className="h-4 w-4" />
      default:
        return <Download className="h-4 w-4" />
    }
  }

  const getFormatDescription = (format: string) => {
    switch (format) {
      case "pdf":
        return "Formatted report with charts and styling"
      case "excel":
        return "Spreadsheet format for data analysis"
      case "csv":
        return "Simple data format for import/export"
      default:
        return ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export Report</span>
          </DialogTitle>
          <DialogDescription>Export your {title.toLowerCase()} data in various formats</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Export Format</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: "pdf", label: "PDF Report", icon: FileText },
                { value: "excel", label: "Excel File", icon: FileSpreadsheet },
                { value: "csv", label: "CSV Data", icon: FileSpreadsheet },
              ].map((format) => {
                const Icon = format.icon
                return (
                  <Card
                    key={format.value}
                    className={`cursor-pointer transition-all ${
                      exportFormat === format.value
                        ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setExportFormat(format.value as any)}
                  >
                    <CardContent className="p-4 text-center">
                      <Icon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-medium">{format.label}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{getFormatDescription(format.value)}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Date Range Selection */}
          <div className="space-y-2">
            <Label htmlFor="dateRange">Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Export Options</Label>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="includeSummary" checked={includeSummary} onCheckedChange={setIncludeSummary} />
                <Label htmlFor="includeSummary" className="text-sm">
                  Include summary statistics
                </Label>
              </div>

              {exportFormat === "pdf" && (
                <div className="flex items-center space-x-2">
                  <Checkbox id="includeCharts" checked={includeCharts} onCheckedChange={setIncludeCharts} />
                  <Label htmlFor="includeCharts" className="text-sm">
                    Include charts and visualizations
                  </Label>
                </div>
              )}
            </div>
          </div>

          {/* Export Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Export Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Format:</span>
                <span className="font-medium">{exportFormat.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Date Range:</span>
                <span className="font-medium">{getDateRangeLabel(dateRange)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Records:</span>
                <span className="font-medium">{data.length} items</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Include Summary:</span>
                <span className="font-medium">{includeSummary ? "Yes" : "No"}</span>
              </div>
              {exportFormat === "pdf" && (
                <div className="flex justify-between text-sm">
                  <span>Include Charts:</span>
                  <span className="font-medium">{includeCharts ? "Yes" : "No"}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Export Actions */}
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport} disabled={isExporting}>
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  {getFormatIcon(exportFormat)}
                  <span className="ml-2">Export {exportFormat.toUpperCase()}</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
