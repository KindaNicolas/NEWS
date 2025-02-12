<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CategoryVisit;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class VisitController extends Controller
{
   

    public function storeVisit(Request $request)
    {
        $request->validate([
            'category' => 'required|string|in:أخبار,رياضة,ثقافة,اقتصاد,فيديو وصور'
        ]);

        $user = auth()->user(); // ✅ Get the authenticated user

        CategoryVisit::create([
            'category' => $request->category,
            'user_ip' => $request->ip(),
            'user_id' => $user ? $user->id : null, // ✅ Store user_id if logged in
        ]);

        return response()->json(['message' => 'Visit recorded successfully']);
    }

    public function getAggregates(Request $request)
    {
        $period = $request->query('period', 'week');
        $user = auth()->user(); // ✅ Get the logged-in user

        $startDate = match ($period) {
            '24_hours' => now()->subHours(24),
            'week' => now()->subWeek(),
            'month' => now()->subMonth(),
            'year' => now()->subYear(),
        };

        // Query visits by user
        $query = CategoryVisit::select('category', DB::raw('COUNT(*) as total_clicks'), DB::raw('COUNT(DISTINCT user_ip) as unique_clicks'))
            ->where('created_at', '>=', $startDate)
            ->groupBy('category');

        if ($user) {
            $query->where('user_id', $user->id); // ✅ Show only visits for the logged-in user
        }

        return response()->json($query->get());
    }

}
