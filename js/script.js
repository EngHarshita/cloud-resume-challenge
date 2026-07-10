/**
 * Harshita pal | MERN Stack &amp; Cloud Specialist
 */

const init = () => {

  // ==========================================================================
  // 1. LOADING SCREEN
  // ==========================================================================
  const loader = document.getElementById('loader');

  const hideLoader = () => {
    if (loader) {
      loader.classList.add('fade-out');
      loader.setAttribute('aria-hidden', 'true');
    }
  };

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 200);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hideLoader, 200);
    });
  }

  // Backup in case load event takes too long (performance fallback)
  setTimeout(() => {
    hideLoader();
  }, 2000);


  // ==========================================================================
  // 2. STICKY NAVBAR & BACK-TO-TOP THROTTLED SCROLL ACTION
  // ==========================================================================
  const header = document.querySelector('.header');
  const backToTopBtn = document.getElementById('back-to-top');

  let scrollScheduled = false;
  const handleScroll = () => {
    if (!scrollScheduled) {
      scrollScheduled = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (header) {
          if (scrollY > 20) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }

        if (backToTopBtn) {
          if (scrollY > 300) {
            backToTopBtn.classList.add('show');
          } else {
            backToTopBtn.classList.remove('show');
          }
        }

        scrollScheduled = false;
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run initially on load


  // ==========================================================================
  // 3. SAFE LOCAL STORAGE ACCESS (fallback for file:// protocol)
  // ==========================================================================
  const safeLocalStorage = {
    getItem: (key) => {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.warn('localStorage access blocked:', e);
        return null;
      }
    },
    setItem: (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn('localStorage access blocked:', e);
      }
    }
  };

  // ==========================================================================
  // 4. DARK / LIGHT THEME TOGGLE
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  // Retrieve saved theme preference, or fall back to system preferences
  const getPreferredTheme = () => {
    const savedTheme = safeLocalStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    return systemPrefersLight ? 'light' : 'dark';
  };

  // Set the theme and update icon accessibility state
  const setTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    safeLocalStorage.setItem('theme', theme);

    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'light' ? '#FBFAFC' : '#050F19');
    }

    if (themeToggleBtn) {
      // Update theme toggle icon aria labels
      if (theme === 'light') {
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      } else {
        themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
      }
    }
  };

  // Apply default theme on page load
  if (themeToggleBtn) {
    const initialTheme = getPreferredTheme();
    setTheme(initialTheme);

    // Click event listener
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }


  // ==========================================================================
  // 5. MOBILE HAMBURGER MENU NAVIGATION
  // ==========================================================================
  const hamburger = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    const toggleMobileMenu = () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    };

    hamburger.addEventListener('click', toggleMobileMenu);

    // Close Mobile Menu when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.classList.remove('active');
          navMenu.classList.remove('open');
        }
      });
    });
  }


  // ==========================================================================
  // 6. TYPEWRITER SUBTITLE EFFECT
  // ==========================================================================
  const words = [
    "MERN Stack Developer",
    "Cloud Specialist",
    "UI/UX Designer (Figma)",
    "B.Tech CSE Student"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingTextSpan = document.getElementById('typing-text');

  const typeEffect = () => {
    if (!typingTextSpan) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      // Remove character
      typingTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Add character
      typingTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      // Word completely typed; pause at end
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Word completely deleted; switch to next word
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  };

  // Trigger typewriter effect
  if (typingTextSpan) {
    typeEffect();
  }


  // ==========================================================================
  // 7. INTERSECTION OBSERVER FOR ACTIVE NAVBAR LINKS
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle view
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      const sectionId = entry.target.getAttribute('id');
      const matchingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (entry.isIntersecting && matchingNavLink) {
        // Remove active class from all navlinks
        navLinks.forEach(link => link.classList.remove('active'));
        // Add active class to current section's link
        matchingNavLink.classList.add('active');
      }
    });
  };

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
  }


  // ==========================================================================
  // 8. BACK TO TOP BUTTON CLICK HANDLER
  // ==========================================================================
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // ==========================================================================
  // 9. CONTACT FORM VALIDATION & SUBMISSION HANDLER
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    // Input elements
    const inputs = {
      name: document.getElementById('form-name'),
      email: document.getElementById('form-email'),
      subject: document.getElementById('form-subject'),
      message: document.getElementById('form-message')
    };

    // Helper validation methods
    const validateEmail = (emailVal) => {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(String(emailVal).toLowerCase());
    };

    const checkInput = (inputField, errorCondition) => {
      if (!inputField) return false;
      const parentGroup = inputField.closest('.form-group');
      if (!parentGroup) return false;
      if (errorCondition) {
        parentGroup.classList.add('error');
        return false;
      } else {
        parentGroup.classList.remove('error');
        return true;
      }
    };

    // Real-time validation listeners on input blur
    if (inputs.name) {
      inputs.name.addEventListener('blur', () => {
        checkInput(inputs.name, inputs.name.value.trim() === '');
      });
    }

    if (inputs.email) {
      inputs.email.addEventListener('blur', () => {
        checkInput(inputs.email, !validateEmail(inputs.email.value.trim()));
      });
    }

    if (inputs.subject) {
      inputs.subject.addEventListener('blur', () => {
        checkInput(inputs.subject, inputs.subject.value.trim() === '');
      });
    }

    if (inputs.message) {
      inputs.message.addEventListener('blur', () => {
        checkInput(inputs.message, inputs.message.value.trim() === '');
      });
    }

    // Submit action
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Verify all fields before submitting
      const isNameValid = inputs.name ? checkInput(inputs.name, inputs.name.value.trim() === '') : false;
      const isEmailValid = inputs.email ? checkInput(inputs.email, !validateEmail(inputs.email.value.trim())) : false;
      const isSubjectValid = inputs.subject ? checkInput(inputs.subject, inputs.subject.value.trim() === '') : false;
      const isMessageValid = inputs.message ? checkInput(inputs.message, inputs.message.value.trim() === '') : false;

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

        if (submitBtn) {
          // Update button state to loading
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';
        }

        // Simulate API Gateway & Lambda service response (Phase 1 dummy state)
        setTimeout(() => {
          if (formFeedback) {
            // Successful response state
            formFeedback.classList.remove('error');
            formFeedback.classList.add('success');
            formFeedback.innerHTML = `
              <strong>Success!</strong> Message sent successfully.<br>
              <span style="font-size: 0.8rem; font-weight: normal;">
                (Simulated contact microservice: API Gateway &rarr; Lambda &rarr; DynamoDB &amp; SES)
              </span>
            `;
          }

          // Reset form & inputs error states
          contactForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }

          // Auto hide success feedback after 8 seconds
          setTimeout(() => {
            if (formFeedback) {
              formFeedback.style.display = 'none';
            }
          }, 8000);
        }, 1500);
      }
    });
  }


  // ==========================================================================
  // 10. MODALS SYSTEM (INTERACTIVE DETAILS)
  // ==========================================================================
  const modal = document.getElementById('info-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBodyContent = document.getElementById('modal-body-content');

  const openModal = (titleText, bodyHTML) => {
    if (modalTitle) modalTitle.textContent = titleText;
    if (modalBodyContent) modalBodyContent.innerHTML = bodyHTML;
    if (modal) {
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden'; // Lock background scroll
    if (modalCloseBtn) modalCloseBtn.focus();
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = 'auto'; // Restore scroll
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Keyboard accessibility for closing modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
      closeModal();
    }
  });

  // Centralized Modal Event Delegation (replaces inline onclick and handles secure opens)
  if (modalBodyContent) {
    modalBodyContent.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      if (btn.classList.contains('mock-verify-btn')) {
        btn.textContent = 'Mock Verification Active!';
      } else if (btn.classList.contains('github-link-btn')) {
        const url = btn.getAttribute('data-url');
        if (url) {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      } else if (btn.classList.contains('close-modal-btn')) {
        closeModal();
      }
    });
  }

  // Certifications View Certificate Click Listener
  const certButtons = document.querySelectorAll('.cert-verify-btn');
  certButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const certName = btn.getAttribute('data-cert');
      let detailsHTML = '';

      switch (certName) {
        case 'AWS Academy Cloud Foundations':
          detailsHTML = `
            <div class="modal-mock-cert-box">
              <i class="fa-brands fa-aws modal-cert-badge aws-badge-color" aria-hidden="true"></i>
              <div>
                <p><strong>AWS Academy Cloud Foundations</strong></p>
                <p style="font-size: 0.85rem; margin-top: 0.25rem;">Credential ID: AWS-ACF-2025</p>
                <p style="font-size: 0.85rem;">Issued: April 2025</p>
              </div>
              <div class="modal-meta-row">
                <p>Successfully demonstrates core cloud concepts, security, architecture, pricing, and support models on AWS technologies.</p>
                <p style="font-size: 0.8rem; color: var(--text-muted); font-style: italic;">
                  (Verified and issued via AWS Academy platform)
                </p>
              </div>
              <button class="btn btn-primary btn-sm mock-verify-btn" aria-label="Verify credential online">
                Verify Credential ID
              </button>
            </div>
          `;
          openModal('Certification Verification', detailsHTML);
          break;

        case 'AWS cloud Architecting':
          detailsHTML = `
            <div class="modal-mock-cert-box">
              <i class="fa-solid fa-cloud-arrow-up modal-cert-badge aws-badge-color" aria-hidden="true"></i>
              <div>
                <p><strong>AWS Cloud Architecting</strong></p>
                <p style="font-size: 0.85rem; margin-top: 0.25rem;">Credential: AWS Academy Cloud Architecting Course</p>
              </div>
              <div class="modal-meta-row">
                <p>Validates hands-on knowledge of architecting scalable, resilient, and high-performing cloud infrastructures on AWS.</p>
              </div>
              <button class="btn btn-primary btn-sm mock-verify-btn" aria-label="Verify credential online">
                Verify Credential
              </button>
            </div>
          `;
          openModal('Certification Verification', detailsHTML);
          break;

        case 'Accenture Nordics Simulation':
          detailsHTML = `
            <div class="modal-mock-cert-box">
              <i class="fa-solid fa-laptop-code modal-cert-badge general-badge-color" aria-hidden="true"></i>
              <div>
                <p><strong>Accenture Nordics - Software Engineering Job Simulation</strong></p>
                <p style="font-size: 0.85rem; margin-top: 0.25rem;">Provider: Forage (April 2025)</p>
              </div>
              <div class="modal-meta-row">
                <p>Completed practical tasks simulating software development workflows, system analysis, and API design matching Nordic enterprise requirements.</p>
              </div>
              <button class="btn btn-primary btn-sm mock-verify-btn" aria-label="Verify credential online">
                Verify Credential
              </button>
            </div>
          `;
          openModal('Certification Verification', detailsHTML);
          break;
      }
    });
  });

  // Projects View Demo Click Listener
  const demoButtons = document.querySelectorAll('.project-demo-btn');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectName = btn.getAttribute('data-project');
      let detailsHTML = '';

      switch (projectName) {
        case 'Delhi Noida Heritage System':
          detailsHTML = `
            <div class="modal-mock-cert-box">
              <i class="fa-solid fa-compass modal-cert-badge general-badge-color" aria-hidden="true"></i>
              <div>
                <p style="margin-bottom: 0.75rem;"><strong>Delhi Noida Heritage System Platform</strong></p>
                <p style="font-size: 0.875rem;">Embark on an enriching journey traversing ancient monuments, historical landmarks, and cultural treasures, guided expertly to unveil stories woven through time.</p>
              </div>
              <div class="modal-meta-row" style="text-align: left; background: rgba(0,0,0,0.1); padding: 1rem; border-radius: var(--radius-sm);">
                <p><strong>Tech Stack:</strong> React.js, Tailwind CSS, Supabase backend, Netlify deployment.</p>
              </div>
              <button class="btn btn-primary btn-sm github-link-btn" data-url="https://github.com/EngHarshita" aria-label="Visit GitHub repository">
                Go to GitHub Repository
              </button>
            </div>
          `;
          openModal(projectName, detailsHTML);
          break;

        case 'MERN Chat Application':
          detailsHTML = `
            <div class="modal-mock-cert-box">
              <i class="fa-solid fa-comments modal-cert-badge general-badge-color" aria-hidden="true"></i>
              <div>
                <p style="margin-bottom: 0.75rem;"><strong>MERN Chat &amp; Video Call App Real-Time Demo</strong></p>
                <p style="font-size: 0.875rem;">Built a full-stack real-time communication platform with features like instant messaging, video calling (WebRTC), JWT authentication, cloud file sharing, and multi-device support.</p>
              </div>
              <div class="modal-meta-row" style="text-align: left; background: rgba(0,0,0,0.1); padding: 1rem; border-radius: var(--radius-sm);">
                <p><strong>Tech Stack:</strong> MongoDB, Express.js, React.js, Node.js, Socket.io, WebRTC.</p>
              </div>
              <button class="btn btn-primary btn-sm github-link-btn" data-url="https://github.com/EngHarshita" aria-label="Visit GitHub repository">
                Go to GitHub Repository
              </button>
            </div>
          `;
          openModal(projectName, detailsHTML);
          break;

        case 'Hotel Management System':
          detailsHTML = `
            <div class="modal-mock-cert-box">
              <i class="fa-solid fa-hotel modal-cert-badge java-badge-color" aria-hidden="true"></i>
              <div>
                <p style="margin-bottom: 0.75rem;"><strong>Hotel Reservation System Demo</strong></p>
                <p style="font-size: 0.875rem;">Designed and implemented a comprehensive hotel reservation system using Java programming, demonstrating Object-Oriented Programming (OOPs) concepts for efficient development.</p>
              </div>
              <div class="modal-meta-row" style="text-align: left; background: rgba(0,0,0,0.1); padding: 1rem; border-radius: var(--radius-sm);">
                <p><strong>Tech Stack:</strong> Java Programming, OOPs principles.</p>
              </div>
              <button class="btn btn-primary btn-sm github-link-btn" data-url="https://github.com/EngHarshita" aria-label="Visit GitHub repository">
                Go to GitHub Repository
              </button>
            </div>
          `;
          openModal(projectName, detailsHTML);
          break;

        case 'Student Grade Tracker':
          detailsHTML = `
            <div class="modal-mock-cert-box">
              <i class="fa-solid fa-chart-line modal-cert-badge general-badge-color" aria-hidden="true"></i>
              <div>
                <p style="margin-bottom: 0.75rem;"><strong>Student Grade Tracker Demo</strong></p>
                <p style="font-size: 0.875rem;">Developed an interactive Student Grade Tracker using Java programming, enabling average grade computations, distributions, and stats visual charts.</p>
              </div>
              <div class="modal-meta-row" style="text-align: left; background: rgba(0,0,0,0.1); padding: 1rem; border-radius: var(--radius-sm);">
                <p><strong>Tech Stack:</strong> Java, OOPs, Data Collections.</p>
              </div>
              <button class="btn btn-primary btn-sm github-link-btn" data-url="https://github.com/EngHarshita" aria-label="Visit GitHub repository">
                Go to GitHub Repository
              </button>
            </div>
          `;
          openModal(projectName, detailsHTML);
          break;

        case 'Cloud Resume Project':
          detailsHTML = `
            <div class="modal-mock-cert-box">
              <i class="fa-solid fa-cloud-arrow-up modal-cert-badge aws-badge-color" aria-hidden="true"></i>
              <div>
                <p style="margin-bottom: 0.75rem;"><strong>Cloud Resume Project Serverless Infrastructure</strong></p>
                <p style="font-size: 0.875rem;">This portfolio is currently running live using high-performance AWS cloud distribution channels!</p>
              </div>
              <div class="modal-meta-row" style="text-align: left; font-size: 0.85rem; width: 100%;">
                <p><strong>AWS Services Used:</strong></p>
                <ul style="padding-left: 1.25rem; margin-top: 0.25rem; color: var(--text-secondary);">
                  <li><strong>Amazon S3:</strong> Stores static assets (HTML, CSS, JS, Images).</li>
                  <li><strong>Amazon CloudFront:</strong> Global edge distribution cache with SSL.</li>
                  <li><strong>AWS Route 53:</strong> High-availability DNS domain link.</li>
                  <li><strong>API Gateway &amp; Lambda:</strong> Backend serverless form dispatch.</li>
                  <li><strong>DynamoDB:</strong> Stores contact message payload logs.</li>
                  <li><strong>AWS SES:</strong> Simple Email Service alerts.</li>
                </ul>
              </div>
              <button class="btn btn-primary btn-sm close-modal-btn" aria-label="Close details modal">
                Continue Exploring Portfolio
              </button>
            </div>
          `;
          openModal(projectName, detailsHTML);
          break;
      }
    });
  });

  // ==========================================================================
  // 11. SCROLL REVEAL OBSERVER
  // ==========================================================================
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

  if ('IntersectionObserver' in window && scrollRevealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -20px 0px'
    });

    scrollRevealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    scrollRevealElements.forEach(element => {
      element.classList.add('revealed');
    });
  }

};

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
// ==========================================================================
// 12. PORTFOLIO ANALYTICS & VISITOR COUNTER
// ==========================================================================

