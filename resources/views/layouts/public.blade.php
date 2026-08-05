<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'SEVISA - Sewa Videotron Salatiga')</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#eff6ff',
                            100: '#dbeafe',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                            800: '#1e40af',
                            900: '#1e3a8a',
                        }
                    },
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
</head>
<body class="bg-slate-50 text-slate-800 flex flex-col min-h-screen">

    <!-- Header & Navigasi Terang -->
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            
            <!-- Logo Pojok Kiri Atas -->
            <a href="{{ route('home') }}" class="flex items-center gap-3.5 group">
                <img src="{{ asset('images/logo.png') }}" alt="SEVISA Logo" class="w-10 h-10 rounded-xl shadow-sm border border-slate-200 group-hover:scale-105 transition object-cover">
                <div>
                    <span class="text-xl font-extrabold tracking-tight text-slate-900 block leading-none">SEVISA</span>
                    <span class="text-[10px] font-semibold text-brand-600 tracking-widest uppercase block mt-1">Sewa Videotron Salatiga</span>
                </div>
            </a>

            <!-- Navigasi & Fitur Pojok Kanan -->
            <nav class="flex items-center gap-6 text-sm font-semibold text-slate-600">
                <a href="{{ route('home') }}" class="hover:text-brand-600 transition {{ request()->routeIs('home') ? 'text-brand-600 font-bold' : '' }}">Beranda</a>
                <a href="{{ route('katalog') }}" class="hover:text-brand-600 transition {{ request()->routeIs('katalog*') ? 'text-brand-600 font-bold' : '' }}">Katalog Lokasi</a>
                
                @auth
                    @if(auth()->user()->isMasyarakat())
                        <a href="{{ route('masyarakat.pesanan.index') }}" class="hover:text-brand-600 transition {{ request()->routeIs('masyarakat.pesanan*') ? 'text-brand-600 font-bold' : '' }}">Pesanan Saya</a>
                    @elseif(auth()->user()->isAdmin())
                        <a href="{{ route('admin.dashboard') }}" class="text-amber-600 hover:text-amber-700 font-bold transition">Dasbor Admin</a>
                    @endif
                @endauth

                <!-- Auth Buttons -->
                <div class="flex items-center gap-2 pl-4 border-l border-slate-200">
                    @auth
                        <div class="flex items-center gap-3">
                            <span class="text-xs font-bold text-slate-700 hidden sm:inline">{{ auth()->user()->name }}</span>
                            <form action="{{ route('logout') }}" method="POST">
                                @csrf
                                <button type="submit" class="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition">
                                    Keluar
                                </button>
                            </form>
                        </div>
                    @else
                        <a href="{{ route('login') }}" class="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition">
                            Masuk
                        </a>
                        <a href="{{ route('register') }}" class="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-600/20 transition hidden sm:inline-block">
                            Daftar
                        </a>
                    @endauth
                </div>
            </nav>

        </div>
    </header>

    <!-- Content Body -->
    <main class="flex-grow">
        @if(session('success'))
            <div class="max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
                <div class="bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-4 rounded-2xl flex items-center gap-3 shadow-sm">
                    <svg class="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span class="text-xs sm:text-sm font-semibold">{{ session('success') }}</span>
                </div>
            </div>
        @endif

        @yield('content')
    </main>

    <!-- Footer Terang -->
    <footer class="bg-white border-t border-slate-200 mt-20 py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div class="flex items-center gap-3">
                <img src="{{ asset('images/logo.png') }}" alt="SEVISA Logo" class="w-8 h-8 rounded-lg border border-slate-200">
                <span class="font-medium">&copy; {{ date('Y') }} SEVISA (Sewa Videotron Salatiga). Hak Cipta Dilindungi.</span>
            </div>
            <div class="flex items-center gap-6 font-semibold">
                <a href="{{ route('home') }}" class="hover:text-slate-900">Beranda</a>
                <a href="{{ route('katalog') }}" class="hover:text-slate-900">Katalog</a>
                <a href="{{ route('login') }}" class="hover:text-slate-900">Portal Masuk</a>
            </div>
        </div>
    </footer>

</body>
</html>
