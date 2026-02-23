import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Sparkles } from 'lucide-react';
import MandalaInteractivo from '@/components/mandala/MandalaInteractivo';
import { type Estacion } from '@/data/estaciones';

interface HeroSectionProps {
  onExploreStations?: () => void;
  onTakeTest?: () => void;
}

export function HeroSection({ onExploreStations, onTakeTest }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStationClick = (estacion: Estacion) => {
    console.log('Estación seleccionada:', estacion);
    // Aquí se navegaría a la página de la estación
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center
                 overflow-hidden gradient-hero"
    >
      {/* Decoración de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #704214 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C5B358 0%, transparent 70%)' }}
        />
        {/* Patrón de puntos */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#704214 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Contenido principal */}
      <div 
        className={`
          relative z-10 text-center px-4 max-w-5xl mx-auto
          transition-all duration-1000 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        {/* Badge superior */}
        <div 
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-full
            bg-[#704214]/10 text-[#704214] text-sm font-medium mb-6
            transition-all duration-700 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <Sparkles className="w-4 h-4" />
          <span>Ecosistema Integral de Autoconocimiento</span>
        </div>

        {/* Título principal */}
        <h1 
          className={`
            font-display text-4xl md:text-6xl lg:text-7xl font-bold
            text-[#704214] mb-4 leading-tight
            transition-all duration-700 delay-500
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          Eneagramas:
        </h1>
        <h2 
          className={`
            font-display text-3xl md:text-5xl lg:text-6xl font-semibold
            text-[#C5B358] mb-8
            transition-all duration-700 delay-600
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          Saber Consentido
        </h2>

        {/* Subtítulo */}
        <p 
          className={`
            text-lg md:text-xl text-[#5C4A3A] max-w-2xl mx-auto mb-4
            font-body italic
            transition-all duration-700 delay-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          Un ecosistema integral de autoconocimiento. 
        </p>
        <p 
          className={`
            text-base md:text-lg text-[#5C4A3A]/80 max-w-xl mx-auto mb-10
            transition-all duration-700 delay-800
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          9 caminos, 1 verdad: el mapa maestro que revela el 'por qué' detrás de todo.
        </p>

        {/* CTAs */}
        <div 
          className={`
            flex flex-col sm:flex-row gap-4 justify-center mb-16
            transition-all duration-700 delay-900
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <Button
            size="lg"
            onClick={onTakeTest}
            className="bg-[#704214] hover:bg-[#8B4513] text-white px-8 py-6 text-lg
                     rounded-full shadow-lg hover:shadow-xl transition-all
                     hover:scale-105"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Descubre tu punto de entrada
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onExploreStations}
            className="border-2 border-[#704214] text-[#704214] hover:bg-[#704214]/10
                     px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
          >
            Explora las 9 estaciones
          </Button>
        </div>
      </div>

      {/* Mandala interactivo */}
      <div 
        className={`
          relative z-10 w-full max-w-xl mx-auto px-4 mb-8
          transition-all duration-1000 delay-500
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
        `}
      >
        <MandalaInteractivo 
          size={400} 
          onStationClick={handleStationClick}
          showConnections={true}
        />
      </div>

      {/* Scroll indicator */}
      <div 
        className={`
          absolute bottom-8 left-1/2 transform -translate-x-1/2
          animate-bounce cursor-pointer
          transition-all duration-700 delay-1000
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onExploreStations}
      >
        <ChevronDown className="w-8 h-8 text-[#704214]/50" />
      </div>
    </section>
  );
}

export default HeroSection;
