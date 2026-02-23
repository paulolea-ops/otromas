import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles, Mail, RotateCcw } from 'lucide-react';
import { estaciones, type Estacion } from '@/data/estaciones';

interface Pregunta {
  id: number;
  texto: string;
  opciones: { texto: string; estaciones: number[] }[];
}

const preguntas: Pregunta[] = [
  {
    id: 1,
    texto: "¿Qué área de tu vida te genera más fricción actualmente?",
    opciones: [
      { texto: "Mi relación con el tiempo y la organización", estaciones: [1] },
      { texto: "Mis relaciones personales y vínculos", estaciones: [2] },
      { texto: "Mi carrera y reconocimiento profesional", estaciones: [3] },
      { texto: "Mi sentido de propósito e identidad", estaciones: [4] },
      { texto: "Mi necesidad de entender cómo funciono", estaciones: [5] },
      { texto: "Mi capacidad de tomar decisiones", estaciones: [6] },
      { texto: "Mi relación con el placer y la moderación", estaciones: [7] },
      { texto: "Mi forma de usar el poder y la autoridad", estaciones: [8] },
      { texto: "Mi conexión con el todo y la paz interior", estaciones: [9] },
    ]
  },
  {
    id: 2,
    texto: "¿Cuál de estas frases resuena más contigo?",
    opciones: [
      { texto: "Siento que nada está lo suficientemente bien", estaciones: [1] },
      { texto: "A veces doy demasiado y me olvido de mí", estaciones: [2] },
      { texto: "Me preocupa lo que otros piensen de mí", estaciones: [3] },
      { texto: "Siento que algo me falta, que otros tienen algo que yo no", estaciones: [4] },
      { texto: "Necesito tiempo solo para procesar las cosas", estaciones: [5] },
      { texto: "La duda me paraliza a veces", estaciones: [6] },
      { texto: "Me cuesta quedarme quieto con el malestar", estaciones: [7] },
      { texto: "Muestro fuerza pero por dentro soy vulnerable", estaciones: [8] },
      { texto: "Evito conflictos para mantener la armonía", estaciones: [9] },
    ]
  },
  {
    id: 3,
    texto: "¿Qué buscas principalmente en tu proceso de crecimiento?",
    opciones: [
      { texto: "Ser más flexible y compasivo conmigo", estaciones: [1] },
      { texto: "Aprender a recibir y poner límites", estaciones: [2] },
      { texto: "Encontrar éxito auténtico, no solo aparente", estaciones: [3] },
      { texto: "Descubrir mi voz única sin compararme", estaciones: [4] },
      { texto: "Compartir mi conocimiento sin agotarme", estaciones: [5] },
      { texto: "Confiar en mí mismo para decidir", estaciones: [6] },
      { texto: "Disfrutar sin necesidad de huir", estaciones: [7] },
      { texto: "Usar mi fuerza para proteger, no controlar", estaciones: [8] },
      { texto: "Encontrar paz sin perderme en la inercia", estaciones: [9] },
    ]
  },
  {
    id: 4,
    texto: "En situaciones de estrés, tiendes a...",
    opciones: [
      { texto: "Volverse más crítico y exigente", estaciones: [1, 4] },
      { texto: "Aislarme o buscar demasiado a otros", estaciones: [2, 5] },
      { texto: "Hacer más o dejarlo todo", estaciones: [3, 9] },
      { texto: "Buscar seguridad o escapar", estaciones: [6, 7] },
      { texto: "Controlar o dejarme llevar", estaciones: [8] },
    ]
  },
  {
    id: 5,
    texto: "¿Cuál es tu mayor fortaleza cuando estás en equilibrio?",
    opciones: [
      { texto: "Mi sentido de la ética y la mejora continua", estaciones: [1] },
      { texto: "Mi capacidad de conectar y cuidar a otros", estaciones: [2] },
      { texto: "Mi energía para lograr lo que me propongo", estaciones: [3] },
      { texto: "Mi profundidad y creatividad única", estaciones: [4] },
      { texto: "Mi claridad para observar y comprender", estaciones: [5] },
      { texto: "Mi lealtad y capacidad de apoyar", estaciones: [6] },
      { texto: "Mi entusiasmo y visión positiva", estaciones: [7] },
      { texto: "Mi fuerza para proteger lo que importa", estaciones: [8] },
      { texto: "Mi capacidad de ver todos los lados", estaciones: [9] },
    ]
  },
];

interface TestOrientacionProps {
  onComplete?: (resultados: Estacion[]) => void;
}

