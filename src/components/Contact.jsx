import React from "react";
import "../styles/Contact.css";

const ContactPage = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        <h2 className="contact-title">📞 Liên hệ với chúng tôi</h2>
        <div className="contact-info">
          <p className="restaurant-name">
            <strong>Nhóm 3 Quán</strong>
          </p>
          <p>
            <span>Số điện thoại:</span> 0123-456-789
          </p>
        </div>

        <div className="social-section">
          <h3>Kết nối với chúng tôi</h3>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/nhom3quanan"
              target="_blank"
              rel="noopener noreferrer"
              className="icon facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.youtube.com/@nhom3quanan"
              target="_blank"
              rel="noopener noreferrer"
              className="icon youtube"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a
              href="https://www.google.com/maps/place/Nhóm+3+Quán+Ăn"
              target="_blank"
              rel="noopener noreferrer"
              className="icon google"
            >
              <i className="fab fa-google"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
