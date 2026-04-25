// Template: saas-security
// Description: No description available
// Scene: Scene 1

import { AbsoluteFill, spring, interpolate, useCurrentFrame, useVideoConfig, Img, Audio, Sequence, Loop, OffthreadVideo } from "remotion";
import React from "react";

const SCENE_PARAMS = {
  titleText: { type: "text", label: "Title", value: "Continuous Attack Surface Monitoring" },
  ctaLine1: { type: "text", label: "CTA Line 1", value: "Scan smarter." },
  ctaLine2: { type: "text", label: "CTA Line 2", value: "Fix faster." },
  fontFamily: { type: "font", label: "Font", value: "Inter" },
  backgroundColor: { type: "color", label: "Background", value: "#0a1628" },
  accentColor: { type: "color", label: "Accent", value: "#22d3ee" },
  secondaryAccent: { type: "color", label: "Secondary Accent", value: "#3b82f6" },
  textColor: { type: "color", label: "Text Color", value: "#ffffff" },
  cardColor: { type: "color", label: "Card Color", value: "#1e293b" },
  criticalColor: { type: "color", label: "Critical Badge", value: "#ef4444" },
  highColor: { type: "color", label: "High Badge", value: "#f97316" },
  mediumColor: { type: "color", label: "Medium Badge", value: "#eab308" },
  scale: { type: "number", label: "Scale", value: 1, min: 0.5, max: 2, step: 0.05 },
  animationSpeed: { type: "number", label: "Animation Speed", value: 1, min: 0.5, max: 2, step: 0.1 },
  glowIntensity: { type: "number", label: "Glow Intensity", value: 0.6, min: 0, max: 1, step: 0.1 },
  particleCount: { type: "number", label: "Particle Count", value: 12, min: 5, max: 25, step: 1 },
};

