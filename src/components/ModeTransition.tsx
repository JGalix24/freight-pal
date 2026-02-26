import { useEffect, useState } from "react";

type TransitionMode = "ship" | "plane" | "compare" | "multi";

interface ModeTransitionProps {
  mode: TransitionMode;
  onComplete: () => void;
}

const ShipAnimation = () => (
  <div className="relative w-80 h-60 md:w-[480px] md:h-[320px]">
    {/* Ocean waves */}
    <svg className="absolute bottom-0 left-0 w-full h-1/2" viewBox="0 0 480 160" fill="none">
      <path className="animate-wave-1" d="M-40 80 Q40 40 120 80 T280 80 T440 80 T520 80 V160 H-40Z" fill="hsl(217 91% 60% / 0.15)" />
      <path className="animate-wave-2" d="M-40 100 Q40 60 120 100 T280 100 T440 100 T520 100 V160 H-40Z" fill="hsl(217 91% 60% / 0.25)" />
      <path className="animate-wave-3" d="M-40 120 Q40 90 120 120 T280 120 T440 120 T520 120 V160 H-40Z" fill="hsl(217 91% 60% / 0.35)" />
    </svg>

    {/* Ship */}
    <svg className="absolute animate-ship-sail" style={{ bottom: "28%", left: "0%" }} width="120" height="100" viewBox="0 0 120 100" fill="none">
      {/* Hull */}
      <path d="M20 65 L35 85 L95 85 L105 65 Z" fill="hsl(220 20% 25%)" />
      <path d="M25 65 L38 80 L92 80 L100 65 Z" fill="hsl(220 15% 35%)" />
      {/* Cabin */}
      <rect x="45" y="48" width="30" height="17" rx="2" fill="hsl(220 15% 30%)" />
      <rect x="50" y="52" width="6" height="8" rx="1" fill="hsl(217 91% 60% / 0.5)" />
      <rect x="60" y="52" width="6" height="8" rx="1" fill="hsl(217 91% 60% / 0.5)" />
      {/* Mast */}
      <line x1="60" y1="12" x2="60" y2="48" stroke="hsl(220 15% 30%)" strokeWidth="2.5" />
      {/* Sail */}
      <path d="M62 15 L62 45 L90 40 Z" fill="hsl(0 0% 100% / 0.9)" />
      <path d="M58 15 L58 45 L38 42 Z" fill="hsl(0 0% 100% / 0.7)" />
      {/* Flag */}
      <path className="animate-flag" d="M60 12 L60 6 L72 9 Z" fill="hsl(0 84% 60%)" />
      {/* Smoke */}
      <circle className="animate-smoke-1" cx="48" cy="42" r="3" fill="hsl(220 10% 60% / 0.4)" />
      <circle className="animate-smoke-2" cx="45" cy="36" r="4" fill="hsl(220 10% 60% / 0.3)" />
      <circle className="animate-smoke-3" cx="42" cy="28" r="5" fill="hsl(220 10% 60% / 0.15)" />
    </svg>

    {/* Horizon line */}
    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="hsl(217 91% 60% / 0.1)" strokeWidth="1" className="absolute" />
  </div>
);

