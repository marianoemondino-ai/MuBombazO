# MuBombazo - Sitio Web

Sitio oficial de MuBombazo (MU Online Season 6 Episodio 3): inicio, descargas,
ranking en vivo, invasiones/eventos, roadmap, battle pass, registro/login de
cuentas y donaciones. Construido con Next.js 16 (App Router) + SQL Server.

## 1. Configuracion local (PC del server, mientras no hay hosting)

### 1.1. Crear el login de base de datos

El driver de Node (`mssql`) no soporta autenticacion integrada de Windows, asi
que la web necesita un login SQL propio. Correr **una sola vez**, en SSMS o
`sqlcmd`, el script `scripts/create-web-login.sql`. Reemplaza el placeholder
de contrasena por una propia antes de correrlo, y usa el mismo valor en
`DB_PASSWORD` de tu `.env.local` (no versionado).

```bash
sqlcmd -S WORK-PC -E -i scripts\create-web-login.sql
```

### 1.2. Habilitar TCP/IP en SQL Server

Hoy SQL Server **no** esta escuchando en el puerto 1433 (solo acepta
conexiones locales por otros medios). Para que la web (y luego el VPS de
Contabo) se puedan conectar:

1. Abrir **SQL Server Configuration Manager**.
2. `SQL Server Network Configuration` -> `Protocols for MSSQLSERVER` (o el
   nombre de tu instancia) -> habilitar **TCP/IP**.
3. Doble clic en TCP/IP -> pestana `IP Addresses` -> en `IPAll`, poner
   `TCP Port = 1433` (dejar `TCP Dynamic Ports` vacio).
4. Reiniciar el servicio de SQL Server.
5. Abrir el puerto 1433 en el Firewall de Windows (regla de entrada, TCP).

### 1.3. Variables de entorno

Crear `.env.local` (no versionado) con, entre otras:

- `DB_SERVER=127.0.0.1` (la web corre en la misma PC que el SQL Server)
- `GAMESERVER_HOST=26.195.10.121` (tu IP de Radmin VPN) y
  `GAMESERVER_PORT=44405` (puerto del ConnectServer, confirmado en
  `ConnectServer.ini`) - esto alimenta el badge de servidor online/offline.

### 1.4. Correr en desarrollo

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

## 2. Deploy en Contabo (cuando compres el hosting)

1. **Servidor**: Ubuntu 22.04+ recomendado. Instalar Node.js 20+, `pm2` y
   `nginx`.
2. **Clonar el repo** y `npm install && npm run build`.
3. **Variables de entorno** (`.env.local` o variables del sistema):
   - `DB_SERVER` -> IP publica (o privada, si el SQL Server esta en la misma
     red) del server MuOnline. Si el SQL Server sigue en la PC de Windows,
     necesitas exponer el puerto 1433 a internet (con cuidado - restringir
     por IP de origen en el firewall a la IP del VPS) o correr la base en el
     propio VPS.
   - `GAMESERVER_HOST` / `GAMESERVER_PORT` -> IP publica y puerto del
     ConnectServer.
   - `SESSION_SECRET` -> generar uno nuevo para produccion
     (`openssl rand -base64 32`), distinto al de desarrollo.
4. **Proceso**: `pm2 start npm --name mubombazo-web -- start`.
5. **Nginx**: reverse proxy de tu dominio (puerto 443 con Let's Encrypt/
   certbot) hacia `localhost:3000`.
6. Actualizar el DNS del dominio comprado para que apunte al VPS.

Osea: el unico cambio real al migrar es actualizar `DB_SERVER`,
`GAMESERVER_HOST` y `SESSION_SECRET` en las variables de entorno del VPS.

## 3. Contenido pendiente de completar

Estos archivos tienen valores marcados `TODO` que hay que completar a mano
antes de publicar (no se inventaron datos que no estaban confirmados):

- `src/content/site.ts` - fecha de apertura, link de descarga del cliente,
  links de redes sociales, algunos rates (reset, max stats), fechas del
  roadmap.
- `src/content/events.ts` - horarios exactos de cada evento/invasion.
- `src/content/packages.ts` - precios reales de los paquetes de donacion.

## 4. Limitaciones conocidas

- **Contrasenas en texto plano**: `MEMB_INFO.memb__pwd` se guarda sin hash
  porque el server tiene `MD5Encryption = 0` en `JoinServer.ini` - el cliente
  del juego compara la contrasena en texto plano contra esa columna. Cambiar
  esto requiere tocar la config del emulador (`MD5Encryption = 1`), que queda
  fuera del alcance de la web.
- **Donaciones**: la pagina esta lista con paquetes y muestra el historial
  real de `LOG_CREDITOS`, pero no procesa pagos todavia. Hay que elegir un
  proveedor (Mercado Pago, PayPal, etc) y conectar sus credenciales.
