<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('id_category');
            $table->integer('id_brand');
            $table->string('id_user');
            $table->string('name');
            $table->string('image');
            $table->string('web_id');
            $table->integer('price');
            $table->string('condition');
            $table->string('detail');
            $table->string('company_profile');
            $table->boolean('active')->default('0');
            $table->boolean('status')->default('0')->comment = '1:sale 0:new';
            $table->integer('sale')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product');
    }
}
