'use client';

import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import LanguageSelector from "./components/LanguageSelector";

// Translations object
const translations = {
  en: {
    welcome: "Welcome to your portal! Please log in",
    email: "Email",
    password: "Password",
    login: "Login",
    createAccount: "Create Account",
    forgotPassword: "Forgot your Password or Email?",
    followUs: "Follow us on digital platforms:",
    developedBy: "Developed by",
    copyright: "Copyright © Portugalenses All rights reserved"
  },
  pt: {
    welcome: "Bem-vindo ao seu portal! Por favor, faça login",
    email: "Email",
    password: "Palavra-passe",
    login: "Entrar",
    createAccount: "Criar Conta",
    forgotPassword: "Esqueceu a sua Palavra-passe ou Email?",
    followUs: "Siga-nos nas plataformas digitais:",
    developedBy: "Desenvolvido por",
    copyright: "Copyright © Portugalenses Todos os direitos reservados"
  }
};

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const router = useRouter();

  const t = translations[currentLanguage as keyof typeof translations];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (email && password) {
      // Store email in localStorage
      localStorage.setItem('userEmail', email);
      // Here you would typically make an API call to validate credentials
      // For now, we'll just redirect if both fields are filled
      router.push('/initial');
    }
  };

  return (
    <div className="login-container">
      {/* Header with language selector */}
      <header className="header">
        <LanguageSelector 
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </header>

      {/* Main content */}
      <main className="main-content">
        {/* Logo */}
        <div className="logo">
          <Image
            src="/icon.png"
            alt="Portal Portugalenses Logo"
            width={100}
            height={100}
            priority
          />
        </div>

        {/* Portal title */}
        <h1 className="portal-title">PORTAL PORTUGALENSES</h1>
        
        {/* Welcome text */}
        <p className="welcome-text">{t.welcome}</p>

        {/* Login form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="form-group">
            <label htmlFor="email">{t.email}</label>
            <div className="input-container">
              <input
                id="email"
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="form-group">
            <label htmlFor="password">{t.password}</label>
            <div className="input-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="input-field password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
                aria-label="toggle password visibility"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* reCAPTCHA */}
          <div className="recaptcha-container">
            <div className="g-recaptcha">
              {/* This is just a placeholder for the reCAPTCHA UI */}
              <div style={{ border: '1px solid #d3d3d3', borderRadius: '3px', width: '300px', height: '74px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#555' }}>
                reCAPTCHA placeholder
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="button-container">
            <button type="submit" className="login-button">
              {t.login}
            </button>
            <button type="button" className="create-account-button">
              {t.createAccount}
            </button>
          </div>

          {/* Forgot password link */}
          <div className="forgot-password">
            <a href="#">{t.forgotPassword}</a>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="address-info">
              <p>R. Bela Vista 638, 4415-170 Pedroso, Portugal</p>
              <p>Tel: +351 227 452 096 (Call to national landline)</p>
            </div>
          </div>
          
          <div className="footer-center">
            <p className="text-center mb-4">{t.followUs}</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Image
                  src="/logo_facebook.png"
                  alt="Facebook"
                  width={28}
                  height={28}
                />
              </a>
              <a href="#" className="social-link">
                <Image
                  src="/logo_instagram.png"
                  alt="Instagram"
                  width={28}
                  height={28}
                />
              </a>
              <a href="#" className="social-link">
                <Image
                  src="/logo_linkedin.png"
                  alt="LinkedIn"
                  width={28}
                  height={28}
                />
              </a>
            </div>
          </div>
          
          <div className="footer-right">
            <div className="copyright">
              <p>{t.copyright}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}