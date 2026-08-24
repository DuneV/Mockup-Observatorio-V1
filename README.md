# Observatorio de Salud Pública — Uniandes (gráficos en React + filtro por biológico + rol administrador)

Sitio en React (Vite) que replica el contenido del [Observatorio de Salud
Pública y Epidemiología](https://medicina.uniandes.edu.co/es/investigacion/observatorio-salud-publica)
de la Facultad de Medicina, con un diseño de dashboard limpio y organizado
por componentes.

**Esta variante reemplaza el visor embebido de Power BI por un dashboard
100% construido con componentes de React** usando [Recharts](https://recharts.org/),
con un filtro interactivo por biológico y un rol de **administrador** que
puede actualizar los datos subiendo un Excel.

> Los datos usados aquí son **ilustrativos**, estructurados según las
> categorías de indicadores que describe el Observatorio, para que el
> dashboard tenga forma real. En producción, el administrador reemplaza
> esos valores subiendo su propio Excel — no hace falta tocar código.

## Banner de inicio: invitado vs. administrador

Al entrar al sitio aparece un banner (`RoleGate`) para elegir cómo
navegar. **El motivo de tener dos roles es simple: el visor de indicadores
necesita alguien que lo mantenga actualizado, y no siempre esa persona
sabe programar.**

- **Invitado** — acceso de solo lectura a todo el sitio: visor, boletines,
  objetivos, contacto. Es el modo por defecto para cualquier visitante.
- **Administrador** — todo lo del invitado, más un panel para **subir un
  Excel (.xlsx)** y refrescar coberturas, metas, proyecciones y demás
  indicadores del dashboard sin editar ni una línea de código. Se entra
  con un código de acceso (`OBSERVATORIO2026` por defecto, configurable en
  `src/context/RoleContext.jsx`).

  > Ese código es solo una barrera de uso en el navegador para esta demo,
  > **no es autenticación real**. Para producción, reemplázalo por un login
  > contra un backend (por ejemplo, el sistema de usuarios de la
  > Universidad) antes de exponer el sitio públicamente.

El rol elegido se puede cambiar en cualquier momento con el botón
"Cambiar" del encabezado, sin recargar la página.

## Actualizar datos como administrador

Desde el panel de administrador (visible arriba del visor cuando el rol es
"Administrador") se puede:

1. **Descargar la plantilla** — genera un `.xlsx` con los datos actuales
   del dashboard, ya en el formato correcto, para editarlo en Excel/Sheets.
2. **Subir un Excel** — lee el archivo en el navegador (no se envía a
   ningún servidor) y actualiza el dashboard al instante.
3. **Restablecer** — vuelve a los datos de ejemplo originales.

El archivo puede traer una o varias de estas hojas — todas opcionales,
así que subir solo una no borra las demás:

| Hoja | Columnas | Actualiza |
|---|---|---|
| `Cobertura` | Biologico, Territorio, Cobertura | Gráfico de cobertura por territorio |
| `Meta` | Biologico, Avance, PoblacionObjetivo, Corte | Gauge de meta de vacunación |
| `Proyeccion` | Mes, Influenza, FiebreAmarilla, VPH, TripleViral, Proyectado | Proyección a fin de año |
| `Frontera` | Biologico, Municipio, Frontera, Nacional | Cobertura en zonas de frontera |
| `Semaforizacion` | Categoria, Estado, Valor, Biologico | Semaforización de cumplimiento |
| `VirusRespiratorios` | Semana, Influenza, VSR, COVID | Circulación de virus respiratorios |
| `EventosInmunoprevenibles` | Evento, Casos, Tendencia | Eventos inmunoprevenibles |

Notas sobre el formato:
- Los nombres de columna no distinguen mayúsculas/minúsculas ni tildes.
- `Biologico` acepta el id (`influenza`) o la etiqueta (`Influenza`, `Fiebre amarilla`, `VPH`, `Triple viral`).
- `Estado` acepta `Verde`/`Ambar`/`Rojo` (o `green`/`amber`/`red`).
- `Tendencia` acepta `Sube`/`Estable`/`Baja` (o `up`/`stable`/`down`).
- `Proyectado` acepta `Si`/`No`, `TRUE`/`FALSE` o `1`/`0`.
- Filas con datos incompletos se omiten y se listan en el panel después de subir el archivo.

Toda esta lógica vive en `src/lib/excelSchema.js` (lectura/escritura del
`.xlsx` con [SheetJS](https://sheetjs.com/)) y `src/context/DashboardDataContext.jsx`
(estado en memoria que consumen los gráficos). La librería `xlsx` se carga
de forma perezosa (`import()` dinámico), así que un invitado que nunca
sube archivos no paga ese peso en el bundle inicial.

## Filtro por biológico

El visor de Power BI del Observatorio permite filtrar sus indicadores por
biológico (influenza, fiebre amarilla, VPH, etc.). Esta variante reproduce
ese comportamiento con un componente `BiologicoSelector`:

- Al elegir un biológico, **cambia el color** de las barras, la línea y el
  gauge de los gráficos que dependen de él (cada biológico tiene un color
  fijo definido en `dashboardData.js`).
- También **cambian los valores**: cobertura por territorio, meta de
  vacunación y cobertura en frontera se recalculan para el biológico
  seleccionado — usando los datos que haya cargado el administrador, o los
  de ejemplo si nadie ha subido nada todavía.
- En la proyección a fin de año, la línea del biológico elegido se resalta
  (más gruesa y opaca) mientras las demás se atenúan.
- En la semaforización de cumplimiento, la categoría asociada al biológico
  elegido queda con un contorno de su color.

Los gráficos de circulación de virus respiratorios y eventos
inmunoprevenibles no se filtran por biológico, porque son indicadores de
vigilancia epidemiológica, no de cobertura vacunal — igual que en el
Observatorio original. Sí se actualizan al subir un Excel.

## Concepto de diseño

El motivo visual del sitio es el **semáforo epidemiológico**: el mismo
lenguaje de "semaforización de coberturas de vacunación" que usa el
Observatorio se convierte en la firma estructural de la página (marca,
listas de estado del visor, separadores), en vez de un acento decorativo
genérico.

- **Tipografía:** Fraunces (display) + Inter (texto) + JetBrains Mono (datos/etiquetas).
- **Color:** navy institucional (`--ink`), papel cálido (`--paper`) y teal
  primario (`--teal`), con los tres tonos de estado verde/ámbar/rojo.

## Estructura del proyecto

```
observatorio-salud-publica-charts-biologico/
├── .github/
│   └── workflows/
│       └── deploy.yml             # build + deploy automático a GitHub Pages
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                       # RoleProvider + gate + DashboardDataProvider
    ├── index.css                     # tokens de diseño y estilos globales
    ├── context/
    │   ├── RoleContext.jsx            # rol invitado/administrador
    │   └── DashboardDataContext.jsx   # datos del dashboard en memoria (mezclables con Excel)
    ├── lib/
    │   └── excelSchema.js             # parseo/generación del Excel (SheetJS, carga perezosa)
    ├── data/
    │   ├── content.js                 # todo el contenido textual, separado de la UI
    │   └── dashboardData.js           # biológicos + dataset semilla del dashboard
    └── components/
        ├── RoleGate.jsx / .css         # banner de inicio: invitado vs. administrador
        ├── AdminDataPanel.jsx / .css   # subir/descargar Excel (solo administrador)
        ├── Header.jsx / .css           # incluye el indicador de rol y "Cambiar"
        ├── Hero.jsx / .css
        ├── About.jsx / .css
        ├── Dashboard.jsx / .css        # estado del filtro + arma el grid de gráficos
        ├── BiologicoSelector.jsx / .css # tabs para elegir el biológico
        ├── charts/
        │   ├── ChartCard.jsx / .css             # tarjeta contenedora común
        │   ├── charts-shared.css                # tooltip, footnote, gauge
        │   ├── CoverageByTerritoryChart.jsx      # cobertura por territorio (filtra + recolorea)
        │   ├── BiologicoGoalChart.jsx            # meta de vacunación (gauge, filtra + recolorea)
        │   ├── ComplianceSemaphoreChart.jsx      # semaforización (resalta el biológico activo)
        │   ├── YearEndProjectionChart.jsx        # proyección a fin de año (resalta línea activa)
        │   ├── BorderCoverageChart.jsx           # cobertura en frontera (filtra + recolorea)
        │   ├── RespiratoryVirusChart.jsx         # circulación de virus respiratorios
        │   └── ImmunopreventableEventsChart.jsx  # eventos inmunoprevenibles
        ├── Objectives.jsx / .css    # objetivos del observatorio (1–5)
        ├── VaccinationScope.jsx / .css
        ├── Bulletins.jsx / .css     # boletines + memorias
        ├── Contact.jsx / .css
        └── Footer.jsx / .css
```

Todos los gráficos reciben sus datos por props desde `Dashboard.jsx`, que
los lee de `useDashboardData()`. Ningún componente de gráfico importa
datos "quemados" — así que tanto el filtro por biológico como la subida
de Excel terminan afectando exactamente a los mismos gráficos.

## Cómo correrlo

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # genera /dist para producción
```

## Desplegar en GitHub Pages

El proyecto ya incluye `.github/workflows/deploy.yml`, que compila y publica
el sitio automáticamente cada vez que se hace push a `main`.

1. **Crea el repositorio en GitHub** (vacío, sin README ni .gitignore).
2. **Sube el proyecto:**

   ```bash
   cd observatorio-salud-publica-charts-biologico
   git init
   git add .
   git commit -m "Primer commit"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```

3. **Activa Pages en el repo:** Settings → Pages → en "Build and deployment",
   elige **Source: GitHub Actions**. No hace falta elegir una rama ni una
   carpeta — el workflow se encarga de todo.
4. Espera a que termine el workflow en la pestaña **Actions** (tarda
   1–2 minutos). El sitio queda publicado en
   `https://TU-USUARIO.github.io/TU-REPO/`, y el link exacto también
   aparece en el resumen del deployment dentro de Actions.

Cada push posterior a `main` vuelve a desplegar automáticamente. El
`vite.config.js` ya usa rutas relativas (`base: './'`), así que **no hace
falta editar nada** aunque el repo tenga cualquier nombre.

> Nota: GitHub Pages sirve el sitio como archivos estáticos. El panel de
> administrador (subir/descargar Excel) sigue funcionando porque todo el
> procesamiento ocurre en el navegador — no depende de un backend. Lo único
> que no persiste entre visitas es el estado: si alguien sube un Excel, el
> cambio se ve mientras esa pestaña esté abierta, pero al recargar vuelve
> a los datos de ejemplo (no hay base de datos detrás). Para persistencia
> real habría que agregar un backend o una base de datos.

## Contenido

El texto e enlaces (boletines, objetivos, alcance del observatorio regional
de vacunación, memorias, contacto) fueron tomados directamente de la página
del Observatorio de Salud Pública de la Facultad de Medicina de la
Universidad de los Andes.
