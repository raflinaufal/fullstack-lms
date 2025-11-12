<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;
use App\Models\QuestionOption;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $questions = [
            [
                'question_text' => 'Permukaan bumi yang menjulang tinggi ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'C. Gunung',
                'explanation' => 'Gunung merupakan permukaan bumi yang menjulang tinggi. Gunung memiliki ketinggian lebih dari 1.000 meter di atas permukaan laut.',
                'options' => [
                    ['A', 'A. Laut', false],
                    ['B', 'B. Selat', false],
                    ['C', 'C. Gunung', true],
                    ['D', 'D. Sungai', false],
                ],
            ],
            [
                'question_text' => 'Perhatikan kutipan teks berikut dan kerjakan soal nomor 2 sampai 4',
                'stimulus_text' => '(1) Ridwan Sururi adalah seorang pria paruh baya seolah tak pernah lelah mengedarkan buku yang dikoleksinya. (2) Tak kurang dari 100 judul buku miliknya ditawarkan pada masyarakat di sekitar Kabupaten Banyumas untuk dibaca secara cuma—cuma. (3) Agar warga bersimpatik, Sururi mengedarkan buku dengan cara unik. (4) Dia menawarkan buku kepada masyarakat, khususnya anak sekolah, dengan bantuan seekor kuda. (5) Dia menyebut kegiatan itu sebagai \'kuda pustaka\'. (6) "Sulitnya itu kalau musim hujan. Kalau di edarkan, buku takut jadi basah. Kudanya juga bisa masuk angin," kata Sururi menjelaskan.',
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'A. 1 & 3',
                'explanation' => 'Berdasarkan teks stimulus yang diberikan, jawaban yang tepat adalah opsi A (1 & 3).',
                'options' => [
                    ['A', 'A. 1 & 3', true],
                    ['B', 'B. 3 & 6', false],
                    ['C', 'C. 2 & 5', false],
                    ['D', 'D. 1 & 4', false],
                ],
            ],
            [
                'question_text' => 'Penggunaan kata yang menunjukkan alat dalam kutipan teks di atas terdapat pada kalimat nomor ....',
                'stimulus_text' => '(1) Ridwan Sururi adalah seorang pria paruh baya seolah tak pernah lelah mengedarkan buku yang dikoleksinya. (2) Tak kurang dari 100 judul buku miliknya ditawarkan pada masyarakat di sekitar Kabupaten Banyumas untuk dibaca secara cuma—cuma. (3) Agar warga bersimpatik, Sururi mengedarkan buku dengan cara unik. (4) Dia menawarkan buku kepada masyarakat, khususnya anak sekolah, dengan bantuan seekor kuda. (5) Dia menyebut kegiatan itu sebagai \'kuda pustaka\'. (6) "Sulitnya itu kalau musim hujan. Kalau di edarkan, buku takut jadi basah. Kudanya juga bisa masuk angin," kata Sururi menjelaskan.',
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'C. (4)',
                'explanation' => 'Kalimat (4) memuat frasa \'dengan bantuan seekor kuda\' yang menunjukkan alat (instrumental).',
                'options' => [
                    ['A', 'A. (2)', false],
                    ['B', 'B. (3)', false],
                    ['C', 'C. (4)', true],
                    ['D', 'D. (5)', false],
                ],
            ],
            [
                'question_text' => 'Makna ungkapan \'tidak pernah lelah\' pada teks terutama menunjukkan ....',
                'stimulus_text' => '(1) Ridwan Sururi adalah seorang pria paruh baya seolah tak pernah lelah mengedarkan buku yang dikoleksinya. (2) Tak kurang dari 100 judul buku miliknya ditawarkan pada masyarakat di sekitar Kabupaten Banyumas untuk dibaca secara cuma—cuma. (3) Agar warga bersimpatik, Sururi mengedarkan buku dengan cara unik. (4) Dia menawarkan buku kepada masyarakat, khususnya anak sekolah, dengan bantuan seekor kuda. (5) Dia menyebut kegiatan itu sebagai \'kuda pustaka\'. (6) "Sulitnya itu kalau musim hujan. Kalau di edarkan, buku takut jadi basah. Kudanya juga bisa masuk angin," kata Sururi menjelaskan.',
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'A. Ketekunan Sururi',
                'explanation' => 'Ungkapan tersebut menekankan kegigihan atau ketekunan Sururi dalam menjalankan perpustakaan keliling.',
                'options' => [
                    ['A', 'A. Ketekunan Sururi', true],
                    ['B', 'B. Kuda yang kuat', false],
                    ['C', 'C. Banyaknya jenis buku', false],
                    ['D', 'D. Cuaca yang mendukung', false],
                ],
            ],
            [
                'question_text' => 'Lembah adalah ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'B. Cekungan di antara pegunungan',
                'explanation' => 'Lembah adalah cekungan memanjang di antara dua pegunungan atau bukit yang biasanya dialiri sungai.',
                'options' => [
                    ['A', 'A. Dataran tinggi', false],
                    ['B', 'B. Cekungan di antara pegunungan', true],
                    ['C', 'C. Puncak gunung', false],
                    ['D', 'D. Tepi pantai', false],
                ],
            ],
            [
                'question_text' => 'Manfaat sungai bagi kehidupan manusia adalah ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'D. Semua benar',
                'explanation' => 'Sungai memiliki banyak manfaat bagi kehidupan manusia, termasuk sebagai sumber air bersih, sarana transportasi, dan sistem irigasi untuk pertanian.',
                'options' => [
                    ['A', 'A. Sumber air bersih', false],
                    ['B', 'B. Transportasi', false],
                    ['C', 'C. Irigasi pertanian', false],
                    ['D', 'D. Semua benar', true],
                ],
            ],
            [
                'question_text' => 'Pantai adalah ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'A. Pertemuan daratan dengan laut',
                'explanation' => 'Pantai adalah daerah pertemuan antara daratan dengan laut yang dipengaruhi oleh pasang surut air laut.',
                'options' => [
                    ['A', 'A. Pertemuan daratan dengan laut', true],
                    ['B', 'B. Tengah laut', false],
                    ['C', 'C. Dasar laut', false],
                    ['D', 'D. Atas laut', false],
                ],
            ],
            [
                'question_text' => 'Hutan memiliki fungsi sebagai ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'D. Semua benar',
                'explanation' => 'Hutan memiliki berbagai fungsi penting yaitu sebagai paru-paru dunia (penghasil oksigen), pencegah banjir dan erosi, serta habitat bagi berbagai satwa.',
                'options' => [
                    ['A', 'A. Paru-paru dunia', false],
                    ['B', 'B. Pencegah banjir', false],
                    ['C', 'C. Habitat satwa', false],
                    ['D', 'D. Semua benar', true],
                ],
            ],
            [
                'question_text' => 'Danau adalah ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'B. Cekungan berisi air tawar',
                'explanation' => 'Danau adalah cekungan besar di permukaan bumi yang berisi air tawar dan dikelilingi oleh daratan.',
                'options' => [
                    ['A', 'A. Air yang mengalir', false],
                    ['B', 'B. Cekungan berisi air tawar', true],
                    ['C', 'C. Air asin', false],
                    ['D', 'D. Air terjun', false],
                ],
            ],
            [
                'question_text' => 'Pegunungan terbentuk karena ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'A. Aktivitas tektonik',
                'explanation' => 'Pegunungan terbentuk akibat aktivitas tektonik, yaitu pergerakan dan tumbukan lempeng-lempeng bumi.',
                'options' => [
                    ['A', 'A. Aktivitas tektonik', true],
                    ['B', 'B. Erosi air', false],
                    ['C', 'C. Angin kencang', false],
                    ['D', 'D. Hujan lebat', false],
                ],
            ],
            [
                'question_text' => 'Dataran tinggi memiliki ketinggian ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'B. 200-1000 meter',
                'explanation' => 'Dataran tinggi adalah wilayah datar yang memiliki ketinggian antara 200-1000 meter di atas permukaan laut.',
                'options' => [
                    ['A', 'A. 0-200 meter', false],
                    ['B', 'B. 200-1000 meter', true],
                    ['C', 'C. Lebih dari 1000 meter', false],
                    ['D', 'D. Kurang dari 100 meter', false],
                ],
            ],
            [
                'question_text' => 'Tanjung adalah ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'A. Daratan yang menjorok ke laut',
                'explanation' => 'Tanjung adalah daratan yang menjorok atau memanjang ke arah laut atau danau.',
                'options' => [
                    ['A', 'A. Daratan yang menjorok ke laut', true],
                    ['B', 'B. Pulau kecil', false],
                    ['C', 'C. Selat sempit', false],
                    ['D', 'D. Teluk dalam', false],
                ],
            ],
            [
                'question_text' => 'Teluk adalah ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'B. Laut yang menjorok ke daratan',
                'explanation' => 'Teluk adalah bagian laut yang menjorok ke daratan dan biasanya berbentuk setengah lingkaran.',
                'options' => [
                    ['A', 'A. Daratan menjorok ke laut', false],
                    ['B', 'B. Laut yang menjorok ke daratan', true],
                    ['C', 'C. Pulau di tengah laut', false],
                    ['D', 'D. Selat antar pulau', false],
                ],
            ],
            [
                'question_text' => 'Manfaat hutan bagi manusia adalah ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'D. Semua benar',
                'explanation' => 'Hutan memberikan berbagai manfaat bagi manusia seperti sumber kayu, tempat wisata alam, dan berperan dalam pengaturan iklim.',
                'options' => [
                    ['A', 'A. Sumber kayu', false],
                    ['B', 'B. Wisata alam', false],
                    ['C', 'C. Pengatur iklim', false],
                    ['D', 'D. Semua benar', true],
                ],
            ],
            [
                'question_text' => 'Perhatikan gambar perairan berikut! Selat adalah ....',
                'stimulus_text' => null,
                'stimulus_image' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                'question_after_image' => null,
                'correct_answer' => 'A. Laut sempit di antara dua daratan',
                'explanation' => 'Selat adalah perairan laut yang sempit yang memisahkan dua daratan (pulau atau benua). Gambar menunjukkan jalur perairan sempit yang menghubungkan dua badan air besar.',
                'options' => [
                    ['A', 'A. Laut sempit di antara dua daratan', true],
                    ['B', 'B. Laut luas', false],
                    ['C', 'C. Danau besar', false],
                    ['D', 'D. Sungai panjang', false],
                ],
            ],
            [
                'question_text' => 'Gunung berapi aktif adalah gunung yang ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'B. Masih dapat meletus',
                'explanation' => 'Gunung berapi aktif adalah gunung berapi yang masih menunjukkan aktivitas vulkanik dan dapat meletus sewaktu-waktu.',
                'options' => [
                    ['A', 'A. Tidak pernah meletus', false],
                    ['B', 'B. Masih dapat meletus', true],
                    ['C', 'C. Sudah mati', false],
                    ['D', 'D. Sangat pendek', false],
                ],
            ],
            [
                'question_text' => 'Manfaat dataran rendah bagi pertanian adalah ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'D. Semua benar',
                'explanation' => 'Dataran rendah sangat cocok untuk pertanian karena memiliki tanah yang subur, mudah diairi, dan topografi yang datar.',
                'options' => [
                    ['A', 'A. Tanah subur', false],
                    ['B', 'B. Mudah diairi', false],
                    ['C', 'C. Tidak berbukit', false],
                    ['D', 'D. Semua benar', true],
                ],
            ],
            [
                'question_text' => 'Sungai mengalir dari ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'B. Tempat tinggi ke tempat rendah',
                'explanation' => 'Sungai mengalir dari tempat yang tinggi (seperti pegunungan) menuju tempat yang lebih rendah (seperti laut) karena pengaruh gravitasi.',
                'options' => [
                    ['A', 'A. Laut ke gunung', false],
                    ['B', 'B. Tempat tinggi ke tempat rendah', true],
                    ['C', 'C. Timur ke barat', false],
                    ['D', 'D. Utara ke selatan', false],
                ],
            ],
            [
                'question_text' => 'Pulau adalah ....',
                'stimulus_text' => null,
                'stimulus_image' => null,
                'question_after_image' => null,
                'correct_answer' => 'A. Daratan yang dikelilingi air',
                'explanation' => 'Pulau adalah daratan yang dikelilingi oleh air di semua sisinya dan lebih kecil dari benua.',
                'options' => [
                    ['A', 'A. Daratan yang dikelilingi air', true],
                    ['B', 'B. Air yang dikelilingi daratan', false],
                    ['C', 'C. Gunung tinggi', false],
                    ['D', 'D. Lembah dalam', false],
                ],
            ],
            [
                'question_text' => 'Perhatikan gambar dibawah ini',
                'stimulus_text' => null,
                'stimulus_image' => '/poto.png',
                'question_after_image' => 'Salah satu manfaat dari gunung bagi manusia adalah ....',
                'correct_answer' => 'B. Sarana rekreasi',
                'explanation' => 'Pada gambar di atas terdapat sekelompok orang yang sedang melakukan tur Gunung Merapi dengan menggunakan mobil jeep. Tur merupakan kegiatan rekreasi untuk menikmati keindahan dan mempelajari gunung.',
                'options' => [
                    ['A', 'A. Adanya bebatuan', false],
                    ['B', 'B. Sarana rekreasi', true],
                    ['C', 'C. Aktivitas vulkanik', false],
                    ['D', 'D. Erupsi lahar dingin', false],
                ],
            ],
        ];

        foreach ($questions as $questionData) {
            $question = Question::create([
                'exam_id' => 1,
                'question_text' => $questionData['question_text'],
                'stimulus_text' => $questionData['stimulus_text'],
                'stimulus_image' => $questionData['stimulus_image'],
                'question_after_image' => $questionData['question_after_image'],
                'correct_answer' => $questionData['correct_answer'],
                'explanation' => $questionData['explanation'],
            ]);

            foreach ($questionData['options'] as $option) {
                QuestionOption::create([
                    'question_id' => $question->id,
                    'option_label' => $option[0],
                    'option_text' => $option[1],
                    'is_correct' => $option[2],
                ]);
            }
        }
    }
}
