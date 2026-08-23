"use client";

import { useEffect, useRef, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { Send, Trash2 } from "lucide-react";
import { FeedPost, PostComment } from "@/types/community";
import {
  addComment,
  deleteComment,
  getComments,
} from "@/lib/actions/community";
import CommunityAvatar from "@/components/communtiy/CommunityAvatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const PATH = "/community-dashboard";

type Props = {
  post: FeedPost | null;
  currentUserId: string;
  onClose: () => void;
  onCommentCountChange: (postId: string, delta: number) => void;
};

export default function CommentsModal({
  post,
  currentUserId,
  onClose,
  onCommentCountChange,
}: Props) {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!post) return;
    getComments(post.id).then((res) => {
      setComments(res.comments);
      setNextCursor(res.nextCursor);
    });
    setTimeout(() => inputRef.current?.focus(), 350);
  }, [post]);

  const loadMoreComments = async () => {
    if (!post || !nextCursor || loadingMore) return;
    setLoadingMore(true);
    const res = await getComments(post.id, nextCursor);
    setComments((prev) => [...prev, ...res.comments]);
    setNextCursor(res.nextCursor);
    setLoadingMore(false);
  };

  const sendComment = async () => {
    if (!text.trim() || !post || sending) return;
    setSending(true);
    await addComment({ postId: post.id, body: text.trim(), path: PATH });
    setText("");
    const res = await getComments(post.id);
    setComments(res.comments);
    setNextCursor(res.nextCursor);
    setSending(false);
    onCommentCountChange(post.id, 1);
    setTimeout(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!post) return;
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    await deleteComment({ commentId, postId: post.id, path: PATH });
    onCommentCountChange(post.id, -1);
  };

  return (
    <Sheet open={!!post} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="z-200 rounded-t-[24px] p-0 gap-0 mx-auto max-w-170 max-h-[80vh] bg-white border-0 shadow-[0_24px_64px_rgba(0,0,0,0.12)]"
      >
        <div className="w-10 h-1 rounded-xs bg-[#eeece8] mx-auto mt-3 shrink-0" />

        <SheetHeader className="flex-row items-center justify-between px-5.5 py-4 border-b border-[#f5f0e8] shrink-0">
          <SheetTitle className="text-[15px] font-black uppercase tracking-[0.08em] text-[#0a0a0a] [font-family:var(--font-barlow)]">
            Comments
          </SheetTitle>
          <SheetClose className="w-8 h-8 rounded-full bg-[#f8f7f5] flex items-center justify-center text-[#9e9a90] text-base cursor-pointer hover:bg-[#eeece8] hover:text-[#0a0a0a] transition-all duration-200">
            ✕
          </SheetClose>
        </SheetHeader>

        <div
          ref={listRef}
          className="flex-1 overflow-y-auto px-5.5 py-4 flex flex-col gap-4"
        >
          {comments.length === 0 && (
            <p className="text-[13px] text-[#9e9a90] text-center py-6 [font-family:var(--font-barlow)]">
              No comments yet — say something!
            </p>
          )}
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3 group">
              <CommunityAvatar
                userId={c.user.id}
                name={c.user.name}
                image={c.user.image}
                className="size-8.5 text-[12px] shrink-0"
              />
              <div className="flex-1 bg-[#f8f7f5] rounded-[14px] px-3.5 py-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-[12px] font-black text-[#0a0a0a] mb-0.5 [font-family:var(--font-barlow)]">
                    {c.user.name}
                  </div>
                  {c.user.id === currentUserId && (
                    <button
                      onClick={() => handleDeleteComment(c.id)}
                      className="opacity-0 group-hover:opacity-100 text-[#9e9a90] hover:text-[#e0574a] transition-all duration-150 shrink-0 cursor-pointer"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  )}
                </div>
                <div className="text-[13px] text-[#3a3a3a] leading-normal font-medium [font-family:var(--font-barlow)]">
                  {c.body}
                </div>
                <div className="text-[10px] text-[#9e9a90] mt-1.5 font-medium [font-family:var(--font-barlow)]">
                  {formatDistanceToNowStrict(c.createdAt, { addSuffix: true })}
                </div>
              </div>
            </div>
          ))}
          {nextCursor && (
            <button
              onClick={loadMoreComments}
              disabled={loadingMore}
              className="text-[12px] font-bold text-[#C9953A] hover:text-[#B8841F] text-center py-2 [font-family:var(--font-barlow)] disabled:opacity-50"
            >
              {loadingMore ? "Loading..." : "Load more comments"}
            </button>
          )}
        </div>

        <div className="flex gap-2.5 items-center px-5.5 pb-5.5 pt-3.5 border-t border-[#f5f0e8] shrink-0">
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendComment()}
            placeholder="Add a comment..."
            className="flex-1 border border-[#d4d0c8] rounded-[14px] px-4 py-2.75 text-[13px] text-[#0a0a0a] font-medium bg-[#f8f7f5] outline-none transition-all duration-200 [font-family:var(--font-barlow)] placeholder:text-[#9e9a90] focus:border-[#C9953A] focus:bg-white"
          />
          <button
            onClick={sendComment}
            disabled={sending}
            className="w-10.5 h-10.5 rounded-[12px] flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-[1.06] hover:shadow-[0_4px_14px_rgba(201,149,58,0.35)] disabled:opacity-50 bg-[linear-gradient(135deg,#C9953A,#F0CC72,#B8841F)]"
          >
            <Send className="size-4 text-[#0a0a0a]" strokeWidth={2.5} />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
