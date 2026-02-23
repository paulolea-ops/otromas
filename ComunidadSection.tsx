import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  ArrowRight,
  Quote,
  Facebook,
  MessageSquare
} from 'lucide-react';

const estadisticas = [
  { icon: Users, valor: '+500', label: 'miembros activos' },
  { icon: BookOpen, valor: '+50', label: 'recursos exclusivos' },
  { icon: Calendar, valor: '+20', label: 'eventos/año' },
];

const testimonios = [
  {
    id: 1,
    texto: "Encontré en esta comunidad un espacio donde finalmente pude hablar de mis patrones sin vergüenza. El mapa del Eneagrama me dio lenguaje para lo que sentía.",
    autor: "María G.",
    tipo: "Tipo 4",
    rol: "Miembro desde 2023"
  },
  {
    id: 2,
    texto: "Por primera vez pude ver mi perfeccionismo como aliado, no enemigo. El curso me dio herramientas para organizarme sin torturarme.",
    autor: "Ana P.",
    tipo: "Tipo 1",
    rol: "Coach"
  },
  {
    id: 3,
    texto: "El concepto de 'ritmo justo' cambió mi relación con el trabajo. Ahora produzco más y sufro menos.",
    autor: "Carlos M.",
    tipo: "Tipo 1",
    rol: "Emprendedor"
  }
];

const grupos = [
  { id: 1, nombre: 'Ritmo Justo', descripcion: 'Para quienes transitan la búsqueda de la perfección consciente' },
  { id: 2, nombre: 'Lazos del Alma', descripcion: 'Para quienes transitan la búsqueda del vínculo consciente' },
  { id: 3, nombre: 'Roles y Sinergia', descripcion: 'Para quienes transitan la búsqueda del éxito auténtico' },
];

export function ComunidadSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [testimonioActivo, setTestimonioActivo] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Rotar testimonios automáticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonioActivo((prev) => (prev + 1) % testimonios.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="comunidad"
      className="section-padding bg-[#F5F5DC] relative overflow-hidden"
    >
      {/* Decoración */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, #70421410 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div 
          className={`
            text-center mb-12 transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#704214] mb-4">
            Comunidad
          </h2>
          <p className="text-[#5C4A3A] max-w-2xl mx-auto italic">
            "El autoconocimiento no es un camino solitario. 
            Únete a quienes también buscan comprenderse."
          </p>
        </div>

        {/* Estadísticas */}
        <div 
          className={`
            grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-12
            transition-all duration-700 delay-200
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          {estadisticas.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 rounded-full bg-white 
                              shadow-md flex items-center justify-center">
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-[#704214]" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-[#704214]">{stat.valor}</p>
                <p className="text-xs md:text-sm text-[#5C4A3A]">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Testimonio destacado */}
        <Card 
          className={`
            mb-12 border-0 shadow-xl bg-white/80 backdrop-blur
            transition-all duration-700 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <CardContent className="p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <Quote className="w-12 h-12 text-[#C5B358]" />
            </div>
            
            <blockquote className="text-center mb-8">
              <p className="text-xl md:text-2xl text-[#5C4A3A] font-body italic leading-relaxed mb-6">
                "{testimonios[testimonioActivo].texto}"
              </p>
              <footer>
                <p className="font-semibold text-[#704214]">
                  {testimonios[testimonioActivo].autor}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonios[testimonioActivo].tipo} | {testimonios[testimonioActivo].rol}
                </p>
              </footer>
            </blockquote>

            {/* Indicadores */}
            <div className="flex justify-center gap-2">
              {testimonios.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonioActivo(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === testimonioActivo 
                      ? 'w-8 bg-[#704214]' 
                      : 'bg-[#704214]/30 hover:bg-[#704214]/50'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grupos por estación */}
        <div 
          className={`
            mb-12
            transition-all duration-700 delay-400
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <h3 className="font-display text-xl font-semibold text-[#704214] mb-6 text-center">
            Espacios de la Comunidad
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {grupos.map((grupo) => (
              <Card 
                key={grupo.id}
                className="border-0 shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-10 h-10 bg-[#704214]/10">
                      <AvatarFallback className="text-[#704214] font-bold">
                        {grupo.id}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-display font-semibold text-[#704214]">
                      {grupo.nombre}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {grupo.descripcion}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="p-0 h-auto text-[#704214] hover:text-[#8B4513] hover:bg-transparent"
                  >
                    Unirme
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div 
          className={`
            flex flex-col sm:flex-row gap-4 justify-center
            transition-all duration-700 delay-500
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <Button
            size="lg"
            className="bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-full px-8"
          >
            <Facebook className="w-5 h-5 mr-2" />
            Unirme al grupo de Facebook
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2]/10 rounded-full px-8"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Unirme al Discord
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ComunidadSection;
