// Use this to seed bugs and users

function seed({ users, bugs, userIdCounter, bugIdCounter }) {
  // Clear arrays -- ONLY for dev/in-memory!
  users.length = 0;
  bugs.length = 0;

  // Seed users
  users.push(
    {
      id: userIdCounter(),
      username: 'alice',
      email: 'alice@example.com',
      password: 'Password123',
      createdAt: new Date().toISOString()
    },
    {
      id: userIdCounter(),
      username: 'bob',
      email: 'bob@example.com',
      password: 'Password456',
      createdAt: new Date().toISOString()
    }
  );

  const now = new Date();
  // Seed bugs
  bugs.push(
    {
      id: bugIdCounter(),
      title: 'Login button not working',
      description: 'The login button does not react on click in Chrome.',
      priority: 'high',
      category: 'auth',
      status: 'open',
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      history: [
        { status: 'open', changedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString() }
      ]
    },
    {
      id: bugIdCounter(),
      title: 'API responds with 500 error',
      description: 'POST /api/bugs returns a server error when payload is missing title.',
      priority: 'medium',
      category: 'backend',
      status: 'in-progress',
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(),
      updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 / 2).toISOString(),
      history: [
        { status: 'open', changedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString() },
        { status: 'in-progress', changedAt: new Date(now.getTime() - 1000 * 60 * 60 * 18).toISOString() }
      ]
    },
    {
      id: bugIdCounter(),
      title: 'UI glitch on bug dashboard',
      description: 'Table headers misaligned on small screens.',
      priority: 'low',
      category: 'frontend',
      status: 'resolved',
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 10).toISOString(),
      updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 6).toISOString(),
      history: [
        { status: 'open', changedAt: new Date(now.getTime() - 1000 * 60 * 60 * 10).toISOString() },
        { status: 'in-progress', changedAt: new Date(now.getTime() - 1000 * 60 * 60 * 9).toISOString() },
        { status: 'resolved', changedAt: new Date(now.getTime() - 1000 * 60 * 60 * 6).toISOString() }
      ]
    }
  );
}

module.exports = seed;
