import logoImage from "@/assets/logo.png";

export const Logo = () => {
  return (
    <div className="flex items-center animate-fade-up">
      <img 
        src={logoImage} 
        alt="Freight Calculator Logo" 
        className="h-14 md:h-16 w-auto"
      />
    </div>
  );
};
