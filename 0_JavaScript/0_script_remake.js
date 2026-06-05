//https://www.youtube.com/watch?v=upDLs1sn7g4 - What is JavaScript?
//https://www.youtube.com/watch?v=0Rwb4Xmlcwc&list=PLui3EUkuMTPgZcV0QhQrOcwMPcBCcd_Q1&index=1 - Bckend Plan

//Its compile time is same as C/C++.


//====================================================================================================================================
//Concept of Hoisting & String Operations.


        /*console.log(x); // undefined
        var x = 10;

        //But JS sees it like this

        var x;
        console.log(x);
        x=10;           -----------------> This is how JS does Internal work and its called hoisting.*/
        //Hoisting happens all the time but the shut off its effect let or const are used
        //So, let or const make function block (Global scoped or function scoped) variable to scope blocked


    /*Naming rules -
    1) names just must contain letters, numbers, symbol $ _.
    2) first character must not be a number.
    3) It mustn't be a reserved word eg var.*/
    /*


        console.log(age);
        // temporal dead zone - here var is not accessible
        let age = 26;
        SyntaxError: Identifier 'age' has already been declared


    const msg = "hello";
    const msg = "again"; // ❌ SyntaxError

    let msg = "hello";
    let msg = "again"; // ❌ SyntaxError

    var msg;
    var msg; // ignored (same variable) ie No error


        userName_const="Const_usecase"; //We cant define the variable of const type as we must define it during the time of declaration. This will show error.
        username='RehaanParathanahalli';
        userName_let="Let_usecase";
        console.log("\`\` We use this called as template literal and When we add \&{variable_Name}\ we are using mixture of template literal and a concept known as string interpolation");
        console.log(`Hello learners we are revising JS. \"${username}\" A concept of Hoisting.Where the JS takes all variables to the front of Queue at the time of Execution except let and const.`);
        console.log(`Hello learners we are revising JS. \"${userName_let}\" Let benefits of ignoring the concept of Hoisting.`);
        let userName_let;
        var username;
        const userName_const;
        //OR
        console.log("Hello learners we are revising JS."+"\""+username+"\""+"A concept of string concatenation in string operations");
        //OR
        var stringLiteral=`Hello learners we are revising JS. \"${username}\" A concept of Hoisting.Where the JS takes all variables to the front of Queue at the time of Execution except let and const.`;
        console.log(stringLiteral);
        convention="roadBreak";
        console.log("But what if we didn't define the var but just declared then output can be \"undefined\" OR \'null\'");//Difference between undefined and null will be cleared in DOM Methods, JSON Parsing and APIs.
        console.log('Can we use \' \' instead of \" \".Also lets explore escape sequence characters.\n A new line And\t Space');
        var convention;
        console.log(`A convention for all the users called CamelCased Eg ${convention}`);


    const name = 'Jane';
    const Name = 'Mark';
    const NAME = 'Fred';

    console.log(name, Name, NAME);


        // is, has will be used for boolean valued variable
        // let isModalVisible = true;

        // if (isModalVisible) {
        //   // do something  
        // }

        // let isLoading;
        // let hasPosition;

        const COLOR_RED = '#f00';   CAPITAL will be used for const so that other developers can understand that this value is const and cant be changed
*/
//====================================================================================================================================


//====================================================================================================================================
//String Operations Advanced
/*
    msg="hi";
    msg="Hi, My name is Rehaan.";
    console.log("msg");

        const threeLines = "This is a string \n that spans \r across three lines.";
                                      OR
        const threeLines = `This is a string 
        that spans across 
        three lines.

    //More mentioned in cheat code sheet
*/
//====================================================================================================================================


//====================================================================================================================================
//Global, GlobalThis & window in Node.js, Everywhere & Browser.
//The "global object" is the top-level object that provides access to built-in functions, variables, and environment-specific APIs.

    //Window(Browser)
    /*
    🖼️ window
    - Browser-specific global object.
    - Represents the browser window and provides :
        - DOM APIs (document, location, history)
        - Browser-specific functions (alert, confirm)
        - Global variables declared with var (they become properties of window).
        - Not available in Node.js. That’s why relying on window breaks outside browsers.
    */

    //Global(Server)
    /*
    🖼️ global
    - Node.js-specific global object.
    - Represents the Node runtime environment and provides:
        - Core Node APIs (process, Buffer, require)
        - Utility functions (setTimeout, setInterval)
        - Environment-wide values accessible across modules
        - Module scope difference: Variables declared with var or let inside a Node module do not automatically become properties of global (unlike window in browsers).
        - Not available in browsers. That’s why relying on global breaks outside Node.js.

    - In browsers, var x = 10; attaches x to window.
    - In Node, var x = 10; does not attach x to global. (Node modules are scoped, so globals don’t leak as easily.)
    */

    //globalThis
    /*
    🖼️ globalThis
    - Universal global object (introduced in ES2020).
    - Provides a standard, cross-platform reference to the global object.
    - Works consistently across environments:
        - In browsers, globalThis → window
        - In Node.js, globalThis → global
        - In Web Workers, globalThis → self
        - Purpose: Eliminates the need for environment-specific checks (window vs global).
        - Best practice: Use globalThis when writing portable code that should run in both browser and Node.js contexts.
    */

        //console.log(window);// Go to browser dont check through node
        //console.log(global);// Check in node
        //console.log(globalThis);// Check Anywhere you want but in browser it will be window and in node it will remain global

        //Window
        /*
            window.x=10;
            console.log(x);
            //OR
            var x=1;
            console.log(window.x);
        */

        //Global
        /*
            global.x=10;
            console.log(x);
        */

        //GlobalThis
        /*
            globalThis.x=10;
            console.log(globalThis.x); console.log(typeof globalThis.x); //Depends on the runtime environment.
        */

      //Window or global or globalThis are object and those has many methods like console.log(); window.alert(); window.prompt(); window.varName;

    //Explicit and Implicit global objects
    //Explicit
        //global.x, globalThis.x, window.x
    //Implicit
        //var x; x;
    /* Explicit global with var
    //Node.js(For bettter understanding read from comparision table)
        var f = 6;
        console.log(f);        // 6
        console.log(global.f); // undefined → var is module-scoped in Node.js, not global 
        // Implicit assignment
        g = 7;
        console.log(g);        // 7
        console.log(global.g); // undefined → stays in module scope
    */

    /* //Block Scope and Top-Level Scope
    // Block scope with let/const
          {
            let c = 3;
            const d = 4;
            var e = 5;
          }
          console.log(typeof c); // "undefined" → block-scoped
          console.log(typeof d); // "undefined" → block-scoped
          console.log(e);        // 5 → var ignores block, leaks out
    */

//Comparison table
/*
| Scope Type        | Node.js Behavior                                                                                   | Browser Behavior                                                                                                       | Example Keywords      |
|-------------------|----------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|-----------------------|
| Top-level scope   | Top-level variables are **module-scoped**, not global. They don’t attach to `global`.              | In non‑module `<script>`, top-level variables attach to `window`. In `<script type="module">`, they are module-scoped. | `var`, `let`, `const` |
| Module scope      | Each file is its own module. Top-level declarations are private unless exported.                   | `<script type="module">` creates its own scope; top-level declarations don’t leak to `window`.                         | `export`, `import`    |
| Block scope       | `let` and `const` are block-scoped. `var` ignores block scope and hoists to function/module scope. | Same behavior: `let` and `const` respect block scope, `var` leaks to function/global scope.                            | `let`, `const`, `var` |
Node.js is module scoped. its module scoped and keywords are module.export or module.import .
*/
//====================================================================================================================================


//======================================================================================================================================
// 1) sloppy "normal" mode - default in scripts
// 2) strict mode - throws more errors, prevents pitfalls of the language

    /*"use strict";
    x=10;//error
    console.log(x);//If "use strict"; wasn't used then this wouldn't have given error.

    let obj ={ p:1, p:2}; //Error since duplicates aren't allowed while in strict mode.

    function myFunction(){
    "use strict";
    //this usecase will be defined to the block of myFunction() Not applicable outside.
    }
    */

        //Sloppy mode
        /*x=10;//No error & its considered implicit window object.
        console.log(x);*/
//====================================================================================================================================


//====================================================================================================================================
//Variable shadowing
      /*var price = 20;
      var isSale = true;
      //Variable shadowing the if statements var is being shadowed on outer elements
      if (isSale) {
        // discount price of product
        let price = 20 - 2;    // Use let price = 20-2; instead of price=20-2; as let & const - block-scoped meaning that price is no longer accessed outside of if block
                              //if price = 19; is used then since var is function scoped then outside value gets overwritten.
        console.log('sale price', price);// if let is used output is 18 else 19
      }
      console.log('price', price-20);//if let is used inside if block then output is 0 else -1.
*/
//====================================================================================================================================

