# Tebunah Training

Tebunah Training website  built with **Next.js 16**, **React 19**, and **TypeScript**. This project demonstrates best practices for building scalable, type-safe web applications with a focus on performance and developer experience.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation

1. Clone the repository and navigate to the project:

```bash
cd tebunah-training
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the application for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint to check code quality |

## 🏗️ Project Structure

```
tebunah-training/
├── app/                      # Next.js App Router directory
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── public/                  # Static assets (images, fonts, etc.)
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.mjs       # PostCSS configuration
├── eslint.config.mjs        # ESLint configuration
└── README.md                # This file
```

## 🛠️ Tech Stack

### Core
- **[Next.js 16](https://nextjs.org)** - React framework with built-in optimization
- **[React 19](https://react.dev)** - User interface library
- **[TypeScript 5](https://www.typescriptlang.org)** - Static type checking
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework

### Development Tools
- **[ESLint 9](https://eslint.org)** - Code linting and quality assurance
- **[PostCSS 4](https://postcss.org)** - CSS transformation

## 💡 Features

- ✨ **Modern React 19** with latest features
- 🎨 **Tailwind CSS** for rapid UI development
- 📘 **Full TypeScript** support for type safety
- ⚡ **Next.js Optimizations** for performance (automatic code-splitting, image optimization, font optimization)
- 🔍 **ESLint** configuration for consistent code quality
- 🔄 **Hot Module Replacement** for seamless development experience

## 📖 Development Guidelines

### Code Style

This project uses ESLint to maintain consistent code quality. Before committing:

```bash
npm run lint
```

### TypeScript

All components and functions should be properly typed. Avoid using `any` type when possible.

### Component Structure

- Create reusable components in a dedicated directory
- Use descriptive file and component names
- Organize components by feature or domain

## 📚 Learning Resources

- **[Next.js Docs](https://nextjs.org/docs)** - Official Next.js documentation
- **[React Docs](https://react.dev)** - Official React documentation
- **[Tailwind CSS Docs](https://tailwindcss.com/docs)** - Tailwind CSS documentation
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript documentation

## 🚢 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import the repository into Vercel
3. Vercel will automatically detect Next.js and configure settings
4. Deploy with a single click

[Learn more about deploying to Vercel](https://vercel.com/docs/frameworks/nextjs)

### Deploy to Other Platforms

This Next.js app can be deployed to any platform supporting Node.js:
- AWS, Google Cloud, Azure
- Netlify, Railway, Fly.io
- Docker containers
- Traditional VPS/dedicated servers

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed guides.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -m 'Add your feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a Pull Request

Please ensure your code passes linting checks before submitting a PR.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For questions or issues, please:
- Check the [official documentation](https://nextjs.org/docs)
- Search existing GitHub issues
- Create a new issue with detailed information

---

**Happy coding!** 🎉
