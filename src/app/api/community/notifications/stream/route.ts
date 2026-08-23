import { auth } from "@/lib/auth";
import { subscribeToNotifications } from "@/lib/NotificationBus";
import { hasActiveCommunitySubscription } from "@/lib/data/subscriptions";
import { headers } from "next/headers";

export const dynamic = "force-dynamic"; // this route is dynamic and should not be statically optimized

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return new Response("Unauthorized", { status: 401 });
  if (!(await hasActiveCommunitySubscription(session.user.id))) {
    return new Response("Subscription required", { status: 403 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const unsubscribe = subscribeToNotifications(
        session.user.id,
        (payload) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(payload)}\n\n`),
          );
        },
      );

      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(`: ping\n\n`));
      }, 25000);

      req.signal.addEventListener("abort", () => {
        clearInterval(heartbeat);
        unsubscribe();
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
