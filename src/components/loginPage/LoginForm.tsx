import { PasswordInput, TextInput } from "@mantine/core";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const [userData, setUserData] = useState({
    login: "",
    password: "",
  });

  const onSubmit = async () => {
    const res = await signIn("credentials", {
      login: userData.login,
      password: userData.password,
      redirect: false,
    });
    if (res?.error) setError(res.error);
    else if (res?.ok) {
      await router.push("/home");
    }
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-3/5 max-w-sm flex-col gap-5 font-orkneyLight">
        <TextInput
          maw={620}
          label="Login"
          onChange={(e) =>
            setUserData({
              login: e.target.value,
              password: userData.password,
            })
          }
          styles={{
            input: {
              borderTop: 0,
              borderRight: 0,
              borderLeft: 0,
              borderRadius: 0,
              borderColor: "#303030",
              borderWidth: 2,
            },
            label: {
              font: "inherit",
            },
          }}
          error={
            error === "Invalid Credentials" &&
            "Nie prawidłowy login, spróbuj ponownie"
          }
        />
        <PasswordInput
          maw={620}
          label="Hasło"
          onChange={(e) =>
            setUserData({
              login: userData.login,
              password: e.target.value,
            })
          }
          styles={{
            input: {
              borderTop: 0,
              borderRight: 0,
              borderLeft: 0,
              borderRadius: 0,
              borderColor: "#303030",
              borderWidth: 2,
            },
            label: {
              font: "inherit",
            },
            visibilityToggle: {
              color: "#303030",
            },
          }}
          error={
            error === "Invalid Password" &&
            "Nie prawidłowe hasło, spróbuj ponownie"
          }
        />
        <button
          onClick={onSubmit}
          className="mt-4 rounded-full bg-brand p-3 font-orkneyBold"
        >
          ZALOGUJ SIĘ
        </button>
      </div>
    </div>
  );
}
