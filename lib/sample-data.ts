// Comprehensive sample data for the Finance Project Management application

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "user" | "manager"
}

export interface Transaction {
  id: string
  type: "income" | "expense"
  amount: number
  category: string
  description: string
  date: string
  userId: string
  tags?: string[]
}

export interface Budget {
  id: string
  category: string
  limit: number
  spent: number
  period: "monthly" | "weekly" | "yearly"
  userId: string
  startDate: string
  endDate: string
}

export interface FinancialGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: string
  userId: string
  priority: "low" | "medium" | "high"
  status: "active" | "completed" | "paused"
}

export interface Project {
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
  userId: string
  category: string
}

export interface Milestone {
  id: string
  projectId: string
  name: string
  description: string
  dueDate: string
  status: "pending" | "completed" | "overdue"
  budget: number
}

export interface Task {
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
  tags?: string[]
}

// Sample Users
export const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "manager",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "user",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "user",
  },
  {
    id: "5",
    name: "Tom Brown",
    email: "tom.brown@example.com",
    role: "user",
  },
]

// Sample Transactions (6 months of data)
export const sampleTransactions: Transaction[] = [
  // January 2024
  {
    id: "1",
    type: "income",
    amount: 5000,
    category: "Salary",
    description: "Monthly salary",
    date: "2024-01-01",
    userId: "1",
  },
  {
    id: "2",
    type: "income",
    amount: 1200,
    category: "Freelance",
    description: "Web development project",
    date: "2024-01-05",
    userId: "1",
  },
  {
    id: "3",
    type: "expense",
    amount: 1200,
    category: "Housing",
    description: "Rent payment",
    date: "2024-01-01",
    userId: "1",
  },
  {
    id: "4",
    type: "expense",
    amount: 400,
    category: "Food",
    description: "Groceries and dining",
    date: "2024-01-03",
    userId: "1",
  },
  {
    id: "5",
    type: "expense",
    amount: 200,
    category: "Transportation",
    description: "Gas and parking",
    date: "2024-01-04",
    userId: "1",
  },
  {
    id: "6",
    type: "expense",
    amount: 150,
    category: "Utilities",
    description: "Electricity and water",
    date: "2024-01-05",
    userId: "1",
  },
  {
    id: "7",
    type: "expense",
    amount: 300,
    category: "Entertainment",
    description: "Movies and dining out",
    date: "2024-01-10",
    userId: "1",
  },
  {
    id: "8",
    type: "expense",
    amount: 250,
    category: "Shopping",
    description: "Clothing and accessories",
    date: "2024-01-15",
    userId: "1",
  },
  {
    id: "9",
    type: "expense",
    amount: 100,
    category: "Healthcare",
    description: "Doctor visit",
    date: "2024-01-20",
    userId: "1",
  },

  // February 2024
  {
    id: "10",
    type: "income",
    amount: 5000,
    category: "Salary",
    description: "Monthly salary",
    date: "2024-02-01",
    userId: "1",
  },
  {
    id: "11",
    type: "income",
    amount: 800,
    category: "Investment",
    description: "Dividend income",
    date: "2024-02-15",
    userId: "1",
  },
  {
    id: "12",
    type: "expense",
    amount: 1200,
    category: "Housing",
    description: "Rent payment",
    date: "2024-02-01",
    userId: "1",
  },
  {
    id: "13",
    type: "expense",
    amount: 450,
    category: "Food",
    description: "Groceries and dining",
    date: "2024-02-03",
    userId: "1",
  },
  {
    id: "14",
    type: "expense",
    amount: 180,
    category: "Transportation",
    description: "Gas and maintenance",
    date: "2024-02-05",
    userId: "1",
  },
  {
    id: "15",
    type: "expense",
    amount: 160,
    category: "Utilities",
    description: "Electricity, water, internet",
    date: "2024-02-05",
    userId: "1",
  },
  {
    id: "16",
    type: "expense",
    amount: 200,
    category: "Entertainment",
    description: "Concert tickets",
    date: "2024-02-14",
    userId: "1",
  },
  {
    id: "17",
    type: "expense",
    amount: 320,
    category: "Shopping",
    description: "Electronics",
    date: "2024-02-20",
    userId: "1",
  },

  // March 2024
  {
    id: "18",
    type: "income",
    amount: 5000,
    category: "Salary",
    description: "Monthly salary",
    date: "2024-03-01",
    userId: "1",
  },
  {
    id: "19",
    type: "income",
    amount: 600,
    category: "Freelance",
    description: "Consulting work",
    date: "2024-03-10",
    userId: "1",
  },
  {
    id: "20",
    type: "expense",
    amount: 1200,
    category: "Housing",
    description: "Rent payment",
    date: "2024-03-01",
    userId: "1",
  },
  {
    id: "21",
    type: "expense",
    amount: 380,
    category: "Food",
    description: "Groceries and dining",
    date: "2024-03-03",
    userId: "1",
  },
  {
    id: "22",
    type: "expense",
    amount: 220,
    category: "Transportation",
    description: "Gas and parking",
    date: "2024-03-05",
    userId: "1",
  },
  {
    id: "23",
    type: "expense",
    amount: 140,
    category: "Utilities",
    description: "Monthly utilities",
    date: "2024-03-05",
    userId: "1",
  },
  {
    id: "24",
    type: "expense",
    amount: 180,
    category: "Entertainment",
    description: "Streaming services",
    date: "2024-03-10",
    userId: "1",
  },
  {
    id: "25",
    type: "expense",
    amount: 400,
    category: "Shopping",
    description: "Home improvement",
    date: "2024-03-15",
    userId: "1",
  },
  {
    id: "26",
    type: "expense",
    amount: 200,
    category: "Healthcare",
    description: "Dental checkup",
    date: "2024-03-20",
    userId: "1",
  },

  // April 2024
  {
    id: "27",
    type: "income",
    amount: 5200,
    category: "Salary",
    description: "Monthly salary with bonus",
    date: "2024-04-01",
    userId: "1",
  },
  {
    id: "28",
    type: "income",
    amount: 1500,
    category: "Freelance",
    description: "Large project completion",
    date: "2024-04-15",
    userId: "1",
  },
  {
    id: "29",
    type: "expense",
    amount: 1200,
    category: "Housing",
    description: "Rent payment",
    date: "2024-04-01",
    userId: "1",
  },
  {
    id: "30",
    type: "expense",
    amount: 420,
    category: "Food",
    description: "Groceries and dining",
    date: "2024-04-03",
    userId: "1",
  },
  {
    id: "31",
    type: "expense",
    amount: 190,
    category: "Transportation",
    description: "Gas and maintenance",
    date: "2024-04-05",
    userId: "1",
  },
  {
    id: "32",
    type: "expense",
    amount: 155,
    category: "Utilities",
    description: "Monthly utilities",
    date: "2024-04-05",
    userId: "1",
  },
  {
    id: "33",
    type: "expense",
    amount: 250,
    category: "Entertainment",
    description: "Weekend getaway",
    date: "2024-04-12",
    userId: "1",
  },
  {
    id: "34",
    type: "expense",
    amount: 300,
    category: "Shopping",
    description: "Spring wardrobe",
    date: "2024-04-18",
    userId: "1",
  },

  // May 2024
  {
    id: "35",
    type: "income",
    amount: 5000,
    category: "Salary",
    description: "Monthly salary",
    date: "2024-05-01",
    userId: "1",
  },
  {
    id: "36",
    type: "income",
    amount: 900,
    category: "Investment",
    description: "Stock dividends",
    date: "2024-05-15",
    userId: "1",
  },
  {
    id: "37",
    type: "expense",
    amount: 1200,
    category: "Housing",
    description: "Rent payment",
    date: "2024-05-01",
    userId: "1",
  },
  {
    id: "38",
    type: "expense",
    amount: 350,
    category: "Food",
    description: "Groceries and dining",
    date: "2024-05-03",
    userId: "1",
  },
  {
    id: "39",
    type: "expense",
    amount: 170,
    category: "Transportation",
    description: "Gas and parking",
    date: "2024-05-05",
    userId: "1",
  },
  {
    id: "40",
    type: "expense",
    amount: 145,
    category: "Utilities",
    description: "Monthly utilities",
    date: "2024-05-05",
    userId: "1",
  },
  {
    id: "41",
    type: "expense",
    amount: 280,
    category: "Entertainment",
    description: "Theater and dining",
    date: "2024-05-10",
    userId: "1",
  },
  {
    id: "42",
    type: "expense",
    amount: 220,
    category: "Shopping",
    description: "Gifts and personal items",
    date: "2024-05-15",
    userId: "1",
  },
  {
    id: "43",
    type: "expense",
    amount: 150,
    category: "Healthcare",
    description: "Prescription medications",
    date: "2024-05-20",
    userId: "1",
  },

  // June 2024
  {
    id: "44",
    type: "income",
    amount: 5000,
    category: "Salary",
    description: "Monthly salary",
    date: "2024-06-01",
    userId: "1",
  },
  {
    id: "45",
    type: "income",
    amount: 700,
    category: "Freelance",
    description: "Website maintenance",
    date: "2024-06-10",
    userId: "1",
  },
  {
    id: "46",
    type: "expense",
    amount: 1200,
    category: "Housing",
    description: "Rent payment",
    date: "2024-06-01",
    userId: "1",
  },
  {
    id: "47",
    type: "expense",
    amount: 390,
    category: "Food",
    description: "Groceries and dining",
    date: "2024-06-03",
    userId: "1",
  },
  {
    id: "48",
    type: "expense",
    amount: 210,
    category: "Transportation",
    description: "Gas and car service",
    date: "2024-06-05",
    userId: "1",
  },
  {
    id: "49",
    type: "expense",
    amount: 165,
    category: "Utilities",
    description: "Summer utilities increase",
    date: "2024-06-05",
    userId: "1",
  },
  {
    id: "50",
    type: "expense",
    amount: 320,
    category: "Entertainment",
    description: "Summer activities",
    date: "2024-06-15",
    userId: "1",
  },
  {
    id: "51",
    type: "expense",
    amount: 280,
    category: "Shopping",
    description: "Summer clothing",
    date: "2024-06-20",
    userId: "1",
  },
]

