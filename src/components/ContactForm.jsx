// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [queryType, setQueryType] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRadioClick = (value) => {
    setQueryType(value);
  };

  const validateForm = () => {
    const errors = {};
    if (!firstName) errors.firstName = "This field is required";
    if (!lastName) errors.lastName = "This field is required";
    if (!isValidEmail(email))
      errors.email = "Please enter a valid email address";
    if (!queryType) errors.queryType = "Please select a query type";
    if (!message) errors.message = "This field is required";
    if (!consent)
      errors.consent = "To submit this form, please consent to being contacted";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      resetForm();
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setQueryType("");
    setMessage("");
    setConsent(false);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={styles.contactForm}>
      <h1>Contact Us</h1>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div className={`${styles.formItem} ${styles.firstLastNameContainer}`}>
          <div className={styles.firstName}>
            <label htmlFor="first-name">
              First Name <span className={styles.requiredInput}>*</span>
            </label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={formErrors.firstName ? styles.formError : ""}
            />
            {formErrors.firstName && (
              <p className={styles.formAlert}>{formErrors.firstName}</p>
            )}
          </div>
          <div className={styles.lastName}>
            <label htmlFor="last-name">
              Last Name <span className={styles.requiredInput}>*</span>
            </label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={formErrors.lastName ? styles.formError : ""}
            />
            {formErrors.lastName && (
              <p className={styles.formAlert}>{formErrors.lastName}</p>
            )}
          </div>
        </div>
        <div className={styles.formItem}>
          <label htmlFor="email">
            Email Address <span className={styles.requiredInput}>*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={formErrors.email ? styles.formError : ""}
          />
          {formErrors.email && (
            <p className={styles.formAlert}>{formErrors.email}</p>
          )}
        </div>
        <div className={styles.formItem}>
          <label>
            Query Type <span className={styles.requiredInput}>*</span>
          </label>
          <div className={styles.radioInputs}>
            <div
              className={`${styles.radioOption} ${
                queryType === "General Enquiry" ? styles.active : ""
              }`}
              onClick={() => handleRadioClick("General Enquiry")}
            >
              <input
                type="radio"
                id="general-enquiry"
                name="query-type"
                value="General Enquiry"
                checked={queryType === "General Enquiry"}
                onChange={() => {}}
              />
              <label htmlFor="general-enquiry">General Enquiry</label>
            </div>
            <div
              className={`${styles.radioOption} ${
                queryType === "Support Request" ? styles.active : ""
              }`}
              onClick={() => handleRadioClick("Support Request")}
            >
              <input
                type="radio"
                id="support-request"
                name="query-type"
                value="Support Request"
                checked={queryType === "Support Request"}
                onChange={() => {}}
              />
              <label htmlFor="support-request">Support Request</label>
            </div>
          </div>
          {formErrors.queryType && (
            <p className={styles.formAlert}>{formErrors.queryType}</p>
          )}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="message">
            Message <span className={styles.requiredInput}>*</span>
          </label>
          <textarea
            id="message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={formErrors.message ? styles.formError : ""}
          />
          {formErrors.message && (
            <p className={styles.formAlert}>{formErrors.message}</p>
          )}
        </div>
        <div className={styles.formItem}>
          <div>
            <input
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <label htmlFor="consent">
              I hereby consent to being contacted by the team{" "}
              <span className={styles.requiredInput}>*</span>
            </label>
          </div>
          {formErrors.consent && (
            <p className={styles.formAlert}>{formErrors.consent}</p>
          )}
        </div>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
      {isSubmitted && (
        <div
          id="success-message"
          className={`${styles.successMessage} ${styles.active}`}
        >
          <div className={styles.messageHeader}>
            <img src="src/assets/images/icon-success-check.svg" alt="Success" />
            Message Sent!
          </div>
          <p>Thanks for completing the form. We will be in touch soon!</p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