//====================================================================================================================================
/*
//Data Types (aka Just "Types") -
   
    Primitive types -

        string ( immutable )
        number
        boolean
        undefined
        null
        symbol - [] , {} & () etc.

              [ everything else is Object type. ]

    console.log(typeof window);  // Output Object type

    Non - Primitive types -
        objects, arrays, maps & set are mutable
        +-------------------------------+
        |            OBJECT             |
        |  { key: value, ... }          |
        +-------------------------------+

        +-------------------------------+
        |            ARRAY              |
        |  [ item1, item2, ... ]        |
        +-------------------------------+

        +-------------------------------+
        |           FUNCTION            |
        |  function myFunc() { ... }    |
        +-------------------------------+

        +-------------------------------+
        |   SPECIALIZED OBJECT TYPES    |
        |  Date, RegExp, Map, Set,      |
        |  WeakMap, WeakSet             |
        +-------------------------------+
  
//Operators & Precedence order
    // + - * / 
    // == >= <= !=
    // !
    // ===
      //More operators are mentioned in precedence order mentioned in conditionals
      
//Conditionals, Switch & ternaries

  //Conditionals

      const prefersDarkMode = false;
      const prefersSolarizedMode = true;

      if (prefersDarkMode) {
        console.log('dark mode set!');  
        document.body.style.background = 'black';
      } else if (prefersSolarizedMode) {
        console.log('solarized mode set!'); 
        document.body.style.background = 'palegoldenrod';
      } else {    
        console.log('light mode set!');
        document.body.style.background = 'ghostwhite';
      }

                    //  OR

      const colorMode = 'dark';

      if (colorMode === 'solarized') {
        console.log('solarized mode set!'); 
        document.body.style.background = 'palegoldenrod';
      } else if (colorMode === 'dark') {
        console.log('dark mode set!');  
        document.body.style.background = 'black';
      } else {    
        console.log('light mode set!');
        document.body.style.background = 'ghostwhite';
      }

    //Switch

        const colorMode = 'dark';
        //Unlike switch of C/C++ here string is allowed in case "string_can_be_used";
        switch (colorMode) {  
          case "solarized":
            console.log('solarized mode set!'); 
            document.body.style.background = 'palegoldenrod';
            break;
          case 'dark':
            console.log('dark mode set!');  
            document.body.style.background = 'black';
            break;
          default:  
            console.log('light mode set!');
            document.body.style.background = 'ghostwhite';
        }

    //Truthy & Falsy values

        if (value) {//JS's internal working of "if(value)" Boolean(value) === true (=== is strict evaluator)
                    //It converts the value to bool using explicit conv boolean() [ 0 is false 1 or other is true, '' is false 'smthng' is true & more info in truthy & falsy values concept ]

              //Note down (=== is strict evaluator)
              //1 == "1";   // true (string coerced to number)
              //1 === "1";  // false (different types)
        }else{
          //Its isn't true so do smthng else
        }

        // falsy values
          // 0
          // '' or `` or ""
          // null
          // undefined
          // NaN
          // -0
          // -0n

        //Truthy values
          - Non‑empty strings → "hello", "0", "false"
          - Non‑zero numbers → 1, -1, 3.14
          - Objects → {}, [] (even empty ones!)
          - Functions → function(){}
          - Infinity and -Infinity
    
        if ([]) console.log("Truthy");      // runs
      */
    
    //Conversions
    /*
      // 1) Explicit type conversion
      // 2) Implicit type conversion (coercion)

        console.log('1' * '2');  //2
        console.log('10' + 20);  //1020

        String(123);     // "123"
        (123).toString(); // "123"

        Number("42");    // 42
        parseInt("42");  // 42
        parseFloat("3.14"); // 3.14

        Boolean(1);      // true
        Boolean(0);      // false
        Boolean("");     // false
        Boolean("hi");   // true
    */
    //More about "===" strict operator
      /*

      // Avoid direct comparisons ( "==" aka loose operator ) in conditionals & use "===" ( strict operator )

          const username = '';

          if (username === false) {                  
            console.log('no user');                                
          }else{
            console.log("Strict operator doesn't allow type conversion")
          }                                   

          if (Boolean(NaN) === Boolean(NaN)) {        //true in most of cases but here its false as Nan is an undetermined value (0/0 or 1/0)
              console.log('equal')
          } else {
              console.log('not equals')
          }
      */

    //ternary operator

        //const greeting = age < 10 ? "Hey there" : "That's an age!";
        //console.log(greeting);


        //const greeting_complicated = age < 10 ? "Hey there Boy!" : age > 18 ? "Greetings, Mr.~!" : age > 10 ? "What's up?" : "That's an age!";
        //console.log(greeting_complicated);


        // const username = response ? response : "Guest";
        // console.log(username);

    //Short-Circuiting - Using && || 

        /*
        const username = isEmailVerified && response || "Guest";
        console.log(username);
        //In JavaScript, && and || return actual operand values (first falsy for &&, first truthy for ||), while == and ! always return a boolean. In C/C++, all of these operators (&&, ||, ==, !) strictly return true (1) or false (0).

        //Beaware of operator precedence & Associativity

    🧩 Order of Precedence (simplified focus)
        - Parentheses () → highest, used for grouping.
        - Unary operators (++, --, !, ~, * dereference, & address-of, casts).
        - Multiplication/Division/Modulo (*, /, %).
        - Addition/Subtraction (+, -).
        - Relational (<, <=, >, >=).
        - Equality (==, !=).
        - Bitwise AND (&).
        - Bitwise XOR (^).
        - Bitwise OR (|).
        - Logical AND (&&).
        - Logical OR (||).
        - Ternary conditional (?:).
        - Assignments (=, +=, -=, etc.).
        - Comma operator (,).

      */
//====================================================================================================================================

//====================================================================================================================================
//Functions
  //Agenda
          /*
          - What is the purpose of functions in JS?
          - Then how to make more reliable function or function with parameter that are more readable
          - A special property called closure of function
          - Short-circuiting the functions using arrow functions & Callback functions
          - Advanced concept like partial applications of functions
          */


    //Input is paramater and "hi" is argument
    /*
    let result;
    function echo(input,score){
      console.log(input); 
      console.log(`${score}`);
      result=score>70 ? `${input}, You have cleared the exam`:`${input}, You have failed the exam`;
    }
    echo("Rehaan",72,90);//JS ignores 90 or extra arguments
    console.log(result);
    */

  //Closure
          //A function forms a closure when it accesses variables from its outer lexical scope.
          /*
          function handleLikepost(){
            let likeCount=0;
            return function addlike(){
              likeCount++;
              return likeCount;
            }
            //We can not just add likes by 1 but also by k(constant) by passing an argument into the addlike(parameter) functions.
          }
          const like=handleLikepost();
          console.log(like());
          console.log(like());
          console.log(like());
          */
  //Function with default parameters
  /*
        function convertTofarenheit(Celcius,decimalPlaces){
            const fahrenheit=Celcius*1.8+32;
            console.log(fahrenheit.toFixed(decimalPlaces));
        }
        function Converter(Celcius,decimalPlaces){
            const fahrenheit=Celcius*1.8+32;
            decimalPlaces=decimalPlaces||1;
            console.log(fahrenheit.toFixed(decimalPlaces));
        }
        function defaultParameterConverter(Celcius,decimalPlaces=1){
            const fahrenheit=Celcius*1.8+32;
            decimalPlaces=decimalPlaces||1;
            console.log(fahrenheit.toFixed(decimalPlaces));
        }
        convertTofarenheit(21,0);
        Converter(21,0);
        defaultParameterConverter(21,0);
  */
 /* Arrow Functions (Shorter Functions) uses fat arrow for conciseness and ease for classes & objects
          //Explicit return arrow functions

              const username = 'john';
              const capitalize = (name) => {
                return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;  
              }
              console.log(capitalize(username));

          Arrow function
            = concise syntax
            + lexical this
            - no own this
            - no arguments object

          //Implicit return Arrow Functions

              const username = 'john';
              const capitalize = name => `${name.charAt(0).toUpperCase()}${name.slice(1)}`;  //when there is just a single parameter ( ) isn't needed.
              console.log(capitalize(username));
          //Extra Example (Arrow & Closure Property use case)

              const countdown = (startingNumber, step) => {
                let countFromNum = startingNumber + step;
                return () => countFromNum -= step;
              }

              const countingDown = countdown(20, 2);

              console.log(countingDown());
              console.log(countingDown());
              console.log(countingDown());

  //Callback functions - A function becomes a callback only when it is passed as an argument to another function and that function decides when to execute it.
          
          [ Call back funcions will make more sense when we learn about the async functions ]
          [ Callback function has another name called as higher order function. ]

              const username = 'john';
              const capitalize = name => `${name.charAt(0).toUpperCase()}${name.slice(1)}`;  

              function greetUser(name, callback) {
                return callback(capitalize(name));  
              }

              greetUser(username, function(name) { return `Hi there, ${name}`; });

                  //OR

              const result = greetUser(username, (name) => {
                return `Hi there, ${name}`;
              });

              console.log(result);
          */
          
  //Partial Application of functions

            /*
            Partial Application - Partial application is a technique where a function is transformed into a new function by pre-filling one or more of its arguments with fixed values, while the remaining arguments are supplied later.
                  function add(a) {
                    return function (b) {
                      return a + b;
                    };
                  }
                  const addFive=add(5); 
                  console.log(addFive(3));

            //Rest API to fetch
                  function getData(baseUrl, route) {
                    fetch(`${baseUrl}${route}`)
                      .then(response => response.json())
                      .then(data => console.log(data));  
                  }

                  getData('https://jsonplaceholder.typicode.com', '/posts');
                  getData('https://jsonplaceholder.typicode.com', '/comments');

                  //We have to call https://jsonplaceholder.typicode.com a lot of times so instead we used concept of partial application

                function getData(baseUrl) {
                  return function(route) {    
                    fetch(`${baseUrl}${route}`)
                    .then(response => response.json())
                    .then(data => console.log(data));  
                  }  
                }

                const decideroute=getData(https://jsonplaceholder.typicode.com);
                decideroute('/Posts');

  //Using Callback in an Partial Applications

                function getData(baseUrl) {
                  return function(route) { 
                    return function(callback) {    
                      fetch(`${baseUrl}${route}`)
                        .then(response => response.json())
                        .then(data => callback(data));  
                    }     
                  }  
                }

                  const getSocialMediaData = getData('https://jsonplaceholder.typicode.com');

                  const getSocialMediaPosts = getSocialMediaData('/posts');
                  const getSocialMediaComments = getSocialMediaData('/comments');

                  getSocialMediaPosts(posts => {
                    posts.forEach(post => console.log(post.title));  
                  });

  //Arrow function & Callback or Higher order function in Partial Application concept.

            const getData = baseUrl => route => callback =>  
                  fetch(`${baseUrl}${route}`)
                    .then(response => response.json())
                    .then(data => callback(data));  
                    

            const getSocialMediaData = getData('https://jsonplaceholder.typicode.com');

            const getSocialMediaPosts = getSocialMediaData('/posts');
            const getSocialMediaComments = getSocialMediaData('/comments');

            getSocialMediaPosts(posts => {
              posts.forEach(post => console.log(post.title)}); 
            */
