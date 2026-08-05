<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use App\Models\Videotron;
use App\Models\HargaSewa;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Carbon\Carbon;

class PesananController extends Controller
{
    /**
     * Menampilkan riwayat pesanan milik user (Masyarakat)
     */
    public function index()
    {
        $user = auth()->user();

        // Validasi kelengkapan data diri
        if (!$user->nomor_telepon || !$user->alamat_lengkap || !$user->nik_npwp) {
            return redirect()->route('masyarakat.profil.edit')
                ->with('error', 'Gagal mengakses pesanan: Silakan lengkapi data diri (Nomor Telepon, Alamat, NIK/NPWP) Anda terlebih dahulu.');
        }

        $pesanans = Pesanan::with('videotron')
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return view('pesanan.index', compact('pesanans'));
    }

    /**
     * Menyimpan data pesanan baru dari masyarakat
     */
    public function store(Request $request)
    {
        $user = auth()->user();

        // Validasi kelengkapan data diri sebelum pemesanan
        if (!$user->nomor_telepon || !$user->alamat_lengkap || !$user->nik_npwp) {
            return redirect()->route('masyarakat.profil.edit')
                ->with('error', 'PEMESANAN GAGAL: Anda wajib melengkapi data diri (Nomor Telepon, Alamat, NIK/NPWP) terlebih dahulu sebelum dapat mengajukan sewa.');
        }

        $request->validate([
            'videotron_id' => 'required|exists:videotrons,id',
            'harga_sewa_id' => 'required|exists:harga_sewas,id',
            'tanggal_mulai' => 'required|date|after_or_equal:today',
        ]);

        $videotron = Videotron::findOrFail($request->videotron_id);
        $hargaSewa = HargaSewa::findOrFail($request->harga_sewa_id);

        $tanggalMulai = Carbon::parse($request->tanggal_mulai);
        
        switch ($hargaSewa->jenis_paket) {
            case 'Harian':
                $tanggalSelesai = $tanggalMulai->copy()->addDay();
                break;
            case 'Mingguan':
                $tanggalSelesai = $tanggalMulai->copy()->addWeek();
                break;
            case 'Bulanan':
                $tanggalSelesai = $tanggalMulai->copy()->addMonth();
                break;
            case 'Tahunan':
                $tanggalSelesai = $tanggalMulai->copy()->addYear();
                break;
            default:
                $tanggalSelesai = $tanggalMulai->copy()->addDay();
        }

        $kodePesanan = 'SVS-' . date('Ymd') . '-' . strtoupper(Str::random(4));

        Pesanan::create([
            'kode_pesanan' => $kodePesanan,
            'videotron_id' => $videotron->id,
            'user_id' => $user->id,
            'tanggal_mulai' => $tanggalMulai,
            'tanggal_selesai' => $tanggalSelesai,
            'total_biaya' => $hargaSewa->harga,
            'status_pesanan' => 'Menunggu Pembayaran',
        ]);

        return redirect()->route('masyarakat.pesanan.index')
            ->with('success', 'Pesanan penyewaan berhasil dibuat! Kode Pesanan Anda: ' . $kodePesanan);
    }
}
