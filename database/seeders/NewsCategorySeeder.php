<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NewsCategory;

class NewsCategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            'أخبار',      // News
            'رياضة',      // Sports
            'ثقافة',      // Culture
            'اقتصاد',     // Economy
            'فيديو وصور'  // Videos & Images
        ];

        foreach ($categories as $category) {
            NewsCategory::updateOrCreate(['name' => $category]);
        }
    }
}
