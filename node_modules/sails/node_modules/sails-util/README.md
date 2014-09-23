sails-util
===========

Shared utilities between sails, waterline, etc.




## Docs

See [`docs`](./docs).


## Coming changes:
+ async
+ lodash
+ optimist
+ fs-extra
+ node-switchback
+ json-stringify-safe
+ underscore.str
+ core node `util`

> Most of these extra dependencies will be stripped in an upcoming version,
> in favor of requiring those dependencies directly in your app instead.
> This will make this module more lighweight and make all the things install and load faster.
>
> ##### Notable exceptions:
>
> + Certain commonly-used parts of `underscore.str`, e.g. `_.str.capitalize`
>   + (but these will be cherry-picked and bundled rather than including the entire dep)
> + json-stringify-safe will likely stay a dependency.
>
> ##### Things to add:
> + I'd like to bundle a few of the most commonly used methods from momentjs.
