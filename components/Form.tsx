"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";

export default function Formcontact() {
  const t = useTranslations();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx3OroR7p0ehA4o_xoYXEwqiXa6neoCJbcT_x1TWVJ4IStN0l5CBQ3aHycfTQ-tTepJWQ/exec";

  const formSchema = z.object({
    name: z.string().min(6, { message: t("kontak.alert_message_name") }),
    email: z.string().email({ message: t("kontak.alert_message_email") }),
    phone: z.string().min(10, { message: t("kontak.alert_message_telp") }),
    address: z.string().min(8, { message: t("kontak.alert_message_city") }),
    message: z.string().min(10, { message: t("kontak.alert_message") }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const params = new URLSearchParams();
      params.append("name", data.name);
      params.append("email", data.email);
      params.append("phone", data.phone);
      params.append("address", data.address);
      params.append("message", data.message);
      // "timestamp" TIDAK perlu dikirim — script otomatis isi new Date()

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      // response opaque (no-cors), anggap sukses kalau tidak throw
      reset();
      setShowSuccessDialog(true);
      setTimeout(() => setShowSuccessDialog(false), 3000);
    } catch {
      // gagal karena error jaringan
      setShowErrorDialog(true);
      setTimeout(() => setShowErrorDialog(false), 3000);
    }
  };
  const inputClass =
    "w-full border-b-2 border-t-0 border-x-0 bg-transparent px-0 py-2 text-sm outline-none focus:ring-0 focus:border-gray-400 border-gray-200";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t("kontak.form.name_label")}*
            </label>
            <input type="text" {...register("name")} className={inputClass} />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Alamat Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t("kontak.form.email_label")}*
            </label>
            <input type="email" {...register("email")} className={inputClass} />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Nomor Telepon */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t("kontak.form.contact_label")}* (Ex.+62812 7777 1111)
            </label>
            <input type="tel" {...register("phone")} className={inputClass} />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Kota Anda */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              {t("kontak.form.country_label")}*
            </label>
            <input
              type="text"
              {...register("address")}
              className={inputClass}
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>

        {/* Pesan */}
        <div>
          <label className="block text-sm text-gray-600 pb-2 mb-2">
            {t("kontak.form.message_label")}...
          </label>
          <textarea
            rows={6}
            {...register("message")}
            className="w-full border-2 rounded-md resize-none px-3 py-2 text-sm outline-none focus:ring-0 focus:border-gray-400 border-gray-200"
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-full bg-imm-blue px-8 py-3 text-base font-medium text-white transition hover:bg-blue-400 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                {t("kontak.form.submitting")}
              </>
            ) : (
              t("kontak.form.submit")
            )}
          </button>
        </div>
      </form>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-12 w-12 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-center text-2xl font-bold">
              Pesan Anda berhasil dikirim!
            </h2>
            <p className="text-center text-base text-gray-600 pt-2">
              Terima kasih. Tim kami akan segera menghubungi Anda.
            </p>
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setShowSuccessDialog(false)}
                className="rounded-md bg-red-500 px-8 py-2 text-white hover:bg-smp-red"
              >
                Closed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Dialog */}
      {showErrorDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-red-100 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-12 w-12 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m0 3.75h.007M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-center text-2xl font-bold">
              Terjadi kesalahan!
            </h2>
            <p className="text-center text-base text-gray-600 pt-2">
              Pesan gagal terkirim. Silakan coba lagi.
            </p>
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setShowErrorDialog(false)}
                className="rounded-md bg-red-500 px-8 py-2 text-white hover:bg-smp-red"
              >
                Closed
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
