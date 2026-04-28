// Template: mobile-bookshelf
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  headerSubtitle: { type: "text", label: "Header Subtitle", value: "My Favourite" },
  headerTitle: { type: "text", label: "Header Title", value: "BOOKS" },
  category1: { type: "text", label: "Category 1", value: "Design" },
  category1Count: { type: "text", label: "Category 1 Count", value: "16 books" },
  category2: { type: "text", label: "Category 2", value: "Psychology" },
  category2Count: { type: "text", label: "Category 2 Count", value: "3 books" },
  category3: { type: "text", label: "Category 3", value: "Novels" },
  category3Count: { type: "text", label: "Category 3 Count", value: "8 books" },
  ctaText: { type: "text", label: "CTA Button", value: "Add Books" },
  fontFamily: { type: "font", label: "Font", value: "Inter" },
  backgroundColor: { type: "color", label: "Background", value: "#F5F5F5" },
  phoneColor: { type: "color", label: "Phone Frame", value: "#1A1A1A" },
  shelf1Color: { type: "color", label: "Shelf 1 Color", value: "#F5A623" },
  shelf2Color: { type: "color", label: "Shelf 2 Color", value: "#6B9FD4" },
  shelf3Color: { type: "color", label: "Shelf 3 Color", value: "#2D5A45" },
  accentColor: { type: "color", label: "Accent", value: "#D4AF37" },
  textColor: { type: "color", label: "Text Color", value: "#1A1A1A" },
  referenceImage: { type: "image", label: "Reference Image", value: "blob:https://www.mangogiraffe.ai/af95cdef-19ea-4320-8959-d08206db3710" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  staggerDelay: { type: "number", label: "Stagger Delay", value: 5, min: 2, max: 15, step: 1 },
};

