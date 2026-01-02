export function Tag({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-700">
      #{text}
    </span>
  );
}