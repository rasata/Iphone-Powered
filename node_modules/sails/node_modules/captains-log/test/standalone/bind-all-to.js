/**
 * Module dependencies
 */

var _ = require('lodash');



/**
 * Bind the context (i.e. set the `this` value) of all function
 * properties of `obj` to `newCtx`. Note that this modifies `obj`
 * in-place, and the return value === `obj`.
 *
 * @param  {Object} obj
 * @param  {Object} newCtx
 * @return {undefined}
 *
 * ----------------------------------------------------------------
 * Note:
 * 
 * e.g.
 *
 * ```
 * var _bindAllTo = require('bind-all-to');
 * var card = {
 *   spend: function (amt){
 *     this.bankAccount -= amt;
 *     return this.bankAccount;
 *   }
 * };
 *
 * // Let's say we give Mike the debit card.
 * var mike = {
 *   bankAccount: 15
 * };
 * mike.debitCard = card;
 *
 * // By default, JavaScript will assume `this` refers to
 * // the card itself. This is no good, because this isn't
 * // a card with a built-in balance-- it needs to be tied
 * // to a entity with a proper `bankAccount`.
 * mike.debitCard.spend(50)
 * // -> NaN === (undefined - 50) === (card.bankAccount - 50)
 *
 * // So next, we might try using underscore's `_.bindAll`,
 * // and attaching the `spend` method to mike directly.
 * // This will make JavaScript think the `this` in the spend
 * // method refers to him.
 * mike.spend = mike.debitCard.spend;
 * mike = _.bindAll(mike);
 * mike.spend(50)
 *
 * // But unfortunately, he doesn't have any money:
 * // -> -35 === (15 - 50) === (mike.bankAccount - 50)
 * 
 * 
 * // Anyway, it was awkward to give him the `spend` method directly-
 * // plus, if we want to have any luck actually spending money, we'll
 * // need to connect the card to the company bank account.
 * var balderdash = { bankAccount: 100000 };
 * 
 * // To do this, we need `bind-all-to`:
 * _bindAllTo(mike.card, balderdash);
 *
 * // Now when we spend from the card, the amount is subtracted
 * // from the `bankAccount` property of `balderdash`:
 * mike.card.spend(50)
 * // -> 99950 
 * ```
 *
 */
module.exports = function _bindAllTo(obj, newCtx) {

  _(obj).functions().each(function(key) {
    obj[key] = _.bind(obj[key], newCtx);
  });
  
  return obj;
};
