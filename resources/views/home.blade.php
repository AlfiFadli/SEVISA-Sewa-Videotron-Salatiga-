@extends('layouts.public')

@section('title', 'SEVISA - Sewa Videotron Salatiga')

@section('content')
<!-- Hero Section dengan Logo Center -->
<div class="bg-white border-b border-slate-200 py-16 sm:py-24 text-center relative overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>

    <div class="relative max-w-4xl mx-auto px-4 space-y-6">
        
        <!-- LOGO DITENGAH -->
        <div class="inline-block p-3 bg-slate-50 border border-slate-200 rounded-3xl shadow-xl hover:scale-105 transition duration-300">
            <img src="{{ asset('images/logo.png') }}" alt="SEVISA Logo Center" class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover">
        </div>

        <div class="space-y-3">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 text-xs font-bold uppercase tracking-wider">
                Sewa Videotron Salatiga (SEVISA)
            </span>
            <h1 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Layanan Penyiaran Iklan Digital <br class="hidden sm:inline"><span class="text-brand-600">Terpercaya di Kota Salatiga</span>
            </h1>
            <p class="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
                Pesan slot penayangan iklan dan informasi publik pada titik-titik persimpangan teramai di Salatiga secara mudah, cepat, dan transparan.
            </p>
        </div>

        <!-- Quick Action Bar -->
        <div class="pt-4 flex flex-wrap justify-center gap-3">
            <a href="{{ route('katalog') }}" class="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-brand-600/25 transition flex items-center gap-2">
                <span>Jelajahi Katalog Videotron</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
        </div>

    </div>
</div>

<!-- 3 TITIK LOKASI VIDEOTRON UTAMA SERING DIAKSES MASYARAKAT -->
<div class="py-16 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div class="text-center max-w-2xl mx-auto space-y-2">
            <span class="text-xs font-bold text-brand-600 uppercase tracking-widest">Titik Favorit Masyarakat</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900">3 Lokasi Videotron Paling Populer</h2>
            <p class="text-xs sm:text-sm text-slate-600">Lokasi persimpangan utama Salatiga dengan jangkauan audiens tertinggi setiap harinya.</p>
        </div>

        <!-- 3 CARDS GRID TERANG -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @foreach($featuredVideotrons as $item)
                <div class="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-brand-300 transition duration-300 flex flex-col justify-between space-y-6">
                    <div class="space-y-4">
                        <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                            <span class="px-3 py-1 bg-brand-50 text-brand-700 font-bold text-xs rounded-full border border-brand-200">
                                ID: VDT-0{{ $item->id }}
                            </span>
                            <span class="text-xs font-semibold text-slate-500">{{ $item->ukuran_layar }}</span>
                        </div>

                        <div class="flex items-center gap-3.5">
                            <div class="w-12 h-12 bg-brand-50 rounded-2xl border border-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" stroke-width="2"/><path d="M8 21h8M12 17v4" stroke-width="2"/></svg>
                            </div>
                            <div>
                                <h3 class="font-extrabold text-slate-900 text-base">{{ $item->nama_lokasi }}</h3>
                                <p class="text-xs text-slate-500 mt-0.5">{{ $item->alamat_lengkap }}</p>
                            </div>
                        </div>

                        <div class="space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <div class="flex justify-between py-1 border-b border-slate-200/60">
                                <span class="text-slate-500">Ukuran Screen:</span>
                                <span class="font-bold text-slate-900">{{ $item->ukuran_layar }}</span>
                            </div>
                            <div class="flex justify-between py-1 border-b border-slate-200/60">
                                <span class="text-slate-500">Resolusi Display:</span>
                                <span class="font-bold text-slate-900">{{ $item->resolusi }}</span>
                            </div>
                            <div class="flex justify-between py-1">
                                <span class="text-slate-500">Jam Operasional:</span>
                                <span class="font-bold text-slate-900">{{ $item->jam_tayang }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3 pt-2">
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-slate-500 font-medium">Mulai Dari:</span>
                            <span class="text-base font-extrabold text-amber-600">
                                Rp {{ number_format($item->hargaSewas->min('harga') ?? 0, 0, ',', '.') }}
                            </span>
                        </div>
                        <a href="{{ route('videotron.detail', $item->id) }}" class="w-full text-center block py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-600/20 transition">
                            Pesan Videotron Ini
                        </a>
                    </div>
                </div>
            @endforeach
        </div>

    </div>
</div>
@endsection
