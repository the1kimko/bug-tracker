# MERN Bug Tracker - Week 6 Testing & Debugging Project

A comprehensive MERN Stack application demonstrating unit testing, integration testing, end-to-end testing, and debugging best practices.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Testing Strategy](#testing-strategy)
- [Debugging Techniques](#debugging-techniques)
- [Test Coverage](#test-coverage)
- [Common Issues & Solutions](#common-issues--solutions)

## Overview

This Bug Tracker application is built as an educational project to demonstrate comprehensive testing and debugging strategies in a full-stack MERN application. Users can report, track, and resolve bugs while the application showcases proper testing methodologies across both frontend and backend.

## Features

### Bug Management
- **Report Bugs**: Create new bug reports with title, description, priority, and category
- **Track Status**: Update bug status through Open → In-Progress → Resolved workflow
- **Manage Bugs**: Edit and delete bug reports
- **Filter & Sort**: Filter by status and sort by creation date or priority
- **Bug History**: Track all status changes with timestamps

### User Management
- **Authentication**: Simple login/register system
- **User Roles**: Support for bug reporters and reviewers
- **Session Management**: User session persistence

### Testing Features
- **Unit Tests**: Component and function isolation tests
- **Integration Tests**: API and database interaction tests
- **End-to-End Tests**: Full user workflow testing
- **Error Boundaries**: React error boundary implementation
- **Test Coverage**: Monitor test coverage metrics

### Debugging Features
- **Console Logs**: Strategic logging for tracking execution flow
- **Chrome DevTools Integration**: Network and DOM inspection
- **Error Stack Traces**: Detailed error information
- **Performance Metrics**: Track API calls and timing
- **Debugging Panel**: Visual display of logs and network requests

## Tech Stack

### Frontend
- **React 18**: UI library with hooks
- **React Testing Library**: Component testing
- **Jest**: Testing framework
- **CSS Modules**: Styling

### Backend
- **Node.js & Express**: Server framework
- **MongoDB**: Database (uses mock in-memory for demo)
- **Supertest**: API testing
- **Jest**: Testing framework

### Testing & Debugging
- **Jest**: Unit and integration testing
- **Supertest**: HTTP assertion library
- **React Testing Library**: Component testing utilities
- **Cypress**: End-to-end testing
- **Chrome DevTools**: Browser debugging

## Installation

### Prerequisites
- Node.js v16 or higher
- npm or yarn
- MongoDB (for production, demo uses in-memory database)

### Steps

```bash
# Clone the repository
git clone <repository-url>
cd mern-bug-tracker

# Install dependencies (root level)
npm run install-all

# Install dependencies separately if needed
cd server && npm install
cd ../client && npm install
```

### Setup Environment Variables

**Server (.env)**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bug-tracker
JWT_SECRET=your_jwt_secret_key
```

**Client (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Project Structure

```
mern-bug-tracker/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/             # React components
│   │   │   ├── AuthForm.jsx
│   │   │   ├── BugForm.jsx
│   │   │   ├── BugList.jsx
│   │   │   ├── BugDetails.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   └── ErrorBoundary.jsx
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useBugs.js
│   │   │   └── useForm.js
│   │   ├── services/               # API services
│   │   │   ├── authService.js
│   │   │   ├── bugService.js
│   │   │   └── apiClient.js
│   │   ├── tests/                  # Test files
│   │   │   ├── unit/
│   │   │   │   ├── Button.test.jsx
│   │   │   │   ├── BugForm.test.jsx
│   │   │   │   ├── StatusBadge.test.jsx
│   │   │   │   └── hooks.test.js
│   │   │   ├── integration/
│   │   │   │   ├── BugList.integration.test.jsx
│   │   │   │   ├── AuthFlow.integration.test.jsx
│   │   │   │   └── formSubmission.test.jsx
│   │   │   └── setup.js            # Test configuration
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
├── server/                          # Express backend
│   ├── src/
│   │   ├── controllers/            # Route controllers
│   │   │   ├── authController.js
│   │   │   ├── bugController.js
│   │   │   └── userController.js
│   │   ├── models/                 # Database models
│   │   │   ├── User.js
│   │   │   └── Bug.js
│   │   ├── routes/                 # API routes
│   │   │   ├── auth.js
│   │   │   ├── bugs.js
│   │   │   └── users.js
│   │   ├── middleware/             # Express middleware
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   ├── utils/                  # Utility functions
│   │   │   ├── validators.js
│   │   │   ├── logger.js
│   │   │   └── auth.js
│   │   ├── tests/                  # Test files
│   │   │   ├── unit/
│   │   │   │   ├── validators.test.js
│   │   │   │   ├── bugModel.test.js
│   │   │   │   └── authUtils.test.js
│   │   │   ├── integration/
│   │   │   │   ├── auth.test.js
│   │   │   │   ├── bugs.test.js
│   │   │   │   └── errorHandling.test.js
│   │   │   └── setup.js            # Test configuration
│   │   └── app.js                  # Express app configuration
│   ├── server.js                   # Entry point
│   └── package.json
│
├── cypress/                         # End-to-end tests
│   ├── e2e/
│   │   ├── auth.cy.js
│   │   ├── bugManagement.cy.js
│   │   └── userWorkflow.cy.js
│   └── cypress.config.js
│
├── jest.config.js                  # Jest configuration
├── package.json                    # Root package.json
└── README.md                       # This file
```

## Running the Application

### Development Mode

```bash
# Run both client and server concurrently
npm run dev

# Run server only
cd server && npm start

# Run client only
cd client && npm start
```

### Production Mode

```bash
# Build client
cd client && npm run build

# Start server (will serve built client)
cd server && npm start
```

## Testing Strategy

### Unit Testing

Unit tests focus on testing individual functions, components, and utilities in isolation.

**Frontend Unit Tests**
```bash
# Run all unit tests
npm run test:unit

# Run specific test file
npm test -- Button.test.jsx

# Run with coverage
npm test -- --coverage
```

**Example Unit Test (Button Component)**
```javascript
// client/src/tests/unit/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

**Backend Unit Tests**
```bash
cd server && npm run test:unit
```

**Example Unit Test (Validator Function)**
```javascript
// server/src/tests/unit/validators.test.js
const { validateEmail, validatePassword } = require('../../utils/validators');

describe('Validators', () => {
  describe('validateEmail', () => {
    it('returns true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('returns false for invalid email', () => {
      expect(validateEmail('invalid.email')).toBe(false);
    });
  });
});
```

### Integration Testing

Integration tests verify that multiple components work together correctly.

**Frontend Integration Tests**
```bash
npm run test:integration
```

**Example Integration Test (Bug Creation Flow)**
```javascript
// client/src/tests/integration/BugForm.integration.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BugForm from '../../components/BugForm';
import * as bugService from '../../services/bugService';

jest.mock('../../services/bugService');

describe('Bug Form Integration', () => {
  it('creates a bug and updates the list', async () => {
    bugService.createBug.mockResolvedValue({ id: 1, title: 'Test Bug' });

    render(<BugForm onBugCreated={jest.fn()} />);

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'Test Bug' } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(bugService.createBug).toHaveBeenCalled();
    });
  });
});
```

**Backend Integration Tests (Supertest)**
```bash
cd server && npm run test:integration
```

**Example Integration Test (API Endpoint)**
```javascript
// server/src/tests/integration/bugs.test.js
const request = require('supertest');
const app = require('../../app');

describe('POST /api/bugs', () => {
  it('should create a new bug with valid data', async () => {
    const newBug = {
      title: 'New Bug',
      description: 'Bug description',
      priority: 'high'
    };

    const res = await request(app)
      .post('/api/bugs')
      .send(newBug);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe(newBug.title);
  });

  it('should return 400 with invalid data', async () => {
    const invalidBug = { priority: 'high' }; // Missing title

    const res = await request(app)
      .post('/api/bugs')
      .send(invalidBug);

    expect(res.status).toBe(400);
  });
});
```

### End-to-End Testing

End-to-end tests verify complete user workflows.

**Running E2E Tests**
```bash
# Open Cypress UI
npm run cypress:open

# Run all E2E tests headless
npm run cypress:run
```

**Example E2E Test**
```javascript
// cypress/e2e/bugManagement.cy.js
describe('Bug Management Workflow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.login('testuser', 'password123');
  });

  it('should create, edit, and delete a bug', () => {
    // Create bug
    cy.contains('Report New Bug').click();
    cy.get('[name="title"]').type('Test Bug');
    cy.get('[name="description"]').type('Test Description');
    cy.contains('Submit').click();
    cy.contains('Test Bug').should('be.visible');

    // Edit bug
    cy.contains('Edit').click();
    cy.get('[name="status"]').select('in-progress');
    cy.contains('Save').click();

    // Verify status updated
    cy.contains('In Progress').should('be.visible');

    // Delete bug
    cy.contains('Delete').click();
    cy.contains('Confirm').click();
    cy.contains('Test Bug').should('not.exist');
  });
});
```

## Debugging Techniques

### 1. Console Logging

Use strategic console logs to track execution flow:

```javascript
// Example in component
const BugList = () => {
  console.log('BugList component mounted');

  useEffect(() => {
    console.log('Fetching bugs...');
    fetchBugs().then(bugs => {
      console.log('Bugs fetched:', bugs);
    });
  }, []);
};
```

### 2. Chrome DevTools

**Inspect Network Requests**
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Perform API calls
4. Click on request to view headers, payload, response

**Inspect Component State**
1. Install React Developer Tools extension
2. Go to Components tab in DevTools
3. Select component to inspect props and state
4. Edit state directly to test changes

**Set Breakpoints in Sources Tab**
1. Go to Sources tab
2. Click line number to set breakpoint
3. Code execution pauses at breakpoint
4. Inspect variables in console
5. Step through code with Step Over (F10) or Step Into (F11)

### 3. Error Boundaries

Error boundaries catch React component errors:

```javascript
// client/src/components/ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### 4. Node.js Debugging

**Debug Server with Node Inspector**
```bash
# Start server with debugging enabled
node --inspect server.js

# In Chrome, navigate to: chrome://inspect
```

**Debug Specific Test**
```bash
# Run single test with debugging
node --inspect-brk node_modules/.bin/jest bugs.test.js
```

### 5. Express Middleware Error Handling

```javascript
// server/src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Register at end of all routes
app.use(errorHandler);
```

### 6. Custom Logging Utility

```javascript
// server/src/utils/logger.js
const logger = {
  info: (message, data) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data || '');
  },
  error: (message, error) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
  },
  debug: (message, data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, data || '');
    }
  }
};

