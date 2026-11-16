# Gaia Website

This repository powers our official website, where we showcase our projects and the team behind our initiatives.

## Project Structure

This website is built using [Vitepress](https://vitepress.dev) with a custom theme and [UnoCSS](https://unocss.dev) for styling. It includes static pages and dynamic project data to offer an interactive experience for visitors.

### Key Directories

- **`/`**: Contains markdown files for content (`index.md`, `about.md`, etc.) and Vue components for dynamic data.
- **`.vitepress`**: Custom configuration for Vitepress, including theme and site structure.

### Features

- **Dark Mode**: Provides a dark appearance by default for a modern, visually engaging UI.
- **Project Pages**: `projects/*.md` files carry frontmatter that the VitePress content loader turns into the projects index.

## Development Goals

You can find our current and planned tasks in the [todo.md](./todo.md) file.

### Development Environment

This project relies on the following tools and libraries:

- **Vitepress** for static site generation
- **UnoCSS** for styling and theme customization
- **SCSS** for enhanced styling capabilities

#### Installation

To get started locally:

1. **Clone the repo**:
    ```bash
    git clone https://github.com/9aia/9aia.github.io
    cd 9aia.github.io
    ```

2. **Install dependencies**:
    ```bash
    bun install
    ```

3. **Run the development server**:
    ```bash
    bun run dev
    ```

4. **Build for production**:
    ```bash
    bun run build
    ```

## Contributing

We welcome contributions that align with our mission of open-source, minimal, and tech-forward projects. The 9aia org does not run public issue or pull request queues. Please reach out via email at luisfuturist+9aia@gmail.com to coordinate.