//Fat arrow is powerful beast.
//====================================================================================================================================

//====================================================================================================================================

//Objects & Maps

  // variables - boxes; objects - file cabinets

        /*
      //Syntax
      //Generally, key is string but value can be of any type.
          const object = {
            key:value,    
            notkey:notvalue
          }


                    /*
                    const objectName = {
                      methodName_OR_func() {
                        //Statement 
                      }
                    }
                    objectName.methodName_OR_func();
                    */


        /*
            const blueColor = '#00f';
            const orangeColor = '#f60';

                const colors = {
                  yellow: '#ff0',
                  blue: blueColor,
                  orange: orangeColor    
                }

            console.log(colors);*/

            //Shorter version of previous

                /*const blue = '#00f';
                const orange = '#f60';

                const colors = {
                  yellow: '#ff0',
                  blue,
                  orange: orange   
                }
                console.log(colors);  // {yellow: '#ff0', blue: '#00f', orange: '#f60'}
                console.log(colors.yellow);


        */
          // Objects play a huge role in JS if there isn't a Dynamic changes time to time since hex value of color object wont changes its suited but if we needed to change the value then we shouldn't use objects.

    //More depth for objects - 


                /*
                  undefined, null, boolean, number, string, symbol
                */
                // primitive - passed by value

                // const num = 'hello world';
                // const anotherNum = 'hello world';
                // console.log(num === anotherNum);
                /*
                      var key='value';
                      const obj = {key:value};
                      const anotherObj = {key:value}; //as earlier num gets copy of 'hello world' but here obj gets reference of keys and values.
                      //If we change value from even one object the value gets changed globally as a result of pass by reference.
                      //Object creates a complete unique value unlike primitive as it creates values through pass by value.
                      //Eg var txt='hi'; here txt is a copied value not reference
                      // Where as const obj ={}; here obj is a pointer with a unique reference of {};
                      console.log(obj === anotherObj); // False
                */


    //Subtypes of objects 
                    // Arrays, set, map & functions


    /*# JavaScript Objects & Subtypes vs C Structs

                ## Objects in JavaScript
                - Base building block for non-primitive data.
                - Flexible: properties can be added/removed at runtime.
                - Can hold both data and functions (methods).
                - Serve as foundation for Abstract Data Types (ADTs).

                ## Subtypes of Objects
                1. Array → Ordered list, indexed by numbers.
                  Example: [10, 20, 30]
                2. Set → Unique collection, no duplicates.
                  Example: new Set([1,2,2,3]) → {1,2,3}
                3. Map → Key-value pairs, keys can be any type.
                  Example: myMap.set("name","Rehaan")
                4. Function → Callable object, can also have properties.
                  Example: greet.language = "English"

                ## Comparison with C Structs
                - Similarity: Both group related data → ADTs.
                - Differences:
                  - C struct → fixed fields, strongly typed, no methods.
                  - JS object → dynamic, can include methods, supports inheritance.
                - Analogy: JS objects are like "structs on steroids".

                ## Big Picture
                - Object is the parent type.
                - Arrays, Sets, Maps, Functions are specialized children.
                - Objects in JS = flexible, extensible ADTs compared to rigid C structs.
                */


                //Notes 
                            /*const obj = {};
                            const anotherObj = obj;
                            anotherObj.a = 1;

                            console.log('obj', obj);
                            console.log('another obj', anotherObj); //1 as both Shares references.
                            
                    const object = { key : value };
                    const object1 = { key : value };
                    object.key=diffValue;
                    console.log(object1.key); //Output is value not DiffValue

                            let value=1;
                            const object = { key : value };
                            const object1 = { key : value };
                            object.key=2;
                            console.log(object1.key); // 1 since object1 and object doesn't share references
                            console.log(value); // 1 
         
                */

  /* functions & Objects

                const colors = {
                  blue: "#f00",
                  orange: "#f60"
                };

                function getColor(key) {
                  return colors.key;
                }
                console.log(getColor('blue'));   // Output is NuLL
        */                                     

                
        // Why?   -----> This will literally look for a property named "key" inside colors, not the variable value.

                    //How to have space in key's name & Square bracket syntax.
                    //Why [] ? ----> It gives capability of using keys dynamically.
                          /*const colors = {
                            'yellow Color': '#ff0',
                            blue: "#f00",
                            orange: "#f60"
                          };
                          colors.red = '#f00';
                          console.log(colors);
                          console.log(colors['yellow Color']);*/



                    //How [] gives dynammic power?
                          /*const color = 'green';
                          const hexCode = '#0f0';

                          const colors = {
                            'yellow Color': '#ff0',
                            [blue]: "#f00",     
                            orange: "#f60"
                          };

                          colors[color] = hexCode;*/

              //Solution 

                  /*
                  function getColor(key) {
                    return colors[key];
                  }

                  console.log(getColor('green'));
                  */

        //Delete

              /*delete colors['yellow Color'];
              console.log(colors);

              delete colors.blue;
              console.log(colors);*/

                          //Know the property named "ahead of time" ie if your key value is static use . operator else use [].
                          /*
                          const person = {
                            name: "Rehaan",
                            age: 25
                          };

                          console.log(person.name); // ✅ "Rehaan"
                          console.log(person.age);  // ✅ 25

                          const key = "name";
                          console.log(person[key]); // ✅ "Rehaan"

                          const dynamicKey = "age";
                          console.log(person[dynamicKey]); // ✅ 25

                          // Works with non-standard identifiers
                              const obj = { "likes-coding": true };
                              console.log(obj["likes-coding"]); // ✅ true
                          */



  //Object destructuring
                      /*
                          const user = {
                            name: "Reed",
                            username: "Reedbarger",
                            email: "reed@gmail.com",
                            details: {
                              title: "Programmer"  
                            }  
                          };

                            const { title } = user.details; 
                            const { name } = user;              //OR             var { name } = user;
                                  //OR
                            const { name, details: { title} } = user;

                          function displayUserBio() {
                            console.log(`${name} is a ${title}`); 
                          }

                      displayUserBio()
                      */
        
        /*
          function displayUserBio({ name, details: { title} }) {
            console.log(`${name} is a ${title}`); 
          }

          displayUserBio(user);
        */

  //Merge two objects 
              /*
                    const user = {
                      name: "",
                      username: "",
                      phoneNumber: "",
                      email: "",
                      password: ""  
                    };

                    const newUser = {
                      username: "ReedBarger",
                      email: "reed@gmail.com",
                      password: "mypassword"  
                    };

                    console.log(Object.assign(user, newUser));
              */

        //If you dont want to merge two things instead merge two into an empty one
                        /*const user = {
                          name: "",
                          username: "",
                          phoneNumber: "",
                          email: "",
                          password: ""  
                        };

                        const newUser = {
                          username: "ReedBarger",
                          email: "reed@gmail.com",
                          password: "mypassword"  
                        };
                        const ob_new=Object.assign({}, user, newUser);
                        console.log(ob_new);*/

  //... is called spread operator.
              /*const user = {
                name: "",
                username: "",
                phoneNumber: "",
                email: "",
                password: "",
                verified: true
                };

              const newUser = {
                username: "ReedBarger",
                email: "reed@gmail.com",
                password: "mypassword"  
              };

              const createdUser = { ...user, ...newUser, verified: false };  // Both are different const createdUser={user,newUser,verified:false};  
              console.log(createdUser);*/
      // Output ( Observe properly to understand a concept )
                            /*
                            {
                              name: '',
                              username: 'ReedBarger',
                              phoneNumber: '',
                              email: 'reed@gmail.com',
                              password: 'mypassword',
                              verified: false
                            }
                            */
