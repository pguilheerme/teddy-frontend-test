import { lazy, Suspense } from "react";
import "./welcome.style.css";
import { useUserStore } from "../../stores/useUserStore";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserShema, type UserSchemaType } from "../../schemas/userSchema";

const Button = lazy(() => import("designSystem/Button"));
const TextInput = lazy(() => import("designSystem/TextInput"));

interface WelcomeProps {
  onLogin: () => void;
}

export default function Welcome({ onLogin }: WelcomeProps) {
  const { setUserName } = useUserStore();
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(UserShema),
  });

  const onSubmit: SubmitHandler<UserSchemaType> = (data) => {
    setUserName(data.userName);
    form.reset();
    onLogin();
  };

  return (
    <div
      className="welcome_background"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="welcome-form">
          <h2 className="main-title">Olá, seja bem-vindo!</h2>
          <TextInput
            fullWidth
            placeholder="Digite o seu nome:"
            name="username"
            register={form.register("userName")}
            error={form.formState.errors.userName?.message}
          />
          <Button fullWidth text="Entrar" disabled={!form.formState.isValid} />
        </form>
      </Suspense>
    </div>
  );
}
