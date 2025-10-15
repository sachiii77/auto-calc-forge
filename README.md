# CalcForge: Your AI-Powered Calculator Generator

CalcForge is a revolutionary web application that empowers you to create custom, production-ready calculators with nothing more than a simple English description. Powered by advanced AI, CalcForge transforms your ideas into fully functional tools in seconds. Whether you're a developer needing a quick solution or a professional looking to build a tool for your team, CalcForge is the ultimate shortcut to getting the job done.

## ✨ Features

*   **🤖 AI-Powered Generation:** Simply describe the calculator you need, and our AI will build it for you. No coding required.
*   **🚀 Lightning-Fast:** Go from idea to a fully functional calculator in under a minute.
*   **✅ Production-Ready:** Generates calculators with built-in validation, responsive design, and a clean, modern UI.
*   **🔗 Easy Sharing:** Every calculator gets a unique, shareable link, making it easy to distribute your creations.
*   **🔒 Secure & Private:** Your data is encrypted and stored securely, ensuring your privacy and peace of mind.
*   **📈 Calculator History:** Keep track of all the calculators you've created and access them anytime.

## 🛠️ Tech Stack

CalcForge is built with a modern, robust, and scalable tech stack:

*   **Frontend:** [React](https://reactjs.org/) with [Vite](https://vitejs.dev/) for a lightning-fast development experience.
*   **Language:** [TypeScript](https://www.typescriptlang.org/) for type safety and improved code quality.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a utility-first styling workflow.
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/) for accessible and beautifully designed components.
*   **Backend & Database:** [Supabase](https.supabase.io/) for authentication, database, and backend services.
*   **Routing:** [React Router](https://reactrouter.com/) for seamless navigation.
*   **State Management:** [TanStack Query (React Query)](https://tanstack.com/query/v4) for efficient data fetching and caching.

## 🚀 Getting Started

To get a local copy of CalcForge up and running, follow these steps.

### Prerequisites

Make sure you have the following installed:

*   [Node.js](https://nodejs.org/) (v14 or later)
*   [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/)/[pnpm](https://pnpm.io/))

### Installation

1.  **Clone the repository:**

    ```sh
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add your Supabase credentials:

    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server:**

    ```sh
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## ☁️ Deployment

This project can be easily deployed to any platform that supports Node.js applications. Here are the steps for deploying to Firebase Hosting:

1.  **Build the project:**

    ```sh
    npm run build
    ```

2.  **Initialize Firebase (if you haven't already):**

    ```sh
    firebase init hosting
    ```

3.  **Deploy to Firebase:**

    ```sh
    firebase deploy --only hosting
    ```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
