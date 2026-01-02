"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "お名前を入力してください。"),
  email: z.string().email("メールアドレスの形式が正しくありません。"),
  message: z.string().min(10, "内容は10文字以上で入力してください。"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    // TODO: ここを後でAPI/メール送信へ差し替え
    await new Promise((r) => setTimeout(r, 500));
    console.log(values);
    setDone(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {done && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm">
          送信を受け付けました。内容を確認し、ご連絡いたします。
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium">お名前</label>
        <input
          className="w-full rounded-xl border border-zinc-200 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-300"
          {...register("name")}
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">メール</label>
        <input
          className="w-full rounded-xl border border-zinc-200 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-300"
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">内容</label>
        <textarea
          rows={6}
          className="w-full rounded-xl border border-zinc-200 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-300"
          {...register("message")}
        />
        {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <button
        disabled={isSubmitting}
        className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm text-white hover:bg-zinc-800 disabled:opacity-60"
      >
        {isSubmitting ? "送信中..." : "送信する"}
      </button>
    </form>
  );
}