@extends('layouts.admin')

@section('title', 'Kelola Videotron - Admin SEVISA')
@section('page_header', 'Kelola Lokasi Videotron & Harga Paket')

@section('content')
<div class="space-y-6">

    <!-- Header Action Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h2 class="text-lg font-bold text-white">Daftar Videotron Terdaftar</h2>
            <p class="text-xs text-slate-400">Tambah, ubah, atau hapus lokasi videotron dan konfigurasi paket harganya.</p>
        </div>
        <a href="{{ route('admin.videotron.create') }}" class="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-brand-600/30 transition flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Tambah Videotron Baru
        </a>
    </div>

    <!-- Data Table -->
    <div class="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
                <thead>
                    <tr class="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                        <th class="py-4 px-6">ID</th>
                        <th class="py-4 px-6">Nama Lokasi & Alamat</th>
                        <th class="py-4 px-6">Ukuran Layar</th>
                        <th class="py-4 px-6">Resolusi</th>
                        <th class="py-4 px-6">Paket Harga Sewa</th>
                        <th class="py-4 px-6 text-center">Aksi (CRUD)</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-800">
                    @forelse($videotrons as $item)
                        <tr class="hover:bg-slate-900/50 transition">
                            <td class="py-4 px-6 font-mono text-slate-400">#{{ $item->id }}</td>
                            <td class="py-4 px-6 max-w-xs">
                                <div class="font-bold text-slate-100">{{ $item->nama_lokasi }}</div>
                                <div class="text-[11px] text-slate-400 truncate mt-0.5">{{ $item->alamat_lengkap }}</div>
                            </td>
                            <td class="py-4 px-6 font-semibold text-slate-200">{{ $item->ukuran_layar }}</td>
                            <td class="py-4 px-6 text-slate-300">{{ $item->resolusi }}</td>
                            <td class="py-4 px-6">
                                <div class="space-y-1">
                                    @foreach($item->hargaSewas as $h)
                                        <div class="text-[11px]">
                                            <span class="text-slate-400 font-medium">{{ $h->jenis_paket }}:</span>
                                            <span class="font-bold text-amber-400">Rp {{ number_format($h->harga, 0, ',', '.') }}</span>
                                        </div>
                                    @endforeach
                                </div>
                            </td>
                            <td class="py-4 px-6">
                                <div class="flex items-center justify-center gap-2">
                                    <a href="{{ route('admin.videotron.edit', $item->id) }}" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] rounded-lg border border-slate-700 transition">
                                        Edit
                                    </a>
                                    <form action="{{ route('admin.videotron.destroy', $item->id) }}" method="POST" onsubmit="return confirm('Apakah Anda yakin ingin menghapus lokasi videotron ini?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 font-semibold text-[11px] rounded-lg border border-rose-800/60 transition">
                                            Hapus
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="py-12 text-center text-slate-500">Belum ada data videotron yang tersimpan.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

</div>
@endsection