const API_ENDPOINTS = {
  analytics: "https://hbtf25j3mfb2mywjqdg2mzrvtm0lrxum.lambda-url.us-east-1.on.aws/",
  downloads: "https://rkvyg73kfiroei34i2mk2lcedy0qqlpt.lambda-url.us-east-1.on.aws/"
};

// Internal analytics state tracking
const analyticsState = {
  data: {
    visitors: null,
    downloads: null,
    messages: null
  },
  inViewport: false,
  animated: false
};

// Helper function to animate numbers counting up
function animateNumber(elementId, targetValue) {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.classList.remove("loading-placeholder");
  element.style.background = "none";
  element.style.webkitTextFillColor = "initial"; // Restore color gradient

  const duration = 1000; // Count-up duration around 1 second
  const startTime = performance.now();

  function update(currentTime) {
    const elapsedTime = currentTime - startTime;
    if (elapsedTime >= duration) {
      element.innerText = targetValue.toLocaleString();
    } else {
      const progress = elapsedTime / duration;
      const easeProgress = progress * (2 - progress); // Ease out quad formula
      const currentValue = Math.floor(easeProgress * targetValue);
      element.innerText = currentValue.toLocaleString();
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// Trigger animations for loaded metrics
function triggerAnalyticsAnimation() {
  analyticsState.inViewport = true;

  // Prevent duplicate execution of count-up animation
  if (analyticsState.animated) return;

  let allMetricsLoaded = true;
  const metrics = [
    { id: "visitors-count", value: analyticsState.data.visitors },
    { id: "downloads-count", value: analyticsState.data.downloads },
    { id: "messages-count", value: analyticsState.data.messages }
  ];

  metrics.forEach(metric => {
    if (metric.value !== null) {
      animateNumber(metric.id, metric.value);
    } else {
      allMetricsLoaded = false;
    }
  });

  if (allMetricsLoaded) {
    analyticsState.animated = true;
  }
}

// Initialize IntersectionObserver to trigger animation when dashboard enters viewport
function initAnalyticsObserver() {
  const analyticsSection = document.getElementById("analytics");
  if (!analyticsSection) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerAnalyticsAnimation();
          observer.unobserve(entry.target); // Animate only once
        }
      });
    }, {
      root: null,
      threshold: 0.15 // Trigger when 15% of section is visible
    });

    observer.observe(analyticsSection);
  } else {
    // Fallback for older browsers: animate immediately
    triggerAnalyticsAnimation();
  }
}

