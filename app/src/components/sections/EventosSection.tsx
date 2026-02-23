import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Users, 
  ArrowRight,
  Video,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Evento {
  id: number;
  titulo: string;
  estacion: number;
  fecha: string;
  hora: string;
  duracion: string;
  modalidad: 'online' | 'presencial';
  plazas: number;
  precio: string;
  destacado?: boolean;
}

const eventos: Evento[] = [
  {
    id: 1,
    titulo: "El Centro de Mando: Taller de toma de decisiones conscientes",
    estacion: 6,
    fecha: "15 de Marzo, 2024",
    hora: "19:00 hs (GMT-3)",
    duracion: "2 horas",
    modalidad: 'online',
    plazas: 20,
    precio: "$30 USD",
    destacado: true
  },
  {
    id: 2,
    titulo: "Roles y Sinergia: Éxito con rostro auténtico",
    estacion: 3,
    fecha: "22 de Marzo, 2024",
    hora: "19:00 hs (GMT-3)",
    duracion: "2 horas",
    modalidad: 'online',
    plazas: 25,
    precio: "$30 USD"
  },
  {
    id: 3,
    titulo: "Conciencia Energética: La ecología del entusiasmo",
    estacion: 7,
    fecha: "29 de Marzo, 2024",
    hora: "19:00 hs (GMT-3)",
    duracion: "2 horas",
    modalidad: 'online',
    plazas: 20,
    precio: "$30 USD"
  },
  {
    id: 4,
    titulo: "Lazos del Alma: Sanando el amor",
    estacion: 2,
    fecha: "05 de Abril, 2024",
    hora: "19:00 hs (GMT-3)",
    duracion: "2 horas",
    modalidad: 'online',
    plazas: 25,
    precio: "$30 USD"
  }
];

const estacionColors: Record<number, { bg: string; text: string }> = {
  1: { bg: 'bg-[#4A6FA5]', text: 'text-[#4A6FA5]' },
  2: { bg: 'bg-[#C67B5C]', text: 'text-[#C67B5C]' },
  3: { bg: 'bg-[#2D8A6E]', text: 'text-[#2D8A6E]' },
  4: { bg: 'bg-[#6B4C7F]', text: 'text-[#6B4C7F]' },
  5: { bg: 'bg-[#1E3A5F]', text: 'text-[#1E3A5F]' },
  6: { bg: 'bg-[#36454F]', text: 'text-[#36454F]' },
  7: { bg: 'bg-[#FF00FF]', text: 'text-[#FF00FF]' },
  8: { bg: 'bg-[#0D0D0D]', text: 'text-[#0D0D0D]' },
  9: { bg: 'bg-[#704214]', text: 'text-[#704214]' },
};

const estacionNames: Record<number, string> = {
  1: 'El Ritmo Justo',
  2: 'Lazos del Alma',
  3: 'Roles y Sinergia',
  4: 'Devida Elección',
  5: 'Patrones Invisibles',
  6: 'El Centro de Mando',
  7: 'Conciencia Energética',
  8: 'El Hábito',
  9: 'Saber Consentido',
};

export function EventosSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  const eventoDestacado = eventos.find(e => e.destacado);
  const otrosEventos = eventos.filter(e => !e.destacado);

  return (
    <section 
      ref={sectionRef}
      id="eventos"
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div 
          className={`
            flex flex-col md:flex-row md:items-end md:justify-between mb-12
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#704214] mb-4">
              Próximos Eventos
            </h2>
            <p className="text-[#5C4A3A] max-w-xl">
              Talleres mensuales en vivo para explorar cada estación del sistema. 
              Aprende, comparte y crece en comunidad.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-sm text-gray-500">Marzo 2024</span>
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Evento destacado */}
        {eventoDestacado && (
          <Card 
            className={`
              mb-8 overflow-hidden border-0 shadow-xl
              transition-all duration-700 delay-200
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                {/* Imagen/Color */}
                <div 
                  className={`h-64 md:h-auto ${estacionColors[eventoDestacado.estacion].bg} 
                            relative overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-20">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: `radial-gradient(circle, white 2px, transparent 2px)`,
                        backgroundSize: '30px 30px'
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <span className="text-6xl font-display font-bold opacity-30">
                        {eventoDestacado.estacion}
                      </span>
                      <p className="text-lg font-display mt-2">
                        {estacionNames[eventoDestacado.estacion]}
                      </p>
                    </div>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-white/20 text-white border-0">
                    Evento del mes
                  </Badge>
                </div>

                {/* Contenido */}
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {eventoDestacado.fecha}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {eventoDestacado.hora}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#704214] mb-4">
                    {eventoDestacado.titulo}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Video className="w-4 h-4" />
                      <span>Online en vivo (Zoom)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Duración: {eventoDestacado.duracion}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{eventoDestacado.plazas} plazas disponibles</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#704214]">
                      {eventoDestacado.precio}
                    </span>
                    <Button 
                      className="bg-[#704214] hover:bg-[#8B4513] text-white rounded-full"
                    >
                      Reservar plaza
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Otros eventos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otrosEventos.map((evento, index) => (
            <Card 
              key={evento.id}
              className={`
                overflow-hidden border-0 shadow-md hover:shadow-lg
                transition-all duration-300 hover:-translate-y-1
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              `}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <CardContent className="p-0">
                {/* Color header */}
                <div 
                  className={`h-2 ${estacionColors[evento.estacion].bg}`}
                />
                
                <div className="p-6">
                  {/* Fecha */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{evento.fecha}</span>
                  </div>

                  {/* Título */}
                  <h4 className="font-display text-lg font-semibold text-[#704214] mb-3 line-clamp-2">
                    {evento.titulo}
                  </h4>

                  {/* Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {evento.hora}
                    </span>
                    <span className="flex items-center gap-1">
                      <Video className="w-4 h-4" />
                      Online
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#704214]">
                      {evento.precio}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-[#704214] hover:text-[#8B4513] hover:bg-[#704214]/10"
                    >
                      Ver más
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ver calendario */}
        <div 
          className={`
            text-center mt-10
            transition-all duration-700 delay-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <Button 
            variant="outline"
            className="rounded-full border-[#704214] text-[#704214] hover:bg-[#704214]/10"
          >
            Ver calendario completo
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default EventosSection;
