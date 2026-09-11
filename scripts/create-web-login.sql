-- Ejecutar UNA VEZ en el SQL Server que aloja la base MuOnline
-- (en SSMS, o con: sqlcmd -S WORK-PC -E -i scripts\create-web-login.sql)
--
-- Crea un login SQL de bajo privilegio dedicado al sitio web, ya que el
-- driver de Node (mssql) no soporta autenticacion integrada de Windows.
-- IMPORTANTE: reemplaza CAMBIAR_ESTA_CLAVE por una contrasena fuerte propia
-- antes de correrlo, y que coincida con DB_PASSWORD en tu .env.local.

USE master;
GO

IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'mubombazo_web')
BEGIN
    CREATE LOGIN mubombazo_web WITH PASSWORD = 'CAMBIAR_ESTA_CLAVE', CHECK_POLICY = OFF;
END
GO

USE MuOnline;
GO

IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'mubombazo_web')
BEGIN
    CREATE USER mubombazo_web FOR LOGIN mubombazo_web;
    ALTER ROLE db_datareader ADD MEMBER mubombazo_web;
    ALTER ROLE db_datawriter ADD MEMBER mubombazo_web;
END
GO
