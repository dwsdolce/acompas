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
          content: `Si está activado, entonces el metrónomo tocará los golpes con una pequeña desviación aleatoria, simulando el toque humano.`,
        },
        swing: {
          title: 'Swing',
          content: `Si su valor es 0, la corchea es exactamente la mitad de una nota negra. Cuando se acerca a 1, se aplica un retraso, para una sensación rítmica "tipo jazz".`,
        },
        reverb: {
          title: 'Reverb',
          content: `Ajusta la reverberación del sonido. Simula el efecto de una habitación o un salón.`,
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
          content: `Elige entre visualizaciones de puntos, contador y reloj.`,
        },
        reset: {
          title: 'Restablecer',
          content: `Restablece la configuración del metrónomo a los valores predeterminados. Puedes restablecer toda la configuración o restablecer la configuración para el patrón actual.`,
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