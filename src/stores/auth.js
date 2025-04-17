// store/authStore.js
import { User } from 'lucide-svelte';
import { writable } from 'svelte/store';

const createAuthStore = () => {
  const { subscribe, set, update } = writable({
    isAuthenticated: false,
    token: /** @type {string | null} */ (null),
    user: /** @type {{ name: string; profilePic: string; email: string; } | null} */ ({
          name: "John joe",
          email: "temp",
          profilePic: "/apple.svg",
        }),
  });


  /**
   * @typedef {Object} User
   * @property {string} name
   * @property {string} profilePic
   * @property {string} email
   */

  /**
   * @typedef {Object} AuthState
   * @property {boolean} isAuthenticated
   * @property {string | null} token
   * @property {User | null} user
   */

  return {
    subscribe: /** @type {(run: import('svelte/store').Subscriber<AuthState>) => import('svelte/store').Unsubscriber} */ (subscribe),

    login: /** @type {(data: AuthState) => void} */ (data => {
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      set({
        isAuthenticated: true,
        token: data.token,
        user: {
          name: data.user?.name || "",
          email: data.user?.email || "",
          profilePic: data.user?.profilePic || "",
        },
      });
    }),

    logout: /** @type {() => void} */ (() => {
      localStorage.removeItem("authToken");
      set({
        isAuthenticated: false,
        token: null,
        user: null,
      });
    }),

    initialize: /** @type {() => void} */ (() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        set({
          isAuthenticated: true,
          token,
          user: {
            name: "John Doe",
            email: "temp",
            profilePic: "/apple.svg",
          },
        });
      }
    }),
  };
};

export const authStore = createAuthStore();

