// ========================================================
// CONFIGURACIÓN DE SUPABASE PARA LA ENCUESTA DE OZ
// ========================================================

const SUPABASE_CONFIG = {
  // URL base de tu proyecto de Supabase (sin /rest/v1/)
  url: 'https://whkvranbxhxzqhiaikol.supabase.co',

  // Tu anon public key de Supabase
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoa3ZyYW5ieGh4enFoaWFpa29sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MjMyNzUsImV4cCI6MjEwNTM5OTI3NX0.2zs8HRQizsLaIYpKr-DJ0hgXOMGDO-AYBoJZQoLYk4Q',

  // PIN secreto para ver las respuestas directamente en la página web
  adminPin: '2026'
};

// Exportar para uso en script.js
window.SUPABASE_CONFIG = SUPABASE_CONFIG;
