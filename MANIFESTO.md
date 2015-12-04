### Boneyard IoC Annotation Manifesto

```
Version: 1.0.0
Description: Initial document draft for Boneyard Annotation Instrumenter.
This document might be subjected to change.
```

### Scope Types
---
- Class
- Constructor
- Method
- Field

### Supported Annotations

---
#### @spec

* Scope:
	* `Class`
* Parameters:
	* `id` {_String_} **required** | Spec unique identifier
	* `include` {_Array_} _optional_ | List if parent specs that decorates the current spec
* Examples:

```js
/**
*	@spec({ id: 'specs/configuration' })
**/
class Configuration {
  ...
}
```

```js
/**
*	@spec({ id: 'specs/main', include: ['specs/header', 'specs/footer', 'specs/content'] })
**/
class ApplicationBootstrap extends Container {
  ...
}
```

---
#### @bone

* Scope:
	* `Class`
* Parameters:
	* `id` {_String_} **required** | Bone Identifier
	* `specs` {_Array_} **required** | Array of specs id in which the bone will belong to
	* `singleton` {_Boolean_} _optional_ | Flags the module to create one and only one instance (Default is Non-singleton).
* Examples:

```js
/**
*	Declaration for registering a bone of type "Account" that extends "Backbone.Model".
*	Bone identifier set to "account".
*	Belongs to Spec "specs/main".
*	Note: Module path will be retrieved automatically based on the file location
*	if not specified manually.
*
*	@bone({ id: 'account', specs: ['specs/main'] })
**/
class Account extends Backbone.Model {
  ...
}
```

```js
/**
*	Declaration for registering a bone of type "UserService" that extends "Service".
*	Bone identifier set to "userService".
*	Belongs to Spec "specs/services/user".
*	Module is manually set to retrieve class constructor on specific location.
*	Flag class to resolve instanciates as a singleton (Multiple injects will reference same instance)
*
*	@bone({ id: 'userService', specs: ['specs/services/user'], singleton: true })
**/
class UserService extends Service {
  ...
}
```

---
#### @wire (**Review**)

* Scope:
	* `Constructor`
	* `Field`
* Parameters
	* `id` {_String_} **required** | Unique Bone identifier
	* `on` {_String_} _optional_ | Not required on scope Field, but required on scope Constructor.
    **This parameter will be automatically wired on scope field for Es5.**
	* `name` {_String_} _optional_ | Optionally specified the property name the bone will be passed as part of the `on` object name
	* `params` {_Array_} _optional_ | Defaults Parameters to be pass on at the moment of injection
* Examples:

**ES5:**

```js
/**
*  Scope: Constructor
*  @wire({ id: 'myconfig', on: 'config' })
**/
constructor: function(config, other) {
  this.config = config;
  ...
}
```

```js
/**
*  Scope: Constructor (multiple bones to be injected in the same parameter attribute)
*  @wire({ id: 'header', on: 'attrs.views', params: [{ cls: 'myheader', autoId: true }] })
*  @wire({ id: 'footer', on: 'attrs.views' })
**/
constructor: function(attrs, other) {
  return MyClass.apply(this, arguments);
}
```

```js
/**
*  Scope: Field
*  Will execute as @Action (Assignment)
*  @wire({ id: 'search' })
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
*  Scope: Constructor
*  @wire({ id: 'mymodel', on: 'attrs.model' })
**/
constructor(attrs) {
  this.model = attrs.model; // <- "[on].[name]" -> mymodel"
  ...
}
```

```js
/**
*  Scope: Field (Setter)
*  Will execute as @Action (Assignment)
*  @wire({ id: 'mymodel', params: '$bone!defaults' })
**/
set value(model) {
  this.property = model.get('value');
}
```
---
#### @inject (**Review**)

Annotation that creates a bone on fly that has not been registered with the annotation @bone in the source code.
This behave similar to @wire but specially for built-ins classes provided by boneyard will add a new bone and inject it
into the specific attribute.

* Scope:
	* Constructor
	* Field
