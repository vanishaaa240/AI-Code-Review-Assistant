import "./DashboardStats.css";

function DashboardStats({ stats }) {

  if (!stats) return null;

  return (

    <div className="stats-grid">

      {/* Total Reviews */}

      <div className="stat-card">

        <h3>📊 Total Reviews</h3>

        <h1>{stats.totalReviews || 0}</h1>

      </div>

      {/* Average Score */}

      <div className="stat-card">

        <h3>⭐ Average Score</h3>

        <h1>{stats.averageScore || 0}/100</h1>

      </div>

      {/* Highest Score */}

      <div className="stat-card">

        <h3>🏆 Highest Score</h3>

        <h1>{stats.highestScore || 0}/100</h1>

      </div>

      {/* Favourite Language */}

      <div className="stat-card">

        <h3>💻 Favourite Language</h3>

        <h1>{stats.favoriteLanguage || "N/A"}</h1>

      </div>

    </div>

  );

}

export default DashboardStats;