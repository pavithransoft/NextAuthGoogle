import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import bcryptjs from "bcryptjs";

const SignIn = () => {
  const { push } = useRouter();
  const { status } = useSession();
  const emailRef = useRef();
  const passwordRef = useRef();

  if (status === "authenticated") {
    push("/dashboard");
  }

  async function handleSignIn(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = bcryptjs.hash(passwordRef.current.value, 12);

    console.log({ email, password });
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  return (
    <section className="bg-background py-24">
      <hr />
      <div className="flex gap-5 items-center justify-center p-5 py-14">
        <h1 className="font-semibold">Sign In Page</h1>
        <span className="flex gap-5 items-center">
          Go To ---{">"}
          <Link
            href={"/signup"}
            className="border rounded-lg px-2 py-1 bg-slate-50 font-semibold text-sm shadow hover:ring hover:ring-black"
          >
            Sign Up
          </Link>
        </span>
      </div>
      <hr />
      <div className="flex flex-col gap-5 items-center justify-center p-5">
        <h1 className="font-semibold">
          Sign In <span className="px-2 font-normal">with</span> Credentials
        </h1>
        <form className="flex gap-10 py-5" onSubmit={handleSignIn}>
          <span>
            <label className="px-4">Email</label>
            <input
              type="email"
              className="border rounded-lg p-2"
              ref={emailRef}
            />
          </span>
          <span>
            <label className="px-4">Password</label>
            <input
              type="password"
              className="border rounded-lg p-2"
              ref={passwordRef}
            />
          </span>
          <button className="border rounded-lg px-3 py-2 bg-slate-50 font-semibold shadow hover:ring hover:ring-black">
            Sign In
          </button>
        </form>
      </div>
      <hr />
      <div className="flex flex-col gap-10 items-center justify-center py-10">
        <h1>
          Continue with <span className="font-semibold px-2">OAuth</span>
        </h1>
        <span className="font-semibold flex gap-10">
          <button
            className="border rounded-lg px-3 py-2 bg-slate-50 shadow hover:ring hover:ring-black"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            Google
          </button>
          <button className="border rounded-lg px-3 py-2 bg-slate-50 shadow hover:ring hover:ring-black">
            Github
          </button>
        </span>
      </div>
      <hr />
    </section>
  );
};

export default SignIn;
