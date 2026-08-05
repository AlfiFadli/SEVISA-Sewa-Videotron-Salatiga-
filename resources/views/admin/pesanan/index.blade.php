@extends('layouts.admin')

@section('title', 'Kelola Pesanan Masuk - Admin SEVISA')
@section('page_header', 'Kelola Pesanan Masuk dari Masyarakat')

@section('content')
<div class="space-y-6">

    <div>
        <h2 class="text-lg font-bold text-white">Daftar Seluruh Pesanan Penyewaan</h2>
        <p class="text-xs text-slate-400">Validasi pembayaran dan perbarui status tayang pesanan dari masyarakat.</p>
    </div>

    <!-- Data Table -->
    <div class="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
                <thead>
                    <tr class="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                        <th class="py-4 px-6">Kode Pesanan</th>
                        <th class="py-4 px-6">Pemohon (User)</th>
                        <th class="py-4 px-6">Lokasi Videotron</th>
                        <th class="py-4 px-6">Periode Penayangan</th>
                        <th class="py-4 px-6">Total Biaya</th>
                        <th class="py-4 px-6">Status Pesanan saat Ini</th>
                        <th class="py-4 px-6 text-center">Ubah Status Pesanan</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-800">
                    @forelse($pesanans as $pesanan)
                        <tr class="hover:bg-slate-900/50 transition">
                            <td class="py-4 px-6 font-mono font-bold text-brand-400">
                                {{ $pesanan->kode_pesanan }}
                            </td>
                            <td class="py-4 px-6">
                                <div class="font-bold text-slate-200">{{ $pesanan->user->name ?? 'N/A' }}</div>
                                <div class="text-[11px] text-slate-400">{{ $pesanan->user->email ?? '' }}</div>
                            </td>
                            <td class="py-4 px-6">
                                <div class="font-bold text-slate-200">{{ $pesanan->videotron->nama_lokasi ?? 'N/A' }}</div>
                                <div class="text-[11px] text-slate-400 truncate max-w-xs">{{ $pesanan->videotron->alamat_lengkap ?? '' }}</div>
                            </td>
                            <td class="py-4 px-6 text-slate-300">
                                <div class="font-medium">{{ \Carbon\Carbon::parse($pesanan->tanggal_mulai)->format('d M Y') }}</div>
                                <div class="text-[11px] text-slate-400">s/d {{ \Carbon\Carbon::parse($pesanan->tanggal_selesai)->format('d M Y') }}</div>
                            </td>
                            <td class="py-4 px-6 font-bold text-amber-400 text-sm">
                                Rp {{ number_format($pesanan->total_biaya, 0, ',', '.') }}
                            </td>
                            <td class="py-4 px-6">
                                @if($pesanan->status_pesanan === 'Menunggu Pembayaran')
                                    <span class="px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                                        Menunggu Pembayaran
                                    </span>
                                @elseif($pesanan->status_pesanan === 'Aktif Tayang')
                                    <span class="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                        Aktif Tayang
                                    </span>
                                @else
                                    <span class="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                                        Selesai
                                    </span>
                                @endif
                            </td>
                            <td class="py-4 px-6">
                                <form action="{{ route('admin.pesanan.update-status', $pesanan->id) }}" method="POST" class="flex items-center justify-center gap-2">
                                    @csrf
                                    @method('PATCH')
                                    <select name="status_pesanan" class="bg-slate-900 border border-slate-800 text-slate-200 text-[11px] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-brand-500">
                                        <option value="Menunggu Pembayaran" {{ $pesanan->status_pesanan === 'Menunggu Pembayaran' ? 'selected' : '' }}>Menunggu Pembayaran</option>
                                        <option value="Aktif Tayang" {{ $pesanan->status_pesanan === 'Aktif Tayang' ? 'selected' : '' }}>Aktif Tayang</option>
                                        <option value="Selesai" {{ $pesanan->status_pesanan === 'Selesai' ? 'selected' : '' }}>Selesai</option>
                                    </select>
                                    <button type="submit" class="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-[11px] rounded-lg shadow transition">
                                        Simpan
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="py-12 text-center text-slate-500">Belum ada pesanan masuk dari masyarakat.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

</div>
@endsection
