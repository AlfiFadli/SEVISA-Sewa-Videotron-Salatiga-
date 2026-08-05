<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pesanan extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_pesanan',
        'videotron_id',
        'user_id',
        'tanggal_mulai',
        'tanggal_selesai',
        'total_biaya',
        'status_pesanan',
    ];

    /**
     * Relasi Pesanan ke Videotron (Belongs To)
     */
    public function videotron(): BelongsTo
    {
        return $this->belongsTo(Videotron::class, 'videotron_id');
    }

    /**
     * Relasi Pesanan ke User (Belongs To)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
