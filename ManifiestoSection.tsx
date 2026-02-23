import { useEffect, useRef, useState } from 'react';
import { Quote, Play, User } from 'lucide-react';

export function ManifiestoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Decoración */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23704214' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Video/Foto del creador */}
          <div 
            className={`
              relative transition-all duration-700
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
            `}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder para video/foto */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#704214] to-[#C5B358] flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-12 h-12" />
                  </div>
                  <p className="font-display text-lg">Tu Nombre</p>
                  <p className="text-sm opacity-80">Facilitador de Eneagrama</p>
                </div>
              </div>
              
              {/* Botón de play */}
              <button className="absolute inset-0 flex items-center justify-center group">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center
                              shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-[#704214] ml-1" fill="#704214" />
                </div>
              </button>
            </div>

            {/* Decoración */}
            <div 
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full -z-10"
              style={{ background: 'linear-gradient(135deg, #C5B35833, #70421433)' }}
            />
          </div>

          {/* Contenido del manifiesto */}
          <div 
            className={`
              transition-all duration-700 delay-200
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
            `}
          >
            <div className="flex items-center gap-3 mb-6">
              <Quote className="w-8 h-8 text-[#C5B358]" />
              <span className="text-sm font-medium text-[#704214] uppercase tracking-wider">
                Manifiesto
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#704214] mb-6 leading-tight">
              Esto No Es Un Test de Personalidad
            </h2>

            <blockquote className="relative pl-6 border-l-4 border-[#C5B358] mb-8">
              <p className="text-xl md:text-2xl text-[#5C4A3A] font-body italic leading-relaxed">
                "El Eneagrama no te pone en una caja. Te muestra la caja en la que ya vives... 
                y las puertas para salir de ella."
              </p>
            </blockquote>

            <p className="text-[#5C4A3A] mb-6 leading-relaxed">
              <strong className="text-[#704214]">Saber Consentido</strong> no es acumular información 
              sobre tu tipo. Es consentir el mapa completo: tus alas, tus flechas, tus tríadas, 
              tu camino de integración.
            </p>

            <p className="text-[#5C4A3A]/80 mb-8 leading-relaxed">
              Cada estación es una puerta. Todas conducen al mismo santuario: 
              el conocimiento de ti mismo. No hay un camino correcto, solo el camino 
              que elijas transitar con consciencia.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#704214]/10 flex items-center justify-center">
                <User className="w-6 h-6 text-[#704214]" />
              </div>
              <div>
                <p className="font-semibold text-[#704214]">Tu Nombre</p>
                <p className="text-sm text-[#5C4A3A]/70">Creador de Saber Consentido</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManifiestoSection;
