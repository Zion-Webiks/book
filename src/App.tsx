import React, { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Global styles for scrollbar
const GlobalStyle = createGlobalStyle`
  :root {
    --section-width: 1200px;
    --primary-color: #ff9800;
    --secondary-color: #ffc107;
    --neutral-light: #f5f5f5;
    --text-color: #333333;
    --text-light: #666666;
  }
  
  html {
    scroll-behavior: smooth; /* Enable smooth scrolling */
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Assistant', sans-serif;
    color: #333;
    overflow-x: hidden;
    line-height: 1.5;
    
    @media (max-width: 768px) {
      font-size: 14px; /* Reduce base font size on mobile */
    }
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #ff9800;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #e68a00;
  }
`;

// SVG Icons as React components
const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
);

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.287-.81-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
  </svg>
);

const HeadsetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z"/>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
  </svg>
);

const ReturnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
    <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
  </svg>
);

function App() {
  // Create refs for different sections for scrolling animations
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations with framer-motion
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  // Book tilt animation on mouse move
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);
  const [scaleValue, setScale] = React.useState(1);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bookShowcaseRef = useRef<HTMLDivElement>(null);
  const touchVelocityRef = useRef({ x: 0, y: 0 });
  const previousTouchRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  
  // Check if device is mobile on component mount
  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle touch movement on mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!bookShowcaseRef.current) return;
    setIsInteracting(true);
    
    // Cancel any ongoing animations
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const touch = e.touches[0];
    previousTouchRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };
    
    // Slightly scale up the book on touch to provide visual feedback
    setScale(1.05);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!bookShowcaseRef.current || !isInteracting) return;
    e.preventDefault(); // Prevent scrolling while interacting
    
    const touch = e.touches[0];
    const box = bookShowcaseRef.current.getBoundingClientRect();
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    // Calculate touch position relative to center
    const touchX = touch.clientX - box.left;
    const touchY = touch.clientY - box.top;
    
    // Calculate velocity for inertia effect
    touchVelocityRef.current = {
      x: touch.clientX - previousTouchRef.current.x,
      y: touch.clientY - previousTouchRef.current.y
    };
    
    previousTouchRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };
    
    // Calculate rotation based on the distance from center with increased sensitivity
    const rotateYValue = ((touchX - centerX) / (centerX * 0.75)) * 35; // More sensitive
    const rotateXValue = ((touchY - centerY) / (centerY * 0.75)) * 35 * -1; // More sensitive
    
    setRotateY(rotateYValue);
    setRotateX(rotateXValue);
  };
  
  const handleTouchEnd = () => {
    setIsInteracting(false);
    
    // Use velocity for inertia effect
    const initialVelocityX = touchVelocityRef.current.x * 0.5; // Dampen velocity
    const initialVelocityY = touchVelocityRef.current.y * -0.5; // Invert Y and dampen
    let velocityX = initialVelocityX;
    let velocityY = initialVelocityY;
    let currentRotateX = rotateX;
    let currentRotateY = rotateY;
    let currentScale = scaleValue;
    
    // Reset scale back to normal
    setScale(1);
    
    // Gradually return to original position with inertia
    const resetAnimation = () => {
      // Apply velocity with friction
      currentRotateX += velocityY;
      currentRotateY += velocityX;
      velocityX *= 0.95; // Apply friction
      velocityY *= 0.95; // Apply friction
      
      // Spring back to center
      currentRotateX *= 0.9;
      currentRotateY *= 0.9;
      
      // Scale animation
      currentScale = 1 + (currentScale - 1) * 0.9;
      
      // Update state
      setRotateX(currentRotateX);
      setRotateY(currentRotateY);
      
      // Continue animation until mostly settled
      if (Math.abs(currentRotateX) > 0.1 || 
          Math.abs(currentRotateY) > 0.1 || 
          Math.abs(velocityX) > 0.1 || 
          Math.abs(velocityY) > 0.1) {
        animationRef.current = requestAnimationFrame(resetAnimation);
      } else {
        // Final reset to exact zero
        setRotateX(0);
        setRotateY(0);
      }
    };
    
    animationRef.current = requestAnimationFrame(resetAnimation);
  };
  
  // Clean up any animations on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Skip on mobile as we use touch instead
    
    const element = e.currentTarget;
    const { width, height } = element.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;
    const mouseX = e.clientX - element.getBoundingClientRect().left;
    const mouseY = e.clientY - element.getBoundingClientRect().top;
    
    const rotateYValue = ((mouseX - centerX) / centerX) * 15; // -15 to +15 degrees
    const rotateXValue = ((mouseY - centerY) / centerY) * 15 * -1; // +15 to -15 degrees
    
    setRotateY(rotateYValue);
    setRotateX(rotateXValue);
  };
  
  const handleMouseLeave = () => {
    if (!isMobile) {
      setRotateX(0);
      setRotateY(0);
    }
  };

  // State for current slide
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    `${process.env.PUBLIC_URL}/images/slide1.jpg`,
    `${process.env.PUBLIC_URL}/images/slide2.jpg`,
    `${process.env.PUBLIC_URL}/images/slide3.jpg`
  ];
  
  // State for testimonials slideshow
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      text: "הספר הזה שינה לגמרי את ההבנה שלי של ויזואליזציה של נתונים. אני יכול כעת לנתח בביטחון כל גרף או תרשים שאני נתקל בו.",
      author: "דוד כ."
    },
    {
      text: "כסטודנטית שמתקשה בסטטיסטיקה, המדריך הזה היה בדיוק מה שהייתי צריכה. הסברים ברורים ודוגמאות מעשיות עשו את כל ההבדל.",
      author: "שרה מ."
    },
    {
      text: "משאב מדהים גם למתחילים וגם לקוראים מתקדמים. הפורמט הדיגיטלי מקל על המעקב והתרגול.",
      author: "מיכאל ת."
    },
    {
      text: "הספר עזר לי להבין לעומק את הגרפים בעבודת המחקר שלי. היכולת לזהות טרנדים ולהסיק מסקנות השתפרה פלאים.",
      author: "רונית ל."
    },
    {
      text: "לימדתי את הילדים שלי איך לקרוא גרפים באמצעות השיטות בספר. עכשיו הם יכולים להבין בקלות את המידע שמוצג בחדשות ובספרי הלימוד.",
      author: "יעקב ג."
    }
  ];

  // Calculate maximum testimonial index
  const maxTestimonialIndex = Math.max(0, testimonials.length - 3);

  // Function to change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  // Function to change testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => Math.min(maxTestimonialIndex, prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length, maxTestimonialIndex]);
  
  // Function to change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  return (
    <AppContainer dir="rtl">
      <GlobalStyle />
      {/* Animated background */}
      <BackgroundAnimation />
      
      {/* Navigation */}
      <Navbar>
        <LogoContainer>
          <DesktopOnly>
            <Logo>לקרוא גרפים בקלות</Logo>
          </DesktopOnly>
          <HeaderSocialContainer>
            <HeaderSocialLink href="mailto:pashut.likro.graphs@gmail.com" aria-label="Email">
              <HeaderSocialIcon src={`${process.env.PUBLIC_URL}/images/email.png`} alt="Email" />
            </HeaderSocialLink>
            <HeaderSocialLink href="https://wa.me/972123456789" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <HeaderSocialIcon src={`${process.env.PUBLIC_URL}/images/whatsapp.png`} alt="WhatsApp" />
            </HeaderSocialLink>
            <HeaderSocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <HeaderSocialIcon src={`${process.env.PUBLIC_URL}/images/facebook.png`} alt="Facebook" />
            </HeaderSocialLink>
          </HeaderSocialContainer>
        </LogoContainer>
        <NavLinks>
          <NavLink href="#">בית</NavLink>
          <DesktopOnly>
            <NavLink href="#features">מאפיינים</NavLink>
          </DesktopOnly>
          <DesktopOnly>
            <NavLink href="#testimonials">המלצות</NavLink>
          </DesktopOnly>
          <NavLink href="#pricing">מחיר</NavLink>
          <DesktopOnly>
            <NavLink href="#buy">הגנת הצרכן</NavLink>
          </DesktopOnly>
          <NavLink href="#contact">צור קשר</NavLink>
          <PrimaryButton as="a" href="#buy">
            <IconWrapper>
              <ShoppingCartIcon />
            </IconWrapper>
            רכישה מאובטחת
          </PrimaryButton>
        </NavLinks>
      </Navbar>
      
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <DesktopOnly>
              <HeroTagline>חווית למידה דיגיטלית מהפכנית</HeroTagline>
            </DesktopOnly>
            <HeroTitle>לקרוא גרפים בקלות</HeroTitle>
            <HeroSubtitle>
              <Paragraph>
                עולם הבורסה והמסחר יכול להיראות מסובך ומאתגר למי שעושה את צעדיו הראשונים. מושגים חדשים, שוק הפכפך ומספרים שקופצים בין ירוק לאדום – כל אלו עשויים להרתיע את המתחילים, אך האמת היא שהבנת המסחר בבורסה אינה חייבת להיות משימה מסובכת.
              </Paragraph>
              
              <Paragraph>
                הספר <BookEmphasis>לקרוא גרפים בקלות</BookEmphasis> נכתב במיוחד עבור אלו שמחפשים גישה ברורה וידידותית לכניסה לעולם המסחר. המטרה שלי היא לפשט את התהליך ולהעניק לך את הכלים והידע הדרושים כדי לקרוא ולהבין גרפים, לזהות תבניות מסחר, ולהשתמש בכל אלו כדי לקבל החלטות מושכלות בשוק ההון.
              </Paragraph>
              <DesktopOnly>
                <Paragraph>
                  לא מדובר כאן במדריך מסובך המיועד למומחים, אלא בספר המכוון למתחילים שרוצים להכיר את היסודות בצורה פשוטה, מובנית ומעשית. לאורך הפרקים נעבור יחד דרך מושגים בסיסיים בגרפים, כיצד לקרוא אותם, אילו תבניות לחפש, ומהן האסטרטגיות הראשוניות שתוכל ליישם במסחר האישי שלך.
                </Paragraph>
                
                <Paragraph>
                  המטרה שלי היא שעם סיום קריאת הספר, תוכל להרגיש ביטחון ביכולתך להבין את השוק ולקבל החלטות מסחר בצורה מושכלת ומדויקת יותר. בין אם אתה מחפש להתחיל מסחר כהשקעה לטווח ארוך או כמקור הכנסה נוסף, הכלים שתלמד כאן יסייעו לך לצעוד בבטחה לעולם זה.
                </Paragraph>
              </DesktopOnly>
            </HeroSubtitle>
            <ButtonGroup>
              <PrimaryButton as="a" href="#buy">
                <IconWrapper>
                  <ShoppingCartIcon />
                </IconWrapper>
                רכישה מאובטחת
              </PrimaryButton>
              <SecondaryButton as="a" href="#learn-more">
                <IconWrapper>
                  <BookIcon />
                </IconWrapper>
                למד עוד
              </SecondaryButton>
            </ButtonGroup>
          </motion.div>
        </HeroContent>
        
        <BackgroundOverlay />
        
        <BookShowcase 
          ref={bookShowcaseRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <BookCover style={{ 
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scaleValue})`,
            transition: isInteracting ? 'none' : 'transform 0.1s ease-out'
          }}>
          </BookCover>
          <DesktopOnly>
            <BookShadow style={{
              transform: `perspective(1000px) rotateX(${rotateX*0.5}deg) rotateY(${rotateY*0.5}deg) translateY(130px) scale(${scaleValue})`,
              opacity: 0.7 - Math.abs(rotateX/100) - Math.abs(rotateY/100) // Shadow changes with rotation
            }} />
          </DesktopOnly>
        </BookShowcase>
      </HeroSection>
      
      {/* Features Section */}
      <DesktopOnly>
        <SectionTitle id="features">מאפייני הספר</SectionTitle>
      </DesktopOnly>
      <FeaturesImageContainer>
        <FeaturesImage src={`${process.env.PUBLIC_URL}/images/book_features.jpg`} alt="מאפייני הספר" />
      </FeaturesImageContainer>
      <FeaturesSection ref={featuresRef}>
        
        <FeatureCard>
          <DesktopOnly>
            <FeatureIcon>
              <StarIcon />
            </FeatureIcon>
          </DesktopOnly>
          <FeatureTitle>דוגמאות אינטראקטיביות</FeatureTitle>
          <FeatureDescription>
            תרגול עם נתונים מהעולם האמיתי ודוגמאות אינטראקטיביות שעוזרות לחזק את ההבנה שלך.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <DesktopOnly>
            <FeatureIcon>
              <StarIcon />
            </FeatureIcon>
          </DesktopOnly>
          <FeatureTitle>הדרכה שלב אחר שלב</FeatureTitle>
          <FeatureDescription>
            הוראות ברורות והסברים מפורטים כדי להבטיח שתבין כל מושג.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <DesktopOnly>
            <FeatureIcon>
              <StarIcon />
            </FeatureIcon>
          </DesktopOnly>
          <FeatureTitle>כיסוי מקיף</FeatureTitle>
          <FeatureDescription>
            מתרשימי עמודות בסיסיים ועד לויזואליזציות סטטיסטיות מורכבות - אנחנו מכסים הכל.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesSection>
      
      {/* Testimonials Section */}
      <SectionTitle id="testimonials">מה הקוראים אומרים</SectionTitle>
      <TestimonialsSection ref={testimonialsRef}>
        <TestimonialsContainer>
          {[0, 1, 2].map(offset => {
            const index = currentTestimonial + offset;
            if (index >= testimonials.length) return null;
            
            return (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <QuoteMark>"</QuoteMark>
                <TestimonialText>
                  {testimonials[index].text}
                </TestimonialText>
                <TestimonialAuthor>{testimonials[index].author}</TestimonialAuthor>
              </TestimonialCard>
            );
          })}
        </TestimonialsContainer>
        
        <TestimonialPagination>
          {Array.from({ length: maxTestimonialIndex + 1 }).map((_, index) => (
            <TestimonialDot 
              key={index} 
              active={index === currentTestimonial}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </TestimonialPagination>
      </TestimonialsSection>
      
      {/* Pricing Section */}
      <SectionTitle id="pricing">קבל את העותק שלך היום</SectionTitle>
      <PricingSection>
        <PricingCard>
          <PriceHighlight>מבצע מיוחד</PriceHighlight>
          <Price>₪149</Price>
          <PriceDescription>תשלום חד פעמי, גישה לכל החיים</PriceDescription>
          <FeatureList>
            <FeatureItem>ספר דיגיטלי מלא</FeatureItem>
            <FeatureItem>דוגמאות אינטראקטיביות</FeatureItem>
            <FeatureItem>משאבים להורדה</FeatureItem>
            <FeatureItem>עדכונים עתידיים</FeatureItem>
          </FeatureList>
          <PrimaryButton as="a" href="#buy" id="buy">
            <IconWrapper>
              <ShoppingCartIcon />
            </IconWrapper>
            רכישה מאובטחת
          </PrimaryButton>
        </PricingCard>
        
        <SlideShowCard>
          <SlideImage src={slides[currentSlide]} alt={`תמונה ${currentSlide + 1}`} />
          <SlidePagination>
            {slides.map((_, index) => (
              <SlideDot 
                key={index} 
                active={index === currentSlide}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </SlidePagination>
        </SlideShowCard>
      </PricingSection>
      
      {/* Trust Indicators */}
      <TrustSection id="buy">
        <SectionTitle>הגנה למען הצרכן</SectionTitle>
        <TrustIntro>
          אנו מחויבים להעניק לך חווית קנייה בטוחה, נוחה ומוגנת. כל המידע האישי שנמסר לנו נשמר בצורה מאובטחת, ואנו פועלים לפי כל התקנים והרגולציות על מנת להבטיח את זכויות הצרכן.
        </TrustIntro>
        
        <TrustItemsContainer>
          <TrustItemDetailed>
            <TrustItemTitle>
              <TrustIcon>
                <LockIcon />
              </TrustIcon>
              1. אבטחת מידע ופרטיות
            </TrustItemTitle>
            <TrustItemDescription>
              אנו מבינים את חשיבות פרטיות המידע שלך. כל המידע האישי שנמסר לנו נשמר בצורה מאובטחת באמצעי הצפנה מהמתקדמים ביותר. המידע לא יועבר לצדדים שלישיים, למעט במקרים שבהם החוק דורש זאת.
            </TrustItemDescription>
          </TrustItemDetailed>
          
          <TrustItemDetailed>
            <TrustItemTitle>
              <TrustIcon>
                <BookIcon />
              </TrustIcon>
              2. רכישה והורדה של ספר דיגיטלי
            </TrustItemTitle>
            <TrustItemDescription>
              עם ביצוע רכישה של ספר דיגיטלי, תשלח אליך הודעת דוא"ל עם קישור להורדת הספר. מכיוון שמדובר במוצר דיגיטלי, אין אפשרות להחזרה או החלפה לאחר שהספר הורד למכשירך, אלא אם כן המוצר פגום, לא תואם את המפרט או קיימת תקלה טכנית.
            </TrustItemDescription>
          </TrustItemDetailed>
          
          <TrustItemDetailed>
            <TrustItemTitle>
              <TrustIcon>
                <ReturnIcon />
              </TrustIcon>
              3. החזרה של ספר דיגיטלי פגום
            </TrustItemTitle>
            <TrustItemDescription>
              במקרה שבו הספר הדיגיטלי פגום, לא תואם לתיאור או שיש בעיה טכנית, תוכל לפנות אלינו תוך 14 ימים מיום הרכישה. לאחר קבלת פנייתך, אנו נבדוק את המקרה ונציע פתרון, שיכול לכלול החזר כספי או תיקון המוצר.
            </TrustItemDescription>
          </TrustItemDetailed>
          
          <TrustItemDetailed>
            <TrustItemTitle>
              <TrustIcon>
                <InfoIcon />
              </TrustIcon>
              4. תנאים נוספים
            </TrustItemTitle>
            <TrustItemDescription>
              ההזמנה שלך מותנית בהסכמה לתנאים המפורטים כאן. אנו ממליצים לעיין בתנאי השימוש לפני ביצוע הרכישה. כל רכישה מהווה הסכמה מלאה לתנאים אלה.
            </TrustItemDescription>
          </TrustItemDetailed>
        </TrustItemsContainer>
      </TrustSection>
      
      {/* Footer */}
      <Footer id="contact">
        <FooterContainer>
          <FooterContent>
            {/* Footer Part 1: Text */}
            <FooterSection className="contact-section">
              <ContactTitle>צור קשר</ContactTitle>
              <ContactText>
                שירות הלקוחות שלנו זמין עבורך לכל שאלה או בעיה הקשורה לרכישת הספרים הדיגיטליים שלנו. תוכל לפנות אלינו בכתובת דוא"ל:
              </ContactText>
              <ContactEmail href="mailto:pashut.likro.graphs@gmail.com">pashut.likro.graphs@gmail.com</ContactEmail>
              <ContactText>
                ואנו נעשה כמיטב יכולתנו להיענות לפנייתך בהקדם.
              </ContactText>
            </FooterSection>
            
            {/* Footer Part 2: Social Icons */}
            <FooterSection className="social">
              <ContactTitle>עקבו אחרינו</ContactTitle>
              <SocialLinks>
                <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <SocialIcon src={`${process.env.PUBLIC_URL}/images/facebook.png`} alt="Facebook" />
                </SocialLink>
                <SocialLink href="https://wa.me/972123456789" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <SocialIcon src={`${process.env.PUBLIC_URL}/images/whatsapp.png`} alt="WhatsApp" />
                </SocialLink>
                <SocialLink href="mailto:pashut.likro.graphs@gmail.com" aria-label="Email">
                  <SocialIcon src={`${process.env.PUBLIC_URL}/images/email.png`} alt="Email" />
                </SocialLink>
                <SocialLink href="/" aria-label="Home">
                  <SocialIcon src={`${process.env.PUBLIC_URL}/images/home.png`} alt="Home" />
                </SocialLink>
              </SocialLinks>
            </FooterSection>
            
            {/* Footer Part 3: Terms & Links */}
            <FooterSection>
              <ContactTitle>מידע נוסף</ContactTitle>
              <FooterLinks>
                <FooterLink href="#" onClick={(e) => {
                  e.preventDefault();
                  setIsPrivacyPolicyOpen(true);
                }}>מדיניות פרטיות</FooterLink>
              </FooterLinks>
            </FooterSection>
          </FooterContent>
          <Copyright> {new Date().getFullYear()} לקרוא גרפים בקלות. כל הזכויות שמורות.</Copyright>
        </FooterContainer>
      </Footer>

      {/* Privacy Policy Modal */}
      {isPrivacyPolicyOpen && (
        <PrivacyPolicyModal>
          <PrivacyPolicyContent>
            <PrivacyPolicyCloseButton onClick={() => setIsPrivacyPolicyOpen(false)}>×</PrivacyPolicyCloseButton>
            <PrivacyPolicyTitle>מדיניות פרטיות</PrivacyPolicyTitle>
            <PrivacyPolicyDate>תאריך עדכון אחרון: 29 במרץ 2025</PrivacyPolicyDate>
            
            <PrivacyPolicyText>
              מדיניות פרטיות זו מתארת את המדיניות והנהלים שלנו בנוגע לאיסוף, שימוש וחשיפה של המידע שלך בעת השימוש בשירות, ומסבירה לך על זכויות הפרטיות שלך וכיצד החוק מגן עליך.
            </PrivacyPolicyText>
            
            <PrivacyPolicyText>
              אנו משתמשים בנתונים האישיים שלך כדי לספק ולשפר את השירות. בשימושך בשירות, את/ה מסכים/ה לאיסוף ולשימוש במידע בהתאם למדיניות פרטיות זו. מדיניות פרטיות זו נוצרה בעזרת מחולל מדיניות הפרטיות החינמית (Free Privacy Policy Generator).
            </PrivacyPolicyText>
            
            <PrivacyPolicyText>
              <strong>נתונים אישיים</strong><br />
              בעת השימוש בשירות שלנו, ייתכן שנבקש ממך לספק לנו מידע אישי מסוים הניתן לזיהוי, אשר יכול לשמש ליצירת קשר או זיהויך. מידע המאפשר זיהוי אישי עשוי לכלול, בין היתר:
            </PrivacyPolicyText>
            
            <PrivacyPolicyList>
              <PrivacyPolicyListItem>כתובת דוא"ל</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>שם פרטי ושם משפחה</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>מספר טלפון</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>כתובת, מדינה, מחוז, מיקוד/קוד דואר, עיר</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>נתוני שימוש</PrivacyPolicyListItem>
            </PrivacyPolicyList>
            
            <PrivacyPolicyText>
              <strong>נתוני שימוש</strong><br />
              נתוני שימוש נאספים באופן אוטומטי בעת השימוש בשירות.
            </PrivacyPolicyText>
            
            <PrivacyPolicyText>
              אנו עשויים גם לאסוף מידע ששולח הדפדפן שלך בכל פעם שאת/ה מבקר/ת בשירות שלנו או כשאת/ה ניגש/ת לשירות דרך או באמצעות מכשיר נייד.
            </PrivacyPolicyText>
            
            <PrivacyPolicySubHeading>טכנולוגיות מעקב ועוגיות</PrivacyPolicySubHeading>
            <PrivacyPolicyText>
              אנו משתמשים בעוגיות ובטכנולוגיות מעקב דומות כדי לעקוב אחר הפעילות בשירות שלנו ולאחסן מידע מסוים. טכנולוגיות מעקב בהן אנו משתמשים כוללות משואות רשת (Beacons), תגים (Tags) וסקריפטים (Scripts) לצורך איסוף ומעקב אחר מידע וכדי לשפר ולנתח את השירות שלנו.
            </PrivacyPolicyText>
            
            <PrivacyPolicyContactInfo>
              <strong>צור/י קשר</strong><br />
              אם יש לך שאלות כלשהן בנוגע למדיניות פרטיות זו, באפשרותך ליצור עמנו קשר:<br />
              על ידי ביקור בעמוד זה באתר האינטרנט שלנו: https://lp.vp4.me/1obe
            </PrivacyPolicyContactInfo>
          </PrivacyPolicyContent>
        </PrivacyPolicyModal>
      )}
    </AppContainer>
  );
}

// Styled Components
const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  font-family: 'Segoe UI', 'Arial Hebrew', 'Tahoma', 'Geneva', 'Verdana', sans-serif;
  color: #333;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  text-align: right;
  scroll-padding-top: 100px;
  scroll-behavior: smooth;
  
  /* הגדרת משתנה גלובלי לרוחב הסקשנים */
  --section-width: 1500px;

  
  .icon-wrapper {
    margin-right: 0;
    margin-left: 8px;
  }
  @media (max-width: 768px) {
    --section-width: 90%;
  }
`;

const BackgroundAnimation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  z-index: -1;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
    animation: pulse 15s ease-in-out infinite alternate;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    100% {
      transform: scale(1.1);
      opacity: 0.8;
    }
  }
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 15%;
  left: 5%;
  width: 45%; /* Only cover half the width */
  height: 75%;
  background-image: url('${process.env.PUBLIC_URL}/images/book_background.jpg');
  border-radius: 10px;
  background-size: 50%;
  background-position: left;
  background-attachment: fixed;
  opacity: 0.8;
  z-index: 1;
  
  @media (max-width: 768px) {
    width: 100%; /* On mobile, cover the full width */
    height: 45%; /* But only half the height */
    top: 2%; /* Move to top where the book is now */
    left: 0;
    background-size: 130%; /* Larger background image on mobile */
    z-index: 3; /* Ensure it's behind the book but above other content */
  }
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  height: 70px;
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    width: 100%;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff9800;
  margin-left: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ff9800;
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const PrimaryButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(90deg, #ff9800, #ffc107);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 2px solid #ff9800;
  color: #ff9800;
  
  &:hover {
    background: rgba(255, 152, 0, 0.1);
  }
`;

const DesktopOnly = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6rem 3rem 4rem;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
    padding: 3rem 1rem;
    height: auto;
    min-height: 100vh;
    width: 100%;
  
  }
`;

const HeroContent = styled.div`
  flex: 0.9;
  position: relative;
  z-index: 5;
  padding-left: 2rem;
  margin-right: 5%; /* Move content 5% to the left */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    order: 2; /* Display SECOND on mobile */
    padding-left: 0;
    margin-right: 0;
    z-index: 4; /* Ensure this is below the book but above other elements */
    margin-top: 2rem; /* Increased from 0.5rem to move content down */
  }
`;

const HeroTagline = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #ff9800;
  margin-bottom: 1rem;
  direction: rtl;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #ff9800, #ffc107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  direction: rtl;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 0.8rem;
  }
