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

```js
/**
*	@Scan({ packages: ["com.myproject.view", "com.myproject.model"] })
**/
import {Container} from "ui";
...
```

---
#### @Spec

* Scope: Class
* Parameters:
	* id `String` **required** | _Spec Identifier_
	* include `Array` _optional_ | _Array of parent spec ids_

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

* Scope: Class
* Parameters:
	* id `String` **required** | Bone Identifier
	* spec `String` **required** | Spec id in which the bone belongs to.
	* module `String` _optional_ | Module path (basepath resolution will use requirejs config)
	* singleton `Boolean` _optional_ | Flags the module to create one and only one instance (Default is Non-singleton).

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
#### @Inject (**Review**)

* Scope: Method, Field, Setter
* Parameters
	* bone `String` **required** | Bone identifier to inject
	* params `Array` _optional_ | Optional parameters to pass to the module constructor class.

Examples:

```js
/**
*	In method scope
*	@Inject({ id: "myconfig", params: [{ configOption: true }])
**/
initialize: function(config) {
  ...
}
```

```js
/**
*	In a Field scope (ES5)
*	@Inject({ id: "search" })
**/
search: null,

initialize: function(attrs) {
  ...
}
```

```js
/**
*	In a Setter scope (ES6)
*	@Inject({ id: "mymodel", params: [{ defaults: { key: "value" } }] })
**/
set value(model) {
  this.value = model.get('key');
}
```

---
#### @Action (**Review**)

- Notes: Resolve multiple instances resolution

* Scope: Module, Class
* Parameters:
	* bone `String` **required** | Bone Identifier
	* method `String` **required** | Bone method to be invoke
	* params `Array` _optional_ | Optional parameters to be passed to the method invokation.

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

* Scope: Class
* Parameters:
	* event `String` **required** | event name
	* handler `String` **required** | name of the method of class to handle the event whenver ocurrs.
	* which `String` _optional_ - default: "model" | name of the variable member of class to start listening a event.

Examples:

```
TODO
```

---
#### @Json (**Review**)

Specific use of annotation **@Bone** for objects that don't need to be instanciated.

* Scope: Module
* Parameters:
	* id `String` **required** | Bone Identifier
	* spec `String` **required** | Spec id in which the bone belongs to.

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
#### @Plugin

* Scope: Module
* Parameters:
	* name `String` **required** | Plugin name
	* config `Object` **required** | Plugin configuration

Examples:

```
TODO
```

---
### Special Annotations for future releases

_These set of featured annotation may affect boneyard-ioc core package._

#### @Proxify
#### @Factory
#### @Decorate
