import React, { useState } from 'react';
import BugDetailsModal from './BugDetailsModal';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import Button from './Button';
import useErrorHandler from '../hooks/useErrorHandler';

const BugRow = ({ bug, onDelete, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { error, handleError, clearError } = useErrorHandler();

  const handleDelete = async () => {
    clearError();
    if (!window.confirm('Are you sure you want to delete this bug?')) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bugs/${bug.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete bug');
      if (onDelete) onDelete(bug.id);
    } catch (err) {
      handleError(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <>
      {error && (
        <tr>
          <td colSpan={5}>
            <div className="alert alert-error mb-2 flex items-center justify-between">
              {error.message}
              <Button size="sm" variant="secondary" onClick={clearError}>Dismiss</Button>
            </div>
          </td>
        </tr>
      )}
      <tr className="hover:bg-gray-50 transition" data-testid="bug-row">
        <td className="px-6 py-4 text-sm text-gray-800 font-medium">{bug.title}</td>
        <td className="px-6 py-4 text-sm">
          <StatusBadge status={bug.status} />
        </td>
        <td className="px-6 py-4 text-sm">
          <PriorityBadge priority={bug.priority} />
        </td>
        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(bug.createdAt)}</td>
        <td className="px-6 py-4 text-sm bug-row-actions">
          <Button
            size="sm"
            variant="primary"
            onClick={() => setShowDetails(true)}
          >
            View
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </td>
      </tr>
      {showDetails && (
        <BugDetailsModal
          bug={bug}
          onClose={() => setShowDetails(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default BugRow;
