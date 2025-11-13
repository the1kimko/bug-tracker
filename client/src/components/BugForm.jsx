import React, { useState } from 'react';
import useForm from '../hooks/useForm';
import useErrorHandler from '../hooks/useErrorHandler';
import Button from './Button';

const BugForm = ({ onBugCreated, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const { error, handleError, clearError } = useErrorHandler();
  const { values, errors, handleChange, setErrors, handleReset } = useForm({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
  });

  const validateForm = () => {
    const newErrors = {};
    if (!values.title.trim()) newErrors.title = 'Title is required';
    if (!values.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    clearError();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/bugs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to create bug');
      const bug = await response.json();

      setSuccess('Bug created successfully!');
      handleReset();
      if (onBugCreated) onBugCreated(bug);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      {error && (
        <div className="alert alert-error mb-2">
          {error.message}
          <button onClick={clearError} type="button" className="btn btn-secondary btn-xs ml-4">Dismiss</button>
        </div>
      )}
      {success && (
        <div className="alert alert-success mb-2">{success}</div>
      )}

      <div>
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          placeholder="Bug title"
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div>
        <label>Description *</label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={3}
          placeholder="Describe the bug"
        />
        {errors.description && <span className="form-error">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div>
          <label>Priority</label>
          <select
            name="priority"
            value={values.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={values.category}
            onChange={handleChange}
            placeholder="(Optional)"
          />
        </div>
      </div>

      <div className="form-actions pt-4">
        <Button type="submit" disabled={loading} variant="primary">
          {loading ? 'Creating...' : 'Create Bug'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default BugForm;
