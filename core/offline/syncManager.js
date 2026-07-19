import { apiFetch } from '../api/client';
import { outboxGetAll, outboxRemove, outboxUpdate } from './outbox';

export async function sincronizar(token) {
  const itens = await outboxGetAll();
  const pendentes = itens.filter((i) => i.status === 'pending');

  let enviados = 0;
  let comErro = 0;
  let offline = false;

  for (const item of pendentes) {
    try {
      await apiFetch(item.endpoint, { method: item.method, body: JSON.stringify(item.body) }, token);
      await outboxRemove(item.id);
      enviados += 1;
    } catch (err) {
      if (err?.isNetwork) {
        offline = true;
        break;
      }
      await outboxUpdate(item.id, {
        status: 'error',
        error: err?.message || 'Falha ao sincronizar.',
        tries: (item.tries ?? 0) + 1,
      });
      comErro += 1;
    }
  }

  const restantes = (await outboxGetAll()).length;
  return { enviados, comErro, restantes, offline };
}
