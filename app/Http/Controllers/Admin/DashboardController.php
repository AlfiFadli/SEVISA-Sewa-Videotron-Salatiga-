<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Videotron;
use App\Models\Pesanan;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $totalVideotron = Videotron::count();
        $totalPesanan = Pesanan::count();
        $pesananMenunggu = Pesanan::where('status_pesanan', 'Menunggu Pembayaran')->count();
        $pesananAktif = Pesanan::where('status_pesanan', 'Aktif Tayang')->count();
        $pesananSelesai = Pesanan::where('status_pesanan', 'Selesai')->count();
        
        $pesananTerbaru = Pesanan::with(['user', 'videotron'])
            ->latest()
            ->take(5)
            ->get();

        return view('admin.dashboard', compact(
            'totalVideotron',
            'totalPesanan',
            'pesananMenunggu',
            'pesananAktif',
            'pesananSelesai',
            'pesananTerbaru'
        ));
    }
}
