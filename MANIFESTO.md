### Boneyard IoC Annotation Manifesto

```
Version: 1.0.0
Description: Initial document draft for Boneyard Annotation Instrumenter.
This document might be subjected to change.
```

### Scope Types
---
- Module
- Class
- Constructor
- Method
- Field

### Supported Annotations
---

#### @Scan (**review**)

* Scope: `Module`
* Parameters:
	* `packages` {_Array_} **required** | Array of packages (folders) in which the scanner will parsed annotated source code for instrumentation.

Examples:

```js
/**
*	@Scan({ packages: ["com.myproject.view", "com.myproject.model"] })
**/
import {Container} from "ui";
...
```

---
#### @Spec

* Scope: `Class`
* Parameters:
	* `id` {_String_} **required** | _Spec Identifier_
	* `include` {_Array_} _optional_ | _Array of parent spec ids_

Examples:

```js
/**
*	@Spec({ id: "configuration" })
**/
class Configuration {
  ...
}
```

```js
/**
*	@Spec({ id: "main", include: ["header", "footer", "body"]})
**/
class ApplicationBootstrap extends Container {
  ...
}
```

---
#### @Bone

* Scope: `Class`
* Parameters:
	* `id` {_String_} **required** | Bone Identifier
	* `spec` {_String_} **required** | Spec id in which the bone belongs to.
	* `module` {_String_} _optional_ | Module path (basepath resolution will use requirejs config)
	* `singleton` {_Boolean_} _optional_ | Flags the module to create one and only one instance (Default is Non-singleton).

Examples:

```js
/**
*	Declaration for registering a bone of type "Account" that extends "Backbone.Model".
*	Bone identifier set to "account".
*	Belongs to Spec "main".
*	Note: Module path will be retrieved automatically based on the file location
*	if not specified manually.
*
*	@Bone({ id: "account", spec: "main" })
**/
class Account extends Backbone.Model {
  ...
}
```

```js
/**
*	Declaration for registering a bone of type "Addresses" that extends "Backbone.Collection".
*	Bone identifier set to "addresses".
*	Belongs to Spec "account".
*	Module is manually set to retrieve class constructor on specific location.
*
*	@Bone({ id: "addresses", spec: "account", module: "myproject/collections/addresses" })
**/
class Addresses extends Backbone.Collection {
  ...
}
```

```js
/**
*	Declaration for registering a bone of type "UserService" that extends "Service".
*	Bone identifier set to "userService".
*	Belongs to Spec "user".
*	Module is manually set to retrieve class constructor on specific location.
*	Flag class to resolve instanciation as a singleton (Multiple injects will reference same instance)
*
*	@Bone({ id: "userService", spec: "user", module: "myproject/service/user-service", singleton: true })
**/
class UserService extends Service {
  ...
}
```

---
#### @Wire (**Review**)

**Note: This may affect $params special annotation when multiple params are passed**

* Scope:
	* `Constructor`
	* `Field`
* Parameters
	* `bone` {_String_} **required** | Bone identifier to inject
	* `on` {_String_} _optional_ | Will work for injections on constructors (Es5/Es6) and also in constructors/setters for Es6.
    **This parameter will be automatically wired on scope field for Es5.**
	* `name` {_String_} _optional_ | Optionally specified the property name the bone will be passed as part of the `on` object name

Examples:

**ES5:**

```js
/**
*	Scope: Constructor
*	@Wire({ id: "myconfig", on: "config" })
**/
constructor: function(config, other) {
  this.config = config;
  ...
}
```

```js
/**
*	Scope: Field
*	Will execute as @Action (Assignment)
*	@Wire({ id: "search" })
**/
search: null,

initialize: function(attrs) {
  this.search.render();
  ...
}
```

**ES6:**

```js
/**
*	Scope: Constructor
*	@Wire({ id: "mymodel", on: "attrs", name: "model" })
**/
constructor(attrs) {
  this.model = attrs.model; // <- "[on].[name]" -> mymodel"
  ...
}
```

```js
/**
*	Scope: Field (Setter)
*	Will execute as @Action (Assignment)
*	@Wire({ id: "mymodel", on: "model" })
**/
set value(model) {
  this.property = model.get('value');
}
```

---
#### @Action (**Review**)

- Notes: Resolve multiple instances resolution in order to implement this

* Scope: `Method`
* Parameters:
	* `bone` {_String_} **required** | Bone Identifier
	* `method` {_String_} **required** | Bone method to be invoke
	* `params` {_Array_} _optional_ | Optional parameters to be passed to the method invocation.

Examples:

```js
/**
*	Action Declaration to execute the method "fetch" on the bone "user"
*	@Action({ bone: "user", method: "fetch" })
**/
class User extends Backbone.Model {
  ...
}
```

```js
/**
*	Action Declaration to execute the method "fetch" on the bone "user"
*	with params passed to the method "render".
*	@Action({ bone: "application", method: "render", params:[{ method: "after", target: "div.menu" }] })
**/
class Application extends Container {
  ...
}
```

---
#### @ListenTo (**Review**)

Specific use of annotation **@Action** to start listening for events on instances of a given class.

* Scope: `Method`
* Parameters:
	* `events` {_String_} **required** | list of events
	* `from` {_String_} **required** | source on which the event is being fire
	* `handler` {_String_} **required** | name of the current instance method that will handle the event.

Examples:

```js
class Grid extends Table {

  /**
  *	@Wire({ id: "elements", on: "attrs", name: "collection" })
  **/
  constructor(attrs) {
    // Backbone automatically assign attrs.collection to this.collection (Backbone.View)
    this.collection.reset();
  }

  /**
  * Update Grid when add or remove event from Elements Backbone.Collection is fired
  * @ListenTo({ events: "add,remove", from: "collection", handler: "update" })
  **/
  update() {
    this.collection.each(function(element) {
      this.doSomething(element);
      ...
    })
    ...
  }

}
```

---
#### @Json (**Review**)

Specific use of annotation **@Bone** for objects that don't need to be instanciated.

* Scope: `Module`
* Parameters:
	* `id` {_String_} **required** | Bone Identifier
	* `spec` {_String_} **required** | Spec id in which the bone belongs to.

Examples:

```js
/**
*	Similar to @Bone annotation
*	@Json({ id: "myconfiguration", spec: "config" });
**/
var MyConfiguration = {
  key1: "value1",
  key2: "value2",
  ...
};

exports default MyConfiguation;
```

---
#### @Plugin (**Review**)

* Scope: `Module`
* Parameters:
	* `name` {_String_} **required** | Plugin name
	* `config` {_Object_} **required** | Plugin configuration

Examples:

```js
/**
*	@Plugin({ name: "themes", config: "$bone!theme_config" })
*	@Plugin({ name: "html", config: { basePath: "$bone!html_basepath", packages: "$bone!packages" } })
**/
import Container from 'ui/container';
...
```

---
### Special Annotations for future releases

_These set of featured annotation may affect boneyard-ioc core package._

#### @Proxify
#### @Factory
#### @Decorate
