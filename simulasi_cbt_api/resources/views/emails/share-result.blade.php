<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hasil Ujian CBT</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }

        .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            border-bottom: 3px solid #FF6B35;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }

        .header h1 {
            color: #FF6B35;
            margin: 0;
            font-size: 24px;
        }

        .info-row {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #e0e0e0;
        }

        .info-label {
            font-weight: bold;
            width: 150px;
            color: #555;
        }

        .info-value {
            flex: 1;
            color: #333;
        }

        .score-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 30px;
            border-radius: 10px;
            margin: 25px 0;
        }

        .score-box .label {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 10px;
        }

        .score-box .score {
            font-size: 48px;
            font-weight: bold;
            margin: 10px 0;
        }

        .status-badge {
            display: inline-block;
            padding: 8px 20px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 14px;
            margin-top: 10px;
        }

        .status-pass {
            background-color: #4CAF50;
            color: white;
        }

        .status-fail {
            background-color: #f44336;
            color: white;
        }

        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            color: #777;
            font-size: 12px;
        }

        .detail-section {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .detail-section h3 {
            color: #FF6B35;
            margin-top: 0;
            font-size: 18px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>📊 Hasil Ujian CBT</h1>
            <p style="margin: 10px 0 0 0; color: #666;">Computer Based Test Result</p>
        </div>

        <div class="detail-section">
            <h3>Informasi Siswa</h3>
            <div class="info-row">
                <div class="info-label">Nama Siswa:</div>
                <div class="info-value">{{ $resultData['user_name'] }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Nama Sekolah:</div>
                <div class="info-value">{{ $schoolName }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Kelas:</div>
                <div class="info-value">{{ $grade }}</div>
            </div>
        </div>

        <div class="detail-section">
            <h3>Detail Ujian</h3>
            <div class="info-row">
                <div class="info-label">Mata Pelajaran:</div>
                <div class="info-value">{{ $resultData['exam_title'] }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Jumlah Soal:</div>
                <div class="info-value">{{ $resultData['total_questions'] }} soal</div>
            </div>
            <div class="info-row">
                <div class="info-label">Jawaban Benar:</div>
                <div class="info-value">{{ $resultData['correct_answers'] }} soal</div>
            </div>
            <div class="info-row">
                <div class="info-label">Passing Score:</div>
                <div class="info-value">{{ $resultData['passing_score'] }}</div>
            </div>
        </div>

        <div class="score-box">
            <div class="label">NILAI AKHIR</div>
            <div class="score">{{ number_format($resultData['score'], 2) }}</div>
            <div class="status-badge {{ $resultData['status'] == 'Lulus' ? 'status-pass' : 'status-fail' }}">
                {{ $resultData['status'] }}
            </div>
        </div>

        <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #2196F3;">
            <strong>💬 Feedback:</strong>
            <p style="margin: 10px 0 0 0;">{{ $resultData['feedback'] }}</p>
        </div>

        <div class="footer">
            <p>Email ini dikirim secara otomatis dari Sistem CBT</p>
            <p>Tanggal: {{ now()->format('d F Y, H:i') }} WIB</p>
            <p style="margin-top: 15px;">
                <small>© {{ date('Y') }} Simulasi CBT. All rights reserved.</small>
            </p>
        </div>
    </div>
</body>

</html>