* Parameters:
	* `path` {_String_} **required** | Path to the file on which the class/object is declared and exported via amd.
	* `specs` {_Array_} **required** | Specifies on which specs the new module bone should be part of.
	* `on` {_String_} _optional_ | Not required on scope Field, but required on scope Constructor.
	* `params` {_Array_} _optional_ | Defaults Parameters to be pass on the instanciation process for the module bone.
	* `singleton` {_Boolean_} _optional_ | Flags the module to create one and only one instance (Default is Non-singleton).
* Examples:

```js
...
/**
*  Scope: Constructor
*  @inject({ path: 'ui/misc/panel', spec: 'specs/application', on: 'attrs.views', params: [{ title : 'My Title' }] })
**/
constructor(...attrs) {
  super(...attrs);
  ...
}
```

```js
...
/**
*  Scope: Field (Setter ES6)
*  @inject({ path: 'model/elements', spec: 'specs/application', params: [1, 2, 3] })
**/
set mycollection(collection) {
  this.collection = collection;
}
```

```js
...
/**
*  Scope: Field (ES5)
*  @inject({ path: 'model/elements', spec: 'specs/application', params: '$bone!elements' })
**/
...
collection: null,
...
```

---
#### @action (**Review**)

- Notes: Resolve multiple instances resolution in order to implement this

* Scope:
	* `Method`
* Parameters:
	* `bone` {_String_} **required** | Bone Identifier
	* `spec` {_String_} **required** | Specifies on which spec the action should be part of.
	* `params` {_Array_} _optional_ | Optional parameters to be passed to the method invocation.
* Examples:

```js
class User extends Backbone.Model {
  ...

  /**
  *	Action Declaration to execute the method "fetch" on the bone "user"
  *	@action({ bone: 'user', spec: 'specs/view/profile' })
  **/
  fetch() {

  }

  ...
}
```

```js
class Application extends Container {
  ...

  /**
  *	Action Declaration to execute the method "fetch" on the bone "user"
  *	with params passed to the method "render".
  *	@action({ bone: "application", spec: 'specs/application', params: [{ method: "after", target: "div.menu" }] })
  **/
  render() {

  }

  ...
}
```

---
#### @listenTo (**Review**)

Specific use of annotation **@Action** to start listening for events on instances of a given class.

* Scope:
	* `Method`
* Parameters:
	* `spec` {_String_} **required** | Specifies on which spec the action should be part of.
	* `events` {_String_} **required** | list of events to start listen to (comma separated)
	* `from` {_String_} **required** | specifies which property of the actual instance the event should be listening from.

Examples:

```js
class Grid extends Table {

  /**
  *	@wire({ id: 'elements', on: 'attrs.collection' })
  **/
  constructor(...attrs) {
    // Backbone automatically assign attrs.collection to this.collection (Backbone.View)
	super(...attrs);
    this.collection.reset();
  }

  /**
  * Update Grid when add or remove event from Elements Backbone.Collection is fired
  * @listenTo({ spec: 'specs/view/grid', events: 'add,remove', from: 'collection' })
  **/
  update() {
    this.collection.each(function(element) {
      this.doSomething(element);
      ...
    });
    ...
  }

}
```

---
#### @json (**Review**)

Specific use of annotation **@bone** for objects that don't need to be instanciated.

* Scope:
	* `Class`
* Parameters:
	* `id` {_String_} **required** | Bone Identifier
	* `specs` {_Array_} **required** | Specifies on which specs the json bone should be part of.

Examples:

```js
/**
*	Similar to @Bone annotation
*	@json({ id: 'myconfiguration', specs: ['specs/config'] });
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

* Scope:
	* `Class`
* Parameters:
	* `name` {_String_} **required** | Plugin name
	* `specs` {_Array_} **required** | Specifies on which specs the plugin should be part of.
	* `config` {_Object_} _optional_ | Optional Plugin configuration

Examples:

```js
/**
*	@plugin({ name: 'themes', config: '$bone!theme_config' })
*	@plugin({ name: 'html', config: { basePath: '$bone!html_basepath', mypackage: 'templates/mypackage' } })
**/
import Container from 'ui/container';
...
```

---
#### @ignore

* Scope:
	* `Class`
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

Patterns:

#### @proxify
#### @factory
#### @decorate

Local Storage:

#### @persist
#### @cease
