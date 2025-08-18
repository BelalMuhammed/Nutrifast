import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { updateUserProfile, getUserProfile } from "../../Api/apiService";
import {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  logout,
} from "../../Redux/slices/authSlice";
import { FiEdit2, FiLogOut, FiKey, FiUser } from "react-icons/fi";

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // Change password state
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        avatar: user.avatar || "",
        role: user.role || "user",
      });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.id) {
      getUserProfile(user.id)
        .then((res) => {
          if (res.data) {
            setForm({
              username: res.data.username || "",
              email: res.data.email || "",
              phone: res.data.phone || "",
              address: res.data.address || "",
              avatar: res.data.avatar || "",
              role: res.data.role || "user",
            });
          }
        })
        .catch(() => {});
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setEditMode(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setEditMode(false);
    setError("");
    setSuccess("");
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        avatar: user.avatar || "",
        role: user.role || "user",
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    dispatch(updateProfileStart());
    try {
      const res = await updateUserProfile({ ...form, id: user.id });

      // Update Redux state with the new user data
      dispatch(updateProfileSuccess(res.data));

      // Also update localStorage if it exists there (for navbar sync)
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const updatedUser = { ...JSON.parse(storedUser), ...res.data };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }

      setSuccess("Profile updated successfully.");
      setEditMode(false);
    } catch (err) {
      setError("Update failed. Please try again.");
      dispatch(updateProfileFailure(err.message));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Change password logic
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");
    if (!passwords.old || !passwords.new || !passwords.confirm) {
      setPasswordError("All fields are required.");
      return;
    }
    if (passwords.new.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      // Update password as part of the user object (include all user data)
      dispatch(updateProfileStart());
      const updatedUserData = {
        ...form,
        id: user.id,
        password: passwords.new, // Store only the new password in the user object
      };

      const res = await updateUserProfile(updatedUserData); // Update Redux state with the updated user data
      dispatch(updateProfileSuccess(res.data));

      // Also update localStorage if it exists there (for navbar sync)
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const updatedUser = { ...JSON.parse(storedUser), ...res.data };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }

      setPasswordSuccess("Password changed successfully!");
      setTimeout(() => setPasswords({ old: "", new: "", confirm: "" }), 1200);
    } catch (error) {
      dispatch(updateProfileFailure(error.message));
      setPasswordError(
        "Failed to change password. Please check your old password."
      );
      console.error("Password change error:", error);
    }
  };

  if (!user) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh]'>
        <h2 className='text-2xl font-bold mb-4'>You must be logged in first</h2>
        <button
          className='bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark'
          onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-0 sm:p-0 mt-10'>
      <div className='p-6 sm:p-10'>
        {/* Profile Section */}
        <div className='flex flex-col md:flex-row gap-10 mb-12'>
          {/* Profile Card */}
          <div className='flex flex-col items-center md:items-start md:w-1/3 p-0'>
            <div className='w-40 h-40 rounded-full overflow-hidden border-2 border-app-primary mb-4 flex items-center justify-center'>
              {form.avatar ? (
                <img
                  src={form.avatar}
                  alt='avatar'
                  className='w-full h-full object-cover'
                />
              ) : (
                <svg
                  width='80'
                  height='80'
                  viewBox='0 0 80 80'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <circle cx='40' cy='40' r='40' fill='#e6f0ee' />
                  <ellipse cx='40' cy='34' rx='14' ry='14' fill='#b6c7c3' />
                  <ellipse cx='40' cy='62' rx='22' ry='12' fill='#b6c7c3' />
                </svg>
              )}
            </div>
            <h2 className='text-2xl font-bold text-app-secondary mb-1 text-center md:text-left'>
              {form.username}
            </h2>
            <p className='text-gray-500 dark:text-gray-300 mb-2 text-center md:text-left'>
              {form.email}
            </p>
            <div className='flex gap-2 mt-2 w-full justify-center md:justify-start'>
              <button
                type='button'
                className={`flex items-center gap-1 px-5 py-2 rounded-full transition-all duration-200 text-base font-medium shadow ${
                  editMode
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-app-primary text-white hover:bg-app-tertiary hover:scale-105"
                }`}
                onClick={handleEdit}
                disabled={editMode}>
                <FiEdit2 /> {editMode ? "Editing..." : "Edit"}
              </button>
              <button
                type='button'
                className='flex items-center gap-1 bg-gray-100 text-app-secondary px-5 py-2 rounded-full hover:bg-gray-200 transition text-base font-medium shadow'
                onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <form
            onSubmit={handleSave}
            className='flex-1 space-y-6 max-w-xl mx-auto p-0'>
            <h3
              className={`text-xl font-bold mb-4 flex items-center gap-2 transition-all duration-200 ${
                editMode ? "text-app-primary" : "text-app-secondary"
              }`}>
              <FiUser /> Profile Information{" "}
              {editMode && (
                <span className='text-sm bg-app-primary text-white px-2 py-1 rounded-full'>
                  Editing
                </span>
              )}
            </h3>
            <div>
              <label className='block font-semibold mb-2 text-app-secondary'>
                Full Name
              </label>
              <input
                type='text'
                name='username'
                value={form.username}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border-2 rounded-lg px-4 py-2 text-lg transition-all duration-200 ${
                  editMode
                    ? "border-app-primary focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent bg-white text-app-secondary shadow-sm"
                    : "border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
                required
              />
            </div>
            <div>
              <label className='block font-semibold mb-2 text-gray-400'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={form.email}
                disabled
                className='w-full border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-200 text-gray-500 text-lg cursor-not-allowed'
              />
              <p className='text-sm text-gray-400 mt-1 italic'>
                Email cannot be changed
              </p>
            </div>
            <div>
              <label className='block font-semibold mb-2 text-app-secondary'>
                Phone
              </label>
              <input
                type='text'
                name='phone'
                value={form.phone}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border-2 rounded-lg px-4 py-2 text-lg transition-all duration-200 ${
                  editMode
                    ? "border-app-primary focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent bg-white text-app-secondary shadow-sm"
                    : "border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className='block font-semibold mb-2 text-app-secondary'>
                Address
              </label>
              <input
                type='text'
                name='address'
                value={form.address}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border-2 rounded-lg px-4 py-2 text-lg transition-all duration-200 ${
                  editMode
                    ? "border-app-primary focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent bg-white text-app-secondary shadow-sm"
                    : "border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              />
            </div>
            <div>
              <label className='block font-semibold mb-2 text-gray-400'>
                Role
              </label>
              <input
                type='text'
                name='role'
                value={form.role}
                disabled
                className='w-full border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-200 text-gray-500 text-lg cursor-not-allowed'
                placeholder='user'
              />
              <p className='text-sm text-gray-400 mt-1 italic'>
                Contact support to change your role
              </p>
            </div>
            <div>
              <label className='block font-semibold mb-2 text-app-secondary'>
                Profile Image URL
              </label>
              <input
                type='url'
                name='avatar'
                value={form.avatar}
                onChange={handleChange}
                disabled={!editMode}
                placeholder={
                  editMode
                    ? "https://example.com/image.jpg"
                    : "Click Edit to change avatar"
                }
                className={`w-full border-2 rounded-lg px-4 py-2 text-lg transition-all duration-200 ${
                  editMode
                    ? "border-app-primary focus:outline-none focus:ring-2 focus:ring-app-primary focus:border-transparent bg-white text-app-secondary shadow-sm"
                    : "border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              />
              <p
                className={`text-sm mt-1 ${
                  editMode ? "text-gray-500" : "text-gray-400 italic"
                }`}>
                {editMode
                  ? "Enter a valid image URL for your profile picture"
                  : "Profile picture can be updated in edit mode"}
              </p>
            </div>

            {error && (
              <div className='text-red-500 text-base font-medium'>{error}</div>
            )}
            {success && (
              <div className='text-green-600 text-base font-medium'>
                {success}
              </div>
            )}

            {editMode && (
              <div className='flex gap-4 mt-6'>
                <button
                  type='submit'
                  className='bg-app-primary text-white px-8 py-2 hover:bg-app-tertiary text-lg font-bold'
                  disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  type='button'
                  className='bg-gray-200 text-app-secondary px-8 py-2 hover:bg-gray-300 text-lg font-bold'
                  onClick={handleCancel}
                  disabled={loading}>
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Change Password Section */}
        <div className='border-t border-gray-200 pt-8'>
          <div className='flex flex-col md:flex-row gap-10'>
            {/* Password Section Info */}
            <div className='flex flex-col items-center md:items-start md:w-1/3 p-0'>
              <div className='rounded-full bg-gray-100 p-4 mb-4 flex items-center justify-center'>
                <FiKey className='text-2xl text-app-primary' />
              </div>
              <h3 className='text-xl font-bold text-app-secondary mb-2 text-center md:text-left'>
                Security Settings
              </h3>
              <p className='text-gray-500 text-center md:text-left text-sm'>
                Change your password to keep your account secure
              </p>
            </div>

            {/* Password Form */}
            <form
              onSubmit={handlePasswordSubmit}
              className='flex-1 space-y-6 max-w-xl mx-auto p-0'>
              <h3 className='text-xl font-bold mb-4 flex items-center gap-2 text-app-secondary'>
                <FiKey /> Change Password
              </h3>
              <div>
                <label className='block font-semibold mb-2 text-app-secondary'>
                  Old Password
                </label>
                <input
                  type='password'
                  name='old'
                  value={passwords.old}
                  onChange={handlePasswordChange}
                  className='w-full border-2 border-app-quaternary rounded-lg px-4 py-2 text-lg'
                />
              </div>
              <div>
                <label className='block font-semibold mb-2 text-app-secondary'>
                  New Password
                </label>
                <input
                  type='password'
                  name='new'
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  className='w-full border-2 border-app-quaternary rounded-lg px-4 py-2 text-lg'
                />
              </div>
              <div>
                <label className='block font-semibold mb-2 text-app-secondary'>
                  Confirm New Password
                </label>
                <input
                  type='password'
                  name='confirm'
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  className='w-full border-2 border-app-quaternary rounded-lg px-4 py-2 text-lg'
                />
              </div>
              {passwordError && (
                <div className='text-red-500 text-base font-medium'>
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className='text-green-600 text-base font-medium'>
                  {passwordSuccess}
                </div>
              )}
              <button
                type='submit'
                className='bg-app-primary text-white px-8 py-2 hover:bg-app-tertiary text-lg font-bold'
                disabled={loading}>
                {loading ? "Changing Password..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
