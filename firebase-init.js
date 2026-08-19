import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics, isSupported as analyticsSupported } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import {
  getDatabase,
  onChildAdded,
  onChildRemoved,
  onDisconnect,
  onValue,
  push,
  ref,
  remove,
  serverTimestamp,
  set
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4SZ3COW-fUMWk7dJq7Fd17WjY_aNC8KM",
  authDomain: "ashish827-2999a.firebaseapp.com",
  databaseURL: "https://ashish827-2999a-default-rtdb.firebaseio.com",
  projectId: "ashish827-2999a",
  storageBucket: "ashish827-2999a.appspot.com",
  messagingSenderId: "1068307403814",
  appId: "1:1068307403814:web:719b7edc5856e2b77002e7",
  measurementId: "G-PELK53F9BJ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let analytics = null;

analyticsSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      window.firebaseAnalytics = analytics;
    }
  })
  .catch(() => {
    // Analytics can be unavailable in some browser/privacy contexts.
  });

function createHandlerStore() {
  return {
    broadcast: { sync: [] },
    presence: { join: [], leave: [], sync: [] }
  };
}

function emitHandlers(list, payload) {
  list.forEach((handler) => {
    try {
      handler(payload);
    } catch {
      // Keep one broken listener from breaking the room.
    }
  });
}

function normalizePresenceState(value) {
  return Object.entries(value || {}).reduce((acc, [key, entry]) => {
    if (entry) {
      acc[key] = [entry];
    }
    return acc;
  }, {});
}

function createFirebaseChannel(db, name, options = {}) {
  const handlers = createHandlerStore();
  const unsubscribers = [];
  const basePath = `_rooms/${name}`;
  const presencePath = `${basePath}/presence`;
  const broadcastPath = `${basePath}/broadcasts`;
  const presenceKey = options?.config?.presence?.key || null;
  const joinedAt = new Date().toISOString();
  let presenceState = {};
  let initialPresenceLoaded = false;
  let disposed = false;
  const subscribeStartedAt = Date.now() - 1000;
  const selfPresenceRef = presenceKey ? ref(db, `${presencePath}/${presenceKey}`) : null;

  const channel = {
    _dispose() {
      if (disposed) {
        return;
      }

      disposed = true;
      unsubscribers.forEach((unsubscribe) => {
        try {
          unsubscribe();
        } catch {
          // Ignore cleanup failures.
        }
      });
      unsubscribers.length = 0;

      if (selfPresenceRef) {
        remove(selfPresenceRef).catch(() => {});
      }
    },
    on(type, filter, callback) {
      const bucket = handlers[type]?.[filter?.event];
      if (bucket) {
        bucket.push(callback);
      }
      return channel;
    },
    presenceState() {
      return presenceState;
    },
    async send(message) {
      if (disposed || message?.type !== "broadcast") {
        return;
      }

      const recordRef = push(ref(db, broadcastPath));
      await set(recordRef, {
        clientTs: Date.now(),
        event: message.event || "sync",
        payload: message.payload || null
      });

      window.setTimeout(() => {
        remove(recordRef).catch(() => {});
      }, 30000);
    },
    async subscribe(callback) {
      if (disposed) {
        callback?.("CHANNEL_ERROR");
        return channel;
      }

      const presenceRef = ref(db, presencePath);
      const broadcastsRef = ref(db, broadcastPath);

      unsubscribers.push(
        onValue(presenceRef, (snapshot) => {
          presenceState = normalizePresenceState(snapshot.val());
          initialPresenceLoaded = true;
          emitHandlers(handlers.presence.sync, {});
        })
      );

      unsubscribers.push(
        onChildAdded(presenceRef, (snapshot) => {
          if (!initialPresenceLoaded) {
            return;
          }
          emitHandlers(handlers.presence.join, { key: snapshot.key, newValue: snapshot.val() });
          emitHandlers(handlers.presence.sync, {});
        })
      );

      unsubscribers.push(
        onChildRemoved(presenceRef, (snapshot) => {
          emitHandlers(handlers.presence.leave, { key: snapshot.key, oldValue: snapshot.val() });
          emitHandlers(handlers.presence.sync, {});
        })
      );

      unsubscribers.push(
        onChildAdded(broadcastsRef, (snapshot) => {
          const event = snapshot.val();
          if (!event || event.clientTs < subscribeStartedAt) {
            return;
          }

          emitHandlers(handlers.broadcast.sync, {
            payload: event.payload
          });
        })
      );

      if (selfPresenceRef) {
        onDisconnect(selfPresenceRef).remove().catch(() => {});
      }

      callback?.("SUBSCRIBED");
      return channel;
    },
    async track(data) {
      if (!selfPresenceRef || disposed) {
        return;
      }

      await set(selfPresenceRef, {
        joined_at: joinedAt,
        last_seen: serverTimestamp(),
        ...data
      });
    }
  };

  return channel;
}

function createFirebaseRoomClient() {
  if (!database) {
    return null;
  }

  if (window.firebaseRoomClient) {
    return window.firebaseRoomClient;
  }

  const channels = new Set();

  window.firebaseRoomClient = {
    channel(name, options) {
      const channel = createFirebaseChannel(database, name, options);
      channels.add(channel);
      return channel;
    },
    getChannels() {
      return Array.from(channels);
    },
    removeChannel(channel) {
      if (channel && channels.has(channel)) {
        channel._dispose();
        channels.delete(channel);
      }
      return Promise.resolve("ok");
    },
    removeAllChannels() {
      channels.forEach((channel) => channel._dispose());
      channels.clear();
      return Promise.resolve("ok");
    }
  };

  return window.firebaseRoomClient;
}

window.firebaseApp = app;
window.firebaseConfig = firebaseConfig;
window.firebaseDatabase = database;
window.createFirebaseRoomClient = createFirebaseRoomClient;
window.firebaseRoomClient = createFirebaseRoomClient();
