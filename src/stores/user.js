import { writable } from 'svelte/store';

const STORAGE_KEY = 'svelte_user_management_dashboard_users_v1';

const createUsersStore = () => {
  const initial = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [
        { id: generateUniqueId(), name: 'Richard Akinmade', email: 'richardakinmade3@gmail.com', role: 'Admin' },
        { id: generateUniqueId(), name: 'Tutu Adeoluwa', email: 'tutuadeoluwa@egobe.com', role: 'User' },
        { id: generateUniqueId(), name: 'Bruce Wayne', email: 'brucewayne@iambatman.com', role: 'User' },
        { id: generateUniqueId(), name: 'Ngozi Yakubu', email: 'ngoz5050yakubs@itiswatitis.com', role: 'User' }
      ];
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  })();

  const { subscribe, set, update } = writable(initial);

  subscribe((val) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    } catch (e) {
      // ignore
    }
  });

  return {
    subscribe,
    add(user) {
      update(list => {
        const item = { id: generateUniqueId(), ...user };
        return [item, ...list];
      });
    },

    updateUser(id, patch) {
      update(list => list.map(user => user.id === id ? {...user, ...patch} : user));
    },

    remove(id) {
      update(list => list.filter(user => user.id !== id));
    },

    clear() {
      set([]);}
  };
}

const generateUniqueId = () => {
  return Math.random().toString(36).slice(2, 9);
}

export const users = createUsersStore();
