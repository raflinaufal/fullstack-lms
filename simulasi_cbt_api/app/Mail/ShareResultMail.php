<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ShareResultMail extends Mailable
{
    use Queueable, SerializesModels;

    public $resultData;
    public $schoolName;
    public $grade;

    /**
     * Create a new message instance.
     */
    public function __construct($resultData, $schoolName, $grade)
    {
        $this->resultData = $resultData;
        $this->schoolName = $schoolName;
        $this->grade = $grade;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Hasil Ujian CBT - ' . $this->resultData['user_name'],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.share-result',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
