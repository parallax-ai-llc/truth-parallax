# Legal Parallax

Legal Parallax is a comparative law platform that analyzes legal frameworks across jurisdictions. Each document compares how South Korea, the United States, Germany, and the ECHR/EU framework approach a specific legal topic — from criminal offenses to procedural rights.

This project is open-source and licensed under the MIT License. It is owned by Parallax AI, LLC.

## Features

- **Cross-Jurisdictional Comparison**: 80+ legal topics compared across four major jurisdictions (KR, US, DE, ECHR/EU)
- **Real Legal Citations**: Every document includes actual statute numbers, case citations, and penalty ranges
- **Structured Format**: Consistent markdown structure with comparative tables, timelines, and footnoted references
- **Full-Text Search**: Search across all legal comparison documents

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Content**: Markdown with gray-matter frontmatter
- **Styling**: Tailwind CSS + shadcn/ui
- **Deployment**: Vercel

## Installation

```bash
git clone https://github.com/parallax-ai-llc/legal-parallax.git
cd legal-parallax
npm install
npm run dev
```

## Content Structure

Legal comparison documents are stored as Markdown files in `content/cases/`:

```
content/cases/
├── murder-law-comparison.md
├── fraud-law-comparison.md
├── cybercrime-law-comparison.md
└── ... (80+ files)
```

Each file follows this frontmatter format:

```yaml
---
id: "topic-law-comparison"
name: "Topic: A Cross-Jurisdictional Legal Analysis"
date: "YYYY-MM-DD"
nationality: "Comparative"
occupation: ["Criminal Law", "Category"]
image: "/images/legal-comparison.jpg"
socialLinks:
  wikipedia: "https://en.wikipedia.org/wiki/..."
lastUpdated: "YYYY-MM-DD"
---
```

## Contributing

We accept contributions in the form of Markdown files in the `content/cases/` directory. See the [Contribute page](https://legal.parallax.kr/contribute) for detailed guidelines.

### Quick Start

1. Fork the repository
2. Create a branch: `git checkout -b feature/add-case-topic`
3. Add your file to `content/cases/topic-law-comparison.md`
4. Submit a pull request

### Content Guidelines

- Write all content in English
- Include all four jurisdictions (KR, US, DE, ECHR/EU)
- Cite every legal provision and case with footnotes
- Include a comparative analysis table
- Do not modify code or configuration files

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Owned by Parallax AI, LLC.