export function TestOrientacion({ onComplete }: TestOrientacionProps) {
  const [paso, setPaso] = useState<'intro' | 'preguntas' | 'email' | 'resultado'>('intro');
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState<number[][]>([]);
  const [email, setEmail] = useState('');
  const [resultados, setResultados] = useState<Estacion[]>([]);
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

  const seleccionarOpcion = (estacionesIds: number[]) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[preguntaActual] = estacionesIds;
    setRespuestas(nuevasRespuestas);
  };

  const siguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      setPaso('email');
    }
  };

  const anteriorPregunta = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1);
    }
  };

  const calcularResultados = () => {
    const conteo: Record<number, number> = {};
    
    respuestas.forEach(respuesta => {
      respuesta.forEach(estacionId => {
        conteo[estacionId] = (conteo[estacionId] || 0) + 1;
      });
    });

    const estacionesOrdenadas = Object.entries(conteo)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([id]) => estaciones.find(e => e.id === parseInt(id))!)
      .filter(Boolean);

    setResultados(estacionesOrdenadas);
    setPaso('resultado');
    onComplete?.(estacionesOrdenadas);
  };

  const reiniciar = () => {
    setPaso('intro');
    setPreguntaActual(0);
    setRespuestas([]);
    setEmail('');
    setResultados([]);
  };

  const progreso = ((preguntaActual + 1) / preguntas.length) * 100;

  return (
    <section 
      ref={sectionRef}
      id="test-orientacion"
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Decoración */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, #704214 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div 
          className={`
            text-center mb-12 transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                        bg-[#704214]/10 text-[#704214] text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Test de Orientación</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#704214] mb-4">
            ¿Por Dónde Empiezo?
          </h2>
          <p className="text-[#5C4A3A]">
            No necesitas saber tu tipo de Eneagrama. Solo necesitas honestidad 
            sobre dónde te duele ahora.
          </p>
        </div>

        {/* Contenido del test */}
        <Card 
          className={`
            shadow-xl border-0 overflow-hidden
            transition-all duration-700 delay-200
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
        >
          <CardContent className="p-8">
            {paso === 'intro' && (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br 
                              from-[#704214] to-[#C5B358] flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#704214] mb-4">
                  Descubre tu punto de entrada
                </h3>
                <p className="text-[#5C4A3A] mb-8 max-w-md mx-auto">
                  Responde {preguntas.length} preguntas simples y te recomendaremos 
                  1-2 estaciones que pueden acompañarte mejor en este momento.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => setPaso('preguntas')}
                    className="bg-[#704214] hover:bg-[#8B4513] text-white px-8 rounded-full"
                  >
                    Comenzar el test
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mt-6">
                  💡 Este test no determina tu tipo de Eneagrama. Te orienta hacia 
                  la estación que puede acompañarte mejor.
                </p>
              </div>
            )}

            {paso === 'preguntas' && (
              <div>
                {/* Progreso */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Pregunta {preguntaActual + 1} de {preguntas.length}</span>
                    <span>{Math.round(progreso)}%</span>
                  </div>
                  <Progress value={progreso} className="h-2" />
                </div>

                {/* Pregunta */}
                <h3 className="font-display text-xl font-semibold text-[#704214] mb-6">
                  {preguntas[preguntaActual].texto}
                </h3>

                {/* Opciones */}
                <div className="space-y-3 mb-8">
                  {preguntas[preguntaActual].opciones.map((opcion, index) => {
                    const isSelected = respuestas[preguntaActual]?.includes(opcion.estaciones[0]);
                    return (
                      <button
                        key={index}
                        onClick={() => seleccionarOpcion(opcion.estaciones)}
                        className={`
                          w-full text-left p-4 rounded-xl border-2 transition-all
                          ${isSelected 
                            ? 'border-[#704214] bg-[#704214]/5' 
                            : 'border-gray-200 hover:border-[#704214]/30 hover:bg-gray-50'}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center
                            ${isSelected ? 'border-[#704214]' : 'border-gray-300'}
                          `}>
                            {isSelected && <div className="w-3 h-3 rounded-full bg-[#704214]" />}
                          </div>
                          <span className="text-[#5C4A3A]">{opcion.texto}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navegación */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={anteriorPregunta}
                    disabled={preguntaActual === 0}
                    className="rounded-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                  <Button
                    onClick={siguientePregunta}
                    disabled={!respuestas[preguntaActual]?.length}
                    className="bg-[#704214] hover:bg-[#8B4513] text-white rounded-full"
                  >
                    {preguntaActual === preguntas.length - 1 ? 'Ver resultado' : 'Siguiente'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {paso === 'email' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#704214]/10 
                              flex items-center justify-center">
                  <Mail className="w-8 h-8 text-[#704214]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#704214] mb-4">
                  Recibe tu resultado
                </h3>
                <p className="text-[#5C4A3A] mb-6">
                  Déjanos tu email para recibir tu resultado personalizado 
                  y recursos exclusivos para tu estación recomendada.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-full px-6"
                  />
                  <Button
                    onClick={calcularResultados}
                    disabled={!email.includes('@')}
                    className="bg-[#704214] hover:bg-[#8B4513] text-white rounded-full px-6"
                  >
                    Ver resultado
                  </Button>
                </div>
                <button 
                  onClick={calcularResultados}
                  className="text-sm text-gray-400 hover:text-[#704214] underline"
                >
                  Prefiero no dar mi email
                </button>
              </div>
            )}

            {paso === 'resultado' && resultados.length > 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 
                              flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#704214] mb-2">
                  Tu resultado
                </h3>
                <p className="text-[#5C4A3A] mb-8">
                  Basado en tus respuestas, estas estaciones pueden acompañarte mejor:
                </p>

                {/* Resultados */}
                <div className="space-y-4 mb-8">
                  {resultados.map((estacion, index) => (
                    <div 
                      key={estacion.id}
                      className="p-6 rounded-xl text-left"
                      style={{ backgroundColor: `${estacion.colorTerciario}80` }}
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: estacion.colorPrimario }}
                        >
                          <span className="text-white font-bold">{estacion.id}</span>
                        </div>
                        <div>
                          <h4 
                            className="font-display text-lg font-bold mb-1"
                            style={{ color: estacion.colorPrimario }}
                          >
                            {index === 0 ? 'Estación principal: ' : 'También te puede ayudar: '}
                            {estacion.nombre}
                          </h4>
                          <p className="text-sm text-[#5C4A3A] italic mb-2">
                            "{estacion.esencia}"
                          </p>
                          <Button 
                            size="sm"
                            className="rounded-full text-white"
                            style={{ backgroundColor: estacion.colorPrimario }}
                          >
                            Explorar esta estación
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={reiniciar}
                  className="rounded-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Volver a hacer el test
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default TestOrientacion;
