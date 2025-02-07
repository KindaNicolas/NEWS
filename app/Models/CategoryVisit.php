<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;

class CategoryVisit extends Model
{
    use HasFactory;

    protected $table = 'visits'; // ✅ Ensure this matches your migration table name
    protected $fillable = ['category', 'user_ip', 'user_id']; // ✅ Add 'user_id'

    // Relationship: A visit belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