const PlaneAnimation = () => (
  <div className="relative w-80 h-60 md:w-[480px] md:h-[320px]">
    {/* Clouds */}
    <svg className="absolute top-[15%] animate-cloud-1" width="100" height="40" viewBox="0 0 100 40" fill="none" opacity="0.3">
      <ellipse cx="50" cy="25" rx="40" ry="12" fill="currentColor" />
      <ellipse cx="35" cy="18" rx="22" ry="10" fill="currentColor" />
      <ellipse cx="65" cy="20" rx="18" ry="8" fill="currentColor" />
    </svg>
    <svg className="absolute top-[35%] animate-cloud-2" width="80" height="35" viewBox="0 0 80 35" fill="none" opacity="0.2">
      <ellipse cx="40" cy="22" rx="35" ry="10" fill="currentColor" />
      <ellipse cx="28" cy="15" rx="18" ry="8" fill="currentColor" />
      <ellipse cx="55" cy="17" rx="15" ry="7" fill="currentColor" />
    </svg>
    <svg className="absolute top-[55%] animate-cloud-3" width="120" height="40" viewBox="0 0 120 40" fill="none" opacity="0.15">
      <ellipse cx="60" cy="25" rx="50" ry="12" fill="currentColor" />
      <ellipse cx="40" cy="18" rx="25" ry="10" fill="currentColor" />
      <ellipse cx="80" cy="20" rx="20" ry="8" fill="currentColor" />
    </svg>

    {/* Plane */}
    <svg className="absolute animate-plane-takeoff" width="140" height="60" viewBox="0 0 140 60" fill="none">
      {/* Fuselage */}
      <ellipse cx="70" cy="30" rx="55" ry="8" fill="hsl(220 15% 30%)" />
      <ellipse cx="70" cy="30" rx="55" ry="8" fill="hsl(220 15% 35%)" clipPath="inset(0 0 50% 0)" />
      {/* Nose */}
      <path d="M125 30 L140 28 L140 32 Z" fill="hsl(220 15% 25%)" />
      {/* Cockpit windows */}
      <path d="M120 26 Q125 24 130 26" stroke="hsl(217 91% 70%)" strokeWidth="2" fill="none" />
      {/* Wings */}
      <path d="M55 30 L40 8 L80 8 L75 30 Z" fill="hsl(220 15% 28%)" />
      <path d="M55 30 L40 52 L80 52 L75 30 Z" fill="hsl(220 15% 28%)" />
      {/* Tail */}
      <path d="M18 30 L8 12 L25 22 Z" fill="hsl(220 15% 28%)" />
      <path d="M15 30 L5 38 L22 34 Z" fill="hsl(220 15% 32%)" />
      {/* Engine */}
      <ellipse cx="60" cy="10" rx="8" ry="4" fill="hsl(220 15% 25%)" />
      <ellipse cx="60" cy="50" rx="8" ry="4" fill="hsl(220 15% 25%)" />
      {/* Windows */}
      {[85, 92, 99, 106, 113].map((x) => (
        <circle key={x} cx={x} cy="28" r="2" fill="hsl(217 91% 60% / 0.5)" />
      ))}
      {/* Trail */}
      <line className="animate-trail" x1="15" y1="30" x2="-40" y2="30" stroke="hsl(0 0% 100% / 0.3)" strokeWidth="2" strokeDasharray="4 6" />
    </svg>

    {/* Runway (appears at bottom, fades out) */}
    <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 animate-runway-fade">
      <svg width="200" height="20" viewBox="0 0 200 20" fill="none">
        <rect x="0" y="8" width="200" height="4" rx="2" fill="hsl(220 10% 40% / 0.3)" />
        {[20, 50, 80, 110, 140, 170].map((x) => (
          <rect key={x} x={x} y="9" width="12" height="2" fill="hsl(0 0% 100% / 0.5)" />
        ))}
      </svg>
    </div>
  </div>
);

