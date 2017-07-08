var path = require('path');
var expect = require('chai').expect;

var knapsack_logistics = require(path.join(__dirname, '..', './knapsack-logistics.js')).knapsack_logistics;
var solveKnapsack = require(path.join(__dirname, '..', './knapsack-logistics.js')).solveKnapsack;

describe('knapsack_logistics()', function () {
   'use strict';

   it('exists', function () {
      expect(knapsack_logistics).to.be.a('function');
   });

   it('test single pallet fill', function () {
      var x = solveKnapsack(
         [
            [1, 400, 200],
            [2, 400, 200],
            [3, 500, 300],
            [4, 200, 200],
            [5, 500, 300],

         ], 1000, 1100);
      // console.log(x);
   });

   it('test set 2', function () {
      var x = solveKnapsack(
         [
            [1, 500, 100],
            [2, 900, 500],

         ], 1000, 1100);
      // console.log(x);
   });

   it('test pallets fill', function () {
      var x = knapsack_logistics(
         ['A', 'B', 'C'],
         1100, 1000,
         [
            [1, 400, 200],
            [2, 400, 200],
            [3, 500, 300],
            [4, 200, 200],
            [5, 500, 300]

         ]);

      for (var i in x.pallets) {
         console.log(i + ':' + x.pallets[i].reduce(function (str, item, index) {
               str += index === 0 ? item[0] : ',' + item[0];
               return str;
            }, ''));
      }
   });
});
