<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('videotrons', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lokasi');
            $table->text('alamat_lengkap');
            $table->string('koordinat_maps')->nullable();
            $table->string('ukuran_layar');
            $table->string('resolusi');
            $table->string('jam_tayang');
            $table->string('foto_lokasi')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videotrons');
    }
};
