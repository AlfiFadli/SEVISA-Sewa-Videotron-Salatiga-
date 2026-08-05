<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Videotron extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_lokasi',
        'alamat_lengkap',
        'koordinat_maps',
        'ukuran_layar',
        'resolusi',
        'jam_tayang',
        'foto_lokasi',
    ];

    /**
     * Relasi Videotron ke HargaSewa (One-to-Many)
     */
    public function hargaSewas(): HasMany
    {
        return $this->hasMany(HargaSewa::class, 'videotron_id');
    }

    /**
     * Relasi Videotron ke Pesanan (One-to-Many)
     */
    public function pesanans(): HasMany
    {
        return $this->hasMany(Pesanan::class, 'videotron_id');
    }
}
