/* Shining Legacy — shared cleaning-cost model.
   ASSUMPTIONS TO CONFIRM WITH THE CLIENT before launch. Used by the homepage
   quick estimate, the /cleaning-cost-estimator page and the quote form. */
window.SL_EST = {
  rateLow: 38, rateHigh: 52,                 // CAD per labour hour
  sqftPerHour: { office: 3000, medical: 1800, retail: 2600, common: 2400, warehouse: 5000 },
  washroomHours: 0.2, kitchenHours: 0.25,    // extra labour per visit
  defaultWashroomsPer: 2500, defaultKitchensPer: 6000, // used when counts are unknown
  minHoursPerVisit: 1.5,
  weeksPerMonth: 4.33,
  constructionLow: 0.18, constructionHigh: 0.45, constructionMin: 350 // CAD per sq ft, one-time
};
window.slFmt = function (n) { return '$' + (Math.round(n / 10) * 10).toLocaleString('en-CA'); };
/* o = {type, sqft, freq, wash?, kitchen?} -> {low, high, hours, oneTime} */
window.slEstimate = function (o) {
  var E = window.SL_EST, sqft = Math.max(0, +o.sqft || 0);
  if (!sqft) return null;
  if (o.type === 'construction') {
    return { oneTime: true, low: Math.max(E.constructionMin, sqft * E.constructionLow),
             high: Math.max(E.constructionMin * 1.4, sqft * E.constructionHigh) };
  }
  var wash = (o.wash === undefined || o.wash === '') ? Math.max(1, Math.ceil(sqft / E.defaultWashroomsPer)) : Math.max(0, +o.wash);
  var kit = (o.kitchen === undefined || o.kitchen === '') ? Math.max(1, Math.ceil(sqft / E.defaultKitchensPer)) : Math.max(0, +o.kitchen);
  var hrs = Math.max(E.minHoursPerVisit, sqft / (E.sqftPerHour[o.type] || 3000) + wash * E.washroomHours + kit * E.kitchenHours);
  var m = hrs * (+o.freq || 1) * E.weeksPerMonth;
  return { oneTime: false, hours: hrs, low: m * E.rateLow, high: m * E.rateHigh, wash: wash, kitchen: kit };
};
/* Link to the quote form, pre-filled */
window.slQuoteUrl = function (o) {
  var p = new URLSearchParams();
  ['type', 'sqft', 'freq', 'city'].forEach(function (k) { if (o[k]) p.set(k, o[k]); });
  if (o.estimate) p.set('est', o.estimate);
  return '/quote?' + p.toString();
};
