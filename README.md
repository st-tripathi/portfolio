# 🎨 Developer Portfolio Template

A modern, responsive portfolio template for software engineers. **Zero frameworks, pure web technologies.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- 🎯 **Config-driven** – Edit one JSON file, get a complete portfolio
- 🌙 **Dark/Light mode** – Automatic theme switching with system preference
- 📱 **Fully responsive** – Mobile-first design
- ⚡ **Fast** – No frameworks, no build step, instant load
- 🐳 **Docker-ready** – Local dev environment included
- 📄 **Resume included** – HTML template + PDF generator

## 🚀 Quick Start

```bash
# 1. Fork this repo on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio

# 3. Edit config.json with your info
# 4. Run locally
docker-compose up
# Visit http://localhost:8080

# 5. Deploy to GitHub Pages
# Settings → Pages → Source: main / /docs
```

## 📁 Structure

```
├── docs/                # Website root
│   ├── config.json      # ← Your personal data
│   ├── index.html
│   ├── assets/resume.pdf
│   ├── css/
│   └── js/
├── examples/            # Real-world config example
├── templates/           # Resume HTML template
└── CUSTOMIZATION.md     # Detailed guide
```

## 🔧 Customization

See **[CUSTOMIZATION.md](./CUSTOMIZATION.md)** for the complete guide.

### Quick Config Example

```json
{
  "personal": {
    "name": "Jane Doe",
    "title": "Senior Software Engineer",
    "tagline": "React • Node.js • AWS",
    "email": "jane@example.com",
    "github": "janedoe",
    "linkedin": "jane-doe"
  },
  "skills": [...],
  "experience": [...]
}
```

## 🎨 Theming

Edit CSS variables in `docs/css/themes.css`:

```css
:root {
  --primary: #6366f1;  /* Change accent color */
}
```

## 📄 License

MIT – Use it, modify it, ship it.

---

**Made with ❤️ by developers, for developers.**
