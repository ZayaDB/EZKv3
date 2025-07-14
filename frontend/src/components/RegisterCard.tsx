import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterCard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", name: "" });
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
    try {
      await axios.post(
        "https://ezkv3-production.up.railway.app/api/auth/register",
        form
      );
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err: any) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(t("registerError") || "회원가입에 실패했습니다.");
      }
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-20 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-slate-100 dark:border-slate-800">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center mb-2">
        {t("register")}
      </h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        autoComplete="on"
      >
        {/* 이름 */}
        <div className="relative">
          <input
            type="text"
            name="name"
            id="register-name"
            value={form.name}
            onChange={handleChange}
            className="peer w-full rounded-lg px-4 pt-6 pb-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-transparent"
            placeholder={t("name")}
            required
            autoComplete="name"
          />
          <label
            htmlFor="register-name"
            className="absolute left-4 top-2 text-slate-500 dark:text-slate-400 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm"
          >
            {t("name")}
          </label>
        </div>
        {/* 이메일 */}
        <div className="relative">
          <input
            type="email"
            name="email"
            id="register-email"
            value={form.email}
            onChange={handleChange}
            className="peer w-full rounded-lg px-4 pt-6 pb-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-transparent"
            placeholder={t("email")}
            required
            autoComplete="email"
          />
          <label
            htmlFor="register-email"
            className="absolute left-4 top-2 text-slate-500 dark:text-slate-400 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm"
          >
            {t("email")}
          </label>
        </div>
        {/* 비밀번호 */}
        <div className="relative">
          <input
            type="password"
            name="password"
            id="register-password"
            value={form.password}
            onChange={handleChange}
            className="peer w-full rounded-lg px-4 pt-6 pb-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-transparent"
            placeholder={t("password")}
            required
            autoComplete="new-password"
          />
          <label
            htmlFor="register-password"
            className="absolute left-4 top-2 text-slate-500 dark:text-slate-400 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm"
          >
            {t("password")}
          </label>
        </div>
        {/* 회원가입 버튼 */}
        <button
          type="submit"
          className="btn-main w-full mt-2 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? t("loading") : t("register")}
        </button>
        {/* 에러/성공 메시지 */}
        {error && (
          <div className="text-red-500 text-sm text-center mt-2">{error}</div>
        )}
        {success && (
          <div className="text-green-500 text-sm text-center mt-2">
            {t("registerSuccess") || "회원가입이 완료되었습니다!"}
          </div>
        )}
      </form>
      {/* 이미 회원이신가요? */}
      <div className="text-center text-sm text-slate-600 dark:text-slate-300 mt-2">
        {t("alreadyUser") || "이미 회원이신가요?"}
        <button
          className="ml-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          onClick={() => navigate("/login")}
        >
          {t("login")}
        </button>
      </div>
    </div>
  );
};

export default RegisterCard;
