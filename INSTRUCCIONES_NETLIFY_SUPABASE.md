# 💖 Guía Rápida: Cómo Conectar Supabase y Desplegar en Netlify

¡Tu página web temática de **Wicked / Galinda (Ariana Grande)** ya está lista para deslumbrar! Sigue estos sencillos pasos para conectar tu base de datos gratuita en **Supabase** y publicar la web en **Netlify** en solo unos minutos.

---

## 🌸 Paso 1: Configurar tu Base de Datos Gratuita en Supabase (3 minutos)

1. Ingresa a **[supabase.com](https://supabase.com/)** y regístrate o inicia sesión con tu cuenta de GitHub o correo electrónico (es 100% gratuito).
2. Haz clic en **"New Project"** (Nuevo Proyecto):
   - **Name**: `wicked-amor-amistad` (o el nombre que prefieras).
   - **Database Password**: Genera una contraseña segura y guárdala.
   - **Region**: Elige una cercana (por ejemplo, *South America (São Paulo)* o *East US*).
   - Haz clic en **"Create new project"** y espera 1 minuto a que termine de crearse.
3. En el menú lateral izquierdo, haz clic en **"SQL Editor"** (el icono que parece `>_` o una terminal).
4. Haz clic en **"New query"** (Nueva consulta).
5. Abre el archivo `supabase_setup.sql` que viene en esta carpeta, copia todo su contenido, pégalo en el editor de Supabase y haz clic en el botón verde **"Run"**.
   - ¡Aparecerá el mensaje *"Success. No rows returned"*! Tu tabla `love_survey_responses` ya fue creada con permisos listos.
6. Ahora ve a **Project Settings** (el icono de engranaje ⚙️ abajo a la izquierda) -> selecciona **API**:
   - Copia la **Project URL** (ejemplo: `https://abcdefghijklm.supabase.co`).
   - Copia la **Project API keys: `anon` `public`** (es una clave larga que empieza por `eyJ...`).
7. Abre el archivo `config.js` en tu carpeta del proyecto y pega esos valores:
   ```javascript
   const SUPABASE_CONFIG = {
     url: 'https://tu-proyecto-aqui.supabase.co',
     anonKey: 'tu-anon-key-aqui',
     adminPin: '2026' // Puedes cambiar este PIN si quieres
   };
   ```
8. Guarda el archivo `config.js`. ¡Listo, tu base de datos está conectada!

---

## 👑 Paso 2: ¿Cómo Ver las Respuestas que Ella Deje?

Tienes **DOS formas súper fáciles** de ver lo que responda:

### Forma 1: Directamente en la Página Web (Panel Secreto)
1. En la página web (tanto en tu computador como en Netlify), baja hasta el pie de página o haz clic en la **pequeña corona dorada secreta** 👑 que está en la barra superior o en el footer (o agrega `#admin` al final de la URL, por ejemplo: `https://tu-web.netlify.app/#admin`).
2. Te pedirá el **PIN Secreto** (por defecto es `2026`).
3. ¡Se abrirá una ventana mágica que te mostrará en tiempo real:
   - La respuesta que eligió (`si`, `no`, `SHI` o `ÑO`).
   - Todo lo que escribió en las recomendaciones (comidas, juegos, antojos).
   - La fecha y hora exacta del envío.

### Forma 2: En la consola de Supabase
1. Entra a tu proyecto en [supabase.com](https://supabase.com).
2. En el menú de la izquierda ve a **"Table Editor"**.
3. Selecciona la tabla `love_survey_responses`. ¡Ahí verás la fila con su respuesta y comentarios!

---

## 🚀 Paso 3: Cómo Subir la Web a Netlify (2 minutos)

La forma más rápida es con **Netlify Drop** (sin necesidad de comandos de consola):

1. Ve a **[app.netlify.com/drop](https://app.netlify.com/drop)** (si te pide iniciar sesión, ingresa con tu cuenta o crea una gratis).
2. Abre la carpeta `c:\User\johan\Downlands` en tu explorador de archivos de Windows.
3. Arrastra toda la carpeta (con `index.html`, `styles.css`, `script.js`, `config.js`, etc.) y suéltala en el recuadro de Netlify Drop.
4. En 10 segundos, Netlify te dará un enlace público (ejemplo: `https://sparkly-galinda-12345.netlify.app`).
5. **(Opcional)** En Netlify, en **Site configuration** -> **Change site name**, puedes cambiar el nombre por algo lindo como: `para-mi-reina-bella.netlify.app`.
6. ¡Envíale el enlace por WhatsApp o con un mensaje especial para que abra su sorpresa de Amor y Amistad!

---

## ✨ Características Especiales Incluidas en la Web:
- **Título Romántico Central**: *"FELIZ DIA DE AMOR Y AMISTAD MI REINA BELLA"*
- **Encuesta Interactiva**: Pregunta sobre el 20 de septiembre de 2026 con opciones `si`, `no`, `SHI` y `ÑO` (con divertidos efectos tipo Galinda si intenta rechazar).
- **Caja de Sugerencias**: Para que ella escriba los antojitos, comidas y juegos que sueña para la cita.
- **Efectos Mágicos de Galinda**:
  - Cursor con polvo de estrellas.
  - Burbujas flotantes que se revientan con sonido de campanillas de hadas (generado con Web Audio, garantizando que siempre suene).
  - Música ambiental de Oz (arpa mágica y campanas activable con un clic).
  - Lookbook de alta costura de Ariana Grande (Glinda) en Wicked.
  - "Popular Masterclass" con el famoso movimiento de cabello (*hair toss*).
  - Credencial oficial de Shiz University que ella puede personalizar con su nombre y descargar.