`;

const HeroSubtitle = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 800px;
  direction: rtl;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 1.4;
    margin-bottom: 1.2rem;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    margin-bottom: 0.7rem;
    font-size: 0.8rem;
  }
`;

const BookEmphasis = styled.em`
  font-style: italic;
  font-weight: 600;
  color: #ff9800;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const BookShowcase = styled.div`
  flex: 1.1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 5;
  height: 100%;
  padding: 2rem;
  
  @media (max-width: 768px) {
    order: 1; /* Display FIRST on mobile */
    width: 100%;
    margin-top: 2.5rem; /* Increased to move the book down */
    height: 250px; /* Reduced height */
    padding: 0; /* Less padding */
    position: relative;
    z-index: 10; /* Higher z-index to ensure it's above the background */
  }
`;

const BookCover = styled.div`
  width: 400px;
  height: 550px;
  background: url('${process.env.PUBLIC_URL}/images/book.jpg') center/cover;
  border-radius: 5px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-out;
  transform-style: preserve-3d;
  position: relative;
  z-index: 15; /* Ensure this is above everything else */
  
  @media (max-width: 768px) {
    width: 200px;  /* Smaller width for mobile */
    height: 270px; /* Maintain aspect ratio */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const BookShadow = styled.div`
  position: absolute;
  bottom: -10px;
  width: 300px;
  height: 40px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  filter: blur(15px);
  transform: translateY(210px);
  
  @media (max-width: 768px) {
    width: 150px; /* Smaller shadow */
    height: 20px;
    transform: translateY(130px); /* Adjust position */
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  background: linear-gradient(90deg, #ff9800, #ffc107);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  scroll-margin-top: 100px; /* Add scroll margin for navbar */
  
  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #ff9800, #ffc107);
    margin: 0.5rem auto 0;
    position: relative;
    z-index: -1;
  }
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    width: 100%;
    scroll-margin-top: 80px; /* Smaller offset for mobile */
  }
`;

const FeaturesImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem auto 1rem;
  width: 100%;
  max-width: var(--section-width);
  padding: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
    gap: 1rem;
    width: 100%;
    padding: 1rem 0.5rem;
    max-width: none;
  }
