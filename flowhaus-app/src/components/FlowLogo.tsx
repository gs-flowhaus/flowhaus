const appleFont =
  "-apple-system, 'SF Pro Display', BlinkMacSystemFont, 'Helvetica Neue', sans-serif";

export function FlowLogo({ size = 46, color = "#0d0d0d" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="240 254 196 172" xmlns="http://www.w3.org/2000/svg">
      <circle cx="270" cy="340" r="26" fill={color} />
      <path d="M296 340 L330 340 Q370 340 370 305 L370 285 Q370 270 385 270 L420 270" fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M296 340 L330 340 Q370 340 370 375 L370 395 Q370 410 385 410 L420 410" fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="420" cy="270" r="13" fill={color} />
      <circle cx="420" cy="410" r="13" fill={color} />
    </svg>
  );
}
