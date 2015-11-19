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
#### @spec

* Scope: `Class`
* Parameters:
	* `id` {_String_} **required** | _Spec Identifier_
	* `include` {_Array_} _optional_ | _Array of parent spec ids_

Examples:

```js
/**
*	@spec({ id: "configuration" })
**/
class Configuration {
  ...
}
```

```js
/**
*	@spec({ id: "main", include: ["header", "footer", "body"]})
**/
class ApplicationBootstrap extends Container {
  ...
}
```

---
#### @bone

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
*	@bone({ id: "account", spec: "main" })
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
*	@bone({ id: "addresses", spec: "account", module: "myproject/collections/addresses" })
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
*	@bone({ id: "userService", spec: "user", module: "myproject/service/user-service", singleton: true })
**/
class UserService extends Service {
  ...
}
```

---
#### @wire (**Review**)

**Note: This may affect $params special annotation when multiple params are passed**

* Scope:
	* `Constructor`
	* `Field`
* Parameters
	* `id` {_String_} **required** | Bone identifier, or
	* `bones` {_String_} **required** | List of bones identifiers as string with format comma separated
	* `on` {_String_} _optional_ | Will work for injections on constructors (Es5/Es6) and also in constructors/setters for Es6.
    **This parameter will be automatically wired on scope field for Es5.**
	* `name` {_String_} _optional_ | Optionally specified the property name the bone will be passed as part of the `on` object name

Examples:

**ES5:**

```js
/**
*	Scope: Constructor
*	@wire({ id: "myconfig", on: "config" })
**/
constructor: function(config, other) {
  this.config = config;
  ...
}
```

```js
/**
*	Scope: Constructor (multiple bones)
*	@wire({ bones: "header, footer", on: "attrs", name: "views" })
**/
constructor: function(attrs, other) {
  return MyClass.apply(this, arguments);
}
```

```js
/**
*	Scope: Field
*	Will execute as @Action (Assignment)
*	@wire({ id: "search" })
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
*	@wire({ id: "mymodel", on: "attrs", name: "model" })
**/
constructor(attrs) {
  this.model = attrs.model; // <- "[on].[name]" -> mymodel"
  ...
}
```

```js
/**
*	Scope: Constructor (multiple bones)
*	@wire({ bones: "header, footer", on: "attrs", name: "views" })
**/
constructor(attrs) {
  return super(attrs);
}
```

```js
/**
*	Scope: Field (Setter)
*	Will execute as @Action (Assignment)
*	@wire({ id: "mymodel", on: "model" })
**/
set value(model) {
  this.property = model.get('value');
}
```

---
#### @action (**Review**)

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
*	@action({ bone: "user", method: "fetch" })
**/
class User extends Backbone.Model {
  ...
}
```

```js
/**
*	Action Declaration to execute the method "fetch" on the bone "user"
*	with params passed to the method "render".
*	@action({ bone: "application", method: "render", params:[{ method: "after", target: "div.menu" }] })
**/
class Application extends Container {
  ...
}
```

---
#### @listenTo (**Review**)

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
  *	@wire({ id: "elements", on: "attrs", name: "collection" })
  **/
  constructor(attrs) {
    // Backbone automatically assign attrs.collection to this.collection (Backbone.View)
    this.collection.reset();
  }

  /**
  * Update Grid when add or remove event from Elements Backbone.Collection is fired
  * @listenTo({ events: "add,remove", from: "collection", handler: "update" })
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
#### @json (**Review**)

Specific use of annotation **@Bone** for objects that don't need to be instanciated.

* Scope: `Module`
* Parameters:
	* `id` {_String_} **required** | Bone Identifier
	* `spec` {_String_} **required** | Spec id in which the bone belongs to.

Examples:

```js
/**
*	Similar to @Bone annotation
*	@json({ id: "myconfiguration", spec: "config" });
**/
var MyConfiguration = {
  key1: "value1",
  key2: "value2",
  ...
};

exports default MyConfiguation;
```

---
#### @plugin (**Review**)

* Scope: `Module`
* Parameters:
	* `name` {_String_} **required** | Plugin name
	* `config` {_Object_} **required** | Plugin configuration
	* `spec` {_String_} **required** | Spec where the plugin should be used.

Examples:

```js
/**
*	@plugin({ name: "themes", config: "$bone!theme_config" })
*	@plugin({ name: "html", config: { basePath: "$bone!html_basepath", packages: "$bone!packages" } })
**/
import Container from 'ui/container';
...
```

---
#### @ignore (**review**)

* Scope: `Module`
* Parameters: No parameters

Will ignore all annotations found in the current module.

Examples:

```js
/**
*	@ignore()
**/
import {Container} from "ui";
...
```

---
### Special Annotations for future releases

_These set of featured annotation may affect boneyard-ioc core package._

#### @proxify
#### @factory
#### @decorate