`;

const FeaturesImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  object-fit: cover;
  max-height: 400px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    border-radius: 0;
    width: 100%;
  }
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: var(--section-width);
  margin: 0 auto;
  scroll-margin-top: 100px; /* Add scroll margin for navbar */
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
    gap: 1rem;
    width: 100%;
    padding: 1rem 0.5rem;
    max-width: none;
    scroll-margin-top: 80px; /* Smaller offset for mobile */
  }
`;

const FeatureCard = styled(motion.div).attrs(() => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true, margin: "-100px" }
}))`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(66, 133, 244, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    margin: 0 0 1rem 0;
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ff9800, #ffc107);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  font-size: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    line-height: 1.4;
  }
`;

const TestimonialsSection = styled.section`
  max-width: var(--section-width);
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  scroll-margin-top: 100px; /* Add scroll margin for navbar */
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
    padding: 0;
    width: 100%;
    max-width: none;
    scroll-margin-top: 80px; /* Smaller offset for mobile */
  }
`;

const TestimonialsContainer = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding: 1rem 0 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.5rem 0 1.5rem;
    width: 100%;
    margin: 0;
  }
`;

const TestimonialPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 10px;
`;

const TestimonialDot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#ff9800' : 'rgba(255, 255, 255, 0.7)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const TestimonialCard = styled(motion.div)`
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 0 1rem;
  text-align: left;
  min-width: 300px;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    margin: 0 0.5rem;
    min-width: 85vw; /* Almost full width but allows for peek at next */
  }
