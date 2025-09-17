import React from "react";
import "../styles/TeamPlaceholders.css";

const TeamPlaceholders = () => {
  const teamMembers = [
    {
      id: 1,
      name: "S Fahad",
      role: "President",
      department: "Student Forum - IV Year",
      image: "/images/team/s-fahad.jpg",
      email: "fahad@zehinx25.com",
      linkedin: "https://linkedin.com/in/sfahad",
      bio: "Leading the entire symposium organization with vision and dedication",
    },
    {
      id: 2,
      name: "R Musthalak Ahamed",
      role: "Vice President",
      department: "Student Forum - IV Year",
      image: "/images/team/musthalak-ahamed.jpg",
      email: "musthalak@zehinx25.com",
      linkedin: "https://linkedin.com/in/rmusthalak",
      bio: "Supporting overall coordination and strategic planning for Zehinx 25",
    },
    {
      id: 3,
      name: "R Mohamed Thoufiq",
      role: "Secretary",
      department: "Student Forum - III Year",
      image: "/images/team/mohamed-thoufiq.jpg",
      email: "thoufiq@zehinx25.com",
      linkedin: "https://linkedin.com/in/rthoufiq",
      bio: "Managing documentation, communications, and administrative tasks",
    },
    {
      id: 4,
      name: "Abbas",
      role: "Treasurer",
      department: "Student Forum - IV Year",
      image: "/images/team/abbas.jpg",
      email: "abbas@zehinx25.com",
      linkedin: "https://linkedin.com/in/abbas",
      bio: "Handling financial planning, budgeting, and expense management",
    },
    {
      id: 6,
      name: "Muzamil",
      role: "Technical Leader",
      department: "Student Forum - IV Year",
      image: "/images/team/muzamil.jpg",
      email: "muzamil@zehinx25.com",
      linkedin: "https://linkedin.com/in/muzamil",
      bio: "Leading all technical events and programming competitions Mobile:80157 31017",
    },
    {
      id: 7,
      name: "Nilofer Nisha",
      role: "Co-ordinator",
      department: "Student Forum - IV Year",
      image: "/images/team/nilofer-nisha.jpg",
      email: "nisha@zehinx25.com",
      linkedin: "https://linkedin.com/in/nilofernisha",
      bio: "General coordination and inter-departmental communication",
    },
    {
      id: 8,
      name: "Amin Howth",
      role: "Non-Technical Coordinator",
      department: "Student Forum - IV Year",
      image: "/images/team/amin-howth.jpg",
      email: "amin@zehinx25.com",
      linkedin: "https://linkedin.com/in/aminhowth",
      bio: "Managing creative events, presentations, and non-technical competitions",
    },
    {
      id: 9,
      name: "Afra Thasneem",
      role: "Event Arrangement Lead",
      department: "Student Forum - IV Year",
      image: "/images/team/afra-thasneem.jpg",
      email: "afra@zehinx25.com",
      linkedin: "https://linkedin.com/in/afrathasneem",
      bio: "Planning and organizing event logistics, venue management",
    },
    {
      id: 10,
      name: "Sankita",
      role: "Event Arrangement Team",
      department: "Student Forum - IV Year",
      image: "/images/team/sankita.jpg",
      email: "sankita@zehinx25.com",
      linkedin: "https://linkedin.com/in/sankita",
      bio: "Assisting with event setup, decoration, and participant coordination",
    },
    {
      id: 11,
      name: "Arshad Ali",
      role: "PR Team Lead",
      department: "Student Forum - IV Year",
      image: "/images/team/arshad-ali.jpg",
      email: "arshad@zehinx25.com",
      linkedin: "https://linkedin.com/in/arshadali",
      bio: "Managing public relations, social media, and external communications",
    },
    {
      id: 12,
      name: "Hemanth",
      role: "Technical Leader",
      department: "Technical Team - IV Year",
      image: "/images/team/hemanth.jpg",
      email: "hemanth@zehinx25.com",
      linkedin: "https://linkedin.com/in/hemanth",
      bio: "Managing and assisting for all technical related activities ",
    },
    {
      id: 13,
      name: "Safa Simin",
      role: "Technical management",
      department: "Technical Team - IV Year",
      image: "/images/team/safa-simin.jpg",
      email: "safa@zehinx25.com",
      linkedin: "https://linkedin.com/in/safasimin",
      bio: "Managing technical coordination along the teams",
    },
  ];

  const handleImageError = (e) => {
    const name = e.target.alt.replace(/\s+/g, "+");
    e.target.src = `https://ui-avatars.com/api/?name=${name}&size=300&background=ff8800&color=fff&bold=true&format=png`;
  };

  return (
    <section className="team-section">
      <div className="container">
        <h2 className="section-title">Meet Our Team</h2>
        <p className="section-subtitle">
          The dedicated Student Forum behind Zehinx 25
        </p>

        {/* Leadership Team */}
        <div className="team-category">
          <h3 className="category-title">🏆 Executive Leadership</h3>
          <div className="team-grid">
            {teamMembers.slice(0, 4).map((member) => (
              <div key={member.id} className="team-card leadership">
                <div className="team-image-container">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-image"
                    onError={handleImageError}
                  />
                  <div className="team-overlay">
                    <div className="social-links">
                      <a
                        href={`mailto:${member.email}`}
                        className="social-link email"
                      >
                        📧
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link linkedin"
                      >
                        💼
                      </a>
                    </div>
                  </div>
                </div>

                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-department">{member.department}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Team */}
        <div className="team-category">
          <h3 className="category-title">💻 Technical Team</h3>
          <div className="team-grid">
            {[teamMembers[4], teamMembers[10], teamMembers[11]].map(
              (member) => (
                <div key={member.id} className="team-card technical">
                  <div className="team-image-container">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-image"
                      onError={handleImageError}
                    />
                    <div className="team-overlay">
                      <div className="social-links">
                        <a
                          href={`mailto:${member.email}`}
                          className="social-link email"
                        >
                          📧
                        </a>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link linkedin"
                        >
                          💼
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="team-info">
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                    <p className="team-department">{member.department}</p>
                    <p className="team-bio">{member.bio}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Event Management Team */}
        <div className="team-category">
          <h3 className="category-title">🎯 Event Management</h3>
          <div className="team-grid">
            {teamMembers.slice(5, 10).map((member) => (
              <div key={member.id} className="team-card event">
                <div className="team-image-container">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-image"
                    onError={handleImageError}
                  />
                  <div className="team-overlay">
                    <div className="social-links">
                      <a
                        href={`mailto:${member.email}`}
                        className="social-link email"
                      >
                        📧
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link linkedin"
                      >
                        💼
                      </a>
                    </div>
                  </div>
                </div>

                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-department">{member.department}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Built By Section */}
        <div className="team-category built-by-section">
          <h3 className="category-title">Built By</h3>
          <div className="team-grid">
            <div className="team-card developer">
              <div className="team-image-container">
                <img
                  src="/images/team/syed-asadullah-zeeshan.jpg"
                  alt="Syed Asadullah Zeeshan"
                  className="team-image"
                  onError={(e) => {
                    e.target.src =
                      "https://ui-avatars.com/api/?name=Syed+Asadullah+Zeeshan&size=300&background=8A2BE2&color=fff&bold=true&format=png";
                  }}
                />
                <div className="team-overlay">
                  <div className="social-links">
                    <a
                      href="mailto:shanzee1050@gmail.com"
                      className="social-link email"
                    >
                      📧
                    </a>
                    <a
                      href="https://www.linkedin.com/in/s-a-zeeshan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link linkedin"
                    >
                      💼
                    </a>
                  </div>
                </div>
              </div>

              <div className="team-info">
                <h3 className="team-name">Syed Asadullah Zeeshan</h3>
                <p className="team-role">Full Stack Web Developer</p>
                <p className="team-department">Website Developer</p>
                <p className="team-bio">
                  Built the complete Zehinx 25 website with interactive features
                  and modern design
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPlaceholders;
