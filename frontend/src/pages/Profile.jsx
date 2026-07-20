import "./Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Profile() {

  const avatars = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
    "/avatars/avatar5.png",
    "/avatars/avatar6.png",
    "/avatars/avatar7.png",
    "/avatars/avatar8.png",
  ];

  const [profile, setProfile] = useState({
    avatar: "/avatars/avatar1.png",
    name: "",
    email: "",
    about: "",
    achievements: [],
  });

  const [newAchievement, setNewAchievement] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile({
        avatar: res.data.user.avatar || "/avatars/avatar1.png",
        name: res.data.user.name,
        email: res.data.user.email,
        about: res.data.user.about || "",
        achievements: res.data.user.achievements || [],
      });

    } catch (err) {

      console.log(err);

    }

  };

  const addAchievement = () => {

    if (!newAchievement.trim()) return;

    setProfile({
      ...profile,
      achievements: [
        ...profile.achievements,
        newAchievement,
      ],
    });

    setNewAchievement("");

  };

  const removeAchievement = (index) => {

    const updatedAchievements = [...profile.achievements];

    updatedAchievements.splice(index, 1);

    setProfile({
      ...profile,
      achievements: updatedAchievements,
    });

  };

  const saveProfile = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/profile`,
        {
          avatar: profile.avatar,
          about: profile.about,
          achievements: profile.achievements,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile({
        ...profile,
        avatar: res.data.user.avatar,
        about: res.data.user.about,
        achievements: res.data.user.achievements,
      });

      alert("✅ Profile Updated Successfully!");

    } catch (err) {

      console.log(err);

      alert("❌ Failed to update profile");

    }

  };

  return (

    <div className="home">

      <Navbar />

      <div className="main-layout">

        <Sidebar />

        <div className="content">

          <div className="profile-container">

            <div className="profile-card">

              <h2>👤 My Profile</h2>

              <div className="avatar-section">

                <div className="big-avatar">

                  <img
                    src={profile.avatar}
                    alt="Avatar"
                    className="big-avatar-img"
                  />

                </div>

                <h3>Select Avatar</h3>

                <div className="avatar-list">

                  {avatars.map((avatar) => (
                    <img
                      key={avatar}
                      src={avatar}
                      alt="Avatar"
                      className={
                        profile.avatar === avatar
                          ? "avatar-img active-avatar"
                          : "avatar-img"
                      }
                      onClick={() =>
                        setProfile({
                          ...profile,
                          avatar,
                        })
                      }
                    />
                  ))}

                </div>

              </div>

              <label>Name</label>

              <input
                type="text"
                value={profile.name}
                disabled
              />

              <label>Email</label>

              <input
                type="email"
                value={profile.email}
                disabled
              />

              <label>About</label>

              <textarea
                rows="4"
                placeholder="Tell something about yourself..."
                value={profile.about}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    about: e.target.value,
                  })
                }
              />

              <h3>🏆 Achievements</h3>

              <div className="achievement-input">

                <input
                  type="text"
                  placeholder="Add Achievement..."
                  value={newAchievement}
                  onChange={(e) =>
                    setNewAchievement(e.target.value)
                  }
                />

                <button onClick={addAchievement}>
                  ➕ Add
                </button>

              </div>

              <div className="achievement-list">

                {profile.achievements.map((item, index) => (

                  <div
                    key={index}
                    className="achievement-item"
                  >

                    <span>{item}</span>

                    <button
                      onClick={() =>
                        removeAchievement(index)
                      }
                    >
                      ❌
                    </button>

                  </div>

                ))}

              </div>

              <button
                className="save-btn"
                onClick={saveProfile}
              >
                💾 Save Changes
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;