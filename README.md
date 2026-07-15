# Tienda Vemaro

En este proyecto diseño la página web de mi emprendimiento de velas aromáticas y decoración.

## Descripción

El sitio permite visualizar los productos con su descripción y precio en una tabla,
navegar entre las secciones Home, Tienda y Contacto, y conocer la marca.

## Tecnologías usadas

- HTML5 semántico (header, nav, main, section, footer)
- CSS3 (Flexbox, Grid, media queries, selectores de clase, modelo de caja, unidades relativas)
- JavaScript (variables, objetos y arrays, funciones, manipulación del DOM y eventos)

## Funcionalidad de JavaScript

- El catálogo de productos se guarda como un array de objetos y se
  renderiza dinámicamente en el DOM con `createElement`/`appendChild`.
- Cada tarjeta tiene un botón "Ver descripción" que muestra u oculta
  el detalle del producto (sin duplicar contenido).
- Cada tarjeta tiene un botón "Agregar al carrito" que suma el producto
  a un array `carrito` y actualiza el contador en el header.
- Los eventos de los botones se manejan con **delegación de eventos**
  sobre el contenedor padre, ya que las tarjetas se crean dinámicamente.
