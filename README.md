### Experimental IoC Annotation Based for Spinal

#### Initial Specs

1 - Package Scanning

	- ```@scan([packages...])```


2 - Dependency Injection

	- Via Constructor ```@wire({paramName} = {BoneId}, ...) | @autowired```
	- Via Setter ```@wire({paramName} = {BoneId}, ...) | @autowired```


3 - MVC annotations & Factory Pattern

	- ```@Service```
	- ```@Controller```
	- ```@Model```
	- ```@Factory```
