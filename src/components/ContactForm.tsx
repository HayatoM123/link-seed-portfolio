"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { site } from "@/content/site";

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
    // 実送信はせず、メール作成画面（mailto）を開く方式に寄せる
    const subject = encodeURIComponent("【LINK SEED】お問い合わせ");
    const body = encodeURIComponent(
      `お名前：${values.name}\nメール：${values.email}\n\nご相談内容：\n${values.message}\n`
    );

    const mailto = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailto;

    setDone(true);
    reset();
  };

  const nameErrId = errors.name ? "name-error" : undefined;
  const emailErrId = errors.email ? "email-error" : undefined;
  const msgErrId = errors.message ? "message-error" : undefined;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {done && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
          メール作成画面を開きました。内容をご確認のうえ送信してください。
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="contact-name">
          お名前
        </label>
        <input
          id="contact-name"
          autoComplete="name"
          className="w-full rounded-xl border border-zinc-200 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-300"
          aria-invalid={!!errors.name}
          aria-describedby={nameErrId}
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="contact-email">
          メール
        </label>
        <input
          id="contact-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className="w-full rounded-xl border border-zinc-200 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-300"
          aria-invalid={!!errors.email}
          aria-describedby={emailErrId}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="contact-message">
          内容
        </label>
        <textarea
          id="contact-message"
          rows={6}
          className="w-full rounded-xl border border-zinc-200 px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-300"
          aria-invalid={!!errors.message}
          aria-describedby={msgErrId}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-red-600">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm text-white hover:bg-zinc-800 disabled:opacity-60"
      >
        {isSubmitting ? "準備中..." : "メール作成画面を開く"}
      </button>
    </form>
  );
}
