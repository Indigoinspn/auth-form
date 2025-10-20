import { renderHook, waitFor, act } from '@testing-library/react';
import { useAuth } from './useAuth';
import { ERROR_CODES, ERROR_MESSAGES, INVALID_EMAIL, JWT_TOKEN, VALID_CREDENTIALS } from '@/lib/constants';
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

describe('useAuth', () => {
  it('should log in successfully with valid credentials', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      result.current.login({
        email: VALID_CREDENTIALS.email,
        password: VALID_CREDENTIALS.password,
      });
    });

    await waitFor(() => {
      expect(result.current.isLoginLoading).toBe(false);
      expect(result.current.isLoginError).toBe(false);
      expect(result.current.loginData).toEqual({
        email: VALID_CREDENTIALS.email,
        token: JWT_TOKEN,
        requires2fa: true,
      });
    });
  });

  it('should handle network error (connection lost)', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      result.current.login({
        email: INVALID_EMAIL.connection_lost,
        password: 'any-password',
      });
    });

    await waitFor(() => {
      expect(result.current.isLoginLoading).toBe(false);
      expect(result.current.isLoginError).toBe(true);
      expect(result.current.loginError).toBeDefined();
      expect(result.current.loginError?.message).toBe('Failed to fetch');
      expect((result.current.loginError as any).code).toBe(ERROR_CODES.NETWORK_ERROR);
    });
  });

  it('should handle rate limit error (too many attempts)', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      result.current.login({
        email: INVALID_EMAIL.attempts_limited,
        password: 'any-password',
      });
    });

    await waitFor(() => {
      expect(result.current.isLoginLoading).toBe(false);
      expect(result.current.isLoginError).toBe(true);
      expect(result.current.loginError).toEqual({
        code: ERROR_CODES['RATE_LIMITED'],
        message: ERROR_MESSAGES['RATE_LIMITED'],
      });
    });
  });

  it('should handle invalid credentials', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      result.current.login({
        email: 'wrong@example.com',
        password: 'wrong-password',
      });
    });

    await waitFor(() => {
      expect(result.current.isLoginLoading).toBe(false);
      expect(result.current.isLoginError).toBe(true);
      expect(result.current.loginError).toEqual({
        code: ERROR_CODES['INVALID_CREDENTIALS'],
        message: ERROR_MESSAGES['INVALID_CREDENTIALS'],
      });
    });
  });

  it('should reset login state', async () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      return result.current.login({
        email: 'wrong@example.com',
        password: 'wrong',
      });
    });

    await waitFor(() => {
      expect(result.current.isLoginError).toBe(true);
    });

    act(() => {
      result.current.resetLogin();
    });

    await waitFor(() => {
      expect(result.current.isLoginError).toBe(false);
      expect(result.current.loginError).toBe(null);
      expect(result.current.loginData).toBe(undefined);
    });
  });
});
