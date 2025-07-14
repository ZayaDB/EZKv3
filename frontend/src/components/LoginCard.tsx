import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LoginCard: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    // TODO: 실제 API 연동
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="max-w-md w-full mx-auto mt-20 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-slate-100 dark:border-slate-800">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center mb-2">
        {t("login")}
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder={t("email")}
          value={form.email}
          onChange={handleChange}
          className="rounded-lg px-4 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
        <input
          type="password"
          name="password"
          placeholder={t("password")}
          value={form.password}
          onChange={handleChange}
          className="rounded-lg px-4 py-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
        <button
          type="submit"
          className="btn-main w-full mt-2 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? t("loading") : t("login")}
        </button>
        {error && (
          <div className="text-red-500 text-sm text-center mt-2">{error}</div>
        )}
        {success && (
          <div className="text-green-500 text-sm text-center mt-2">
            {t("loginSuccess")}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginCard;
