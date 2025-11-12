<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ClassModel;

class ClassSeeder extends Seeder
{
    public function run(): void
    {
        ClassModel::create([
            'title' => 'ESPS IPS 4 SD KELAS IV',
            'subtitle' => 'Kenampakan Alam dan Pemanfaatannya',
            'subject' => 'IPS',
            'grade' => '4 SD',
            'description' => 'Simulasi Computer Based Test (CBT) untuk mata pelajaran Ilmu Pengetahuan Sosial kelas 4 Sekolah Dasar',
        ]);
    }
}
