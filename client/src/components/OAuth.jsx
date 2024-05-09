import { useDispatch } from "react-redux";
import { app } from "../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { signInSuccess } from "../redux/User/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // console.log(result.user);
      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body:JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate('/')
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="uppercase bg-red-700 mt-4 items-center text-white mx-auto rounded-full outline-none p-3   w-52 sm:w-64  hover:opacity-75  disabled:bg-slate-400 "
    >
      continue with google
    </button>
  );
}
