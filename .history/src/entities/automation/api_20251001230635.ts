import api from '../../shared/api/axios';
import { Automation } from './types';

// В этом примере используем jsonplaceholder todos как mock
export const fetchAutomations = async (): Promise<Automation[]> => {
  // Преобразуем todos в автоматики
  const res = await api.get('/todos?_limit=10');
  const items = res.data as any[];
  return items.map((t) => ({
    id: String(t.id),
    name: t.title,
    is_active: t.completed === false,
    // expiry_date произвольный: сегодняшняя дата + id дней
    expiry_date: new Date(
      Date.now() + (t.id % 5) * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));
};

export const createAutomation = async (payload: Partial<Automation>) => {
  const res = await api.post('/posts', payload);
  return res.data;
};
