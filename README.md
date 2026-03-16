# Truth Parallax

Truth Parallax is a comparative scripture interpretation platform that explores how different religious traditions understand the same sacred texts. Each scripture includes interpretations from multiple traditions — offering side-by-side theological, philosophical, and academic perspectives.

This project is open-source and licensed under the MIT License. It is owned by Parallax AI, LLC.

## Features

- **Cross-Traditional Comparison**: 159 scriptures across 18+ religious traditions with multi-perspective interpretations
- **15,500+ Interpretation Documents**: Chapter-by-chapter analysis from diverse theological viewpoints
- **Hierarchical Navigation**: Browse by scripture → tradition → chapter
- **Full-Text Search**: Search across all scripture interpretations
- **Tradition Tabs**: Switch between different tradition's interpretations of the same chapter

## Scriptures Covered

| Religion | Scriptures | Traditions |
|----------|-----------|------------|
| Christianity | Bible (66 books), Book of Enoch, Book of Jubilees, Nag Hammadi texts | Protestant, Catholic, Eastern Orthodox, Gnostic |
| Islam | Quran (114 suras), Hadith collections (Bukhari, Muslim, Tirmidhi, Abu Dawud) | Sunni, Shia, Sufi, Salafi |
| Buddhism | Dhammapada, Heart Sutra, Diamond Sutra, Lotus Sutra, Platform Sutra, and more | Theravada, Mahayana, Zen, Tibetan |
| Hinduism | Bhagavad Gita, Upanishads, Vedas, Mahabharata, Ramayana, Yoga Sutras | Vaishnavism, Shaivism, Advaita, Dvaita |
| Taoism | Tao Te Ching, Zhuangzi | Philosophical, Religious |
| Confucianism | Analects, Mencius, Great Learning, Doctrine of the Mean, I Ching, and more | Confucian, Neo-Confucian, Academic |
| Judaism | Torah, Talmud, Dead Sea Scrolls | Orthodox, Reform, Conservative, Kabbalistic |
| Sikhism | Guru Granth Sahib, Dasam Granth | Sikh, Bhakti, Academic |
| And more... | Avesta, Kojiki, Kitab-i-Aqdas, Book of Mormon, Ginza Rabba, etc. | Various tradition-specific perspectives |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Content**: Markdown with gray-matter frontmatter
- **Styling**: Tailwind CSS + shadcn/ui
- **Deployment**: Vercel

## Installation

```bash
git clone https://github.com/parallax-ai-llc/truth-parallax.git
cd truth-parallax
npm install
npm run dev
```

## Content Structure

Scripture interpretations are stored as Markdown files in `content/scriptures/`:

```
content/scriptures/
├── genesis/
│   ├── overview.md                 # Scripture overview
│   ├── protestantism/
│   │   ├── overview.md             # Tradition-specific overview
│   │   ├── 1.md                    # Chapter 1 interpretation
│   │   ├── 2.md
│   │   └── ...
│   ├── catholicism/
│   │   ├── overview.md
│   │   ├── 1.md
│   │   └── ...
│   └── ...
├── quran/
│   ├── overview.md
│   ├── sunni/
│   ├── shia/
│   └── ...
└── ... (159 scriptures)
```

### Frontmatter Schemas

**Scripture overview** (`overview.md`):
```yaml
---
title: "Genesis"
slug: "genesis"
religion: "christianity"
aliases: ["Bereshit", "창세기"]
totalChapters: 50
traditions: ["protestantism", "catholicism", "eastern-orthodox"]
tags: ["creation", "patriarchs", "covenant"]
lastUpdated: "2026-03-12"
---
```

**Tradition overview** (`{tradition}/overview.md`):
```yaml
---
title: "Protestant Interpretation of Genesis"
scripture: "genesis"
tradition: "protestantism"
traditionDisplayName: "Protestantism"
religion: "christianity"
keyThemes: ["sola scriptura", "covenant theology"]
lastUpdated: "2026-03-12"
---
```

**Chapter interpretation** (`{tradition}/{N}.md`):
```yaml
---
title: "Genesis Chapter 1"
scripture: "genesis"
tradition: "protestantism"
chapter: 1
chapterLabel: "Chapter 1 — Creation"
verseCount: 31
tags: ["creation", "six days"]
lastUpdated: "2026-03-12"
---
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with search |
| `/s` | All scriptures by religion |
| `/s/genesis` | Scripture overview |
| `/s/genesis/protestantism` | Tradition-specific overview |
| `/s/genesis/protestantism/1` | Chapter interpretation |

## Contributing

We accept contributions in the form of Markdown files in the `content/scriptures/` directory. See the [Contribute page](https://truth.parallax.kr/contribute) for detailed guidelines.

### Quick Start

1. Fork the repository
2. Create a branch: `git checkout -b feature/add-scripture`
3. Add your content following the directory structure and frontmatter schemas above
4. Submit a pull request

### Content Guidelines

- Write all content in English
- Follow the established frontmatter schemas exactly
- Include scholarly references where possible
- Maintain respectful, academic tone across all traditions
- Do not modify code or configuration files

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Owned by Parallax AI, LLC.
