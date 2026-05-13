"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { useAtom } from "jotai";
import { useCallback } from "react";
import {
  CLIENT_PORTAL_USER_LOGIN_WITH_CREDENTIALS,
  CLIENT_PORTAL_USER_REGISTER,
  CLIENT_PORTAL_USER_FORGOT_PASSWORD,
} from "@/graphql/auth/mutations";
import { CLIENT_PORTAL_CURRENT_USER as CURRENT_USER_QUERY } from "@/graphql/auth/queries/currentUser";
import { currentUserAtom, triggerRefetchUserAtom } from "@/store/auth.store";
import {
  ILoginInput,
  IRegisterInput,
  IForgotPasswordInput,
} from "@/types/auth.types";

export function useCurrentUser() {
  const [trigger] = useAtom(triggerRefetchUserAtom);

  const { data, loading, error, refetch } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  return {
    currentUser: (data as any)?.clientPortalCurrentUser || null,
    loading,
    error,
    refetch,
    triggerRefetchUser: () => refetch(),
  };
}

export function useLogin() {
  const [loginMutation, { loading, error }] = useMutation(
    CLIENT_PORTAL_USER_LOGIN_WITH_CREDENTIALS
  );
  const { triggerRefetchUser } = useCurrentUser();

  const login = useCallback(
    async (input: ILoginInput) => {
      const { data } = await loginMutation({
        variables: { email: input.email, password: input.password },
      });

      const raw = (data as any)?.clientPortalUserLoginWithCredentials;
      const token = raw?.token;
      const refreshToken = raw?.refreshToken;

      if (token) {
        sessionStorage.setItem("token", token);
        if (refreshToken)
          sessionStorage.setItem("refreshToken", refreshToken);
        triggerRefetchUser();

        const redirectAfterLogin = sessionStorage.getItem("redirectAfterLogin");
        if (redirectAfterLogin) {
          sessionStorage.removeItem("redirectAfterLogin");
          window.location.href = redirectAfterLogin;
          return { success: true, token, redirect: redirectAfterLogin };
        }
        window.location.href = "/";
        return { success: true, token };
      }

      return { success: !!token, token };
    },
    [loginMutation, triggerRefetchUser]
  );

  return { login, loading, error };
}

export function useRegister() {
  const [registerMutation, { loading, error }] = useMutation(
    CLIENT_PORTAL_USER_REGISTER
  );

  const register = useCallback(
    async (input: IRegisterInput) => {
      const { data } = await registerMutation({
        variables: {
          email: input.email,
          password: input.password,
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone,
        },
      });

      const user = (data as any)?.clientPortalUserRegister;
      return { success: !!user?._id, user };
    },
    [registerMutation]
  );

  return { register, loading, error };
}

export function useLogout() {
  const [, setCurrentUser] = useAtom(currentUserAtom);

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    setCurrentUser(null);
    window.location.href = "/";
  }, [setCurrentUser]);

  return { logout };
}

export function useForgotPassword() {
  const [mutation, { loading, error }] = useMutation(
    CLIENT_PORTAL_USER_FORGOT_PASSWORD
  );

  const forgotPassword = useCallback(
    async (input: IForgotPasswordInput) => {
      const { data } = await mutation({
        variables: {
          identifier: input.email,
        },
      });
      return { success: !!(data as any)?.clientPortalUserForgotPassword };
    },
    [mutation]
  );

  return { forgotPassword, loading, error };
}
