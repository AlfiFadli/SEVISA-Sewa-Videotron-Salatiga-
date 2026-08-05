@extends('layouts.public')

@section('title', 'Detail Videotron: ' . $videotron->nama_lokasi . ' - SEVISA')

@section('content')
<div class="py-12 bg-slate-900 border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a href="{{ route('katalog') }}" class="inline-flex items-center gap-2 text-xs font-semibold text-brand-400 hover:text-brand-300 transition mb-4">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Kembali ke Katalog Videotron
        </a>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{{ $videotron->nama_lokasi }}</h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-2">
            <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            </svg>
            {{ $videotron->alamat_lengkap }}
        </p>
    </div>
</div>

<div class="py-16 bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <!-- Left Column: Specs & Price Matrix Table -->
            <div class="lg:col-span-7 space-y-8">
                
                <!-- Screen Blueprint & Tech Details -->
                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                    <h2 class="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
                        <svg class="w-4 h-4 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="2" y="3" width="20" height="14" rx="2" stroke-width="2"/>
                            <path d="M8 21h8M12 17v4" stroke-width="2"/>
                        </svg>
                        Spesifikasi Teknis Panel LED
                    </h2>

                    <!-- Display Blueprint Vector (Pure Architectural Graphic) -->
                    <div class="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center space-y-3">
                        <div class="inline-block p-4 bg-brand-950/80 border border-brand-500/30 rounded-lg">
                            <div class="text-xs font-mono text-brand-400">LAYAR UTAMA SEVISA SALATIGA</div>
                            <div class="text-2xl font-black text-white my-1">{{ $videotron->ukuran_layar }}</div>
                            <div class="text-xs text-slate-400">Resolusi Display: {{ $videotron->resolusi }}</div>
                        </div>
                    </div>

                    <!-- Specs Table Grid -->
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                        <div class="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                            <div class="text-slate-500 mb-1">Ukuran Layar</div>
                            <div class="font-bold text-slate-200 text-sm">{{ $videotron->ukuran_layar }}</div>
                        </div>
                        <div class="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                            <div class="text-slate-500 mb-1">Resolusi Screen</div>
                            <div class="font-bold text-slate-200 text-sm">{{ $videotron->resolusi }}</div>
                        </div>
                        <div class="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                            <div class="text-slate-500 mb-1">Jam Tayang Kontinu</div>
                            <div class="font-bold text-slate-200 text-sm">{{ $videotron->jam_tayang }}</div>
                        </div>
                    </div>
                </div>

                <!-- Price Matrix Table (tabel harga_sewas) -->
                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                    <h2 class="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Matriks Paket & Tarif Sewa
                    </h2>
                    
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr class="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                                    <th class="py-3 px-4">Jenis Paket</th>
                                    <th class="py-3 px-4">Tarif Sewa (Nett)</th>
                                    <th class="py-3 px-4">Status Paket</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-800">
                                @forelse($videotron->hargaSewas as $harga)
                                    <tr class="hover:bg-slate-950/50">
                                        <td class="py-3.5 px-4 font-bold text-slate-200">{{ $harga->jenis_paket }}</td>
                                        <td class="py-3.5 px-4 font-extrabold text-amber-400 text-sm">
                                            Rp {{ number_format($harga->harga, 0, ',', '.') }}
                                        </td>
                                        <td class="py-3.5 px-4">
                                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                                Tersedia
                                            </span>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="3" class="py-4 text-center text-slate-500">Paket harga belum dikonfigurasi untuk lokasi ini.</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <!-- Right Column: Booking Form (Form Pesan) -->
            <div class="lg:col-span-5">
                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl sticky top-28 space-y-6">
                    <div>
                        <h3 class="text-base font-bold text-white">Formulir Pengajuan Penyewaan</h3>
                        <p class="text-xs text-slate-400 mt-1">Pilih paket sewa dan tanggal mulai penayangan iklan Anda.</p>
                    </div>

                    @auth
                        @if(auth()->user()->isMasyarakat())
                            <form action="{{ route('masyarakat.pesanan.store') }}" method="POST" class="space-y-4">
                                @csrf
                                <input type="hidden" name="videotron_id" value="{{ $videotron->id }}">

                                <div>
                                    <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Pilih Jenis Paket Sewa</label>
                                    <select name="harga_sewa_id" required class="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
                                        <option value="" disabled selected>-- Pilih Paket Sewa --</option>
                                        @foreach($videotron->hargaSewas as $harga)
                                            <option value="{{ $harga->id }}">
                                                Paket {{ $harga->jenis_paket }} - Rp {{ number_format($harga->harga, 0, ',', '.') }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('harga_sewa_id')
                                        <p class="text-xs text-rose-400 mt-1">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div>
                                    <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tanggal Mulai Tayang</label>
                                    <input type="date" name="tanggal_mulai" min="{{ date('Y-m-d') }}" required class="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
                                    @error('tanggal_mulai')
                                        <p class="text-xs text-rose-400 mt-1">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div class="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs text-slate-400">
                                    <div class="flex justify-between">
                                        <span>Pemohon Pesanan:</span>
                                        <span class="font-semibold text-slate-200">{{ auth()->user()->name }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span>Email Kontak:</span>
                                        <span class="font-semibold text-slate-200">{{ auth()->user()->email }}</span>
                                    </div>
                                </div>

                                <button type="submit" class="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-brand-600/30 transition">
                                    Buat Pesanan Penyewaan Sekarang
                                </button>
                            </form>
                        @else
                            <div class="p-4 bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs rounded-xl">
                                Akun Anda terdaftar sebagai **Administrator**. Silakan masuk dengan akun **Masyarakat** untuk dapat melakukan pengajuan sewa.
                            </div>
                        @endif
                    @else
                        <div class="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center space-y-4">
                            <p class="text-xs text-slate-400">Silakan masuk ke akun Anda terlebih dahulu untuk mengajukan penyewaan lokasi videotron ini.</p>
                            <a href="{{ route('login') }}" class="inline-block w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl transition">
                                Masuk ke Akun Anda
                            </a>
                            <div class="text-xs text-slate-500">
                                Belum memiliki akun? <a href="{{ route('register') }}" class="text-brand-400 hover:underline">Daftar di sini</a>
                            </div>
                        </div>
                    @endauth
                </div>
            </div>

        </div>

    </div>
</div>
@endsection