const CompareAnimation = () => (
  <div className="relative w-80 h-60 md:w-[480px] md:h-[320px] flex items-center justify-center">
    <svg className="w-64 h-64 md:w-80 md:h-80" viewBox="0 0 200 200" fill="none">
      {/* Base / pillar */}
      <rect x="95" y="160" width="10" height="30" rx="2" fill="hsl(160 84% 39% / 0.6)" />
      <ellipse cx="100" cy="192" rx="30" ry="6" fill="hsl(160 84% 39% / 0.3)" />
      
      {/* Central pillar */}
      <rect x="97" y="50" width="6" height="110" fill="hsl(160 84% 39% / 0.5)" />
      
      {/* Beam (tilts then balances) */}
      <g className="animate-balance" style={{ transformOrigin: "100px 55px" }}>
        <rect x="25" y="53" width="150" height="4" rx="2" fill="hsl(160 84% 39% / 0.7)" />
        
        {/* Left chain */}
        <line x1="40" y1="57" x2="40" y2="90" stroke="hsl(160 84% 39% / 0.4)" strokeWidth="2" />
        <line x1="30" y1="57" x2="30" y2="85" stroke="hsl(160 84% 39% / 0.4)" strokeWidth="2" />
        
        {/* Left pan */}
        <path d="M15 90 Q40 100 65 90 L60 92 Q40 102 20 92 Z" fill="hsl(160 84% 39% / 0.5)" />
        <ellipse cx="40" cy="91" rx="25" ry="4" fill="hsl(160 84% 39% / 0.3)" />
        
        {/* Ship icon on left pan */}
        <g className="animate-fade-in-delayed">
          <path d="M30 82 L35 88 L45 88 L50 82 Z" fill="hsl(217 91% 60%)" />
          <line x1="40" y1="72" x2="40" y2="82" stroke="hsl(217 91% 60%)" strokeWidth="1.5" />
          <path d="M41 73 L41 80 L48 79 Z" fill="hsl(217 91% 60% / 0.6)" />
        </g>
        
        {/* Right chain */}
        <line x1="160" y1="57" x2="160" y2="90" stroke="hsl(160 84% 39% / 0.4)" strokeWidth="2" />
        <line x1="170" y1="57" x2="170" y2="85" stroke="hsl(160 84% 39% / 0.4)" strokeWidth="2" />
        
        {/* Right pan */}
        <path d="M135 90 Q160 100 185 90 L180 92 Q160 102 140 92 Z" fill="hsl(160 84% 39% / 0.5)" />
        <ellipse cx="160" cy="91" rx="25" ry="4" fill="hsl(160 84% 39% / 0.3)" />
        
        {/* Plane icon on right pan */}
        <g className="animate-fade-in-delayed-2">
          <ellipse cx="160" cy="82" rx="12" ry="3" fill="hsl(271 91% 65%)" />
          <path d="M150 82 L155 74 L165 74 L163 82 Z" fill="hsl(271 91% 65% / 0.7)" />
          <path d="M148 82 L145 78 L152 80 Z" fill="hsl(271 91% 65% / 0.7)" />
        </g>
      </g>
      
      {/* Pivot point */}
      <circle cx="100" cy="55" r="5" fill="hsl(160 84% 39% / 0.6)" />
      <circle cx="100" cy="55" r="3" fill="hsl(160 84% 39%)" />
    </svg>
  </div>
);

