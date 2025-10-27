// Este es solo un ejemplo,
// así que puedes eliminar todas las propiedades predeterminadas a continuación

export default {
  failed: 'Acción fallida',
  success: 'Acción exitosa',
  welcome: 'Bienvenido a la aplicación A Compás',
  notFound: {
    header: 'Lo sentimos, esta página no existe.',
    btn: 'Volver a los patrones'
  },
  donate: 'Donar',
  help: 'Ayuda',
  tuning: 'Diapasón',
  shortcuts: 'Atajos',
  privacy: 'Política de privacidad',
  android: 'Obtener la aplicación Android',
  follow: 'Síguenos',
  share: 'Compartir',
  source: 'Código fuente',
  issues: 'Problemas',
  doc: {
    welcome: {
      title: 'Bienvenido a la aplicación A Compás',
      content: `
Esta aplicación está diseñada para ayudarte a aprender y practicar tu instrumento musical.
Es un trabajo en progreso, así que ten paciencia con nosotros mientras continuamos mejorándola.
Si tienes alguna pregunta o sugerencia, por favor contáctanos.`
    },
    getStarted: {
      title: 'Comenzar',
      content: `
- Selecciona un **patrón** de la lista. Un patrón (también llamado "palo" en el flamenco) es un estilo rítmico.
- Ajusta el **tempo** (velocidad) del patrón.
- Selecciona **instrumentos** en la mesa de mezclas.
- **Inicia** el metrónomo.`
    },
    options: {
      title: 'Lista de opciones',
      content: {
        theme: {
          title: 'Tema',
          content: `
Puedes elegir entre temas claro y oscuro.
El tema oscuro es más adecuado para ambientes con poca luz, mientras que el tema claro es más adecuado para ambientes brillantes.`,
        },
        lang: {
          title: 'Idioma',
          content: `
Elige el idioma de la interfaz de la aplicación.
El cambio se aplica inmediatamente a todos los textos.
Tu selección se almacena localmente (navegador / dispositivo) para que se mantenga la próxima vez que abras la app.`,
        },
        tempo: {
          title: 'Tempo',
          content: `
Hay 2 formas de definir el tempo: el círculo de perilla, y puedes decrementar/incrementar los bpm con los botones + y -.
También puedes escribir el tempo directamente en el campo de entrada, usar la rueda del ratón, o las teclas de flecha arriba y abajo.
El tempo es la velocidad del metrónomo, medida en golpes por minuto.`,
        },
        mixer: {
          title: 'Mesa de mezclas de instrumentos',
          content: `
Selecciona instrumentos en reproducción (asegúrate de tener al menos un instrumento activo),
establece su propio volumen relativo, y si reproduce notas negras o corcheas.`,
        },
        improvise: {
          title: 'Improvisar',
          content: `
Si está activado, entonces a veces el metrónomo dejará de seguir el patrón preprogramado y tocará golpes aleatorios para uno o más instrumento(s).
Esto produce algo de "sorpresa" en el patrón.`,
        },
        humanize: {
          title: 'Humanizar',
          content: 'Si está activado, entonces el metrónomo tocará los golpes con una pequeña desviación aleatoria, simulando el toque humano.',
        },
        swing: {
          title: 'Swing',
          content: 'Si su valor es 0, la corchea es exactamente la mitad de una nota negra. Cuando se acerca a 1, se aplica un retraso, para una sensación rítmica "tipo jazz".',
        },
        reverb: {
          title: 'Reverb',
          content: 'Ajusta la reverberación del sonido. Simula el efecto de una habitación o un salón.',
        },
        startBeat: {
          title: 'Golpe de inicio',
          content: `
Cambia el golpe de inicio (en qué golpe seleccionado comienza el patrón).
Esto es útil si quieres comenzar el patrón en un golpe diferente.
Por ejemplo, si quieres comenzar en el 2º golpe del patrón, establece el golpe de inicio en 2.
El golpe de inicio también es útil si quieres practicar una parte particular del patrón.
Las notas entre el golpe de inicio y el comienzo del patrón se reproducirán como un sonido de clic.`,
        },
        viewMode: {
          title: 'Modo de vista',
          content: 'Elige entre visualizaciones de puntos, contador y reloj.',
        },
        reset: {
          title: 'Restablecer',
          content: 'Restablece la configuración del metrónomo a los valores predeterminados. Puedes restablecer toda la configuración o restablecer la configuración para el patrón actual.',
        }
      }
    },
    appSettings: {
      title: 'Configuración de la aplicación',
      content: {
        theme: {
          title: 'Modo de tema',
          content: `
**Opciones de tema claro y oscuro**

A Compás ofrece temas claro y oscuro para proporcionar la mejor experiencia visual:

- **Tema claro**: Interfaz limpia y brillante ideal para entornos bien iluminados. Presenta fondos blancos con texto oscuro para máxima legibilidad en luz diurna.
- **Tema oscuro**: Fácil para la vista con fondos oscuros y texto claro. Perfecto para condiciones de poca luz, reduce la fatiga ocular durante sesiones de práctica extendidas y ahorra batería en pantallas OLED.

**Cómo cambiar:**
- Usa el botón de alternancia de tema en el menú de navegación izquierdo
- Los cambios se aplican inmediatamente en toda la aplicación
- Tu preferencia se guarda automáticamente y se restaura al reiniciar la app

**Detección automática:**
La aplicación respeta la preferencia de tema del sistema de tu dispositivo por defecto, pero puedes anular esta configuración en cualquier momento.`
        },
        language: {
          title: 'Selección de idioma',
          content: `
**Soporte multiidioma**

A Compás está disponible en 9 idiomas para servir a la comunidad flamenca mundial:

- **Inglés** (en-US) - Idioma predeterminado
- **Francés** (Français) - Traducción completa
- **Español** (Español) - Terminología flamenca nativa
- **Alemán** (Deutsch) - Localización completa
- **Italiano** (Italiano) - Traducción completa de la interfaz

**Características:**
- Todos los menús, botones y textos de ayuda están traducidos
- Los nombres de palos flamencos permanecen en español por autenticidad
- Los cambios de idioma se aplican instantáneamente sin reiniciar la app
- La configuración se guarda localmente en tu dispositivo

**Cómo cambiar de idioma:**
Usa el selector de idioma en el menú de navegación izquierdo para alternar entre idiomas disponibles.`
        },
        visualization: {
          title: 'Modos de visualización',
          content: `
**Tres opciones de pantalla para visualización de golpes**

Elige la visualización que mejor se adapte a tu estilo de práctica:

**1. Modo Puntos**
- Pantalla limpia y minimalista con puntos animados
- Cada punto representa un golpe en el patrón
- Los golpes activos se resaltan con color y animación
- Perfecto para aprendices visuales que prefieren pantallas simples y despejadas
- Excelente para enfocarse en la estructura del patrón

**2. Modo Contador**
- Contador digital mostrando la posición actual
- Muestra el número del golpe actual y total de golpes en el patrón
- Progresión numérica clara a través del compás
- Ideal para músicos que piensan en números
- Útil para aprender estructuras de patrones complejos y timing

**3. Modo Reloj**
- Visualización circular tipo esfera de reloj
- Golpes dispuestos alrededor de un reloj con manecilla animada
- Proporciona sensación intuitiva del ritmo cíclico
- Excelente para entender la naturaleza circular del compás flamenco
- Representación visual que coincide con métodos tradicionales de contar flamenco

**Cómo cambiar:**
Accede a las opciones de visualización a través del menú de configuración. Los cambios se aplican inmediatamente y tu preferencia se guarda automáticamente.

**Consejos:**
- Prueba diferentes modos durante la práctica para encontrar lo que mejor te funcione
- El modo reloj es particularmente efectivo para patrones de 12 golpes como la Soleá
- El modo contador ayuda al aprender ritmos complejos
- El modo puntos minimiza distracciones para practicantes avanzados`
        }
      }
    },
    utils: {
      wikipediaUrl: 'Artículo de Wikipedia:',
      videoExample: 'Ejemplo de video:',
      openLink: 'Abrir enlace',
      disabled: 'Esta opción está deshabilitada para este patrón.'
    },
    searchPattern: {
      title: 'Buscar un patrón',
      content: `
Muchos **palos** flamencos en realidad se derivan de otras estructuras rítmicas.
Por ejemplo, "farruca" se deriva de "tientos", "columbiana" o "garrotín" son tipos de "tangos".
Aquí puedes ingresar el nombre de cualquier "palo" que hayas escuchado y A Compás buscará los patrones de los cuales se deriva.
- Busca un patrón escribiendo su nombre o una parte de él.
- La búsqueda no distingue entre mayúsculas y minúsculas.
- La búsqueda se realiza en el nombre del patrón y en los patrones vinculados.
- La búsqueda se realiza en toda la cadena, no en las palabras.`
    },
    shortcuts: {
      title: 'Los siguientes atajos están disponibles para usar con el teclado:',
      space: 'Reproducir/Parar el metrónomo',
      up: 'Incrementar el tempo (mantén la tecla presionada para incrementar más rápido)',
      down: 'Decrementar el tempo (mantén la tecla presionada para decrementar más rápido)',
      left: 'Patrón anterior',
      right: 'Siguiente patrón',
      esc: 'Cerrar la ventana modal',
      tab: 'Cambiar botón de foco'
    },
    reset: {
      title: 'Restaurar parámetros predeterminados',
      warning: '¡Advertencia! Esto eliminará la configuración de tu metrónomo.',
      close: 'Cerrar',
      proceed: 'Proceder',
      success: '¡Éxito! La configuración de tu metrónomo ha sido restablecida.',
    },
    context: {
      title: 'Seleccionar un contexto',
    },
    reverb: {
      title: 'Decaimiento de reverb',
      content: 'Establece un decaimiento para la reverberación de los sonidos'
    },
    swing: {
      title: 'Swing',
      content: 'Establece un valor de swing para el metrónomo',
      caption: 'Si su valor es 0, la corchea es exactamente la mitad de una nota negra. Cuando se acerca a 1, se aplica un retraso, para un sabor rítmico "tipo jazz".'
    },
    startBeat: {
      title: 'Golpe de inicio',
      content: 'Establece el golpe donde el metrónomo comenzará a tocar'
    },
    mixer: {
      title: 'Mesa de mezclas de instrumentos',
      content: 'Selecciona los instrumentos que quieres tocar',
      active: {
        title: 'Activo',
        content: 'Tocar este instrumento'
      },
      eighth: {
        title: '8ª',
        content: 'Alternar corcheas'
      },
      volume: {
        title: 'Volumen (db)',
        content: 'Aumentar o disminuir el volumen del instrumento'
      }
    },
    pattern: {
      title: 'Seleccionar un patrón',
      search: 'Buscar un patrón',
      searchSm: 'Buscar',
    },
    prestart: {
      title: 'Inicio previo desde el golpe',
      content: 'Opcionalmente define un golpe desde el cual comenzará un clic de preconteo antes de que comience el bucle real.'
    },
    privacy: {
      title: 'Política de privacidad',
      content: `
Esta aplicación utiliza una herramienta llamada **Matomo** para recopilar datos anónimos de análisis de visitas.

Si activas la opción a continuación, Matomo establecerá una cookie en el navegador web (para el sitio web acompas.org),
o en el dispositivo móvil (para la aplicación Android),
y observará algunas de tus acciones en la aplicación
(esencialmente acciones de 'Reproducir' y 'Parar' del metrónomo para inferir el tiempo de reproducción),
anonimizando tu dirección IP.

Esta información es solo parte de nuestras estadísticas de uso (para tener una idea de cuántos usuarios tenemos). No vendemos ni damos acceso a estos datos a nadie más.
Puedes habilitar o deshabilitar esta función cuando quieras.`,
      allow: `
No recopilamos ningún dato personal nominativo.

**¿Permitir que esta aplicación nos envíe algunos datos de uso anónimos?**`,
      enable: 'Habilitar y cerrar',
      close: 'Cerrar',
    },
    tempo: {
      title: 'Tempo',
      content: 'Establece el tempo del metrónomo',
      bpm: 'BPM'
    },
    update: {
      title: 'Inicialización de la aplicación',
      content: `
La configuración de la aplicación tiene que ser (re)inicializada.

Si estabas usando una versión anterior de esta aplicación, perderás toda tu configuración y patrones.
Pero esta es la única forma de obtener las nuevas características. Si es tu primer uso, esto no cambiará nada, así que adelante.`,
      button: 'Recargar aplicación'
    },
    tuning: {
      title: 'Diapasón',
      content: 'Reproducir un sonido de diapasón',
      caption: 'todo',
      play: 'Reproducir',
      stop: 'Parar'
    },
    changelog: {
      title: 'Registro de cambios',
      description: 'Últimos cambios y actualizaciones de A Compás',
      entries: [
        {
          version: '3.2.7',
          date: '2024-08-23',
          changes: [
            'Añadido almacén de contexto y selector con vistas de colores',
            'Añadida funcionalidad de filtro de búsqueda de patrones',
            'Añadido diálogo de ayuda para búsqueda de patrones',
            'Añadida funcionalidad de mantener despierto para escritorio',
            'Actualizados paquetes Quasar',
            'Corregidas advertencias SaSS',
            'Actualizado a Node 20',
            'Preparación para compatibilidad con Android 34'
          ]
        },
        {
          version: '3.2.5',
          date: '2023-07-15',
          changes: [
            'Añadido y actualizado sitemap.xml',
            'Corregidos eventos Matomo',
            'Corregida posición del reloj inactivo',
            'Actualizados paquetes Quasar',
            'Mejoras de rendimiento y corrección de errores'
          ]
        },
        {
          version: '3.2.4',
          date: '2023-07-06',
          changes: [
            'Corrección de errores y mejoras de estabilidad',
            'Mejoras menores de la interfaz de usuario'
          ]
        },
        {
          version: '3.2.3',
          date: '2023-07-03',
          changes: [
            'Optimizaciones de rendimiento',
            'Corrección de errores'
          ]
        },
        {
          version: '3.2.2',
          date: '2023-07-03',
          changes: [
            'Correcciones rápidas y mejoras'
          ]
        },
        {
          version: '3.2.1',
          date: '2023-06-30',
          changes: [
            'Corrección de errores y actualizaciones de mantenimiento'
          ]
        },
        {
          version: '2.3.0',
          date: '2021-01-23',
          changes: [
            'Nuevas características y mejoras',
            'Interfaz de usuario mejorada'
          ]
        },
        {
          version: '2.2.0',
          date: '2020-06-25',
          changes: [
            'Actualizaciones importantes de características',
            'Rendimiento mejorado'
          ]
        },
        {
          version: '2.1.4',
          date: '2019-09-13',
          changes: [
            'Corrección de errores y mejoras de estabilidad'
          ]
        },
        {
          version: '2.0.0',
          date: '2018-01-04',
          changes: [
            'Reescritura completa de la aplicación',
            'Nuevo diseño de interfaz moderno',
            'Motor de metrónomo mejorado',
            'Añadidos más patrones flamencos'
          ]
        }
      ]
    }
  },
  buttons: {
    context : 'Seleccionar contexto',
    pattern: 'Patrón',
    restore: 'Restaurar configuración',
    options: 'Opciones de ritmo',
    settings: 'Configuración de la aplicación'
  }
}
