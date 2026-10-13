import React from 'react';

/**
 * AboutSection Component
 * 
 * Demonstrates:
 * - Semantic HTML5 section structuring
 * - Clear 3-step process workflow
 * - Value proposition and problem-solving explanation
 */
const AboutSection = () => {
  const processSteps = [
    {
      step: '1',
      title: 'Explore Opportunities',
      desc: 'Discover active volunteering drives across environment, healthcare, education, elder care, and community food drives.',
      icon: 'bi-compass'
    },
    {
      step: '2',
      title: 'Choose an Activity',
      desc: 'Review event prerequisites, time commitments, slot availability, and venue locations that fit your schedule.',
      icon: 'bi-check2-square'
    },
    {
      step: '3',
      title: 'Register & Make an Impact',
      desc: 'Complete the instant registration form, receive your official digital pass, and join hands with fellow changemakers.',
      icon: 'bi-award'
    }
  ];

  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">
            <i className="bi bi-info-circle"></i> How It Works
          </span>
          <h2 className="section-title">Empowering Grassroots Action</h2>
          <p className="section-subtitle">
            VolunConnect bridges the gap between passionate volunteers and community organizations, 
            replacing fragmented manual forms with a seamless digital platform.
          </p>
        </div>

        {/* 3-Step Process Workflow Cards */}
        <div className="row g-4 mb-5">
          {processSteps.map((item) => (
            <div key={item.step} className="col-12 col-md-4">
              <div className="step-card">
                <div className="step-number-badge">
                  <span>{item.step}</span>
                </div>
                <h3 className="step-card-title">{item.title}</h3>
                <p className="step-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Core Pillars / Values Banner */}
        <div className="values-banner">
          <div className="row g-4 align-items-center">
            
            <div className="col-12 col-lg-3">
              <div className="value-item">
                <div className="value-icon-box">
                  <i className="bi bi-shield-check"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1 fs-6">Verified NGO Drives</h5>
                  <p className="small text-muted mb-0">Partnered with certified community groups.</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3">
              <div className="value-item">
                <div className="value-icon-box">
                  <i className="bi bi-clock"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1 fs-6">Flexible Scheduling</h5>
                  <p className="small text-muted mb-0">Weekend, morning, and evening shifts.</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3">
              <div className="value-item">
                <div className="value-icon-box">
                  <i className="bi bi-patch-check"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1 fs-6">Verified Certificates</h5>
                  <p className="small text-muted mb-0">Official participation certificates provided.</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3">
              <div className="value-item">
                <div className="value-icon-box">
                  <i className="bi bi-people"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1 fs-6">Inclusive Community</h5>
                  <p className="small text-muted mb-0">Welcoming students, pros & seniors alike.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
