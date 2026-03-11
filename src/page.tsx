import { useRef, useState, useEffect } from "react";
import Dashboard from "./site";
import { 
  Eye, 
  EyeOff, 
  CheckCircle, 
  Mail, 
  Lock, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Globe,
  TrendingUp,
  Layout,
  Search,
  Facebook,
  Monitor,
  Package
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import "./index.css";

import emailjs from '@emailjs/browser';

/* ─── Mock API Service ─────────────────────────────────────────────────── */
const mockApi = {
  login: async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 1000));
    if (email && password.length >= 6) {
      const user = { first_name: "Alex", last_name: "Smith", email };
      localStorage.setItem("session_token", "mock_token_" + Date.now());
      localStorage.setItem("user", JSON.stringify(user));
      return { user, session_token: "mock_token" };
    }
    throw new Error("Invalid credentials");
  },
  register: async (form: any) => {
    await new Promise(r => setTimeout(r, 1000));
    const user = { first_name: form.first_name, last_name: form.last_name, email: form.email };
    localStorage.setItem("session_token", "mock_token_" + Date.now());
    localStorage.setItem("user", JSON.stringify(user));
    return { user, session_token: "mock_token" };
  },
  me: async () => {
    await new Promise(r => setTimeout(r, 500));
    const user = localStorage.getItem("user");
    if (user) return { user: JSON.parse(user) };
    throw new Error("Not authenticated");
  },
  logout: async () => {
    await new Promise(r => setTimeout(r, 500));
    localStorage.removeItem("session_token");
    localStorage.removeItem("user");
  }
};

