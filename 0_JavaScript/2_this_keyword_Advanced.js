const name="Rehaan";
const obj = {
    func(){
        console.log(this.name);
    }
};
obj.func(); //Null
//Why
    //this sees objs scope as global & this doesn't follow lexical scope
    //this controls the variable of the call context so that you can access the variable of call context outside the context
//Lexical scope is the rule that lets inner functions access variables from outer scopes more than 1 (including global).
                                // 1. Lexical Scope Example
                                let globalVar = "global";

                                function outer() {
                                let outerVar = "outer";

                                function inner() {
                                    let innerVar = "inner";

                                    // Lexical scope chain: inner -> outer -> global
                                    console.log(innerVar);   // local scope
                                    console.log(outerVar);   // outer scope
                                    console.log(globalVar);  // global scope
                                }

                                inner();
                                }

                                outer();

                                // 2. Global Scope and `this`
                                console.log(this); 
                                // non-strict mode: window (browser) or global (Node)
                                // strict mode: undefined

                                // 3. Normal vs Arrow Functions with `this`
                                function normal() {
                                console.log("normal:", this);
                                }

                                const arrow = () => {
                                console.log("arrow:", this);
                                };

                                normal(); // `this` depends on caller (global or object)
                                arrow();  // `this` inherits from enclosing lexical scope

                                // 4. Lexical Scope vs Local Scope
                                function demo() {
                                let localVar = "local";

                                function nested() {
                                    console.log(localVar);   // accessible via lexical scope
                                    console.log(globalVar);  // accessible via lexical scope
                                }

                                nested();
                                }

                                demo();

                                /*
                                SUMMARY:
                                - Lexical scope = scope chain determined by code placement (local + parent + global).
                                - Local scope = variables inside the current function/block only.
                                - Lexical scope gives ability to access outside variables.
                                - `this` is NOT lexically scoped (except arrow functions).
                                - `this` depends on call site in normal functions, global vs object context.
                                */


//Dynamic Scope vs Lexical Scope
        // Both gives same result but the mechanism is different

        /*Dynamic
            //Variables are resolved by looking at the call stack at runtime (who called the function)
                Behavior: If inner() is called by outer(), it sees outer’s variables. If called by someone else, it would see that caller’s variables.
                Unpredictable: You can’t know what variable will be used just by reading the code — you must trace the runtime calls.
            */

        /*Lexical
            //Variables are resolved by the written structure of the code (where the function is defined)
                Behavior: inner() always sees outerVar because it was defined inside outer(). Even if you call inner() from somewhere else, it still closes over outerVar.
                Predictable: You can know what variable will be used just by looking at the source code.
                */


        /* Pseudocode with dynamic scope
        x = 10

        procedure outer() {
        x = 20
        inner()   // inner will see x=20 because outer called it
        }

        procedure inner() {
        print(x)  // resolves to caller's x at runtime
        }

        outer()    // prints 20
        */


                        /* JavaScript (lexical scope)
                        let x = 10;

                        function outer() {
                        let x = 20;
                        function inner() {
                            console.log(x); // 20 (resolved by code placement)
                        }
                        inner();
                        }

                        outer(); // prints 20
                        */


// Bonus hint on Arrow function and "this"

/*
const obj = {
  value: 20,
  arrow: () => console.log(this.value)
};
obj.arrow(); // undefined, because arrow captured `this` from global scope                        
*/