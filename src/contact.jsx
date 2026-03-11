// ContactUsWithEmailJS.jsx
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactUsWithEmailJS = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        form.current,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      if (result.text === 'OK') {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully!'
        });
        form.current.reset();
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      {/* Same styling as above */}
      <form ref={form} onSubmit={sendEmail}>
        {/* Same form fields as above */}
      </form>
    </div>
  );
};