module.exports = logger;
```

## Best Practices

### Testing Best Practices
- ✅ Test user behavior, not implementation
- ✅ Keep tests focused and independent
- ✅ Use meaningful test descriptions
- ✅ Mock external dependencies
- ✅ Avoid hardcoding test data
- ✅ Test error cases, not just happy paths
- ✅ Aim for high coverage on critical paths

### Debugging Best Practices
- ✅ Use console logs strategically
- ✅ Learn keyboard shortcuts for DevTools
- ✅ Break code into functions for easier debugging
- ✅ Use error boundaries in React
- ✅ Log errors with context
- ✅ Use debugger statements sparingly
- ✅ Keep source maps for production

### Code Organization
- ✅ Separate concerns (models, views, controllers)
- ✅ Keep functions small and focused
- ✅ Use meaningful variable names
- ✅ Add comments for complex logic
- ✅ Handle errors gracefully
- ✅ Validate user input
- ✅ Use environment variables for config

## Submission Checklist

- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] All E2E tests passing
- [ ] Code coverage above 70%
- [ ] Error handling implemented
- [ ] Debugging techniques demonstrated
- [ ] README.md completed
- [ ] Code committed to GitHub
- [ ] Test coverage report generated
- [ ] Screenshots of test results included

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Cypress Documentation](https://docs.cypress.io/)
- [Express Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [Chrome DevTools Guide](https://developer.chrome.com/docs/devtools/)

## Support

For questions or issues, please open an issue on the GitHub repository.

## License

MIT License - See LICENSE file for details
