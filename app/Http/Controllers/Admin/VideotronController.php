<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Videotron;
use App\Models\HargaSewa;
use Illuminate\Http\Request;

class VideotronController extends Controller
{
    /**
     * Tampilkan daftar videotron
     */
    public function index()
    {
        $videotrons = Videotron::with('hargaSewas')->latest()->get();
        return view('admin.videotron.index', compact('videotrons'));
    }

    /**
     * Form tambah videotron baru
     */
    public function create()
    {
        return view('admin.videotron.create');
    }

    /**
     * Simpan videotron baru beserta harga paketnya
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama_lokasi' => 'required|string|max:255',
            'alamat_lengkap' => 'required|string',
            'koordinat_maps' => 'nullable|string',
            'ukuran_layar' => 'required|string',
            'resolusi' => 'required|string',
            'jam_tayang' => 'required|string',
            'foto_lokasi' => 'nullable|string',
            'harga_harian' => 'nullable|numeric|min:0',
            'harga_mingguan' => 'nullable|numeric|min:0',
            'harga_bulanan' => 'nullable|numeric|min:0',
            'harga_tahunan' => 'nullable|numeric|min:0',
        ]);

        $videotron = Videotron::create([
            'nama_lokasi' => $request->nama_lokasi,
            'alamat_lengkap' => $request->alamat_lengkap,
            'koordinat_maps' => $request->koordinat_maps,
            'ukuran_layar' => $request->ukuran_layar,
            'resolusi' => $request->resolusi,
            'jam_tayang' => $request->jam_tayang,
            'foto_lokasi' => $request->foto_lokasi,
        ]);

        // Tambah paket harga yang diisi
        $paketMap = [
            'Harian' => $request->harga_harian,
            'Mingguan' => $request->harga_mingguan,
            'Bulanan' => $request->harga_bulanan,
            'Tahunan' => $request->harga_tahunan,
        ];

        foreach ($paketMap as $jenis => $harga) {
            if ($harga !== null && $harga > 0) {
                HargaSewa::create([
                    'videotron_id' => $videotron->id,
                    'jenis_paket' => $jenis,
                    'harga' => $harga,
                ]);
            }
        }

        return redirect()->route('admin.videotron.index')
            ->with('success', 'Data Videotron & Harga Sewa berhasil ditambahkan.');
    }

    /**
     * Form edit videotron
     */
    public function edit($id)
    {
        $videotron = Videotron::with('hargaSewas')->findOrFail($id);
        
        $hargaHarian = $videotron->hargaSewas->where('jenis_paket', 'Harian')->first()?->harga;
        $hargaMingguan = $videotron->hargaSewas->where('jenis_paket', 'Mingguan')->first()?->harga;
        $hargaBulanan = $videotron->hargaSewas->where('jenis_paket', 'Bulanan')->first()?->harga;
        $hargaTahunan = $videotron->hargaSewas->where('jenis_paket', 'Tahunan')->first()?->harga;

        return view('admin.videotron.edit', compact(
            'videotron',
            'hargaHarian',
            'hargaMingguan',
            'hargaBulanan',
            'hargaTahunan'
        ));
    }

    /**
     * Update data videotron
     */
    public function update(Request $request, $id)
    {
        $videotron = Videotron::findOrFail($id);

        $request->validate([
            'nama_lokasi' => 'required|string|max:255',
            'alamat_lengkap' => 'required|string',
            'koordinat_maps' => 'nullable|string',
            'ukuran_layar' => 'required|string',
            'resolusi' => 'required|string',
            'jam_tayang' => 'required|string',
            'foto_lokasi' => 'nullable|string',
            'harga_harian' => 'nullable|numeric|min:0',
            'harga_mingguan' => 'nullable|numeric|min:0',
            'harga_bulanan' => 'nullable|numeric|min:0',
            'harga_tahunan' => 'nullable|numeric|min:0',
        ]);

        $videotron->update([
            'nama_lokasi' => $request->nama_lokasi,
            'alamat_lengkap' => $request->alamat_lengkap,
            'koordinat_maps' => $request->koordinat_maps,
            'ukuran_layar' => $request->ukuran_layar,
            'resolusi' => $request->resolusi,
            'jam_tayang' => $request->jam_tayang,
            'foto_lokasi' => $request->foto_lokasi,
        ]);

        // Sync Paket Harga
        $paketMap = [
            'Harian' => $request->harga_harian,
            'Mingguan' => $request->harga_mingguan,
            'Bulanan' => $request->harga_bulanan,
            'Tahunan' => $request->harga_tahunan,
        ];

        foreach ($paketMap as $jenis => $harga) {
            if ($harga !== null && $harga > 0) {
                HargaSewa::updateOrCreate(
                    ['videotron_id' => $videotron->id, 'jenis_paket' => $jenis],
                    ['harga' => $harga]
                );
            } else {
                HargaSewa::where('videotron_id', $videotron->id)
                    ->where('jenis_paket', $jenis)
                    ->delete();
            }
        }

        return redirect()->route('admin.videotron.index')
            ->with('success', 'Data Videotron & Harga Sewa berhasil diperbarui.');
    }

    /**
     * Hapus videotron
     */
    public function destroy($id)
    {
        $videotron = Videotron::findOrFail($id);
        $videotron->delete();

        return redirect()->route('admin.videotron.index')
            ->with('success', 'Data Videotron berhasil dihapus.');
    }
}
