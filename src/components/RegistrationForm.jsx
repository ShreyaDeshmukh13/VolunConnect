import React, { useState, useEffect } from 'react';

/**
 * Controlled RegistrationForm Component
 * 
 * Demonstrates:
 * - Controlled Components in React (Form input values bound to React state)
 * - State management with useState (formData, formErrors, touched fields)
 * - Lifecycle synchronization with useEffect (syncing selectedOpportunity prop with form state)
 * - Event handling: onChange, onSubmit, onReset, onClick
 * - Comprehensive client-side validation logic
 * - Conditional rendering of validation error alerts and pre-selection banner
 */
const RegistrationForm = ({
  opportunities,
  selectedOpportunity,
  onRegisterSuccess,
  onClearSelectedOpportunity
}) => {
  // 1. Initial State Definition
  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    age: '',
    opportunityId: selectedOpportunity ? String(selectedOpportunity.id) : '',
    interest: 'Environment',
    experience: 'First-time Volunteer',
    availability: 'Weekends Only',
    city: '',
    emergencyContact: '',
    motivation: '',
    termsAgreed: false
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // 2. Synchronize form's opportunityId whenever selectedOpportunity prop changes
  useEffect(() => {
    if (selectedOpportunity) {
      setFormData((prevData) => ({
        ...prevData,
        opportunityId: String(selectedOpportunity.id),
        // If interest isn't set, default to the opportunity category
        interest: selectedOpportunity.category || prevData.interest
      }));
      // Clear opportunityId error if any
      setErrors((prev) => ({ ...prev, opportunityId: '' }));
    }
  }, [selectedOpportunity]);

  // 3. Generic Change Handler for Controlled Inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear specific error on user input if field was previously invalid
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Mark field as touched on blur for better UX
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  // 4. Single-field validation helper
  const validateField = (fieldName, value) => {
    let error = '';

    switch (fieldName) {
      case 'name':
        if (!value || value.trim().length < 3) {
          error = 'Full name is required (at least 3 characters).';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Name must only contain letters and spaces.';
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value.trim())) {
          error = 'Please provide a valid email address (e.g. name@example.com).';
        }
        break;

      case 'phone':
        const phoneRegex = /^[6-9]\d{9}$/;
        const cleanPhone = String(value).replace(/[\s-]/g, '');
        if (!value || !phoneRegex.test(cleanPhone)) {
          error = 'Enter a valid 10-digit mobile number.';
        }
        break;

      case 'age':
        const numAge = Number(value);
        if (!value || isNaN(numAge) || numAge < 16 || numAge > 85) {
          error = 'Volunteer age must be between 16 and 85 years.';
        }
        break;

      case 'opportunityId':
        if (!value) {
          error = 'Please select a volunteering opportunity drive.';
        }
        break;

      case 'city':
        if (!value || value.trim().length < 2) {
          error = 'City/Location is required.';
        }
        break;

      case 'motivation':
        if (!value || value.trim().length < 20) {
          error = 'Please provide at least 20 characters explaining your motivation.';
        }
        break;

      case 'termsAgreed':
        if (!value) {
          error = 'You must agree to the volunteer code of conduct.';
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
    return error;
  };

  // 5. Full Form Validation on Submit
  const validateForm = () => {
    const newErrors = {};

    // Validate all required fields
    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = 'Full name is required (min 3 characters).';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name must only contain letters and spaces.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    const cleanPhone = String(formData.phone).replace(/[\s-]/g, '');
    if (!formData.phone || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Enter a valid 10-digit mobile number.';
    }

    const numAge = Number(formData.age);
    if (!formData.age || isNaN(numAge) || numAge < 16 || numAge > 85) {
      newErrors.age = 'Age must be between 16 and 85.';
    }

    if (!formData.opportunityId) {
      newErrors.opportunityId = 'Please select a volunteering drive.';
    }

    if (!formData.city || formData.city.trim().length < 2) {
      newErrors.city = 'City/Location is required.';
    }

    if (!formData.motivation || formData.motivation.trim().length < 20) {
      newErrors.motivation = 'Please share your motivation (minimum 20 characters).';
    }

    if (!formData.termsAgreed) {
      newErrors.termsAgreed = 'You must agree to the volunteer code of conduct.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 6. Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (validateForm()) {
      // Find full opportunity details
      const matchedOpp = opportunities.find(
        (opp) => String(opp.id) === String(formData.opportunityId)
      );

      // Trigger success callback passed from parent
      onRegisterSuccess({
        ...formData,
        opportunityDetails: matchedOpp,
        registrationId: `VOL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        registeredAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });
    }
  };

  // 7. Reset Handler
  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setTouched({});
    if (onClearSelectedOpportunity) {
      onClearSelectedOpportunity();
    }
  };

  return (
    <section id="register" className="registration-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            <i className="bi bi-pencil-square"></i> Quick Enrollment
          </span>
          <h2 className="section-title">Volunteer Registration Form</h2>
          <p className="section-subtitle">
            Fill out the form below to confirm your spot in our upcoming drives. 
            All submissions are processed instantly.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="registration-card">
              
              {/* Pre-Selected Opportunity Banner (Conditional Rendering) */}
              {selectedOpportunity && (
                <div className="selected-alert-banner">
                  <div className="selected-alert-content">
                    <i className="bi bi-check-circle-fill"></i>
                    <div>
                      <div className="fw-bold text-dark">
                        Selected Drive: {selectedOpportunity.title}
                      </div>
                      <div className="text-muted small">
                        {selectedOpportunity.date} • {selectedOpportunity.location}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={onClearSelectedOpportunity}
                    title="Clear selected drive"
                  >
                    <i className="bi bi-x-lg"></i> Change Drive
                  </button>
                </div>
              )}

              {/* Form Element with React Event Handler onSubmit */}
              <form onSubmit={handleSubmit} noValidate>

                {/* Section A: Personal Information */}
                <div className="form-group-header">
                  <i className="bi bi-person-badge"></i>
                  <span>1. Personal Information</span>
                </div>

                <div className="row g-3 mb-4">
                  
                  {/* Full Name */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="name" className="form-label-custom">
                      Full Name <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control-custom ${errors.name && touched.name ? 'is-invalid' : ''}`}
                      placeholder="e.g. Shreya Deshmukh"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.name && touched.name && (
                      <div className="error-message">
                        <i className="bi bi-exclamation-circle"></i> {errors.name}
                      </div>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="email" className="form-label-custom">
                      Email Address <span className="required-star">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control-custom ${errors.email && touched.email ? 'is-invalid' : ''}`}
                      placeholder="e.g. shreya@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.email && touched.email && (
                      <div className="error-message">
                        <i className="bi bi-exclamation-circle"></i> {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="phone" className="form-label-custom">
                      Phone Number (10 Digits) <span className="required-star">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      maxLength="10"
                      className={`form-control-custom ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.phone && touched.phone && (
                      <div className="error-message">
                        <i className="bi bi-exclamation-circle"></i> {errors.phone}
                      </div>
                    )}
                  </div>

                  {/* Age */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="age" className="form-label-custom">
                      Age (Years) <span className="required-star">*</span>
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      min="16"
                      max="85"
                      className={`form-control-custom ${errors.age && touched.age ? 'is-invalid' : ''}`}
                      placeholder="e.g. 21"
                      value={formData.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.age && touched.age && (
                      <div className="error-message">
                        <i className="bi bi-exclamation-circle"></i> {errors.age}
                      </div>
                    )}
                  </div>

                </div>

                {/* Section B: Volunteering Preferences */}
                <div className="form-group-header">
                  <i className="bi bi-heart-pulse"></i>
                  <span>2. Volunteering Preferences</span>
                </div>

                <div className="row g-3 mb-4">
                  
                  {/* Select Opportunity */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="opportunityId" className="form-label-custom">
                      Choose Volunteer Drive <span className="required-star">*</span>
                    </label>
                    <select
                      id="opportunityId"
                      name="opportunityId"
                      className={`form-select-custom ${errors.opportunityId && touched.opportunityId ? 'is-invalid' : ''}`}
                      value={formData.opportunityId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    >
                      <option value="">-- Select an Upcoming Drive --</option>
                      {opportunities.map((opp) => (
                        <option key={opp.id} value={opp.id} disabled={opp.registeredCount >= opp.slots}>
                          {opp.title} ({opp.date} - {opp.category}){opp.registeredCount >= opp.slots ? ' - FULL' : ''}
                        </option>
                      ))}
                    </select>
                    {errors.opportunityId && touched.opportunityId && (
                      <div className="error-message">
                        <i className="bi bi-exclamation-circle"></i> {errors.opportunityId}
                      </div>
                    )}
                  </div>

                  {/* Primary Area of Interest */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="interest" className="form-label-custom">
                      Primary Area of Interest
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      className="form-select-custom"
                      value={formData.interest}
                      onChange={handleChange}
                    >
                      <option value="Environment">Environment & Ecology</option>
                      <option value="Sanitation & Hygiene">Sanitation & Cleanliness</option>
                      <option value="Healthcare">Healthcare & Blood Donation</option>
                      <option value="Education">Education & Tutoring</option>
                      <option value="Community Welfare">Community & Hunger Relief</option>
                      <option value="Elder Care">Elder & Senior Care</option>
                    </select>
                  </div>

                  {/* Availability */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="availability" className="form-label-custom">
                      Your General Availability <span className="required-star">*</span>
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      className="form-select-custom"
                      value={formData.availability}
                      onChange={handleChange}
                    >
                      <option value="Weekends Only">Weekends Only (Sat / Sun)</option>
                      <option value="Weekdays Only">Weekdays (Mon - Fri)</option>
                      <option value="Morning Shifts">Morning Shifts (07:00 AM - 12:00 PM)</option>
                      <option value="Evening Shifts">Evening Shifts (02:00 PM - 06:00 PM)</option>
                      <option value="Flexible Schedule">Flexible / Any Time</option>
                    </select>
                  </div>

                  {/* Prior Experience Radio Options */}
                  <div className="col-12 col-md-6">
                    <label className="form-label-custom">
                      Prior Volunteering Experience
                    </label>
                    <div className="radio-pill-group">
                      {['First-time Volunteer', '1 - 2 Years', '3+ Years'].map((exp) => (
                        <div key={exp} className="flex-fill">
                          <input
                            type="radio"
                            id={`exp-${exp}`}
                            name="experience"
                            value={exp}
                            checked={formData.experience === exp}
                            onChange={handleChange}
                            className="d-none"
                          />
                          <label htmlFor={`exp-${exp}`} className="radio-pill-label w-100 mb-0">
                            {exp}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Section C: Additional Information */}
                <div className="form-group-header">
                  <i className="bi bi-geo-alt"></i>
                  <span>3. Additional Details & Commitment</span>
                </div>

                <div className="row g-3 mb-4">
                  
                  {/* City */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="city" className="form-label-custom">
                      Residential City / Area <span className="required-star">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className={`form-control-custom ${errors.city && touched.city ? 'is-invalid' : ''}`}
                      placeholder="e.g. Pune / Mumbai / Bangalore"
                      value={formData.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.city && touched.city && (
                      <div className="error-message">
                        <i className="bi bi-exclamation-circle"></i> {errors.city}
                      </div>
                    )}
                  </div>

                  {/* Emergency Contact */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="emergencyContact" className="form-label-custom">
                      Emergency Contact Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="emergencyContact"
                      name="emergencyContact"
                      maxLength="10"
                      className="form-control-custom"
                      placeholder="e.g. 9811223344 (Parent / Guardian)"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Motivation Message */}
                  <div className="col-12">
                    <label htmlFor="motivation" className="form-label-custom">
                      Why do you want to volunteer? (Short Statement) <span className="required-star">*</span>
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      rows="3"
                      className={`form-control-custom ${errors.motivation && touched.motivation ? 'is-invalid' : ''}`}
                      placeholder="Share what drives you to participate in community initiatives (minimum 20 characters)..."
                      value={formData.motivation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    ></textarea>
                    <div className="d-flex justify-content-between mt-1">
                      {errors.motivation && touched.motivation ? (
                        <div className="error-message">
                          <i className="bi bi-exclamation-circle"></i> {errors.motivation}
                        </div>
                      ) : (
                        <span className="small text-muted">Minimum 20 characters</span>
                      )}
                      <span className="small text-muted">
                        {formData.motivation.length} characters
                      </span>
                    </div>
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <div className="col-12 mt-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="termsAgreed"
                        name="termsAgreed"
                        className={`form-check-input ${errors.termsAgreed && touched.termsAgreed ? 'is-invalid' : ''}`}
                        checked={formData.termsAgreed}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                      <label htmlFor="termsAgreed" className="form-check-label small text-muted">
                        I confirm that all information provided is accurate, and I agree to abide by the 
                        community safety guidelines, code of conduct, and orientation instructions. <span className="required-star">*</span>
                      </label>
                    </div>
                    {errors.termsAgreed && touched.termsAgreed && (
                      <div className="error-message mt-1">
                        <i className="bi bi-exclamation-circle"></i> {errors.termsAgreed}
                      </div>
                    )}
                  </div>

                </div>

                {/* Form Action Buttons */}
                <div className="d-flex gap-3 justify-content-end pt-3 border-top flex-wrap">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4 py-2"
                    onClick={handleReset}
                  >
                    <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Form
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary-custom px-5 py-2"
                  >
                    <i className="bi bi-send-check-fill"></i> Submit Registration
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RegistrationForm;
