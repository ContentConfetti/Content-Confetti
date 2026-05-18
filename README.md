# 🎉 Content Confetti

**Turn 1 Podcast Into 20 Pieces of Content — In Minutes.**

An AI-powered content repurposing platform that transforms long-form content into dozens of platform-perfect social media posts.

![Content Confetti](https://contentconfetti.online)

---

## ✨ Features

- 🎙️ **Multi-Format Upload**: Podcasts, videos, YouTube links, text content
- 🤖 **AI-Powered Generation**: Automatic transcription and content creation
- 📱 **Multi-Platform**: Instagram, Twitter, LinkedIn, TikTok, Blog, Email
- 🎨 **Brand Voice**: Custom tone settings (Professional, Playful, Luxury, etc.)
- 📊 **Analytics**: Track your content performance
- 👥 **Team Collaboration**: Multi-brand workspace for agencies
- 📅 **Content Scheduling**: Plan and schedule your posts

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- OpenAI API account
- Supabase account
- Vercel account (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/content-confetti.git
cd content-confetti

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📖 Full Setup Guide

See [SETUP.md](./SETUP.md) for complete step-by-step instructions including:
- Supabase database setup
- OpenAI API configuration
- Domain configuration (contentconfetti.online)
- Deployment to Vercel

---

## 🏗️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: OpenAI GPT-4, Whisper
- **Deployment**: Vercel
- **Payments**: Stripe (coming soon)

---

## 📁 Project Structure

```
content-confetti/
├── src/
│   ├── app/
│   │   ├── components/      # React components
│   │   │   ├── LandingPage.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── UploadModal.tsx
│   │   │   ├── AIContentStudio.tsx
│   │   │   └── ...
│   │   └── App.tsx          # Main app component
│   ├── lib/
│   │   ├── supabase.ts      # Supabase client & types
│   │   └── openai.ts        # OpenAI integration
│   ├── services/
│   │   ├── auth.service.ts  # Authentication logic
│   │   └── content.service.ts # Content management
│   └── styles/
│       └── theme.css        # Global styles & design tokens
├── supabase/
│   └── schema.sql           # Database schema
├── .env.example             # Environment variables template
├── vercel.json              # Vercel configuration
└── SETUP.md                 # Setup instructions
```

---

## 💰 Pricing Plans

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0 | 1 upload/month, Basic AI tools |
| **Creator** | $19/mo | 10 uploads/month, Unlimited captions |
| **Pro** | $49/mo | Unlimited uploads, Advanced AI, Scheduling |
| **Agency** | $149/mo | Multi-brand, Team access, White-label |

---

## 🔑 Environment Variables

Required environment variables (add to `.env.local`):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

---

## 🎯 Roadmap

- [x] Landing page & UI design
- [x] User authentication
- [x] File upload system
- [x] AI transcription (Whisper)
- [x] Content generation (GPT-4)
- [x] Multi-platform support
- [ ] Stripe payment integration
- [ ] Content scheduling
- [ ] Analytics dashboard
- [ ] Team collaboration features
- [ ] Mobile app
- [ ] Chrome extension

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is private and proprietary.

---

## 💬 Support

- 📧 Email: support@contentconfetti.online
- 🐦 Twitter: [@contentconfetti](https://twitter.com/contentconfetti)

---

## 🙏 Acknowledgments

Built with:
- OpenAI GPT-4 & Whisper
- Supabase
- Vercel
- Tailwind CSS
- And lots of ☕ + 🎉

---

**Made with ❤️ for content creators everywhere**