// Maps
    //Maps vs Objects
                      /*const nums = {
                        1: 1,
                        true: true
                      };

                      console.log(Object.keys(nums)); //Here there is an implicit conversion since key of object must be strings.
                      */

            //So to solve this problem map was introduced in ES6

                /*
                const map1 = new Map([
                  [1, 1],
                  [true, true]  
                ]);

                map1.set('key', 'value');

                      console.log(...map1.keys());    // console.log(map1.keys());  ---> Ouput { 1, true, 'key' } else 1 true key

                map1.forEach((value, key) => {
                  console.log(key, value);  
                });

        //Normally objects aren't ordered however the maps preserve the insertion order.

                const user1 = { name: "john" };
                const user2 = { name: "mary" };

                const secretKey1 = "asldjfalskdjf";
                const secretKey2 = "alksdjfakjsdf";

                const secretKeyMap = new Map([
                  [user1, secretKey1],
                  [user2, secretKey2]  
                ]);

                const key = secretKeyMap.get(user1);
                console.log(key);*/


  //Concept of WeakMap - Its used only when we need to store objects as keys if other than objec is used than error comes.

                /*const user1 = { name: "john" };
                const user2 = { name: "mary" };

                const secretKey1 = "asldjfalskdjf";
                const secretKey2 = "alksdjfakjsdf";

                const secretKeyMap = new WeakMap([
                  [user1, secretKey1],
                  [user2, secretKey2]  
                ]);
                */

                // To get a number of the value we must use Object.keys(nums).length; but Maps made it easy we cant just do this

                      /*const userMap = new Map([
                        ["name", "john"],
                        ["verified", true]  
                      ]);

                      console.log(userMap.size);*/

            //Map is treated just like let or const it doesnt replace var but has its own usecases.

  //This - later into depth -- Conceptual section in Scrimba
                                        /*
                                              const userData = { 
                                                username: "Reed",
                                                title: "JavaScript Programmer",
                                                getBio() {
                                                  console.log(`User ${userData.username} is a ${this.title}`);
                                                }  
                                              }
                                              const userData = { 
                                                username: "Reed",
                                                title: "JavaScript Programmer",
                                                getBio() {
                                                  console.log(`User ${this.username} is a ${this.title}`);
                                                },
                                                askToFriend() {
                                                  setTimeout(function() {
                                                    console.log(`Would you like to friend ${this.username}?`);    
                                                  }, 2000);  
                                                } 
                                              }
                                              // null since this is of askToFriend's lexical scope.

                                              userData.askToFriend();
                                      */
                                  //To solve this issue 
                                                  /*const userData = { 
                                                    username: "Reed",
                                                    title: "JavaScript Programmer",
                                                    getBio() {
                                                      console.log(`User ${this.username} is a ${this.title}`);
                                                    },
                                                    askToFriend() {
                                                      let that = this;
                                                      setTimeout(function() {
                                                        console.log(`Would you like to friend ${that.username}?`);   
                                                      }, 2000);  
                                                    } 
                                                  }

                                                  userData.askToFriend();*/

                                      //Better solution

                                            /*const userData = { 
                                              username: "Reed",
                                              title: "JavaScript Programmer",
                                              getBio: () {
                                                console.log(`User ${this.username} is a ${this.title}`);
                                              },
                                              askToFriend() {
                                                setTimeout(() => {
                                                  console.log(`Would you like to friend ${this.username}?`);   
                                                }, 2000);  
                                              } 
                                            }

                                            userData.askToFriend();

                                            //Notice the little change 

                                                    const userData = { 
                                                      username: "Reed",
                                                      title: "JavaScript Programmer",
                                                      getBio: () => {
                                                        console.log(`User ${this.username} is a ${this.title}`);
                                                      },
                                                      askToFriend() {
                                                        setTimeout(() => {
                                                          console.log(`Would you like to friend ${this.username}?`);   
                                                        }, 2000);  
                                                      } 
                                                    }
                                                      */


                    //Since normal function are dynamically bound to the object but arrow function are lexically bound to surrounding therefore this for arrow function has no meaning.
                    // Difference between lexical scope and dynammic scope
                        //- Lexical (static) scope: Variables are accessible only within the block or function where they are defined, and in any nested blocks/functions inside it.
                        //- Dynamic scope (contrast): Variables would be resolved based on the call stack at runtime, but most modern languages (like JavaScript, Python, C, Java) use lexical scope.
                        //--JS Follows Lexical scope but c follows Dynamic scope.



//====================================================================================================================================

//====================================================================================================================================
//Arrays & Sets
  //Agenda -
      //1. Flexible collections of data using Array's
      //2. Perform operations on elements of Array's
      //3. Get subsets of Array's
      //4. Transform Array's using reduce
      //5. Mold Array's using spread operator

    //We must know ahead of time about the index of object in an Array without it we cant detect the objects.
    //Order isn't preserved in an object.

/*

  //Basic Operations
        const todos_array = [];
        const todos_object = {
          tasks:"Do JS",
          completed:false
        }
        todos_array[0]=todos_object;
        todos_array.push("Whats an array in JS?");
        console.log(todos_array);
        let index = todos_array.length;
        console.log(`The length of Array is ${index}`);
        todos_array.pop();
        console.log(`After poping last element of Array We get this`);
        console.log(todos_array);*/

/*


                      const temperatures = [
                          { degrees: 69, isRecordTemp: false }, 
                          { degrees: 82, isRecordTemp: true }, 
                          { degrees: 73, isRecordTemp: false }, 
                          { degrees: 64, isRecordTemp: false }
                      ];

                      console.log(temperatures.includes());
                //We cant use include here as includes is only for boolean, int and so on but not for objects.
                //Why?
                      

                    //Solution
                              const temperatures = [
                                  { degrees: 69, isRecordTemp: false }, 
                                  { degrees: 82, isRecordTemp: true }, 
                                  { degrees: 73, isRecordTemp: false }, 
                                  { degrees: 64, isRecordTemp: false }
                              ];

                              const result = temperatures.some(temperature => temperature.isRecordTemp === true); // true / false
                              console.log(result);
                              Some iterates through all & then gives out if any one has passed condition but . every is opposite of this.
                      */



                                



    //forEach() works same as map as it allows us to iterate over the array but in map new array is created here it isn't the case.
    //Maps & forEach()

              /*
              const temperatures = [
                { degrees: 69, isRecordTemp: false },
                { degrees: 82, isRecordTemp: true },
                { degrees: 73, isRecordTemp: false },
                { degrees: 64, isRecordTemp: false }
              ];

                                    const newTemps = temperatures.map(temperature => {
                                      if(temperature.degrees > 70){
                                        temperature.isHigh = true; 
                                      }
                                      return temperature;
                                    });

                                    //OR

                                    const newTemps = temperatures.map(temperature => 
                                    temperature.degrees > 70 ? { ...temperature,isHigh: true } : temperature
                                    );

              newTemps.forEach(i=>{
                if(i.isHigh){
                  console.log(`The temperatur ${i.degrees} was a record high last week!`);
                }
              })

    //Method chaining ( Alternative of Above )
                    temperatures.map(temperature => 
                        temperature.degrees > 70 ? { ...temperature, isHigh: true } : temperature 
                    ).forEach(temperature => {
                       if (temperature.isHigh) {
                         console.log(`Temperature ${temperature.degrees} was a record high last week!`);  
                       }
                    })  
                    */

