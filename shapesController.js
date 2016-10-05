var app = angular.module('areaCalculatorApp', ['ngAnimate', 'ui.router']);
app.controller("shapesController", function($scope, $state) {
  $scope.shapes = [
                    {"name": "Rectangle" , "value": "Rectangle" , "params": [{"name": "Length", "value": ""}, {"name": "Breadth", "value": ""}], "area": function(l, w) {return l*w;}},
                    {"name": "Circle" , "value": "Circle" , "params": [{"name": "Diamter", "value": ""}], "area": function(d) {return Math.PI * d * d/ 4;}},
                    {"name": "Square" , "value": "Square" , "params": [{"name": "Side", "value": ""}], "area": function(s) {return s*s;}},
                    {"name": "Ellipse" , "value": "Ellipse" , "params": [{"name": "MajorAxis", "value": ""}, {"name": "MinorAxis", "value": ""}], "area": function(a, b) {return Math.PI*a*b;}}
                 ];
  $scope.selectedShape='Rectangle';
  $scope.stepNum = 1;
  $scope.steps = [1, 2, 3];

  $scope.round = function(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  };

  $scope.selectView2 = function(shape) {
    $scope.stepNum++;
    $scope.selectedShape = shape;
    $scope.selectedShapeData = _.filter($scope.shapes, function(obj) {return obj.value===shape});
    $state.go('inputs');
  }

  $scope.selectView3 = function() {
    var param1, param2;
    param1 = $scope.selectedShapeData[0].params[0].value;
    param2 = $scope.selectedShapeData[0].params[1] ? $scope.selectedShapeData[0].params[1].value: undefined;
    $scope.stepNum++;
    $scope.area = $scope.round($scope.selectedShapeData[0].area(param1, param2), 2);
    $state.go('results');
  }

  $scope.selectView4 = function() {
    $scope.stepNum = 1;
    $state.go('options');
  }
})
