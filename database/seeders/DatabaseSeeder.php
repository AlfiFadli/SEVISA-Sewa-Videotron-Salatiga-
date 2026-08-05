<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Videotron;
use App\Models\HargaSewa;
use App\Models\Pesanan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed Admin User
        $admin = User::create([
            'name' => 'Administrator SEVISA',
            'email' => 'admin@sevisa.salatiga.go.id',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // 2. Seed User Masyarakat
        $userMasyarakat = User::create([
            'name' => 'Budi Santoso',
            'email' => 'budi@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'masyarakat',
        ]);

        // 3. Seed Videotrons di Salatiga
        $v1 = Videotron::create([
            'nama_lokasi' => 'Videotron Utama Tugu Pancasila Salatiga',
            'alamat_lengkap' => 'Jl. Pemuda No. 1, Sidorejo, Kota Salatiga, Jawa Tengah 50711',
            'koordinat_maps' => '-7.3305, 110.5084',
            'ukuran_layar' => '8 x 4 Meter (P10 Outdoor LED)',
            'resolusi' => '1920 x 1080 Full HD (Ultra High Brightness 7500 nits)',
            'jam_tayang' => '06:00 - 23:00 WIB (17 Jam Kontinu / 300 Loop per Hari)',
            'foto_lokasi' => null,
        ]);

        HargaSewa::create(['videotron_id' => $v1->id, 'jenis_paket' => 'Harian', 'harga' => 1500000.00]);
        HargaSewa::create(['videotron_id' => $v1->id, 'jenis_paket' => 'Mingguan', 'harga' => 8500000.00]);
        HargaSewa::create(['videotron_id' => $v1->id, 'jenis_paket' => 'Bulanan', 'harga' => 30000000.00]);
        HargaSewa::create(['videotron_id' => $v1->id, 'jenis_paket' => 'Tahunan', 'harga' => 320000000.00]);

        $v2 = Videotron::create([
            'nama_lokasi' => 'Videotron Simpang Empat Pasar Raya Salatiga',
            'alamat_lokasi' => 'Jl. Jend. Sudirman No. 45, Tingkir, Kota Salatiga, Jawa Tengah 50714',
            'alamat_lengkap' => 'Jl. Jend. Sudirman No. 45, Tingkir, Kota Salatiga, Jawa Tengah 50714',
            'koordinat_maps' => '-7.3312, 110.5042',
            'ukuran_layar' => '6 x 3 Meter (P8 High Refresh Outdoor)',
            'resolusi' => '1536 x 768 HD Premium',
            'jam_tayang' => '06:00 - 22:00 WIB (16 Jam Kontinu / 250 Loop per Hari)',
            'foto_lokasi' => null,
        ]);

        HargaSewa::create(['videotron_id' => $v2->id, 'jenis_paket' => 'Harian', 'harga' => 1200000.00]);
        HargaSewa::create(['videotron_id' => $v2->id, 'jenis_paket' => 'Mingguan', 'harga' => 7000000.00]);
        HargaSewa::create(['videotron_id' => $v2->id, 'jenis_paket' => 'Bulanan', 'harga' => 24000000.00]);
        HargaSewa::create(['videotron_id' => $v2->id, 'jenis_paket' => 'Tahunan', 'harga' => 250000000.00]);

        $v3 = Videotron::create([
            'nama_lokasi' => 'Videotron Bundaran Kalibening Salatiga',
            'alamat_lengkap' => 'Jl. Raya Salatiga - Solo Km. 2, Sidomukti, Kota Salatiga, Jawa Tengah 50724',
            'koordinat_maps' => '-7.3450, 110.5150',
            'ukuran_layar' => '10 x 5 Meter (P10 Double Sided LED)',
            'resolusi' => '1920 x 1080 Full HD',
            'jam_tayang' => '05:30 - 23:30 WIB (18 Jam Kontinu / 350 Loop per Hari)',
            'foto_lokasi' => null,
        ]);

        HargaSewa::create(['videotron_id' => $v3->id, 'jenis_paket' => 'Harian', 'harga' => 2000000.00]);
        HargaSewa::create(['videotron_id' => $v3->id, 'jenis_paket' => 'Mingguan', 'harga' => 11000000.00]);
        HargaSewa::create(['videotron_id' => $v3->id, 'jenis_paket' => 'Bulanan', 'harga' => 38000000.00]);
        HargaSewa::create(['videotron_id' => $v3->id, 'jenis_paket' => 'Tahunan', 'harga' => 400000000.00]);

        // 4. Seed Sample Pesanan
        Pesanan::create([
            'kode_pesanan' => 'SVS-20260805-A101',
            'videotron_id' => $v1->id,
            'user_id' => $userMasyarakat->id,
            'tanggal_mulai' => '2026-08-10',
            'tanggal_selesai' => '2026-08-17',
            'total_biaya' => 8500000.00,
            'status_pesanan' => 'Aktif Tayang',
        ]);
    }
}
