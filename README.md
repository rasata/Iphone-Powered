Iphone icloud get information in node JS :-)
=========

Iphone icloud get information is a nodejs Application in HTML5 that let you access a icloud blocked *iPhone*.


With this, you can monitor and get all the information from your iPhone. So you will also be able to
- understand what information you give to others when you agree to fake the famous "albert.apple.com" in your hosts file either on mac or windows, as some people says that this will bypass the icloud lock
- understand how poor is the engineering behind people talking about doulci ...
- understand some basic of the exchange between itunes and your iphone

This application is dedicated to developper and is for *educational purpose only*, done on free time because I was fed up seeing people waiting for doulci.net ... and so many people -faking- and creating their own fake bypass service.

So I crappy writed this quickly ...

Version
----
0.5

Dependency
----
The app has been written completely in SailsJS.  

Tech
-----------

Iphone Bypass Nodejs uses open source projects to work properly:

* [SailsJs, version 0.10.5] - awesome MVC framework 

Features and roadmap 
-----------
If anyone would like to participate to this, I would be glad including more people on this project :-)

All information are logged in the console from now in the future
- data will be displayed in the browser
- data will be stored in mongodb (using deployd)
- data will be browsable (we also will be able to search information)
- data and information of the iphone will be analyzed

How to use ?
-----------
This is up your plateform, but by the way :
- Macosx : modify your /etc/hosts and add "127.0.0.1 albert.apple.com"
- Windows : modify your hosts file and add "127.0.0.1 albert.apple.com"

Then you launch the app in a console after you installed sailjs.

Then you launch itunes and connect your iphone.

Installation & running
--------------

```sh
git clone [git-repo-url] iphoneBypassNodeJs
cd iphoneBypassNodeJs
sudo sails lift
```

License
----
MIT


[Waterzo]:http://www.digit-prime.com/