`;

const QuoteMark = styled.div`
  font-size: 5rem;
  position: absolute;
  top: -20px;
  left: 10px;
  opacity: 0.1;
  color: #ff9800;
  font-family: Georgia, serif;
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
`;

const TestimonialAuthor = styled.p`
  font-weight: 600;
  color: #ff9800;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const PricingSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 5rem;
  padding: 0 2rem;
  max-width: var(--section-width);
  margin: 0 auto 5rem;
  scroll-margin-top: 100px; /* Add scroll margin for navbar */
  
  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 2rem;
    gap: 1rem;
    width: 100%;
    padding: 0;
    scroll-margin-top: 80px; /* Smaller offset for mobile */
  }
`;

const PricingCard = styled(motion.div).attrs(() => ({
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
  viewport: { once: true, margin: "-100px" }
}))`
  background: white;
  padding: 3.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 45%; /* Match width of SlideShowCard */
  height: 100%; /* Match height */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #ff9800, #ffc107);
  }
  
  @media (max-width: 768px) {
    width: 90%;
    max-width: 90%;
    padding: 2rem;
    height: auto;
  }
`;

const PriceHighlight = styled.div`
  background: linear-gradient(90deg, #ff9800, #ffc107);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1.1rem;
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 0.3rem 1rem;
  }
