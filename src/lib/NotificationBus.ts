import { EventEmitter } from "events";

type NotificationPayload = {
  id: string;
  type: "LIKE" | "COMMENT";
  actorId: string;
  postId: string;
  createdAt: Date;
};

const bus = new EventEmitter();
bus.setMaxListeners(0); // unlimited listeners — one per connected user

export function publishNotification(
  recipientId: string,
  payload: NotificationPayload,
) {
  bus.emit(recipientId, payload);
}

export function subscribeToNotifications(
  recipientId: string,
  onNotification: (payload: NotificationPayload) => void,
) {
  bus.on(recipientId, onNotification);
  return () => bus.off(recipientId, onNotification); // cleanup function to remove the listener when session ends or user disconnects(browser tab closed)
}
