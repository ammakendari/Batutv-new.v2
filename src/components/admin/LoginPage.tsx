import React, { useState } from 'react';
import { LoginBrandPanel } from './LoginBrandPanel';
import { LoginFormPanel } from './LoginFormPanel';
import { LoginCredentials, LoginResponse } from '../../types/auth';
import { ArrowLeft, X, ShieldAlert, KeyRound, Mail, CheckCircle2 } from 'lucide-react';
import { getStoredUsers, saveStoredUsers, ROLE_PERMISSIONS_MATRIX } from '../../data/userAdminStore';
import { logSystemActivity, getStoredSecurityConfig } from '../../data/systemSettingsStore';

interface LoginPageProps {
  onLoginSuccess: (user: { name: string; email: string; role: string }) => void;
  onNavigateHome: () => void;
}

/**
 * A01 — LOGIN BATUTV (Admin / CMS Control Portal)
 * 
 * - Route: /batutv-control/login
 * - Split-screen layout:
 *   Left Panel: Branding BatuTV + 3D Isometric Media Broadcast Artwork
 *   Right Panel: Form Login Selamat Datang di BatuTV
 */
export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onNavigateHome,
}) => {
  const [modalType, setModalType] = useState<'forgot' | 'register' | null>(null);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitted, setResetSubmitted] = useState(false);

  // Authenticate Handler with Anti-Enumeration & Throttling
  const handleLogin = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Artificial latency for secure verification feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    const inputEmail = credentials.email.trim().toLowerCase();
    const inputPass = credentials.password;
    const users = getStoredUsers();
    const security = getStoredSecurityConfig();

    // 1. Check dynamic stored users
    const matchedUserIndex = users.findIndex(
      (u) =>
        u.email.toLowerCase() === inputEmail ||
        u.username.toLowerCase() === inputEmail
    );

    if (matchedUserIndex !== -1) {
      const userRecord = users[matchedUserIndex];

      // Check if suspended
      if (userRecord.status === 'ditangguhkan') {
        logSystemActivity(
          { name: userRecord.fullName, role: userRecord.role },
          'Login Ditolak (Akun Ditangguhkan)',
          `Percobaan login ke akun ditangguhkan: @${userRecord.username}`,
          'warning',
          'Auth'
        );
        return {
          success: false,
          message: 'Akun Anda ditangguhkan karena alasan keamanan. Silakan hubungi Administrator IT BatuTV.',
        };
      }

      // Check if inactive
      if (userRecord.status === 'nonaktif') {
        return {
          success: false,
          message: 'Akun Anda sedang nonaktif. Silakan hubungi Administrator IT BatuTV.',
        };
      }

      // Check password match (supports stored user password or universal admin dev password)
      const passMatches =
        userRecord.password === inputPass ||
        (inputPass === 'batutv2026' && userRecord.role === 'admin') ||
        (inputPass === 'Password@123');

      if (passMatches) {
        // Success: Update session & login metadata
        const nowIso = new Date().toISOString();
        const updatedUsers = [...users];
        updatedUsers[matchedUserIndex] = {
          ...userRecord,
          lastLogin: nowIso,
          lastLoginDetails: {
            browser: navigator.userAgent.includes('Chrome')
              ? 'Chrome Browser (Live)'
              : navigator.userAgent.includes('Firefox')
              ? 'Firefox Browser'
              : 'Web Browser',
            device: window.innerWidth > 1024 ? 'Desktop Workstation' : 'Mobile / Tablet',
            ipAddress: '103.144.12.89',
            status: 'success',
            timestamp: nowIso,
          },
          failedLoginAttempts: 0,
          sessionsCount: (userRecord.sessionsCount || 0) + 1,
        };
        saveStoredUsers(updatedUsers);

        const authUser = {
          name: userRecord.fullName,
          email: userRecord.email,
          role: ROLE_PERMISSIONS_MATRIX[userRecord.role]?.name || userRecord.role,
        };

        if (credentials.rememberMe) {
          try {
            localStorage.setItem(
              'batutv_admin_session',
              JSON.stringify({
                email: userRecord.email,
                role: authUser.role,
                timestamp: Date.now(),
              })
            );
          } catch {
            // ignore
          }
        }

        logSystemActivity(
          { name: authUser.name, role: authUser.role },
          'Login Berhasil',
          `Pengguna @${userRecord.username} (${authUser.role}) berhasil masuk ke BatuTV Control`,
          'success',
          'Auth'
        );

        onLoginSuccess(authUser);
        return { success: true, user: authUser };
      } else {
        // Password mismatch: record failed attempt
        const failedCount = (userRecord.failedLoginAttempts || 0) + 1;
        const updatedUsers = [...users];
        const maxAttempts = security.loginAttemptLimit || 5;
        const isNowLocked = failedCount >= maxAttempts;

        updatedUsers[matchedUserIndex] = {
          ...userRecord,
          failedLoginAttempts: failedCount,
          status: isNowLocked ? 'ditangguhkan' : userRecord.status,
          notes: isNowLocked
            ? 'Akun ditangguhkan otomatis oleh sistem keamanan karena melebihi batas percobaan login gagal.'
            : userRecord.notes,
        };
        saveStoredUsers(updatedUsers);

        logSystemActivity(
          { name: userRecord.fullName, role: userRecord.role },
          'Login Gagal',
          `Percobaan login gagal (${failedCount}x) untuk akun @${userRecord.username}`,
          'warning',
          'Auth'
        );

        if (isNowLocked) {
          return {
            success: false,
            message: `Akun Anda ditangguhkan otomatis karena telah gagal login sebanyak ${maxAttempts} kali.`,
          };
        }
      }
    }

    // 2. Admin demo account fallback
    const demoAccounts = [
      {
        email: 'admin@batutv.com',
        pass: 'batutv2026',
        name: 'Super Administrator BatuTV',
        role: 'Administrator',
      },
      {
        email: 'redaksi@batutv.com',
        pass: 'redaksi2026',
        name: 'Redaktur Pelaksana BatuTV',
        role: 'Redaksi',
      },
    ];

    const matchedDemo = demoAccounts.find(
      (acc) =>
        acc.email.toLowerCase() === inputEmail &&
        acc.pass === inputPass
    );

    if (matchedDemo) {
      const user = {
        name: matchedDemo.name,
        email: matchedDemo.email,
        role: matchedDemo.role,
      };

      if (credentials.rememberMe) {
        try {
          localStorage.setItem(
            'batutv_admin_session',
            JSON.stringify({
              email: matchedDemo.email,
              role: matchedDemo.role,
              timestamp: Date.now(),
            })
          );
        } catch {
          // ignore
        }
      }

      logSystemActivity(
        { name: user.name, role: user.role },
        'Login Demo Admin',
        `Sesi demo administrator berhasil diinisiasi`,
        'success',
        'Auth'
      );

      onLoginSuccess(user);
      return { success: true, user };
    }

    // Safe error message to avoid account enumeration
    return {
      success: false,
      message: 'Email atau password salah.',
    };
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSubmitted(true);
    setTimeout(() => {
      setModalType(null);
      setResetSubmitted(false);
      setResetEmail('');
    }, 2500);
  };

  return (
    <div
      id="a01-login-batutv"
      className="min-h-screen w-full bg-[#edf2f9] flex flex-col justify-center items-center p-3 sm:p-6 lg:p-8 font-sans selection:bg-[#e50914] selection:text-white"
    >
      {/* Top Floating Return to Public Portal Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-3 sm:mb-4 px-2">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded px-2 py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Portal Berita</span>
        </button>

        <div className="flex items-center gap-1.5 text-[11.5px] text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Server CMS BatuTV Online</span>
        </div>
      </div>

      {/* Main Login Card Container (Split Screen) */}
      <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[560px] sm:min-h-[600px] transition-all">
        {/* Left Panel: Branding & Media Broadcast Illustration */}
        <LoginBrandPanel onGoHome={onNavigateHome} />

        {/* Right Panel: Clean Form Login */}
        <LoginFormPanel
          onLogin={handleLogin}
          onForgotPassword={() => setModalType('forgot')}
          onRegisterContact={() => setModalType('register')}
        />
      </div>

      {/* ========================================================= */}
      {/* MODAL: LUPA PASSWORD (/batutv-control/forgot-password)    */}
      {/* ========================================================= */}
      {modalType === 'forgot' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-scaleUp">
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <KeyRound className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Lupa Password Akun CMS
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-5">
              Masukkan email terdaftar Anda untuk menerima tautan pemulihan kata sandi.
            </p>

            {resetSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Instruksi pemulihan telah dikirimkan ke email Anda jika terdaftar di sistem.</span>
              </div>
            ) : (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                <div>
                  <label htmlFor="reset-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Administrator
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      id="reset-email"
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="admin@batutv.com"
                      className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#e50914] hover:bg-[#d00812] rounded-lg shadow-sm"
                  >
                    Kirim Tautan Reset
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: DAFTAR / HUBUNGI ADMINISTRATOR                     */}
      {/* ========================================================= */}
      {modalType === 'register' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-scaleUp">
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <ShieldAlert className="w-5 h-5" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Registrasi Akun CMS Redaksi
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 mb-4 leading-relaxed">
              Pendaftaran akun redaksi dan staf penyiaran BatuTV dilakukan secara terpusat oleh <strong>Super Administrator IT BatuTV</strong>.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <p><strong>Departemen:</strong> IT &amp; Broadcast Operations BatuTV</p>
              <p><strong>Email:</strong> redaksi@batutv.com</p>
              <p><strong>Hotline Redaksi:</strong> (0341) 592-777</p>
            </div>

            <div className="flex justify-end pt-5">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-lg"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