`;

const Price = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  color: #ff9800;
  margin: 1rem 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 0.7rem 0;
  }
`;

const PriceDescription = styled.div`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-bottom: 1rem;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const FeatureItem = styled.li`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  
  &:before {
    content: '✓';
    display: inline-block;
    margin-left: 0.5rem;
    color: #4caf50;
    font-weight: bold;
  }
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-bottom: 0.5rem;
  }
`;

const TrustSection = styled.section`
  padding: 5rem 2rem;
  background-color: #f9f9f9;
  text-align: right;
  width: 100%;
  scroll-margin-top: 100px; /* Add scroll margin for navbar */
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
    scroll-margin-top: 80px; /* Smaller offset for mobile */
  }
`;

const TrustIntro = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 900px;
  margin: 0 auto 3rem;
  line-height: 1.6;
  text-align: right;
`;

const TrustItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  max-width: 1500px;
  margin: 0 auto;
`;

const TrustItemDetailed = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex: 1;
  min-width: 280px;
  max-width: calc(50% - 1rem);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const TrustItemTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

const TrustItemDescription = styled.p`
  color: #666;
  line-height: 1.6;
  padding-right: 2rem;
`;

const TrustIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f8ff;
  border-radius: 50%;
  margin-left: 1rem;
  color: #0066cc;
`;

