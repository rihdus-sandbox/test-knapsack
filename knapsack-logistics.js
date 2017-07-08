/*! knapsack-logistics v0.0.0 - MIT license */
'use strict';

var lI = 1,
   wI = 2,
   iI = 0
;


/**
 * Logistics packing solver
 * @param pallets Pallets available.
 * @param width Dimension side length of the square pallet.
 * @param weight MaxWeight maximum carrying capacity of the pallet.
 * @param items Items to be put into the pallets.
 */
var knapsack_logistics = function (pallets, width, weight, items) {
   // your code goes here
   var maxWidth = width,
      maxWeight = weight
   ;


   var result = pallets.reduce(function (result, palletName) {
      var palletItems = solveKnapsack(result.remainingItems, maxWeight, maxWidth);
      var remainingItems = result.remainingItems.filter(function (item, i) {
         return palletItems.findIndex(function (palletItem) {
               return item[0] === palletItem[0];
            }) === -1
      });

      // console.log(remainingItems);
      result.remainingItems = remainingItems;
      result.pallets[palletName] = palletItems;
      return result;
   }, {
      remainingItems: items,
      pallets: {}
   });

   return {
      pallets: result.pallets
   };
};

/**
 * Return list of items that can be included in the knapsack.
 *
 * @param items [ id, width, weight ]
 * @param weight Max weight of the pallet
 * @param width width of the pallet
 * @return {[*]} Items that can be added to the pallet
 */


/*
 Max weight: 1000, Width: 1100
 -----------------------------
 Input
 ---------
 1 400 200
 2 400 200
 3 500 300
 4 200 200
 5 500 300

 ----------------------
 Output: Selected items
 ----------------------
 3 500 300
 1 400 200
 4 200 200
 */

function solveKnapsack(items, maxWeight, maxWidth) {
   // console.log(items);
   var optimalItems, itemsArray, result = 0;
   itemsArray = [].concat(items);

   var res = solver(items.length - 1, maxWeight, maxWidth);
   optimalItems = res.items;

   optimalItems = optimalItems.map(function (itemIndex) {
      return itemsArray[itemIndex];
   });

   optimalItems = optimalItems.sort(function (a, b) {
      return a[wI] <= b[wI];
   });

   return optimalItems;

   /**
    * Check if n'th item can be placed on the pallet with remaining weight W
    * ------------------
    * @param n nth item in the list which is being solved
    * @param W remaining weight on the pallet
    * @param L remaining free space on the pallet
    */
   function solver(n, W, L) {
      if (n < 0 || W <= 0) {
         result = {
            l: 0,
            items: []
         };
      } else if (itemsArray[n][wI] > W || itemsArray[n][lI] > L) {
         /** Item weight is greater than remaining weight on the pallet.
          * Check if the next item can be placed on the pallet
          * **/
         result = solver(n - 1, W, L);
      }
      else {
         /** Skip Item
          * -----------
          * - Get the current value of length occupied.
          * - Check if the next item can be placed on the pallet.
          * **/
         var res1 = solver(n - 1, W, L);
         var l1 = res1.l;

         /** Add item n to the pallet
          * -----------------------------
          * - Compute the remaining space on the pallet.
          * **/
         var res2 = solver(n - 1, W - itemsArray[n][wI], L - itemsArray[n][lI]);
         var l2 = itemsArray[n][lI] + res2.l;


         /** Compare both lengths **/
         if (l2 > l1) {
            result = {
               l: l2,
               items: addItemsToArray(n, res2.items || [])
            };
         } else {
            result = {
               l: l1,
               items: addItemsToArray(n - 1, res1.items || [])
            };
         }
      }
      return result;
   }
}

function addItemsToArray(i, arr) {
   if (arr.indexOf(i) > -1) {
      return arr;
   } else
      return [i].concat(arr);
}

if (typeof module !== "undefined") module.exports = {
   knapsack_logistics: knapsack_logistics,
   solveKnapsack: solveKnapsack
};
