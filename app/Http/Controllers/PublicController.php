<?php

namespace App\Http\Controllers;

use App\Models\Videotron;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function home()
    {
        $videotrons = Videotron::with('hargaSewa')->take(3)->get();
        return view('home', compact('videotrons'));
    }

    public function tentang()
    {
        return view('tentang');
    }

    public function lokasi()
    {
        $videotrons = Videotron::with('hargaSewa')->get();
        return view('katalog', compact('videotrons'));
    }

    public function proyek()
    {
        return view('proyek');
    }

    public function press()
    {
        return view('press');
    }

    public function blog()
    {
        return view('blog');
    }

    public function detail($id)
    {
        $videotron = Videotron::with('hargaSewa')->findOrFail($id);
        return view('detail', compact('videotron'));
    }
}
