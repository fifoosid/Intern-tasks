'use strict';

(function() {
    $(function() {
        var operations = [
            {
                command: "odd",
                callback: function() {
                    // console.log([1,3,5,7,9,11,13,15,17,19]);
                    return [1,3,5,7,9,11,13,15,17,19];
                }
            },
            {
                command: "even",
                callback: function() {
                    // console.log([2,4,6,8,10,12,14,16,18,20]);
                    return [2,4,6,8,10,12,14,16,18,20];
                }
            }
        ];

        function executeTask(callback) {
            var promise = new Promise(function(resolveCallback, rejectCallback) {
                setTimeout(function(){
                    console.log(callback());
                    resolveCallback();
                }, Math.round(1000 * Math.random()));
            });

            return promise;
        }

        var promises = [
            executeTask(operations[0].callback),
            executeTask(operations[1].callback)
        ];

        function sortNumbers(a, b) {
            return a - b;
        }

        Promise.all(promises)
            .then(function() {
                let a = [];

                a = a.concat(operations[0].callback());
                a = a.concat(operations[1].callback());

                a.sort(sortNumbers);

                for(let i = 0; i < a.length; i++) {
                    a[i] *= a[i];
                }

                console.log(a);
            });
    });
})();