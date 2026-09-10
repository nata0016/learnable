import type { Course } from "@/types/course";

const UNSPLASH_A = "https://images.unsplash.com/photo-1758270705290-62b6294dd044";
const UNSPLASH_B = "https://images.unsplash.com/photo-1769794371055-54436b54577e";

const THUMB_A = `${UNSPLASH_A}?w=1200&q=80&auto=format&fit=crop`;
const THUMB_B = `${UNSPLASH_B}?w=1200&q=80&auto=format&fit=crop`;

const POSTER_A = `${UNSPLASH_A}?w=1600&q=80&auto=format&fit=crop`;
const POSTER_B = `${UNSPLASH_B}?w=1600&q=80&auto=format&fit=crop`;

const FIGURE_A = `${UNSPLASH_A}?w=1000&q=80&auto=format&fit=crop`;

export const courses: Course[] = [
  {
    id: "data-analysis-foundations",
    slug: "data-analysis-foundations",
    title: "Data analysis foundations",
    summary:
      "Learn to read, clean, and reason about real datasets — no prior experience required.",
    difficulty: "beginner",
    durationHours: 3,
    hasCaptions: true,
    hasTranscript: true,
    thumbnail: THUMB_A,
    lessons: [
      {
        id: "reading-a-dataset",
        title: "Reading a dataset",
        kind: "video",
        durationMin: 8,
        videoPoster: POSTER_A,
        captionsVttPath: "/captions/reading-a-dataset.vtt",
        transcript: [
          {
            t: "0:00",
            text: "Let's open a real spreadsheet and look at how it's organized.",
          },
          {
            t: "2:14",
            text: "Each row is a record — one observation, like a single customer order.",
          },
          {
            t: "4:30",
            text: "Each column is a field — one piece of information about that record.",
          },
          {
            t: "6:50",
            text: "Once you can name rows and columns, you can talk about any dataset.",
          },
        ],
      },
      {
        id: "cleaning-messy-data",
        title: "Cleaning messy data",
        kind: "text",
        durationMin: 6,
        bodyMarkdown: `Messy data usually comes down to three problems: **missing values**, **inconsistent formatting**, and **duplicate records**.

- A missing value is a blank cell where a number or label should be.
- Inconsistent formatting is the same fact written two ways, like "NY" and "New York."
- A duplicate record is the same real-world thing entered more than once.

Fixing these before you analyze anything saves you from drawing conclusions from data that doesn't actually say what you think it says.`,
        figure: {
          src: FIGURE_A,
          alt: "A spreadsheet with inconsistent date formats highlighted in yellow",
        },
      },
      {
        id: "foundations-check",
        title: "Check your understanding",
        kind: "quiz",
        durationMin: 6,
        questions: [
          {
            id: "q1",
            prompt: "What is a dataset?",
            options: [
              { id: "a", text: "A single number used in a report" },
              { id: "b", text: "An organized collection of related records" },
              { id: "c", text: "A chart or graph" },
              { id: "d", text: "A type of spreadsheet formula" },
            ],
            correctOptionId: "b",
            explanation:
              "A dataset is a collection of related records — rows and columns of information you can analyze together.",
          },
          {
            id: "q2",
            prompt: "What's the difference between a column and a record?",
            options: [
              {
                id: "a",
                text: "A column is a field of information; a record is one full row representing a single observation",
              },
              { id: "b", text: "They mean exactly the same thing" },
              { id: "c", text: "A column is always bigger than a record" },
              {
                id: "d",
                text: "A record only exists in databases, never in spreadsheets",
              },
            ],
            correctOptionId: "a",
            explanation:
              "A column holds one kind of information across every row (like \"email address\"), while a record is one full row — everything known about a single observation.",
          },
          {
            id: "q3",
            prompt: "You see a blank cell where a phone number should be. What is this an example of?",
            options: [
              { id: "a", text: "A duplicate record" },
              { id: "b", text: "A missing value" },
              { id: "c", text: "Inconsistent formatting" },
              { id: "d", text: "A dataset" },
            ],
            correctOptionId: "b",
            explanation:
              "A blank cell where data should exist is a missing value — one of the three most common data-cleaning problems.",
          },
          {
            id: "q4",
            prompt: "\"NY\" and \"New York\" appearing in the same column for the same state is an example of what?",
            options: [
              { id: "a", text: "A missing value" },
              { id: "b", text: "A duplicate record" },
              { id: "c", text: "Inconsistent formatting" },
              { id: "d", text: "A correctly cleaned dataset" },
            ],
            correctOptionId: "c",
            explanation:
              "Writing the same fact two different ways is inconsistent formatting — it makes the same real-world value look like two different values to a computer.",
          },
          {
            id: "q5",
            prompt: "Why should you clean data before analyzing it?",
            options: [
              { id: "a", text: "Cleaning is optional and rarely matters" },
              {
                id: "b",
                text: "Messy data can lead to conclusions that don't reflect what actually happened",
              },
              { id: "c", text: "It makes the file smaller" },
              { id: "d", text: "It's required by every spreadsheet program" },
            ],
            correctOptionId: "b",
            explanation:
              "Errors like duplicates or inconsistent formatting can skew counts and averages, so cleaning first protects the accuracy of everything you conclude afterward.",
          },
        ],
      },
    ],
  },
  {
    id: "plain-language-writing",
    slug: "plain-language-writing",
    title: "Plain-language writing",
    summary: "Write clearly for real readers by cutting jargon, passive voice, and clutter.",
    difficulty: "all-levels",
    durationHours: 1.5,
    hasCaptions: true,
    hasTranscript: true,
    thumbnail: THUMB_B,
    lessons: [
      {
        id: "why-plain-language-matters",
        title: "Why plain language matters",
        kind: "text",
        durationMin: 5,
        bodyMarkdown: `Plain language isn't "dumbed down" writing — it's writing that respects your reader's time.

A reader who understands you on the first try doesn't have to re-read, guess, or ask someone else what you meant.`,
      },
      {
        id: "cutting-jargon",
        title: "Cutting jargon from your writing",
        kind: "video",
        durationMin: 6,
        videoPoster: POSTER_B,
        captionsVttPath: "/captions/cutting-jargon.vtt",
        transcript: [
          { t: "0:00", text: "Jargon isn't wrong — it's just for insiders." },
          { t: "1:45", text: "If a new hire wouldn't understand it, rewrite it." },
        ],
      },
    ],
  },
  {
    id: "intro-to-accessibility",
    slug: "intro-to-accessibility",
    title: "Intro to accessibility",
    summary: "Understand who accessibility helps and the handful of principles that matter most.",
    difficulty: "beginner",
    durationHours: 2,
    hasCaptions: true,
    hasTranscript: true,
    thumbnail: THUMB_A,
    lessons: [
      {
        id: "what-is-accessibility",
        title: "What is accessibility?",
        kind: "video",
        durationMin: 5,
        videoPoster: POSTER_A,
        captionsVttPath: "/captions/what-is-accessibility.vtt",
        transcript: [
          {
            t: "0:00",
            text: "Accessibility means people with disabilities can use what you build.",
          },
          {
            t: "1:20",
            text: "That includes vision, hearing, motor, and cognitive differences.",
          },
        ],
      },
      {
        id: "accessibility-check",
        title: "Check your understanding",
        kind: "quiz",
        durationMin: 4,
        questions: [
          {
            id: "q1",
            prompt: "Accessibility work primarily benefits which group of users?",
            options: [
              { id: "a", text: "Only screen reader users" },
              { id: "b", text: "People with permanent, temporary, or situational disabilities" },
              { id: "c", text: "Only developers" },
              { id: "d", text: "Only users over 65" },
            ],
            correctOptionId: "b",
            explanation:
              "Accessibility covers permanent disabilities, temporary ones (like a broken arm), and situational ones (like bright sunlight on a screen).",
          },
          {
            id: "q2",
            prompt: "Which of these is an example of a motor disability consideration?",
            options: [
              { id: "a", text: "Providing captions on video" },
              { id: "b", text: "Making buttons operable by keyboard alone" },
              { id: "c", text: "Using high-contrast colors" },
              { id: "d", text: "Writing in plain language" },
            ],
            correctOptionId: "b",
            explanation:
              "Keyboard operability matters most for people who can't use a mouse or touchscreen precisely, which is a motor accessibility consideration.",
          },
        ],
      },
    ],
  },
  {
    id: "spreadsheets-step-by-step",
    slug: "spreadsheets-step-by-step",
    title: "Spreadsheets step by step",
    summary: "Build confidence with rows, columns, and formulas — one small step at a time.",
    difficulty: "beginner",
    durationHours: 3,
    hasCaptions: false,
    hasTranscript: false,
    thumbnail: THUMB_B,
    lessons: [
      {
        id: "rows-and-columns",
        title: "Getting comfortable with rows and columns",
        kind: "text",
        durationMin: 5,
        bodyMarkdown: `Every spreadsheet is a grid. Rows run left to right, columns run top to bottom, and a cell is where one row meets one column.

Once that clicks, everything else — formulas, filters, charts — is just built on top of that grid.`,
      },
      {
        id: "simple-formulas",
        title: "Using simple formulas",
        kind: "text",
        durationMin: 7,
        bodyMarkdown: `A formula always starts with \`=\`. \`=SUM(A1:A10)\` adds up a range of cells, and \`=AVERAGE(A1:A10)\` finds their average.

You don't need to memorize formulas — you need to know they exist, and look the rest up when you need them.`,
      },
    ],
  },
  {
    id: "logistics-and-operations",
    slug: "logistics-and-operations",
    title: "Logistics & operations",
    summary: "See how goods, information, and people move through a real operation.",
    difficulty: "intermediate",
    durationHours: 2.5,
    hasCaptions: false,
    hasTranscript: false,
    thumbnail: THUMB_A,
    lessons: [
      {
        id: "mapping-a-supply-chain",
        title: "Mapping a supply chain",
        kind: "text",
        durationMin: 6,
        bodyMarkdown: `A supply chain is every step between a raw material and a customer's hands: sourcing, manufacturing, warehousing, and delivery.

Mapping it out — even roughly — is usually the fastest way to spot where things are slow or expensive.`,
      },
      {
        id: "operations-check",
        title: "Operations basics",
        kind: "quiz",
        durationMin: 4,
        questions: [
          {
            id: "q1",
            prompt: "What is a supply chain?",
            options: [
              { id: "a", text: "Only the delivery step of a business" },
              {
                id: "b",
                text: "Every step between a raw material and the customer receiving it",
              },
              { id: "c", text: "A type of spreadsheet" },
              { id: "d", text: "A warehouse building" },
            ],
            correctOptionId: "b",
            explanation:
              "A supply chain covers the full path a product takes — sourcing, making, storing, and delivering — not just one step.",
          },
          {
            id: "q2",
            prompt: "Why map out a supply chain?",
            options: [
              { id: "a", text: "It's required for tax purposes" },
              { id: "b", text: "To spot where a process is slow or expensive" },
              { id: "c", text: "It replaces the need for a warehouse" },
              { id: "d", text: "It only matters for large companies" },
            ],
            correctOptionId: "b",
            explanation:
              "Seeing every step laid out makes bottlenecks and unnecessary costs much easier to find.",
          },
        ],
      },
    ],
  },
  {
    id: "interview-preparation",
    slug: "interview-preparation",
    title: "Interview preparation",
    summary: "Practice the questions that come up most, and learn what to ask in return.",
    difficulty: "all-levels",
    durationHours: 1,
    hasCaptions: true,
    hasTranscript: true,
    thumbnail: THUMB_B,
    lessons: [
      {
        id: "behavioral-questions",
        title: "Answering behavioral questions",
        kind: "video",
        durationMin: 6,
        videoPoster: POSTER_B,
        captionsVttPath: "/captions/behavioral-questions.vtt",
        transcript: [
          {
            t: "0:00",
            text: "\"Tell me about a time when...\" questions want a specific story, not a general answer.",
          },
          {
            t: "2:05",
            text: "Structure your answer around the situation, what you did, and the result.",
          },
        ],
      },
      {
        id: "questions-to-ask",
        title: "Questions to ask your interviewer",
        kind: "text",
        durationMin: 4,
        bodyMarkdown: `Asking good questions shows you're evaluating the role, not just hoping to be picked.

Try: "What does success look like in this role after six months?" or "What's changed most about this team in the last year?"`,
      },
    ],
  },
];
