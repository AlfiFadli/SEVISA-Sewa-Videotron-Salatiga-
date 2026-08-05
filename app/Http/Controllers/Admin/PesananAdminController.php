<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class PesananAdminController extends Controller
{
    /**
     * Tampilkan seluruh pesanan masuk dari masyarakat
     */
    public function index()
    {
        $pesanans = Pesanan::with(['user', 'videotron'])->latest()->get();
        return view('admin.pesanan.index', compact('pesanans'));
    }

    /**
     * Update status pesanan (Menunggu Pembayaran, Aktif Tayang, Selesai)
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status_pesanan' => 'required|in:Menunggu Pembayaran,Aktif Tayang,Selesai',
        ]);

        $pesanan = Pesanan::findOrFail($id);
        $pesanan->update([
            'status_pesanan' => $request->status_pesanan,
        ]);

        return redirect()->route('admin.pesanan.index')
            ->with('success', 'Status pesanan ' . $pesanan->kode_pesanan . ' berhasil diubah menjadi: ' . $request->status_pesanan);
    }
}
