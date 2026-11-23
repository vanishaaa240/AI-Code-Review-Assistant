
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
        name: res.data.user.name || "",
        email: res.data.user.email || "",
        about: res.data.user.about || "",
        achievements: res.data.user.achievements || [],
      });
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const addAchievement = () => {
    const achievement = newAchievement.trim();

    if (!achievement) return;

    setProfile((prev) => ({
      ...prev,
      achievements: [...prev.achievements, achievement],
    }));

    setNewAchievement("");
  };

  const removeAchievement = (index) => {
    setProfile((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const saveProfile = async () => {
    try {
      setSaving(true);

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

      setProfile((prev) => ({
        ...prev,
        avatar: res.data.user.avatar || prev.avatar,
        about: res.data.user.about || "",
        achievements: res.data.user.achievements || [],
      }));

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="home">
        <Navbar />
        <div className="main-layout">
          <Sidebar />
          <main className="content">
            <div className="profile-loading">Loading your profile...</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <main className="content">
          <div className="profile-container">

            <div className="profile-heading">
              <div>
                <span className="profile-eyebrow">PERSONAL SPACE</span>
                <h1>My Profile</h1>
                <p>Manage your account and showcase your achievements.</p>
              </div>

              <div className="profile-heading-icon">✦</div>
            </div>

            <div className="profile-layout">

              <section className="profile-card profile-identity-card">
                <div className="profile-card-heading">
                  <div>
                    <h2>Profile Identity</h2>
                    <p>Choose how you appear on ReviewAI.</p>
                  </div>
                  <span className="profile-heading-symbol">👤</span>
                </div>

                <div className="avatar-preview">
                  <div className="big-avatar">
                    <img
                      src={profile.avatar}
                      alt="Your profile avatar"
                      className="big-avatar-img"
                    />
                  </div>

                  <h3>{profile.name || "Your Name"}</h3>
                  <p>{profile.email}</p>
                  <span className="profile-member-badge">
                    ✦ ReviewAI Member
                  </span>
                </div>

                <div className="profile-divider"></div>

                <h3 className="avatar-title">Choose Your Avatar</h3>
                <p className="avatar-description">
                  Select an avatar that represents you.
                </p>

                <div className="avatar-list">
                  {avatars.map((avatar, index) => (
                    <button
                      type="button"
                      key={avatar}
                      aria-label={`Select avatar ${index + 1}`}
                      className={
                        profile.avatar === avatar
                          ? "avatar-option active-avatar"
                          : "avatar-option"
                      }
                      onClick={() =>
                        setProfile((prev) => ({ ...prev, avatar }))
                      }
                    >
                      <img src={avatar} alt="" />
                      {profile.avatar === avatar && (
                        <span className="avatar-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </section>

              <div className="profile-details-column">

                <section className="profile-card">
                  <div className="profile-card-heading">
                    <div>
                      <h2>Personal Information</h2>
                      <p>Your basic account details.</p>
                    </div>
                    <span className="profile-heading-symbol">✧</span>
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="profile-name">Full Name</label>
                    <input
                      id="profile-name"
                      type="text"
                      value={profile.name}
                      disabled
                    />
                    <small>Your registered name cannot be changed here.</small>
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="profile-email">Email Address</label>
                    <input
                      id="profile-email"
                      type="email"
                      value={profile.email}
                      disabled
                    />
                  </div>

                  <div className="profile-form-group">
                    <label htmlFor="profile-about">About Me</label>
                    <textarea
                      id="profile-about"
                      rows="5"
                      maxLength={500}
                      placeholder="Tell us about yourself, your interests, and what you're learning..."
                      value={profile.about}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          about: e.target.value,
                        }))
                      }
                    />
                    <div className="character-count">
                      {profile.about.length}/500 characters
                    </div>
                  </div>
                </section>

                <section className="profile-card">
                  <div className="profile-card-heading">
                    <div>
                      <h2>My Achievements</h2>
                      <p>Celebrate your milestones and accomplishments.</p>
                    </div>
                    <span className="profile-heading-symbol">🏆</span>
                  </div>

                  <div className="achievement-input">
                    <input
                      type="text"
                      placeholder="e.g. Won a hackathon..."
                      value={newAchievement}
                      maxLength={150}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addAchievement();
                      }}
                    />

                    <button type="button" onClick={addAchievement}>
                      + Add
                    </button>
                  </div>

                  <div className="achievement-list">
                    {profile.achievements.length > 0 ? (
                      profile.achievements.map((item, index) => (
                        <div key={index} className="achievement-item">
                          <div className="achievement-item-content">
                            <span className="achievement-icon">✦</span>
                            <span>{item}</span>
                          </div>

                          <button
                            type="button"
                            className="remove-achievement"
                            aria-label="Remove achievement"
                            onClick={() => removeAchievement(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="empty-achievements">
                        <span>✧</span>
                        <p>No achievements added yet.</p>
                        <small>Your accomplishments will appear here.</small>
                      </div>
                    )}
                  </div>
                </section>

                <div className="profile-save-area">
                  <p>Your changes are saved only when you click Save Changes.</p>

                  <button
                    type="button"
                    className="save-btn"
                    onClick={saveProfile}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "✦ Save Changes"}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
