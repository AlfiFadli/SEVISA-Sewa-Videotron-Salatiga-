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
        Schema::create('harga_sewas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('videotron_id')->constrained('videotrons')->onDelete('cascade');
            $table->enum('jenis_paket', ['Harian', 'Mingguan', 'Bulanan', 'Tahunan']);
            $table->decimal('harga', 12, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('harga_sewas');
    }
};
