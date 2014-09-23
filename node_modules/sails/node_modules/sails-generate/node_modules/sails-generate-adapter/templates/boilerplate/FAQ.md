# FAQ (Frequently Asked Questions)


### Which version should I use?

The latest stable version in npm is always a safe bet.

```sh
$ npm install <%=moduleName%>
```

[![NPM](https://nodei.co/npm/<%= moduleName %>.png?downloads=true&stars=true)](https://nodei.co/npm/<%=moduleName%>/)



### Where is the documentation?
+ Documentation for this module is in the README.md file.
+ Docs for the latest stable npm release of Sails itself are on [sailsjs.org](http://sailsjs.org/#!documentation).



### What is an adapter?

 Adapters expose **interfaces**, which imply a conract to implemnt certain functionality.  This allows us to guarantee conventional usage patterns across multiple models, developers, apps, and even companies, making app code more maintainable, efficient, and reliable.  Adapters are useful for integrating with databases, open APIs, internal/proprietary web services, or even hardware.


### What kind of things can I do in an adapter?

Adapters are mainly focused on providing model-contextualized CRUD methods.  CRUD stands for create, read, update, and delete.  In Sails/Waterline, we call these methods `create()`, `find()`, `update()`, and `destroy()`.

For example, a `MySQLAdapter` implements a `create()` method which, internally, calls out to a MySQL database using the specified table name and connection informtion and runs an `INSERT ...` SQL query.

In practice, your adapter can really do anything it likes-- any method you write will be exposed on the raw connection objects and any models which use them.


### How do I get involved?

+ [Contributing to this module](./CONTRIBUTING.md)
+ If you find a bug with this module, please submit an issue to the tracker in this repository.  Better yet, send a pull request :)



## Why would I need a custom adapter?

When building a Sails app, the sending or receiving of any asynchronous communication with another piece of hardware can be normalized into an adapter.  (viz. API integrations)

> **From Wikipedia:**
> *http://en.wikipedia.org/wiki/Create,_read,_update_and_delete*

> Although a relational database provides a common persistence layer in software applications, numerous other persistence layers exist. CRUD functionality can be implemented with an object database, an XML database, flat text files, custom file formats, tape, or card, for example.

In other words, Waterline is not just an ORM for your database.  It is a purpose-agnostic, open standard and toolset for integrating with all kinds of RESTful services, datasources, and devices, whether it's LDAP, Neo4J, or [a lamp](https://www.youtube.com/watch?v=OmcQZD_LIAE).
I know, I know... Not everything fits perfectly into a RESTful/CRUD mold!  Sometimes the service you're integrating with has more of an RPC-style interface, with one-off method names.  That's ok-- you can define any adapter methods you like! You still get all of the trickle-down config and connection-management goodness of Waterline core.



## Why should I build a custom adapter?

To recap, writing your API integrations as adapters is **easier**, takes **less time**, and **absorbs a considerable amount of risk**, since you get the advantage of a **standardized set of conventions**, a **documented API**, and a **built-in community** of other developers who have gone through the same process.  Best of all, you (and your team) can **reuse the adapter** in other projects, **speeding up development** and **saving time and money**.

Finally, if you choose to release your adapter as open-source, you provide a tremendous boon to our little framework and our budding Sails.js ecosystem.  Even if it's not via Sails, I encourage you to give back to the OSS community, even if you've never forked a repo before-- don't be intimidated, it's not that bad!

The more high-quality adapters we collectively release as open-source, the less repetitive work we all have to do when we integrate with various databases and services.  My vision is to make building server-side apps more fun and less repetitive for everyone, and that happens one community adapter at a time.

I tip my hat to you in advance :)




## What is an Adapter Interface?

The functionality of adapters is as varied as the services they connect.  That said, there is a standard library of methods, and a support matrix you should be aware of.  Adapters may implement some, all, or none of the interfaces below, but rest assured that **if an adapter implements one method in an interface, it should implement *all* of them**.  This is not always the case due to limitations and/or incomplete implementations, but at the very least, a descriptive error message should be used to keep developers informed of what's supported and what's not.

> For more information, check out the Sails docs, and specifically the [adapter interface reference](https://github.com/balderdashy/sails-docs/blob/master/adapter-specification.md).





## Are there examples I can look at?


**[MySQL](https://github.com/balderdashy/sails-mysql)**, **[PostgreSQL](https://github.com/balderdashy/sails-postgresql)**, **[MongoDB](https://github.com/balderdashy/sails-mongo)**, **[Redis](https://github.com/balderdashy/sails-redis)**, local [disk](https://github.com/balderdashy/sails-disk), and local [memory](https://github.com/balderdashy/sails-memory).  [Community adapters](https://github.com/balderdashy/sails-docs/blob/master/intro-to-custom-adapters.md#notable-community-adapters) exist for Riak, CouchDB, and ElasticSearch; for various 3rd-party REST APIs like Yelp and Twitter; plus some [eclectic projects](https://www.youtube.com/watch?v=OmcQZD_LIAE).



> If you have an unanswered question that isn't covered here, and that you feel would add value for the community, please feel free to send a PR to the [official generator]() for waterline/sails adapters adding it to this section.




### Where do I get help?

+ [Ask a question on StackOverflow](http://stackoverflow.com/questions/tagged/sailsjs?sort=newest&days=30)
+ Get help from the [Google Group](https://groups.google.com/forum/#!forum/sailsjs)
+ Get help on IRC ([#sailsjs on freenode](http://irc.netsplit.de/channels/details.php?room=%23sailsjs&net=freenode))
+ [Tweet @sailsjs](http://twitter.com/sailsjs)


### Why haven't I gotten a response to my feature request?

When people see something working in practice, they're usually a lot more down to get on board with it!  That's even more true in the open-source community, since most of us are not getting paid to do this (myself included).  The best feature request is a pull request-- even if you can't do the whole thing yourself, if you blueprint your thoughts, it'll help everyone understand what's going on.

### I want to make a sweeping change / add a major feature
It's always a good idea to contact the maintainer(s) of a module before doing a bunch of work.  This is even more true when it affects how things work / breaks backwards compatibility.

### The maintainer of this module won't merge my pull request.

Most of the time, when PRs don't get merged, a scarcity of time is to blame.  I can almost guarantee you it's nothing personal :)  And I can only speak for myself here, but in most cases, when someone follows up on a PR that's been sitting for a little while on Twitter, I don't mind the reminder at all.

The best thing about maintaining lots of small modules is that it's trivial to override any one of them on their own.  If you need some changes merged, please feel empowered to fork this model and release your own version.

If you feel that yours is the better approach, and should be the default, share it with the community via IRC, Twitter, Google Groups, etc.  Also, feel free to let the core Sails/Waterline team know and we'll take it into consideration.



### More questions?

> If you have an unanswered question that isn't covered here, and that you feel would add value for the community, please feel free to send a PR adding it to this section.







[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/8acf2fc2ca0aca8a3018e355ad776ed7 "githalytics.com")](http://githalytics.com/balderdashy/<%= moduleName %>/FAQ.md)
