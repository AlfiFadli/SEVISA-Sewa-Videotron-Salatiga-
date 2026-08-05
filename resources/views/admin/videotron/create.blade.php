@extends('layouts.admin')

@section('title', 'Tambah Videotron Baru - Admin SEVISA')
@section('page_header', 'Tambah Lokasi Videotron Baru')

@section('content')
<div class="max-w-4xl space-y-6">
    
    <a href="{{ route('admin.videotron.index') }}" class="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition">
        &larr; Kembali ke Daftar Videotron
    </a>

    <div class="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <form action="{{ route('admin.videotron.store') }}" method="POST" class="space-y-6">
            @csrf

            <div class="space-y-4">
                <h3 class="text-sm font-bold text-brand-400 uppercase tracking-wider border-b border-slate-800 pb-2">Informasi & Spesifikasi Lokasi</h3>
                
                <div>
                    <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Nama Lokasi Videotron</label>
                    <input type="text" name="nama_lokasi" placeholder="Contoh: Videotron Utama Tugu Pancasila Salatiga" required class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Alamat Lengkap Lokasi</label>
                    <textarea name="alamat_lengkap" rows="3" placeholder="Jl. Pemuda No. 1, Sidorejo, Kota Salatiga, Jawa Tengah" required class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500"></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Koordinat Maps (Opsional)</label>
                        <input type="text" name="koordinat_maps" placeholder="-7.3305, 110.5084" class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Ukuran Layar (Panjang x Tinggi)</label>
                        <input type="text" name="ukuran_layar" placeholder="Contoh: 8 x 4 Meter (P10 Outdoor LED)" required class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Resolusi Display</label>
                        <input type="text" name="resolusi" placeholder="Contoh: 1920 x 1080 Full HD" required class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Jam Operasional / Tayang</label>
                        <input type="text" name="jam_tayang" placeholder="Contoh: 06:00 - 23:00 WIB (17 Jam)" required class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
                    </div>
                </div>
            </div>

            <!-- Pricing Configuration -->
            <div class="space-y-4 pt-4 border-t border-slate-800">
                <h3 class="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">Konfigurasi Tarif Sewa Paket</h3>
                <p class="text-xs text-slate-400">Isi tarif untuk paket yang ingin diaktifkan (dalam Rupiah).</p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tarif Paket Harian (Rp)</label>
                        <input type="number" step="1000" name="harga_harian" placeholder="1500000" class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tarif Paket Mingguan (Rp)</label>
                        <input type="number" step="1000" name="harga_mingguan" placeholder="8500000" class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tarif Paket Bulanan (Rp)</label>
                        <input type="number" step="1000" name="harga_bulanan" placeholder="30000000" class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tarif Paket Tahunan (Rp)</label>
                        <input type="number" step="1000" name="harga_tahunan" placeholder="320000000" class="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500">
                    </div>
                </div>
            </div>

            <div class="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <a href="{{ route('admin.videotron.index') }}" class="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl border border-slate-800 transition">
                    Batal
                </a>
                <button type="submit" class="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-brand-600/30 transition">
                    Simpan Data Videotron
                </button>
            </div>
        </form>
    </div>

</div>
@endsection
