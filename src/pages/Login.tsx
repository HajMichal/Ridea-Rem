import React from "react";
import * as Form from "@radix-ui/react-form";

const Login = () => {
  return (
    <div className="mt-[15vh] flex h-screen w-screen justify-center">
      <Form.Root className="w-[260px]">
        <h1 className="mb-5 w-full text-center text-4xl font-medium">
          Ridea Rem
        </h1>
        <Form.Field className="mb-[10px] grid" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-blackA11">
              Login
            </Form.Label>
            <Form.Message
              className="text-[13px] text-blackA11 opacity-[0.8]"
              match="valueMissing"
            >
              Please enter your Login
            </Form.Message>
            <Form.Message
              className="text-[13px] text-blackA11 opacity-[0.8]"
              match="typeMismatch"
            >
              Please provide a valid login
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="selection:color-white box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-blackA5 px-[10px] text-[15px] leading-none text-blackA11 shadow-[0_0_0_1px] shadow-blackA9 outline-none selection:bg-blackA9 hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              type="email"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="mb-[10px] grid" name="email">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-blackA11">
              Hasło
            </Form.Label>
            <Form.Message
              className="text-[13px] text-blackA11 opacity-[0.8]"
              match="valueMissing"
            >
              Please enter your Hasło
            </Form.Message>
            <Form.Message
              className="text-[13px] text-blackA11 opacity-[0.8]"
              match="typeMismatch"
            >
              Please provide a valid Hasło
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="selection:color-white box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-blackA5 px-[10px] text-[15px] leading-none text-blackA11 shadow-[0_0_0_1px] shadow-blackA9 outline-none selection:bg-blackA9 hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              type="email"
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button className="mt-[10px] box-border inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA7 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
            Zaloguj się
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default Login;
