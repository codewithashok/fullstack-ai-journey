# Full Stack + Generative AI + Agentic AI Learning Roadmap

## Phase 1 — Backend Foundations ✅ (Completed)

### Step 0 — Node.js Introduction

Understand what Node.js is, how it works outside the browser, and why backend JavaScript exists.

### Step 1 — Node.js Setup

Set up a Node.js project, package.json, npm scripts, and project structure.

### Step 2 — ES Modules

Learn modern import/export syntax and the differences between ESM and CommonJS.

### Step 3 — process.argv

Build simple command-line applications using runtime arguments.

### Step 4 — File System Operations

Read, write, update, and delete files using Node.js file system APIs.

### Step 5 — CLI Mini Project

Build a practical command-line application using Node.js fundamentals.

### Step 6 — Path Module

Work with file paths safely across operating systems using the path module.

### Step 7 — HTTP Server

Create a basic web server and understand the request-response lifecycle.

### Step 8 — HTTP Methods

Learn GET, POST, PUT, PATCH, and DELETE and when to use each one.

### Step 9 — JSON Requests & Responses

Send and receive structured JSON data between clients and servers.

### Step 10 — Request Body Parsing

Parse incoming request bodies and handle user-submitted data.

### Step 11 — Introduction to Express

Build APIs faster using Express.js routing and middleware.

### Step 12 — Express Middleware & Routing

Understand middleware pipelines, route handling, and application flow.

### Step 13 — REST API CRUD

Build Create, Read, Update, and Delete APIs following REST principles.

### Step 14 — Validation with Zod

Validate incoming data using schema-based validation with Zod.

### Step 15 — Validation Middleware

Create reusable validation middleware to keep controllers clean.

### Step 16 — Layered Architecture

Separate routes, controllers, services, and business logic into layers.

### Step 17 — TypeScript Backend Setup

Configure TypeScript for Node.js, Express, and modern ESM projects.

### Step 18 — Express API Migration to TypeScript

Convert JavaScript APIs into strongly typed TypeScript applications.

### Step 19 — PostgreSQL Setup

Install PostgreSQL, pgAdmin, and create your first database.

### Step 20 — SQL CRUD

Perform Create, Read, Update, and Delete operations using SQL.

### Step 21 — Constraints and Relationships

Learn primary keys, foreign keys, constraints, and table relationships.

---

## Phase 2 — Real Database-Backed Backend 🚧

### Step 22 — Connect Express + PostgreSQL

Connect a TypeScript Express application to PostgreSQL using pg.

### Step 23 — Replace In-Memory CRUD with SQL

Replace arrays and mock data with real database queries.

### Step 24 — Environment Variables & Configuration

Manage application settings securely using .env and config files.

### Step 25 — Global Error Handling

Create centralized error handling using AppError and middleware.

### Step 26 — DTO Pattern & Strong Typing

Create DTOs and strongly typed request/response contracts.

### Step 27 — Authentication Fundamentals

Understand authentication concepts, password security, and login flows.

### Step 28 — Password Hashing (bcrypt)

Store passwords securely using hashing and comparison techniques.

### Step 29 — JWT Authentication

Generate and validate JSON Web Tokens for stateless authentication.

### Step 30 — Signup API

Create user registration APIs with validation and password hashing.

### Step 31 — Login API

Implement secure login functionality and token generation.

### Step 32 — Protected Routes

Restrict API access using authentication middleware.

### Step 33 — Role-Based Access Control (RBAC)

Allow different permissions for admins, users, and other roles.

### Step 34 — Standard API Responses

Create a consistent success and error response structure.

### Step 35 — Request Logging

Track incoming requests for debugging and monitoring.

### Step 36 — Error Logging

Capture application failures and store meaningful error logs.

### Step 37 — Repository Pattern

Introduce a data-access layer between services and databases.

### Step 38 — Pagination

Efficiently return large datasets using pagination techniques.

### Step 39 — Filtering & Sorting

Build APIs that support dynamic search, filtering, and ordering.

### Step 40 — Database Transactions

Ensure multiple database operations succeed or fail together.

---

## Phase 3 — Prisma ORM

### Step 41 — Prisma Introduction

Understand ORM concepts and why Prisma simplifies database access.

### Step 42 — Prisma Schema

Define application models and relationships using Prisma schema.

### Step 43 — Prisma Migrations

Manage database schema changes through version-controlled migrations.

### Step 44 — Models

Create and work with strongly typed database models.

### Step 45 — Relations

Handle one-to-one, one-to-many, and many-to-many relationships.

### Step 46 — CRUD with Prisma

Perform database operations using Prisma Client.

### Step 47 — Transactions

Execute safe multi-step database operations with Prisma transactions.

### Step 48 — Advanced Querying

Implement filtering, sorting, pagination, and nested queries.

---

## Phase 4 — Testing

