import ConfirmDialog from './Dialog';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ConfirmDialog', () => {
  const onCloseMock = jest.fn();
  const onConfirmMock = jest.fn();
  const message = "Are you sure you want to delete this item?";

  const renderComponent = (open: boolean) =>
    render(
      <ConfirmDialog
        open={open}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        message={message}
      />
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders dialog with the correct title and message', () => {
    renderComponent(true);
    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    renderComponent(false);
    expect(screen.queryByText('Confirm Deletion')).not.toBeInTheDocument();
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });

  it('calls onClose when the Cancel button is clicked', () => {
    renderComponent(true);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when the Delete button is clicked', () => {
    renderComponent(true);
    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });
});
