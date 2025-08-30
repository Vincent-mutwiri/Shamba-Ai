# Supabase CLI

[![Coverage Status](https://coveralls.io/repos/github/supabase/cli/badge.svg?branch=main)](https://coveralls.io/github/supabase/cli?branch=main) [![Bitbucket Pipelines](https://img.shields.io/bitbucket/pipelines/supabase-cli/setup-cli/master?style=flat-square&label=Bitbucket%20Canary)](https://bitbucket.org/supabase-cli/setup-cli/pipelines) [![Gitlab Pipeline Status](https://img.shields.io/gitlab/pipeline-status/sweatybridge%2Fsetup-cli?label=Gitlab%20Canary)
](https://gitlab.com/sweatybridge/setup-cli/-/pipelines)

[Supabase](https://supabase.io) is an open source Firebase alternative. We're building the features of Firebase using enterprise-grade open source tools.

This repository contains all the functionality for Supabase CLI.

- [x] Running Supabase locally
- [x] Managing database migrations
- [x] Creating and deploying Supabase Functions
- [x] Generating types directly from your database schema
- [x] Making authenticated HTTP requests to [Management API](https://supabase.com/docs/reference/api/introduction)

## Getting started

### Install the CLI

Available via [NPM](https://www.npmjs.com) as dev dependency. To install:

```bash
npm i supabase --save-dev
```

To install the beta release channel:

```bash
npm i supabase@beta --save-dev
```

When installing with yarn 4, you need to disable experimental fetch with the following nodejs config.

```
NODE_OPTIONS=--no-experimental-fetch yarn add supabase
```

> **Note**
For Bun versions below v1.0.17, you must add `supabase` as a [trusted dependency](https://bun.sh/guides/install/trusted) before running `bun add -D supabase`.

<details>
  <summary><b>macOS</b></summary>

  Available via [Homebrew](https://brew.sh). To install:

  ```sh
  brew install supabase/tap/supabase
  ```

  To install the beta release channel:
  
  ```sh
  brew install supabase/tap/supabase-beta
  brew link --overwrite supabase-beta
  ```
  
  To upgrade:

  ```sh
  brew upgrade supabase
  ```
</details>

<details>
  <summary><b>Windows</b></summary>

  Available via [Scoop](https://scoop.sh). To install:

  ```powershell
  scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
  scoop install supabase
  ```

  To upgrade:

  ```powershell
  scoop update supabase
  ```
</details>

<details>
  <summary><b>Linux</b></summary>

  Available via [Homebrew](https://brew.sh) and Linux packages.

  #### via Homebrew

  To install:

<<<<<<< HEAD
  ```sh
  brew install supabase/tap/supabase
  ```

  To upgrade:
=======
>>>>>>> 50c25283df0d13df3b64e4d8973b684c441263a1

  ```sh
  brew upgrade supabase
  ```

  #### via Linux packages

  Linux packages are provided in [Releases](https://github.com/supabase/cli/releases). To install, download the `.apk`/`.deb`/`.rpm`/`.pkg.tar.zst` file depending on your package manager and run the respective commands.

  ```sh
  sudo apk add --allow-untrusted <...>.apk
  ```

  ```sh
  sudo dpkg -i <...>.deb
  ```

  ```sh
  sudo rpm -i <...>.rpm
  ```

  ```sh
  sudo pacman -U <...>.pkg.tar.zst
  ```
</details>

<details>
  <summary><b>Other Platforms</b></summary>

  You can also install the CLI via [go modules](https://go.dev/ref/mod#go-install) without the help of package managers.

  ```sh
  go install github.com/supabase/cli@latest
  ```

  Add a symlink to the binary in `$PATH` for easier access:

  ```sh
  ln -s "$(go env GOPATH)/bin/cli" /usr/bin/supabase
  ```

  This works on other non-standard Linux distros.
</details>

<details>
  <summary><b>Community Maintained Packages</b></summary>

  Available via [pkgx](https://pkgx.sh/). Package script [here](https://github.com/pkgxdev/pantry/blob/main/projects/supabase.com/cli/package.yml).
  To install in your working directory:

  ```bash
  pkgx install supabase
  ```

  Available via [Nixpkgs](https://nixos.org/). Package script [here](https://github.com/NixOS/nixpkgs/blob/master/pkgs/development/tools/supabase-cli/default.nix).
</details>

### Run the CLI

```bash
supabase bootstrap
```

Or using npx:

```bash
npx supabase bootstrap
```

The bootstrap command will guide you through the process of setting up a Supabase project using one of the [starter](https://github.com/supabase-community/supabase-samples/blob/main/samples.json) templates.

## Docs

<<<<<<< HEAD
Command & config reference can be found [here](https://supabase.com/docs/reference/cli/about).
=======
- **Node.js**: v18.0.0 or later (v20+ recommended for best performance)
- **Package Manager**: npm v9+ or Bun v1.0.2+
- **Supabase Account**: Free tier sufficient for development
>>>>>>> 50c25283df0d13df3b64e4d8973b684c441263a1

## Breaking changes

We follow semantic versioning for changes that directly impact CLI commands, flags, and configurations.

However, due to dependencies on other service images, we cannot guarantee that schema migrations, seed.sql, and generated types will always work for the same CLI major version. If you need such guarantees, we encourage you to pin a specific version of CLI in package.json.

## Developing

To run from source:

```sh
# Go >= 1.22
go run . help
```
<<<<<<< HEAD
=======

### Building for Production

```sh
# Generate optimized production build
npm run build

# Preview the production build locally
npm run preview
```

## Deployment Options

### Vercel Deployment (Recommended)

1. Fork this repository to your GitHub account
2. Connect your Vercel account to GitHub
3. Import the repository in Vercel dashboard
4. Configure environment variables
5. Deploy with default settings

### Traditional Hosting

1. Build the project: `npm run build`
2. Upload the contents of the `dist` folder to your web server
3. Configure your server to handle SPA routing (redirect 404s to index.html)

## Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Maps Configuration
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# API Configuration
VITE_API_BASE_URL=https://api.weatherapi.com/v1
VITE_WEATHER_API_KEY=

# Feature Flags
VITE_ENABLE_OFFLINE_MODE=true
VITE_ENABLE_ANALYTICS=false
```

## Project Structure

```text
agri-senti-webapp/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # Base UI components from shadcn
│   │   └── ...           # Feature-specific components
│   ├── contexts/         # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── integrations/     # Third-party service integrations
│   ├── lib/              # Utility functions and helpers
│   ├── pages/            # Page components
│   └── main.tsx          # Application entry point
├── .env.example          # Example environment variables
└── package.json          # Project dependencies and scripts
```

## Asset Management

The project includes various assets organized by type:

### Images

Located in `public/assets/images/`:

- **agri-banner.png** - Main banner for the AgriSenti application
- **crop-assistant.png** - Illustration for the Crop Assistant feature
- **disease-detection.png** - Illustration for the Disease Detection feature
- **market-dashboard.png** - Illustration for the Market Dashboard feature
- **weather-monitoring.png** - Illustration for the Weather Monitoring feature
- **interactive-maps.png** - Illustration for the Interactive Maps feature

### Icons

Located in `public/assets/icons/`:

- **agri-logo.png** - Official AgriSenti logo

### Root Assets

Located in the `public/` directory:

- **favicon.ico** - Website favicon based on the AgriSenti logo
- **agri.png** - Main AgriSenti logo image used for social media sharing

## Contributing

We welcome contributions to the AgriSenti project! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add some amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. Submit a **Pull Request**

### Development Guidelines

- Follow the established code style and organization
- Write meaningful commit messages
- Include documentation for new features
- Add or update tests as needed
- Ensure all tests pass before submitting PR

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Kenya Agricultural and Livestock Research Organization (KALRO)** for domain expertise and data validation
- **Local Farmer Cooperatives** for user testing and feedback
- **Kenya Meteorological Department** for weather data integration
- **The Agriculture and Food Authority (AFA)** for market price data

## Meet Our Team

The AgriSenti project is developed and maintained by a dedicated team with expertise in educational technology, AI systems, and user experience design:

- **Vincent Mutwiri** - CEO  
  Visionary leader with extensive experience in educational technology and family-centered solutions

- **Raphael Gitari** - CTO  
  Technical architect specializing in AI systems and scalable educational platforms

- **Ivy Tanui** - User Experience Lead  
  UX expert focused on creating intuitive, family-friendly interfaces that make learning accessible

- **Natalie Mumbi** - User Experience Lead  
  UX expert focused on creating intuitive, family-friendly interfaces that make learning accessible
- **Emmanuel Ngugi** - User Experience Lead  
  UX expert focused on creating intuitive, family-friendly interfaces that make learning accessible

  - **Ivy Tanui** - User Experience Lead  
  UX expert focused on creating intuitive, family-friendly interfaces that make learning accessible

Our diverse team brings together experience in educational technology, AI systems, user experience design, and family-centered solutions to create a platform that empowers farmers through accessible and intuitive technology.
>>>>>>> 50c25283df0d13df3b64e4d8973b684c441263a1
