import { Sparkles, Zap, Instagram, Twitter, Linkedin, PlayCircle, FileText, Mic, Video, Check, ArrowRight, Star } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: Mic,
      title: 'Upload Anything',
      description: 'Podcasts, videos, webinars, Zoom calls, voice memos',
      gradient: 'from-[#FF1B8D] to-[#FF6B6B]',
    },
    {
      icon: Sparkles,
      title: 'AI Magic',
      description: 'Transcribe, summarize, and extract viral hooks automatically',
      gradient: 'from-[#00D4FF] to-[#A855F7]',
    },
    {
      icon: Zap,
      title: 'Instant Output',
      description: '20+ ready-to-post captions, tweets, and LinkedIn posts',
      gradient: 'from-[#FFD700] to-[#10B981]',
    },
  ];

  const platforms = [
    { name: 'Instagram', icon: Instagram, color: '#FF1B8D' },
    { name: 'Twitter', icon: Twitter, color: '#00D4FF' },
    { name: 'LinkedIn', icon: Linkedin, color: '#A855F7' },
    { name: 'TikTok', icon: Video, color: '#10B981' },
    { name: 'Pinterest', icon: FileText, color: '#FF6B6B' },
  ];

  const pricing = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['1 upload/month', 'Basic AI tools', '10 generated posts', 'Community support'],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Creator',
      price: '$19',
      period: '/month',
      features: ['10 uploads/month', 'Unlimited captions', 'All platforms', 'Priority support', 'Brand voice'],
      cta: 'Start Creating',
      popular: true,
    },
    {
      name: 'Pro',
      price: '$49',
      period: '/month',
      features: ['Unlimited uploads', 'Advanced AI tools', 'Scheduling', 'Analytics', 'Team features'],
      cta: 'Go Pro',
      popular: false,
    },
    {
      name: 'Agency',
      price: '$149',
      period: '/month',
      features: ['Multi-brand workspace', 'White-label', 'Team permissions', 'Dedicated support', 'Custom AI'],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Podcast Host & Creator',
      content: 'Content Confetti turned my 45-minute podcast into an entire month of social content. Absolute game changer!',
      avatar: '👩‍💼',
    },
    {
      name: 'Marcus Chen',
      role: 'Social Media Manager',
      content: 'I used to spend hours repurposing content. Now it takes 5 minutes. This tool paid for itself in the first week.',
      avatar: '👨‍💻',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Business Coach',
      content: 'The AI captures my voice perfectly. My engagement is up 300% since I started posting consistently.',
      avatar: '👩',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-pink-50/30 to-blue-50/30 px-6 py-20 lg:px-8 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,27,141,0.1),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(0,212,255,0.1),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[#FF1B8D]" />
              <span className="bg-gradient-to-r from-[#FF1B8D] to-[#00D4FF] bg-clip-text text-sm font-semibold text-transparent">
                Turn 1 Into 20 — In Minutes
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
              Your Content.{' '}
              <span className="bg-gradient-to-r from-[#FF1B8D] via-[#A855F7] to-[#00D4FF] bg-clip-text text-transparent">
                Multiplied.
              </span>
            </h1>

            <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-600 md:text-2xl">
              Transform one long-form piece into dozens of platform-perfect social posts. AI-powered content repurposing for creators who want to post more without burning out.
            </p>

            <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={onGetStarted}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#FF1B8D] to-[#00D4FF] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-pink-500/40"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Start Creating Free
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>

              <button className="rounded-full border-2 border-gray-200 bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition-all hover:border-gray-300 hover:bg-gray-50">
                <span className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5" />
                  Watch Demo
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-[#10B981]" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-[#10B981]" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-[#10B981]" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Content Creation. <span className="text-[#FF1B8D]">Simplified.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Stop spending hours repurposing content. Let AI do the heavy lifting.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-gray-200 hover:shadow-xl"
              >
                <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              One Upload. <span className="text-[#00D4FF]">Every Platform.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Generate perfectly formatted content for all your favorite platforms
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-6 py-4 shadow-sm transition-all hover:scale-105 hover:shadow-md"
              >
                <platform.icon className="h-6 w-6" style={{ color: platform.color }} />
                <span className="font-semibold text-gray-900">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Loved by <span className="text-[#A855F7]">Creators</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Join thousands of creators saving 10+ hours per week
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
                <p className="mb-6 text-gray-700">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gradient-to-br from-gray-50 to-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Simple, <span className="text-[#10B981]">Transparent</span> Pricing
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Start free. Scale as you grow. Cancel anytime.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-3xl border p-8 ${
                  plan.popular
                    ? 'border-[#FF1B8D] bg-gradient-to-br from-pink-50 to-white shadow-xl shadow-pink-500/10'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="rounded-full bg-gradient-to-r from-[#FF1B8D] to-[#00D4FF] px-4 py-1 text-sm font-semibold text-white shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-[#10B981]" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full rounded-full py-3 font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#FF1B8D] to-[#00D4FF] text-white shadow-lg shadow-pink-500/30 hover:scale-105 hover:shadow-xl'
                      : 'border-2 border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden px-6 py-32 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF1B8D] via-[#A855F7] to-[#00D4FF]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-5xl font-bold text-white">
            Ready to 10x Your Content?
          </h2>
          <p className="mb-10 text-2xl text-white/90">
            Join 10,000+ creators who post more, stress less
          </p>
          <button
            onClick={onGetStarted}
            className="rounded-full bg-white px-10 py-5 text-xl font-semibold text-[#FF1B8D] shadow-2xl transition-all hover:scale-105 hover:shadow-white/20"
          >
            <span className="flex items-center gap-2">
              Start Free Today
              <ArrowRight className="h-6 w-6" />
            </span>
          </button>
          <p className="mt-6 text-sm text-white/80">
            No credit card required • Free forever plan available
          </p>
        </div>
      </section>
    </div>
  );
}
