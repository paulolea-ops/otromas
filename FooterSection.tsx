import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Compass, 
  Mail, 
  Send,
  Heart,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react';
import { estaciones } from '@/data/estaciones';

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

export function FooterSection() {
  const [email, setEmail] = useState('');

  // Orden del Eneagrama para el mapa
  const enneagramOrder = [9, 8, 1, 2, 3, 4, 5, 6, 7];
  const orderedEstaciones = enneagramOrder.map(id => estaciones.find(e => e.id === id)!);

  return (
    <footer className="bg-[#704214] text-white relative overflow-hidden">
      {/* Decoración */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, #C5B358 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Mapa del Sistema */}
        <div className="section-padding pb-0">
          <h3 className="font-display text-2xl font-bold text-center mb-8">
            Mapa del Sistema
          </h3>
          
          {/* Visualización del Eneagrama */}
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-md aspect-square">
              {/* Círculo exterior */}
              <div className="absolute inset-8 rounded-full border-2 border-dashed border-white/20" />
              
              {/* Líneas de conexión */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                {/* Triángulo 3-6-9 */}
                <polygon 
                  points="200,60 320,280 80,280"
                  fill="none"
                  stroke="#C5B358"
                  strokeWidth="2"
                  opacity="0.5"
                />
                {/* Hexágono */}
                <polygon 
                  points="200,60 320,140 320,280 200,340 80,280 80,140"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  opacity="0.2"
                />
              </svg>

              {/* Estaciones */}
              {orderedEstaciones.map((estacion, index) => {
                const angle = (index * 2 * Math.PI) / 9 - Math.PI / 2;
                const radius = 35; // % del contenedor
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);

                return (
                  <a
                    key={estacion.id}
                    href={`#estacion-${estacion.id}`}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2
                             group transition-all hover:scale-110"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
                               text-sm md:text-base font-bold shadow-lg transition-all
                               group-hover:shadow-xl"
                      style={{ 
                        backgroundColor: estacionColors[estacion.id],
                        boxShadow: `0 4px 15px ${estacionColors[estacion.id]}80`
                      }}
                    >
                      {estacion.id}
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
                                  px-3 py-1 rounded-lg bg-white text-[#704214] text-xs
                                  whitespace-nowrap opacity-0 group-hover:opacity-100
                                  transition-opacity pointer-events-none">
                      {estacion.nombre}
                    </div>
                  </a>
                );
              })}

              {/* Centro */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                           w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br 
                           from-[#C5B358] to-[#8B6914] flex items-center justify-center
                           shadow-xl">
                <Compass className="w-8 h-8 md:w-10 md:h-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal del footer */}
        <div className="section-padding pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Columna 1: Logo y descripción */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C5B358] to-[#8B6914]
                              flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold">Eneagramas</h4>
                  <p className="text-sm text-[#C5B358]">Saber Consentido</p>
                </div>
              </div>
              <p className="text-white/70 text-sm mb-6">
                Un ecosistema integral de autoconocimiento basado en el Eneagrama. 
                9 caminos, 1 verdad.
              </p>
              
              {/* Redes sociales */}
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                                      hover:bg-white/20 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                                      hover:bg-white/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                                      hover:bg-white/20 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                                      hover:bg-white/20 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Columna 2: Las 9 Estaciones */}
            <div>
              <h5 className="font-display font-semibold mb-4">Las 9 Estaciones</h5>
              <ul className="space-y-2">
                {estaciones.map((estacion) => (
                  <li key={estacion.id}>
                    <a 
                      href={`#estacion-${estacion.id}`}
                      className="text-sm text-white/70 hover:text-white transition-colors
                               flex items-center gap-2"
                    >
                      <span 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: estacionColors[estacion.id] }}
                      />
                      {estacion.nombre}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna 3: Recursos */}
            <div>
              <h5 className="font-display font-semibold mb-4">Recursos</h5>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    Podcast
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    Ebooks
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    Videos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    Test de Orientación
                  </a>
                </li>
              </ul>
            </div>

            {/* Columna 4: Newsletter */}
            <div>
              <h5 className="font-display font-semibold mb-4">Newsletter</h5>
              <p className="text-sm text-white/70 mb-4">
                Recibe recursos exclusivos y novedades del ecosistema.
              </p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50
                             rounded-full focus:border-[#C5B358]"
                  />
                </div>
                <Button 
                  size="icon"
                  className="rounded-full bg-[#C5B358] hover:bg-[#8B6914] text-[#704214]"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-white/10 text-center">
          <p className="text-sm text-white/50 flex items-center justify-center gap-1">
            © 2024 Eneagramas: Saber Consentido. Hecho con 
            <Heart className="w-4 h-4 text-red-400 fill-red-400" /> 
            para quienes buscan comprenderse.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
