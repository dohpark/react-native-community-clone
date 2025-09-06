import { getMe, postLogin, postSignup } from "@/api/auth";
import queryClient from "@/api/queryClient";
import { removeHeader, setHeader } from "@/utils/header";
import { deleteSecureStore, saveSecureStore } from "@/utils/secureStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";

function useGetMe() {
  const { data, isError } = useQuery({
    queryFn: getMe,
    queryKey: ["auth", "getMe"],
  });

  useEffect(() => {
    if (isError) {
      removeHeader("Authorization");
      deleteSecureStore("accessToken");
    }
  }, [isError]);

  return { data };
}

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => router.replace("/auth/login"),
    onError: () => {},
  });
}

function useLogin() {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setHeader("Authorization", `Bearer ${accessToken}`);
      await saveSecureStore("accessToken", accessToken);
      queryClient.fetchQuery({ queryKey: ["auth", "getMe"] });
      router.replace("/");
    },
  });
}

function useAuth() {
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const { data } = useGetMe();

  return {
    auth: {
      id: data?.id || "",
    },
    loginMutation,
    signupMutation,
  };
}

export default useAuth;
