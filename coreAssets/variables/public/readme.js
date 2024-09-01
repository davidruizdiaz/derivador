import { removeEmptyLines } from "../auxi.js";

export function genResource(variabilityPoints) {
  const vp = { ...variabilityPoints };
  return removeEmptyLines`
# Cliente web

Documentación del código de la interfaz web del sistema de asistencias que utiliza IA para detectar e identificar personas.

## Modulos de la Interfaz

- **Acceso:** Se encarga de controlar el acceso privilegiado del sistema.
- **ApiConsumer:** realiza las peticiones realizadas a la API del servidor.
- **Asistencias:** submódulo encargado de registrar la asistencia de las personas.
- **Cámara:** submódulo que controla el funcionamiento de la cámara.
- **Consultas:** submódulo que realiza consultas sobre personas registradas en el sistema.
- **Registro:** Encargado de las ABM de los datos de personas en el sistema.
- **Reportes:** Interfaz de reportes de asistencias.
${vp[1]}
`;
}
