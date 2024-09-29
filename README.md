# IOHK Frontend UI (Pre-production)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running Locally](#running-locally)
5. [Usage](#usage)
6. [Configuration](#configuration)
7. [API Integration](#api-integration)
8. [Components](#components)
9. [Styling](#styling)
10. [Testing](#testing)
11. [Troubleshooting](#troubleshooting)
12. [Core Concepts](#core-concepts)
13. [Contributing](#contributing)
14. [Future Work](#future-work)
15. [License](#license)
16. [Contact Information](#contact-information)

## Introduction

This project is a Next.js 14 frontend application that serves as the user interface for the IOHK backend API. It utilizes the App Router, React, and TypeScript to create a modern, responsive web application for managing and visualizing user data.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18.x or later)
- [npm](https://www.npmjs.com/) (version 9.x or later)
- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or later)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 1.29 or later)
- [Make](https://www.gnu.org/software/make/) (optional, for using Makefile commands)

## Installation

1. Clone the repository and navigate to the project directory:
   ```
   git clone https://github.com/your-organization/iohk-frontend-ui-preprod.git
   cd iohk-frontend-ui-preprod
   ```

## Running Locally

To run the application locally using Docker:

1. Build the Docker images:
   ```
   make build
   ```

2. Start the Docker containers:
   ```
   make run
   ```

   This command will start the Next.js application and display the logs.

3. The application should now be running. You can access it at [http://localhost:3000](http://localhost:3000).

4. To view the logs of the running containers (this is automatically run when you run `make run`):
   ```
   make logs
   ```

5. To stop the application and all associated containers:
   ```
   make stop
   ```

Note: The application uses the `.env.local` file for configuration by default. If you need to modify any settings, you can edit this file before running `make run`.

## Usage

This project uses a Makefile to simplify common operations. For a full list of available commands, run:

```
make help
```

Here are some useful commands:

- Build the Docker images:
  ```
  make build
  ```

- Start the Docker containers:
  ```
  make run
  ```

- Stop the Docker containers:
  ```
  make stop
  ```

- View Docker logs:
  ```
  make logs
  ```

## Configuration

The application uses environment variables for configuration. These should be set in a `.env.local` file. An important variable is:

```
GRAPHQL_ENDPOINT=http://localhost:8080/query
```

## API Integration

This frontend application integrates with the IOHK Golang Backend API. The API calls are made using the `fetch` function in the `app/api/users/route.ts` file. GraphQL queries are used to fetch user data.

## Components

Key components include:

- `LandingPage`: The main entry point of the application, displaying an overview and navigation options (`components/landing-page.tsx`)
- `Users`: Displays user data in a table format (`components/users/users.tsx`)
- `UsersOverview`: Provides a context for managing user data state (`components/users-overview/users-overview.tsx`)

## Styling

The application uses Tailwind CSS for styling. Global styles are defined in `app/globals.css`.

## Testing

To run the test suite:

```
npm test
```

To run tests with coverage:

```
npm run test:coverage
```

## Troubleshooting

- If you encounter issues with Docker, ensure that the Docker daemon is running on your machine.
- If you see API connection errors, check that the backend application is running and that your `.env.local` file has the correct `GRAPHQL_ENDPOINT` value.
- For any Next.js or React-related issues, ensure that your Node.js version is compatible with the one specified in the `package.json` file.

## Core Concepts

This project is built on top of several core concepts, including:

- Next.js 14 App Router
- React
- TypeScript
- Tailwind CSS
- Docker

The application follows a component-based architecture using React and Next.js. It uses the App Router for routing and server-side rendering capabilities.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please adhere to the existing code style and include appropriate tests for new features.

## Future Work

- Deployment instructions for AWS and Vercel will be added in future updates.
- Additional features and optimizations are planned for upcoming releases.

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) file for details.

## Contact Information

For support or questions, please feel free to contact me at [joshwillems.cv@gmail.com](mailto:joshwillems.cv@gmail.com).

# Project Setup

## Environment Variables

The project uses different environment files for local development and production:

- `.env.local`: Used for local development (committed to the repository)
- `.env.production`: Used for production Docker setup (committed to the repository)

To set up your environment:

1. For local development (running with `npm run dev`), use `.env.local`:
   ```
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:8080/query
   ```

2. For Docker environments (including production), use `.env.production`:
   ```
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://host.docker.internal:8080/query
   ```

The application will automatically use the appropriate environment file based on the context (local development or Docker).
