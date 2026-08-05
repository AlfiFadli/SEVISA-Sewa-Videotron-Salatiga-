@extends('layouts.public')

@section('title', 'Riwayat Pesanan & Cek Status - SEVISA')

@section('content')
<div class="py-12 bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Riwayat Pesanan & Status Pembayaran</h1>
            <p class="text-xs sm:text-sm text-slate-600 mt-1">Lacak status konfirmasi admin dan lanjutkan pembayaran penyewaan videotron Anda.</p>
        </div>
    </div>
</div>

<div class="py-12 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        <!-- Table Data Pesanan Saya -->
        <div class="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs border-collapse">
                    <thead>
                        <tr class="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase font-semibold">
                            <th class="py-4 px-6">Kode Pesanan</th>
                            <th class="py-4 px-6">Lokasi Videotron</th>
                            <th class="py-4 px-6">Periode Penayangan</th>
                            <th class="py-4 px-6">Total Tagihan</th>
                            <th class="py-4 px-6">Status Konfirmasi Admin</th>
                            <th class="py-4 px-6 text-center">Aksi Pembayaran</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @forelse($pesanans as $pesanan)
                            <tr class="hover:bg-slate-50 transition">
                                <td class="py-4 px-6 font-mono font-bold text-brand-600">
                                    {{ $pesanan->kode_pesanan }}
                                </td>
                                <td class="py-4 px-6">
                                    <div class="font-bold text-slate-900">{{ $pesanan->videotron->nama_lokasi ?? 'N/A' }}</div>
                                    <div class="text-[11px] text-slate-500 truncate max-w-xs">{{ $pesanan->videotron->alamat_lengkap ?? '' }}</div>
                                </td>
                                <td class="py-4 px-6 text-slate-700">
                                    <div class="font-semibold">{{ \Carbon\Carbon::parse($pesanan->tanggal_mulai)->format('d M Y') }}</div>
                                    <div class="text-[11px] text-slate-500">s/d {{ \Carbon\Carbon::parse($pesanan->tanggal_selesai)->format('d M Y') }}</div>
                                </td>
                                <td class="py-4 px-6 font-bold text-amber-600 text-sm">
                                    Rp {{ number_format($pesanan->total_biaya, 0, ',', '.') }}
                                </td>
                                <td class="py-4 px-6">
                                    @if($pesanan->status_pesanan === 'Menunggu Pembayaran')
                                        <span class="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full font-bold text-[10px]">
                                            Menunggu Konfirmasi Admin / Bayar
                                        </span>
                                    @elseif($pesanan->status_pesanan === 'Aktif Tayang')
                                        <span class="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px]">
                                            ✅ Lunas - Aktif Tayang
                                        </span>
                                    @else
                                        <span class="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-full font-bold text-[10px]">
                                            Selesai
                                        </span>
                                    @endif
                                </td>
                                <td class="py-4 px-6 text-center">
                                    @if($pesanan->status_pesanan === 'Menunggu Pembayaran')
                                        <button onclick="alert('Lanjutkan pembayaran melalui Scan QRIS / Transfer Bank ke rekening Pemkot Salatiga.');" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition">
                                            💳 Bayar (QRIS / Bank)
                                        </button>
                                    @else
                                        <span class="text-[11px] text-slate-400 font-semibold">Tidak ada aksi</span>
                                    @endif
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="6" class="py-12 text-center text-slate-500">
                                    Anda belum memiliki riwayat pesanan sewa videotron.
                                    <a href="{{ route('katalog') }}" class="block text-brand-600 font-bold mt-2 hover:underline">Jelajahi Katalog & Buat Pesanan Baru</a>
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>
@endsection