const MultiAnimation = () => (
  <div className="relative w-80 h-60 md:w-[480px] md:h-[320px] flex items-center justify-center">
    <svg className="w-72 h-72 md:w-80 md:h-80" viewBox="0 0 200 200" fill="none">
      {/* Conveyor belt */}
      <rect x="10" y="150" width="180" height="8" rx="4" fill="hsl(25 95% 53% / 0.2)" />
      <g className="animate-conveyor">
        {[20, 45, 70, 95, 120, 145, 170].map((x) => (
          <circle key={x} cx={x} cy="154" r="3" fill="hsl(25 95% 53% / 0.3)" />
        ))}
      </g>
      
      {/* Box 1 - Large */}
      <g className="animate-box-1">
        <rect x="30" y="110" width="35" height="38" rx="3" fill="hsl(25 95% 53% / 0.7)" />
        <rect x="30" y="110" width="35" height="38" rx="3" stroke="hsl(25 95% 53%)" strokeWidth="1.5" fill="none" />
        <line x1="37" y1="126" x2="58" y2="126" stroke="hsl(25 95% 53% / 0.4)" strokeWidth="1" />
        <line x1="37" y1="132" x2="52" y2="132" stroke="hsl(25 95% 53% / 0.4)" strokeWidth="1" />
        {/* Tape */}
        <line x1="47.5" y1="110" x2="47.5" y2="148" stroke="hsl(25 70% 40% / 0.5)" strokeWidth="2" />
      </g>
      
      {/* Box 2 - Medium */}
      <g className="animate-box-2">
        <rect x="80" y="120" width="28" height="28" rx="3" fill="hsl(21 90% 48% / 0.7)" />
        <rect x="80" y="120" width="28" height="28" rx="3" stroke="hsl(21 90% 48%)" strokeWidth="1.5" fill="none" />
        <line x1="86" y1="132" x2="102" y2="132" stroke="hsl(21 90% 48% / 0.4)" strokeWidth="1" />
        <line x1="94" y1="120" x2="94" y2="148" stroke="hsl(21 70% 38% / 0.5)" strokeWidth="2" />
      </g>
      
      {/* Box 3 - Small */}
      <g className="animate-box-3">
        <rect x="125" y="128" width="22" height="20" rx="3" fill="hsl(30 85% 55% / 0.7)" />
        <rect x="125" y="128" width="22" height="20" rx="3" stroke="hsl(30 85% 55%)" strokeWidth="1.5" fill="none" />
        <line x1="136" y1="128" x2="136" y2="148" stroke="hsl(30 65% 42% / 0.5)" strokeWidth="2" />
      </g>
      
      {/* Scanning beam */}
      <g className="animate-scan-beam">
        <line x1="100" y1="60" x2="100" y2="148" stroke="hsl(25 95% 53% / 0.6)" strokeWidth="1" strokeDasharray="3 3" />
        <rect x="85" y="50" width="30" height="14" rx="3" fill="hsl(25 95% 53% / 0.15)" stroke="hsl(25 95% 53% / 0.4)" strokeWidth="1" />
        {/* Scanner lens */}
        <circle cx="100" cy="57" r="3" fill="hsl(25 95% 53% / 0.8)" />
        <circle cx="100" cy="57" r="1.5" fill="hsl(0 0% 100% / 0.6)" />
      </g>
      
      {/* Weight indicators floating up */}
      <g className="animate-weight-tag-1">
        <rect x="35" y="90" width="26" height="14" rx="7" fill="hsl(25 95% 53% / 0.2)" stroke="hsl(25 95% 53% / 0.5)" strokeWidth="1" />
        <text x="48" y="100" textAnchor="middle" fontSize="7" fill="hsl(25 95% 53%)" fontWeight="600">12kg</text>
      </g>
      <g className="animate-weight-tag-2">
        <rect x="80" y="98" width="26" height="14" rx="7" fill="hsl(21 90% 48% / 0.2)" stroke="hsl(21 90% 48% / 0.5)" strokeWidth="1" />
        <text x="93" y="108" textAnchor="middle" fontSize="7" fill="hsl(21 90% 48%)" fontWeight="600">8kg</text>
      </g>
      <g className="animate-weight-tag-3">
        <rect x="122" y="106" width="26" height="14" rx="7" fill="hsl(30 85% 55% / 0.2)" stroke="hsl(30 85% 55% / 0.5)" strokeWidth="1" />
        <text x="135" y="116" textAnchor="middle" fontSize="7" fill="hsl(30 85% 55%)" fontWeight="600">3kg</text>
      </g>
    </svg>
  </div>
);

const modeConfig: Record<TransitionMode, { label: string; gradient: string }> = {
  ship: { label: "Maritime", gradient: "from-blue-600/20 via-blue-500/10 to-transparent" },
  plane: { label: "Aérien", gradient: "from-purple-600/20 via-purple-500/10 to-transparent" },
  compare: { label: "Comparaison", gradient: "from-emerald-600/20 via-emerald-500/10 to-transparent" },
  multi: { label: "Multi-colis", gradient: "from-amber-600/20 via-amber-500/10 to-transparent" },
};

const AnimationComponent: Record<TransitionMode, React.FC> = {
  ship: ShipAnimation,
  plane: PlaneAnimation,
  compare: CompareAnimation,
  multi: MultiAnimation,
};

export const ModeTransition = ({ mode, onComplete }: ModeTransitionProps) => {
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const config = modeConfig[mode];
  const Anim = AnimationComponent[mode];

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase("exit"), 2000);
    const completeTimer = setTimeout(onComplete, 2500);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gradient-background transition-opacity duration-500 ${
        phase === "exit" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-radial ${config.gradient} pointer-events-none`} />
      
      <div className={`relative transition-all duration-700 ${phase === "enter" ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}>
        <Anim />
      </div>

      {/* Loading dots */}
      <div className="mt-8 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-foreground/30 animate-pulse" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 rounded-full bg-foreground/30 animate-pulse" style={{ animationDelay: "200ms" }} />
        <div className="w-2 h-2 rounded-full bg-foreground/30 animate-pulse" style={{ animationDelay: "400ms" }} />
      </div>
    </div>
  );
};
