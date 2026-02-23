import { useEffect, useRef, useState } from 'react';
import { estaciones, type Estacion } from '@/data/estaciones';
import { Compass, Heart, Crown, Sparkles, Brain, Zap, Shield, Scale, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  scale: Scale,
  heart: Heart,
  crown: Crown,
  sparkles: Sparkles,
  brain: Brain,
  compass: Compass,
  zap: Zap,
  shield: Shield,
  mandala: Compass,
};

interface EstacionesSectionProps {
  onStationClick?: (estacion: Estacion) => void;
}

export function EstacionesSection({ onStationClick }: EstacionesSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStation, setHoveredStation] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTríadaColor = (tríada: string) => {
    switch (tríada) {
      case 'mental': return 'from-[#1E3A5F] to-[#36454F]';
      case 'emocional': return 'from-[#C67B5C] to-[#6B4C7F]';
      case 'instintiva': return 'from-[#4A6FA5] to-[#0D0D0D]';
      default: return 'from-[#704214] to-[#C5B358]';
    }
  };

  const getTríadaLabel = (tríada: string) => {
    switch (tríada) {
      case 'mental': return '🧠 Mental';
      case 'emocional': return '❤️ Emocional';
      case 'instintiva': return '⚡ Instintiva';
      default: return '';
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="estaciones"
      className="section-padding bg-[#F5F5DC] relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, #70421410 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, #C5B35810 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div 
          className={`
            text-center mb-16 transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#704214] mb-4">
            Las 9 Estaciones del Ser
          </h2>
          <p className="text-lg text-[#5C4A3A] max-w-2xl mx-auto italic">
            "Cada una es una puerta. Todas conducen al mismo santuario: 
            el conocimiento de ti mismo."
          </p>
        </div>

        {/* Grid de estaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {estaciones.map((estacion, index) => {
            const Icon = iconMap[estacion.icono] || Compass;
            const isHovered = hoveredStation === estacion.id;

            return (
              <div
                key={estacion.id}
                className={`
                  estacion-card relative bg-white rounded-2xl overflow-hidden
                  cursor-pointer group
                  transition-all duration-500
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  boxShadow: isHovered 
                    ? `0 20px 40px ${estacion.colorPrimario}40` 
                    : '0 4px 20px rgba(0,0,0,0.08)'
                }}
                onMouseEnter={() => setHoveredStation(estacion.id)}
                onMouseLeave={() => setHoveredStation(null)}
                onClick={() => onStationClick?.(estacion)}
              >
                {/* Header con color */}
                <div 
                  className="h-24 relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${estacion.colorPrimario}, ${estacion.colorAcento})` 
                  }}
                >
                  {/* Patrón decorativo */}
                  <div className="absolute inset-0 opacity-20">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}
                    />
                  </div>

                  {/* Icono */}
                  <div className="absolute -bottom-8 left-6">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center
                                shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: estacion.colorTerciario }}
                    >
                      <Icon 
                        className="w-8 h-8" 
                        style={{ color: estacion.colorPrimario }}
                      />
                    </div>
                  </div>

                  {/* Número */}
                  <div className="absolute top-4 right-4">
                    <span 
                      className="text-4xl font-display font-bold opacity-30"
                      style={{ color: 'white' }}
                    >
                      {estacion.id}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="pt-12 pb-6 px-6">
                  <h3 
                    className="font-display text-xl font-bold mb-2 transition-colors"
                    style={{ color: estacion.colorPrimario }}
                  >
                    {estacion.nombre}
                  </h3>

                  <p className="text-sm text-gray-500 mb-3">
                    Para el alma del Tipo {estacion.eneatipo}
                  </p>

                  <p className="text-[#5C4A3A] text-sm italic mb-4">
                    "{estacion.esencia}"
                  </p>

                  {/* Badge de tríada */}
                  <div className="flex items-center justify-between">
                    <span 
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs text-white
                                bg-gradient-to-r ${getTríadaColor(estacion.tríada)}`}
                    >
                      {getTríadaLabel(estacion.tríada)}
                    </span>

                    <span 
                      className="flex items-center text-sm font-medium transition-all
                               opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                      style={{ color: estacion.colorPrimario }}
                    >
                      Explorar
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                />
              </div>
            );
          })}
        </div>

        {/* Leyenda de tríadas */}
        <div 
          className={`
            mt-12 flex flex-wrap justify-center gap-4
            transition-all duration-700 delay-500
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#36454F]"></span>
            <span className="text-sm text-[#5C4A3A]">Tríada Mental (5-6-7)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#C67B5C] to-[#6B4C7F]"></span>
            <span className="text-sm text-[#5C4A3A]">Tríada Emocional (2-3-4)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#4A6FA5] to-[#0D0D0D]"></span>
            <span className="text-sm text-[#5C4A3A]">Tríada Instintiva (8-9-1)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EstacionesSection;