// Sample Budgets
export const sampleBudgets: Budget[] = [
  {
    id: "1",
    category: "Housing",
    limit: 1200,
    spent: 1200,
    period: "monthly",
    userId: "1",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: "2",
    category: "Food",
    limit: 500,
    spent: 390,
    period: "monthly",
    userId: "1",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: "3",
    category: "Transportation",
    limit: 300,
    spent: 210,
    period: "monthly",
    userId: "1",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: "4",
    category: "Entertainment",
    limit: 400,
    spent: 320,
    period: "monthly",
    userId: "1",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: "5",
    category: "Shopping",
    limit: 350,
    spent: 280,
    period: "monthly",
    userId: "1",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: "6",
    category: "Healthcare",
    limit: 200,
    spent: 150,
    period: "monthly",
    userId: "1",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: "7",
    category: "Utilities",
    limit: 200,
    spent: 165,
    period: "monthly",
    userId: "1",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
]

// Sample Financial Goals
export const sampleFinancialGoals: FinancialGoal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    targetAmount: 15000,
    currentAmount: 8500,
    deadline: "2024-12-31",
    category: "Savings",
    userId: "1",
    priority: "high",
    status: "active",
  },
  {
    id: "2",
    name: "European Vacation",
    targetAmount: 5000,
    currentAmount: 2100,
    deadline: "2024-08-15",
    category: "Travel",
    userId: "1",
    priority: "medium",
    status: "active",
  },
  {
    id: "3",
    name: "New MacBook Pro",
    targetAmount: 3000,
    currentAmount: 1200,
    deadline: "2024-09-30",
    category: "Technology",
    userId: "1",
    priority: "medium",
    status: "active",
  },
  {
    id: "4",
    name: "Investment Portfolio",
    targetAmount: 10000,
    currentAmount: 4500,
    deadline: "2025-06-30",
    category: "Investment",
    userId: "1",
    priority: "high",
    status: "active",
  },
  {
    id: "5",
    name: "Home Down Payment",
    targetAmount: 50000,
    currentAmount: 12000,
    deadline: "2026-12-31",
    category: "Real Estate",
    userId: "1",
    priority: "high",
    status: "active",
  },
  {
    id: "6",
    name: "Professional Development",
    targetAmount: 2000,
    currentAmount: 2000,
    deadline: "2024-03-31",
    category: "Education",
    userId: "1",
    priority: "medium",
    status: "completed",
  },
]

