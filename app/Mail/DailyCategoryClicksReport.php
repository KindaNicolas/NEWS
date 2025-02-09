<?php 
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;
use App\Models\User;

class DailyCategoryClicksReport extends Mailable
{
    use Queueable, SerializesModels;

    public $categories;

    /**
     * Create a new message instance.
     */
    public function __construct(Collection $categories, $email)
    {
        $this->categories = $categories;
        $this->email = $email;
    }
    

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->from(env('MAIL_FROM_ADDRESS'))
            ->to($this->email) 
            ->subject('Daily Category Clicks Report')
            ->view('emails.daily_category_clicks')
            ->with(['categories' => $this->categories]);

    }

}