const Footer = styled.footer`
  background-color: #263238;
  color: white;
  padding: 3rem 0 1rem;
  text-align: right;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem 0;
  }
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8rem;

  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 3rem;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 250px;
  padding: 0 1rem;
  
  &.contact-section {
    flex: 2;
    max-width: 45%;
  }
  
  &.social {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0 2rem;
  }
  
  @media (max-width: 768px) {
    &.contact-section {
      flex: 1;
      max-width: 100%;
    }
    
    &.social {
      align-items: flex-start;
      text-align: right;
      border-right: none;
      border-left: none;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 2rem 0;
      margin: 0;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLink = styled.a`
  color: #aaa;
  text-decoration: none;
  
  &:hover {
    color: white;
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Copyright = styled.div`
  color: #aaa;
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
`;

const HeaderSocialContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-right: 0;
  margin-right: 2rem;
  
  @media (max-width: 968px) {
    display: none;
  }
`;

const HeaderSocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const HeaderSocialIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0;
  margin-left: 8px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ff9800;
    color: white;
    transform: translateY(-3px);
  }
`;

const SocialIcon = styled.img`
  width: 30px;
  height: 30px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const SlideShowCard = styled(motion.div).attrs(() => ({
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
  viewport: { once: true, margin: "-100px" }
}))`
  background: white;
  padding: 0;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  height: auto;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    margin-top: 2rem;
    width: 90%;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const SlidePagination = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 15px;
  width: 100%;
  gap: 10px;
  z-index: 10;
`;

const SlideDot = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#ff9800' : 'rgba(255, 255, 255, 0.7)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const ContactTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fff;
`;

const ContactText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 0.5rem;
`;

const ContactEmail = styled.a`
  color: #ff9800;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PrivacyPolicyModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  direction: rtl;
`;

const PrivacyPolicyContent = styled.div`
  background-color: white;
  width: 80%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const PrivacyPolicyCloseButton = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #333;
  &:hover {
    color: black;
  }
`;

const PrivacyPolicyTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
  text-align: center;
`;

const PrivacyPolicyDate = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 2rem;
  text-align: center;
`;

const PrivacyPolicyHeading = styled.h3`
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

const PrivacyPolicySubHeading = styled.h4`
  font-size: 1.2rem;
  margin: 1.5rem 0 0.5rem;
  color: #444;
`;

const PrivacyPolicyText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #555;
`;

const PrivacyPolicyList = styled.ul`
  margin: 1rem 2rem;
  padding: 0;
`;

const PrivacyPolicyListItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: #555;
`;

const PrivacyPolicyContactInfo = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 5px;
  text-align: center;
`;

export default App;
