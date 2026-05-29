"use client"

import { useState } from "react"
import {
  Search,
  Database,
  Compass,
  Sparkles,
  BarChart3,
  MessageSquare,
  Upload,
  Cloud,
  FolderOpen,
  FileSpreadsheet,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Share2,
  Lightbulb,
  Send,
  LayoutGrid,
  ArrowRight,
  Check,
  X,
  Building2,
  TrendingUp,
  DollarSign,
  Stethoscope,
  LineChart,
  PanelRightOpen,
  PanelRightClose,
  StickyNote,
  Plus,
  Activity,
  Briefcase,
  ShoppingCart,
  GraduationCap,
  Factory,
  Leaf,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

type ViewState = "home" | "templates" | "database" | "discover" | "prep" | "analyze" | "communicate"

interface TrackedHypothesis {
  id: number
  title: string
  status: "todo" | "in-progress" | "done"
  notes: string
}

const allTemplates = [
  {
    id: 1,
    title: "Government Fiscal Audit",
    description: "Analyze public sector spending patterns and budget allocation",
    icon: Building2,
    color: "bg-blue-50 text-blue-600 border-blue-200",
    category: "Government",
  },
  {
    id: 2,
    title: "SaaS Financial Planner",
    description: "Track MRR, churn rates, and customer acquisition costs",
    icon: TrendingUp,
    color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    category: "Financial",
  },
  {
    id: 3,
    title: "Vendor Procurement Optimizer",
    description: "Optimize vendor relationships and payment cycles",
    icon: DollarSign,
    color: "bg-amber-50 text-amber-600 border-amber-200",
    category: "Financial",
  },
  {
    id: 4,
    title: "Healthcare Patient Analytics",
    description: "Analyze patient outcomes and treatment effectiveness",
    icon: Stethoscope,
    color: "bg-rose-50 text-rose-600 border-rose-200",
    category: "Healthcare",
  },
  {
    id: 5,
    title: "Stock Portfolio Tracker",
    description: "Monitor stock performance and portfolio allocation",
    icon: LineChart,
    color: "bg-violet-50 text-violet-600 border-violet-200",
    category: "Stocks",
  },
  {
    id: 6,
    title: "Hospital Resource Manager",
    description: "Track bed utilization and staffing efficiency",
    icon: Activity,
    color: "bg-pink-50 text-pink-600 border-pink-200",
    category: "Healthcare",
  },
  {
    id: 7,
    title: "Investment Fund Analysis",
    description: "Analyze fund performance and risk metrics",
    icon: Briefcase,
    color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    category: "Stocks",
  },
  {
    id: 8,
    title: "E-commerce Sales Dashboard",
    description: "Track sales, conversions, and customer behavior",
    icon: ShoppingCart,
    color: "bg-orange-50 text-orange-600 border-orange-200",
    category: "Retail",
  },
  {
    id: 9,
    title: "University Enrollment Analytics",
    description: "Analyze student enrollment and retention patterns",
    icon: GraduationCap,
    color: "bg-cyan-50 text-cyan-600 border-cyan-200",
    category: "Education",
  },
  {
    id: 10,
    title: "Manufacturing Quality Control",
    description: "Monitor defect rates and production efficiency",
    icon: Factory,
    color: "bg-slate-50 text-slate-600 border-slate-200",
    category: "Manufacturing",
  },
  {
    id: 11,
    title: "Carbon Footprint Tracker",
    description: "Track emissions and sustainability metrics",
    icon: Leaf,
    color: "bg-green-50 text-green-600 border-green-200",
    category: "Sustainability",
  },
]

const templateCategories = [
  { label: "All", value: "all" },
  { label: "Financial", value: "Financial" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Stocks", value: "Stocks" },
  { label: "Government", value: "Government" },
  { label: "Retail", value: "Retail" },
]

const suggestedHypotheses = [
  {
    id: 1,
    title: "Anomalies in Multi-Year Contract Cycles",
    description:
      "Analyze contract renewal patterns and identify vendors with unusual payment frequency changes across fiscal years.",
    questions: [
      "Which vendors show significant variance in payment amounts year-over-year?",
      "Are there contracts with unusual renewal timing patterns?",
    ],
  },
  {
    id: 2,
    title: "Quarterly Department Spending Spikes",
    description:
      "Track seasonal spending patterns across departments to identify budget utilization trends and end-of-quarter spending behavior.",
    questions: [
      "Which departments exhibit the most pronounced Q4 spending increases?",
      "Is there correlation between department size and spending volatility?",
    ],
  },
  {
    id: 3,
    title: "Vendor Concentration Risk Analysis",
    description:
      "Evaluate dependency on key vendors and identify potential procurement risks from over-concentration.",
    questions: [
      "What percentage of total spend goes to the top 10 vendors?",
      "Are there single-source dependencies for critical services?",
    ],
  },
  {
    id: 4,
    title: "Payment Timing Efficiency",
    description:
      "Analyze payment processing times and identify opportunities for early payment discounts or late payment penalties.",
    questions: [
      "What is the average time between invoice receipt and payment?",
      "Which vendors offer early payment discounts that are being missed?",
    ],
  },
  {
    id: 5,
    title: "Duplicate Payment Detection",
    description:
      "Identify potential duplicate payments or invoices to vendors that may indicate process inefficiencies or fraud risk.",
    questions: [
      "Are there multiple payments with identical amounts to the same vendor within short timeframes?",
      "Which invoice numbers appear more than once in the system?",
    ],
  },
]

const suggestedVisualizations = [
  {
    id: 1,
    title: "Monthly Spending Trend",
    question: "How do vendor payments trend over time?",
    chartType: "line",
    xAxis: "Payment Date",
    yAxis: "Amount",
    selected: false,
  },
  {
    id: 2,
    title: "Top Vendors by Spend",
    question: "Which vendors receive the most payments?",
    chartType: "bar",
    xAxis: "Vendor Name",
    yAxis: "Amount",
    selected: false,
  },
  {
    id: 3,
    title: "Spending by Department",
    question: "How is spending distributed across departments?",
    chartType: "bar",
    xAxis: "Department",
    yAxis: "Amount",
    selected: false,
  },
  {
    id: 4,
    title: "Payment Method Distribution",
    question: "What payment methods are most common?",
    chartType: "bar",
    xAxis: "Payment Method",
    yAxis: "Count",
    selected: false,
  },
  {
    id: 5,
    title: "Quarterly Spend Comparison",
    question: "How does spending vary by quarter?",
    chartType: "bar",
    xAxis: "Quarter",
    yAxis: "Amount",
    selected: false,
  },
]

const dataFields = [
  { name: "Vendor ID", type: "#", unique: "2,847 unique" },
  { name: "Vendor Name", type: "T", unique: "2,847 unique" },
  { name: "Payment Date", type: "D", unique: "1,095 unique" },
  { name: "Amount", type: "$", unique: "8,234 unique" },
  { name: "Department", type: "T", unique: "24 unique" },
  { name: "Category", type: "T", unique: "156 unique" },
  { name: "Fiscal Year", type: "#", unique: "3 unique" },
  { name: "Quarter", type: "T", unique: "4 unique" },
  { name: "Contract ID", type: "T", unique: "1,892 unique" },
  { name: "Payment Method", type: "T", unique: "5 unique" },
]

const chartData = [
  { month: "Jan 21", value: 45000 },
  { month: "Apr 21", value: 52000 },
  { month: "Jul 21", value: 48000 },
  { month: "Oct 21", value: 78000 },
  { month: "Jan 22", value: 42000 },
  { month: "Apr 22", value: 65000 },
  { month: "Jul 22", value: 58000 },
  { month: "Oct 22", value: 89000 },
  { month: "Jan 23", value: 55000 },
  { month: "Apr 23", value: 72000 },
  { month: "Jul 23", value: 68000 },
  { month: "Oct 23", value: 95000 },
]

export default function GoldieApp() {
  const [currentView, setCurrentView] = useState<ViewState>("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedSections, setExpandedSections] = useState({
    storySuggestions: true,
    styleInspiration: false,
    reviewImprove: false,
  })
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [hypothesisPanelOpen, setHypothesisPanelOpen] = useState(false)
  const [trackedHypotheses, setTrackedHypotheses] = useState<TrackedHypothesis[]>([])
  const [trackedIds, setTrackedIds] = useState<number[]>([])

  const handleTemplateClick = () => {
    setCurrentView("discover")
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setCurrentView("discover")
    }
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const updateHypothesisNotes = (id: number, notes: string) => {
    setTrackedHypotheses((prev) =>
      prev.map((h) => (h.id === id ? { ...h, notes } : h))
    )
  }

  const updateHypothesisStatus = (id: number, status: TrackedHypothesis["status"]) => {
    setTrackedHypotheses((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status } : h))
    )
  }

  const addHypothesis = (id: number, title: string) => {
    if (!trackedIds.includes(id)) {
      setTrackedIds((prev) => [...prev, id])
      setTrackedHypotheses((prev) => [...prev, { id, title, status: "todo", notes: "" }])
    }
  }

  const removeHypothesis = (id: number) => {
    setTrackedIds((prev) => prev.filter((i) => i !== id))
    setTrackedHypotheses((prev) => prev.filter((h) => h.id !== id))
  }

  const isHypothesisTracked = (id: number) => trackedIds.includes(id)

  if (currentView === "home") {
    return (
      <HomeView
        onTemplateClick={handleTemplateClick}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onViewTemplates={() => setCurrentView("templates")}
      />
    )
  }

  if (currentView === "templates") {
    return <TemplatesView onSelectTemplate={handleTemplateClick} onBack={() => setCurrentView("home")} />
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Global Workspace Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#e5e7eb]">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView("home")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-[#1f2937] text-lg">GOLDIE</span>
            </button>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="flex items-center gap-1">
            <NavTab
              icon={Database}
              label="Database"
              isActive={currentView === "database"}
              onClick={() => setCurrentView("database")}
              activeStyle="bg-[#f3f4f6] text-[#1f2937]"
            />
            <NavTab
              icon={Compass}
              label="Discover"
              isActive={currentView === "discover"}
              onClick={() => setCurrentView("discover")}
              activeStyle="bg-[#e0f2fe] text-[#0369a1]"
            />
            <NavTab
              icon={Sparkles}
              label="Prep"
              isActive={currentView === "prep"}
              onClick={() => setCurrentView("prep")}
              activeStyle="bg-[#f3f4f6] text-[#1f2937]"
            />
            <NavTab
              icon={BarChart3}
              label="Analyze"
              isActive={currentView === "analyze"}
              onClick={() => setCurrentView("analyze")}
              activeStyle="bg-[#f3f4f6] text-[#1f2937]"
            />
            <NavTab
              icon={MessageSquare}
              label="Communicate"
              isActive={currentView === "communicate"}
              onClick={() => setCurrentView("communicate")}
              activeStyle="bg-[#ffedd5] text-[#9a3412]"
            />
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-[#1f2937]" onClick={() => setShareModalOpen(true)}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`text-muted-foreground hover:text-[#1f2937] ${hypothesisPanelOpen ? "bg-amber-50 text-amber-600" : ""}`}
              onClick={() => setHypothesisPanelOpen(!hypothesisPanelOpen)}
            >
              {hypothesisPanelOpen ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Share Modal */}
      {shareModalOpen && (
        <ShareModal onClose={() => setShareModalOpen(false)} />
      )}

      {/* Main Content Area with Hypothesis Panel */}
      <div className="flex h-[calc(100vh-56px)]">
        <main className="flex-1 overflow-hidden">
          {currentView === "database" && <DatabaseView />}
          {currentView === "discover" && (
            <DiscoverView 
              onAddHypothesis={addHypothesis} 
              onRemoveHypothesis={removeHypothesis}
              isHypothesisTracked={isHypothesisTracked}
            />
          )}
          {currentView === "prep" && <PrepView />}
          {currentView === "analyze" && <AnalyzeView />}
          {currentView === "communicate" && (
            <CommunicateView expandedSections={expandedSections} toggleSection={toggleSection} />
          )}
        </main>

        {/* Global Hypothesis Tracking Panel */}
        {hypothesisPanelOpen && (
          <HypothesisPanel
            hypotheses={trackedHypotheses}
            onUpdateNotes={updateHypothesisNotes}
            onUpdateStatus={updateHypothesisStatus}
            onRemove={removeHypothesis}
            onClose={() => setHypothesisPanelOpen(false)}
          />
        )}
      </div>
    </div>
  )
}

