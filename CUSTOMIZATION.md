# 🎨 Portfolio Template - Customization Guide

A modern, responsive portfolio template for software engineers. Fork this repo and customize it with your own information in minutes.

## 🚀 Quick Start

### 1. Fork & Clone
```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
```

### 2. Edit Configuration
All personal information lives in **one file**: `docs/config.json`

```bash
# Open in your editor
code docs/config.json
```

### 3. Run Locally
```bash
docker-compose up
# Visit http://localhost:8080
```

### 4. Deploy
Push to GitHub and enable GitHub Pages (Settings → Pages → Source: `main` / `/docs`)

---

## 📁 Project Structure

```
portfolio/
├── docs/                # Public website (GitHub Pages root)
│   ├── config.json      # ← YOUR DATA GOES HERE
│   ├── index.html       # Main page (reads from config.json)
│   ├── assets/
│   │   └── resume.pdf   # Your resume
│   ├── css/             # Stylesheets
│   └── js/              # JavaScript modules
├── examples/            # Reference examples
│   └── config.shivam.json  # Real-world config example
├── templates/           # Resume HTML template (for PDF generation)
├── Dockerfile.dev       # Development server
└── docker-compose.yml   # Docker orchestration
```

> 💡 **Tip:** Check `examples/config.shivam.json` to see a complete, real-world configuration.

---

## 🔧 Configuration Reference

### Personal Information

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Staff Software Engineer",
    "tagline": "Kubernetes • IAM • Distributed Systems",
    "email": "your.email@example.com",
    "github": "your-github-username",
    "linkedin": "your-linkedin-username"
  }
}
```

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Your full name | "Jane Doe" |
| `title` | Your job title | "Senior Software Engineer" |
| `tagline` | Key skills (use • as separator) | "React • Node.js • AWS" |
| `email` | Contact email | "jane@example.com" |
| `github` | GitHub username (not URL) | "janedoe" |
| `linkedin` | LinkedIn username (not URL) | "jane-doe" |

---

### About Section

```json
{
  "about": {
    "intro": "I'm a software engineer with <strong>X+ years</strong> of experience...",
    "focus": "My focus areas include..."
  }
}
```

> 💡 **Tip:** You can use HTML tags like `<strong>` for emphasis.

---

### Skills

```json
{
  "skills": [
    {
      "icon": "⚙️",
      "name": "Platform Engineering",
      "description": "Building internal platforms...",
      "tools": "Kubernetes, Docker, Helm"
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `icon` | Emoji icon for the skill |
| `name` | Skill category name |
| `description` | Tooltip description (shown on hover/click) |
| `tools` | Comma-separated list of specific tools |

#### Suggested Icons
| Category | Icon |
|----------|------|
| Platform/DevOps | ⚙️ |
| Containers | ☸️ |
| Security | 🔐 |
| Distributed Systems | 🌐 |
| Cloud | ☁️ |
| API/Backend | 🔧 |
| Frontend | 🎨 |
| Data | 📊 |
| AI/ML | 🤖 |

---

### Experience

```json
{
  "experience": [
    {
      "company": "Company Name",
      "role": "Senior Engineer",
      "period": "Jan 2022 – Present",
      "description": "Brief company description",
      "highlights": [
        "Achievement #1 with metrics",
        "Achievement #2 with impact"
      ]
    }
  ]
}
```

> 💡 **Tip:** Lead with action verbs and include metrics where possible.

---

### Optional Sections

#### Blog
```json
{
  "blog": {
    "enabled": true,
    "subtitle": "Thoughts on software engineering..."
  }
}
```

#### Footer
```json
{
  "footer": {
    "copyright": "© 2026 Your Name. Built with ❤️"
  }
}
```

---

## 📄 Resume PDF

### Option 1: Replace Manually
Simply replace `docs/assets/resume.pdf` with your own PDF.

### Option 2: Generate from Template
1. Edit `templates/resume_template.html` with your information
2. Generate PDF:
```bash
docker run --rm -v "$(pwd)":/work ghcr.io/puppeteer/puppeteer:latest node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('file:///work/templates/resume_template.html', {waitUntil: 'networkidle0'});
  await page.pdf({path: '/work/docs/assets/resume.pdf', format: 'A4', printBackground: true});
  await browser.close();
})();
"
```

---

## 🎨 Theming

### Colors
Edit `docs/css/themes.css` to customize the color palette:

```css
:root {
  --primary: #6366f1;      /* Indigo - accent color */
  --primary-light: #818cf8;
  --primary-dark: #4f46e5;
}
```

### Fonts
Change fonts in `docs/css/base.css`:

```css
:root {
  --font-primary: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

Add your preferred Google Font in `docs/index.html` `<head>`.

---

## 🚀 Deployment

### GitHub Pages (Free, requires public repo)
1. Go to repo Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `main`, Folder: `/docs`
4. Save

Your site will be live at `https://YOUR_USERNAME.github.io/portfolio/`

### Netlify (Free, supports private repos)
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repo
3. Set publish directory to `docs`
4. Deploy

---

## ❓ FAQ

### How do I add more experience entries?
Add another object to the `experience` array in `config.json`.

### How do I change the skills?
Edit the `skills` array in `config.json`. Add, remove, or modify entries.

### Can I add custom sections?
Yes! Edit `docs/index.html` directly for structural changes, then update `docs/js/config-loader.js` to read from config if needed.

### How do I remove the Blog section?
Set `"blog": { "enabled": false }` in `config.json` (feature coming soon), or remove the section from `index.html`.

---

## 📝 License

MIT © Feel free to use, modify, and share.

---

Made with ❤️ by developers, for developers.
