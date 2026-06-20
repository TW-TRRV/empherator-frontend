# Documentación del Proyecto: Empherator

## Introducción
Este proyecto es una aplicación full-stack para una tienda de venta de componentes de PC, construida con **Laravel (Backend)**, **React con InertiaJS (Frontend)**, **Vite**, **TypeScript** y **Tailwind CSS**. Sigue un enfoque "mobile-first" y utiliza una base de datos SQLite para el almacenamiento.

Esta documentación detalla de forma exhaustiva la funcionalidad de los archivos, modelos, controladores y componentes visuales del sistema, incluyendo sus variables y procedimientos principales.

---

## 1. Estructura General y Configuración

### 1.1 Archivos de Configuración Principal
- **`package.json`**: Gestiona las dependencias del frontend (React, Vite, Tailwind). Está configurado como `"type": "module"`.
- **`vite.config.js`**: Configura Vite con el plugin de Laravel y React. Empaqueta los archivos a la carpeta `public/build`.
- **`routes/web.php`**: Archivo de enrutamiento principal de Laravel. Utiliza la sintaxis de array para los Controladores en lugar de Closures, y se conecta con InertiaJS para renderizar los componentes React (Ej: `[ProductController::class, 'catalog']`).

---

## 2. Modelos de Base de Datos (`app/Models/`)
La base de datos utiliza tablas en singular (ej. `product` en lugar de `products`).

### 2.1 `Product.php`
Modelo que representa un producto principal en el catálogo.
- **Variables / Atributos**: `id`, `category`, `subcategory`, `name`, `description`, `base_price` (precio base del producto), `isglobalshippingavailable` (booleano), `warrantytime`, `spec_title_1` a `spec_title_3`, `spec_value_1` a `spec_value_3`, `benchmark_label`, `benchmark_score`, `default_images`, `is_featured`.
- **Relaciones (Procedimientos)**:
  - `product_variants()`: Relación 1:N. Un producto puede tener múltiples variantes (ej. colores, modelos específicos).
  - `reviews()`: Relación 1:N. Un producto tiene muchas reseñas.

### 2.2 `ProductVariant.php`
Modelo que representa una variante específica de un producto (SKU).
- **Variables / Atributos**: `id`, `product_id`, `sku`, `variant_name`, `price_override` (anula el precio base si no es nulo), `stock_quantity`, `images`.
- **Relaciones**:
  - `product()`: Relación N:1. Retorna el producto padre.
  - `order_items()`: Relación 1:N con los elementos de los pedidos.

### 2.3 `Order.php` y `OrderItem.php`
- **`Order.php`**: Representa un pedido de compra. Contiene el `user_id` (si está logueado), `guest_email`, `total_amount` (monto total) y `status`.
  - Relaciones: `user()`, `order_items()`.
- **`OrderItem.php`**: Detalles individuales dentro de un pedido. Contiene `order_id`, `variant_id`, `quantity` y `price_at_purchase` (precio al momento de la compra para evitar cambios retroactivos).

### 2.4 `User.php`
Modelo de usuario del sistema (clientes y administradores).
- **Variables / Atributos**: `id`, `email`, `password_hash`, `full_name`, `role` (rol del usuario).
- **Relaciones**:
  - `orders()`: Relación 1:N con sus pedidos.

---

## 3. Controladores Backend (`app/Http/Controllers/`)

### 3.1 `ProductController.php`
Controlador para gestionar la visualización de productos para los clientes.
- **Funciones principales**:
  - `catalog(Request $request)`: Obtiene todos los productos de la base de datos (con filtrado opcional por `category`) y los envía a InertiaJS renderizando la página `Catalog`.
  - `show($id)`: Consulta un producto por su `$id`, incluyendo de forma impaciente (`with`) sus variantes (`product_variants`). Renderiza la página `Product`.

