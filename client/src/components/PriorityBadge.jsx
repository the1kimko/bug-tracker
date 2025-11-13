import React from 'react';

const PriorityBadge = ({ priority }) => {
  const priorityConfig = {
    high: { bg: 'bg-red-100', text: 'text-red-800', icon: '🔴', label: 'High' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '🟡', label: 'Medium' },
    low: { bg: 'bg-green-100', text: 'text-green-800', icon: '🟢', label: 'Low' },
  };

  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
      {config.icon} {config.label}
    </span>
  );
};

export default PriorityBadge;
