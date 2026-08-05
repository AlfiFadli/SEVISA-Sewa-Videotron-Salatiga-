@extends('layouts.public')

@section('title', 'Katalog Videotron Salatiga - SEVISA')

@section('content')
<div class="py-12 bg-slate-900 border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-2">
            <h1 class="text-3xl font-extrabold text-white tracking-tight">Katalog Lokasi Videotron</h1>
            <p class="text-sm text-slate-400">Daftar lengkap titik tayang videotron strategis di seluruh wilayah Kota Salatiga.</p>
        </div>
    </div>
</div>

<div class="py-16 bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Videotron Grid Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @forelse($videotrons as $item)
                <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col hover:border-brand-500/40 transition shadow-xl">
                    
                    <!-- Architectural Header (No Human Photos) -->
                    <div class="h-44 bg-slate-950 p-6 flex flex-col justify-between border-b border-slate-800 relative">
                        <div class="flex justify-between items-center">
                            <span class="px-2.5 py-1 bg-brand-600/90 text-white font-bold text-[10px] uppercase rounded">
                                ID: VDT-0{{ $item->id }}
                            </span>
                            <span class="text-xs text-slate-400 font-medium">
                                {{ $item->ukuran_layar }}
                            </span>
                        </div>

                        <!-- Map & Specs Graphic -->
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-brand-400 shrink-0 border border-slate-700">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="2" y="3" width="20" height="14" rx="2" stroke-width="2"/>
                                    <path d="M8 21h8M12 17v4" stroke-width="2"/>
                                </svg>
                            </div>
                            <div class="min-w-0">
                                <h3 class="text-base font-bold text-white truncate">{{ $item->nama_lokasi }}</h3>
                                <p class="text-xs text-slate-400 truncate">{{ $item->alamat_lengkap }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Content Specifications -->
                    <div class="p-6 flex-1 flex flex-col justify-between space-y-6">
                        <div class="space-y-3 text-xs text-slate-300">
                            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                                <span class="text-slate-500">Resolusi Screen:</span>
                                <span class="font-semibold text-slate-200">{{ $item->resolusi }}</span>
                            </div>
                            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                                <span class="text-slate-500">Jam Operasional:</span>
                                <span class="font-semibold text-slate-200">{{ $item->jam_tayang }}</span>
                            </div>
                            <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                                <span class="text-slate-500">Koordinat Peta:</span>
                                <span class="font-mono text-slate-400 text-[11px]">{{ $item->koordinat_maps ?? 'Terdaftar' }}</span>
                            </div>

                            <!-- Package Prices Tags -->
                            <div class="pt-2">
                                <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">Pilihan Paket Sewa Tersedia:</span>
                                <div class="flex flex-wrap gap-1.5">
                                    @foreach($item->hargaSewas as $harga)
                                        <span class="px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-medium rounded">
                                            {{ $harga->jenis_paket }}: Rp {{ number_format($harga->harga, 0, ',', '.') }}
                                        </span>
                                    @endforeach
                                </div>
                            </div>
                        </div>

                        <!-- Action Button -->
                        <a href="{{ route('videotron.detail', $item->id) }}" class="w-full text-center py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl shadow-md transition">
                            Lihat Detail & Ajukan Pesanan
                        </a>
                    </div>
                </div>
            @empty
                <div class="col-span-full py-16 text-center text-slate-500">
                    Belum ada data videotron yang tersedia di katalog saat ini.
                </div>
            @endforelse
        </div>

        <!-- Pagination -->
        <div class="mt-12">
            {{ $videotrons->links() }}
        </div>

    </div>
</div>
@endsection
