<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\VideotronController;
use App\Http\Controllers\Admin\PesananAdminController;

/*
|--------------------------------------------------------------------------
| Web Routes SEVISA (Sewa Videotron Salatiga)
|--------------------------------------------------------------------------
*/

// A. Pengunjung Tamu Wajib Login / Register Sebelum Masuk Beranda
Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('home');
    }
    return redirect()->route('login');
});

// B. Area Beranda & Katalog (Hanya Bisa Diakses Setelah Autentikasi Login/Daftar)
Route::middleware(['auth'])->group(function () {
    Route::get('/beranda', [PublicController::class, 'home'])->name('home');
    Route::get('/katalog', [PublicController::class, 'katalog'])->name('katalog');
    Route::get('/videotron/{id}', [PublicController::class, 'detail'])->name('videotron.detail');
});

// C. Rute Khusus Masyarakat (Auth + Role Masyarakat)
Route::middleware(['auth', 'role:masyarakat'])->prefix('masyarakat')->name('masyarakat.')->group(function () {
    Route::get('/pesanan', [PesananController::class, 'index'])->name('pesanan.index');
    Route::post('/pesanan/store', [PesananController::class, 'store'])->name('pesanan.store');
});

// D. Rute Khusus Admin (Tertutup - Auth + Role Admin)
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('videotron', VideotronController::class);
    Route::get('/pesanan', [PesananAdminController::class, 'index'])->name('pesanan.index');
    Route::patch('/pesanan/{id}/status', [PesananAdminController::class, 'updateStatus'])->name('pesanan.update-status');
});

require __DIR__.'/auth.php';