### 3.2 `AdminProductController.php`
Controlador para la gestión administrativa del catálogo de productos.
- **Funciones principales**:
  - `index()`: Renderiza el panel de administración listando todos los productos y variantes.
  - `store(Request $request)`: Valida la solicitud entrante y guarda un nuevo producto junto a sus variantes y metadatos de imagen (JSON) en la base de datos.
  - `update(Request $request, $id)`: Valida y actualiza los datos de un producto y sus variantes. Sincroniza las variantes (crea nuevas, actualiza existentes, elimina no presentes).
  - `destroy($id)`: Elimina el producto especificado de la base de datos.

### 3.3 `CartController.php`
Controlador para la visualización del carrito de compras.
- **Funciones principales**:
  - `index()`: Consulta únicamente los precios desde la base de datos (`Product::pluck('base_price', 'id')` y `ProductVariant::pluck('price_override', 'id')`) para inyectarlos de forma segura en Inertia. Esto asegura que los precios mostrados en el carrito provengan del servidor y no sean manipulados en el cliente local (Local Storage).
  - `checkoutSuccess()`: Renderiza la pantalla de éxito tras completar la compra.

### 3.4 `AuthController.php` y `PageController.php`
- **AuthController**: Contiene funciones `login()` y `register()` que devuelven las vistas de Inertia correspondientes.
- **PageController**: Contiene la función `home()`, la cual consulta los productos destacados (`where('is_featured', true)`) y renderiza la vista `Home`.

---

## 4. Frontend: React, InertiaJS y Tailwind (`resources/js/`)

### 4.1 Páginas Principales (`Pages/`)
- **`Home.tsx`**: Página de inicio. Carga componentes estáticos, Hero y productos destacados recibidos vía props de Inertia.
- **`Catalog.tsx`**: Página de catálogo. Muestra una grilla interactiva de los productos disponibles. Recibe `products` y `currentCategory`.
- **`Product.tsx`**: Página de detalle de producto.
  - **Procedimiento / Lógica**: Permite al usuario seleccionar una variante específica (si el producto tiene variantes). Muestra el precio base o el `price_override` de la variante seleccionada de manera dinámica. Gestiona el agregado de ítems al carrito usando `LocalStorage`, agrupando los ítems por `product_id` y `variant_id`.
- **`Cart.tsx`**: Página de carrito de compras.
  - **Procedimiento / Lógica**: Lee los ítems del LocalStorage. Utiliza las props `productPrices` y `variantPrices` provenientes del Backend para calcular de forma segura el subtotal y total de la compra. Permite cambiar cantidades y eliminar ítems efímeros.

### 4.2 Componentes (`Components/`)
- **`Navbar.tsx`**: Barra de navegación superior.
  - **Lógica**: Utiliza estado de React (`useState`) para manejar la apertura del menú móvil, el menú expandido ancho y un overlay de búsqueda interactivo. Utiliza `<Link>` de InertiaJS para navegación sin recarga de página completa.
- **`Footer.tsx`**: Pie de página de la web con enlaces estáticos.
- **`FeaturedProducts.tsx`**: Componente que itera sobre los productos recibidos y los muestra en tarjetas estilizadas.

---

## 5. Decisiones de Diseño y Patrones Claves
1. **InertiaJS Link**: Todos los botones de navegación interna utilizan el componente `<Link/>` de InertiaJS para habilitar las transiciones SPA (Single Page Application).
2. **Precios Seguros en Carrito**: El carrito en el frontend solo mantiene referencias (IDs) y cantidades. El cálculo visual de precios utiliza un listado seguro cargado desde el servidor en la renderización para evitar fraudes en el cálculo total antes de proceder al pedido final.
3. **Manejo de Imágenes**: Las imágenes principales y galerías se guardan como JSON codificado en las tablas de productos y variantes (`default_images`, `images`).
4. **Diseño Visual**: Usa un esquema de colores personalizado con Tailwind CSS (colores `emph`, `obscure`, `clarity` declarados en el archivo CSS principal o configuración de Tailwind).