/* ─── Nav Component ─────────────────────────────────────────────────────── */
function Nav({ page, setPage, user, onLogout }: any) {
  return (
    <nav className="nav-fixed">
      <div className="nav-container">
        <div 
          className="nav-logo" 
          onClick={() => setPage('landing')}
        >
          <div className="logo-icon">
            <Zap size={18} />
          </div>
          <span className="logo-text">Pulse <span className="logo-accent"></span></span>
        </div>

        <div className="nav-links">
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">Hi, {user.first_name}</span>
              <button 
                className="logout-button"
                onClick={onLogout}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              {page !== 'login' && (
                <button 
                  className="signin-button"
                  onClick={() => setPage('login')}
                >
                  Sign In
                </button>
              )}
              {page !== 'signup' && (
                <button 
                  className="get-started-button"
                  onClick={() => setPage('signup')}
                >
                  Get Started
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

/* ─── Landing Page ──────────────────────────────────────────────────────── */
function LandingPage({ setPage }: any) {
  const features = [
    { icon: <Search size={24} />, title: 'Google Search Ads', desc: 'Live PPC data from Google Search results across UK and US markets.' },
    { icon: <Layout size={24} />, title: 'Google Display Ads', desc: 'Banner and responsive display ads with placement data.' },
    { icon: <Facebook size={24} />, title: 'Meta Ads', desc: 'Facebook and Instagram sponsored posts with engagement metrics.' },
    { icon: <Monitor size={24} />, title: 'Microsoft Ads', desc: 'Bing search and display ads with lower CPC opportunities.' },
    { icon: <Package size={24} />, title: 'Amazon Ads', desc: 'Sponsored products with star ratings and review counts.' },
  ];

  return (
    <div className="landing-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-eyebrow"
          >
            <Zap size={14} /> Live PPC Intelligence
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hero-h1"
          >
            TRACK EVERY AD.<br />
            <span className="accent">RANKED. DECODED.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-sub"
          >
            Real-time PPC data from Google, Meta, Bing & Amazon. 
            Performance-ranked across UK and US markets.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hero-actions"
          >
            <button 
              className="hero-cta-primary"
              onClick={() => setPage('signup')}
            >
              Start Free Trial <ArrowRight size={20} />
            </button>
            <button 
              className="hero-cta-secondary"
              onClick={() => setPage('login')}
            >
              Sign In
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-strip">
        <div className="stats-container">
          {[
            { val: "37+", lbl: "Live Ads Tracked" },
            { val: "5", lbl: "Ad Platforms" },
            { val: "2", lbl: "Global Markets" },
            { val: "£2.99", lbl: "Per Month" },
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <div className="stat-strip-val">{s.val}</div>
              <div className="stat-strip-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-h2">
              EVERYTHING YOU NEED TO <span>WIN</span>
            </h2>
            <p className="features-sub">Comprehensive tracking across the digital advertising landscape.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="feature-card"
              >
                <div className="feature-icon-wrap">
                  {f.icon}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section">
        <div className="pricing-container">
          <div className="pricing-card">
            <div className="pricing-badge">Most Popular</div>
            <h2 className="pricing-title">Pro Monthly</h2>
            <div className="pricing-amount-wrapper">
              <span className="pricing-amount">£2.99</span>
              <span className="pricing-period">/mo</span>
            </div>
            <ul className="pricing-features">
              {[
                'All 5 ad platforms',
                'UK & US market data',
                'Performance tiers',
                'Daily updates',
                'Priority support',
              ].map((f, i) => (
                <li key={i} className="pricing-feature-item">
                  <CheckCircle size={18} className="feature-check" /> {f}
                </li>
              ))}
            </ul>
            <button 
              className="pricing-cta"
              onClick={() => setPage('signup')}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        © 2024 Pulse · Built for performance marketers - All rights reserved. - <span onClick={() => setPage('contact')} style={{cursor:"pointer"}}>Contact Us</span>
      </footer>
    </div>
  );
}

/* ─── Login Page ────────────────────────────────────────────────────────── */
function LoginPage({ setPage, onLogin }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const data = await mockApi.login(email, password);
      onLogin(data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="auth-card"
      >
        <div className="auth-header">
          <div className="auth-icon">
            <Zap size={24} />
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to access your dashboard</p>
        </div>

        <div className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-icon-wrap">
              <Mail className="icon" size={18} />
              <input
                type="email"
                placeholder="you@example.com"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-icon-wrap">
              <Lock className="icon" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="icon-right"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {error && <div className="form-error-box">{error}</div>}

        <button
          className="auth-submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="auth-switch">
          Don't have an account?{' '}
          <button
            onClick={() => setPage('signup')}
          >
            Sign up
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Signup Page ───────────────────────────────────────────────────────── */
function SignupPage({ setPage, onLogin }: any) {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [step, setStep] = useState(1);

  const handleChange = (field: string) => (e: any) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: null });
  };

  const validate = () => {
    const errs: any = {};
    if (!form.first_name.trim()) errs.first_name = 'Required';
    if (!form.last_name.trim()) errs.last_name = 'Required';
    if (!form.email.includes('@')) errs.email = 'Invalid email';
    if (form.password.length < 8) errs.password = 'Min 8 chars';
    if (form.password !== form.confirm_password) errs.confirm_password = 'Mismatch';
    if (!agree) errs.agree = 'Required';
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      await mockApi.register(form);
      setStep(2);
    } catch (err: any) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (step === 2) {
    return (
      <div className="auth-page">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="auth-card"
        >
          <div className="auth-success-icon">
            <CheckCircle size={48} />
          </div>
          <h2 className="auth-title">Welcome, {form.first_name}!</h2>
          <p className="auth-subtitle">Your account is ready. Start exploring PPC data.</p>
          <button 
            className="auth-submit" 
            onClick={() => setPage('login')}
          >
            Go to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="auth-card"
      >
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">£2.99/mo · Cancel anytime</p>
        </div>

        <div className="auth-form name-grid">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input 
              placeholder="Jane" 
              className="form-input" 
              value={form.first_name} 
              onChange={handleChange('first_name')} 
            />
            {errors.first_name && <div className="form-error">{errors.first_name}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input 
              placeholder="Smith" 
              className="form-input" 
              value={form.last_name} 
              onChange={handleChange('last_name')} 
            />
            {errors.last_name && <div className="form-error">{errors.last_name}</div>}
          </div>
        </div>

        <div className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="jane@company.com"
              className="form-input"
              value={form.email}
              onChange={handleChange('email')}
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Min. 8 characters"
              className="form-input"
              value={form.password}
              onChange={handleChange('password')}
            />
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Repeat password"
              className="form-input"
              value={form.confirm_password}
              onChange={handleChange('confirm_password')}
            />
            {errors.confirm_password && <div className="form-error">{errors.confirm_password}</div>}
          </div>
        </div>

        <div className="form-checkbox-wrap">
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label htmlFor="agree" className="form-checkbox-label">
            I agree to the Terms of Service and Privacy Policy. I understand I will be charged £2.99/mo.
          </label>
        </div>
        {errors.agree && <div className="form-error">{errors.agree}</div>}

        <button
          className="auth-submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account — £2.99/mo'}
        </button>

        <div className="auth-switch">
          Already have an account?{' '}
          <button
            onClick={() => setPage('login')}
          >
            Sign in
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Main App ──────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState('landing');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await mockApi.me();
        setUser(data.user);
        setPage('dashboard');
      } catch (error) {
        // Not logged in
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setPage('dashboard');
  };

  const handleLogout = async () => {
    await mockApi.logout();
    setUser(null);
    setPage('landing');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="app">
      {page !== 'dashboard' && (
        <Nav page={page} setPage={setPage} user={user} onLogout={handleLogout} />
      )}
      
      <AnimatePresence mode="wait">
        {page === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage setPage={setPage} />
          </motion.div>
        )}
        {page === 'login' && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoginPage setPage={setPage} onLogin={handleLogin} />
          </motion.div>
        )}
        {page === 'signup' && (
          <motion.div key="signup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SignupPage setPage={setPage} onLogin={handleLogin} />
          </motion.div>
        )}
        {page === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dashboard user={user} onLogout={handleLogout} />
          </motion.div>
        )}
         {page === 'contact' && (
          <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ContactUsWithEmailJS Page={setPage} onContact={handleContact}/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}




/* ─── Contact Us with EmailJS ───────────────────────────────────────────── */

const ContactUsWithEmailJS = ({ Page, onContact }) => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [page, setPage] = useState('landing');
  

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
        
        // Optional: Call onContact callback if provided
        if (Page) {
          handleContact();
        }
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

    const handleContact = () => {
    setPage('contact'); // Redirect to dashboard after contact form submission
    Page(page); // Call the Page function passed as a prop to update the parent component's state
  };

  return (
    <div className="contact-container" style={styles.container}>
      <button 
        onClick={() => setPage('home')} 
        style={styles.backButton}
        aria-label="Go back"
      >
        ← Back
      </button>
      
      <h2 style={styles.heading}>Contact Us</h2>
      
      {submitStatus && (
        <div 
          style={{
            ...styles.statusMessage,
            ...(submitStatus.type === 'success' ? styles.successMessage : styles.errorMessage)
          }}
        >
          {submitStatus.message}
          <button 
            onClick={() => setSubmitStatus(null)} 
            style={styles.closeButton}
            aria-label="Close message"
          >
            ×
          </button>
        </div>
      )}
      
      <form ref={form} onSubmit={sendEmail} style={styles.form}>
        {/* Name Field */}
        <div style={styles.formGroup}>
          <label htmlFor="user_name" style={styles.label}>
            Name *
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            required
            placeholder="Enter your full name"
            style={styles.input}
            disabled={isSubmitting}
          />
        </div>

        {/* Email Field */}
        <div style={styles.formGroup}>
          <label htmlFor="user_email" style={styles.label}>
            Email *
          </label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            required
            placeholder="Enter your email address"
            style={styles.input}
            disabled={isSubmitting}
          />
        </div>

        {/* Phone Field (Optional) */}
        <div style={styles.formGroup}>
          <label htmlFor="user_phone" style={styles.label}>
            Phone Number
          </label>
          <input
            type="tel"
            id="user_phone"
            name="user_phone"
            placeholder="Enter your phone number (optional)"
            style={styles.input}
            disabled={isSubmitting}
          />
        </div>

        {/* Subject Field */}
        <div style={styles.formGroup}>
          <label htmlFor="subject" style={styles.label}>
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            placeholder="What is this regarding?"
            style={styles.input}
            disabled={isSubmitting}
          />
        </div>

        {/* Message Field */}
        <div style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Please type your message here..."
            style={styles.textarea}
            disabled={isSubmitting}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...styles.submitButton,
            ...(isSubmitting ? styles.submitButtonDisabled : {})
          }}
        >
          {isSubmitting ? (
            <span style={styles.submitContent}>
              <span style={styles.spinner}></span>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
};

// Styles object for inline styling
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    position: 'relative' as const,
  },
  backButton: {
    position: 'absolute' as const,
    top: '20px',
    left: '20px',
    padding: '8px 16px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  heading: {
    textAlign: 'center' as const,
    color: '#333',
    marginBottom: '30px',
    fontSize: '32px',
    fontWeight: 'bold' as const,
  },
  form: {
    backgroundColor: '#f9f9f9',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontSize: '14px',
    fontWeight: 'bold' as const,
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.3s, box-shadow 0.3s',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box' as const,
    resize: 'vertical' as const,
    minHeight: '120px',
    fontFamily: 'inherit',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    outline: 'none',
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    marginTop: '10px',
  },
  submitButtonDisabled: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed',
    opacity: 0.7,
  },
  submitContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid #ffffff',
    borderTop: '3px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  statusMessage: {
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '20px',
    position: 'relative' as const,
    textAlign: 'center' as const,
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
  closeButton: {
    position: 'absolute' as const,
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: 'inherit',
    padding: '0 5px',
  },
};

// Add this CSS to your global styles or create a style tag
const globalStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  input:focus, textarea:focus {
    border-color: #007bff !important;
    box-shadow: 0 0 0 3px rgba(0,123,255,0.1) !important;
  }
  
  button:hover:not(:disabled) {
    background-color: #0056b3 !important;
    transform: translateY(-1px);
  }
  
  button:active:not(:disabled) {
    transform: translateY(0);
  }
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = globalStyles;
  document.head.appendChild(styleElement);
}

