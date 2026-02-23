// Datos de las 9 Estaciones del Sistema Eneagramas
export interface Estacion {
  id: number;
  nombre: string;
  slug: string;
  eneatipo: number;
  esencia: string;
  colorPrimario: string;
  colorSecundario: string;
  colorTerciario: string;
  colorAcento: string;
  colorTexto: string;
  icono: string;
  alaIzquierda: number;
  alaDerecha: number;
  flechaIntegracion: number;
  flechaDesintegracion: number;
  tríada: 'mental' | 'emocional' | 'instintiva';
  descripcion: string;
}

export const estaciones: Estacion[] = [
  {
    id: 1,
    nombre: "El Ritmo Justo",
    slug: "el-ritmo-justo",
    eneatipo: 1,
    esencia: "La acción ética que se vuelve fluidez",
    colorPrimario: "#4A6FA5",
    colorSecundario: "#B8B8B8",
    colorTerciario: "#F5F7FA",
    colorAcento: "#2E4A6F",
    colorTexto: "#333333",
    icono: "scale",
    alaIzquierda: 9,
    alaDerecha: 2,
    flechaIntegracion: 7,
    flechaDesintegracion: 4,
    tríada: 'instintiva',
    descripcion: "Para quienes buscan la perfección consciente"
  },
  {
    id: 2,
    nombre: "Lazos del Alma",
    slug: "lazos-del-alma",
    eneatipo: 2,
    esencia: "El arte consciente del vínculo",
    colorPrimario: "#C67B5C",
    colorSecundario: "#D4A5A5",
    colorTerciario: "#F5E6DC",
    colorAcento: "#B85C3F",
    colorTexto: "#5C4033",
    icono: "heart",
    alaIzquierda: 1,
    alaDerecha: 3,
    flechaIntegracion: 4,
    flechaDesintegracion: 8,
    tríada: 'emocional',
    descripcion: "Para quienes dan sin perderse"
  },
  {
    id: 3,
    nombre: "Roles y Sinergia",
    slug: "roles-y-sinergia",
    eneatipo: 3,
    esencia: "El éxito con rostro auténtico",
    colorPrimario: "#2D8A6E",
    colorSecundario: "#D4AF37",
    colorTerciario: "#A8E6CF",
    colorAcento: "#1A5F4A",
    colorTexto: "#2C3E50",
    icono: "crown",
    alaIzquierda: 2,
    alaDerecha: 4,
    flechaIntegracion: 6,
    flechaDesintegracion: 9,
    tríada: 'emocional',
    descripcion: "Para quienes buscan éxito con significado"
  },
  {
    id: 4,
    nombre: "Devida Elección",
    slug: "devida-eleccion",
    eneatipo: 4,
    esencia: "La vocación que es huella digital",
    colorPrimario: "#6B4C7F",
    colorSecundario: "#722F37",
    colorTerciario: "#E6E6FA",
    colorAcento: "#4B0082",
    colorTexto: "#2F4F4F",
    icono: "sparkles",
    alaIzquierda: 3,
    alaDerecha: 5,
    flechaIntegracion: 1,
    flechaDesintegracion: 2,
    tríada: 'emocional',
    descripcion: "Para quienes buscan su voz única"
  },
  {
    id: 5,
    nombre: "Patrones Invisibles",
    slug: "patrones-invisibles",
    eneatipo: 5,
    esencia: "El código fuente de tu psique",
    colorPrimario: "#1E3A5F",
    colorSecundario: "#B87333",
    colorTerciario: "#00BFFF",
    colorAcento: "#191970",
    colorTexto: "#4A5568",
    icono: "brain",
    alaIzquierda: 4,
    alaDerecha: 6,
    flechaIntegracion: 8,
    flechaDesintegracion: 7,
    tríada: 'mental',
    descripcion: "Para quienes buscan comprender"
  },
  {
    id: 6,
    nombre: "El Centro de Mando",
    slug: "el-centro-de-mando",
    eneatipo: 6,
    esencia: "La soberanía de la decisión",
    colorPrimario: "#36454F",
    colorSecundario: "#FFBF00",
    colorTerciario: "#C0C0C0",
    colorAcento: "#434B4D",
    colorTexto: "#1C1C1C",
    icono: "compass",
    alaIzquierda: 5,
    alaDerecha: 7,
    flechaIntegracion: 9,
    flechaDesintegracion: 3,
    tríada: 'mental',
    descripcion: "Para quienes buscan seguridad interior"
  },
  {
    id: 7,
    nombre: "Conciencia Energética",
    slug: "conciencia-energetica",
    eneatipo: 7,
    esencia: "La ecología de tu entusiasmo",
    colorPrimario: "#FF00FF",
    colorSecundario: "#00FFFF",
    colorTerciario: "#FFD700",
    colorAcento: "#FF6600",
    colorTexto: "#2D3748",
    icono: "zap",
    alaIzquierda: 6,
    alaDerecha: 8,
    flechaIntegracion: 5,
    flechaDesintegracion: 1,
    tríada: 'mental',
    descripcion: "Para quienes buscan placer consciente"
  },
  {
    id: 8,
    nombre: "El Hábito de la Personalidad",
    slug: "el-habito-de-la-personalidad",
    eneatipo: 8,
    esencia: "La encarnación del poder",
    colorPrimario: "#0D0D0D",
    colorSecundario: "#8B6914",
    colorTerciario: "#4A0404",
    colorAcento: "#FFD700",
    colorTexto: "#F5F5F5",
    icono: "shield",
    alaIzquierda: 7,
    alaDerecha: 9,
    flechaIntegracion: 2,
    flechaDesintegracion: 5,
    tríada: 'instintiva',
    descripcion: "Para quienes buscan poder con vulnerabilidad"
  },
  {
    id: 9,
    nombre: "Saber Consentido",
    slug: "saber-consentido",
    eneatipo: 9,
    esencia: "El mapa que reconcilia el todo",
    colorPrimario: "#704214",
    colorSecundario: "#C5B358",
    colorTerciario: "#F5F5DC",
    colorAcento: "#8B4513",
    colorTexto: "#5C4A3A",
    icono: "mandala",
    alaIzquierda: 8,
    alaDerecha: 1,
    flechaIntegracion: 3,
    flechaDesintegracion: 6,
    tríada: 'instintiva',
    descripcion: "El portal de entrada al ecosistema"
  }
];

export const getEstacionById = (id: number): Estacion | undefined => {
  return estaciones.find(e => e.id === id);
};

export const getEstacionBySlug = (slug: string): Estacion | undefined => {
  return estaciones.find(e => e.slug === slug);
};

export const getAlas = (estacion: Estacion): Estacion[] => {
  return [
    getEstacionById(estacion.alaIzquierda)!,
    getEstacionById(estacion.alaDerecha)!
  ];
};

export const getFlechas = (estacion: Estacion): { integracion: Estacion; desintegracion: Estacion } => {
  return {
    integracion: getEstacionById(estacion.flechaIntegracion)!,
    desintegracion: getEstacionById(estacion.flechaDesintegracion)!
  };
};

export const getEstacionesByTríada = (tríada: 'mental' | 'emocional' | 'instintiva'): Estacion[] => {
  return estaciones.filter(e => e.tríada === tríada);
};
