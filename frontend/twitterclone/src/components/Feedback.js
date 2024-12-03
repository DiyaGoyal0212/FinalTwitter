import React, { useRef } from 'react';
import './Feedback.css';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const Feedback = () => {
  const form = useRef(); 

  const sendEmail = (e) => {
    e.preventDefault(); 

    emailjs
      .sendForm('service_ovmp854', 'template_1wazrss', form.current, {
        publicKey: 'pN7I5nTBujsMx0CV3', 
      })
      .then(
        () => {
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully",
                icon: "success"
            });
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <section className="contact">
      <form ref={form} onSubmit={sendEmail}> 
        <h2><b>Feedback Form</b></h2>
        <div className="input-box">
          <label>Full Name</label>
          <input
            type="text"
            className="field"
            placeholder="Enter your name"
            name="from_name"
            required
          />
        </div>
        <div className="input-box">
          <label>Email Address</label>
          <input
            type="email"
            className="field"
            placeholder="Enter your email"
            name="from_email"
            required
          />
        </div>
        <div className="input-box">
          <label>Your Message</label>
          <textarea
            name="message"
            className="field mess"
            placeholder="Enter Your Message"
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default Feedback;