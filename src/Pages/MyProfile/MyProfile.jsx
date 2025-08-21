import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateUserProfile, getUserProfile } from "../../Api/apiService";
import {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  logout,
} from "../../Redux/slices/authSlice";
import { getCurrentUser, setCurrentUser } from "../../lib/storage";
import { FiEdit2, FiLogOut, FiKey, FiUser } from "react-icons/fi";

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);

  // React Hook Form for profile
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    formState: { errors: profileErrors },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      address: "",
      avatar: "",
      role: "user",
      password: "",
    },
  });

  // React Hook Form for password change
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: passwordErrors },
    watch: watchPassword,
  } = useForm({
    defaultValues: {
      old: "",
      new: "",
      confirm: "",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Watch form values for display
  const profileData = watch();
  const passwordData = watchPassword();

  useEffect(() => {
    if (user) {
      resetProfile({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        avatar: user.avatar || "",
        role: user.role || "user",
        password: user.password || "",
      });
    }
  }, [user, resetProfile]);

  useEffect(() => {
    if (user && user.id) {
      getUserProfile(user.id)
        .then((res) => {
          if (res.data) {
            resetProfile({
              username: res.data.username || "",
              email: res.data.email || "",
              phone: res.data.phone || "",
              address: res.data.address || "",
              avatar: res.data.avatar || "",
              role: res.data.role || "user",
              password: res.data.password || "",
            });
          }
        })
        .catch(() => {});
    }
  }, [user, resetProfile]);

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
      resetProfile({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        avatar: user.avatar || "",
        role: user.role || "user",
        password: user.password || "",
      });
    }
  };

  const handleSave = async (data) => {
    setError("");
    setSuccess("");
    dispatch(updateProfileStart());
    try {
      const res = await updateUserProfile({ ...data, id: user.id });

      // Update Redux state with the new user data
      dispatch(updateProfileSuccess(res.data));

      // Also update central storage for navbar sync
      const storedUser = getCurrentUser();
      if (storedUser) {
        const updatedUser = { ...storedUser, ...res.data };
        setCurrentUser(updatedUser);
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
  const handlePasswordSubmit = async (data) => {
    setPasswordError("");
    setPasswordSuccess("");

    if (data.new.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    if (data.new !== data.confirm) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      // Update password as part of the user object (include all user data)
      dispatch(updateProfileStart());
      const updatedUserData = {
        ...profileData,
        id: user.id,
        password: data.new, // Store only the new password in the user object
      };

      const res = await updateUserProfile(updatedUserData); // Update Redux state with the updated user data
      dispatch(updateProfileSuccess(res.data));

      // Also update central storage for navbar sync
      const storedUser = getCurrentUser();
      if (storedUser) {
        const updatedUser = { ...storedUser, ...res.data };
        setCurrentUser(updatedUser);
      }

      setPasswordSuccess("Password changed successfully!");
      setTimeout(() => resetPassword(), 1200);
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
      <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4'>
        <div className='bg-white rounded-3xl shadow-xl border border-gray-100 p-12 max-w-md w-full text-center'>
          <div className='mb-8'>
            <div className='bg-gradient-to-br from-app-primary/10 to-app-secondary/10 rounded-full p-8 w-24 h-24 mx-auto flex items-center justify-center mb-6'>
              <FiUser className='text-app-primary' size={40} />
            </div>
          </div>
          <h2 className='text-2xl font-bold text-app-secondary mb-4'>
            Authentication Required
          </h2>
          <p className='text-gray-600 mb-8 leading-relaxed'>
            You need to be logged in to access your profile
          </p>
          <button
            onClick={() => navigate("/login")}
            className='w-full text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
            style={{
              backgroundColor: "#388e3c",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#4caf50")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#388e3c")}>
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      <div className='container mx-auto px-4 py-8 lg:py-12'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <div className='bg-gradient-to-br from-app-primary/10 to-app-secondary/10 rounded-full p-6 w-20 h-20 mx-auto flex items-center justify-center mb-6'>
            <FiUser className='text-app-primary' size={32} />
          </div>
          <h1 className='text-3xl lg:text-4xl font-bold text-app-secondary mb-4'>
            My Profile
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Manage your personal information and account settings
          </p>
        </div>

        <div className='max-w-6xl mx-auto'>
          {/* Profile Section */}
          <div className='bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8'>
            <div className='bg-gradient-to-r from-app-primary/5 to-app-secondary/5 px-8 py-6 border-b border-gray-100'>
              <h2 className='text-xl font-bold text-app-tertiary flex items-center gap-3'>
                <FiUser size={20} />
                Profile Information
                {editMode && (
                  <span className='bg-app-primary text-white px-3 py-1 rounded-full text-sm'>
                    Editing Mode
                  </span>
                )}
              </h2>
            </div>

            <div className='p-8'>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Profile Card */}
                <div className='lg:col-span-1'>
                  <div className='bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 text-center h-fit'>
                    <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto mb-6'>
                      {profileData.avatar ? (
                        <img
                          src={profileData.avatar}
                          alt='avatar'
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <div className='w-full h-full bg-gradient-to-br from-app-primary/20 to-app-secondary/20 flex items-center justify-center'>
                          <FiUser className='text-app-primary' size={48} />
                        </div>
                      )}
                    </div>
                    <h3 className='text-xl font-bold text-app-secondary mb-2'>
                      {profileData.username || "User Name"}
                    </h3>
                    <p className='text-gray-600 mb-1'>{profileData.email}</p>
                    <div className='inline-flex items-center px-3 py-1 bg-app-primary/10 text-app-primary rounded-full text-sm font-medium'>
                      {profileData.role || "user"}
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col gap-3 mt-6'>
                      <button
                        type='button'
                        onClick={editMode ? handleCancel : handleEdit}
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                          editMode
                            ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            : "text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        }`}
                        style={
                          !editMode
                            ? {
                                backgroundColor: "#388e3c",
                              }
                            : {}
                        }
                        onMouseEnter={(e) =>
                          !editMode &&
                          (e.target.style.backgroundColor = "#4caf50")
                        }
                        onMouseLeave={(e) =>
                          !editMode &&
                          (e.target.style.backgroundColor = "#388e3c")
                        }>
                        <FiEdit2 size={18} />
                        {editMode ? "Cancel Edit" : "Edit Profile"}
                      </button>
                      <button
                        type='button'
                        onClick={handleLogout}
                        className='w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-xl font-semibold hover:bg-red-100 transition-all duration-200'>
                        <FiLogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>

                {/* Profile Form */}
                <div className='lg:col-span-2'>
                  <form
                    onSubmit={handleSubmitProfile(handleSave)}
                    className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-sm font-semibold text-app-secondary mb-2'>
                          Full Name *
                        </label>
                        <input
                          type='text'
                          {...registerProfile("username", {
                            required: "Full name is required",
                          })}
                          disabled={!editMode}
                          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                            editMode
                              ? "border-app-primary/20 focus:border-app-primary focus:outline-none focus:ring-2 focus:ring-app-primary/20 bg-white text-app-secondary"
                              : "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                          }`}
                        />
                        {profileErrors.username && (
                          <p className='text-red-500 text-sm mt-1'>
                            {profileErrors.username.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className='block text-sm font-semibold text-gray-400 mb-2'>
                          Email Address
                        </label>
                        <input
                          type='email'
                          {...registerProfile("email")}
                          disabled
                          className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed'
                        />
                        <p className='text-xs text-gray-400 mt-1'>
                          Email cannot be changed
                        </p>
                      </div>

                      <div>
                        <label className='block text-sm font-semibold text-app-secondary mb-2'>
                          Phone Number
                        </label>
                        <input
                          type='text'
                          {...registerProfile("phone")}
                          disabled={!editMode}
                          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                            editMode
                              ? "border-app-primary/20 focus:border-app-primary focus:outline-none focus:ring-2 focus:ring-app-primary/20 bg-white text-app-secondary"
                              : "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                          }`}
                        />
                      </div>

                      <div>
                        <label className='block text-sm font-semibold text-gray-400 mb-2'>
                          Account Role
                        </label>
                        <input
                          type='text'
                          {...registerProfile("role")}
                          disabled
                          className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed'
                        />
                        <p className='text-xs text-gray-400 mt-1'>
                          Contact support to change role
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-semibold text-app-secondary mb-2'>
                        Address
                      </label>
                      <input
                        type='text'
                        {...registerProfile("address")}
                        disabled={!editMode}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                          editMode
                            ? "border-app-primary/20 focus:border-app-primary focus:outline-none focus:ring-2 focus:ring-app-primary/20 bg-white text-app-secondary"
                            : "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                        }`}
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-semibold text-app-secondary mb-2'>
                        Profile Image URL
                      </label>
                      <input
                        type='url'
                        {...registerProfile("avatar")}
                        disabled={!editMode}
                        placeholder={
                          editMode
                            ? "https://example.com/image.jpg"
                            : "Click Edit to change avatar"
                        }
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                          editMode
                            ? "border-app-primary/20 focus:border-app-primary focus:outline-none focus:ring-2 focus:ring-app-primary/20 bg-white text-app-secondary"
                            : "border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                        }`}
                      />
                      <p className='text-xs text-gray-500 mt-1'>
                        {editMode
                          ? "Enter a valid image URL for your profile picture"
                          : "Profile picture can be updated in edit mode"}
                      </p>
                    </div>

                    {/* Messages */}
                    {error && (
                      <div className='bg-red-50 border border-red-200 rounded-xl p-4'>
                        <p className='text-red-600 font-medium'>{error}</p>
                      </div>
                    )}
                    {success && (
                      <div className='bg-green-50 border border-green-200 rounded-xl p-4'>
                        <p className='text-green-600 font-medium'>{success}</p>
                      </div>
                    )}

                    {/* Save Button */}
                    {editMode && (
                      <div className='pt-4'>
                        <button
                          type='submit'
                          disabled={loading}
                          className='w-full md:w-auto text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed'
                          style={{
                            backgroundColor: "#388e3c",
                          }}
                          onMouseEnter={(e) =>
                            !loading &&
                            (e.target.style.backgroundColor = "#4caf50")
                          }
                          onMouseLeave={(e) =>
                            !loading &&
                            (e.target.style.backgroundColor = "#388e3c")
                          }>
                          {loading ? "Saving Changes..." : "Save Changes"}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className='bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden'>
            <div className='bg-gradient-to-r from-orange-50/50 to-red-50/50 px-8 py-6 border-b border-gray-100'>
              <h2 className='text-xl font-bold text-app-tertiary flex items-center gap-3'>
                <FiKey className='text-orange-500' size={20} />
                Security Settings
              </h2>
            </div>

            <div className='p-8'>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Security Info */}
                <div className='lg:col-span-1'>
                  <div className='bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 text-center h-fit'>
                    <div className='bg-gradient-to-br from-orange-100 to-red-100 rounded-full p-6 w-20 h-20 mx-auto flex items-center justify-center mb-6'>
                      <FiKey className='text-orange-600' size={32} />
                    </div>
                    <h3 className='text-xl font-bold text-app-secondary mb-4'>
                      Password Security
                    </h3>
                    <p className='text-gray-600 text-sm leading-relaxed'>
                      Keep your account secure by using a strong password and
                      changing it regularly
                    </p>
                  </div>
                </div>

                {/* Password Form */}
                <div className='lg:col-span-2'>
                  <form
                    onSubmit={handleSubmitPassword(handlePasswordSubmit)}
                    className='space-y-6'>
                    <div>
                      <label className='block text-sm font-semibold text-app-secondary mb-2'>
                        Current Password *
                      </label>
                      <input
                        type='password'
                        {...registerPassword("old", {
                          required: "Current password is required",
                        })}
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200'
                      />
                      {passwordErrors.old && (
                        <p className='text-red-500 text-sm mt-1'>
                          {passwordErrors.old.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-semibold text-app-secondary mb-2'>
                        New Password *
                      </label>
                      <input
                        type='password'
                        {...registerPassword("new", {
                          required: "New password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200'
                      />
                      {passwordErrors.new && (
                        <p className='text-red-500 text-sm mt-1'>
                          {passwordErrors.new.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-semibold text-app-secondary mb-2'>
                        Confirm New Password *
                      </label>
                      <input
                        type='password'
                        {...registerPassword("confirm", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === passwordData.new ||
                            "Passwords do not match",
                        })}
                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-200'
                      />
                      {passwordErrors.confirm && (
                        <p className='text-red-500 text-sm mt-1'>
                          {passwordErrors.confirm.message}
                        </p>
                      )}
                    </div>

                    {/* Password Messages */}
                    {passwordError && (
                      <div className='bg-red-50 border border-red-200 rounded-xl p-4'>
                        <p className='text-red-600 font-medium'>
                          {passwordError}
                        </p>
                      </div>
                    )}
                    {passwordSuccess && (
                      <div className='bg-green-50 border border-green-200 rounded-xl p-4'>
                        <p className='text-green-600 font-medium'>
                          {passwordSuccess}
                        </p>
                      </div>
                    )}

                    {/* Change Password Button */}
                    <div className='pt-4'>
                      <button
                        type='submit'
                        disabled={loading}
                        className='w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed'>
                        {loading ? "Changing Password..." : "Change Password"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
