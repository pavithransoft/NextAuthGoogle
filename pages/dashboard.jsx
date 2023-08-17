import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";

const Dashboard = () => {
  const { push } = useRouter();
  const { data: session, status, update } = useSession();
  const nameRef = useRef();
  const imageRef = useRef();

  if (status === "unauthenticated") {
    push("/");
  }

  if (status === "loading") {
    return (
      <div className="text-3xl font-bold text-center py-[20%]">Loading...</div>
    );
  }

  function handleUpdate(event) {
    event.preventDefault();
    const name = nameRef.current.value;
    const image = imageRef.current.value;

    if (update) {
      update({ name, image });
    }

    console.log({ name, image });
    nameRef.current.value = "";
    imageRef.current.value = "";
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-10">
      <h1>Welcome to Dashboard Page</h1>
      <button
        className="border rounded-lg px-3 py-2 bg-slate-50 shadow hover:ring hover:ring-black"
        onClick={async () =>
          await signOut({ redirect: false, callbackUrl: "/" })
        }
      >
        Sign Out
      </button>
      <hr className="w-full" />
      <div className="flex flex-col gap-5">
        <span className="flex gap-20 items-center">
          Profile :
          <span>
            <Image
              className="rounded-full"
              src={session?.user?.image}
              alt="avatar"
              width={40}
              height={40}
            />
          </span>
        </span>
        <span className="flex gap-20 items-center">
          Name : <span>{session?.user?.name}</span>
        </span>
        <span className="flex gap-20 items-center">
          Email : <span>{session?.user?.email}</span>
        </span>
        <span className="flex gap-16 items-center">
          Provider : <span>{session?.user?.provider}</span>
        </span>
      </div>
      <hr className="w-full" />
      <form className="flex gap-5 items-center" onSubmit={handleUpdate}>
        <label>New Name : </label>
        <input type="text" className="border p-2 rounded-lg" ref={nameRef} />
        <label>Image Url : </label>
        <input type="text" className="border p-2 rounded-lg" ref={imageRef} />
        <button className="border rounded-lg px-3 py-2 bg-slate-50 shadow hover:ring hover:ring-black">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
