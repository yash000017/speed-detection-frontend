// utils/toast.test.ts
import { notify } from './toast';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: jest.fn(),
}));

describe('notify', () => {
  beforeEach(() => {
    jest.clearAllMocks();  // Reset mock calls before each test
  });

  it('should call toast with the correct message and default type (info)', () => {
    notify('This is an info message');
    expect(toast).toHaveBeenCalledWith('This is an info message', { type: 'info' });
  });

  it('should call toast with the success type when specified', () => {
    notify('Success message', 'success');
    expect(toast).toHaveBeenCalledWith('Success message', { type: 'success' });
  });

  it('should call toast with the error type when specified', () => {
    notify('Error message', 'error');
    expect(toast).toHaveBeenCalledWith('Error message', { type: 'error' });
  });

  it('should call toast with the warning type when specified', () => {
    notify('Warning message', 'warning');
    expect(toast).toHaveBeenCalledWith('Warning message', { type: 'warning' });
  });
});
