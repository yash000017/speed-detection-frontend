// theme.test.ts
import theme from './theme';

describe('Theme', () => {
  it('should have the correct primary color', () => {
    expect(theme.palette.primary.main).toBe('#EF4E4E');
  });

  it('should have the correct background default color', () => {
    expect(theme.palette.background.default).toBe('#FFFFFF');
  });

  it('should have the correct text primary color', () => {
    expect(theme.palette.text.primary).toBe('#888');
  });

  it('should have the correct typography font family', () => {
    expect(theme.typography.fontFamily).toBe('Roboto, sans-serif');
  });

  it('should have custom animation durations defined', () => {
    expect(theme.custom.animationDuration.enteringScreen).toBe('0.3s');
    expect(theme.custom.animationDuration.leavingScreen).toBe('0.3s');
  });

  it('should have the correct breakpoints', () => {
    expect(theme.breakpoints.values.xs).toBe(0);
    expect(theme.breakpoints.values.sm).toBe(600);
    expect(theme.breakpoints.values.md).toBe(768);
    expect(theme.breakpoints.values.lg).toBe(1200);
    expect(theme.breakpoints.values.xl).toBe(1536);
  });
});
