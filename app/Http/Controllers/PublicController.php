<?php

namespace App\Http\Controllers;

use App\Models\Videotron;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    /**
     * Halaman Beranda (Home)
     */
    public function home()
    {
        // Ambil 3 videotron unggulan
        $featuredVideotrons = Videotron::with('hargaSewas')->take(3)->get();
        
        return view('home', compact('featuredVideotrons'));
    }

    /**
     * Halaman Katalog Videotron
     */
    public function katalog()
    {
        $videotrons = Videotron::with('hargaSewas')->paginate(6);
        
        return view('katalog', compact('videotrons'));
    }

    /**
     * Halaman Detail Videotron & Form Pesan
     */
    public function detail($id)
    {
        $videotron = Videotron::with('hargaSewas')->findOrFail($id);
        
        return view('detail', compact('videotron'));
    }
}
