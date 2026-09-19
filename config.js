// ========================================================
// CONFIGURACIÓN DE SUPABASE PARA LA ENCUESTA DE OZ
// ========================================================
// Para conectar tu base de datos de Supabase:
// 1. Crea un proyecto gratuito en https://supabase.com
// 2. Ve a Project Settings -> API
// 3. Copia la "Project URL" y la "anon public key"
// 4. Pégalas aquí abajo entre las comillas.
//
// NOTA: Si aún no tienes las credenciales, ¡no te preocupes!
// La web guardará las respuestas localmente (localStorage) 
// y te permitirá verlas en el panel de administración.
// ========================================================

const SUPABASE_CONFIG = {
  // Reemplaza esto con la URL de tu proyecto de Supabase (ej: 'https://xyzcompany.supabase.co')
  url: 'https://whkvranbxhxzqhiaikol.supabase.co/rest/v1/',

  // Reemplaza esto con tu anon public key de Supabase
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoa3ZyYW5ieGh4enFoaWFpa29sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MjMyNzUsImV4cCI6MjEwNTM5OTI3NX0.2zs8HRQizsLaIYpKr-DJ0hgXOMGDO-AYBoJZQoLYk4Q',

  // PIN secreto para ver las respuestas directamente en la página web
  adminPin: '1034'
};

// Exportar para uso en script.js
window.SUPABASE_CONFIG = SUPABASE_CONFIG;