function Scene() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const minDim = Math.min(width, height);
  const speed = SCENE_PARAMS.animationSpeed.value;
  const adjustedFrame = frame * speed;
  const scaleValue = SCENE_PARAMS.scale.value;
  const isPortrait = height > width;
  
  // Phase timings (at 24fps, 12-15 seconds = 288-360 frames)
  const titleStart = 0;
  const titleEnd = 72;
  const dashboardStart = 48;
  const findingsStart = 96;
  const riskScoreStart = 144;
  const fixPanelStart = 192;
  const ctaStart = 264;
  
  // Title animation
  const titleProgress = spring({ frame: Math.max(0, adjustedFrame - titleStart), fps, config: { damping: 25, stiffness: 80 } });
  const titleFadeOut = interpolate(adjustedFrame, [titleEnd - 24, titleEnd], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const titleGlow = interpolate(adjustedFrame, [titleStart, titleStart + 30, titleStart + 60], [0, 1, 0.5], { extrapolateRight: "clamp" });
  
  // Dashboard entrance
  const dashboardProgress = spring({ frame: Math.max(0, adjustedFrame - dashboardStart), fps, config: { damping: 20, stiffness: 90 } });
  const dashboardY = interpolate(dashboardProgress, [0, 1], [60, 0]);
  
  // Scan progress
  const scanProgress = interpolate(adjustedFrame, [dashboardStart + 20, findingsStart + 48], [0, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  
  // Radar sweep angle
  const radarAngle = interpolate(adjustedFrame, [dashboardStart, findingsStart + 48], [0, 720], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  
  // Findings animation
  const findingsProgress = spring({ frame: Math.max(0, adjustedFrame - findingsStart), fps, config: { damping: 20, stiffness: 90 } });
  
  // Risk score animation
  const riskScoreValue = interpolate(adjustedFrame, [riskScoreStart, riskScoreStart + 60], [0, 73], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const riskScoreProgress = spring({ frame: Math.max(0, adjustedFrame - riskScoreStart), fps, config: { damping: 20, stiffness: 90 } });
  
  // Fix panel animation
  const fixPanelProgress = spring({ frame: Math.max(0, adjustedFrame - fixPanelStart), fps, config: { damping: 20, stiffness: 90 } });
  const fixPanelX = interpolate(fixPanelProgress, [0, 1], [80, 0]);
  
  // CTA animation
  const ctaProgress = spring({ frame: Math.max(0, adjustedFrame - ctaStart), fps, config: { damping: 22, stiffness: 85 } });
  const ctaLine2Progress = spring({ frame: Math.max(0, adjustedFrame - ctaStart - 12), fps, config: { damping: 22, stiffness: 85 } });
  
  // Dashboard fade out for CTA
  const dashboardFadeOut = interpolate(adjustedFrame, [ctaStart - 24, ctaStart + 12], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  
  // Floating particles
  const particles = [];
  for (let i = 0; i < SCENE_PARAMS.particleCount.value; i++) {
    const seed = i * 137.5;
    const baseX = ((seed * 7) % 100);
    const baseY = ((seed * 13) % 100);
    const floatOffset = Math.sin((adjustedFrame * 0.02) + seed) * 15;
    const floatOffsetX = Math.cos((adjustedFrame * 0.015) + seed * 2) * 10;
    const particleOpacity = interpolate(Math.sin((adjustedFrame * 0.03) + seed), [-1, 1], [0.1, 0.4]);
    const particleSize = 2 + (seed % 3);
    
    particles.push(
      React.createElement("div", {
        key: i,
        style: {
          position: "absolute",
          left: baseX + "%",
          top: baseY + "%",
          width: particleSize,
          height: particleSize,
          borderRadius: "50%",
          backgroundColor: SCENE_PARAMS.accentColor.value,
          opacity: particleOpacity,
          transform: "translate(" + floatOffsetX + "px, " + floatOffset + "px)",
          boxShadow: "0 0 " + (6 * SCENE_PARAMS.glowIntensity.value) + "px " + SCENE_PARAMS.accentColor.value,
        }
      })
    );
  }
  
  // Floating grid lines
  const gridLines = [];
  for (let i = 0; i < 6; i++) {
    const lineY = 15 + (i * 15);
    const lineOpacity = interpolate(Math.sin((adjustedFrame * 0.02) + i), [-1, 1], [0.02, 0.06]);
    gridLines.push(
      React.createElement("div", {
        key: "line-" + i,
        style: {
          position: "absolute",
          left: 0,
          top: lineY + "%",
          width: "100%",
          height: 1,
          background: "linear-gradient(90deg, transparent 0%, " + SCENE_PARAMS.accentColor.value + " 50%, transparent 100%)",
          opacity: lineOpacity,
        }
      })
    );
  }
  
  // Findings data
  const findings = [
    { severity: "Critical", color: SCENE_PARAMS.criticalColor.value, count: 3, delay: 0 },
    { severity: "High", color: SCENE_PARAMS.highColor.value, count: 12, delay: 8 },
    { severity: "Medium", color: SCENE_PARAMS.mediumColor.value, count: 27, delay: 16 },
  ];
  
  const cardWidth = isPortrait ? width * 0.85 : width * 0.55;
  const cardHeight = isPortrait ? height * 0.45 : height * 0.6;
  
  return React.createElement(AbsoluteFill, {
    style: {
      backgroundColor: SCENE_PARAMS.backgroundColor.value,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }
  },
    // Background gradient overlay
    React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at 30% 20%, rgba(34, 211, 238, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(59, 130, 246, 0.06) 0%, transparent 50%)",
      }
    }),
    
    // Grid lines
    gridLines,
    
    // Particles
    particles,
    
    // Main content wrapper
    React.createElement("div", {
      style: {
        transform: "scale(" + scaleValue + ")",
        transformOrigin: "center center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }
    },
      
      // Title section (visible at start)
      adjustedFrame < titleEnd + 24 && React.createElement("div", {
        style: {
          position: "absolute",
          textAlign: "center",
          opacity: titleProgress * titleFadeOut,
          transform: "translateY(" + interpolate(titleProgress, [0, 1], [30, 0]) + "px)",
        }
      },
        React.createElement("h1", {
          style: {
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
            fontSize: minDim * (isPortrait ? 0.055 : 0.07),
            fontWeight: 600,
            color: SCENE_PARAMS.textColor.value,
            margin: 0,
            letterSpacing: "-0.02em",
            textShadow: "0 0 " + (40 * titleGlow * SCENE_PARAMS.glowIntensity.value) + "px " + SCENE_PARAMS.accentColor.value + ", 0 0 " + (80 * titleGlow * SCENE_PARAMS.glowIntensity.value) + "px " + SCENE_PARAMS.accentColor.value,
          }
        }, SCENE_PARAMS.titleText.value)
      ),
      
      // Dashboard UI
      adjustedFrame >= dashboardStart && adjustedFrame < ctaStart + 36 && React.createElement("div", {
        style: {
          position: "relative",
          width: cardWidth,
          height: cardHeight,
          backgroundColor: SCENE_PARAMS.cardColor.value,
          borderRadius: minDim * 0.02,
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 " + (30 * SCENE_PARAMS.glowIntensity.value) + "px rgba(34, 211, 238, 0.1)",
          opacity: dashboardProgress * dashboardFadeOut,
          transform: "translateY(" + dashboardY + "px)",
          overflow: "hidden",
          padding: minDim * 0.025,
          display: "flex",
          flexDirection: isPortrait ? "column" : "row",
          gap: minDim * 0.02,
        }
      },
        // Left panel - Scan & Radar
        React.createElement("div", {
          style: {
            flex: isPortrait ? "none" : 1,
            display: "flex",
            flexDirection: "column",
            gap: minDim * 0.015,
          }
        },
          // Scan header
          React.createElement("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: minDim * 0.01,
              marginBottom: minDim * 0.01,
            }
          },
            React.createElement("div", {
              style: {
                width: minDim * 0.012,
                height: minDim * 0.012,
                borderRadius: "50%",
                backgroundColor: SCENE_PARAMS.accentColor.value,
                boxShadow: "0 0 10px " + SCENE_PARAMS.accentColor.value,
                animation: scanProgress < 100 ? "pulse 1s infinite" : "none",
                opacity: scanProgress < 100 ? interpolate(Math.sin(adjustedFrame * 0.2), [-1, 1], [0.5, 1]) : 1,
              }
            }),
            React.createElement("span", {
              style: {
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                fontSize: minDim * 0.018,
                fontWeight: 500,
                color: SCENE_PARAMS.textColor.value,
                opacity: 0.9,
              }
            }, scanProgress < 100 ? "Scanning..." : "Scan Complete")
          ),
          
          // Progress bar
          React.createElement("div", {
            style: {
              width: "100%",
              height: minDim * 0.008,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: minDim * 0.004,
              overflow: "hidden",
            }
          },
            React.createElement("div", {
              style: {
                width: scanProgress + "%",
                height: "100%",
                background: "linear-gradient(90deg, " + SCENE_PARAMS.secondaryAccent.value + ", " + SCENE_PARAMS.accentColor.value + ")",
                borderRadius: minDim * 0.004,
                boxShadow: "0 0 15px " + SCENE_PARAMS.accentColor.value,
              }
            })
          ),
          
          // Radar visual
          React.createElement("div", {
            style: {
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              minHeight: isPortrait ? minDim * 0.2 : "auto",
            }
          },
            React.createElement("div", {
              style: {
                width: minDim * (isPortrait ? 0.18 : 0.14),
                height: minDim * (isPortrait ? 0.18 : 0.14),
                borderRadius: "50%",
                border: "1px solid rgba(34, 211, 238, 0.3)",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
            },
              // Inner circles
              React.createElement("div", {
                style: {
                  position: "absolute",
                  width: "66%",
                  height: "66%",
                  borderRadius: "50%",
                  border: "1px solid rgba(34, 211, 238, 0.2)",
                }
              }),
              React.createElement("div", {
                style: {
                  position: "absolute",
                  width: "33%",
                  height: "33%",
                  borderRadius: "50%",
                  border: "1px solid rgba(34, 211, 238, 0.15)",
                }
              }),
              // Radar sweep
              React.createElement("div", {
                style: {
                  position: "absolute",
                  width: "50%",
                  height: 2,
                  background: "linear-gradient(90deg, " + SCENE_PARAMS.accentColor.value + ", transparent)",
                  transformOrigin: "left center",
                  transform: "rotate(" + radarAngle + "deg)",
                  left: "50%",
                  top: "50%",
                  marginTop: -1,
                  boxShadow: "0 0 10px " + SCENE_PARAMS.accentColor.value,
                }
              }),
              // Center dot
              React.createElement("div", {
                style: {
                  width: minDim * 0.01,
                  height: minDim * 0.01,
                  borderRadius: "50%",
                  backgroundColor: SCENE_PARAMS.accentColor.value,
                  boxShadow: "0 0 10px " + SCENE_PARAMS.accentColor.value,
                }
              })
            )
          )
        ),
        
        // Middle panel - Findings
        React.createElement("div", {
          style: {
            flex: isPortrait ? "none" : 1,
            display: "flex",
            flexDirection: "column",
            gap: minDim * 0.012,
            opacity: findingsProgress,
          }
        },
          React.createElement("span", {
            style: {
              fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
              fontSize: minDim * 0.016,
              fontWeight: 600,
              color: SCENE_PARAMS.textColor.value,
              opacity: 0.7,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }
          }, "Findings"),
          
          findings.map(function(finding, idx) {
            var itemProgress = spring({ 
              frame: Math.max(0, adjustedFrame - findingsStart - finding.delay), 
              fps: fps, 
              config: { damping: 20, stiffness: 90 } 
            });
            var countValue = Math.round(interpolate(adjustedFrame, [findingsStart + finding.delay, findingsStart + finding.delay + 30], [0, finding.count], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }));
            var pulseOpacity = interpolate(Math.sin(adjustedFrame * 0.15 + idx), [-1, 1], [0.7, 1]);
            
            return React.createElement("div", {
              key: idx,
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: minDim * 0.012,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderRadius: minDim * 0.008,
                border: "1px solid rgba(255, 255, 255, 0.05)",
                opacity: itemProgress,
                transform: "translateX(" + interpolate(itemProgress, [0, 1], [20, 0]) + "px)",
              }
            },
              React.createElement("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: minDim * 0.01,
                }
              },
                React.createElement("div", {
                  style: {
                    padding: minDim * 0.004 + "px " + minDim * 0.01 + "px",
                    backgroundColor: finding.color,
                    borderRadius: minDim * 0.004,
                    boxShadow: "0 0 " + (10 * SCENE_PARAMS.glowIntensity.value * pulseOpacity) + "px " + finding.color,
                  }
                },
                  React.createElement("span", {
                    style: {
                      fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                      fontSize: minDim * 0.013,
                      fontWeight: 600,
                      color: "#fff",
                    }
                  }, finding.severity)
                )
              ),
              React.createElement("span", {
                style: {
                  fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                  fontSize: minDim * 0.02,
                  fontWeight: 700,
                  color: SCENE_PARAMS.textColor.value,
                }
              }, countValue)
            );
          })
        ),
        
        // Right panel - Risk Score & Fix Guidance
        React.createElement("div", {
          style: {
            flex: isPortrait ? "none" : 1,
            display: "flex",
            flexDirection: "column",
            gap: minDim * 0.015,
          }
        },
          // Risk Score Widget
          React.createElement("div", {
            style: {
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderRadius: minDim * 0.01,
              padding: minDim * 0.015,
              border: "1px solid rgba(255, 255, 255, 0.05)",
              opacity: riskScoreProgress,
              transform: "translateY(" + interpolate(riskScoreProgress, [0, 1], [15, 0]) + "px)",
            }
          },
            React.createElement("span", {
              style: {
                fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                fontSize: minDim * 0.014,
                fontWeight: 500,
                color: SCENE_PARAMS.textColor.value,
                opacity: 0.6,
              }
            }, "Risk Score"),
            React.createElement("div", {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: minDim * 0.005,
                marginTop: minDim * 0.008,
              }
            },
              React.createElement("span", {
                style: {
                  fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                  fontSize: minDim * 0.04,
                  fontWeight: 700,
                  color: SCENE_PARAMS.accentColor.value,
                  textShadow: "0 0 20px " + SCENE_PARAMS.accentColor.value,
                }
              }, Math.round(riskScoreValue)),
              React.createElement("span", {
                style: {
                  fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                  fontSize: minDim * 0.016,
                  fontWeight: 500,
                  color: SCENE_PARAMS.textColor.value,
                  opacity: 0.5,
                }
              }, "/ 100")
            ),
            // Score bar
            React.createElement("div", {
              style: {
                width: "100%",
                height: minDim * 0.006,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: minDim * 0.003,
                marginTop: minDim * 0.01,
                overflow: "hidden",
              }
            },
              React.createElement("div", {
                style: {
                  width: riskScoreValue + "%",
                  height: "100%",
                  background: "linear-gradient(90deg, " + SCENE_PARAMS.accentColor.value + ", " + SCENE_PARAMS.highColor.value + ")",
                  borderRadius: minDim * 0.003,
                }
              })
            )
          ),
          
          // Fix Guidance Panel
          React.createElement("div", {
            style: {
              backgroundColor: "rgba(34, 211, 238, 0.05)",
              borderRadius: minDim * 0.01,
              padding: minDim * 0.015,
              border: "1px solid rgba(34, 211, 238, 0.15)",
              opacity: fixPanelProgress,
              transform: "translateX(" + fixPanelX + "px)",
            }
          },
            React.createElement("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: minDim * 0.008,
                marginBottom: minDim * 0.012,
              }
            },
              React.createElement("div", {
                style: {
                  width: minDim * 0.02,
                  height: minDim * 0.02,
                  borderRadius: minDim * 0.005,
                  backgroundColor: "rgba(34, 211, 238, 0.2)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }
              },
                React.createElement("span", {
                  style: { fontSize: minDim * 0.012 }
                }, "🔧")
              ),
              React.createElement("span", {
                style: {
                  fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                  fontSize: minDim * 0.015,
                  fontWeight: 600,
                  color: SCENE_PARAMS.accentColor.value,
                }
              }, "Fix Guidance")
            ),
            React.createElement("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: minDim * 0.008,
              }
            },
              React.createElement("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: minDim * 0.006,
                  opacity: spring({ frame: Math.max(0, adjustedFrame - fixPanelStart - 8), fps: fps, config: { damping: 20, stiffness: 90 } }),
                }
              },
                React.createElement("span", {
                  style: {
                    color: "#22c55e",
                    fontSize: minDim * 0.014,
                  }
                }, "✓"),
                React.createElement("span", {
                  style: {
                    fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                    fontSize: minDim * 0.013,
                    color: SCENE_PARAMS.textColor.value,
                    opacity: 0.8,
                  }
                }, "Patch available")
              ),
              React.createElement("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: minDim * 0.006,
                  opacity: spring({ frame: Math.max(0, adjustedFrame - fixPanelStart - 16), fps: fps, config: { damping: 20, stiffness: 90 } }),
                }
              },
                React.createElement("span", {
                  style: {
                    color: "#22c55e",
                    fontSize: minDim * 0.014,
                  }
                }, "✓"),
                React.createElement("span", {
                  style: {
                    fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
                    fontSize: minDim * 0.013,
                    color: SCENE_PARAMS.textColor.value,
                    opacity: 0.8,
                  }
                }, "Auto-remediation ready")
              )
            )
          )
        )
      ),
      
      // CTA Section
      adjustedFrame >= ctaStart - 12 && React.createElement("div", {
        style: {
          position: "absolute",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: minDim * 0.02,
        }
      },
        React.createElement("h2", {
          style: {
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
            fontSize: minDim * (isPortrait ? 0.065 : 0.08),
            fontWeight: 700,
            color: SCENE_PARAMS.textColor.value,
            margin: 0,
            opacity: ctaProgress,
            transform: "translateY(" + interpolate(ctaProgress, [0, 1], [25, 0]) + "px)",
          }
        }, SCENE_PARAMS.ctaLine1.value),
        React.createElement("h2", {
          style: {
            fontFamily: SCENE_PARAMS.fontFamily.value + ", system-ui, sans-serif",
            fontSize: minDim * (isPortrait ? 0.065 : 0.08),
            fontWeight: 700,
            color: SCENE_PARAMS.accentColor.value,
            margin: 0,
            opacity: ctaLine2Progress,
            transform: "translateY(" + interpolate(ctaLine2Progress, [0, 1], [25, 0]) + "px)",
            textShadow: "0 0 30px " + SCENE_PARAMS.accentColor.value + ", 0 0 60px " + SCENE_PARAMS.accentColor.value,
          }
        }, SCENE_PARAMS.ctaLine2.value)
      )
    )
  );
}

export default Scene;
