// Este es solo un ejemplo,
// así que puedes eliminar todas las propiedades predeterminadas a continuación

export default {
  failed: 'Acción fallida',
  success: 'Acción exitosa',
  welcome: 'Bienvenido a la aplicación Palmas',
  notFound: {
    header: 'Lo sentimos, esta página no existe.',
    btn: 'Volver a los patrones'
  },
  help: 'Ayuda',
  tuning: 'Diapasón',
  shortcuts: 'Atajos',
  privacy: 'Política de privacidad',
  source: 'Código fuente',
  issues: 'Problemas',
  doc: {
    welcome: {
      title: 'Bienvenido a la aplicación Palmas',
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

Palmas ofrece temas claro y oscuro para proporcionar la mejor experiencia visual:

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

Palmas está disponible en 9 idiomas para servir a la comunidad flamenca mundial:

- **Inglés** (en-US) - Idioma predeterminado
- **Español** (Español) - Terminología flamenca nativa
- **Francés** (Français) - Traducción completa
- **Alemán** (Deutsch) - Localización completa
- **Italiano** (Italiano) - Traducción completa de la interfaz
- **Japonés** (日本語)
- **Chino** (简体中文) - Simplificado
- **Árabe** (العربية) - De derecha a izquierda
- **Persa** (فارسی) - De derecha a izquierda

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
        },
        // Machine-translated and not yet reviewed by a speaker. The flamenco
        // vocabulary is deliberately left in Spanish.
        reading: {
          title: 'Leer la pantalla',
          content: `
**Dos cosas a la vez**

Cada visualización muestra dos cosas superpuestas, y no son lo mismo:

- El **compás** — el pulso del palo en sí. Es el patrón abstracto: dónde caen
  los acentos en el ciclo, independientemente de quién toque.
- Las **palmas** — lo que realmente golpea el instrumento que estás mirando. Un
  intérprete no se limita a marcar los acentos; cada instrumento toca su propia
  figura frente a ellos.

Los abandolaos son el ejemplo más claro. Su pulso cae en 6, 2 y 4, mientras que
las palmas claras golpean en 1 y 3. Una pantalla que mostrara solo el compás
contradiría lo que estás oyendo.

**El color significa acentuado**

- Un punto **rojo** es un golpe acentuado del compás. Los puntos grises son los
  no acentuados, y se van encogiendo según importan menos: un golpe contado,
  luego un pulso no contado, luego una subdivisión a contratiempo.
- Un anillo **azul** es un golpe acentuado del instrumento dibujado. Los anillos
  más finos en el color de primer plano son sus golpes más suaves. La ausencia
  de anillo significa que ese instrumento calla en ese golpe.

El anillo va ligeramente separado del punto para que se lea como un anillo y no
como un punto más grande. El grosor lleva la misma información que el color, así
que nada depende de distinguir el rojo del azul.

El contador y el reloj dicen lo mismo con sus propias formas: una barra bajo el
número y una marca fuera de la esfera, más gruesa o más larga cuanto más fuerte
es el golpe, y coloreada cuando es el acentuado.

**Corcheas**

Un instrumento puede tocar también en los contratiempos, no solo en los golpes.
La columna **8ª** de la mesa de mezclas lo activa para cada instrumento por
separado.

Cuando está activada, las posiciones a contratiempo aparecen entre los golpes
contados, dibujadas más pequeñas. Cuando está desactivada siguen ahí pero
invisibles, de modo que la separación entre golpes nunca cambia al activarla.

**Elegir qué instrumento se dibuja**

Solo se puede dibujar un instrumento a la vez: dos figuras superpuestas serían
ilegibles. La columna **Mostrado** de la mesa de mezclas elige cuál.

Nunca es un instrumento que no puedas oír: tu elección se mantiene mientras ese
instrumento siga activo, y si no, se dibuja el primero que lo esté. Como la mesa
de mezclas no permite apagarlos todos, siempre hay exactamente uno.`
        },
        sync: {
          title: 'Retardo audio/visual',
          content: `
**Cuando el sonido y la animación no coinciden**

El golpe que ves y el que oyes deberían llegar juntos. Si el clic suena
*después* de que se encienda el punto, este ajuste lo corrige: retiene la
animación hasta que el sonido la alcanza.

Se mide en milisegundos, y el deslizador muestra además el retardo como fracción
de un golpe al tempo actual: unos 120 ms fijos importan mucho más a 200 bpm que
a 60.

**Por qué ocurre**

Toda cadena de audio añade retardo: el propio búfer del navegador, el sistema
operativo y después aquello por lo que viaja el sonido. La aplicación ya pregunta
al navegador cuánta latencia está añadiendo y la compensa automáticamente. Lo que
no puede ver es el resto.

**El Bluetooth suele ser el culpable.** Los auriculares y altavoces inalámbricos
añaden entre unos 100 y 300 milisegundos que nada declara, así que la aplicación
no tiene forma de saberlo. La salida por cable rara vez necesita ajuste alguno.

**Cómo ajustarlo**

Pon en marcha el metrónomo, fíjate en un golpe fácil de identificar —uno
acentuado— y sube el deslizador hasta que el sonido y la animación coincidan.
Fíate de tu oído más que del número: el valor correcto es aquel en el que
coinciden, y será distinto con tus auriculares que con tus altavoces.

El ajuste se guarda en este dispositivo, así que se conserva entre sesiones. Si
alternas entre cable e inalámbrico, cuenta con tener que cambiarlo.`
        }
      }
    },
    visualizationModes: {
      dots: 'Dots',
      counter: 'Counter',
      clock: 'Clock'
    },
    utils: {
      wikipediaUrl: 'Artículo de Wikipedia:',
      videoExample: 'Ejemplo de video:',
      openLink: 'Abrir enlace',
      source: 'Fuente: Wikipedia',
      beats: '{count} tiempos',
      disabled: 'Esta opción está deshabilitada para este patrón.'
    },
    searchPattern: {
      title: 'Buscar un patrón',
      content: `
Muchos **palos** flamencos en realidad se derivan de otras estructuras rítmicas.
Por ejemplo, "farruca" se deriva de "tientos", "columbiana" o "garrotín" son tipos de "tangos".
Aquí puedes ingresar el nombre de cualquier "palo" que hayas escuchado y Palmas buscará los patrones de los cuales se deriva.
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
      shown: {
        title: 'Mostrado',
        content: 'Representar este instrumento en la visualización'
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
No recopilamos ningún dato personal.

Cuando abres la ayuda de un palo, la aplicación pide a Wikipedia el resumen de ese artículo para mostrarlo en tu idioma. Wikipedia ve tu dirección IP y qué artículo se ha solicitado. Nada más sale de tu dispositivo.`
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
      description: 'Últimos cambios y actualizaciones de Palmas',
    }
  },
  buttons: {
    context : 'Seleccionar contexto',
    pattern: 'Patrón',
    restore: 'Restaurar configuración',
    options: 'Opciones de ritmo',
    settings: 'Configuración de la aplicación'
  },
  notify: {
    loading: 'Cargando…',
    audioInit: 'Inicializando el audio…',
    loadSamplesFailed: '¡Error al cargar las muestras de audio!',
    startSequencesFailed: 'Error al iniciar las secuencias de audio. Inténtalo de nuevo.',
    fetchDataError: 'Error al obtener los datos',
    oneInstrumentRequired: '¡Debe seleccionarse al menos un instrumento!',
    tempo: {
      verySlow: 'Tu tempo es muy lento',
      veryFast: 'Tu tempo es muy rápido',
      rhythmVerySlow: 'Tu ritmo es muy lento',
      porTientos: 'Tu tempo es por tientos',
      verySlowTientos: 'Tu tempo es muy lento, incluso para tientos',
      tangosRumbas: 'Tu tempo es más bien de tangos o rumbas',
      porBuleria: 'Tu tempo es por bulería',
      porRumba: 'Tu tempo es por rumba',
      soleaBuleriaAlegria: 'Tu tempo es soleá por bulería o alegría'
    },
    browserUnsupported: {
      title: '¡Actualiza tu navegador!',
      message: 'Tu navegador no es compatible con una o más tecnologías utilizadas por esta aplicación. Vuelve con otro navegador u otra versión de este.'
    }
  },
  sync: {
    title: 'Retardo audio/visual',
    caption: 'Desplaza la animación para que coincida con el sonido. Auméntalo si el clic se oye después de la animación — normalmente con auriculares Bluetooth.'
  }
}
