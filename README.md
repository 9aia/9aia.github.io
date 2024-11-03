# NeoGaia Lab's Website

This repository powers our official website, where we showcase our projects and the team behind our initiatives.

## Project Structure

This website is built using [Vitepress](https://vitepress.dev) with a custom theme and [UnoCSS](https://unocss.dev) for styling. It includes static pages and dynamic project data to offer an interactive experience for visitors.

### Key Directories

- **`/src`**: Contains markdown files for content (`index.md`, `about.md`, etc.) and Vue components for dynamic data.
- **`.vitepress`**: Custom configuration for Vitepress, including theme and site structure.

### Features

- **Dark Mode**: Provides a dark appearance by default for a modern, visually engaging UI.
- **GitHub Integration**: Pulls data from GitHub repositories to display our latest projects.

## Development Goals

You can find our current and planned tasks in the [TODO.md](./TODO.md) file.

### Development Environment

This project relies on the following tools and libraries:

- **Vitepress** for static site generation
- **UnoCSS** for styling and theme customization
- **SCSS** for enhanced styling capabilities
- **Axios** for making HTTP requests, especially for GitHub API integration (upcoming) to fetch repository data

#### Installation

To get started locally:

1. **Clone the repo**:
    ```bash
    git clone https://github.com/neogaialab/neogaialab.github.io
    cd neogaialab.github.io
    ```

2. **Install dependencies**:
    ```bash
    pnpm install
    ```

3. **Run the development server**:
    ```bash
    pnpm dev
    ```

4. **Build for production**:
    ```bash
    pnpm build
    ```

## Contributing

We welcome contributions that align with our mission of open-source, minimal, and tech-forward projects. Please feel free to submit issues, feature requests, or pull requests.