// Sample Projects
export const sampleProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Website Redesign",
    description:
      "Complete overhaul of the company e-commerce platform with modern design, improved UX, and mobile optimization",
    budget: 25000,
    spent: 15500,
    status: "active",
    priority: "high",
    startDate: "2024-01-15",
    endDate: "2024-05-30",
    progress: 75,
    teamMembers: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"],
    milestones: [],
    userId: "1",
    category: "Web Development",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native iOS and Android app for customer engagement and loyalty program",
    budget: 40000,
    spent: 18000,
    status: "active",
    priority: "high",
    startDate: "2024-02-01",
    endDate: "2024-08-31",
    progress: 45,
    teamMembers: ["Sarah Wilson", "Tom Brown", "Lisa Davis", "Alex Chen"],
    milestones: [],
    userId: "1",
    category: "Mobile Development",
  },
  {
    id: "3",
    name: "Digital Marketing Campaign Q2",
    description:
      "Comprehensive digital marketing strategy for Q2 product launch including social media, PPC, and content marketing",
    budget: 15000,
    spent: 15000,
    status: "completed",
    priority: "medium",
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    progress: 100,
    teamMembers: ["Emma Taylor", "David Lee", "Rachel Green"],
    milestones: [],
    userId: "1",
    category: "Marketing",
  },
  {
    id: "4",
    name: "Office Infrastructure Upgrade",
    description: "Modernize office IT infrastructure including network upgrade, new workstations, and security systems",
    budget: 30000,
    spent: 12000,
    status: "active",
    priority: "medium",
    startDate: "2024-03-01",
    endDate: "2024-07-31",
    progress: 40,
    teamMembers: ["Chris Martinez", "Kevin Wong", "Amanda Foster"],
    milestones: [],
    userId: "1",
    category: "Infrastructure",
  },
  {
    id: "5",
    name: "Customer Support Portal",
    description: "Development of self-service customer support portal with knowledge base and ticket system",
    budget: 18000,
    spent: 5400,
    status: "planning",
    priority: "medium",
    startDate: "2024-07-01",
    endDate: "2024-11-30",
    progress: 15,
    teamMembers: ["Jennifer Liu", "Mark Thompson", "Nicole Adams"],
    milestones: [],
    userId: "1",
    category: "Customer Service",
  },
  {
    id: "6",
    name: "Data Analytics Platform",
    description: "Implementation of comprehensive data analytics platform for business intelligence and reporting",
    budget: 35000,
    spent: 0,
    status: "planning",
    priority: "low",
    startDate: "2024-09-01",
    endDate: "2025-02-28",
    progress: 5,
    teamMembers: ["Robert Kim", "Michelle Zhang", "Daniel Rodriguez"],
    milestones: [],
    userId: "1",
    category: "Data & Analytics",
  },
]

