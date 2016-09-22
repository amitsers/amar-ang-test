// app.controller("Test", function($scope, $rootScope) {
//     $scope.Piyush = {};
//     $scope.Piyush.aa = "Piyush Parashar";
//     $scope.Piyush.rollno  = 2;

//     $scope.dynamicCondition = false;
// });

// app.directive('student', function() {
//     var directive = {};
//     directive.restrict = 'E';
//     // directive.template = "Student: <b>{{student.name}}</b> , Roll No: <b>{{student.rollno}}</b>";
//     directive.scope = {
//        condition : "="
//     }


//     directive.compile = function(element, attributes) {
//        //element.css("border", "1px solid #cccccc");
//        directive.scope.$watch('condition', function(condition){
//             if(condition){
//                 element.css('color', 'red');
//             }
//             else{
//                 element.css('color', 'black');
//             };
//         });
//        // var linkFunction = function($scope, element, attributes) {
//        //  console.log(element);
//        //    element.html("<div class='testClass'>aa<div>Student: <b>"+$scope.student.aa +"</b> , Roll No: <b>"+$scope.student.rollno+"</b><br/>");
//        //    //element.css("background-color", "#ff00ff");
//        //    console.log(element['context'].children[0]);
//        // }
//        return linkFunction;
//     }
    
//     return directive;
// });



// app.controller("Test", function($scope, $rootScope) {
//     $scope.dynamicCondition = false;
// })

// .directive('testCase', function () {
//     return {
//         restrict: 'A',
//         scope: {
//             'condition': '='
//         },
//         link: function (scope, element, attrs) {
//             scope.$watch('condition', function(condition){
//                 if(condition){
//                     element.css('color', 'red');
//                 }
//                 else{
//                     element.css('color', 'black');
//                 };
//             });
//         }
//     }
// });


app.controller('Test', function($scope) {
  $scope.focusinControl = {};
})

.directive('focusin', function factory() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div>A:{{internalControl}}</div>',
    scope: {
      control: '='
    },
    link: function(scope, element, attrs) {
      scope.internalControl = scope.control || {};
      scope.internalControl.takenTablets = 0;
      scope.internalControl.takeTablet = function() {
        console.log(3);
        scope.internalControl.takenTablets += 1;
      }
    }
  };
});


// http://stackoverflow.com/questions/16881478/how-to-call-a-method-defined-in-an-angularjs-directive