import {
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../firebase/firebase";
import { useRef, useState } from "react";

const Login = () => {
  const [user, setUser] = useState(null);
  const [Error, setError] = useState("");
  const emailRef = useRef(null);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    const password = e.target.password.value;
    setUser("");
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const loggedUser = userCredential.user;
        if (!loggedUser.emailVerified) {
          sendEmailVerification(loggedUser)
            .then(() => {
              return Swal.fire(
                "Success!",
                "Please Check your email for verification.",
                "success"
              );
            })
            .catch((error) => {
              console.log(error.message);
              return Swal.fire(
                "error",
                "Email verification link send failed.",
                "error"
              );
            });
          return Swal.fire(
            "Error!",
            "Before login to your account, you need to verify your email.",
            "error"
          );
        } else {
          setUser(loggedUser);
          Swal.fire("Success!", "Login Successfull.", "success");
        }
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire("Error!", "Login Failed.", "error");
      });
  };
  const handleForgotPassword = () => {
    const email = emailRef.current.value;

    if (!email) {
      return Swal.fire(
        "Error!",
        "You must provide an email for reset link.",
        "error"
      );
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      return Swal.fire(
        "Error! ",
        "Your must provide an valid email adderess, like xyz@abc.com",
        "warning"
      );
    }
    sendPasswordResetEmail(auth, email)
      .then(
        Swal.fire(
          "Success!",
          `Password verification link send to ${email}`,
          "success"
        )
      )
      .catch((error) => {
        return Swal.fire(
          "Error!",
          `Failed to send reset link.${error.message}`,
          "error"
        );
      });
  };
  return (
    <div>
      <h2 className="text-3xl">Please Login</h2>
      <div className="relative flex w-96 mx-auto mt-10 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-border text-white shadow-lg shadow-pink-500/40">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            LogIn
          </h3>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <form onSubmit={handleLogin}>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                type="email"
                name="email"
                ref={emailRef}
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Email
              </label>
            </div>
            <div className="relative h-11 my-5 w-full min-w-[200px]">
              <input
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                type="password"
                name="password"
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Password
              </label>
            </div>
            <input
              className="block cursor-pointer w-full select-none rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              value="Login"
            />
          </form>
        </div>
        <p>
          <a
            href="#"
            onClick={handleForgotPassword}
            className="underline text-blue-400"
          >
            Forgot Password ?
          </a>
        </p>
        <div className="p-6 pt-0">
          <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
            Dont have an account?
            <Link
              to="/register"
              className="ml-1 block font-sans text-sm font-bold leading-normal text-pink-500 antialiased"
            >
              Register
            </Link>
          </p>
        </div>
        {user && (
          <div>
            <h2 className="text-3xl">Email: {user.email}</h2>
            <p className="text-xl">UID: {user.uid}</p>
          </div>
        )}
        {Error && <p className="text-red-600 text-lg">{Error}</p>}
      </div>
    </div>
  );
};

export default Login;
