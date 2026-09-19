-- ========================================================
-- TABLA DE RESPUESTAS PARA LA ENCUESTA DE AMOR Y AMISTAD
-- ========================================================
-- Copia y pega todo este código en el "SQL Editor" de tu proyecto de Supabase
-- y luego haz clic en "RUN". ¡Tarda menos de 5 segundos!

-- 1. Crear la tabla de respuestas
create table if not exists love_survey_responses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  answer text not null,                -- 'si', 'no', 'SHI', 'ÑO'
  recommendations text,               -- Comida, juegos, ideas sugeridas
  author_name text default 'Mi Reina Bella',
  user_agent text                     -- Información técnica del dispositivo (opcional)
);

-- 2. Habilitar la seguridad de nivel de fila (Row Level Security - RLS)
alter table love_survey_responses enable row level security;

-- 3. Permitir que cualquier persona pueda enviar su respuesta anónimamente desde la web
create policy "Permitir envíos anónimos" 
  on love_survey_responses 
  for insert 
  with check (true);

-- 4. Permitir lectura para que el panel de administración web pueda mostrar los resultados
create policy "Permitir lectura de respuestas" 
  on love_survey_responses 
  for select 
  using (true);

-- ¡Listo! Ya tu base de datos recibirá y almacenará todas las respuestas.

