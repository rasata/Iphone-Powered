# <%= moduleName %>

A `<%= generatorName %>` generator for use with the Sails command-line interface.

Certain generators are installed by default in Sails, but they can be overridden.  Other generators create entirely new things.  Check the [Sails docs](http://sailsjs.org/#!documentation) for information on installing generator overrides / custom generators and information on building your own generators.



### Installation

```sh
$ npm install <%= moduleName %>
```


### Usage

##### On the command line

```sh
<% if (typeof usage === 'undefined') {
%>$ sails generate <%= generatorName %> <%
}
else {
%><%= usage %><%
}
%>
```



### Development

To get started quickly and see this generator in action, ...

Also see `CONTRIBUTING.md` for more information on overriding/enhancing existing generators.



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
&copy; <%= year %> [<%= author %>](<%= website %>) & contributors

As for [Sails](http://sailsjs.org)?  It's free and open-source under the [MIT License](http://sails.mit-license.org/).

![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)