//Filter 
        /*
        const restaurants = [
          { name: 'Cap City Diner', milesAway: 2.2 },
          { name: 'Chop Shop', milesAway: 4.1 },
          { name: 'Northstar Cafe', milesAway: 0.9 },
          { name: 'City Tavern', milesAway: 0.5 },
          { name: 'Shake Shack', milesAway: 5.3 }
        ];

        const results = restaurants.filter(restaurant => restaurant.name.startsWith('z'));
        const results1 = restaurants.filter(restaurant => restaurant.name.startsWith('C')&&restaurant.milesAway<2);
        console.log(results,results1);
        */



//Reduce
            /*
            const menuItems = [
              { item: "Blue Cheese Salad", price: 8 },
              { item: "Spicy Chicken Rigatoni", price: 18 },
              { item: "Ponzu Glazed Salmon", price: 23 },
              { item: "Philly Cheese Steak", price: 13 },
              { item: "Baked Italian Chicken Sub", price: 12 },
              { item: "Pan Seared Ribeye", price: 31 }
            ];

            const total = menuItems.reduce((accumulator, menuItem) => {
              return accumulator + menuItem.price;  
            }, 0);
            console.log(total);*/


            /*
                    const Numbers=[1,2,3,4,5];
                    const new_Nums=Numbers.reduce((acc,nums)=>{
                      acc.push(nums*2);
                      return acc;
                    },[]);
                    console.log(new_Nums);
                    
                            //OR

                    const doubledNumbers = Numbers.map(num => num * 2);
                    console.log(doubledNumbers);
                    const greaterNumbers = Numbers.reduce((acc, num) => num > 3 ? acc.concat(num) : acc, []); //push won't work. So, concat method was used. 
                    console.log(greaterNumbers);*/

//Array mutation with spread operator

              /*
                        const lunchMenu = ["Chapati",'Rice','Daal'];
                        const allMenu = lunchMenu;
                        allMenu.push("Juice");
                        console.log(lunchMenu); //[ 'Chapati', 'Rice', 'Daal', 'Juice' ] But Why?
                        //Here allMenu is passed as reference so when changes are made in allMenu actual thing is made in lunchMenu
                        */
                                  //Solution
                                      /*const lunchMenuIdeas = ['Harvest Salad', 'Southern Fried Chicken'];

                                      const allMenuIdeas = lunchMenuIdeas.concat('Club Sandwich');

                                      // allMenuIdeas.push('Club Sandwich');

                                      console.log(lunchMenuIdeas);*/

                                                      //OR

                                      /*const lunchMenu = ["Chapati",'Rice','Daal'];
                                      const allMenu = [...lunchMenu];
                                      allMenu.push("Juice");
                                      console.log(lunchMenu);*/

              //Non-mutating means creating a new Array and then making changes to it!
                        /*const breakfastMenuIdeas = ["Buckwheat Pancakes"];
                        const dinnerMenuIdeas = ["Glazed Salmon", "Meatloaf", "American Cheeseburger"];

                        const allMenuIdeas = [
                            ...breakfastMenuIdeas, 
                            "Harvest Salad", 
                            "Southern Fried Chicken",
                            ...dinnerMenuIdeas
                        ];
                        const otherMenuIdeas = [...breakfastMenuIdeas, ...allMenuIdeas];
                        console.log(otherMenuIdeas);
                        const saladIndex = allMenuIdeas.findIndex(idea => idea === 'Harvest Salad');

                        const finalMenuIdeas = [
                          ...allMenuIdeas.slice(0, saladIndex),
                          "Garden Salad",
                          ...allMenuIdeas.slice(saladIndex + 1)
                        ];
                        const meatloafIndex = allMenuIdeas.findIndex(idea => idea === 'Meatloaf');

                        const finalMenuIdeas = [
                          ...allMenuIdeas.slice(0, meatloafIndex),
                          ...allMenuIdeas.slice(meatloafIndex + 1)
                        ]
                        console.log(finalMenuIdeas);*/

/*Flexible Array Destructuring

                      const finalMenuItems = [
                        "American Cheeseburger",
                        "Southern Fried Chicken",
                        "Glazed Salmon"
                      ];

                      var [first, second] = finalMenuItems;

                      var [second, first] = [first, second]; //Swapping  Let & Const won't work in this case.
                      // let first = finalMenuItems[0];
                      // let second = finalMenuItems[1];
                      // let third = finalMenuItems[2];

                      // console.log(first, second);
                      console.log({ first },{ second });*/


            /*const finalMenuItems = [
              "American Cheeseburger",
              "Southern Fried Chicken",
              "Glazed Salmon"
            ];

            const [winner, ...losers] = finalMenuItems;

            console.log({ winner, losers });*/

//For End loop

                /*
                const obj = { one: 1, two: 2 };

                for (const key in obj) {
                  console.log('value', obj[key]);
                }
                        // Object.keys(), Object.values(), Object.entries()
                        //Conversion of Object to flexible array's
                        const user = {
                          name: 'John',
                          age: 29  
                        };
                        const keys=Object.keys(user);
                        console.log(keys);

                const values = Object.keys(user).map(key => user[key]);
                console.log(values);
                        //OR
                console.log(Object.values(user));
                console.log(Object.entries(user));

                const monthlyExpenses = {
                  food: 400,
                  rent: 1700,
                  insurance: 550,
                  internet: 49,
                  phone: 95  
                };

                const monthlyTotal = Object.values(monthlyExpenses).reduce(
                    (acc, expense) => acc + expense, 0
                );*/

                              /*const users = {
                                '2345234': {
                                  name: "John",
                                  age: 29
                                },
                                '8798129': {
                                  name: "Jane",
                                  age: 42
                                },
                                '1092384': {
                                  name: "Fred",
                                  age: 17 
                                }
                              };
                              console.log(Object.entries(users));

                              const usersOver20 = Object.entries(users).reduce((acc, [id, user]) => {
                                if (user.age > 20) {
                                  acc.push({ ...user, id });
                                }  
                                return acc;
                              }, []);
                              console.log(usersOver20);*/

/*Set

            const customerDishes = [
              "Chicken Wings",
              "Fish Sandwich",
              "Beef Stroganoff",
              "Grilled Cheese",
              "Blue Cheese Salad",
              "Chicken Wings",
              "Reuben Sandwich",
              "Grilled Cheese",
              "Fish Sandwich",
              "Chicken Pot Pie",
              "Fish Sandwich",
              "Beef Stroganoff"
            ];

            console.log(new Set([1, 1, 3]).size);
            console.log(new Set([[1], [1], [3]]).size); //Set doesn't make duplicates
            const numbers = new Set([[1], [2], [3]]);

            for (const num of numbers) {
              console.log(num);  
            }

                        const uniqueDishes = [...new Set(customerDishes)];
                        console.log(uniqueDishes);*/


//Array's & Set is Completed. 

            /*
            const numbers = [1, 2, 3, 4, 5];
            for (let i = 0; i < numbers.length; i++) {
              console.log(numbers[i]);
            }

                      numbers.forEach(number => {
                        console.log(number);  
                      });

            /* 
            - map()
            - filter()
            - reduce()
            - some() / every()
            - find() / findIndex()
            - forEach()

            Plus - 
            - slice()
            - concat()
            - includes()
            - array spread operator
            */

//====================================================================================================================================

//====================================================================================================================================
//Classes
/* 
Classes are important when creating powerful applications & is used lot in JS libraries & frmwrks like React, Angular, Vue & So on.
Concepts to be covered -
  1.Concept of Constructors, how it helps creating objects & objects sharing behaviours through concept of Prototype Chain.
  2.How to share features between classess ( Inheritance ).
  3.fix `this` problems with .bind() 
*/