// ===============================
// Fetch Analytics Data
// ===============================
async function fetchAnalyticsData() {
  try {
    const response = await fetch(API_ENDPOINTS.analytics);
    const data = await response.json();

    analyticsState.data.visitors = data.visitors;
    analyticsState.data.downloads = data.downloads;
    analyticsState.data.messages = data.messages;

    // Hero Visitor Badge
    const heroVisitorBadge = document.getElementById("visitor-count");
    if (heroVisitorBadge) {
      heroVisitorBadge.innerText = data.visitors;
    }

    // Dashboard Cards
    const visitorsCard = document.getElementById("visitors-count");
    if (visitorsCard) {
      visitorsCard.innerText = data.visitors;
    }

    const downloadsCard = document.getElementById("downloads-count");
    if (downloadsCard) {
      downloadsCard.innerText = data.downloads;
    }

    const messagesCard = document.getElementById("messages-count");
    if (messagesCard) {
      messagesCard.innerText = data.messages;
    }

    if (analyticsState.inViewport && !analyticsState.animated) {
      triggerAnalyticsAnimation();
    }

  } catch (error) {
    console.error("Analytics API Error:", error);
  }
}

// Track resume download event
async function trackResumeDownload() {
  try {
    // POST request to increment counter on the backend
    await fetch("https://rkvyg73kfiroei34i2mk2lcedy0qqlpt.lambda-url.us-east-1.on.aws/");

    // Refresh dashboard values
    await fetchAnalyticsData();

  } catch (error) {
    console.error("Resume Download Error:", error);
  }
}

// Backward compatibility helper
function updateVisitorCount() {
  fetchAnalyticsData();
}

// Initialize components
fetchAnalyticsData();
initAnalyticsObserver();