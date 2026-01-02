import { cn } from "@/lib/utils";

export function Container(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-4 sm:px-6", props.className)}>
      {props.children}
    </div>
  );
}