<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin Dashboard - SEVISA')</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            500: '#2563eb',
                            600: '#1d4ed8',
                            700: '#1e40af',
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style> body { font-family: 'Inter', sans-serif; } </style>
</head>
<body class="bg-slate-900 text-slate-100 min-h-screen flex">

    <!-- Sidebar Admin -->
    <aside class="w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
        <div class="h-20 flex items-center px-6 border-b border-slate-800">
            <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-3">
                <img src="{{ asset('images/logo.png') }}" alt="SEVISA Admin Logo" class="w-9 h-9 rounded-lg border border-slate-800 shadow object-cover">
                <div>
                    <span class="text-base font-black text-white block leading-none">SEVISA Admin</span>
                    <span class="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mt-1 block">Panel Kontrol</span>
                </div>
            </a>
        </div>

        <nav class="flex-1 p-4 space-y-1">
            <a href="{{ route('admin.dashboard') }}" 
               class="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition {{ request()->routeIs('admin.dashboard') ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200' }}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
                Ringkasan Dasbor
            </a>

            <a href="{{ route('admin.videotron.index') }}" 
               class="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition {{ request()->routeIs('admin.videotron*') ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200' }}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="3" width="20" height="14" rx="2" stroke-width="2"/>
                    <path d="M8 21h8M12 17v4" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Kelola Videotron & Harga
            </a>

            <a href="{{ route('admin.pesanan.index') }}" 
               class="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition {{ request()->routeIs('admin.pesanan*') ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200' }}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Kelola Pesanan Masuk
            </a>
        </nav>

        <div class="p-4 border-t border-slate-800">
            <a href="{{ route('home') }}" class="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand-400 mb-3 transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Kembali ke Situs Utama
            </a>
            <form action="{{ route('logout') }}" method="POST">
                @csrf
                <button type="submit" class="w-full text-left px-4 py-2 text-xs font-semibold text-rose-400 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 rounded-lg transition">
                    Keluar Sistem
                </button>
            </form>
        </div>
    </aside>

    <!-- Content Area -->
    <div class="flex-1 flex flex-col min-w-0">
        <!-- Topbar -->
        <header class="h-20 bg-slate-950/60 border-b border-slate-800 px-8 flex items-center justify-between shrink-0">
            <h1 class="text-lg font-bold text-white">@yield('page_header', 'Dasbor Administrator')</h1>
            <div class="flex items-center gap-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    Akses Tertutup: Administrator
                </span>
                <span class="text-sm text-slate-300 font-medium">{{ auth()->user()->name }}</span>
            </div>
        </header>

        <!-- Main Body -->
        <main class="flex-1 p-8 overflow-y-auto">
            @if(session('success'))
                <div class="mb-6 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 px-5 py-4 rounded-xl flex items-center gap-3">
                    <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span class="text-sm font-medium">{{ session('success') }}</span>
                </div>
            @endif

            @yield('content')
        </main>
    </div>

</body>
</html>
