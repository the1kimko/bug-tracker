import React, { useState, useEffect } from 'react';
import BugList from './BugList';
import BugForm from './BugForm';
import Button from './Button';
import useLogger from '../hooks/useLogger';
import useErrorHandler from '../hooks/useErrorHandler';

const BugDashboard = ({ user, onLogout }) => {
  const [bugs, setBugs] = useState([]);
  const [filteredBugs, setFilteredBugs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { logAction, logError } = useLogger('BugDashboard');
  const { error, handleError, clearError } = useErrorHandler();

  useEffect(() => { fetchBugs(); }, []);
  useEffect(() => { filterBugs(); }, [bugs, statusFilter]);

  const fetchBugs = async () => {
    try {
      logAction('Fetching bugs');
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bugs`);
      if (!response.ok) throw new Error('Failed to fetch bugs');
      const data = await response.json();
      setBugs(data);
    } catch (err) {
      logError(err, 'Fetching bugs');
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const filterBugs = () => {
    if (statusFilter === 'all') setFilteredBugs(bugs);
    else setFilteredBugs(bugs.filter(bug => bug.status === statusFilter));
  };

  const handleBugCreated = (newBug) => {
    setBugs([newBug, ...bugs]);
    setShowForm(false);
    logAction('Bug created', newBug.title);
  };

  const handleBugDeleted = (bugId) => {
    setBugs(bugs.filter(bug => bug.id !== bugId));
    logAction('Bug deleted', bugId);
  };

  const handleBugUpdated = (updatedBug) => {
    setBugs(bugs.map(bug => bug.id === updatedBug.id ? updatedBug : bug));
    logAction('Bug updated', updatedBug.title);
  };

  if (error) {
    return (
      <div className="alert alert-error">
        {error.message}
        <button onClick={clearError} className="btn btn-secondary btn-sm ml-4">Dismiss</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">🐛 Bug Tracker</h1>
            <p className="text-gray-600 mt-1">Welcome, {user.username || user.email}!</p>
          </div>
          <Button variant="danger" onClick={onLogout}>Logout</Button>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                data-testid="status-filter"
              >
                <option value="all">All Bugs</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <Button variant="primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? '✕ Close' : '+ Report New Bug'}
            </Button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <BugForm onBugCreated={handleBugCreated} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {/* Bug List */}
        {loading ? (
          <div className="text-center py-12"><p className="text-gray-600">Loading bugs...</p></div>
        ) : filteredBugs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No bugs found</p>
          </div>
        ) : (
          <BugList bugs={filteredBugs} onDelete={handleBugDeleted} onUpdate={handleBugUpdated} />
        )}
      </div>
    </div>
  );
};

export default BugDashboard;
