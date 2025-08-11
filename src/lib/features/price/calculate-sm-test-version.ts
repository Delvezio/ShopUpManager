export function calculateSMForTest(params: {
  basePrice: number; // Prezzo lordo di listino (N in Google Sheets)
  costoProdotto: number; // Costo netto fornitore (L in Google Sheets)
  iva: number; // Aliquota IVA su prezzo di vendita (M in Google Sheets)
  costoSpedizione: number; // Costo medio spedizione (AA in Google Sheets)
  sogliaSpedGratis: number; // Soglia carrello minimo per spedizione gratuita (AB in Google Sheets)
  margineTarget: number; // Utile netto minimo desiderato % (Z in Google Sheets)
  limiteSM: number; // Soglia massima sconto (personalizzata ShopUpManager)
}): number {
  const N = params.basePrice;
  const L = params.costoProdotto;
  const M = params.iva;
  const AA = params.costoSpedizione;
  const AB = params.sogliaSpedGratis;
  const Z = params.margineTarget / 100;
  const LIMITE = params.limiteSM;

  const netFactor = 100 / (100 + M);
  const U_free = (L + AA) / (netFactor - Z);

  // Caso spedizione gratuita diretta
  if (U_free >= AB && U_free <= N) {
    return Math.min((1 - U_free / N) * 100, LIMITE);
  }

  // Ricerca binaria per trovare Q
  let lo = 0,
    hi = 1,
    mid: number;
  const tol = 1e-5;

  const marginPercent = (Q: number) => {
    const U = N * (1 - Q);
    const qS = U < AB ? (U / AB) * AA : AA;
    const iva = (U * M) / (100 + M);
    const netRev = U - iva;
    const margin = netRev - L - qS;
    return margin / U;
  };

  for (let i = 0; i < 40 && hi - lo > tol; i++) {
    mid = (lo + hi) / 2;
    if (marginPercent(mid) >= Z) lo = mid;
    else hi = mid;
  }

  return Math.min(lo * 100, LIMITE);
}