function Scene(props: any) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = (props.animationSpeed ?? SCENE_PARAMS.animationSpeed.value);
  const adjustedFrame = frame * speed;
  const stagger = (props.staggerDelay ?? SCENE_PARAMS.staggerDelay.value);
  
  const isPortrait = height > width;
  const phoneHeight = isPortrait ? height * 0.82 : height * 0.9;
  const phoneWidth = phoneHeight / 2.1;
  const finalPhoneWidth = Math.min(phoneWidth, width * 0.85);
  const finalPhoneHeight = finalPhoneWidth * 2.1;
  
  const phoneEntrance = spring({ frame: adjustedFrame, fps, config: { damping: 22, stiffness: 85 } });
  const phoneY = interpolate(phoneEntrance, [0, 1], [height * 0.1, 0]);
  
  const headerSubProgress = spring({ frame: Math.max(0, adjustedFrame - 10), fps, config: { damping: 20, stiffness: 90 } });
  const headerTitleProgress = spring({ frame: Math.max(0, adjustedFrame - 18), fps, config: { damping: 18, stiffness: 100 } });
  const titleScale = interpolate(headerTitleProgress, [0, 1], [0.85, 1]);
  
  const bookCovers = [
    [
      { bg: "#E8DDD4", hasArt: true, artType: "geometric", title: "Complete\nBook", titleColor: "#1A1A1A", accent: "#C4A77D", artColors: ["#D4C4B0", "#8B7355", "#C4A77D"] },
      { bg: "#2C3E50", hasArt: true, artType: "circles", title: "Industrial\nDesign A-Z", titleColor: "#FFFFFF", accent: "#E74C3C", artColors: ["#E74C3C", "#3498DB", "#F39C12"] },
      { bg: "#F39C12", hasArt: true, artType: "lines", title: "Discovery\nHabits", titleColor: "#FFFFFF", accent: "#E67E22", artColors: ["#FFFFFF", "#E67E22", "#D35400"] },
      { bg: "#ECF0F1", hasArt: true, artType: "sketch", title: "Sketching", titleColor: "#2C3E50", accent: "#3498DB", artColors: ["#3498DB", "#2C3E50", "#95A5A6"] },
    ],
    [
      { bg: "#1ABC9C", hasArt: true, artType: "face", title: "Read\nPeople", titleColor: "#FFFFFF", accent: "#16A085", artColors: ["#FFFFFF", "#16A085", "#0E6655"] },
      { bg: "#9B59B6", hasArt: true, artType: "brain", title: "Subconscious\nMind", titleColor: "#FFFFFF", accent: "#8E44AD", artColors: ["#E8DAEF", "#D2B4DE", "#FFFFFF"] },
      { bg: "#E74C3C", hasArt: true, artType: "abstract", title: "Body Keeps\nScore", titleColor: "#FFFFFF", accent: "#C0392B", artColors: ["#FADBD8", "#F1948A", "#FFFFFF"] },
    ],
    [
      { bg: "#2D5A45", hasArt: true, artType: "palace", title: "Paper\nPalace", titleColor: "#FFFFFF", accent: "#1E3D2F", artColors: ["#A9DFBF", "#7DCEA0", "#FFFFFF"] },
      { bg: "#F5E6D3", hasArt: true, artType: "house", title: "House", titleColor: "#4A4A4A", accent: "#D4A574", artColors: ["#D4A574", "#8B4513", "#2D5A45"] },
      { bg: "linear-gradient(135deg, #9B59B6 0%, #E67E22 100%)", hasArt: true, artType: "silhouette", title: "Vanishing\nHalf", titleColor: "#FFFFFF", accent: "#8E44AD", artColors: ["#FFFFFF", "#F5CBA7", "#FADBD8"] },
      { bg: "#34495E", hasArt: true, artType: "minimal", title: "Novel", titleColor: "#BDC3C7", accent: "#2C3E50", artColors: ["#85929E", "#5D6D7E", "#AEB6BF"] },
    ],
  ];
  
  const shelves = [
    { name: (props.category1 ?? SCENE_PARAMS.category1.value), count: (props.category1Count ?? SCENE_PARAMS.category1Count.value), color: (props.shelf1Color ?? SCENE_PARAMS.shelf1Color.value), books: bookCovers[0], delay: 30 },
    { name: (props.category2 ?? SCENE_PARAMS.category2.value), count: (props.category2Count ?? SCENE_PARAMS.category2Count.value), color: (props.shelf2Color ?? SCENE_PARAMS.shelf2Color.value), books: bookCovers[1], delay: 60 },
    { name: (props.category3 ?? SCENE_PARAMS.category3.value), count: (props.category3Count ?? SCENE_PARAMS.category3Count.value), color: (props.shelf3Color ?? SCENE_PARAMS.shelf3Color.value), books: bookCovers[2], delay: 90 },
  ];
  
  const contentPadding = finalPhoneWidth * 0.05;
  const shelfHeight = finalPhoneHeight * 0.19;
  const bookHeight = shelfHeight * 0.78;
  const bookWidth = bookHeight * 0.7;
  
  const ctaDelay = 120;
  const ctaProgress = spring({ frame: Math.max(0, adjustedFrame - ctaDelay), fps, config: { damping: 15, stiffness: 120 } });
  const ctaScale = interpolate(ctaProgress, [0, 1], [0.9, 1]);
  
  const renderBookArt = (book, artWidth, artHeight) => {
    const w = artWidth;
    const h = artHeight;
    
    if (book.artType === "geometric") {
      return (
        <div style={{ position: "absolute", top: "15%", left: "10%", width: "80%", height: "45%" }}>
          <div style={{ position: "absolute", width: "60%", height: "60%", backgroundColor: book.artColors[0], transform: "rotate(15deg)", borderRadius: 2 }} />
          <div style={{ position: "absolute", right: 0, top: "20%", width: "50%", height: "50%", backgroundColor: book.artColors[1], transform: "rotate(-10deg)", borderRadius: 2 }} />
          <div style={{ position: "absolute", bottom: 0, left: "20%", width: "40%", height: "40%", backgroundColor: book.artColors[2], borderRadius: "50%" }} />
        </div>
      );
    }
    
    if (book.artType === "circles") {
      return (
        <div style={{ position: "absolute", top: "10%", left: "10%", width: "80%", height: "50%" }}>
          <div style={{ position: "absolute", left: "5%", top: "10%", width: "35%", height: 0, paddingBottom: "35%", backgroundColor: book.artColors[0], borderRadius: "50%" }} />
          <div style={{ position: "absolute", right: "10%", top: "5%", width: "30%", height: 0, paddingBottom: "30%", backgroundColor: book.artColors[1], borderRadius: "50%" }} />
          <div style={{ position: "absolute", left: "25%", bottom: "10%", width: "40%", height: 0, paddingBottom: "40%", backgroundColor: book.artColors[2], borderRadius: "50%" }} />
        </div>
      );
    }
    
    if (book.artType === "lines") {
      return (
        <div style={{ position: "absolute", top: "12%", left: "15%", width: "70%", height: "45%", display: "flex", flexDirection: "column", gap: 3 }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ height: 3, backgroundColor: book.artColors[i % 3], width: (70 + i * 6) + "%", borderRadius: 2 }} />
          ))}
        </div>
      );
    }
    
    if (book.artType === "sketch") {
      return (
        <div style={{ position: "absolute", top: "10%", left: "10%", width: "80%", height: "50%" }}>
          <div style={{ position: "absolute", left: "10%", top: "20%", width: "60%", height: 2, backgroundColor: book.artColors[0], transform: "rotate(-5deg)" }} />
          <div style={{ position: "absolute", left: "15%", top: "35%", width: "70%", height: 2, backgroundColor: book.artColors[1], transform: "rotate(3deg)" }} />
          <div style={{ position: "absolute", left: "5%", top: "50%", width: "50%", height: 2, backgroundColor: book.artColors[2], transform: "rotate(-2deg)" }} />
          <div style={{ position: "absolute", right: "10%", top: "60%", width: "40%", height: 15, border: "2px solid " + book.artColors[0], borderRadius: 2 }} />
        </div>
      );
    }
    
    if (book.artType === "face") {
      return (
        <div style={{ position: "absolute", top: "8%", left: "15%", width: "70%", height: "55%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: "80%", height: "90%", borderRadius: "50% 50% 45% 45%", border: "3px solid " + book.artColors[0], position: "relative" }}>
            <div style={{ position: "absolute", left: "20%", top: "30%", width: "15%", height: "10%", backgroundColor: book.artColors[1], borderRadius: "50%" }} />
            <div style={{ position: "absolute", right: "20%", top: "30%", width: "15%", height: "10%", backgroundColor: book.artColors[1], borderRadius: "50%" }} />
            <div style={{ position: "absolute", left: "30%", bottom: "25%", width: "40%", height: 3, backgroundColor: book.artColors[0], borderRadius: 2 }} />
          </div>
        </div>
      );
    }
    
    if (book.artType === "brain") {
      return (
        <div style={{ position: "absolute", top: "8%", left: "10%", width: "80%", height: "50%" }}>
          <div style={{ position: "absolute", left: "15%", top: "10%", width: "35%", height: "70%", backgroundColor: book.artColors[0], borderRadius: "50% 20% 50% 50%" }} />
          <div style={{ position: "absolute", right: "15%", top: "10%", width: "35%", height: "70%", backgroundColor: book.artColors[1], borderRadius: "20% 50% 50% 50%" }} />
          <div style={{ position: "absolute", left: "35%", top: "25%", width: "30%", height: "50%", backgroundColor: book.artColors[2], borderRadius: "50%", opacity: 0.5 }} />
        </div>
      );
    }
    
    if (book.artType === "abstract") {
      return (
        <div style={{ position: "absolute", top: "10%", left: "10%", width: "80%", height: "50%" }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", background: "radial-gradient(circle at 30% 40%, " + book.artColors[0] + " 0%, transparent 50%)" }} />
          <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", background: "radial-gradient(circle at 70% 60%, " + book.artColors[1] + " 0%, transparent 40%)" }} />
          <div style={{ position: "absolute", left: "20%", top: "30%", width: 4, height: "40%", backgroundColor: book.artColors[2], transform: "rotate(20deg)" }} />
        </div>
      );
    }
    
    if (book.artType === "palace") {
      return (
        <div style={{ position: "absolute", top: "10%", left: "10%", width: "80%", height: "50%" }}>
          <div style={{ position: "absolute", bottom: 0, left: "10%", width: "80%", height: "60%", backgroundColor: book.artColors[0], borderRadius: "5px 5px 0 0" }} />
          <div style={{ position: "absolute", bottom: "60%", left: "35%", width: "30%", height: "30%", backgroundColor: book.artColors[1], clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
          <div style={{ position: "absolute", bottom: "15%", left: "35%", width: "30%", height: "35%", backgroundColor: book.artColors[2], borderRadius: "50% 50% 0 0" }} />
        </div>
      );
    }
    
    if (book.artType === "house") {
      return (
        <div style={{ position: "absolute", top: "10%", left: "10%", width: "80%", height: "55%" }}>
          <div style={{ position: "absolute", bottom: 0, left: "5%", width: "90%", height: "55%", backgroundColor: book.artColors[0] }} />
          <div style={{ position: "absolute", bottom: "55%", left: 0, width: "100%", height: "40%", backgroundColor: book.artColors[1], clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
          <div style={{ position: "absolute", bottom: "8%", left: "35%", width: "30%", height: "40%", backgroundColor: book.artColors[2], borderRadius: 2 }} />
          <div style={{ position: "absolute", bottom: "25%", right: "15%", width: "20%", height: "20%", backgroundColor: book.artColors[2], opacity: 0.7 }} />
        </div>
      );
    }
    
    if (book.artType === "silhouette") {
      return (
        <div style={{ position: "absolute", top: "8%", left: "15%", width: "70%", height: "55%", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "40%", height: "100%", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: "10%", width: "80%", height: "35%", backgroundColor: book.artColors[0], borderRadius: "50%" }} />
            <div style={{ position: "absolute", top: "30%", left: 0, width: "100%", height: "70%", backgroundColor: book.artColors[1], borderRadius: "30% 30% 0 0" }} />
          </div>
          <div style={{ width: "40%", height: "100%", position: "relative", marginLeft: "-10%" }}>
            <div style={{ position: "absolute", top: "5%", left: "10%", width: "80%", height: "32%", backgroundColor: book.artColors[2], borderRadius: "50%" }} />
            <div style={{ position: "absolute", top: "33%", left: 0, width: "100%", height: "67%", backgroundColor: book.artColors[0], borderRadius: "30% 30% 0 0", opacity: 0.8 }} />
          </div>
        </div>
      );
    }
    
    if (book.artType === "minimal") {
      return (
        <div style={{ position: "absolute", top: "15%", left: "15%", width: "70%", height: "45%" }}>
          <div style={{ position: "absolute", top: "20%", left: "10%", width: "80%", height: 3, backgroundColor: book.artColors[0] }} />
          <div style={{ position: "absolute", top: "45%", left: "20%", width: "60%", height: 3, backgroundColor: book.artColors[1] }} />
          <div style={{ position: "absolute", top: "70%", left: "15%", width: "70%", height: 3, backgroundColor: book.artColors[2] }} />
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <AbsoluteFill style={{ 
      backgroundColor: (props.backgroundColor ?? SCENE_PARAMS.backgroundColor.value), 
      justifyContent: "center", 
      alignItems: "center",
    }}>
      <div style={{
        transform: "scale(" + (props.scale ?? SCENE_PARAMS.scale.value) + ") translateY(" + phoneY + "px)",
        opacity: phoneEntrance,
        transformOrigin: "center center",
      }}>
        <div style={{
          width: finalPhoneWidth,
          height: finalPhoneHeight,
          backgroundColor: "#FFFFFF",
          borderRadius: finalPhoneWidth * 0.1,
          border: "8px solid " + (props.phoneColor ?? SCENE_PARAMS.phoneColor.value),
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 30px 100px rgba(0,0,0,0.25)",
          position: "relative",
        }}>
          
          <div style={{
            height: finalPhoneHeight * 0.04,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
          }}>
            <div style={{
              width: finalPhoneWidth * 0.3,
              height: finalPhoneHeight * 0.012,
              backgroundColor: (props.phoneColor ?? SCENE_PARAMS.phoneColor.value),
              borderRadius: 20,
            }} />
          </div>
          
          <div style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}>
            
            <div style={{
              padding: contentPadding,
              paddingTop: contentPadding * 1.5,
              paddingBottom: contentPadding * 0.8,
            }}>
              <p style={{
                color: "#888888",
                fontSize: finalPhoneWidth * 0.038,
                fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                margin: 0,
                fontWeight: 400,
                opacity: headerSubProgress,
                transform: "translateY(" + interpolate(headerSubProgress, [0, 1], [10, 0]) + "px)",
              }}>
                {(props.headerSubtitle ?? SCENE_PARAMS.headerSubtitle.value)}
              </p>
              <h1 style={{
                color: (props.textColor ?? SCENE_PARAMS.textColor.value),
                fontSize: finalPhoneWidth * 0.12,
                fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                margin: 0,
                marginTop: 2,
                fontWeight: 800,
                letterSpacing: 3,
                opacity: headerTitleProgress,
                transform: "scale(" + titleScale + ") translateY(" + interpolate(headerTitleProgress, [0, 1], [15, 0]) + "px)",
                transformOrigin: "left center",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              }}>
                {(props.headerTitle ?? SCENE_PARAMS.headerTitle.value)}
              </h1>
            </div>
            
            <div style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: finalPhoneHeight * 0.018,
              padding: contentPadding,
              paddingTop: 0,
            }}>
              {shelves.map((shelf, shelfIndex) => {
                const shelfProgress = spring({ 
                  frame: Math.max(0, adjustedFrame - shelf.delay), 
                  fps, 
                  config: { damping: 20, stiffness: 90 } 
                });
                const labelX = interpolate(shelfProgress, [0, 1], [-30, 0]);
                const shelfBarWidth = interpolate(shelfProgress, [0, 1], [0, 100]);
                
                return (
                  <div key={shelfIndex} style={{
                    opacity: shelfProgress,
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 6,
                    }}>
                      <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 8,
                        transform: "translateX(" + labelX + "px)",
                      }}>
                        <span style={{
                          color: (props.textColor ?? SCENE_PARAMS.textColor.value),
                          fontSize: finalPhoneWidth * 0.042,
                          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                          fontWeight: 600,
                        }}>
                          {shelf.name}
                        </span>
                        <span style={{
                          color: "#AAAAAA",
                          fontSize: finalPhoneWidth * 0.028,
                          fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                        }}>
                          {shelf.count}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: 4 }}>
                        <div style={{
                          width: finalPhoneWidth * 0.055,
                          height: finalPhoneWidth * 0.055,
                          borderRadius: 6,
                          backgroundColor: "#F0F0F0",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#888888",
                          fontSize: finalPhoneWidth * 0.03,
                          fontWeight: 600,
                        }}>
                          ‹
                        </div>
                        <div style={{
                          width: finalPhoneWidth * 0.055,
                          height: finalPhoneWidth * 0.055,
                          borderRadius: 6,
                          backgroundColor: "#F0F0F0",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#888888",
                          fontSize: finalPhoneWidth * 0.03,
                          fontWeight: 600,
                        }}>
                          ›
                        </div>
                      </div>
                    </div>
                    
                    <div style={{
                      position: "relative",
                      height: shelfHeight,
                    }}>
                      <div style={{
                        display: "flex",
                        gap: bookWidth * 0.12,
                        height: bookHeight,
                        alignItems: "flex-end",
                        position: "relative",
                        zIndex: 2,
                        perspective: 800,
                      }}>
                        {shelf.books.map((book, bookIndex) => {
                          const bookDelay = shelf.delay + 8 + (bookIndex * stagger);
                          const bookProgress = spring({ 
                            frame: Math.max(0, adjustedFrame - bookDelay), 
                            fps, 
                            config: { damping: 18, stiffness: 100 } 
                          });
                          
                          const flipRotation = interpolate(bookProgress, [0, 1], [-90, 0]);
                          const bookOpacity = interpolate(bookProgress, [0, 0.3, 1], [0, 1, 1], { extrapolateRight: "clamp" });
                          const dropY = interpolate(bookProgress, [0, 1], [-20, 0]);
                          
                          const heightVariation = 0.9 + (Math.sin(bookIndex * 1.8 + shelfIndex) * 0.1);
                          const thisBookHeight = bookHeight * heightVariation;
                          
                          const isGradient = book.bg.includes("gradient");
                          
                          return (
                            <div key={bookIndex} style={{
                              width: bookWidth,
                              height: thisBookHeight,
                              opacity: bookOpacity,
                              transform: "rotateY(" + flipRotation + "deg) translateY(" + dropY + "px)",
                              transformOrigin: "left center",
                              transformStyle: "preserve-3d",
                              position: "relative",
                            }}>
                              <div style={{
                                width: "100%",
                                height: "100%",
                                background: isGradient ? book.bg : book.bg,
                                backgroundColor: isGradient ? undefined : book.bg,
                                borderRadius: "2px 4px 4px 2px",
                                boxShadow: "3px 3px 10px rgba(0,0,0,0.2), 1px 1px 3px rgba(0,0,0,0.1)",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                padding: 4,
                                paddingBottom: 8,
                                overflow: "hidden",
                              }}>
                                <div style={{
                                  position: "absolute",
                                  left: 0,
                                  top: 0,
                                  bottom: 0,
                                  width: 4,
                                  background: "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(255,255,255,0.1) 100%)",
                                }} />
                                
                                {book.hasArt && renderBookArt(book, bookWidth, thisBookHeight)}
                                
                                <div style={{
                                  color: book.titleColor,
                                  fontSize: finalPhoneWidth * 0.02,
                                  fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                                  fontWeight: 600,
                                  textAlign: "center",
                                  lineHeight: 1.15,
                                  whiteSpace: "pre-line",
                                  position: "relative",
                                  zIndex: 1,
                                  textShadow: book.titleColor === "#FFFFFF" ? "0 1px 2px rgba(0,0,0,0.4)" : "none",
                                  marginTop: "auto",
                                }}>
                                  {book.title}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: -contentPadding,
                        width: shelfBarWidth + "%",
                        height: shelfHeight * 0.14,
                        backgroundColor: shelf.color,
                        borderRadius: 3,
                        boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                      }}>
                        <div style={{
                          position: "absolute",
                          left: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
                          boxShadow: "inset 1px 1px 2px rgba(255,255,255,0.5), inset -1px -1px 2px rgba(0,0,0,0.3)",
                          opacity: interpolate(adjustedFrame, [shelf.delay + 35, shelf.delay + 45], [0, 1], { extrapolateRight: "clamp" }),
                        }} />
                        <div style={{
                          position: "absolute",
                          right: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: (props.accentColor ?? SCENE_PARAMS.accentColor.value),
                          boxShadow: "inset 1px 1px 2px rgba(255,255,255,0.5), inset -1px -1px 2px rgba(0,0,0,0.3)",
                          opacity: interpolate(adjustedFrame, [shelf.delay + 35, shelf.delay + 45], [0, 1], { extrapolateRight: "clamp" }),
                        }} />
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: finalPhoneHeight * 0.015,
              }}>
                <div style={{
                  backgroundColor: (props.phoneColor ?? SCENE_PARAMS.phoneColor.value),
                  color: "#FFFFFF",
                  padding: "12px 32px",
                  borderRadius: 30,
                  fontSize: finalPhoneWidth * 0.04,
                  fontFamily: (props.fontFamily ?? SCENE_PARAMS.fontFamily.value) + ", system-ui, sans-serif",
                  fontWeight: 600,
                  opacity: ctaProgress,
                  transform: "scale(" + ctaScale + ")",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                }}>
                  {(props.ctaText ?? SCENE_PARAMS.ctaText.value)}
                </div>
              </div>
            </div>
          </div>
          
          <div style={{
            height: finalPhoneHeight * 0.025,
            backgroundColor: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <div style={{
              width: finalPhoneWidth * 0.35,
              height: 4,
              backgroundColor: (props.phoneColor ?? SCENE_PARAMS.phoneColor.value),
              borderRadius: 10,
            }} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

export default Scene;
