import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'offline_outbox_v1';

async function readAll() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function writeAll(items) {
  await AsyncStorage.setItem(KEY, JSON.stringify(items));
}

function novoId() {
  return `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}

export async function outboxGetAll() {
  return readAll();
}

export async function outboxCount() {
  return (await readAll()).length;
}

export async function outboxEnqueue(req) {
  const items = await readAll();
  const item = {
    id: novoId(),
    endpoint: req.endpoint,
    method: req.method ?? 'POST',
    body: req.body ?? null,
    label: req.label ?? req.endpoint,
    createdAt: Date.now(),
    status: 'pending',
    error: null,
    tries: 0,
  };
  items.push(item);
  await writeAll(items);
  return item;
}

export async function outboxUpdate(id, patch) {
  const items = await readAll();
  const idx = items.findIndex((i) => i.id === id);
  if (idx >= 0) {
    items[idx] = { ...items[idx], ...patch };
    await writeAll(items);
  }
}

export async function outboxRemove(id) {
  const items = (await readAll()).filter((i) => i.id !== id);
  await writeAll(items);
}

export async function outboxClearErros() {
  const items = (await readAll()).filter((i) => i.status !== 'error');
  await writeAll(items);
}
