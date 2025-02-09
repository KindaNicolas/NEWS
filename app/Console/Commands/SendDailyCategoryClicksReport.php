<?php 
namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\CategoryVisit;
use App\Models\User;
use App\Mail\DailyCategoryClicksReport;
use Illuminate\Support\Facades\Mail;

class SendDailyCategoryClicksReport extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'report:daily-category-clicks';

    /**
     * The console command description.
     */
    protected $description = 'Send a daily email with the number of clicks per news category';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $users = User::all(); // ✅ Get all users

        foreach ($users as $user) {
            $categories = CategoryVisit::select('category')
                ->selectRaw('COUNT(*) as clicks')
                ->where('user_id', $user->id) // ✅ Only get clicks from this user
                ->groupBy('category')
                ->orderByDesc('clicks')
                ->get();
        
            if ($categories->isNotEmpty()) {
                Mail::to($user->email)->send(new DailyCategoryClicksReport($categories, $user->email));
            }
        }
        

        if ($categories->isEmpty()) {
            $this->info('No clicks recorded for today.');
            return;
        }

        $recipients = User::pluck('email');

        if ($recipients->isEmpty()) {
            $this->error('No users found to send the report.');
            return;
        }

        foreach ($recipients as $email) {
            Mail::to($email)->send(new DailyCategoryClicksReport($categories));
        }
        

        $this->info('Daily category clicks report email sent successfully to all users!');
    }
}
