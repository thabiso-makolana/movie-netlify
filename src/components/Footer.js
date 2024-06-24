import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Our Culture</a></li>
            <li><a href="#">Giving</a></li>
            <li><a href="#">Partners</a></li>
            <li><a href="#">Press Room</a></li>
            <li><a href="#">Plex Gear</a></li>
            <li><a href="#">The Plex Blog</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Download</h4>
          <ul>
            <li><a href="#">Plex Media Server</a></li>
            <li><a href="#">Apps & Devices</a></li>
            <li><a href="#">Where to Watch</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Watch Free</h4>
          <ul>
            <li><a href="#">TV Channel Finder</a></li>
            <li><a href="#">What to Watch</a></li>
            <li><a href="#">What To Watch on Hulu</a></li>
            <li><a href="#">A24 Collection</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2024 Plex</p>
        <ul>
          <li><a href="#">Privacy & Legal</a></li>
          <li><a href="#">Accessibility</a></li>
          <li><a href="#">Manage Cookie</a></li>
          <li><a href="#">Language: English (US)</a></li>
        </ul>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
