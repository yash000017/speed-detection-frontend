import { render, screen } from '@testing-library/react';
import BarChart from './Charts';
import '@testing-library/jest-dom';
import { Bar } from 'react-chartjs-2';

jest.mock('react-chartjs-2', () => ({
  Bar: jest.fn(() => <div>Mocked Bar Chart</div>),
}));

describe('BarChart Component', () => {
  const monthlyData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
  const title = 'Monthly Data';
  const label = 'Revenue';
  const color = 'rgba(75, 192, 192, 0.6)';

  it('renders the bar chart with provided title and label', () => {
    render(<BarChart monthlyData={monthlyData} title={title} label={label} color={color} />);

    expect(screen.getByText('Mocked Bar Chart')).toBeInTheDocument();
    expect(Bar).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          datasets: [
            expect.objectContaining({
              label,
              data: monthlyData,
              backgroundColor: color,
              borderColor: color,
            }),
          ],
        }),
        options: expect.objectContaining({
          plugins: expect.objectContaining({
            legend: expect.objectContaining({ position: 'top' }),
            title: expect.objectContaining({ display: true, text: title }),
          }),
        }),
      }),
      {}
    );
  });

  it('renders without a title if not provided', () => {
    render(<BarChart monthlyData={monthlyData} label={label} color={color} />);
    expect(Bar).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          plugins: expect.objectContaining({
            title: expect.objectContaining({ display: false }),
          }),
        }),
      }),
      {}
    );
  });

  it('disables grid lines on x and y axes', () => {
    render(<BarChart monthlyData={monthlyData} label={label} color={color} />);

    expect(Bar).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          scales: expect.objectContaining({
            x: expect.objectContaining({
              grid: expect.objectContaining({ display: false }),
            }),
            y: expect.objectContaining({
              grid: expect.objectContaining({ display: false }),
            }),
          }),
        }),
      }),
      {}
    );
  });

  it('sets beginAtZero to true on y-axis', () => {
    render(<BarChart monthlyData={monthlyData} label={label} color={color} />);

    expect(Bar).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({
          scales: expect.objectContaining({
            y: expect.objectContaining({ beginAtZero: true }),
          }),
        }),
      }),
      {}
    );
  });
});
