import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { ManifiestoSection } from '@/components/sections/ManifiestoSection';
import { EstacionesSection } from '@/components/sections/EstacionesSection';
import { TestOrientacion } from '@/components/test/TestOrientacion';
import { RecursosSection } from '@/components/sections/RecursosSection';
import { EventosSection } from '@/components/sections/EventosSection';
import { ComunidadSection } from '@/components/sections/ComunidadSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { Toaster } from '@/components/ui/sonner';

function App() {

  const scrollToEstaciones = () => {
    const element = document.getElementById('estaciones');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTest = () => {
    const element = document.getElementById('test-orientacion');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStationClick = (estacion: { id: number; nombre: string }) => {
    console.log('Navegar a estación:', estacion);
    // Aquí se implementaría la navegación a la página de la estación
  };

  const handleTestComplete = (resultados: { id: number; nombre: string }[]) => {
    console.log('Test completado. Resultados:', resultados);
    // Aquí se implementaría la lógica post-test
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main>
        <HeroSection 
          onExploreStations={scrollToEstaciones}
          onTakeTest={scrollToTest}
        />
        
        <ManifiestoSection />
        
        <EstacionesSection 
          onStationClick={handleStationClick}
        />
        
        <TestOrientacion 
          onComplete={handleTestComplete}
        />
        
        <RecursosSection />
        
        <EventosSection />
        
        <ComunidadSection />
        
        <FooterSection />
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
