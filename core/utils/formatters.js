export function hojeFormatado() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

export function mascaraData(texto) {
  const digits = texto.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function mascaraHora(texto) {
  const digits = texto.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

export function apenasLetras(texto, max = 3) {
  return texto.toUpperCase().replace(/[^A-Z]/g, '').slice(0, max);
}

export function apenasNumeros(texto, max = 3) {
  return texto.replace(/\D/g, '').slice(0, max);
}

export function getSigla(nome = '') {
  const p = nome.trim().split(' ').filter(Boolean);
  if (p.length === 0) return '?';
  if (p.length === 1) return p[0].substring(0, 2).toUpperCase();
  return (p[0][0] + p[p.length - 1][0]).toUpperCase();
}

export function parseDateBR(str) {
  const p = str?.split('/');
  if (p?.length === 3) return new Date(+p[2], +p[1] - 1, +p[0]);
  return new Date(0);
}

export function mesAno(str) {
  const d = parseDateBR(str);
  return d.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

// Agrupa uma lista em seções por mês (formato pronto para SectionList),
// usando o campo `data` ou `inicio` (string dd/mm/aaaa) de cada item.
export function agruparPorMes(lista) {
  const mapa = new Map();
  for (const item of lista) {
    const chave = mesAno(item.data ?? item.inicio);
    if (!mapa.has(chave)) mapa.set(chave, []);
    mapa.get(chave).push(item);
  }
  return Array.from(mapa.entries()).map(([title, data]) => ({ title, data }));
}

export function formatISO(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

export function isToday(date) {
  const t = new Date();
  return (
    date.getDate() === t.getDate() &&
    date.getMonth() === t.getMonth() &&
    date.getFullYear() === t.getFullYear()
  );
}

export function stripHtml(html = '') {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