// Sample Milestones
export const sampleMilestones: Milestone[] = [
  // E-commerce Website Redesign Milestones
  {
    id: "m1",
    projectId: "1",
    name: "Design Phase Completion",
    description: "Complete UI/UX design, wireframes, and user journey mapping",
    dueDate: "2024-02-15",
    status: "completed",
    budget: 8000,
  },
  {
    id: "m2",
    projectId: "1",
    name: "Frontend Development",
    description: "Implement responsive frontend with React and modern CSS",
    dueDate: "2024-03-31",
    status: "completed",
    budget: 10000,
  },
  {
    id: "m3",
    projectId: "1",
    name: "Backend Integration",
    description: "API development and database integration",
    dueDate: "2024-04-30",
    status: "pending",
    budget: 5000,
  },
  {
    id: "m4",
    projectId: "1",
    name: "Testing & Launch",
    description: "QA testing, performance optimization, and production deployment",
    dueDate: "2024-05-30",
    status: "pending",
    budget: 2000,
  },

  // Mobile App Development Milestones
  {
    id: "m5",
    projectId: "2",
    name: "MVP Development",
    description: "Core features development for iOS and Android",
    dueDate: "2024-04-30",
    status: "pending",
    budget: 20000,
  },
  {
    id: "m6",
    projectId: "2",
    name: "Beta Testing Phase",
    description: "Internal and external beta testing with user feedback",
    dueDate: "2024-06-30",
    status: "pending",
    budget: 8000,
  },
  {
    id: "m7",
    projectId: "2",
    name: "App Store Submission",
    description: "Final optimization and submission to app stores",
    dueDate: "2024-08-31",
    status: "pending",
    budget: 12000,
  },

  // Digital Marketing Campaign Milestones
  {
    id: "m8",
    projectId: "3",
    name: "Strategy Development",
    description: "Comprehensive marketing strategy and campaign planning",
    dueDate: "2024-04-15",
    status: "completed",
    budget: 3000,
  },
  {
    id: "m9",
    projectId: "3",
    name: "Content Creation",
    description: "Create all marketing materials, videos, and copy",
    dueDate: "2024-05-15",
    status: "completed",
    budget: 7000,
  },
  {
    id: "m10",
    projectId: "3",
    name: "Campaign Launch",
    description: "Execute campaign across all channels and monitor performance",
    dueDate: "2024-06-30",
    status: "completed",
    budget: 5000,
  },

  // Office Infrastructure Upgrade Milestones
  {
    id: "m11",
    projectId: "4",
    name: "Network Infrastructure",
    description: "Upgrade network equipment and improve connectivity",
    dueDate: "2024-04-30",
    status: "pending",
    budget: 12000,
  },
  {
    id: "m12",
    projectId: "4",
    name: "Workstation Setup",
    description: "Deploy new workstations and software licenses",
    dueDate: "2024-06-30",
    status: "pending",
    budget: 15000,
  },
  {
    id: "m13",
    projectId: "4",
    name: "Security Implementation",
    description: "Install security systems and access controls",
    dueDate: "2024-07-31",
    status: "pending",
    budget: 3000,
  },
]

