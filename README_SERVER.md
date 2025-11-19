# Servidor de Automatización FaceSpot (Backend)

Este servidor es necesario para que la aplicación web pueda realizar las descargas reales de Facebook y el procesamiento de audio.

## Requisitos Previos

1.  **Python 3.9 o superior**: [Descargar Python](https://www.python.org/downloads/)
2.  **FFmpeg**: Es vital para convertir video a audio.
    *   *Windows*: Descargar e instalar, o usar `winget install ffmpeg`.
    *   *Mac*: `brew install ffmpeg`.

## Instalación

1.  Abre una terminal (Símbolo del sistema / PowerShell) en esta carpeta.
2.  Instala las dependencias:
    ```bash
    pip install -r requirements.txt
    ```

## Ejecutar el Servidor

1.  En la terminal, ejecuta:
    ```bash
    python backend_server.py
    ```
2.  Verás un mensaje indicando que el servidor corre en `http://localhost:8000`.

## Conectar con la Web App

1.  Ve a tu aplicación web FaceSpot Bridge.
2.  Haz clic en el icono de **Configuración (Engranaje)** arriba a la derecha.
3.  En URL del Servidor, escribe: `http://localhost:8000`.
4.  ¡Listo! Ahora al procesar un video, se descargará en la carpeta `downloads/` de este directorio.
