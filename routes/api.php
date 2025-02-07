<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VisitController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application.
| These routes are loaded by the RouteServiceProvider within a group
| assigned to the "api" middleware group.
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
/*
Route::post('/visit/{categoryId}', [VisitController::class, 'storeVisit']);
Route::get('/aggregates/{timeFrame}', [VisitController::class, 'getAggregates']);
*/



/*
Route::post('visit', [VisitController::class, 'storeVisit']);
Route::get('aggregates', [VisitController::class, 'getAggregates']);
*/



Route::middleware(['auth:api'])->group(function () {
    Route::post('visit', [VisitController::class, 'storeVisit']);
    Route::get('aggregates', [VisitController::class, 'getAggregates']);
});