//Constructors

    //Constructor function
      //Naming convention - function Function(){} here the first letter must be capital as this is convention that tells this function isn't a normal function & that this one is used to create objects.
      //constructor functions enables us to share functionality using property called "Prototype Chain"
      //Function are just special JS Objects which has its own methods.
                              // const student1 = {
                              //   id: 1,
                              //   name: "Reed",
                              //   subjects: [],
                              //   addSubject(subject) {
                              //     this.subjects = [...this.subjects, subject];
                              //   }
                              // }
              //Solution

              // constructor function

                    /*
                    function Student(id, name, subjects = []) {
                      this.id = id;
                      this.name = name;
                      this.subjects = subjects;  
                    }
                    Student.prototype.addSubject = function(subject) {
                      this.subjects = [...this.subjects, subject];   
                    }
                    Student.prototype.removeSubject = function(subject) {
                      this.subjects = this.subjects.filter(sub => sub!='chemistry');
                    }

                    const student1 = new Student(1, 'Reed',['maths','japanese','computer science','chemistry']);

                    student1.addSubject('Physics');
                    student1.removeSubject('chemistry');
                    console.log(student1.subjects);
                    // We mustn't use arrow function since we can't use this in it.

                    console.log(new Student(2, 'Rehaan'));
                    */
                    
              //Prototype Chain Advanced 
                    // prototypical inheritance - each instantiated object (from constructor function) inherits from prototype

                    // every object has prototype

                  
                    //console.log(Object.getPrototypeOf({}));  //Output is {} Null Prototype
                            //if 
                                //console.log(object.getPrototypeOf({})); 
                                //error since the first letter must be capital but here its small.


                    //console.log(Object.getPrototypeOf({}).constructor);
                          //this tells what the constructor of {} was that is Object Ofc.
                    
                    //console.log(new Object()); //Ouput is {}

                        /* Internal working of prototype chain inheritance 
                        function Student(id, name, subjects = []) {
                          this.id = id;
                          this.name = name;
                          this.subjects = subjects;
                        }

                        const student1 = new Student(1, 'Reed');

                        console.log(Object.getPrototypeOf(student1).constructor);
                        console.log(Object.getPrototypeOf(student1));
                        */
                        //Output
                                      /*
                                      Student(id, name, subjects = []) {
                                        this.id = id;
                                        this.name = name;
                                        this.subjects = subjects;
                                      }
                                      {}
                                      */


                    //dunder proto or underscore Prototype  
                        //console.log(student1.__proto__ === Student.prototype); //Output is true

                        //console.log(student1.__proto__); //Output is Student
 
                        //console.log(student1.__proto__.__proto__ === Object.prototype); //Output is  true
                        //console.log(student1.__proto__.__proto__);//Output is Object

                              //By all this we can say that any constructor functions prototype forms a chain back to Object prototype

                              //console.log(student1.__proto__.__proto__.__proto__); //Output is null as chain has ended
      //Classes
        // classes - create objects with shared methods. same purpose as of constructor function.
            // classes === constructor functions

                //console.log(typeof class Student {}); //Output is function


                /*class Student {
                  constructor(id,name,subjects=[]) {
                    this.id=id;
                    this.name=name;
                    this.subjects=[...subjects];
                      //We must create this first to create properties of a class
                      //Also used to create the this context
                  }
                  getStudentName(){
                    return `Student name is ${this.name}`;
                  }
                  addSubject(subject) {
                    this.subjects=[...this.subjects,subject];
                  }
                }
                const student1 = new Student(1,"Reed");
                student1.addSubject("Chemistry");
                console.log(student1.subjects);
                console.log(student1.getStudentName());
                console.log(Student.prototype.addSubject);
                console.log(Student.prototype);
                console.log(Student.__proto__.__proto__);
                    //same as constructor here also the methods are defined to the prototype not the object or class
                    */

      /*Inheritance
        class Product {
          constructor(name,price,isDiscountable){
            this.name=name;
            this.price=price;
            this.isDiscountable=isDiscountable;
          }
          checkDiscount(){
            return this.isDiscountable;
          }
        }
        class SalesProduct extends Product {
          constructor(name,price,isDiscountable,discount){
            super(name,price,isDiscountable);
            this.discount=discount;
          }
          getDiscountPrice(){
            if(super.checkDiscount()){
              return this.price*(100-this.discount)/100;
            }else {
              return `${this.name} is not eligible for discount`;
            }
          }
        }
        const Product1=new SalesProduct("Umbrella",20,0,20);
        console.log(Product1.getDiscountPrice());
        console.log(Product1)*/

                          // React 
                          // https://reactjs.org

        //Getters & Setters 
            //these are special class features used to create psuedoPrivate member variables or member methods. since, till now the language doesn't have a seperate method to use private.
              //getter
                //But this doesn't solve the problem of member variables bieng tampered
                        /*
                        class Product {
                          constructor(name, price, discountable) {
                            this.name = name;
                            this.price = price;
                            this.discountable = discountable;
                          }

                          get clearancePrice() {
                            return this.price * 0.5;
                          }
                        }

                        const product1 = new Product("Coffee Maker", 99.95, false);
                        // product1.price = {};
                        console.log(product1.clearancePrice);
                        */
              //Setter
                  //for all setter we need getter to retreive the value which we have set.
                          /*class Product {
                            constructor(name, price, discountable) {
                              this.name = name;
                              this.price = price;
                              this.discountable = discountable;
                            }

                            get clearancePrice() {
                              return this.price * 0.5;
                            }
                            
                            set newPrice(price) {
                              this.price = price;  
                            }
                          }

                          const product1 = new Product("Coffee Maker", 99.95, false);
                          product1.newPrice = 20;
                          console.log(product1.newPrice); //Undefined thats why we must use setter with getter not alone
                          */
                  //Bridge Property (Internal)
                      /*When a property starts with _ it means it shouldn't be used outside of the class and shouldn't be modified
                          class Product {
                            constructor(name, price, discountable) {
                              this._name = name;
                              this._price = price;
                              this.discountable = discountable;
                            }
                            get name(){
                              return this._name;
                            }
                            get price() {
                              return this._price;
                            }
                            
                            set price(price) {
                              if (typeof price !== "number") {
                                return this._price;
                              } else {
                                this._price = price; 
                              }
                            }
                            set name(name){
                              if(name!==''){
                                this._name=name;
                              }else{
                                return this._name;
                              }
                            }
                          }

                          const product1 = new Product("Coffee Maker", 99.95, false);
                          product1.price = 20;
                          product1.name="Umbrella";
                          console.log(product1.price); // Output is 20
                          console.log(product1.name); // Output is Umbrella
                          */
/*
const isAuth = true;
const user = {
  favorites: []
};

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  handleFavoriteProduct() {
    if (isAuth) {
      setTimeout(()=>this.favoriteProduct(), 1000); 
      
      //Since, this.favouriteProduct() is invoked by setTimeout so it looses original binding.

    } else {
      console.log("You must be signed in to favorite products!");
    }
  }

  favoriteProduct() {
    user.favorites.push(this.name);
    console.log(`${this.name} favorited!`);
  }
}
                       
const product1 = new Product('Coaster', 89.99);
product1.handleFavoriteProduct();
*/

                            /*
                            const isAuth = true;
                            const user = {
                              favorites: []
                            };

                            class Product {
                              constructor(name, price) {
                                this.name = name;
                                this.price = price;
                                this.favoriteProduct = () => {
                                                            user.favorites.push(this.name);
                                                            console.log(`${this.name} favorited!`);
                                                          }
                              }

                              handleFavoriteProduct() {
                                if (isAuth) {
                                  setTimeout(this.favoriteProduct, 1000);
                                } else {
                                  console.log("You must be signed in to favorite products!");
                                }
                              }
                            }
                                                  
                            const product1 = new Product('Coaster', 89.99);
                            product1.handleFavoriteProduct();
                            */
/* 

//This solution is great but it wouldn't be a feasable when many methods are defined.

            const isAuth = true;
            const user = {
              favorites: []
            };

            class Product {
              constructor(name, price) {
                this.name = name;
                this.price = price;
              }

              handleFavoriteProduct() {
                if (isAuth) {
                  setTimeout(this.favoriteProduct.bind(this), 1000);
                } else {
                  console.log("You must be signed in to favorite products!");
                }
              }

              favoriteProduct() {
                user.favorites.push(this.name);
                console.log(`${this.name} favorited!`);
              }
            }

            const product1 = new Product('Coaster', 89.99)
            product1.handleFavoriteProduct()
*/
/* 
//Best solution

                                  const isAuth = true;
                                  const user = {
                                    favorites: []
                                  };

                                  class Product {
                                    constructor(name, price) {
                                      this.name = name;
                                      this.price = price;
                                      this.favoriteProduct = this.favoriteProduct.bind(this);
                                    }

                                    handleFavoriteProduct() {
                                      if (isAuth) {
                                        setTimeout(this.favoriteProduct, 1000);
                                      } else {
                                        console.log("You must be signed in to favorite products!");
                                      }
                                    }

                                    favoriteProduct() {
                                      user.favorites.push(this.name);
                                      console.log(`${this.name} favorited!`);
                                    }
                                  }

                                  const product1 = new Product('Coaster', 89.99)
                                  product1.handleFavoriteProduct()
                                  */

        //Advanced Class fields Proposal
//====================================================================================================================================

