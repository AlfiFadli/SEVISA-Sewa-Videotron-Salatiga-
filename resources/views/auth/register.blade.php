@extends('layouts.public')

@section('title', 'Pendaftaran Akun - SEVISA')

@section('content')
<div class="py-20 bg-slate-950 flex justify-center px-4">
    <div class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        
        <div class="text-center space-y-3">
            <img src="{{ asset('images/logo.png') }}" alt="SEVISA Logo" class="w-16 h-16 rounded-2xl shadow-xl border border-slate-800 mx-auto object-cover">
            <h1 class="text-xl font-extrabold text-white tracking-tight">Pendaftaran Akun Masyarakat</h1>
            <p class="text-xs text-slate-400">Buat akun untuk melakukan pemesanan sewa videotron di Salatiga.</p>
        </div>

        @if($errors->any())
            <div class="p-4 bg-rose-950/60 border border-rose-800/60 rounded-xl text-rose-300 text-xs">
                {{ $errors->first() }}
            </div>
        @endif

        <form action="{{ route('register') }}" method="POST" class="space-y-4">
            @csrf

            <div>
                <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Nama Lengkap / Instansi</label>
                <input type="text" name="name" value="{{ old('name') }}" placeholder="Contoh: Budi Santoso" required autofocus class="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Alamat Email</label>
                <input type="email" name="email" value="{{ old('email') }}" placeholder="nama@email.com" required class="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Kata Sandi</label>
                <input type="password" name="password" placeholder="Minimal 8 Karakter" required class="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
            </div>

            <div>
                <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Konfirmasi Kata Sandi</label>
                <input type="password" name="password_confirmation" placeholder="Ulangi Kata Sandi" required class="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500">
            </div>

            <button type="submit" class="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-brand-600/30 transition">
                Daftar Akun Baru
            </button>
        </form>

        <div class="text-center text-xs text-slate-500 border-t border-slate-800 pt-4">
            Sudah memiliki akun? <a href="{{ route('login') }}" class="text-brand-400 font-semibold hover:underline">Masuk di sini</a>
        </div>

    </div>
</div>
@endsection
