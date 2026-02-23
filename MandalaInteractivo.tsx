import { useState, useRef, useEffect } from 'react';
import { estaciones, type Estacion } from '@/data/estaciones';
import { Compass, Heart, Crown, Sparkles, Brain, Zap, Shield, Scale } from 'lucide-react';

interface MandalaInteractivoProps {
  onStationClick?: (estacion: Estacion) => void;
  size?: number;
  showConnections?: boolean;
}

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

export function MandalaInteractivo({ 
  onStationClick, 
  size = 500, 
  showConnections = true 
}: MandalaInteractivoProps) {
  const [hoveredStation, setHoveredStation] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Posiciones de las estaciones en el círculo
  // Orden del Eneagrama: 9(arriba), 8, 1, 2, 3, 4, 5, 6, 7
  const getPosition = (index: number, total: number, radius: number) => {
    // El 9 va arriba (270 grados o -90)
    const startAngle = -Math.PI / 2;
    const angle = startAngle + (index * 2 * Math.PI) / total;
    return {
      x: Math.cos(angle) * radius + 50,
      y: Math.sin(angle) * radius + 50,
    };
  };

  // Orden específico del Eneagrama empezando desde arriba (9)
  const enneagramOrder = [9, 8, 1, 2, 3, 4, 5, 6, 7];
  const orderedEstaciones = enneagramOrder.map(id => estaciones.find(e => e.id === id)!);

  const radius = 35; // % del contenedor

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative mx-auto"
      style={{ width: size, height: size }}
    >
      {/* Círculo exterior */}
      <div 
        className="absolute inset-0 rounded-full border-2 border-dashed opacity-30"
        style={{ 
          borderColor: '#704214',
          animation: isAnimating ? 'rotate-slow 60s linear infinite' : 'none'
        }}
      />
      
      {/* Líneas de conexión (triángulo interno) */}
      {showConnections && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {/* Triángulo 3-6-9 */}
          <polygon 
            points={`${getPosition(4, 9, radius).x}%,${getPosition(4, 9, radius).y}% ${getPosition(7, 9, radius).x}%,${getPosition(7, 9, radius).y}% ${getPosition(0, 9, radius).x}%,${getPosition(0, 9, radius).y}%`}
            fill="none"
            stroke="#C5B358"
            strokeWidth="2"
            opacity="0.5"
            style={{ 
              filter: 'drop-shadow(0 0 5px rgba(197, 179, 88, 0.5))'
            }}
          />
          {/* Hexágono */}
          <polygon 
            points={`${getPosition(1, 9, radius).x}%,${getPosition(1, 9, radius).y}% ${getPosition(2, 9, radius).x}%,${getPosition(2, 9, radius).y}% ${getPosition(3, 9, radius).x}%,${getPosition(3, 9, radius).y}% ${getPosition(5, 9, radius).x}%,${getPosition(5, 9, radius).y}% ${getPosition(6, 9, radius).x}%,${getPosition(6, 9, radius).y}% ${getPosition(8, 9, radius).x}%,${getPosition(8, 9, radius).y}%`}
            fill="none"
            stroke="#704214"
            strokeWidth="2"
            opacity="0.3"
          />
        </svg>
      )}

      {/* Estaciones */}
      {orderedEstaciones.map((estacion, index) => {
        const pos = getPosition(index, 9, radius);
        const Icon = iconMap[estacion.icono] || Compass;
        const isHovered = hoveredStation === estacion.id;
        const isCenter = estacion.id === 9;

        return (
          <div
            key={estacion.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              zIndex: isHovered ? 20 : 10,
            }}
            onMouseEnter={() => setHoveredStation(estacion.id)}
            onMouseLeave={() => setHoveredStation(null)}
            onClick={() => onStationClick?.(estacion)}
          >
            <div
              className={`
                relative flex flex-col items-center justify-center
                transition-all duration-300 ease-out
                ${isHovered ? 'scale-125' : 'scale-100'}
              `}
            >
              {/* Círculo de la estación */}
              <div
                className={`
                  w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center
                  shadow-lg transition-all duration-300
                  ${isCenter ? 'ring-4 ring-[#C5B358] ring-opacity-50' : ''}
                `}
                style={{
                  background: `linear-gradient(135deg, ${estacion.colorPrimario}, ${estacion.colorAcento})`,
                  boxShadow: isHovered 
                    ? `0 0 30px ${estacion.colorPrimario}80` 
                    : `0 4px 15px ${estacion.colorPrimario}40`,
                }}
              >
                <Icon 
                  className={`text-white ${isCenter ? 'w-8 h-8' : 'w-6 h-6'}`} 
                  strokeWidth={1.5}
                />
              </div>

              {/* Número */}
              <span 
                className={`
                  absolute -top-2 -right-2 w-6 h-6 rounded-full 
                  flex items-center justify-center text-xs font-bold text-white
                  shadow-md
                `}
                style={{ backgroundColor: estacion.colorAcento }}
              >
                {estacion.id}
              </span>

              {/* Tooltip con información */}
              {isHovered && (
                <div 
                  className="absolute top-full mt-3 px-4 py-2 rounded-lg shadow-xl
                           bg-white text-center whitespace-nowrap z-30
                           animate-fade-in-up"
                  style={{ minWidth: '180px' }}
                >
                  <p className="font-display font-semibold text-sm" style={{ color: estacion.colorPrimario }}>
                    {estacion.nombre}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 italic">
                    {estacion.esencia}
                  </p>
                  <div 
                    className="mt-2 inline-block px-2 py-0.5 rounded-full text-xs text-white"
                    style={{ 
                      backgroundColor: estacion.tríada === 'mental' ? '#1E3A5F' : 
                                      estacion.tríada === 'emocional' ? '#C67B5C' : '#4A6FA5'
                    }}
                  >
                    Tríada {estacion.tríada}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Centro del mandala */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                   w-24 h-24 rounded-full flex items-center justify-center
                   bg-gradient-to-br from-[#704214] to-[#C5B358]
                   shadow-2xl z-20"
        style={{
          boxShadow: '0 0 40px rgba(112, 66, 20, 0.4)'
        }}
      >
        <div className="text-center text-white">
          <Compass className="w-8 h-8 mx-auto mb-1" />
          <span className="text-xs font-display font-semibold">SABER</span>
        </div>
      </div>
    </div>
  );
}

export default MandalaInteractivo;
