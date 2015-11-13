### Boneyard IoC Annotation Manifesto

```
Version: 1.0.0
Description: Initial document draft for Boneyard Annotation Instrumenter.
```

### Scope Types
---
- Module
- Class
- Method
- Field (_Special case for ES5_)
- Setter (_Special case for ES6_)

### Supported Annotations
---

#### @Scan

* Scope: Module
* Parameters:
	* packages `Array` **required** | Array of packages (folders) in which the scanner will parsed annotated source code for instrumentation.

Examples:

```
TODO
```

---
#### @Spec

* Scope: Class
* Parameters:
	* id `String` **required** | _Spec Identifier_
	* include `Array` _optional_ | _Array of parent spec ids_

Examples:

```
@Spec({ id: "main" })
@Spec({ id: "main", include: ["header", "footer", "body"]})
```

---
#### @Bone

* Scope: Class, Method
* Parameters:
	* id `String` **required** | Bone Identifier
	* spec `String` **required** | Spec id in which the bone belongs to.
	* module `String` **required** | Module path or built in Class like Backbone.Model or Backbone.Collection
	* singleton `Boolean` **optional** | Flags the module to create one and only one instance (Default is Non-singleton).
	* params `Array` _optional_ | Optional parameters to pass to the module constructor class.

Examples:

```
@Bone({ id: "mymodel", spec: "main", module: "backbone.model" })
@Bone({ id: "mycollection", spec: "header", module: "backbone.collection", params: [{ key: "value" }] })
@Bone({ id: "mybutton", spec: "main", module: "ui/basic/button", params: [] })
@Bone({ id: "mypanel", spec: "body", module: "ui/misc/panel", params: [$config] })
@Bone({ id: "myservice", spec: "main", module: "my/package/service", singleton: true })
```

---
#### @Inject

* Scope: Method, Field, Setter
* Parameters
	* bone `String` **required** | Bone identifier to inject

Examples:

```
TODO
```

---
#### @Action

* Scope: Module, Class
* Parameters:
	* bone `String` **required** | Bone Identifier
	* method `String` **required** | Bone method to be invoke
	* params `Array` _optional_ | Optional parameters to be passed to the method invokation.

Examples:

```
TODO
```

#### @Json

* Scope: Method
* Parameters:

Examples:

```
TODO
```

---
#### @Plugin

* Scope: Module
* Parameters:
	* name `String` **required** | Plugin name
	* config `Object` **required** | Plugin configuration

Examples:

```
TODO
```

### Special Annotations for future releases

_These set of featured annotation may affect boneyard-ioc core package._

#### @Proxify
#### @Factory
#### @Decorate
