import useAuth from "@/hooks/queries/useAuth";
import { router, useFocusEffect } from "expo-router";

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const { auth } = useAuth();

  useFocusEffect(() => {
    !auth.id && router.replace("/auth");
  });

  return <>{children}</>;
}
