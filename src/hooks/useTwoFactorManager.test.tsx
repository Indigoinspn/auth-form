import { renderHook, waitFor, act } from '@testing-library/react';
import { useTwoFactorManager } from './useTwoFactorManager';
import { CORRECT_CODE, CONNECTION_LOST_CODE, TIMER_DURATION, ERROR_MESSAGES } from '@/lib/constants';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import * as delayModule from '@/lib/utils/common/delay';

vi.spyOn(delayModule, 'delay').mockImplementation(() => Promise.resolve());

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('useTwoFactorManager', () => {
  it('should validate correct code successfully', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useTwoFactorManager(), { wrapper });

    await act(async () => {
      result.current.validateCode({ code: CORRECT_CODE, timeLeft: TIMER_DURATION });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.isError).toBe(false);
      expect(result.current.errorMessage).toBeNull();
    });
  });

  it('should handle expired code', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useTwoFactorManager(), { wrapper });

    await act(async () => {
      result.current.validateCode({ code: CORRECT_CODE, timeLeft: 0 });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isError).toBe(true);
      expect(result.current.isCodeExpired).toBe(true);
      expect(result.current.errorMessage).toBe(ERROR_MESSAGES['CODE_EXPIRED']);
    });
  });

  it('should handle network error (connection lost)', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useTwoFactorManager(), { wrapper });

    await act(async () => {
      result.current.validateCode({ code: CONNECTION_LOST_CODE, timeLeft: TIMER_DURATION });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isError).toBe(true);
      expect(result.current.isNetworkError).toBe(true);
      expect(result.current.errorMessage).toBe(ERROR_MESSAGES['NETWORK_ERROR']);
    });
  });

  it('should handle invalid code', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useTwoFactorManager(), { wrapper });

    await act(async () => {
      result.current.validateCode({ code: '111111', timeLeft: TIMER_DURATION });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isError).toBe(true);
      expect(result.current.isCodeExpired).toBe(false);
      expect(result.current.isNetworkError).toBe(false);
      expect(result.current.errorMessage).toBe(ERROR_MESSAGES['INVALID_CODE']);
    });
  });

  it('should reset validation state', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useTwoFactorManager(), { wrapper });

    // Create code validation error
    await act(async () => {
      result.current.validateCode({ code: '000000', timeLeft: TIMER_DURATION });
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    // Reset validation
    act(() => {
      result.current.resetValidation();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(result.current.isNetworkError).toBe(false);
      expect(result.current.isCodeExpired).toBe(false);
      expect(result.current.errorMessage).toBeNull();
    });
  });
});
