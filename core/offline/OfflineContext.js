import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { outboxGetAll, outboxRemove, outboxClearErros } from './outbox';
import { sincronizar } from './syncManager';

const OfflineContext = createContext(null);

export function OfflineProvider({ children }) {
  const [itens, setItens] = useState([]);
  const [syncing, setSyncing] = useState(false);

  const refresh = useCallback(async () => {
    setItens(await outboxGetAll());
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const sync = useCallback(async (token) => {
    setSyncing(true);
    try {
      const resultado = await sincronizar(token);
      await refresh();
      return resultado;
    } finally {
      setSyncing(false);
    }
  }, [refresh]);

  const remover = useCallback(async (id) => {
    await outboxRemove(id);
    await refresh();
  }, [refresh]);

  const limparErros = useCallback(async () => {
    await outboxClearErros();
    await refresh();
  }, [refresh]);

  const pendentes = itens.filter((i) => i.status === 'pending').length;

  const value = { itens, pendentes, syncing, refresh, sync, remover, limparErros };
  return <OfflineContext.Provider value={value}>{children}</OfflineContext.Provider>;
}

export function useOffline() {
  const ctx = useContext(OfflineContext);
  if (!ctx) throw new Error('useOffline deve ser usado dentro de OfflineProvider');
  return ctx;
}
