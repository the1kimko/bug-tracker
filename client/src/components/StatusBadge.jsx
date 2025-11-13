import React from 'react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    open: { bg: 'bg-red-100', text: 'text-red-800', label: 'Open' },
    'in-progress': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'In Progress' },
    resolved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Resolved' },
  };

  const config = statusConfig[status] || statusConfig.open;

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