//====================================================================================================================================
//DOM
  //Till now we have learnt a lot of JS Skills but not anything related to UI but with DOM we will see how to use JS to display actual application interface to users.

          //What is DOM?
          //Get single & multiple html elements
          //create and modify html elements
          //Dynamically add CSS Stlyes
          //Work with & understand events

        //DOM(Document Object Model) - It's the bridge between HTML & CSS with JS

            //When speaking about DOM we actually mean document 
              //document is an object that represents all HTML files as objects that can be modified.
              //We should DOM as tree and each element of HTML be nodes. so each node is made as object by DOM that we can interact using JS
              
              
                  /*
                  Why document isn’t defined in Node.js
                    - In a browser environment, document is part of the DOM API. It represents the HTML document loaded in the window, and you can manipulate it with methods like document.querySelector() or document.createElement().
                    - In Node.js, there is no DOM by default. Node is designed for server-side JavaScript, so it doesn’t provide document, window, or other browser-specific globals. That’s why if you try to access document in Node, you’ll get a ReferenceError.

                  */


                      //console.log(document.head); // Output is <head>...</head> but this is object not element.
        
        
       //Dynamically adding & modifying HTML Elements

                      /*
                      const p = document.createElement('p');
                      p.innerText="hello World, I am learning how to dynamically add text to HTML using JS by DOM"
                      document.body.append(p);
                      p.style.color = 'white';
                      p.style.backgroundColor = 'black';
                      p.addEventListener('click',()=>console.log("Clicked"));*/
                                                        /*const home = document.getElementById('Home');
                                                        console.log(home);
                                                        const links = document.querySelectorAll('a'); //links is nodeList
                                                        const link = document.querySelector('a'); 
                                                        console.log(link);
                                                        links.forEach(link=>{
                                                          console.log(link);
                                                        });
                                                        links.forEach(link=>{
                                                          if(link.matches('a[href="/Login"]')){
                                                            console.log(link);
                                                          }
                                                        });
                                                        const divs = document.getElementsByTagName('div');
                                                        console.log(divs);*/
                                                        /*divs.forEach(div=>{
                                                          console.log(div);
                                                        });*/ //Error since divs isn't object its HTMLCollection which is different ADT.

                      /*const newPost = document.createElement('div');
                      newPost.className = 'top-post';
                      newPost.innerHTML = "<strong>New Post added!</strong>";
                      //document.body.prepend(newPost);
                      const post =  document.querySelector('.Post');
                      post.append(newPost);*/

          //Dynamically adding CSS Styles

              /*Any CSS Property must be camelCased

                                  const post = document.querySelector('.Post');
                                  const postHeadline = document.createElement('p');
                                  postHeadline.innerText = "Post 1";
                                  post.prepend(postHeadline);
                                  console.log(post.style);//CSSStyleDeclaration
                                  post.style.display = 'flex';
                                  post.style.justifyContent = "space-around";
                                  postHeadline.style.paddingRight = '20px'; 
                                  postHeadline.style.width = '130px'; 
                                  console.log(post.className);
                                  post.classList.remove('Post');
                                  post.classList.add('Post');
                                  post.classList.toggle('Post');
                                  post.style.padding = '30px';*/

        //Eventlistener
          //An event listener in JavaScript is simply a function that waits for a specific event (like a click or keypress) on a target element and runs code when that event happens.
            //Eg - document.getElementById("btn").addEventListener("click", () => alert("Button clicked!"));
            /*const post = document.querySelector('.Post');
            post.addEventListener('click',(event) => {
                console.log(`Do you want to edit ${event.target} ?`);
            });*/


            //You can't setup a evenlistener for nodeList but you can for DOM individual element.

            /*const posts = document.querySelectorAll(".post");
            posts.forEach(post => {  
              post.addEventListener('click', event => {
                console.log('Do you want to edit this post?')
              });
            })*/
            //But if you added a new post dynamically using JS then QuerySelector won't pick it up as it gives static list.

            //Solution
            /*document.body.addEventListener('click',(event)=>{
              //This won't work since matches gives exact match either p but not parent that is div
              if(event.target.matches('.Post')){
                console.log("Do you want to edit this post ?");
              }
             if(event.target.closest('.Post')){
                console.log("Do you want to edit this post ?");
              }
            });*/



            //more eg mouseout, keyups, keydown
            /*document.body.addEventListener('mouseover',(event)=>{
              //This won't work since matches gives exact match either p but not parent that is div
              if(event.target.matches('.Post')){
                console.log("Do you want to edit this post ?");
              }
             if(event.target.closest('.Post')){
                console.log("Do you want to edit this post ?");
              }
            });*/
//====================================================================================================================================

//====================================================================================================================================
//Till now we have learnt Synchronous JS that is every codes output is predictable and order is predictable.
//What if certain tasks takes unpredictable amount of time these tasks or operations are Asynchronous or Async.

        //Async Operations
          //1. We will deal with the callback pattern of async code called callBack Hell resulting into unreadable pattern and how to fix these callBackHell using new feature in language called promises
          //2. How to use fetch, which makes use of promises. Also, fetch allows to request and change data in places outside apps.
          //3. Simplify the promises with simpler syntax called async await.
          //4. How to catch error using the async await patterns