function NavTab({
  icon: Icon,
  label,
  isActive,
  onClick,
  activeStyle,
}: {
  icon: React.ElementType
  label: string
  isActive: boolean
  onClick: () => void
  activeStyle: string
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        isActive ? activeStyle : "text-muted-foreground hover:text-[#1f2937] hover:bg-[#f8f9fa]"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  )
}

function HypothesisPanel({
  hypotheses,
  onUpdateNotes,
  onUpdateStatus,
  onRemove,
  onClose,
}: {
  hypotheses: TrackedHypothesis[]
  onUpdateNotes: (id: number, notes: string) => void
  onUpdateStatus: (id: number, status: TrackedHypothesis["status"]) => void
  onRemove: (id: number) => void
  onClose: () => void
}) {
  const statusColors = {
    todo: "bg-slate-100 text-slate-700",
    "in-progress": "bg-amber-100 text-amber-700",
    done: "bg-emerald-100 text-emerald-700",
  }

  return (
    <aside className="w-80 bg-white border-l border-[#e5e7eb] flex flex-col">
      <div className="p-4 border-b border-[#e5e7eb] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-amber-500" />
          <h3 className="font-semibold text-[#1f2937]">Tracked Hypotheses</h3>
          <Badge variant="secondary" className="text-xs">{hypotheses.length}</Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        {hypotheses.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-[#f8f9fa] rounded-xl flex items-center justify-center mx-auto mb-3">
              <Lightbulb className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-[#1f2937] mb-1">No hypotheses tracked yet</p>
            <p className="text-xs text-muted-foreground">
              Go to the Discover tab and click Track on hypotheses you want to investigate.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {hypotheses.map((hyp) => (
              <div key={hyp.id} className="p-3 border border-[#e5e7eb] rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <select
                    value={hyp.status}
                    onChange={(e) => onUpdateStatus(hyp.id, e.target.value as TrackedHypothesis["status"])}
                    className={`text-xs px-2 py-1 rounded-full border-none cursor-pointer ${statusColors[hyp.status]}`}
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-muted-foreground hover:text-red-500"
                    onClick={() => onRemove(hyp.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-sm font-medium text-[#1f2937] mb-2">{hyp.title}</p>
                <Textarea
                  placeholder="Add notes..."
                  className="text-xs min-h-[60px] resize-none"
                  value={hyp.notes}
                  onChange={(e) => onUpdateNotes(hyp.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t border-[#e5e7eb]">
        <p className="text-xs text-muted-foreground text-center">
          Track your analysis progress across all tabs
        </p>
      </div>
    </aside>
  )
}

function HomeView({
  onTemplateClick,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onViewTemplates,
}: {
  onTemplateClick: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  onSearchSubmit: (e: React.FormEvent) => void
  onViewTemplates: () => void
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Home Header */}
      <header className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-[#1f2937] text-2xl">GOLDIE</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-4xl font-bold text-[#1f2937] mb-10 text-balance">
          What will you analyze today?
        </h1>

        {/* AI Search Bar */}
        <form onSubmit={onSearchSubmit} className="relative max-w-2xl mx-auto mb-3">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
          <Input
            type="text"
            placeholder="Describe your analytic goal..."
            className="w-full pl-12 pr-12 py-6 text-base rounded-2xl border-[#e5e7eb] bg-white shadow-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        
        <div className="mb-16">
          <button
            onClick={onTemplateClick}
            className="text-sm text-muted-foreground hover:text-amber-600 hover:underline transition-colors"
          >
            or start with a blank workbook
          </button>
        </div>

        {/* Templates Header */}
        <div className="flex items-center justify-between max-w-5xl mx-auto mb-6">
          <h2 className="text-lg font-semibold text-[#1f2937]">Templates</h2>
          <Button variant="ghost" className="text-muted-foreground gap-2" onClick={onViewTemplates}>
            <LayoutGrid className="w-4 h-4" />
            View all templates
          </Button>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {allTemplates.slice(0, 3).map((template) => (
            <Card
              key={template.id}
              className="bg-white border-[#e5e7eb] hover:border-amber-300 hover:shadow-lg transition-all cursor-pointer group"
              onClick={onTemplateClick}
            >
              <CardHeader className="pb-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 border ${template.color} group-hover:scale-105 transition-transform`}
                >
                  <template.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg text-[#1f2937] text-left">{template.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-left text-muted-foreground">{template.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer Tag */}
      <div className="text-center pb-8">
        <Badge variant="secondary" className="bg-[#f3f4f6] text-muted-foreground px-4 py-2">
          <Sparkles className="w-3 h-3 mr-2" />
          AI-Native Business Intelligence
        </Badge>
      </div>
    </div>
  )
}

function TemplatesView({
  onSelectTemplate,
  onBack,
}: {
  onSelectTemplate: () => void
  onBack: () => void
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredTemplates = allTemplates.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || t.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowRight className="w-4 h-4 rotate-180" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-[#1f2937] text-2xl">GOLDIE</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[#1f2937] text-center mb-8">Templates</h1>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
          <Input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-12 py-5 text-base rounded-xl border-[#e5e7eb] bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {templateCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.value
                  ? "bg-[#1f2937] text-white"
                  : "bg-white border border-[#e5e7eb] text-muted-foreground hover:border-[#1f2937]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="bg-white border-[#e5e7eb] hover:border-amber-300 hover:shadow-lg transition-all cursor-pointer group"
              onClick={onSelectTemplate}
            >
              <CardHeader className="pb-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 border ${template.color} group-hover:scale-105 transition-transform`}
                >
                  <template.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg text-[#1f2937] text-left">{template.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-left text-muted-foreground">{template.description}</CardDescription>
                <Badge variant="secondary" className="mt-3 text-xs">{template.category}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function DatabaseView() {
  const [activeTab, setActiveTab] = useState<"sample" | "upload" | "cloud">("sample")

  const sidebarItems = [
    { icon: FileSpreadsheet, label: "Sample datasets", key: "sample" as const, active: activeTab === "sample" },
    { icon: Upload, label: "Upload files", key: "upload" as const, active: activeTab === "upload" },
    { icon: Cloud, label: "Cloud data sources", key: "cloud" as const, active: activeTab === "cloud" },
    { icon: FolderOpen, label: "Saved datasets", key: "saved" as const, active: false },
  ]

  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e5e7eb] p-4">
        {/* Workbook Name */}
        <div className="mb-6 p-3 bg-[#f8f9fa] rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Current Workbook</p>
          <p className="text-sm font-medium text-[#1f2937]">Vendor Payment Workbook</p>
        </div>

        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.key === "sample" || item.key === "upload" || item.key === "cloud") {
                  setActiveTab(item.key)
                }
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                item.active
                  ? "bg-[#f8f9fa] text-[#1f2937] font-medium"
                  : "text-muted-foreground hover:bg-[#f8f9fa] hover:text-[#1f2937]"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          {activeTab === "sample" && (
            <>
              {/* Connected Data Card */}
              <div className="mb-6">
                <Card className="bg-white border-[#e5e7eb]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                          <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[#1f2937]">Vendor Payments Database</span>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Connected</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">45,892 rows • 10 columns • Last synced 2 min ago</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Reconnect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Other Sample Datasets */}
              <h2 className="text-sm font-medium text-muted-foreground mb-3">Other sample datasets</h2>
              <div className="space-y-2">
                {["Sales Performance 2024", "Customer Segmentation", "Inventory Tracking"].map((name) => (
                  <Card key={name} className="bg-white border-[#e5e7eb] hover:border-amber-300 cursor-pointer transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#f8f9fa] rounded-lg flex items-center justify-center">
                          <FileSpreadsheet className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-[#1f2937]">{name}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {(activeTab === "upload" || activeTab === "cloud") && (
            <Card className="bg-white border-[#e5e7eb]">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#f8f9fa] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {activeTab === "upload" ? <Upload className="w-8 h-8 text-muted-foreground" /> : <Cloud className="w-8 h-8 text-muted-foreground" />}
                </div>
                <h2 className="text-xl font-semibold text-[#1f2937] mb-2">
                  {activeTab === "upload" ? "Upload Files" : "Cloud Data Sources"}
                </h2>
                <Badge variant="secondary" className="mb-4">Core Architecture Mirror - No Update</Badge>
                <p className="text-muted-foreground text-sm">
                  This feature is part of the core architecture and will be available in future updates.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function DiscoverView({ 
  onAddHypothesis, 
  onRemoveHypothesis,
  isHypothesisTracked 
}: { 
  onAddHypothesis: (id: number, title: string) => void 
  onRemoveHypothesis: (id: number) => void
  isHypothesisTracked: (id: number) => boolean
}) {
  const [selectedViz, setSelectedViz] = useState<number[]>([])

  const toggleViz = (id: number) => {
    setSelectedViz((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedViz.length === suggestedVisualizations.length) {
      setSelectedViz([])
    } else {
      setSelectedViz(suggestedVisualizations.map((v) => v.id))
    }
  }

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-5xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#1f2937]">Discover Your Data</h1>
                <p className="text-sm text-muted-foreground">AI-powered insights for <span className="font-medium">Vendor Payment Workbook</span></p>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>

          {/* Dataset Summary Card */}
          <Card className="bg-white border-[#e5e7eb] mb-8">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#f8f9fa] rounded-xl flex items-center justify-center">
                    <FileSpreadsheet className="w-6 h-6 text-[#1f2937]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-lg font-semibold text-[#1f2937]">Vendor Payments Database</h2>
                      <Button variant="outline" size="sm" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Chat with your data
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">45,892 rows • 10 dimensions • 4 measures • 2 date fields</p>
                    <p className="text-sm text-muted-foreground max-w-2xl">
                      This Vendor Payments dataset tracks individual payment transactions to vendors, providing details like payment dates, amounts, department allocations, and contract references.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Hypotheses Section - PROMINENT at top */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-semibold text-[#1f2937]">Suggested Hypotheses</h2>
                <Badge variant="secondary" className="ml-2">{suggestedHypotheses.length} suggestions</Badge>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Select the hypotheses you want to investigate. Tracked hypotheses will appear in the panel on the right for ongoing progress tracking.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedHypotheses.map((card) => {
                const isTracked = isHypothesisTracked(card.id)
                return (
                  <Card 
                    key={card.id} 
                    className={`bg-white border-[#e5e7eb] transition-all ${
                      isTracked 
                        ? "border-amber-400 ring-1 ring-amber-400 bg-amber-50/30" 
                        : "hover:border-amber-300 hover:shadow-md"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                        </div>
                        {isTracked ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-amber-600 hover:text-red-500"
                            onClick={() => onRemoveHypothesis(card.id)}
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Tracked
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-muted-foreground hover:text-amber-600"
                            onClick={() => onAddHypothesis(card.id, card.title)}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Track
                          </Button>
                        )}
                      </div>
                      <CardTitle className="text-base text-[#1f2937]">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <CardDescription className="text-sm mb-4">{card.description}</CardDescription>
                      <div className="space-y-2">
                        {card.questions.map((q, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <Sparkles className="w-3 h-3 mt-0.5 text-amber-500 shrink-0" />
                            <span>{q}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Suggested Visualizations */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-[#1f2937]">Suggested Visualizations</h2>
                <Badge variant="secondary" className="ml-2">{suggestedVisualizations.length} suggestions</Badge>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="text-muted-foreground gap-2">
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <button
                  onClick={selectAll}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#1f2937]"
                >
                  <Checkbox checked={selectedViz.length === suggestedVisualizations.length} />
                  Select All
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Based on your data structure, here are visualizations that could reveal interesting patterns and insights.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suggestedVisualizations.map((viz) => (
                <Card
                  key={viz.id}
                  className={`bg-white border-[#e5e7eb] cursor-pointer transition-all ${
                    selectedViz.includes(viz.id) ? "border-blue-400 ring-1 ring-blue-400" : "hover:border-blue-300"
                  }`}
                  onClick={() => toggleViz(viz.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-sm text-[#1f2937]">{viz.title}</span>
                      </div>
                      <Checkbox checked={selectedViz.includes(viz.id)} />
                    </div>

                    {/* Mini Chart Preview */}
                    <div className="h-24 bg-[#f8f9fa] rounded-lg mb-3 flex items-end justify-center gap-1 p-3">
                      {viz.chartType === "line" ? (
                        <svg className="w-full h-full" viewBox="0 0 100 50">
                          <path
                            d="M 0 40 L 20 35 L 40 25 L 60 30 L 80 15 L 100 20"
                            fill="none"
                            stroke="#0369a1"
                            strokeWidth="2"
                          />
                          {[0, 20, 40, 60, 80, 100].map((x, i) => {
                            const ys = [40, 35, 25, 30, 15, 20]
                            return <circle key={i} cx={x} cy={ys[i]} r="2" fill="#0369a1" />
                          })}
                        </svg>
                      ) : (
                        <>
                          <div className="w-4 bg-blue-400 rounded-t" style={{ height: "60%" }} />
                          <div className="w-4 bg-blue-400 rounded-t" style={{ height: "80%" }} />
                          <div className="w-4 bg-blue-400 rounded-t" style={{ height: "45%" }} />
                          <div className="w-4 bg-blue-400 rounded-t" style={{ height: "70%" }} />
                          <div className="w-4 bg-blue-400 rounded-t" style={{ height: "55%" }} />
                        </>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground mb-3">{viz.question}</p>

                    <div className="flex items-center gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">X-Axis: </span>
                        <Badge variant="secondary" className="text-xs">{viz.xAxis}</Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Y-Axis: </span>
                        <Badge variant="secondary" className="text-xs">{viz.yAxis}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedViz.length > 0 && (
              <div className="mt-6 flex justify-center">
                <Button className="bg-[#0369a1] hover:bg-[#0c4a6e] gap-2">
                  <LayoutGrid className="w-4 h-4" />
                  Create Dashboard with {selectedViz.length} Visualization{selectedViz.length > 1 ? "s" : ""}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Data Profile */}
      <aside className="w-80 bg-white border-l border-[#e5e7eb] p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#1f2937]">Data Details</h3>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
        <Separator className="mb-4" />

        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-[#1f2937]">Data Profile</h4>
          <Badge variant="secondary" className="text-xs">10 fields</Badge>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="text-center p-2 bg-[#f8f9fa] rounded-lg">
            <p className="text-lg font-semibold text-[#1f2937]">45.9K</p>
            <p className="text-xs text-muted-foreground">Rows</p>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <p className="text-lg font-semibold text-blue-600">6</p>
            <p className="text-xs text-muted-foreground">Dim</p>
          </div>
          <div className="text-center p-2 bg-emerald-50 rounded-lg">
            <p className="text-lg font-semibold text-emerald-600">2</p>
            <p className="text-xs text-muted-foreground">Meas</p>
          </div>
          <div className="text-center p-2 bg-amber-50 rounded-lg">
            <p className="text-lg font-semibold text-amber-600">2</p>
            <p className="text-xs text-muted-foreground">Date</p>
          </div>
        </div>

        {/* Field List */}
        <ScrollArea className="h-[calc(100vh-320px)]">
          <div className="space-y-1">
            {dataFields.map((field) => (
              <div key={field.name} className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-[#f8f9fa] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-[#f8f9fa] rounded text-xs flex items-center justify-center font-mono text-muted-foreground">
                    {field.type}
                  </span>
                  <span className="text-sm text-[#1f2937]">{field.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{field.unique}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
    </div>
  )
}

function PrepView() {
  return (
    <div className="flex items-center justify-center h-full bg-[#f8f9fa]">
      <Card className="bg-white border-[#e5e7eb] max-w-md">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-[#f8f9fa] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-[#1f2937] mb-2">Data Preparation</h2>
          <Badge variant="secondary" className="mb-4">Core Architecture Mirror - No Update</Badge>
          <p className="text-muted-foreground text-sm">
            Transform, clean, and prepare your data for analysis with AI-assisted data wrangling tools.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function AnalyzeView() {
  return (
    <div className="flex items-center justify-center h-full bg-[#f8f9fa]">
      <Card className="bg-white border-[#e5e7eb] max-w-md">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-[#f8f9fa] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-[#1f2937] mb-2">Analysis Workspace</h2>
          <Badge variant="secondary" className="mb-4">Core Architecture Mirror - No Update</Badge>
          <p className="text-muted-foreground text-sm">
            Build advanced models, run statistical analyses, and uncover deeper insights from your data.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function CommunicateView({
  expandedSections,
  toggleSection,
}: {
  expandedSections: { storySuggestions: boolean; styleInspiration: boolean; reviewImprove: boolean }
  toggleSection: (section: "storySuggestions" | "styleInspiration" | "reviewImprove") => void
}) {
  const [chatMessage, setChatMessage] = useState("")

  const storySuggestions = [
    "Which vendors received the highest total payments across all years?",
    "How has quarterly spending distribution changed from 2021 to 2023?",
    "What are the top 5 departments by total vendor expenditure?",
    "Identify vendors with the most volatile payment patterns",
  ]

  return (
    <div className="flex h-full">
      {/* Left Panel - AI Agent Container */}
      <aside className="w-[380px] bg-white border-r border-[#e5e7eb] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-[#1f2937]">Data Storyteller</h2>
              <p className="text-xs text-muted-foreground">AI-powered presentation assistant</p>
            </div>
          </div>
        </div>

        {/* Scrollable Sections */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {/* Story Suggestions */}
            <Collapsible open={expandedSections.storySuggestions} onOpenChange={() => toggleSection("storySuggestions")}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-[#f8f9fa] transition-colors">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="font-medium text-[#1f2937]">Story Suggestions</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    expandedSections.storySuggestions ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3 pb-3">
                <div className="space-y-2 mt-2">
                  {storySuggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      className="w-full text-left p-3 rounded-lg border border-[#e5e7eb] hover:border-amber-300 hover:bg-amber-50/50 transition-all text-sm text-[#1f2937]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Style Inspiration */}
            <Collapsible open={expandedSections.styleInspiration} onOpenChange={() => toggleSection("styleInspiration")}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-[#f8f9fa] transition-colors">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-[#1f2937]">Style Inspiration</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    expandedSections.styleInspiration ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3 pb-3">
                <div className="mt-2 p-3 bg-[#f8f9fa] rounded-lg text-sm text-muted-foreground">
                  Choose from presentation templates optimized for executive summaries, detailed analysis, or stakeholder updates.
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Review & Improve */}
            <Collapsible open={expandedSections.reviewImprove} onOpenChange={() => toggleSection("reviewImprove")}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-[#f8f9fa] transition-colors">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium text-[#1f2937]">Review & Improve</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    expandedSections.reviewImprove ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3 pb-3">
                <div className="mt-2 p-3 bg-[#f8f9fa] rounded-lg text-sm text-muted-foreground">
                  Get AI-powered suggestions to improve clarity, add annotations, and highlight key insights.
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ScrollArea>

        {/* Chat Box */}
        <div className="p-4 border-t border-[#e5e7eb]">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-[#1f2937]">Chat with Storyteller</span>
          </div>
          <div className="p-4 bg-[#f8f9fa] rounded-lg mb-3">
            <p className="text-sm text-muted-foreground">
              Tell me how you&apos;d like to present your data story.
            </p>
            <p className="text-xs text-muted-foreground mt-2 italic">
              Try: &quot;Make it more dramatic&quot; or &quot;Add annotations for key insights&quot;
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="How should I tell your data story?"
              className="flex-1 text-sm"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <Button size="icon" className="bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Right Panel - Presentation Canvas */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Canvas Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              Cross-filter OFF
            </Badge>
            <Button variant="outline" size="sm" className="gap-2">
              <span className="text-lg">+</span>
              Add
            </Button>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>55%</span>
            <span>•</span>
            <span>16:9 HD (1920 × 1080)</span>
            <span>•</span>
            <Badge variant="secondary" className="text-xs gap-1">
              <FileSpreadsheet className="w-3 h-3" />
              Vendor Payment Workbook
            </Badge>
          </div>
        </div>

        {/* Dashboard Canvas */}
        <Card className="bg-white border-[#e5e7eb] shadow-sm">
          <CardContent className="p-8">
            {/* Dashboard Title */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-[#1f2937] mb-2">
                Vendor Payments 2021-2023 Analysis Dashboard
              </h1>
              <p className="text-muted-foreground">
                Overview of key spending trends and vendor payment patterns across fiscal years
              </p>
            </div>

            {/* Chart Section */}
            <div className="border border-[#e5e7eb] rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-[#1f2937]">Monthly Spending Trend</h3>
                  <p className="text-sm text-muted-foreground">How do vendor payments trend over time?</p>
                </div>
              </div>

              {/* Mock Line Chart */}
              <div className="h-64 relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-muted-foreground">
                  <span>$100K</span>
                  <span>$75K</span>
                  <span>$50K</span>
                  <span>$25K</span>
                  <span>$0</span>
                </div>

                {/* Chart area */}
                <div className="ml-14 h-full">
                  <svg className="w-full h-[calc(100%-32px)]" viewBox="0 0 800 200" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <g stroke="#e5e7eb" strokeWidth="1">
                      <line x1="0" y1="50" x2="800" y2="50" strokeDasharray="4" />
                      <line x1="0" y1="100" x2="800" y2="100" strokeDasharray="4" />
                      <line x1="0" y1="150" x2="800" y2="150" strokeDasharray="4" />
                    </g>

                    {/* Line path */}
                    <path
                      d="M 0 110 L 66 95 L 133 105 L 200 55 L 266 115 L 333 75 L 400 85 L 466 35 L 533 90 L 600 65 L 666 70 L 733 25 L 800 45"
                      fill="none"
                      stroke="#0369a1"
                      strokeWidth="2"
                    />

                    {/* Data points */}
                    {chartData.map((_, i) => {
                      const x = (i / (chartData.length - 1)) * 800
                      const values = [110, 95, 105, 55, 115, 75, 85, 35, 90, 65, 70, 25, 45]
                      const y = values[i] || 100
                      return <circle key={i} cx={x} cy={y} r="4" fill="#0369a1" />
                    })}
                  </svg>

                  {/* X-axis labels */}
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    {chartData.map((d, i) => (
                      <span key={i} className={i % 2 === 0 ? "" : "hidden md:inline"}>
                        {d.month}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex items-center gap-2 border-t border-[#e5e7eb] pt-4">
              <Button variant="ghost" size="sm" className="bg-[#f8f9fa] text-[#1f2937]">
                Dashboard 1
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Vendor Breakdown
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground gap-1">
                <span className="text-lg">+</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ShareModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Share Dashboard</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#f8f9fa] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-[#1f2937] mb-2">Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Sharing and collaboration features are planned for future implementation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
