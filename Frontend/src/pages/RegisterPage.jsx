import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

export default function RegisterPage() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    const res = await register(fullName, email, password);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg('Registration failed. Please try again.');
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="p-8 shadow-xl border-slate-200/80 bg-white space-y-6">
              <div className="space-y-1 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> Start Exploring
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Free Account</h2>
                <p className="text-xs text-slate-500">Join JetSetAI & unlock agentic trip planning.</p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-600">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  icon={User}
                  placeholder="Alex Rivera"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  icon={Mail}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  icon={Lock}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  icon={Lock}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>By registering, you agree to our Terms and Privacy Policy.</span>
                </div>

                <Button type="submit" fullWidth loading={loading} icon={ArrowRight} size="lg">
                  Create Your Account
                </Button>
              </form>

              <p className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-blue-600 hover:underline">
                  Log in
                </Link>
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
