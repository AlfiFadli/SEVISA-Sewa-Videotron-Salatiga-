@extends('layouts.admin')

@section('title', 'Edit Videotron - Admin SEVISA')
@section('page_header', 'Edit Data Videotron & Tarif Paket')

@section('content')
<div class="max-w-4xl space-y-6">
    
    <a href="{{ route('admin.videotron.index') }}" class="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        &larr; Kembali ke Daftar Videotron
    </a>

    <div class="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <form action="{{ route('admin.videotron.update', $videotron->id) }}" method="POST" class="space-y-6">
            @csrf
            @method('PUT')

            <div class="space-y-4">
                <h3 class="text-sm font-bold text-brand-400 uppercase tracking-wider border-b border-slate-800 pb-2">Informasi & Spesifikasi Lokasi</h3>
                
                <div>
                    <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Nama Lokasi Videotron</label>
                    <input type="text" name="nama_lokasi" value="{{ old('nama_lokasi', $videotron->nama_lokasi) }}" required class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Alamat Lengkap Lokasi</label>
                    <textarea name="alamat_lengkap" rows="3" required class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">{{ old('alamat_lengkap', $videotron->alamat_lengkap) }}</textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Koordinat Maps (Opsional)</label>
                        <input type="text" name="koordinat_maps" value="{{ old('koordinat_maps', $videotron->koordinat_maps) }}" class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Ukuran Layar</label>
                        <input type="text" name="ukuran_layar" value="{{ old('ukuran_layar', $videotron->ukuran_layar) }}" required class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Resolusi Display</label>
                        <input type="text" name="resolusi" value="{{ old('resolusi', $videotron->resolusi) }}" required class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Jam Operasional / Tayang</label>
                        <input type="text" name="jam_tayang" value="{{ old('jam_tayang', $videotron->jam_tayang) }}" required class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
                    </div>
                </div>
            </div>

            <!-- Pricing Configuration -->
            <div class="space-y-4 pt-4 border-t border-slate-800">
                <h3 class="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">Konfigurasi Tarif Sewa Paket</h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tarif Paket Harian (Rp)</label>
                        <input type="number" step="1000" name="harga_harian" value="{{ old('harga_harian', $hargaHarian) }}" class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tarif Paket Mingguan (Rp)</label>
                        <input type="number" step="1000" name="harga_mingguan" value="{{ old('harga_mingguan', $hargaMingguan) }}" class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tarif Paket Bulanan (Rp)</label>
                        <input type="number" step="1000" name="harga_bulanan" value="{{ old('harga_bulanan', $hargaBulanan) }}" class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tarif Paket Tahunan (Rp)</label>
                        <input type="number" step="1000" name="harga_tahunan" value="{{ old('harga_tahunan', $hargaTahunan) }}" class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500">
                    </div>
                </div>
            </div>

            <div class="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <a href="{{ route('admin.videotron.index') }}" class="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl border border-slate-800 transition">
                    Batal
                </a>
                <button type="submit" class="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-brand-600/30 transition">
                    Perbarui Data Videotron
                </button>
            </div>
        </form>
    </div>

</div>
@endsection
