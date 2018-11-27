module.exports = (l, r) => (data) => {
  let rl  = l(data) || 0,
      rr  = r(data) || 0,
      rla = Math.abs(rl),
      rra = Math.abs(rr);
  if (rla > rra) return rr;
  if (rla < rra) return rl;
  return Math.min(rl, rr);
};
