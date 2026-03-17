import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabaseClient";
import { Copy, Gift, Users, CheckCircle, Clock } from "lucide-react";

export default function Rewards() {
  const { t } = useTranslation();
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [referrals, setReferrals] = useState<any[]>([]);
  const [totalRewards, setTotalRewards] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchReferrals(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchReferrals(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchReferrals = async (userId: string) => {
    const { data, error } = await supabase
      .from("referrals")
      .select("*")
      .eq("referrer_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching referrals:", error);
    } else {
      setReferrals(data || []);
      const total = (data || []).reduce((acc, curr) => {
        if (curr.status === "completed") {
          return acc + 50;
        }
        return acc;
      }, 0);
      setTotalRewards(total);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    if (isSignUp) {
      const referralId = localStorage.getItem('referral_id');
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + "/rewards",
          data: {
            full_name: fullName,
            dob: dob,
            phone_number: phoneNumber,
            referred_by: referralId || null,
          },
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Check your email to confirm your account!");
        if (referralId) {
          localStorage.removeItem('referral_id');
        }
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Successfully logged in!");
      }
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const copyToClipboard = () => {
    if (session) {
      const referralLink = `${window.location.origin}/ref/${session.user.id}`;
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-brand-light px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-brand-dark/5">
          <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6 mx-auto">
            <Gift className="w-6 h-6 text-brand-gold" />
          </div>
          <h2 className="text-3xl font-serif text-center mb-2">
            {isSignUp ? "Create your Account" : "My Points"}
          </h2>
          <p className="text-brand-muted text-center mb-8">
            {isSignUp ? "Sign up to start earning points." : "Sign in to view your referrals and points."}
          </p>

          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-brand-dark mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-brand-dark mb-1"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-brand-dark mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-brand-dark mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-brand-dark mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-brand-dark/20 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gold hover:bg-[#8A6A12] text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              {loading ? (isSignUp ? "Creating..." : "Signing in...") : (isSignUp ? "Sign Up" : "Sign In")}
            </button>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setMessage("");
                }}
                className="text-sm text-brand-gold hover:underline"
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
            </div>

            {message && (
              <p
                className={`text-sm text-center mt-4 ${message.includes("Check") || message.includes("Success") ? "text-green-600" : "text-red-600"}`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-serif text-brand-dark">
            Referral Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-brand-dark hover:text-white hover:bg-brand-dark transition-colors border border-brand-dark px-6 py-2 rounded-full flex items-center gap-2"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Rewards Earned Tile */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 md:col-span-1 flex flex-col justify-center items-center text-center">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4">
              <Gift className="w-6 h-6 text-brand-gold" />
            </div>
            <h2 className="text-brand-muted font-medium mb-2">
              Total Points Earned
            </h2>
            <p className="text-5xl font-serif text-[#9E7B16]">
              {totalRewards} Points
            </p>
          </div>

          {/* Referral Link Tile */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-dark/5 md:col-span-2 flex flex-col justify-center">
            <h2 className="text-xl font-serif text-[#9E7B16] mb-2">
              Share Your Link
            </h2>
            <p className="text-brand-muted mb-6">
              Invite friends and earn points when they complete their first
              treatment.
            </p>

            <div className="flex items-center gap-3">
              <div className="flex-1 bg-brand-light px-4 py-3 rounded-xl border border-brand-dark/10 text-brand-dark truncate font-mono text-sm">
                {window.location.origin}/ref/{session.user.id}
              </div>
              <button
                onClick={copyToClipboard}
                className="bg-[#9E7B16] hover:bg-[#8A6A12] text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 shrink-0"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Referral List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif text-[#9E7B16] mb-6">
              Your Referrals
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-brand-dark/5 overflow-hidden">
              {referrals.length === 0 ? (
                <div className="p-10 text-center text-brand-muted flex flex-col items-center">
                  <Users className="w-12 h-12 text-brand-dark/20 mb-4" />
                  <p>You haven't referred anyone yet.</p>
                  <p className="text-sm mt-2">
                    Share your link above to get started!
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-brand-dark/5">
                  {referrals.map((referral) => (
                    <li
                      key={referral.id}
                      className="p-6 flex items-center justify-between hover:bg-brand-light/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            referral.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : "bg-amber-100 text-amber-600"
                          }`}
                        >
                          {referral.status === "completed" ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Clock className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-brand-dark">
                            {referral.friend_name}
                          </p>
                          <p className="text-sm text-brand-muted capitalize">
                            {referral.status}
                          </p>
                        </div>
                      </div>
                      {referral.status === "completed" && (
                        <div className="text-right">
                          <p className="font-serif text-[#9E7B16] text-lg">
                            +50 Points
                          </p>
                          <p className="text-xs text-brand-muted">Earned</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* How it Works */}
          <div className="lg:col-span-1">
            <div className="bg-brand-dark/5 rounded-2xl p-8">
              <h2 className="text-xl font-serif text-[#9E7B16] mb-6">
                How it Works
              </h2>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#9E7B16] text-white flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium text-brand-dark mb-1">
                      Share your link
                    </h3>
                    <p className="text-sm text-brand-muted">
                      Send your unique referral link to friends and family.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#9E7B16] text-white flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium text-brand-dark mb-1">
                      They book a visit
                    </h3>
                    <p className="text-sm text-brand-muted">
                      When they use your link to book their first appointment,
                      they get tracked.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#9E7B16] text-white flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium text-brand-dark mb-1">
                      Earn points
                    </h3>
                    <p className="text-sm text-brand-muted">
                      Once their treatment is completed, you earn points that
                      can be applied to treatments like Teeth Whitening or
                      Botox®.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
