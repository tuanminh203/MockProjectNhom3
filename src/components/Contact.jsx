import React from "react";
import "../styles/Contact.css";

const ContactPage = () => {
  // Thay đổi URL này bằng địa chỉ Google Maps của quán bạn
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15712.923168853758!2d105.77443152646392!3d21.02851147517173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd1e9c20d%3A0x6a1c1d88b0a94b41!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1678250000000!5m2!1sen!2s";

  return (
    <div className="contact-page-container">
      <div className="contact-info-card">
        <h2 className="title">Liên hệ với chúng tôi</h2>
        <div className="info-item">
          <i className="fas fa-map-marker-alt"></i>
          <p>Nhóm 3 Quán, Hà Nội</p>
        </div>
        <div className="info-item">
          <i className="fas fa-phone-alt"></i>
          <p>0123-456-789</p>
        </div>
        <div className="info-item">
          <i className="fas fa-envelope"></i>
          <p>contact@nhom3quanan.com</p>
        </div>
      </div>

      <div className="map-card">
        <h2 className="title">Vị trí của chúng tôi</h2>
        <iframe
          src={mapUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
        ></iframe>
      </div>
      
      <div className="social-card">
        <h2 className="title">Kết nối trên mạng xã hội</h2>
        <div className="social-links">
          <a href="https://www.facebook.com/nhom3quanan" target="_blank" rel="noopener noreferrer" className="social-link facebook">
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          <a href="https://www.youtube.com/@nhom3quanan" target="_blank" rel="noopener noreferrer" className="social-link youtube">
            <i className="fab fa-youtube"></i> YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;