// Sample Tasks
export const sampleTasks: Task[] = [
  // E-commerce Website Tasks
  {
    id: "t1",
    projectId: "1",
    name: "Create user personas and journey maps",
    description: "Research and develop detailed user personas with complete journey mapping",
    assignee: "Jane Smith",
    status: "completed",
    priority: "high",
    dueDate: "2024-02-01",
    estimatedHours: 20,
    actualHours: 22,
    tags: ["research", "ux"],
  },
  {
    id: "t2",
    projectId: "1",
    name: "Design homepage mockups",
    description: "Create high-fidelity mockups for the new homepage design",
    assignee: "Jane Smith",
    status: "completed",
    priority: "high",
    dueDate: "2024-02-10",
    estimatedHours: 16,
    actualHours: 18,
    tags: ["design", "ui"],
  },
  {
    id: "t3",
    projectId: "1",
    name: "Implement responsive navigation",
    description: "Build responsive navigation component with mobile optimization",
    assignee: "John Doe",
    status: "completed",
    priority: "high",
    dueDate: "2024-03-15",
    estimatedHours: 12,
    actualHours: 14,
    tags: ["frontend", "responsive"],
  },
  {
    id: "t4",
    projectId: "1",
    name: "Product catalog integration",
    description: "Integrate product catalog with search and filtering capabilities",
    assignee: "Mike Johnson",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-04-15",
    estimatedHours: 32,
    actualHours: 20,
    tags: ["backend", "api"],
  },
  {
    id: "t5",
    projectId: "1",
    name: "Payment gateway setup",
    description: "Configure and test payment processing system",
    assignee: "Sarah Wilson",
    status: "todo",
    priority: "high",
    dueDate: "2024-04-30",
    estimatedHours: 24,
    actualHours: 0,
    tags: ["payment", "security"],
  },

  // Mobile App Tasks
  {
    id: "t6",
    projectId: "2",
    name: "User authentication flow",
    description: "Implement secure user registration and login system",
    assignee: "Sarah Wilson",
    status: "completed",
    priority: "high",
    dueDate: "2024-03-15",
    estimatedHours: 28,
    actualHours: 30,
    tags: ["auth", "security"],
  },
  {
    id: "t7",
    projectId: "2",
    name: "Push notification system",
    description: "Set up push notifications for iOS and Android",
    assignee: "Tom Brown",
    status: "in-progress",
    priority: "medium",
    dueDate: "2024-04-30",
    estimatedHours: 20,
    actualHours: 12,
    tags: ["notifications", "mobile"],
  },
  {
    id: "t8",
    projectId: "2",
    name: "Loyalty program integration",
    description: "Build loyalty points system and rewards tracking",
    assignee: "Lisa Davis",
    status: "todo",
    priority: "medium",
    dueDate: "2024-05-15",
    estimatedHours: 36,
    actualHours: 0,
    tags: ["loyalty", "gamification"],
  },
  {
    id: "t9",
    projectId: "2",
    name: "Offline mode functionality",
    description: "Implement offline data sync and caching",
    assignee: "Alex Chen",
    status: "todo",
    priority: "low",
    dueDate: "2024-06-30",
    estimatedHours: 40,
    actualHours: 0,
    tags: ["offline", "sync"],
  },

  // Marketing Campaign Tasks
  {
    id: "t10",
    projectId: "3",
    name: "Social media content calendar",
    description: "Create comprehensive content calendar for all social platforms",
    assignee: "Emma Taylor",
    status: "completed",
    priority: "high",
    dueDate: "2024-04-20",
    estimatedHours: 16,
    actualHours: 18,
    tags: ["social-media", "content"],
  },
  {
    id: "t11",
    projectId: "3",
    name: "Video production",
    description: "Produce promotional videos for campaign launch",
    assignee: "David Lee",
    status: "completed",
    priority: "high",
    dueDate: "2024-05-10",
    estimatedHours: 32,
    actualHours: 35,
    tags: ["video", "production"],
  },
  {
    id: "t12",
    projectId: "3",
    name: "PPC campaign setup",
    description: "Configure Google Ads and Facebook advertising campaigns",
    assignee: "Rachel Green",
    status: "completed",
    priority: "medium",
    dueDate: "2024-05-20",
    estimatedHours: 12,
    actualHours: 10,
    tags: ["ppc", "advertising"],
  },

  // Infrastructure Tasks
  {
    id: "t13",
    projectId: "4",
    name: "Network assessment",
    description: "Conduct comprehensive network infrastructure assessment",
    assignee: "Chris Martinez",
    status: "completed",
    priority: "high",
    dueDate: "2024-03-15",
    estimatedHours: 24,
    actualHours: 26,
    tags: ["network", "assessment"],
  },
  {
    id: "t14",
    projectId: "4",
    name: "Server room upgrade",
    description: "Upgrade server room cooling and power systems",
    assignee: "Kevin Wong",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-05-30",
    estimatedHours: 40,
    actualHours: 25,
    tags: ["infrastructure", "servers"],
  },
  {
    id: "t15",
    projectId: "4",
    name: "Security audit",
    description: "Perform comprehensive security audit and vulnerability assessment",
    assignee: "Amanda Foster",
    status: "todo",
    priority: "high",
    dueDate: "2024-06-15",
    estimatedHours: 32,
    actualHours: 0,
    tags: ["security", "audit"],
  },
]