### Step 49 — Unit Testing Fundamentals

Understand test-driven development and isolated testing concepts.

### Step 50 — Jest Setup

Configure Jest for backend testing.

### Step 51 — Mocking Dependencies

Mock databases, services, and external APIs during tests.

### Step 52 — Integration Testing

Test complete API workflows and database interactions.

### Step 53 — API Testing

Validate endpoints, authentication, and error scenarios.

---

## Phase 5 — Advanced Backend

### Step 54 — File Upload Architecture

Handle image and file uploads using Cloudinary and Multer.

### Step 55 — Email Services

Send transactional emails for registration, verification, and alerts.

### Step 56 — Redis Fundamentals

Understand in-memory caching and high-performance storage.

### Step 57 — Caching Strategies

Improve application speed using Redis caching patterns.

### Step 58 — Rate Limiting

Protect APIs against abuse and excessive traffic.

### Step 59 — Background Jobs

Process long-running tasks asynchronously using queues.

### Step 60 — WebSockets

Build real-time communication features.

### Step 61 — Swagger/OpenAPI

Generate API documentation and interactive testing tools.

---

## Phase 6 — Docker & DevOps

### Step 62 — Docker Fundamentals

Learn containers, images, volumes, and networking.

### Step 63 — Dockerize Backend

Package the backend into a portable Docker image.

### Step 64 — Docker Compose

Run backend, PostgreSQL, and Redis together locally.

### Step 65 — PostgreSQL Containers

Manage databases inside Docker environments.

### Step 66 — Environment Management

Handle configuration across local, QA, and production environments.

### Step 67 — GitHub Actions

Automate builds, tests, and deployments.

### Step 68 — CI/CD Pipelines

Implement continuous integration and deployment workflows.

### Step 69 — Cloud Deployment

Deploy backend services to production environments.

---

## Phase 7 — Advanced Next.js

### Step 70 — Next.js App Router

Build modern applications using the App Router architecture.

### Step 71 — Server Components

Understand server-side rendering and React Server Components.

### Step 72 — Server Actions

Execute backend logic directly from Next.js components.

### Step 73 — Auth.js

Implement modern authentication in Next.js applications.

### Step 74 — Full-Stack Architecture

Combine frontend, backend, database, and authentication into one system.

---

## Phase 8 — Generative AI Foundations

### Step 75 — How LLMs Work

Understand tokens, transformers, context windows, and inference.

### Step 76 — Prompt Engineering

Write prompts that produce reliable and useful AI outputs.

### Step 77 — OpenAI APIs

Integrate AI capabilities into applications using APIs.

### Step 78 — Structured Outputs

Generate predictable JSON and typed AI responses.

### Step 79 — Function Calling

Allow AI models to invoke backend tools and actions.

### Step 80 — Streaming Responses

Build ChatGPT-style real-time response experiences.

---

## Phase 9 — RAG Systems

### Step 81 — Embeddings

Convert text into vector representations for semantic search.

### Step 82 — Vector Databases

Store and search embeddings efficiently.

### Step 83 — pgvector

Use PostgreSQL as a vector database.

### Step 84 — Chunking Strategies

Split large documents into retrieval-friendly pieces.

### Step 85 — Retrieval Techniques

Fetch relevant context before AI generates answers.

### Step 86 — Hybrid Search

Combine semantic and keyword search techniques.

### Step 87 — Production RAG Architecture

Build scalable Retrieval-Augmented Generation systems.

---

## Phase 10 — LangChain

### Step 88 — LangChain Fundamentals

Understand the building blocks of AI applications.

### Step 89 — Chains

Create multi-step AI workflows.

### Step 90 — Prompts

Manage reusable prompt templates.

### Step 91 — Memory

Enable conversational context and persistence.

### Step 92 — Tools

Connect AI models to external capabilities.

### Step 93 — Agents

Allow AI systems to decide which tools to use.

---

## Phase 11 — Agentic AI

### Step 94 — LangGraph Fundamentals

Build stateful and controllable AI workflows.

### Step 95 — State Machines

Manage AI execution through explicit states.

### Step 96 — Multi-Step Workflows

Design complex agent reasoning pipelines.

### Step 97 — Tool Execution

Execute backend actions through agent decisions.

### Step 98 — Human-in-the-Loop

Add approvals and human oversight to agents.

### Step 99 — Multi-Agent Systems

Coordinate multiple specialized agents together.

---

## Phase 12 — Production AI Systems

### Step 100 — AI Observability

Monitor prompts, responses, latency, and failures.

### Step 101 — Guardrails

Protect AI systems from unsafe or incorrect outputs.

### Step 102 — Evaluation Frameworks

Measure AI quality, accuracy, and reliability.

### Step 103 — Cost Optimization

Reduce token usage and infrastructure expenses.

### Step 104 — Production Agent Platform

Design, build, and deploy enterprise-grade AI agent systems.
