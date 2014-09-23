# dot-access

  Access object properties using dot notation.
  
    var dotAccess = require('dot-access');
    
    var user = { 
      fullname: { 
        first: 'Joe', 
        last: 'M' 
      } 
    };
    
    // get
    dotAccess.get(user, 'fullname.first'); // 'Joe'
    
    // or set
    dotAccess.set(user, 'fullname.last', 'T'); // 'T'

## Installation

  Install with [component(1)](http://component.io):

    $ component install Ntran013/dot-access

## API



## License

  MIT
