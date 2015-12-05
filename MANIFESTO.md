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
	* `path` {_String_} **required** | Spec Path location
	* `include` {_Array_} _optional_ | List if parent specs that decorates the current spec
* Examples:

```js
/**
*	@spec({ id: 'configuration', path: 'specs/configuration' })
**/
class Configuration {
  ...
}
```

```js
/**
*	@spec({ id: 'main', path: 'specs/main', include: ['header', 'footer', 'content'] })
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
*	@bone({ id: 'account', specs: ['main'] })
**/
class Account extends Backbone.Model {
  ...
}
```

```js
/**
*	Declaration for registering a bone of type "UserService" that extends "Service".
*	Bone identifier set to "userService".
*	Belongs to Spec "user".
*	Bone path resolution will be automatically resolved based on the class definition of the file.
*	Flag class to resolve instanciates as a singleton (Multiple injects will reference same instance)
*
*	@bone({ id: 'userService', specs: ['user'], singleton: true })
**/
class UserService extends Service {
  ...
}
```
---
#### @component (**review**)

Similar as @bone with the only difference that it's mainly used to create bones that can NOT been annotated with the @bone
annotation. Often, we want to create a bone that it doesn't necessary need to be inherited, the default implementation
is enough to use it. Notice that the parameter `path` is required.
Best to be thought as a component that is `required` by the context of a class. Please see example.

* Scope:
	* `Class`
* Parameters:
	* `id` {_String_} **required** | Bone Identifier
	* `specs` {_Array_} **required** | Array of specs id in which the bone will belong to
	* `path` {_String_} **required** | Path to the file on which the class/object is declared and exported via amd.
	* `singleton` {_Boolean_} _optional_ | Flags the module to create one and only one instance (Default is Non-singleton).
* Examples:

```js
import Form from 'ui/form/form';

/**
*  @bone({ id: 'accountForm', specs: ['account'] })
*  @class com.myproject.view.account.AccountForm
*  @extends com.boneyard.ui.form.Form
*
*  Notice that ui/misc/panel default implementation provided by the boneyard-ui is enough for this case.
*  @component({ id: 'basic', path: 'ui/misc/panel', specs: ['account'], params: [{ title: 'Basic Information' }] })
*  @component({ id: 'button', path: 'ui/form/controls/button', specs: ['account'], params: [{ text: 'Update' }] })
**/
class AccountForm extends Form {

  /**
  *  @wire({ id: 'basic', on: 'attrs.views' })
  *  @wire({ id: 'button', on: 'attrs.views' })
  **/
  constructor(attrs) {
	return super(attrs);
  }
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
*  Will automatically use the name of the field 'search' to resolve the 'on' attribute.
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
  this.model = attrs.model;
  ...
}
```

```js
/**
*  Scope: Field (Setter)
*  Will execute as @Action (Assignment)
*  Will automatically use the name of the setter 'value' to resolve the 'on' attribute.
*  @wire({ id: 'mymodel', params: '$bone!defaults' })
**/
set value(model) {
  this.property = model.get('value');
}
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
  *	@action({ bone: 'user', spec: 'profile' })
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
  *	@action({ bone: "application", spec: 'application', params: [{ method: "after", target: "div.menu" }] })
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
  * @listenTo({ spec: 'grid', events: 'add,remove', from: 'collection' })
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
*	@json({ id: 'myconfiguration', specs: ['config'] });
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
*	@plugin({ name: 'themes', specs: ['plugins'], config: '$bone!theme_config' })
*	@plugin({ name: 'html', specs: ['plugins'], config: { basePath: '$bone!html_basepath', mypackage: 'templates/mypackage' } })
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
