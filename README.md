# Flow

A minimal, elegant personal blog built with Astro. Fast, clean, and focused on content.

## Tech Stack

- **Astro 7** - Static site generator with View Transitions
- **React 19** - Interactive components
- **Tailwind CSS 4** - Styling
- **Shadcn UI** - UI components
- **MDX** - Enhanced markdown support

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- 🎨 **Light/Dark Mode** - Auto-persisted theme preference
- ⚡ **View Transitions** - Smooth page navigation with iOS Chrome polyfill
- 🔍 **Global Search** - Full-text search across all articles
- 📱 **Fully Responsive** - Mobile-first design
- 📝 **MDX Support** - Write with components in markdown
- 💭 **Thoughts** - Micro-blog timeline; publish from a hidden page (GitHub API) or `npm run say`, data lives in the repo
- 🏷️ **Categories & Tags** - Organized content structure
- 📖 **Table of Contents** - Auto-generated for articles
- 🖼️ **Image Zoom** - Click-to-expand images with pan/zoom
- 📋 **Code Copy** - One-click code copying for developer experience
- 📜 **Changelog Timeline** - Visual history of site updates
- ⬆️ **Back to Top** - Smooth scroll button

## Project Structure

```
src/
├── components/     # React & Astro components
├── content/        # MDX articles
├── data/           # Site configuration
├── layouts/        # Page layouts
├── pages/          # Route pages
└── styles/         # Global styles
```

## License

MIT