import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutFailure,
  signInSuccess,
} from "../redux/User/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [listings, setListings] = useState([]);

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileErr, setFileErr] = useState(false);
  const [errorShow, setErrorShow] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },

      (error) => {
        setFileErr(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          console.log(downloadURL);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id} `, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutFailure(data.meassage));
        return;
      }

      dispatch(signInSuccess(data.message));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setErrorShow(false);

      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setErrorShow(true);
      }
      console.log(data);
      setListings(data);
    } catch (error) {
      setErrorShow(true);
    }
  };

  const handleDeleteListing = async(listingId)=>{
      console.log(listingId);
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await  res.json();

      if(data.success === false){
        console.log(data.message);
        return;
      }

      setListings((prev)=>{
        prev.filter((listing)=> listing._id !== listingId);
      });
    } catch (error) {
      console.log(error.messgae)
    }
  }

  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center my-7 text-slate-900 uppercase">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/* "
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profilepic "
          className="rounded-full h-28 w-28 object-cover self-center cursor-pointer"
        />
        <p className="text-sm self-center">
          {fileErr ? (
            <span className="text-red-600 text-lg">
              error image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-400 text-lg">{`uploading ${filePerc} %`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700 text-lg">
              image successfully uploaded !
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="user name"
          defaultValue={currentUser.username}
          id="username"
          className="border rounded-lg p-3 mt-6"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          className="border rounded-lg p-3 mt-6"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          defaultValue={currentUser.password}
          id="password"
          className="border rounded-lg p-3 mt-6"
          onChange={handleChange}
        />
        <button className="uppercae bg-slate-900 h-12 uppercase text-white rounded-lg mt-2 hover:opacity-90 disabled:opacity-65">
          update
        </button>
        <Link
          className="bg-rose-500 p-3 my-3 rounded-lg text-center text-white uppercase"
          to={"/create-listing"}
        >
          create listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          className="text-rose-500 text-lg cursor-pointer"
          onClick={handleDelete}
        >
          delete account
        </span>
        <span
          className="text-rose-500 text-lg cursor-pointer"
          onClick={handleSignOut}
        >
          sign out
        </span>
      </div>
      <button
        onClick={handleShowListings}
        className="text-rose-500 w-full cursor-pointer text-lg font-mono text-center hover:animate-none ease-in-out duration-75"
      >
        show your listings
      </button>

      <p className="text-red-500 mt-5">
        {errorShow ? "error when show the listings" : ""}
      </p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? (
          "user is updated successfully "
        ) : (
          <span className="text-red-500"></span>
        )}
      </p>
      {listings && listings.length > 0 && (
        <div className="flex flex-col g-4 items-center">
          <p className="text-rose-500 w-full text-center text-lg py-4">
            {" "}
            your listings
          </p>
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 gap-4 flex justify-between "
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="he"
                  className="object-contain h-16 w-16"
                />
              </Link>
              <Link
                className="text-rose-700 font-semibold  hover:underline p-6  truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col item-center gap-3">
                <button onClick={()=>handleDeleteListing(listing._id)} className="text-red-400 w-full p-1 hover:bg-red-400 hover:text-white rounded uppercase border border-red-400">
                  delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-600 uppercase w-full p-1 hover:bg-green-600 hover:text-white rounded border border-green-600">
                    edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
