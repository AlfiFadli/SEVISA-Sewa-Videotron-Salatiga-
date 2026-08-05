@extends('layouts.admin')

@section('title', 'Admin Dashboard - SEVISA')
@section('page_header', 'Ringkasan Dasbor Administrator')

@section('content')
<div class="space-y-8">

    <!-- Stat Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div class="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-lg">
            <div class="flex justify-between items-start mb-4">
                <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Videotron</span>
                <div class="w-8 h-8 bg-brand-500/10 text-brand-400 rounded-lg flex items-center justify-center border border-brand-500/30">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="2" y="3" width="20" height="14" rx="2" stroke-width="2"/>
                    </svg>
                </div>
            </div>
            <div class="text-3xl font-extrabold text-white">{{ $totalVideotron }}</div>
            <div class="text-xs text-slate-500 mt-1">Titik Lokasi Terdaftar</div>
        </div>

        <div class="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-lg">
            <div class="flex justify-between items-start mb-4">
                <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pesanan</span>
                <div class="w-8 h-8 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center border border-indigo-500/30">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                </div>
            </div>
            <div class="text-3xl font-extrabold text-white">{{ $totalPesanan }}</div>
            <div class="text-xs text-slate-500 mt-1">Pengajuan Sewa Masuk</div>
        </div>

        <div class="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-lg">
            <div class="flex justify-between items-start mb-4">
                <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Menunggu Pembayaran</span>
                <div class="w-8 h-8 bg-amber-500/10 text-amber-400 rounded-lg flex items-center justify-center border border-amber-500/30">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
            </div>
            <div class="text-3xl font-extrabold text-amber-400">{{ $pesananMenunggu }}</div>
            <div class="text-xs text-slate-500 mt-1">Perlu Validasi Admin</div>
        </div>

        <div class="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-lg">
            <div class="flex justify-between items-start mb-4">
                <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Aktif Tayang</span>
                <div class="w-8 h-8 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center border border-emerald-500/30">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
            </div>
            <div class="text-3xl font-extrabold text-emerald-400">{{ $pesananAktif }}</div>
            <div class="text-xs text-slate-500 mt-1">Sedang Penayangan</div>
        </div>

    </div>

    <!-- Recent Incoming Bookings Table -->
    <div class="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div class="flex justify-between items-center">
            <div>
                <h3 class="text-base font-bold text-white">Pesanan Masuk Terbaru</h3>
                <p class="text-xs text-slate-400">5 pengajuan sewa terbaru dari masyarakat.</p>
            </div>
            <a href="{{ route('admin.pesanan.index') }}" class="text-xs font-semibold text-brand-400 hover:underline">
                Kelola Seluruh Pesanan &rarr;
            </a>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
                <thead>
                    <tr class="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                        <th class="py-3.5 px-4">Kode Pesanan</th>
                        <th class="py-3.5 px-4">Pemohon (User)</th>
                        <th class="py-3.5 px-4">Lokasi Videotron</th>
                        <th class="py-3.5 px-4">Total Biaya</th>
                        <th class="py-3.5 px-4">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-800/80">
                    @forelse($pesananTerbaru as $p)
                        <tr class="hover:bg-slate-900/50">
                            <td class="py-3.5 px-4 font-mono font-bold text-brand-400">{{ $p->kode_pesanan }}</td>
                            <td class="py-3.5 px-4 font-semibold text-slate-200">{{ $p->user->name ?? 'N/A' }}</td>
                            <td class="py-3.5 px-4 text-slate-300">{{ $p->videotron->nama_lokasi ?? 'N/A' }}</td>
                            <td class="py-3.5 px-4 font-bold text-amber-400">Rp {{ number_format($p->total_biaya, 0, ',', '.') }}</td>
                            <td class="py-3.5 px-4">
                                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold 
                                    {{ $p->status_pesanan === 'Menunggu Pembayaran' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : ($p->status_pesanan === 'Aktif Tayang' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700') }}">
                                    {{ $p->status_pesanan }}
                                </span>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="py-6 text-center text-slate-500">Belum ada pesanan masuk.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

</div>
@endsection
