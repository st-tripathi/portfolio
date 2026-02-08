# Portfolio & Resume - Shivam Tripathi

A modern, responsive portfolio website and resume generator for a Staff Software Engineer. Built with a "Jamstack" architecture, focusing on performance, cleanliness, and maintainability.

## 🚀 Live Demo
[View Portfolio](https://st-tripathi.github.io/portfolio/) (Replace with your actual URL once enabled)

## 🛠️ Architecture

This project follows a **Static-First** approach:

*   **Frontend**: Vanilla HTML5, CSS3 (Variables + Flexbox/Grid), ES6 JavaScript. No heavy frameworks.
*   **Resume Generation**: HTML/CSS template -> PDF conversion using **Puppeteer** (Headless Chrome).
*   **Hosting**: Designed for **GitHub Pages** (Static) or **Netlify**.
*   **Development**: Containerized using **Docker** for consistent environments.

## 📂 Project Structure

```bash
.
├── docs/               # Public web root (GitHub Pages source)
│   ├── assets/         # Images, fonts, and the generated Resume PDF
│   ├── css/            # Modular CSS (layout, components, themes)
│   ├── js/             # Modular JS (theme, nav, github api, skills)
│   └── index.html      # Main entry point
├── templates/          # HTML Templates for Resume Generation
├── Dockerfile.dev      # Dev server configuration
└── docker-compose.yml  # Local development orchestration
```

## ⚡ Quick Start (Local Development)

You don't need Node.js installed locally. Just **Docker**.

1.  **Clone the repo**
    ```bash
    git clone https://github.com/st-tripathi/portfolio.git
    cd portfolio
    ```

2.  **Start the server**
    ```bash
    docker-compose up
    ```

3.  **View it**
    Open `http://localhost:8080`

## 📄 Generating the Resume PDF

The resume is generated programmatically from the HTML template to ensure pixel-perfect rendering.

1.  **Edit Content**: Update `templates/resume_template.html`
2.  **Generate PDF**:
    ```bash
    # Runs Puppeteer in a container to capture the HTML as PDF
    docker run --rm -v "$(pwd)":/work ghcr.io/puppeteer/puppeteer:latest node -e "
    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch({args: ['--no-sandbox']});
      const page = await browser.newPage();
      await page.goto('file:///work/templates/resume_template.html', {waitUntil: 'networkidle0'});
      await page.pdf({path: '/work/docs/assets/resume.pdf', format: 'A4', printBackground: true});
      await browser.close();
    })();"
    ```

## 🔒 Security & Privacy

*   **No Trackers**: Zero analytics or tracking cookies.
*   **Static Content**: No database, no backend to hack.
*   **Sanitized**: No API keys or credentials stored in the repo.

## 📄 License

MIT © Shivam Tripathi
