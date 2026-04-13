# Scan App Pro v2

## Features
- Offline-first PWA
- Supabase auth
- Cloud sync
- Conflict banner system
- Basic version history
- Real-time updates

## Setup
1. Replace SUPABASE_URL and KEY
2. Create table `records`
3. Enable realtime
4. Host on GitHub Pages

## Table schema
id uuid
user_id text
text text
notes text
tags jsonb
updated_at bigint
version int
# scan-app-pro-v2
# scan-app-pro-v2