// Utility functions for data management
export const getTransactionsByDateRange = (startDate: string, endDate: string): Transaction[] => {
  return sampleTransactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date)
    return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate)
  })
}

export const getTransactionsByCategory = (category: string): Transaction[] => {
  return sampleTransactions.filter((transaction) => transaction.category === category)
}

export const getProjectsByStatus = (status: Project["status"]): Project[] => {
  return sampleProjects.filter((project) => project.status === status)
}

export const getTasksByProject = (projectId: string): Task[] => {
  return sampleTasks.filter((task) => task.projectId === projectId)
}

export const getMilestonesByProject = (projectId: string): Milestone[] => {
  return sampleMilestones.filter((milestone) => milestone.projectId === projectId)
}

export const calculateMonthlyIncome = (month: number, year: number): number => {
  const monthTransactions = sampleTransactions.filter((transaction) => {
    const date = new Date(transaction.date)
    return date.getMonth() === month - 1 && date.getFullYear() === year && transaction.type === "income"
  })
  return monthTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
}

export const calculateMonthlyExpenses = (month: number, year: number): number => {
  const monthTransactions = sampleTransactions.filter((transaction) => {
    const date = new Date(transaction.date)
    return date.getMonth() === month - 1 && date.getFullYear() === year && transaction.type === "expense"
  })
  return monthTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
}

export const getExpensesByCategory = (): { [key: string]: number } => {
  const expenses = sampleTransactions.filter((t) => t.type === "expense")
  const categoryTotals: { [key: string]: number } = {}

  expenses.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount
    } else {
      categoryTotals[expense.category] = expense.amount
    }
  })

  return categoryTotals
}

export const getProjectBudgetUtilization = (): {
  [key: string]: { budget: number; spent: number; remaining: number }
} => {
  const projectBudgets: { [key: string]: { budget: number; spent: number; remaining: number } } = {}

  sampleProjects.forEach((project) => {
    projectBudgets[project.name] = {
      budget: project.budget,
      spent: project.spent,
      remaining: project.budget - project.spent,
    }
  })

  return projectBudgets
}

// Export all sample data as a single object for easy import
export const sampleData = {
  users: sampleUsers,
  transactions: sampleTransactions,
  budgets: sampleBudgets,
  financialGoals: sampleFinancialGoals,
  projects: sampleProjects,
  milestones: sampleMilestones,
  tasks: sampleTasks,
}

export default sampleData
