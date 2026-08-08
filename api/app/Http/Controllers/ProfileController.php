<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use OpenApi\Annotations as OA;

class ProfileController extends Controller
{
    /**
     * Get authenticated user profile.
     *
     * @OA\Get(
     *     path="/profile",
     *     summary="User profile", operationId="getProfile",
     *     tags={"Auth"},
     *     security={{"sanctum": []}},
     *     @OA\Response(response=200, description="Profile data", @OA\Content(
     *          mediaType="application/json",
     *          @OA\Schema(ref="#/components/schemas/User")
     *     )),
     *     @OA\Response(response=401, description="Unauthorized")
     * )
     */
    public function show()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        return response()->json($user);
    }
}