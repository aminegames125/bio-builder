# 🎨 Bio Builder

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

<br />

**The Ultimate No-Code Link-in-Bio Builder.**  
*Craft stunning, personalized bio pages in minutes with a powerful drag-and-drop interface.*

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## ✨ Overview

**Bio Builder** is a cutting-edge, open-source application designed to empower users to create beautiful, responsive, and highly functional "Link-in-Bio" pages. Whether you're a creator, influencer, business, or developer, Bio Builder provides the tools you need to aggregate your digital presence into one cohesive hub.

Built with performance and aesthetics in mind, it leverages the latest web technologies to ensure your bio page is not just a list of links, but a full-fledged experience.

> Note: The builder now uses an **MDX-first content format**.  
> JSON clients have been removed in favor of MDX.

## 🚀 Key Features

### 🎨 **Visual Drag-and-Drop Builder**
Effortlessly construct your page. Drag blocks to reorder, click to edit, and see your changes instantly with our real-time preview.

### 🧱 **Extensive Block Library**
Go beyond simple links. Our rich library of content blocks includes:
*   **Media**: 🎵 Music Players, 📹 Video Embeds, 🖼️ Image Galleries
*   **Social**: 🐦 Social Feeds, 💬 Chat Integration, 📱 Share Buttons
*   **Monetization**: 💰 Donations, 🏷️ Product Showcases, 💎 NFT Displays, 💳 Pricing Tables
*   **Utility**: 🗺️ Maps, 📅 Calendly Integration, ⏱️ Countdowns, ❓ FAQs
*   **Dev-Friendly**: 💻 Code Blocks, 🐙 GitHub Repos

### 💅 **Advanced Customization**
Make it yours. Control every pixel:
*   **Themes**: Choose from professionally designed presets or create your own.
*   **Typography**: Access a wide range of Google Fonts.
*   **Backgrounds**: Solid colors, gradients, or animated patterns.

### ⚡ **Modern Tech Stack**
*   **Framework**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
*   **Drag & Drop**: [dnd-kit](https://dndkit.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🛠️ Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

*   Node.js (v18 or higher)
*   npm, pnpm, or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/aminegames125/bio-builder.git
    cd bio-builder
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open your browser**
    Navigate to `http://localhost:5173` to start building!

## 📂 Project Structure

```
src/
├── components/      # 🧩 Reusable UI components and Blocks
│   ├── backgrounds/ # 🎨 Background pattern components
│   ├── blocks/      # 🧱 Individual content blocks (Links, Maps, etc.)
│   └── ui/          # 💅 Core UI elements (Buttons, Inputs, Modals)
├── pages/           # 📄 Route components (Builder, Preview, ClientPage)
├── utils/           # 🛠️ Helper functions, mappers, and hooks
└── App.tsx          # 🚦 Main application entry and routing
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Made with ❤️ by the Bio Builder Team</p>
</div>
