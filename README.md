# Election Assistant

An interactive, high-performance platform that helps users understand the election process, including voter registration, key timelines, and polling steps. Built using **Next.js**, **TypeScript**, **TailwindCSS**, and **Shadcn/ui**.

## 👤 Author
**TECH9PATH-VISH**
- GitHub: [https://github.com/TECH9PATH-VISH](https://github.com/TECH9PATH-VISH)

## 🚀 Features
- **Interactive Timeline**: A visual, scrollable roadmap of the election cycle.
- **Election Step-by-Step Wizard**: A multi-step form to guide users through "How to Vote."
- **Google Maps Integration**: "Find My Polling Place" feature (Requires Google Maps API Key).
- **Calendar Integration**: Downloadable `.ics` files to save important dates.
- **Interactive Quiz**: Test your election knowledge.

## 🛠️ Tech Stack
- Next.js (App Router)
- TypeScript
- TailwindCSS & Shadcn UI
- Framer Motion (Animations)
- Zustand (State Management)
- Firebase & Next-Auth

## 📦 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/TECH9PATH-VISH/Election-Assistant.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Deploying to GitHub Pages

GitHub Pages only hosts **static** files. Because Next.js uses server-side features (like Next-Auth and API routes), deploying directly to GitHub Pages requires an `output: 'export'` configuration, which disables some server features.

If you are seeing a blank page or 404 errors on GitHub Pages, it is likely because the Next.js app needs a specific GitHub Actions workflow to build and export the static HTML properly. 

**Recommended Alternative**: For full Next.js support (including Next-Auth), it is highly recommended to deploy to **[Vercel](https://vercel.com/)**.
1. Create an account on Vercel.
2. Import this GitHub repository.
3. Vercel will automatically configure and deploy your Next.js application with zero configuration needed!
