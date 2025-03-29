import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// SVG Icons as React components
const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
);

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
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
  
  // State for current slide
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '/images/slide1.jpg',
    '/images/slide2.jpg',
    '/images/slide3.jpg'
  ];
  
  // Function to change slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateXVal = (y - centerY) / 10;
    const rotateYVal = (centerX - x) / 10;
    
    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <AppContainer dir="rtl">
      {/* Animated background */}
      <BackgroundAnimation />
      
      {/* Navigation */}
      <Navbar>
        <Logo>לקרוא גרפים בקלות</Logo>
        <NavLinks>
          <NavLink href="#features">מאפיינים</NavLink>
          <NavLink href="#testimonials">המלצות</NavLink>
          <NavLink href="#pricing">מחיר</NavLink>
          <PrimaryButton as="a" href="#buy">
            <IconWrapper>
              <ShoppingCartIcon />
            </IconWrapper>
            קנה עכשיו
          </PrimaryButton>
        </NavLinks>
      </Navbar>
      
      {/* Hero Section */}
      <HeroSection ref={heroRef}>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTagline>חווית למידה דיגיטלית מהפכנית</HeroTagline>
            <HeroTitle>לקרוא גרפים בקלות</HeroTitle>
            <HeroSubtitle>
            עולם הבורסה והמסחר יכול להיראות מסובך ומאתגר למי שעושה את צעדיו הראשונים. מושגים חדשים, שוק הפכפך ומספרים שקופצים בין ירוק לאדום – כל אלו עשויים להרתיע את המתחילים, אך האמת היא שהבנת המסחר בבורסה אינה חייבת להיות משימה מסובכת.

הספר *לקרוא גרפים בקלות* נכתב במיוחד עבור אלו שמחפשים גישה ברורה וידידותית לכניסה לעולם המסחר. המטרה שלי היא לפשט את התהליך ולהעניק לך את הכלים והידע הדרושים כדי לקרוא ולהבין גרפים, לזהות תבניות מסחר, ולהשתמש בכל אלו כדי לקבל החלטות מושכלות בשוק ההון.

לא מדובר כאן במדריך מסובך המיועד למומחים, אלא בספר המכוון למתחילים שרוצים להכיר את היסודות בצורה פשוטה, מובנית ומעשית. לאורך הפרקים נעבור יחד דרך מושגים בסיסיים בגרפים, כיצד לקרוא אותם, אילו תבניות לחפש, ומהן האסטרטגיות הראשוניות שתוכל ליישם במסחר האישי שלך.

המטרה שלי היא שעם סיום קריאת הספר, תוכל להרגיש ביטחון ביכולתך להבין את השוק ולקבל החלטות מסחר בצורה מושכלת ומדויקת יותר. בין אם אתה מחפש להתחיל מסחר כהשקעה לטווח ארוך או כמקור הכנסה נוסף, הכלים שתלמד כאן יסייעו לך לצעוד בבטחה לעולם זה.
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
        
        <BookShowcase
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.1s ease'
          }}
        >
          <BookCover>
            <BookTitle>לקרוא גרפים בקלות</BookTitle>
            <BookAuthor>המדריך המומחה שלך</BookAuthor>
          </BookCover>
          <BookShadow />
        </BookShowcase>
      </HeroSection>
      
      {/* Features Section */}
      <SectionTitle id="features">מאפייני הספר</SectionTitle>
      <FeaturesImageContainer>
        <FeaturesImage src="/images/book_features.jpg" alt="מאפייני הספר" />
      </FeaturesImageContainer>
      <FeaturesSection ref={featuresRef}>
        <FeatureCard>
          <FeatureIcon>
            <StarIcon />
          </FeatureIcon>
          <FeatureTitle>דוגמאות אינטראקטיביות</FeatureTitle>
          <FeatureDescription>
            תרגול עם נתונים מהעולם האמיתי ודוגמאות אינטראקטיביות שעוזרות לחזק את ההבנה שלך.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>
            <StarIcon />
          </FeatureIcon>
          <FeatureTitle>הדרכה שלב אחר שלב</FeatureTitle>
          <FeatureDescription>
            הוראות ברורות והסברים מפורטים כדי להבטיח שתבין כל מושג.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>
            <StarIcon />
          </FeatureIcon>
          <FeatureTitle>כיסוי מקיף</FeatureTitle>
          <FeatureDescription>
            מתרשימי עמודות בסיסיים ועד לויזואליזציות סטטיסטיות מורכבות - אנחנו מכסים הכל.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesSection>
      
      {/* Testimonials Section */}
      <SectionTitle id="testimonials">מה הקוראים אומרים</SectionTitle>
      <TestimonialsSection ref={testimonialsRef}>
        <TestimonialCard>
          <QuoteMark>"</QuoteMark>
          <TestimonialText>
            הספר הזה שינה לגמרי את ההבנה שלי של ויזואליזציה של נתונים. אני יכול כעת לנתח בביטחון כל גרף או תרשים שאני נתקל בו.
          </TestimonialText>
          <TestimonialAuthor>דוד כ.</TestimonialAuthor>
        </TestimonialCard>
        
        <TestimonialCard>
          <QuoteMark>"</QuoteMark>
          <TestimonialText>
            כסטודנטית שמתקשה בסטטיסטיקה, המדריך הזה היה בדיוק מה שהייתי צריכה. הסברים ברורים ודוגמאות מעשיות עשו את כל ההבדל.
          </TestimonialText>
          <TestimonialAuthor>שרה מ.</TestimonialAuthor>
        </TestimonialCard>
        
        <TestimonialCard>
          <QuoteMark>"</QuoteMark>
          <TestimonialText>
            משאב מדהים גם למתחילים וגם לקוראים מתקדמים. הפורמט הדיגיטלי מקל על המעקב והתרגול.
          </TestimonialText>
          <TestimonialAuthor>מיכאל ת.</TestimonialAuthor>
        </TestimonialCard>
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
      <TrustSection>
        <TrustTitle>הגנה ללקוח</TrustTitle>
        <TrustItemsContainer>
          <TrustItem>
            <TrustIcon>
              <LockIcon />
            </TrustIcon>
            <TrustText>אבטחת מידע ופרטיות</TrustText>
          </TrustItem>
          
          <TrustItem>
            <TrustIcon>
              <BookIcon />
            </TrustIcon>
            <TrustText>רכישה והורדה של ספר דיגיטלי</TrustText>
          </TrustItem>
          
          <TrustItem>
            <TrustIcon>
              <HeadsetIcon />
            </TrustIcon>
            <TrustText>שירות לקוחות</TrustText>
          </TrustItem>
        </TrustItemsContainer>
      </TrustSection>
      
      {/* Footer */}
      <Footer>
        <FooterContent>
          <ContactInfo>
            <ContactTitle>צור קשר</ContactTitle>
            <ContactEmail href="mailto:contact@example.com">contact@example.com</ContactEmail>
          </ContactInfo>
          
          <FooterLinks>
            <FooterLink href="/privacy">מדיניות פרטיות</FooterLink>
            <FooterLink href="/terms">תנאים והגבלות</FooterLink>
          </FooterLinks>
        </FooterContent>
        <Copyright> {new Date().getFullYear()} לקרוא גרפים בקלות. כל הזכויות שמורות.</Copyright>
      </Footer>
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

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  height: 70px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff9800;
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

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8rem 4rem 4rem;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    gap: 4rem;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 600px;
  padding-right: 2rem;
  margin-right: 2rem;
