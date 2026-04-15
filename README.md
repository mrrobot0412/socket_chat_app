# Socket Chat App

A real-time chat application built with the MERN stack and Socket.IO. The current codebase already supports authentication, direct messaging, group chats, typing indicators, and notifications, but it is still at a basic project level. The goal of this repository is to evolve it into a stronger, production-oriented chat system that is worth showcasing on a resume.

This repository preserves prior contributor history in git and is being actively improved from a basic tutorial-style application into a more polished, secure, and system-design-aware project.

## Current State

Today the app supports:

- user signup and login
- one-to-one chats
- group chat creation and updates
- real-time messaging with Socket.IO
- typing indicators
- basic notifications
- avatar upload support

Recent improvements already made in this repo:

- removed hardcoded third-party Cloudinary account usage and moved it to environment-based configuration
- added `.env.example` for safer local setup
- fixed backend authorization gaps for chat access, message access, and group administration
- stopped exposing password hashes from user search responses
- improved socket authentication by tying connections to JWT-based identity
- cleaned up branding, sample data, and placeholder content
- stabilized some frontend state handling around search, notifications, and socket listeners

## Tech Stack

**Frontend**

- React 17
- Chakra UI
- Axios
- Socket.IO Client

**Backend**

- Node.js
- Express
- Mongoose
- JWT authentication
- Socket.IO

**Database**

- MongoDB Atlas

## Local Setup

Clone the project:

```bash
git clone <your-repository-url>
cd socket_chat_app
```

Install dependencies:

```bash
npm install
cd frontend
npm install
```

Create your environment file from [`.env.example`](/Users/amankapoor/socket_chat_app/.env.example:1).

Required variables:

- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `REACT_APP_SOCKET_ENDPOINT`
- `REACT_APP_CLOUDINARY_CLOUD_NAME`
- `REACT_APP_CLOUDINARY_UPLOAD_PRESET`

Start the backend:

```bash
npm run start
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm start
```

Frontend runs on `http://localhost:3000` and the backend runs on `http://localhost:5000`.

## Why This Project Needs Another Pass

In its current form, this is still a basic chat application. It works, but it does not yet demonstrate the kind of engineering depth that makes a project strong on a resume. To get there, the app should show clear improvements in four areas:

- frontend quality
- backend robustness
- security and production readiness
- system design and scalability thinking

## Improvement Roadmap

### 1. Frontend Improvements

The UI currently works, but it still feels like an early-stage project. To make it feel more polished:

- redesign the auth flow and chat layout with a more intentional visual identity
- improve mobile responsiveness for the chat list and chat detail panels
- add stronger empty states, loading states, and recoverable error states
- improve message composer UX with attachments, emoji support, and disabled/send states
- add chat previews, unread count styling, and better notification handling
- improve accessibility with keyboard flows, focus states, and ARIA-friendly controls

### 2. Backend Improvements

The backend should move from “works locally” to “structured like a real service”:

- add request validation for auth, chat, and message payloads
- introduce a service layer or clearer controller/service separation
- add pagination for messages and chat history
- implement better query performance with indexes
- add health and readiness endpoints
- introduce structured error handling and logging

### 3. Security Improvements

This is one of the highest-value resume upgrades because it shows engineering maturity:

- rotate all previously exposed secrets and remove old live credentials from local use
- add rate limiting on auth, chat, and message endpoints
- add `helmet` and explicit CORS configuration
- validate and sanitize all incoming user input
- add stronger password requirements
- move toward more secure token/session handling if the threat model requires it
- add audit logging for sensitive actions like group admin changes

### 4. Production Readiness

To make this project feel deployable instead of demo-only:

- add Docker support for backend and frontend
- add a production deployment guide
- add CI checks for build, lint, and tests
- separate development and production configuration cleanly
- add monitoring and error tracking
- document environment variables, startup flow, and deployment assumptions

## Feature Additions Worth Building

These are the features that would materially increase the project’s value:

### Messaging Features

- message delivery state: sent, delivered, read
- message reactions
- replies and threaded conversations
- message editing and deletion
- file and image attachments
- voice notes
- chat search and message search

### Collaboration Features

- online and offline presence
- last seen timestamps
- pinned messages
- chat mute controls
- chat roles and permissions for groups
- invite links for group chats

### User Features

- profile editing
- avatar cropping before upload
- status message or availability text
- account verification or password reset

### Advanced Product Features

- push notifications
- message translation
- moderation tools for group admins
- admin dashboard
- analytics on active users, message volume, and engagement

## System Design Upgrades That Make This Resume-Grade

This is where the project becomes much stronger. A chat app is a good candidate for demonstrating practical system design.

### Real-Time Architecture

- move from a single-process Socket.IO deployment to a horizontally scalable setup
- use Redis as a Socket.IO adapter so multiple Node instances can share room and event state
- track presence in Redis instead of in-process memory

### Data Modeling and Query Design

- add indexes for hot paths like user lookup, chat membership, and message retrieval
- paginate messages using cursor-based pagination instead of loading full history
- separate message metadata from message content if needed for scale

### Reliability and Observability

- add structured logs for API requests, auth events, and socket events
- add health checks for app and database readiness
- add metrics around active sockets, message throughput, and failed requests
- add centralized error monitoring

### Background Processing

- offload expensive operations like media processing, notification fanout, and analytics aggregation
- introduce a job queue for tasks that do not need to block requests

### Security Architecture

- formalize auth boundaries between HTTP routes and socket connections
- enforce authorization checks consistently at the data boundary
- add abuse controls such as rate limiting, spam throttling, and request validation

## Suggested Phased Plan

### Phase 1: Solidify the Core

- improve the frontend layout and responsiveness
- add request validation
- add rate limiting and security middleware
- clean up environment handling
- add backend and frontend smoke tests

### Phase 2: Add High-Value Features

- presence and last seen
- read receipts
- message pagination
- file upload improvements
- search

### Phase 3: Add System Design Depth

- Redis for socket scaling and presence
- structured logging
- health checks and metrics
- background job processing
- Docker and CI/CD

### Phase 4: Productionize

- deploy frontend and backend cleanly
- lock down CORS and secrets
- add monitoring and alerts
- write deployment and architecture documentation

## Resume Value

If the roadmap above is implemented properly, this project can demonstrate:

- real-time application design
- authentication and authorization
- backend API design
- production readiness
- performance and scalability thinking
- frontend UX improvement work
- system design beyond CRUD-level applications

That combination is much stronger than simply showing “I built a chat app.”

## Recommended Next Steps

If the goal is to make this project resume-worthy, the highest-value next tasks are:

1. redesign the frontend chat experience so the product looks intentional
2. add validation, rate limiting, and logging on the backend
3. implement message pagination and read receipts
4. add Redis-backed presence and scalable socket architecture
5. containerize and document deployment

## Related Docs

- [SYSTEM_DESIGN_ROADMAP.md](/Users/amankapoor/socket_chat_app/SYSTEM_DESIGN_ROADMAP.md:1)

## Attribution

Repository history includes prior contributors and is intentionally preserved in git.
