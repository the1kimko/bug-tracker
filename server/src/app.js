const express = require('express');
const cors = require('cors');
const seed = require('../seed');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// In-memory data storage
const users = [];
const bugs = [];
let userIdCounter = 1;
let bugIdCounter = 1;


function getNextUserId() { return userIdCounter++; }
function getNextBugId() { return bugIdCounter++; }
seed({ users, bugs, userIdCounter: getNextUserId, bugIdCounter: getNextBugId });

// Routes
app.post('/api/auth/register', (req, res) => {
  try {
    console.log('Register attempt:', req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = {
      id: userIdCounter++,
      username,
      email,
      password,
      createdAt: new Date().toISOString()
    };

    users.push(user);
    console.log('User registered:', user.id);

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token: `token-${user.id}`
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token: `token-${user.id}`
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/bugs', (req, res) => {
  try {
    const { title, description, priority = 'medium' } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const bug = {
      id: bugIdCounter++,
      title,
      description,
      priority,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [{ status: 'open', changedAt: new Date().toISOString() }]
    };

    bugs.push(bug);
    console.log('Bug created:', bug.id);

    res.status(201).json(bug);
  } catch (error) {
    console.error('Create bug error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/bugs', (req, res) => {
  try {
    const { status } = req.query;
    let filtered = [...bugs];

    // Filter by status
    if (status && status !== 'all') {
      filtered = filtered.filter(b => b.status === status);
    }

    // Sort
    // filtered.sort((a, b) => {
    //   const aVal = a[sortBy];
    //   const bVal = b[sortBy];
    //   const order = sortOrder === 'asc' ? 1 : -1;
    //   return aVal > bVal ? order : -order;
    // });

    console.log('Returning', filtered.length, 'bugs');
    res.status(200).json(filtered);
  } catch (error) {
    console.error('Fetch bugs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/bugs/:id', (req, res) => {
  try {
    const bug = bugs.find(b => b.id === parseInt(req.params.id));

    if (!bug) {
      return res.status(404).json({ error: 'Bug not found' });
    }

    res.status(200).json(bug);
  } catch (error) {
    console.error('Fetch bug error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/bugs/:id', (req, res) => {
  try {
    const bug = bugs.find(b => b.id === parseInt(req.params.id));

    if (!bug) {
      return res.status(404).json({ error: 'Bug not found' });
    }

    // Update fields
    if (req.body.title) bug.title = req.body.title;
    if (req.body.description) bug.description = req.body.description;
    if (req.body.priority) bug.priority = req.body.priority;
    if (req.body.category) bug.category = req.body.category;

    // Update status and add to history
    if (req.body.status && req.body.status !== bug.status) {
      bug.status = req.body.status;
      bug.history.push({
        status: req.body.status,
        changedAt: new Date().toISOString()
      });
    }

    bug.updatedAt = new Date().toISOString();
    console.log('Bug updated:', bug.id);

    res.status(200).json(bug);
  } catch (error) {
    console.error('Update bug error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/bugs/:id', (req, res) => {
  try {
    const index = bugs.findIndex(b => b.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({ error: 'Bug not found' });
    }

    const deleted = bugs.splice(index, 1);
    console.log('Bug deleted:', deleted.id);

    res.status(200).json({ message: 'Bug deleted', bug: deleted });
  } catch (error) {
    console.error('Delete bug error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
