<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HargaSewa extends Model
{
    use HasFactory;

    protected $table = 'harga_sewas';

    protected $fillable = [
        'videotron_id',
        'jenis_paket',
        'harga',
    ];

    /**
     * Relasi HargaSewa ke Videotron (Belongs To)
     */
    public function videotron(): BelongsTo
    {
        return $this->belongsTo(Videotron::class, 'videotron_id');
    }
}
