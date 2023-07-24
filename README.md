# Query Builder

- [Query Builder](#quer-builder)
  - [Instalación](#instalación)
  - [Conectarse](#conectarse)
  - [Ejemplos](#ejemplos)
    - [Operación Encontrar](#operación-encontrar)
    - [Operación Registrar](#operación-registrar)
    - [Operación Modificar](#operación-modificar)
    - [Operación Eliminar](#operación-eliminar)

## Instalación

Instale el paquete `build-query` desde la linea de comandos usando npm :

```cmd
$ npm install @gravs/query-builder
```

Luego instale la biblioteca de base de datos apropiada `pg` o `mysql2` :

```cmd
$ npm install pg
$ npm install mysql2
```

## Conectarse

Lo primero que debemos hacer es incluir `@gravs/query-builder` en nuestro proyecto y abrir un conexión a la base de datos de la siguiente manera :

```javascript
const gravs = require("@gravs/build-query");

const config = {
  driver: "postgres", // si esta usando mysql entonces reemplacelo
  config: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "test_app",
  },
};

gravs
  .connect(config)
  .then((ok) => console.log(ok))
  .catch((error) => console.error(error));
```

## Ejemplos

### Operación Encontrar.

Vamos a encontrar en nombre y la raza de todos los cachorros registrados en la entidad `puppy`, para ello usamos el método `find()` :

```javascript
const puppies = await gravs.find({
  entity: "puppy",
  fields: ["name", "race"],
});
```

Si queremos encontrar cachorros solo de la raza 'labrador' utilizaremos filtros y enviaremos los campos vacíos para poder obtener todos los campos de la entidad `puppy` :

```javascript
const puppies = await gravs.find({
  entity: "puppy",
  fields: [],
  filters: { race: "labrador" },
});
```

### Operación Registrar.

Para agregar un cachorro en la entidad `puppy` con el nombre 'aika' utilizamos la método `create()` :

```javascript
await gravs.create({
  entity: "puppy",
  attributes: { _id: 1, name: "aika", race: "labrador" },
  returning: { return: true, fields: [] },
});
```

Si quieres obtener los atributos del cachorro agregado usamos el parámetro `returning` como se muestra a continuación :

```javascript
const puppy = await gravs.create({
  entity: "puppy",
  attributes: { _id: 1, name: "aika", race: "labrador" },
  returning: { return: true, fields: [] },
});
```

### Operación Modificar.

Para modificar la edad de un cachorro de la entidad `puppy` usamos el método `update()` y pasaremos como parámetros el nombre de la entidad y los atributos que se modificaran, ademas enviaremos el código del cachorro que modificaremos :

```javascript
await gravs.update({
  entity: "puppy",
  attributes: { age: 2 },
  filters: { _id: 1 },
});
```

Y si queremos obtener el resultado del cachorro modificado usamos el parámetro `returning` :

```javascript
const puppy = await gravs.update({
  entity: "puppy",
  attributes: { age: 1 },
  filters: { _id: 3 },
  returning: { return: true, fields: [] },
});
```

### Operación Eliminar.

Para eliminar un cachorro de la base de datos debemos usar el método `remove()` en donde pasaremos en nombre de la entidad `puppy` junto con el código del cachorro que queremos eliminar :

```javascript
await gravs.remove({
  entity: "puppy",
  filters: { _id: 2 },
});
```

Y para obtener el cachorro eliminado usamos `returning` para devolver los atributos del cachorro eliminado :

```javascript
const puppy = await gravs.remove({
  entity: "puppy",
  filters: { _id: 4 },
  returning: { return: true, fields: [] },
});
```
