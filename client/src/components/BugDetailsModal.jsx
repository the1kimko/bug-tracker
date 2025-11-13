import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import Button from './Button';
import useErrorHandler from '../hooks/useErrorHandler';

const BugDetailsModal = ({ bug, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState(bug.status);
  const [saving, setSaving] = useState(false);
  const { error, handleError, clearError } = useErrorHandler();

  const handleUpdateStatus = async () => {
    clearError();
    try {
      setSaving(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bugs/${bug.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update bug status');
      const updated = await response.json();
      if (onUpdate) onUpdate(updated);
      setIsEditing(false);
    } catch (err) {
      handleError(err);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{bug.title}</h2>
          <button onClick={onClose} className="modal-close" aria-label="Close">&#10005;</button>
        </div>

        <div className="modal-body">
          {error && (
            <div className="alert alert-error mb-2 flex items-center justify-between">
              {error.message}
              <Button size="sm" variant="secondary" onClick={clearError}>Dismiss</Button>
            </div>
          )}

          <p className="text-gray-700">{bug.description}</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Status</p>
              <StatusBadge status={bug.status} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Priority</p>
              <PriorityBadge priority={bug.priority} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Created</p>
              <p className="text-gray-700">{formatDate(bug.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Updated</p>
              <p className="text-gray-700">{formatDate(bug.updatedAt)}</p>
            </div>
          </div>
          {isEditing ? (
            <div className="space-y-2 p-4 bg-gray-50 rounded mt-4">
              <select
                value={newStatus}
                onChange={e => setNewStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <div className="flex gap-2 mt-2">
                <Button onClick={handleUpdateStatus} disabled={saving} variant="primary" size="sm">
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="secondary" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="primary" size="sm" className="mt-4">
              Edit Status
            </Button>
          )}
        </div>

        <div className="modal-footer">
          <Button onClick={onClose} variant="secondary" className="w-full">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BugDetailsModal;
