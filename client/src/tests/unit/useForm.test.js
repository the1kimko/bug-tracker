import { renderHook, act } from '@testing-library/react';
import useForm from '../../hooks/useForm';

describe('useForm Hook', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useForm({ title: '', description: '' })
    );

    expect(result.current.values.title).toBe('');
    expect(result.current.values.description).toBe('');
  });

  it('should update form values on change', () => {
    const { result } = renderHook(() =>
      useForm({ title: '', description: '' })
    );

    act(() => {
      result.current.handleChange({ target: { name: 'title', value: 'Test Bug' } });
    });

    expect(result.current.values.title).toBe('Test Bug');
  });

  it('should reset form values', () => {
    const { result } = renderHook(() =>
      useForm({ title: '', description: '' })
    );

    act(() => {
      result.current.handleChange({ target: { name: 'title', value: 'Test' } });
    });

    expect(result.current.values.title).toBe('Test');

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.values.title).toBe('');
  });

  it('should set errors', () => {
    const { result } = renderHook(() =>
      useForm({ title: '' })
    );

    act(() => {
      result.current.setErrors({ title: 'Title is required' });
    });

    expect(result.current.errors.title).toBe('Title is required');
  });
});
