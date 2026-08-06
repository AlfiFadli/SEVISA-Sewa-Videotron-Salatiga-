<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\PesananController;

/*
|--------------------------------------------------------------------------
| Web Routes SEVISA (Sewa Videotron Salatiga - User Navigation)
|--------------------------------------------------------------------------
*/

// Auth Gatekeeper
Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('home');
    }
    return redirect()->route('login');
});

// Area User Navigasi: Beranda, Tentang, Lokasi, Proyek, Press, Blog
Route::middleware(['auth'])->group(function () {
    Route::get('/beranda', [PublicController::class, 'home'])->name('home');
    Route::get('/tentang', [PublicController::class, 'tentang'])->name('tentang');
    Route::get('/lokasi', [PublicController::class, 'lokasi'])->name('lokasi');
    Route::get('/proyek', [PublicController::class, 'proyek'])->name('proyek');
    Route::get('/press', [PublicController::class, 'press'])->name('press');
    Route::get('/blog', [PublicController::class, 'blog'])->name('blog');
    Route::get('/videotron/{id}', [PublicController::class, 'detail'])->name('videotron.detail');
    
    // Pesanan User
    Route::get('/pesanan', [PesananController::class, 'index'])->name('masyarakat.pesanan.index');
    Route::post('/pesanan/store', [PesananController::class, 'store'])->name('masyarakat.pesanan.store');
});

require __DIR__.'/auth.php';
