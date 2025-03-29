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

  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);

  return (
    <AppContainer dir="rtl">
      {/* Animated background */}
      <BackgroundAnimation />
      
      {/* Navigation */}
      <Navbar>
        <LogoContainer>
          <Logo>לקרוא גרפים בקלות</Logo>
          <HeaderSocialContainer>
            <HeaderSocialLink href="mailto:pashut.likro.graphs@gmail.com" aria-label="Email">
              <HeaderSocialIcon src="/images/email.png" alt="Email" />
            </HeaderSocialLink>
            <HeaderSocialLink href="https://wa.me/972123456789" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <HeaderSocialIcon src="/images/whatsapp.png" alt="WhatsApp" />
            </HeaderSocialLink>
            <HeaderSocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <HeaderSocialIcon src="/images/facebook.png" alt="Facebook" />
            </HeaderSocialLink>
          </HeaderSocialContainer>
        </LogoContainer>
        <NavLinks>
          <NavLink href="#">בית</NavLink>
          <NavLink href="#features">מאפיינים</NavLink>
          <NavLink href="#testimonials">המלצות</NavLink>
          <NavLink href="#pricing">מחיר</NavLink>
          <NavLink href="#buy">הגנת הצרכן</NavLink>
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
        <BackgroundOverlay />
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
        >
          <BookCover style={{ 
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` 
          }}>
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
                  <SocialIcon src="/images/facebook.png" alt="Facebook" />
                </SocialLink>
                <SocialLink href="https://wa.me/972123456789" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <SocialIcon src="/images/whatsapp.png" alt="WhatsApp" />
                </SocialLink>
                <SocialLink href="mailto:pashut.likro.graphs@gmail.com" aria-label="Email">
                  <SocialIcon src="/images/email.png" alt="Email" />
                </SocialLink>
                <SocialLink href="/" aria-label="Home">
                  <SocialIcon src="/images/home.png" alt="Home" />
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
            
            <PrivacyPolicyHeading>פרשנות והגדרות</PrivacyPolicyHeading>
            <PrivacyPolicySubHeading>פרשנות</PrivacyPolicySubHeading>
            <PrivacyPolicyText>
              המילים שהאות הראשונה שלהן היא באות גדולה מקבלות משמעות המוגדרת בתנאים הבאים. ההגדרות הבאות יישאו את אותה משמעות בין אם הן מופיעות ביחיד או ברבים.
            </PrivacyPolicyText>
            
            <PrivacyPolicySubHeading>הגדרות</PrivacyPolicySubHeading>
            <PrivacyPolicyText>
              לצורך מדיניות פרטיות זו:
            </PrivacyPolicyText>
            
            <PrivacyPolicyList>
              <PrivacyPolicyListItem>"חשבון" פירושו חשבון ייחודי שנוצר עבורך לצורך גישה לשירות שלנו או לחלקים ממנו.</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>"שותף" (Affiliate) פירושו גוף השולט ב-, נשלט על ידי או נמצא בשליטה משותפת עם צד מסוים, כאשר "שליטה" משמעה בעלות של 50% או יותר ממניות, אחזקות הון או ניירות ערך אחרים המזכים בהצבעה לבחירת דירקטורים או רשות ניהול אחרת.</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>"החברה" (המתייחסת הן כ"החברה", "אנו", "לנו" או "שלנו" בהסכם זה) מתייחסת ללקרוא גרפים בקלת.</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>"עוגיות" (Cookies) הן קבצים קטנים הממוקמים במחשב שלך, במכשיר הנייד או בכל מכשיר אחר, על ידי אתר אינטרנט, המכילים מידע על היסטוריית הגלישה שלך באתר זה בין שימושים שונים.</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>"ארץ" מתייחסת ל: ישראל.</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>"מכשיר" פירושו כל מכשיר שיכול לגשת לשירות, כגון מחשב, טלפון סלולרי או טאבלט.</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>"נתונים אישיים" פירושו כל מידע המתייחס לאדם מזוהה או שניתן לזהותו.</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>"שירות" מתייחס לאתר האינטרנט.</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>"ספק שירות" פירושו כל אדם טבעי או משפטי המעבד נתונים מטעם החברה. הכוונה היא לחברות צד שלישי או אנשים שהחברה מעסיקה כדי להקל על מתן השירות, לספק את השירות מטעם החברה, לבצע שירותים הקשורים לשירות או לסייע לחברה בניתוח כיצד נעשה שימוש בשירות.</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>"נתוני שימוש" הם נתונים הנאספים באופן אוטומטי, או שנוצרים בעקבות השימוש בשירות או מתשתית השירות עצמה (לדוגמה, משך זמן ביקור בעמוד).</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>"אתר האינטרנט" מתייחס ללקרוא גרפים בקלת, הנגיש בכתובת https://lp.vp4.me/1obe.</PrivacyPolicyListItem>
              <PrivacyPolicyListItem>"את/ה" פירושו האדם הגולש או משתמש בשירות, או החברה או כל גוף משפטי אחר מטעם אותו אדם הניגש או משתמש בשירות, לפי העניין.</PrivacyPolicyListItem>
            </PrivacyPolicyList>
            
            <PrivacyPolicyHeading>איסוף והשימוש בנתונים האישיים שלך</PrivacyPolicyHeading>
            <PrivacyPolicySubHeading>סוגי נתונים שנאספים</PrivacyPolicySubHeading>
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
              נתוני שימוש עשויים לכלול מידע כגון כתובת פרוטוקול האינטרנט של המכשיר שלך (למשל כתובת IP), סוג הדפדפן, גרסת הדפדפן, העמודים בשירות שלנו שבהם את/ה מבקר/ת, זמן ותאריך הביקור שלך, משך הזמן ששהית בעמודים אלו, מזהים ייחודיים של המכשיר ונתוני אבחון אחרים.
            </PrivacyPolicyText>

            <PrivacyPolicyText>
              כאשר את/ה ניגש/ת לשירות דרך או באמצעות מכשיר נייד, אנו עשויים לאסוף מידע מסוים באופן אוטומטי, כולל, אך לא מוגבל ל: סוג המכשיר הנייד שבו את/ה משתמש/ת, מזהה ייחודי של המכשיר הנייד שלך, כתובת ה-IP של המכשיר הנייד שלך, מערכת ההפעלה הניידת שלך, סוג דפדפן האינטרנט הנייד שבו את/ה משתמש/ת, מזהים ייחודיים של המכשיר ונתוני אבחון אחרים.
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
  background-image: url('/images/book_background.jpg');
  
  background-size: 50%;
  background-position: left;
  background-attachment: fixed;
  opacity: 0.8;
  z-index: 1;
  
  @media (max-width: 1024px) {
    width: 100%; /* On mobile, cover the full width */
    height: 50%; /* But only half the height */
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
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6rem 3rem 4rem;
  overflow: hidden;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    gap: 4rem;
    padding: 4rem 2rem;
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
  flex: 1.1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 5;
  height: 100%;
  padding: 2rem;
  
  @media (max-width: 1024px) {
    width: 100%;
    margin-top: 1rem;
  }
`;

const BookCover = styled.div`
  width: 400px;
  height: 550px;
  background: url('/images/book.jpg') center/cover;
  border-radius: 5px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
    pointer-events: none;
  }
  
  @media (max-width: 1024px) {
    width: 350px;
    height: 500px;
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
  padding: 5rem 2rem;
  background-color: #f9f9f9;
  text-align: right;
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
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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
