![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)

# sails-generate-controller


A `controller` generator for use with the Sails command-line interface.


### Installing this generator

> Certain generators are installed by default in Sails, but they can be overridden.  Check the [Sails docs](http://sailsjs.org/#!documentation) for information on installing generator overrides / custom generators.

<!--
```sh
$ npm install sails-generate-controller
```
-->


##### For a particular app

In your app directory:

```sh
$ npm install sails-generate-controller
```

Then edit this project's `./.sailsrc` file (see below for details).  If no local `.sailsrc` file exists yet, you can just create one.


##### As the default for your global Sails install

In your $HOME folder (i.e. `~/`):

```sh
$ npm install sails-generate-controller
```

Then edit your global `~/.sailsrc` file (see below for details).  If no global `.sailsrc` file exists yet, you can just create one.


##### Configuring a `.sailsrc` file to use this generator

Add or replace the module used for generating a "controller":

```json
{
	"generators": {
		"modules": {
			"controller": "sails-generate-controller"
		}
	}
}
```



### Usage

Now that the generator is installed, you can test it:

```sh
$ sails generate controller foobar
```


### Questions?

See `FAQ.md`.



### More Resources

- [Stackoverflow](http://stackoverflow.com/questions/tagged/sails.js)
- [#sailsjs on Freenode](http://webchat.freenode.net/) (IRC channel)
- [Twitter](https://twitter.com/sailsjs)
- [Professional/enterprise](https://github.com/balderdashy/sails-docs/blob/master/FAQ.md#are-there-professional-support-options)
- [Tutorials](https://github.com/balderdashy/sails-docs/blob/master/FAQ.md#where-do-i-get-help)
- <a href="http://sailsjs.org" target="_blank" title="Node.js framework for building realtime APIs."><img src="https://github-camo.global.ssl.fastly.net/9e49073459ed4e0e2687b80eaf515d87b0da4a6b/687474703a2f2f62616c64657264617368792e6769746875622e696f2f7361696c732f696d616765732f6c6f676f2e706e67" width=60 alt="Sails.js logo (small)"/></a>


### License

**[MIT](./LICENSE)**
&copy; 2014 [balderdashy](http://github.com/balderdashy) & [contributors]
[Mike McNeil](http://michaelmcneil.com), [Balderdash](http://balderdash.co) & contributors

[Sails](http://sailsjs.org) is free and open-source under the [MIT License](http://sails.mit-license.org/).

