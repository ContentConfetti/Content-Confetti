import { Sparkles, Upload, Home, FolderOpen, Calendar, BarChart3, Settings, Users, Wand2, Plus, TrendingUp, Clock, FileText, Video, MessageSquare } from 'lucide-react';
import { useState } from 'react';

interface DashboardProps {
  onOpenUpload: () => void;
  onOpenProject: (id: string) => void;
}

export function Dashboard({ onOpenUpload, onOpenProject }: DashboardProps) {
  const [activeNav, setActiveNav] = useState('home');

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const recentProjects = [
    {
      id: '1',
      title: 'Ep 42: Building in Public',
      type: 'Podcast',
      date: '2 hours ago',
      status: 'completed',
      outputs: 18,
      thumbnail: '🎙️',
    },
    {
      id: '2',
      title: 'Q4 Product Webinar',
      type: 'Webinar',
      date: '1 day ago',
      status: 'completed',
      outputs: 24,
      thumbnail: '💻',
    },
    {
      id: '3',
      title: 'Instagram Live Recap',
      type: 'Video',
      date: '3 days ago',
      status: 'processing',
      outputs: 12,
      thumbnail: '📹',
    },
  ];

  const stats = [
    { label: 'Total Projects', value: '47', change: '+12%', icon: FolderOpen, color: 'from-[#FF1B8D] to-[#FF6B6B]' },
    { label: 'Content Pieces', value: '1,284', change: '+24%', icon: Sparkles, color: 'from-[#00D4FF] to-[#A855F7]' },
    { label: 'Time Saved', value: '156h', change: '+18%', icon: Clock, color: 'from-[#FFD700] to-[#FF6B6B]' },
    { label: 'Engagement', value: '89%', change: '+8%', icon: TrendingUp, color: 'from-[#10B981] to-[#00D4FF]' },
  ];

  const quickActions = [
    { label: 'Upload Podcast', icon: FileText, gradient: 'from-[#FF1B8D] to-[#FF6B6B]' },
    { label: 'Upload Video', icon: Video, gradient: 'from-[#00D4FF] to-[#A855F7]' },
    { label: 'Add Text', icon: MessageSquare, gradient: 'from-[#FFD700] to-[#10B981]' },
    { label: 'AI Generator', icon: Wand2, gradient: 'from-[#A855F7] to-[#FF1B8D]' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF1B8D] to-[#00D4FF]">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-[#FF1B8D] to-[#00D4FF] bg-clip-text text-xl font-bold text-transparent">
            Content Confetti
          </span>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                activeNav === item.id
                  ? 'bg-gradient-to-r from-[#FF1B8D]/10 to-[#00D4FF]/10 text-[#FF1B8D]'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="rounded-xl bg-gradient-to-br from-[#FF1B8D]/10 to-[#00D4FF]/10 p-4">
            <div className="mb-2 text-sm font-semibold text-gray-900">Creator Plan</div>
            <div className="mb-3 text-xs text-gray-600">7 of 10 uploads used</div>
            <div className="mb-3 h-2 overflow-hidden rounded-full bg-white">
              <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-[#FF1B8D] to-[#00D4FF]" />
            </div>
            <button className="w-full rounded-lg bg-gradient-to-r from-[#FF1B8D] to-[#00D4FF] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="border-b border-gray-200 bg-white px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back! 👋</h1>
              <p className="mt-1 text-gray-600">Let's create amazing content today</p>
            </div>
            <button
              onClick={onOpenUpload}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF1B8D] to-[#00D4FF] px-6 py-3 font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105 hover:shadow-xl"
            >
              <Plus className="h-5 w-5" />
              New Upload
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-[#10B981]">{stat.change}</span>
                </div>
                <div className="mb-1 text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={onOpenUpload}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:scale-105 hover:border-transparent hover:shadow-lg"
                >
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg transition-transform group-hover:scale-110`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="font-semibold text-gray-900">{action.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
              <button className="text-sm font-semibold text-[#FF1B8D] hover:text-[#00D4FF]">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => onOpenProject(project.id)}
                  className="flex w-full items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:scale-[1.02] hover:border-[#FF1B8D]/30 hover:shadow-lg"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 text-3xl">
                    {project.thumbnail}
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-gray-900">{project.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{project.type}</span>
                      <span>•</span>
                      <span>{project.date}</span>
                      <span>•</span>
                      <span>{project.outputs} pieces generated</span>
                    </div>
                  </div>

                  <div>
                    {project.status === 'completed' ? (
                      <div className="rounded-full bg-[#10B981]/10 px-4 py-2 text-sm font-semibold text-[#10B981]">
                        Completed
                      </div>
                    ) : (
                      <div className="rounded-full bg-[#FFD700]/10 px-4 py-2 text-sm font-semibold text-[#FFD700]">
                        Processing...
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
