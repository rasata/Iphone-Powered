# Templates


This is directory is where the templates for the generator live (i.e. source files specified in `{template: './foo'}` objects in the generator.)  Currently, they're run through `ejs` templating, though that will likely change to lodash in the future (in the interest of reducing the weight of Sails in general)



To use these templates:

```javascript
// In `lib/index.js`
{
	targets: {

		// ...

		// Create file at `scope.rootPath` using template at `templates/foo.bar`
		'.': { template: 'foo.bar' },

		// Create file at `scope.rootPath/foo.js`
		'./foo.js': { template: 'bar.baz' },

		// ...
	}
}
```
