# UNMSM - UPG-FISI - Maestría en Ing. de Sistemas e Informática<br/>Mención en Ing. de Software<br/>Examen Final - Tópicos Avanzados de Ing. de Software - 2021-2

## Caso (20 puntos).

La Clínica Veterinaria de la Universidad Nacional Mayor de San Marcos (UNMSM) solicitó a los estudiantes de primer ciclo de la maestría en Ingeniería de Software desarrollar un producto software considerando lo siguiente:

- Los clientes (personas) programan citas para los pacientes (mascotas).
- Los clientes son los que pagan las facturas médicas y llevan a su(s) mascota(s) a la Clínica.
- Las citas puedes ser: Visitas al consultorio o Cirugías.
- Las Visitas al consultorio pueden ser un examen que requiera un médico o una visita técnica.
- Las Visitas al consultorio dependen de la disponibilidad de la sala de exámenes.
- Las Cirugías dependen de la disponibilidad de sala de operaciones, espacio de recuperación y pueden involucrar diferentes tipos de procedimientos.
- Los diferentes tipos de citas y procedimientos requieren personal médico diferente.
- El historial médico, recetas y promociones se envian al celular del cliente via whatsapp y correo electrónico.
- Es posible que un cliente pueda registrar el doctor preferido para su mascota.

La aplicación web, móvil y landing page serán desarrolladas en Flutter.
Los bounded contexts se deben comunicar a través de un bus de mensajería y serán desarrollados en NestJS.

## Pregunta 1.- Elabore un diagrama de contexto según el modelo C4 para el caso planteado. (2 puntos)

## Pregunta 2.- Aplicando los principios de Domain Driven Design, elabore un diagrama de contenedores según el modelo C4. (4 puntos)

## Pregunta 3.- Elabore un diagrama de Event Storming para el caso planteado. (4 puntos)
#### link de acceso https://miro.com/app/board/uXjVOXRxHAY=/
<img src="Event Storming examen final.jpg" alt="Size Limit logo by Anton Lovchikov" width="700" height="500">

## Pregunta 4.- Implemente con NestJS o Axon framework 1 endpoint a nivel de backend (RESTful API) para un Bounded Context Core del Dominio del Problema. Para la base de datos se puede trabajar con datos Mock en memoria. Para NestJS NO es requerido implementar un bus de mensajería. (6 puntos)
en el repositorio se encuentra el código, he terminado con las migraciones, tengo pendientes las apis

## Pregunta 5.- Despliegue en contenedores en una de las plataformas cloud vistas en clase (AWS, Azure o GCP) lo desarrollado en la pregunta 4. (4 puntos)
https://webapi-examenfinal.s3.us-east-2.amazonaws.com/convocatoria

MariaDB
Nombre de usuario maestro
root
Contraseña maestra
12345678 
Punto de enlace
examenfinal.crsvj1zxgap8.us-east-2.rds.amazonaws.com 
