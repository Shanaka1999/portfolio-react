import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import styled from "styled-components";

// npm i emailjs-com

const Contact = () => {
  const form = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const name = formData.get("user_name");
    const email = formData.get("user_email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      setError("Please fill in all the required fields.");
      setSuccess("");
      setIsPopupVisible(true);
      return;
    }

    emailjs
      .sendForm(
        "#######",
        "#######",
        form.current,
        "#########"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          setError("");
          setSuccess("Email sent successfully! ");
          setIsPopupVisible(true);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <StyledContactForm>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <form ref={form} onSubmit={sendEmail}>
        <label>Your Name</label>
        <input type="text" name="user_name" />
        <label>Your Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
      {success && isPopupVisible && (
        <SuccessMessagePopup>
          {success}
          <button onClick={closePopup}>Close</button>
        </SuccessMessagePopup>
      )}
    </StyledContactForm>
    
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  /* Common styles for all screen sizes */
  width: 100%;
  font-size: 16px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;

    input,
    textarea {
      width: 100%;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      color: black;
      background-color: #e0e0e0;
      transition: border-color 0.3s ease;

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
      color: #a0a0b5;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }

  /* Responsive styles */
  @media screen and (max-width: 600px) {
    width: 90%;
    margin: 0 auto;

    form {
      input,
      textarea {
        font-size: 14px;
      }
    }
  }

  @media screen and (min-width: 601px) and (max-width: 900px) {
    width: 70%;
    margin: 0 auto;

    form {
      input,
      textarea {
        font-size: 15px;
      }
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;


// const SuccessMessage = styled.div`
//   color: green;
//   margin-bottom: 10px;
// `;

const SuccessMessagePopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid green;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0);
  z-index: 9999;
  color: teal;
  background: rgba(0, 206, 158, 0.0);

  position: relative;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  z-index: 9999;

  

  button {
    margin-top: 10px;
    cursor: pointer;
    color:red
  }
`;
