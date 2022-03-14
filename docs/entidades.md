## Entidades:

### Usuario

- id\*
- username: String\*
- pass: String
- nombre: String
- apellidos: String
- roles: Array (Enum ("Administrador" | "Coordinador de calidad" | "Asesor de calidad" | "Encargado de proyecto" | "Revisor")

### Artefacto

- id\*
- name: String\*
- descripcion: String
- fase: String (Inicio | Ejecución | Cierre)
- disciplina: String (Modelado del negocio | Requisitos | Análisis y diseño | Implementación | Pruebas | Despliegue)

### Hallazgo

- id\*
- productoAf: String
- ubicacion: String
- descripcion: String
- impacto: String (Bajo | Medio | Alto)
- date: Date

### Minuta de reunión

- id\*
- nombreP: String
- revisor: Usuario
- encargado: Usuario
- acuerdos: String

### Reporte técnico

- id\*
- name: String\*
- estado: String (Creado | Abortado | Revisado)
- revisor: Usuario
- local: String
- fechaI: Date
- fechaC: Date
- descripcion: String
