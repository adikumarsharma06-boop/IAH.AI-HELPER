import { ModeDetail } from "./types";

export const ADVICE_MODES: ModeDetail[] = [
  {
    id: "general_advisor",
    name: "AI Ultimate Strategic Analyst",
    tagline: "High-Dimensional Vector Simulation & Scenario Mapping",
    icon: "Compass",
    description: "Evaluates multi-variable decisions, maps dimensional background parameters, and outputs supreme tactical strategic brief recommendations.",
    fields: [
      {
        key: "success_conditions",
        label: "Primary Success Conditions",
        type: "textarea",
        placeholder: "What elements must be fulfilled for you to deem this a success? (e.g., Timeline, Freedom, Revenue, Security)",
        helpText: "Detail what metrics or conditions matter most to you."
      },
      {
        key: "hidden_fears",
        label: "Fears & Known Constraints",
        type: "text",
        placeholder: "What real constraints or risks are you trying to manage?",
      }
    ],
    presetScenarios: [
      {
        title: "Career Pivot: Corporate to Boutique Agency",
        scenario: "I am a Senior Marketing Manager with 10 years of experience. I want to leave my stable corporate role to start a premium agency offering specialized branding services to AI startups, but I am terrified of losing cash reserves, client acquisition friction, and administrative overwhelm.",
        additionalContext: {
          success_conditions: "Earn at least $10,000/mo within 6 months while retaining weekend family time.",
          hidden_fears: "Running out of my 4-month emergency savings before acquiring my first two recurring retainers."
        }
      },
      {
        title: "Life Transition: Relocating for Quality of Life",
        scenario: "I have the option to keep my remote engineering job but relocate from a high-cost urban hub to a mid-sized coastal mountain town to raise my two kids. It will slash housing expenses but might distance me from local networking circles.",
        additionalContext: {
          success_conditions: "Closer proximity to nature, lower cost of living, while remaining visible for leadership promotions.",
          hidden_fears: "Career stagnation due to out-of-sight remote status and lack of professional tech infrastructure in the new town."
        }
      }
    ]
  },
  {
    id: "decision_engine",
    name: "AI Tradeoff Decision Engine",
    tagline: "Deterministic Binary Option Tree Analyzer",
    icon: "Scale",
    description: "Evaluates key dilemmas, structures opportunity costs, lists pros/cons, and calculates supreme logical recommendation indices.",
    fields: [
      {
        key: "options_compared",
        label: "Options Under Consideration",
        type: "textarea",
        placeholder: "Option A: Quit my job and use my savings on my startup full-time.\nOption B: Keep working my current job and develop my startup part-time in evenings.",
        helpText: "Clearly state Option A, Option B, and optional Option C."
      },
      {
        key: "key_constraint",
        label: "Core Non-Negotiable Constraint",
        type: "text",
        placeholder: "e.g., I cannot make less than $4,000/mo; or I must launch by October.",
      }
    ],
    presetScenarios: [
      {
        title: "Organic Growth vs. Paid Customer Acquisition",
        scenario: "Our early-stage productivity software has 500 active users. We are deciding whether to spend our limited seed capital ($15,000) on structured paid performance ads or double down on writing detailed search-engine-optimized blogs and educational guides for organic growth.",
        additionalContext: {
          options_compared: "Option A: Spend $5,000/mo on targeted search/social ads for rapid conversion feedback.\nOption B: Invest original $15,000 to hire professional tech writers to build an SEO-optimized educational base for compounding organic traffic.",
          key_constraint: "Must maintain a minimum cash runway of 8 months under all circumstances."
        }
      },
      {
        title: "SaaS: Enterprise B2B Custom Work vs. Self-Serve SMB Product",
        scenario: "We built a workflow management system. Two enterprise companies offered to pay us $35,000 each if we build highly customized features just for them. Meanwhile, individual users want a cheap, standard self-serve product.",
        additionalContext: {
          options_compared: "Option A: Take the enterprise contracts ($70,000 total) and pivot our code to their custom workflows.\nOption B: Reject the contracts, prioritize our generic roadmap, and focus on $29/mo self-serve scale.",
          key_constraint: "Our team size is only 2 developers. We have very limited human bandwidth."
        }
      }
    ]
  },
  {
    id: "money_intelligence",
    name: "AI Financial Path Intelligence Mode",
    tagline: "Hyper-Analytical Cashflow & Income Roadmap Generator",
    icon: "DollarSign",
    description: "Analyzes income parameters, cashflows, skill pools, and timelines to build deep tactical payoff structures and side-income projections.",
    fields: [
      {
        key: "current_income",
        label: "Current Monthly Income ($)",
        type: "number",
        placeholder: "5500",
        defaultValue: "5000"
      },
      {
        key: "monthly_expenses",
        label: "Current Monthly Expenses ($)",
        type: "number",
        placeholder: "3800",
        defaultValue: "3500"
      },
      {
        key: "available_hours",
        label: "Available Weekly Hours",
        type: "number",
        placeholder: "12",
        defaultValue: "10"
      },
      {
        key: "core_skills",
        label: "Your Core Skills",
        type: "text",
        placeholder: "e.g., UI/UX design, SQL database admin, writing, speaking.",
      }
    ],
    presetScenarios: [
      {
        title: "Hustle Strategy: Full-Time Developer side cashflow",
        scenario: "I want to establish a secondary stream of income of at least $1,500/mo. I am an experienced Node.js developer, but I don't know how to package my skills into an offer or where to locate non-crowded marketplaces.",
        additionalContext: {
          current_income: "7500",
          monthly_expenses: "4500",
          available_hours: "8",
          core_skills: "Express, TypeScript, React, Postgres, scraping server scripts."
        }
      },
      {
        title: "Fast Debt-Payoff & Financial Restructuring",
        scenario: "I have gathered some credit card debt ($8,000 at 22% APR) which is eating my monthly savings, and I need to structure a rapid, clinical payoff roadmap that doesn't put my baseline living costs at risk.",
        additionalContext: {
          current_income: "3400",
          monthly_expenses: "3100",
          available_hours: "15",
          core_skills: "Organizing logistics, driving, basic spreadsheet bookkeeping."
        }
      }
    ]
  },
  {
    id: "business_intelligence",
    name: "AI Business Strategy Intelligence",
    tagline: "High-Beta Competitor & Matrix Loop Modeler",
    icon: "Briefcase",
    description: "Formulates growth loops, reviews competitor indexes, customizes monetization, and details complete unit economic models.",
    fields: [
      {
        key: "competitors",
        label: "Main Competitors & Alternatives",
        type: "text",
        placeholder: "e.g., ActiveCampaign, manual spreadsheets, local consultants.",
      },
      {
        key: "monetization",
        label: "Pricing / Revenue Model",
        type: "select",
        placeholder: "Choose Model",
        options: ["Monthly Subscription (SaaS)", "One-Time Sales / E-commerce", "Lead Generation / Commissions", "Consulting / Done-for-You retainer", "Freemium + Ads/Upgrades"],
        defaultValue: "Monthly Subscription (SaaS)"
      },
      {
        key: "target_customer",
        label: "Target Customer Persona",
        type: "text",
        placeholder: "e.g., Small e-commerce stores with $10K-$50K monthly revenue.",
      }
    ],
    presetScenarios: [
      {
        title: "SaaS: Niche Email Marketing for Gyms",
        scenario: "I am launching an automated gym retention platform that triggers SMS/Email updates when members stop attending. Gym owners are busy and hard to reach. I need a pricing model and outbound sales pipeline.",
        additionalContext: {
          competitors: "Mailchimp (lack gym-specific triggers), Mindbody (too expensive/generic).",
          monetization: "Monthly Subscription (SaaS)",
          target_customer: "Independent martial arts and crossfit gym owners with 100-300 active members."
        }
      },
      {
        title: "E-Commerce: High-End Ergonomic Seat Cushions",
        scenario: "A boutique direct-to-consumer brand manufacturing sustainable natural wool orthopedic chair cushions. Manufacturing cost is $22, shipping is $6, we need to price it for healthy ad margins.",
        additionalContext: {
          competitors: "Purple (mass market), memory foam cushions on Amazon (cheap alternatives under $30).",
          monetization: "One-Time Sales / E-commerce",
          target_customer: "Work-from-home remote managers suffering from back pain, earning over $80,000/yr."
        }
      }
    ]
  },
  {
    id: "learning_system",
    name: "AI Conceptual Learning Accelerator",
    tagline: "First-Principles Analogical Deconstructor",
    icon: "BookOpen",
    description: "Converts extreme technical, mathematical, or scientific datasets into fundamental mental analogies and structured study parameters.",
    fields: [
      {
        key: "current_understanding",
        label: "Current Familiarity Level",
        type: "select",
        options: ["Complete Novice (Explain like I am 10)", "Intermediate learner (Know the basics, want depth)", "Advanced student (Need equations, edge cases, formulas)"],
        defaultValue: "Complete Novice (Explain like I am 10)"
      },
      {
        key: "learning_objective",
        label: "Core Objective",
        type: "text",
        placeholder: "e.g., build it, pass a technical interview, write a brief, or teach it.",
      }
    ],
    presetScenarios: [
      {
        title: "Master Complex Concept: Generative AI Attention Mechanisms",
        scenario: "Explain how 'Transformers' and 'Self-Attention' work. Why did it replace Recurrent Neural Networks (RNNs) for text generation, and how do query, key, and value vectors interact?",
        additionalContext: {
          current_understanding: "Complete Novice (Explain like I am 10)",
          learning_objective: "Understand the core architecture enough to speak confidently to engineering leaders."
        }
      },
      {
        title: "Master Finance: How Margin Trading & Shorting stock works",
        scenario: "Explain what shorting a stock actually is, the mechanics of borrowing, margin calls, and how a short squeeze happens, in a simple risk-analyzed view.",
        additionalContext: {
          current_understanding: "Intermediate learner (Know the basics, want depth)",
          learning_objective: "Risk mitigation and understanding stock-market hedge fund dynamics."
        }
      }
    ]
  },
  {
    id: "research_mode",
    name: "AI Empirical Trend Synthesis Engine",
    tagline: "Macro-Horizon Systematic Trend Analyst",
    icon: "Search",
    description: "Evaluates industrial trend layers, patent indexes, and verified metrics to distinct signal from speculation inside target markets.",
    fields: [
      {
        key: "key_sources",
        label: "Information / Data Points Sought",
        type: "text",
        placeholder: "e.g., Patent filings, manufacturing cost, consumer surveys, cost reductions.",
      },
      {
        key: "duration_span",
        label: "Historical / Future Horizon",
        type: "text",
        placeholder: "e.g. Looking at changes from 2021 to 2026, or projecting to 2030.",
      }
    ],
    presetScenarios: [
      {
        title: "Solid-State Battery Commercialization",
        scenario: "What constitutes the real state of play in solid-state EV lithium-metal battery commercialization? What are the technological choke-points (dendrites, manufacturing press) and true timelines of Toyota vs. competitors?",
        additionalContext: {
          key_sources: "Cycle life data, manufacturing scaling factors, and active vehicle trials.",
          duration_span: "Tracing breakthroughs from 2022 to active production forecasts for 2030."
        }
      },
      {
        title: "Market Intelligence: Rise of Solo-Founder SaaS",
        scenario: "Investigate how individual developers with coding assistants are building profitable software businesses without VC funding. What trends dictate their niche selections, stacks, and marketing budgets?",
        additionalContext: {
          key_sources: "Case studies of micro-SaaS, acquisition listings, and developer distribution models.",
          duration_span: "The landscape shift from 2023 to 2026."
        }
      }
    ]
  },
  {
    id: "problem_solving",
    name: "AI Root-Cause Diagnostic Solver",
    tagline: "Operational Triage & Failure Tree Restructurer",
    icon: "Cpu",
    description: "Traces high-level product and workflow symptoms back to underlying procedural issues, suggesting triage checklists.",
    fields: [
      {
        key: "symptoms",
        label: "Visible Troubleshooting Symptoms",
        type: "textarea",
        placeholder: "e.g., Marketing spend is up but conversions fell 40% in two weeks; or team feels exhausted and communication is lagging.",
      },
      {
        key: "recent_changes",
        label: "Any Recent Changes or Shifts",
        type: "text",
        placeholder: "e.g., We hired a new senior manager; we added a new checkout field; we raised our API prices.",
      }
    ],
    presetScenarios: [
      {
        title: "Crisis: Product Checkout Conversion Crash",
        scenario: "We run an educational course website. Our weekly enrollment conversions fell from 4.2% to 1.8% over the last fortnight. Traffic quantities remain unchanged. We need to identify diagnostic tests to identify the barrier.",
        additionalContext: {
          symptoms: "Staggering conversion drop, high cart abandonment at the billing selection page, no change in organic/paid traffic.",
          recent_changes: "We integrated a new mandatory two-factor email verification step prior to checkout, and updated our Stripe processing script."
        }
      },
      {
        title: "Operational: Slow Feature Releases & Team Burnout",
        scenario: "Our 4-person software engineering team is missing deadlines repeatedly, working late nights, yet our core product release cycle is twice as slow as last semester.",
        additionalContext: {
          symptoms: "Depleted morale, highly bloated pull-request backlogs, technical debt piling up, manual testing taking days.",
          recent_changes: "The management started tracking 'number of commits' as a performance metric and added 3 mandatory sync alignment stand-ups weekly."
        }
      }
    ]
  },
  {
    id: "startup_advisor",
    name: "AI Supreme Startup Planner",
    tagline: "Go-To-Market & Scaled Distribution Architect",
    icon: "Rocket",
    description: "Maps core propositions against competitive vectors to formulate active loop economics, pricing tiers, and direct delivery channels.",
    fields: [
      {
        key: "initial_concept",
        label: "Core Value Proposition / Concept",
        type: "text",
        placeholder: "e.g., Uber for private jet leases; an AI browser plugin for real-time translation.",
      },
      {
        key: "competitor_edge",
        label: "Your Advantage / Edge",
        type: "text",
        placeholder: "e.g. Deep experience in aviation; proprietary datasets; direct channel partner.",
      },
      {
        key: "monetization_tier",
        label: "Primary Intended Revenue Stream",
        type: "text",
        placeholder: "e.g., monthly subscriptions, transaction commission, usage license.",
      }
    ],
    presetScenarios: [
      {
        title: "Launch Blueprint: AI Property Manager helper",
        scenario: "Establish a business B2B tool that imports property managers' text/email messages, extracts complaints, and auto-generates localized maintenance tickets with direct quote matches for plumbers and electricians.",
        additionalContext: {
          initial_concept: "PropTech automation middleware for independent landlords owning 10-50 units.",
          competitor_edge: "Co-founder owns a 15-person plumbing dispatch franchise and has a direct API to local labor costs.",
          monetization_tier: "SaaS charging $3/unit per month under management."
        }
      },
      {
        title: "Launch Blueprint: Custom Nootropics",
        scenario: "A customized mental focus powder where users take a rapid online cognitive quiz, and we package specific doses based on their daily habits.",
        additionalContext: {
          initial_concept: "Custom wellness formulation subscription delivered monthly.",
          competitor_edge: "We have an ethical advisor who is a published neurologist, allowing us to publish real research studies.",
          monetization_tier: "A monthly automated box subscription costing $49/month."
        }
      }
    ]
  },
  {
    id: "productivity_engine",
    name: "AI Tactical Habit Optimizer",
    tagline: "Biological Clock Audit & Focus Chunk Allocator",
    icon: "Activity",
    description: "Pinpoints energy leaks, builds custom daily cognitive blocks, and automates high-return focus tracking sequences.",
    fields: [
      {
        key: "energy_thieves",
        label: "Key Interruptions or Distractions",
        type: "text",
        placeholder: "e.g., opening video apps; responding immediately to instant pings; unnecessary status meetings.",
      },
      {
        key: "current_schedule",
        label: "Typical Daily Schedule",
        type: "textarea",
        placeholder: "9:00 AM - Arrive, read news\n10:30 AM - Status meetings\n12:00 PM - Lunch\n2:05 PM - Administrative work\n5:30 PM - Leave",
      }
    ],
    presetScenarios: [
      {
        title: "Remote Freelancer: Productivity Strategy",
        scenario: "I work from my bedroom as a freelance graphic designer. I find myself constantly opening refrigerator doors, picking up my phone, cleaning, and taking 12 hours to finish a task that should take 3 hours, leaving me highly guilty and stressed.",
        additionalContext: {
          energy_thieves: "Twitter/X, cleaning chores, domestic tasks during deep-focus hours, gaming console in same workspace.",
          current_schedule: "Start at 10 AM, work sporadically with frequent notification checks, finish around 11 PM feeling exhausted but unproductive."
        }
      },
      {
        title: "Founder Time Restructuring: Meeting Bloat",
        scenario: "I am a founder with 15 employees. My entire calendar is stuffed with meetings, leaving me to do important strategic thinking or deep slide editing late at night, prompting extreme sleep deficits.",
        additionalContext: {
          energy_thieves: "Solving minor tech-support emails, daily 15-min sync alignment meetings with every sub-team, ad-hoc chats.",
          current_schedule: "8 AM to 6 PM constantly in Google Meet rooms consecutively with no breathing gaps."
        }
      }
    ]
  }
];
