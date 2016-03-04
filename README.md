Lib-MD
==========

Conjunto de librerías para aplicaciones basadas en AngularJS y Material Design
* [AngularJS](github.com/angular/angular.js)
* [Angular Material](https://material.angularjs.org)

Prerequisitos
-----
* [Client GIT](https://git-scm.com/download/win)
* [Node.JS](https://nodejs.org/en/download/)
* Instalar Bower
```bash
npm install -g bower
```
* Instalar grunt
```bash
npm install -g grunt-cli
```

Cómo compilar
------

1. Clonar (descargar) el repositorio
 ```bash
git clone https://github.com/hospitalneuquen/lib-md.git
```

2. Instalar dependencias de Node
 ```bash
npm install
```

3. Instalar dependencias de Bower
 ```bash
bower install
```
4. Compilar la librería
 ```bash
grunt
```

Cómo realizar cambios
-----
Si se realizan cambios en los archivos `.less` o `.js` puede utilizarse la tarea watch para facilitar la compilación:
```bash
grunt watch
```

Generar documentación
---

Documentar los componentes Angular utilizando [ng-doc](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation).

La primera vez preparar el proyecto:

```bash
cd docs
bower install

cd docs
bower install
npm install
```

Compilar con gulp:

```bash
cd docs\docs
gulp
```

Para facilitar las tareas de documentación puede iniciarse un servidor local que utiliza [BrowserSync](https://www.browsersync.io/):
```bash
cd docs\docs
gulp docs:serve
```