`;

const HeroTagline = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: #ff9800;
  margin-bottom: 1rem;
  direction: rtl;
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
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 2rem;
  direction: rtl;
  white-space: pre-line;
  text-align: justify;
  padding-left: 1.5rem;
  
  @media (max-width: 768px) {
    padding-left: 0;
    font-size: 1.1rem;
  }
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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const BookCover = styled.div`
  width: 340px;
  height: 460px;
  background: linear-gradient(135deg, #ff9800, #ffc107);
  border-radius: 5px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem;
  color: white;
  text-align: center;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: translateZ(20px);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
    pointer-events: none;
  }
  
  @media (max-width: 1024px) {
    width: 320px;
    height: 440px;
  }
`;

const BookTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const BookAuthor = styled.p`
  font-size: 1rem;
  opacity: 0.8;
`;

const BookShadow = styled.div`
  position: absolute;
  width: 260px;
  height: 40px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  filter: blur(15px);
  transform: translateY(210px);
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 4rem 0 2rem;
  color: #333;
  padding-top: 6rem;
  margin-top: -2rem;
  position: relative;
  z-index: 1;
  
  &:before {
    content: '';
    display: block;
    height: 80px;
    margin: -80px 0 0;
    position: relative;
    z-index: -1;
  }
`;

const FeaturesImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem auto 3rem;
  width: 100%;
  max-width: var(--section-width);
  padding: 0 2rem;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 193, 7, 0.1));
    border-radius: 12px;
    z-index: -1;
  }
`;

const FeaturesImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(255, 152, 0, 0.15);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  object-fit: cover;
  max-height: 400px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(255, 152, 0, 0.2);
  }
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: var(--section-width);
  margin: 0 auto;
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
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
`;

const TestimonialsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: var(--section-width);
  margin: 0 auto;
`;

const TestimonialCard = styled(motion.div).attrs(() => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true, margin: "-100px" }
}))`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
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
`;

const TestimonialAuthor = styled.p`
  font-weight: 600;
  color: #ff9800;
`;

const PricingSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 4rem 4rem;
  flex-wrap: wrap;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PricingCard = styled(motion.div).attrs(() => ({
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
  viewport: { once: true, margin: "-100px" }
}))`
  background: white;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #ff9800, #ffc107);
  }
`;

const PriceHighlight = styled.div`
  background: linear-gradient(90deg, #ff9800, #ffc107);
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  display: inline-block;
  margin-bottom: 1.5rem;
`;

const Price = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const PriceDescription = styled.div`
  color: #666;
  margin-bottom: 2rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const FeatureItem = styled.li`
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  &::before {
    content: '✓';
    color: #34a853;
    margin-right: 15px;
    padding-left: 15px;
    font-weight: bold;
  }
`;

const TrustSection = styled.section`
  background: white;
  padding: 4rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const TrustTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
`;

const TrustItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  flex-wrap: wrap;
`;

const TrustItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;
`;

const TrustIcon = styled.div`
  width: 50px;
  height: 50px;
  background: #fff8e1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #ff9800;
  font-size: 1.2rem;
`;

const TrustText = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Footer = styled.footer`
  background: #263238;
  color: white;
  padding: 4rem;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  max-width: 300px;
`;

const ContactTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ContactEmail = styled.a`
  color: #aaa;
  text-decoration: none;
  
  &:hover {
    color: white;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const FooterLink = styled.a`
  color: #aaa;
  text-decoration: none;
  
  &:hover {
    color: white;
  }
`;

const Copyright = styled.div`
  color: #aaa;
  font-size: 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0;
  margin-left: 8px;
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
  
  @media (max-width: 1024px) {
    margin-top: 2rem;
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

export default App;
