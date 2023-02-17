<?php

use Illuminate\Database\Seeder;

class Country extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=1; $i <= 5 ; $i++) { 
            DB::table('country')->insert([
                'id' => $i,
                'name' => str_random(10)
            ]);
        }
    }
}