// Async JS helps us build dynamic apps & Async code is non-blocking.
      /*navigator.geolocation.getCurrentPosition(position=>{
        console.log(position);
      });
      console.log('Done');*/
        //Output - 
              //Done
              //GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1770912311383}
        //It's because Async JS takes some time thats the reason 'Done' prints first then late does this function
    
    /*Call Back Hell
          navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            getRestaurant(position,restaurant => {
              console.log(restaurant);
            });
            console.log('Done');
          });*/

          /*Output 
          GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1770988194188}
          Done
          */

    //Another problem is that we create a hierarchy for these callback functions. so, if there is an error in getting position we dont get any information about the execution of functions we just deal with the data and hopefully the program doesn't broke 
    //This issue is called as inversion of control problem

    //For more clearity we can use setTimeout() and addEventListener() these are called as asynchronous functions and object.


  //Promises
      //Suppose you go to a restaurant where after ordering food you have to wait till order is prepared and pick it up yourself. [Dubai mall Incident same system is followed in this context]
      //For this you must give up your other works and with very less assurance that your order is correct. [Suppose you ordered Pizza but instead got burger]
      //Here, buzzer system is followed as it tells whether whether order is pending or rejected for some reason.
      //Promises are same as the buzzers
      //Promises tell us the status of the async code and at the same time we can do something else.
      //Once, it comes out as fullfilled or rejected we handle either outcome.

      //Unlike call pattern promises gives us full control
      

          //Three states of promises - 
            //Fullfilled, rejected & pending.
          /*const promise = new Promise((resolve,reject)=>{
            setTimeout(resolve('Done'),1000);
            //resolve() can't be called twice same goes for reject also the reject and resolve can't be called at the same time the promise either fullfills & rejects.
          });
          console.log(promise);
          promise.then((value)=>{console.log(value)}).catch(()=>{console.log('failure')});*/
          //When reject is called the code execute the function passed to catch and when resolved is called function passed to then is called.
          
                  /*
                    const promise = new Promise((resolve, reject) => {
                      setTimeout(() => reject(Error('Promise failed.')), 1000);  
                    });

                    promise.then(value => console.log(value)).catch(error => console.error(error));*/


                    /*const promise = new Promise((resolve, reject) => {
                      setTimeout(() => reject(Error('Promise failed.')), 1000);  
                    });

                    promise
                      .then(value => console.log(value))
                      .catch(error => console.error(error))
                      .finally(() => console.log('done'));*/


          /*const promise = new Promise((resolve,reject)=>{
              navigator.geolocation.getCurrentPosition((position)=>{
                resolve(position);
              },error => {reject(error)});
          });
          promise.then(value=>{console.log(value)}).catch(error=>{console.error(error)}).finally(() => console.log('done'));*/

          //Shorter syntax
                /*const promise = new Promise((resolve,reject)=>{
                    navigator.geolocation.getCurrentPosition(resolve,reject);
                });
                promise.then(value=>{console.log(value)}).catch(error=>{console.error(error)}).finally(() => console.log('done'));*/
                


                /*const pause = new Promise((resolve,reject)=>{
                    setTimeout((value)=>resolve(value),1000,'hi');
                });
                pause.then((value)=>{console.log(value)}).catch((value)=>{console.log(value)});*/

    /*API

      ==============================
      API + FETCH — ULTRA-COMPACT SUMMARY
      ==============================

      1. WHY APIs EXIST
      -----------------
      • Apps often need data/services they cannot create themselves (weather, news, maps).
      • APIs provide this external data or functionality.
      • Without APIs, you’d need to build entire services (e.g., weather forecasting) yourself.

      2. WHAT IS AN API
      -----------------
      • API = Application Programming Interface.
      • It is a contract/interface that allows software to talk to other software.
      • In simple terms: “What a tool exposes so you can use it.”
      • Examples:
        - window object → Browser API
        - geolocation → Geolocation API
      • APIs are NOT JavaScript-only. All languages use APIs.

      3. REST APIs (MOST IMPORTANT TYPE)
      ---------------------------------
      • REST APIs provide access to external data over the internet.( This network request is known as AJAX. )
      • Used when data is NOT owned by your app.
      • Communication happens via HTTP requests.
      • Data is usually returned as JSON.

      4. JSON
      -------
      • JSON = JavaScript Object Notation.
      • Looks like JS objects but is just a data format.
      • Needs conversion:
        - JSON → JS: response.json()
        - JS → JSON: JSON.stringify()

      5. CRUD ↔ HTTP METHODS
      ----------------------
      CRUD Operation      HTTP Method
      Create              POST
      Read                GET
      Update              PUT / PATCH
      Delete              DELETE

      Notes:
      • POST, PUT, PATCH → require request body (data).
      • GET, DELETE → no body needed.

      6. API ENDPOINTS
      ----------------
      • Endpoint = specific URL you request.
      • Example:
        https://jsonplaceholder.typicode.com/posts/1
      • Base URL + Route.
      • Always check API documentation for valid routes & methods.

      7. FETCH API (CORE TOOL)
      -----------------------
      • fetch() is part of the window API.
      • Used to make network (AJAX) requests.
      • fetch(url) → returns a Promise.

      8. BASIC GET REQUEST
      --------------------
      fetch(endpoint)
        → returns Promise<Response>
        → response.json()
        → returns Promise<Data>
        → usable JS object

      Key idea:
      • fetch DOES NOT give data directly.
      • It gives a Promise → Response → JSON → Data.

      9. RESPONSE OBJECT
      ------------------
      Important properties:
      • response.ok     → true if status is 2xx
      • response.status → HTTP status code
      • response.json() → converts body to JS object

      10. ERROR HANDLING WITH FETCH
      -----------------------------
      • fetch resolves even on 404 / 500.
      • You must manually check response.ok.
      • If !ok → throw error.
      • Thrown errors go to .catch().

      Status Codes:
      • 2xx → Success
      • 4xx → Client/request error (your fault)
      • 5xx → Server error (API fault)

      11. POST REQUEST (CREATING DATA)
      --------------------------------
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          body,
          userId
        })
      })

      Differences from GET:
      • Second argument (options object).
      • Includes method, headers, body.

      12. WHY APIs USE ASYNC CODE
      ---------------------------
      • Network requests take time.
      • JS cannot block execution.
      • Promises + async/await handle this delay.
      • APIs = biggest source of async code in real apps.

      13. WHEN YOU NEED AN API
      -----------------------
      • Whenever data is external:
        - Weather
        - News
        - Maps
        - Auth
        - Payments
      • If data exists → an API probably already exists.

      14. LEARNING APIs PROPERLY
      -------------------------
      • Reading API documentation is a core dev skill.
      • Start with:
        - Simple GET endpoints
        - No-auth APIs
      • Practice making multiple requests.
      • Expect confusion initially — normal.

      15. BIG PICTURE (80/20 RULE)
      ----------------------------
      • API = external service.
      • REST API = structured data access.
      • HTTP methods map to CRUD.
      • fetch = tool to talk to APIs.
      • JSON = data format.
      • Promises = async handling.

      If you master these:
      → You can build real-world, dynamic applications.
      → This is the foundation of modern web development.
==============================*/
  //REST API's
    // JSON - JavaScript Object Notation
        // http://jsonplaceholder.typicode.com/posts

    

    // fetch is an tool of window API. It needs an API endpoint.
    // JSONPlaceholder is a free online REST API that you can use whenever you need some fake data. It can be in a README on GitHub, for a demo on CodeSandbox, in code examples on Stack Overflow, ...or simply to test things locally.
      
        /*JSONPlaceholder comes with a set of 6 common resources:

                  /posts	100 posts
                  /comments	500 comments
                  /albums	100 albums
                  /photos	5000 photos
                  /todos	200 todos
                  /users	10 users
        */

    /*Routes
              All HTTP methods are supported. You can use http or https for your requests.

                    GET	/posts
                    GET	/posts/1
                    GET	/posts/1/comments
                    GET	/comments?postId=1
                    POST	/posts
                    PUT	/posts/1
                    PATCH	/posts/1
                    DELETE	/posts/1
    */

    /* Eg -
              fetch('https://jsonplaceholder.typicode.com/posts/1')  // URL - hostname/route
                .then((response) => response.json())
                .then((json) => console.log(json));

              Output -
                {
                  id: 1,
                  title: '...',
                  body: '...',
                  userId: 1
                }
                  */

      //For more info checkout the documentation of JSON placeholder REST API https://jsonplaceholder.typicode.com

      /* Routes change as API changes or gets updated.
                # API Route Change Checklist

                  1. **Check Official Documentation**
                    - Look for versioned endpoints (e.g., /v1, /v2).
                    - Confirm current routes against your codebase.

                  2. **Review Changelogs / Release Notes**
                    - Identify deprecated routes.
                    - Note new or modified endpoints.

                  3. **Use OpenAPI / Swagger Specs**
                    - Download or reference the schema.
                    - Validate routes programmatically.

                  4. **Test in Sandbox / Dev Environment**
                    - Run requests against updated endpoints.
                    - Confirm expected responses before production rollout.

                  5. **Automate Validation**
                    - Use Postman collections or API testing scripts.
                    - Catch mismatches early.

                  6. **Monitor for Updates**
                    - Subscribe to provider’s update feeds.
                    - Set alerts for breaking changes.

                  # Rule of Thumb:
                  Documentation is the single source of truth. 
                  Never rely on assumptions or outdated routes.*/


        //console.log(fetch('https://jsonplaceholder.typicode.com/Posts/1')); // So, this is a Promise

        /*fetch('https://jsonplaceholder.typicode.com/Posts/1')
          .then(res=>res.json())
          .then(data=>console.log(data))*/

        
        /*const blogPost = {
          title: "Cool post",
          body: "lkajsdflkjasjlfda",
          userId: 1  
        }

        fetch('https://jsonplaceholder.typicode.com/posts', {
          method: "POST",
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(blogPost)
        })
          .then(response => response.json())
          .then(data => console.log(data))*/


          //Error handling
          /*
          fetch('https://jsonplaceholder.typicode.com/pots/1')
            .then(response => {
                if (!response.ok) {
                  throw new Error(response.status);  
                }
            })
            .then(data => console.log(data))
            .catch(error => console.error(error))*/


                  /* 🔹 Understanding `throw new Error();` in JavaScript

                        1. `throw`
                          - Used to manually generate an exception.
                          - Immediately stops the current function and passes control to the nearest `catch` block.
                          - If no `catch` exists, the program terminates.

                        2. `new Error()`
                          - Creates a new Error object using the built-in `Error` constructor.
                          - Properties include:
                            • name → type of error (default: "Error")
                            • message → custom error message
                            • stack → stack trace for debugging

                        3. `throw new Error("message");`
                          - Combines both parts:
                            • `throw` → triggers the exception
                            • `new Error("message")` → provides structured error details

                        Example:
                        function getRectArea(width, height) {
                          if (isNaN(width) || isNaN(height)) {
                            throw new Error("Parameter is not a number!");
                          }
                        }

                        try {
                          getRectArea(3, "A");
                        } catch (e) {
                          console.error(e);
                          // Output: Error: Parameter is not a number!
                        }*/


        // More info is at https://github.com/public-apis/public-apis



        /*async function getBlogPost() {
          return 'works here too!';  
        }

        getBlogPost().then(value => console.log(value));*/




        // Async/await 
      
                /*async function getBlogPost() {
                  const promise = new Promise((resolve, reject) => {
                    setTimeout(() => resolve('blog post'), 1000);
                  });
                  const result = await promise;
                  console.log(result);
                  console.log('done');
                }

                getBlogPost();*/


            // This syntax doesn't replace promises, promises are wrapped with better syntax
            // You can't resolve a promise with await within a function which is defined with async keyword
            // Async can work without await but await can't but their is something called as top level await where await doesn't need async but we must use async when defining await inside a function


        // A different of writing the fetch promises using async/await
                  /*async function getPost() {
                    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');  
                    const data = await response.json();
                    console.log(data);
                  }

                  getPost();*/

        // Error Handling using try/catch its the best way because it catches synchronous as well as asynchronous errors

          // async error
                  /*async function runAsync() {
                    try { 
                      await Promise.reject(Error('Oops')); // Only the await keyword make the rejected promises catchable.
                    } catch (error) {
                      console.error(error); 
                    }  
                  }

                  runAsync();*/

            // Alternative

                  /*
                      async function runAsync() {
                        return await Promise.reject(Error('Oops')); 
                      }

                      runAsync().catch(error => console.error(error));*/

            /*
            async function getGithubUser() {
              try {    
                const response = await fetch('https://api.github.com/users/laksjdflasjfdlkjadfjk');
                console.log(response);
                if (!response.ok) {
                  throw new Error(response.status);  
                }
              } catch (error) {
                console.error(error);  
              } 
            }
            getGithubUser();*/

          // sync error
                        /*async function runAsync() {
                          try { 
                            await Promise.resolve('hello world'); 
                            null.someProperty = true; 
                          } catch (error) {
                            console.error(error); 
                          }  
                        }

                        runAsync();*/
//====================================================================================================================================


//====================================================================================================================================
//Google keep clone just see the videos no need of code here 
//====================================================================================================================================
//Essential Concepts and Hacker News clone 