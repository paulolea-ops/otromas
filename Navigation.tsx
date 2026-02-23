import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Compass, Menu, ChevronRight } from 'lucide-react';
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

const tríadaInfo = {
  mental: { label: 'Mental', color: '#1E3A5F', estaciones: [5, 6, 7] },
  emocional: { label: 'Emocional', color: '#C67B5C', estaciones: [2, 3, 4] },
  instintiva: { label: 'Instintiva', color: '#4A6FA5', estaciones: [8, 9, 1] },
};

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3' 
          : 'bg-transparent py-5'}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2"
        >
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center
            transition-colors
            ${isScrolled ? 'bg-[#704214]' : 'bg-white/20 backdrop-blur'}
          `}>
            <Compass className={`w-5 h-5 ${isScrolled ? 'text-white' : 'text-[#704214]'}`} />
          </div>
          <div className={`hidden sm:block ${isScrolled ? '' : 'text-white'}`}>
            <span className="font-display font-bold text-sm">Eneagramas</span>
            <span className="block text-xs opacity-70">Saber Consentido</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={`
                    ${isScrolled ? 'text-[#5C4A3A]' : 'text-white'}
                    hover:bg-white/10
                  `}
                >
                  Las 9 Estaciones
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] p-4">
                    {/* Grid de estaciones */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {estaciones.map((estacion) => (
                        <a
                          key={estacion.id}
                          href={`#estacion-${estacion.id}`}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <span 
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-bold"
                            style={{ backgroundColor: estacionColors[estacion.id] }}
                          >
                            {estacion.id}
                          </span>
                          <span className="text-sm text-gray-700">{estacion.nombre}</span>
                        </a>
                      ))}
                    </div>
                    
                    {/* Tríadas */}
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-500 mb-2">Explorar por tríada:</p>
                      <div className="flex gap-2">
                        {Object.entries(tríadaInfo).map(([key, info]) => (
                          <button
                            key={key}
                            className="px-3 py-1 rounded-full text-xs text-white"
                            style={{ backgroundColor: info.color }}
                          >
                            {info.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <button 
            onClick={() => scrollToSection('recursos')}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${isScrolled 
                ? 'text-[#5C4A3A] hover:bg-[#704214]/10' 
                : 'text-white hover:bg-white/10'}
            `}
          >
            Recursos
          </button>
          <button 
            onClick={() => scrollToSection('eventos')}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${isScrolled 
                ? 'text-[#5C4A3A] hover:bg-[#704214]/10' 
                : 'text-white hover:bg-white/10'}
            `}
          >
            Eventos
          </button>
          <button 
            onClick={() => scrollToSection('comunidad')}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${isScrolled 
                ? 'text-[#5C4A3A] hover:bg-[#704214]/10' 
                : 'text-white hover:bg-white/10'}
            `}
          >
            Comunidad
          </button>
        </nav>

        {/* CTA Desktop */}
        <div className="hidden lg:block">
          <Button
            onClick={() => scrollToSection('test-orientacion')}
            className={`
              rounded-full transition-all
              ${isScrolled 
                ? 'bg-[#704214] hover:bg-[#8B4513] text-white' 
                : 'bg-white/20 backdrop-blur text-white hover:bg-white/30'}
            `}
          >
            Descubre tu estación
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className={isScrolled ? 'text-[#704214]' : 'text-white'}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-white">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#704214] flex items-center justify-center">
                    <Compass className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-sm text-[#704214]">Eneagramas</span>
                    <span className="block text-xs text-[#5C4A3A]">Saber Consentido</span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="flex-1">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                    Las 9 Estaciones
                  </p>
                  {estaciones.map((estacion) => (
                    <a
                      key={estacion.id}
                      href={`#estacion-${estacion.id}`}
                      onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm text-white font-bold"
                        style={{ backgroundColor: estacionColors[estacion.id] }}
                      >
                        {estacion.id}
                      </span>
                      <span className="text-gray-700">{estacion.nombre}</span>
                    </a>
                  ))}
                </div>

                <div className="border-t my-4" />

                <div className="space-y-1">
                  <button 
                    onClick={() => scrollToSection('recursos')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <span className="text-gray-700">Recursos</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => scrollToSection('eventos')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <span className="text-gray-700">Eventos</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => scrollToSection('comunidad')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100"
                  >
                    <span className="text-gray-700">Comunidad</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </nav>

              {/* CTA */}
              <div className="pt-4 border-t">
                <Button
                  onClick={() => scrollToSection('test-orientacion')}
                  className="w-full bg-[#704214] hover:bg-[#8B4513] text-white rounded-full"
                >
                  Descubre tu estación
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navigation;
