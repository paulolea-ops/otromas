import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  FileText, 
  Video, 
  Headphones, 
  BookOpen, 
  ArrowRight,
  Filter
} from 'lucide-react';

interface Recurso {
  id: number;
  titulo: string;
  tipo: 'pdf' | 'video' | 'audio' | 'articulo';
  estacion: number;
  descripcion: string;
  etiquetas: string[];
}

const recursos: Recurso[] = [
  {
    id: 1,
    titulo: "5 señales de que tu perfeccionismo te sabotea",
    tipo: 'pdf',
    estacion: 1,
    descripcion: "Guía para reconocer cuando la búsqueda de perfección se convierte en obstáculo.",
    etiquetas: ['perfeccionismo', 'autoconocimiento', 'tipo1']
  },
  {
    id: 2,
    titulo: "El arte de la organización consciente",
    tipo: 'video',
    estacion: 1,
    descripcion: "Aprende a organizarte desde la fluidez, no desde la rigidez.",
    etiquetas: ['organización', 'productividad', 'tipo1']
  },
  {
    id: 3,
    titulo: "¿Das demasiado? El test del agotamiento empático",
    tipo: 'articulo',
    estacion: 2,
    descripcion: "Descubre si estás dando más de lo que recibes en tus relaciones.",
    etiquetas: ['límites', 'relaciones', 'tipo2']
  },
  {
    id: 4,
    titulo: "Meditación: Soltar el control",
    tipo: 'audio',
    estacion: 1,
    descripcion: "Una meditación guiada para liberar la tensión del control.",
    etiquetas: ['meditación', 'relajación', 'tipo1']
  },
  {
    id: 5,
    titulo: "Éxito vs. Realización: El diagnóstico",
    tipo: 'pdf',
    estacion: 3,
    descripcion: "Descubre si estás persiguiendo éxito o realizando tu propósito.",
    etiquetas: ['éxito', 'propósito', 'tipo3']
  },
  {
    id: 6,
    titulo: "Encontrar tu voz única",
    tipo: 'video',
    estacion: 4,
    descripcion: "Ejercicios prácticos para descubrir y expresar tu autenticidad.",
    etiquetas: ['autenticidad', 'creatividad', 'tipo4']
  }
];

const tipoIcons: Record<string, React.ElementType> = {
  pdf: FileText,
  video: Video,
  audio: Headphones,
  articulo: BookOpen,
};

const tipoLabels: Record<string, string> = {
  pdf: 'PDF',
  video: 'Video',
  audio: 'Audio',
  articulo: 'Artículo',
};

const estacionColors: Record<number, string> = {
  1: '#4A6FA5',
  2: '#C67B5C',
  3: '#2D8A6E',
  4: '#6B4C7F',
  5: '#1E3A5F',
  6: '#36454F',
  7: '#FF00FF',
  8: '#0D0D0D',
  9: '#704214',
};

export function RecursosSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string | null>(null);
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

  const recursosFiltrados = recursos.filter(recurso => {
    const matchBusqueda = recurso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                         recurso.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const matchTipo = !filtroTipo || recurso.tipo === filtroTipo;
    return matchBusqueda && matchTipo;
  });

  return (
    <section 
      ref={sectionRef}
      id="recursos"
      className="section-padding bg-[#F5F5DC] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div 
          className={`
            text-center mb-12 transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#704214] mb-4">
            Recursos Gratuitos
          </h2>
          <p className="text-[#5C4A3A] max-w-2xl mx-auto">
            Materiales seleccionados para acompañarte en tu viaje de autoconocimiento. 
            Filtra por estación, formato o tema.
          </p>
        </div>

        {/* Búsqueda y filtros */}
        <div 
          className={`
            mb-8 transition-all duration-700 delay-200
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar recursos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-12 rounded-full bg-white"
              />
            </div>
            <Button variant="outline" className="rounded-full">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
          </div>

          {/* Filtros de tipo */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFiltroTipo(null)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                !filtroTipo 
                  ? 'bg-[#704214] text-white' 
                  : 'bg-white text-[#5C4A3A] hover:bg-[#704214]/10'
              }`}
            >
              Todos
            </button>
            {Object.entries(tipoLabels).map(([tipo, label]) => {
              const Icon = tipoIcons[tipo];
              return (
                <button
                  key={tipo}
                  onClick={() => setFiltroTipo(filtroTipo === tipo ? null : tipo)}
                  className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all ${
                    filtroTipo === tipo 
                      ? 'bg-[#704214] text-white' 
                      : 'bg-white text-[#5C4A3A] hover:bg-[#704214]/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid de recursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recursosFiltrados.map((recurso, index) => {
            const Icon = tipoIcons[recurso.tipo];
            return (
              <Card 
                key={recurso.id}
                className={`
                  group cursor-pointer overflow-hidden border-0 shadow-md
                  hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                `}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <CardContent className="p-0">
                  {/* Header con tipo */}
                  <div 
                    className="h-2"
                    style={{ backgroundColor: estacionColors[recurso.estacion] }}
                  />
                  
                  <div className="p-6">
                    {/* Badge de tipo */}
                    <div className="flex items-center justify-between mb-4">
                      <Badge 
                        variant="secondary" 
                        className="flex items-center gap-1"
                      >
                        <Icon className="w-3 h-3" />
                        {tipoLabels[recurso.tipo]}
                      </Badge>
                      <Badge 
                        style={{ 
                          backgroundColor: `${estacionColors[recurso.estacion]}20`,
                          color: estacionColors[recurso.estacion]
                        }}
                      >
                        Estación {recurso.estacion}
                      </Badge>
                    </div>

                    {/* Contenido */}
                    <h3 className="font-display text-lg font-semibold text-[#704214] mb-2 
                                 group-hover:text-[#8B4513] transition-colors">
                      {recurso.titulo}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {recurso.descripcion}
                    </p>

                    {/* Etiquetas */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {recurso.etiquetas.map((etiqueta, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                        >
                          #{etiqueta}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="p-0 h-auto text-[#704214] hover:text-[#8B4513] 
                               hover:bg-transparent group/btn"
                    >
                      {recurso.tipo === 'pdf' ? 'Descargar PDF' : 
                       recurso.tipo === 'audio' ? 'Escuchar' : 'Ver contenido'}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Ver más */}
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
            Ver todos los recursos
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default RecursosSection;
