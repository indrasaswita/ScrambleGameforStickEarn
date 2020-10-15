<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
	use Notifiable;

	protected $fillable = ['church_id', 'email', 'password', 'fullname', 'phone', 'isverifemail', 'isverifphone', 'document_id', 'verifcode', 'credentialtoken', 'maritalstatus_id', 'birthplace', 'address','regency_id', 'addresscity', 'homenumber', 'birthdate', 'gender', 'job_id', 'companyname', 'education_id', 'educationlevel_id', 'baptismdate', 'baptismcity', 'baptismchurch', 'emailverif_at', 'phoneverif_at', 'created_at', 'updated_at', 'deleted_at'];
	protected $guarded = ['id'];
	protected $hidden = ['email', 'password', 'emailverif_at', 'phoneverif_at', 'phone', 'address', 'addresscity', 'homenumber', 'gender', 'job_id', 'companyname', 'education_id', 'educationlevel_id', 'baptismchurch', 'baptismdate', 'baptismcity', 'created_at', 'updated_at', 'deleted_at'];
	protected $dates = ['emailverif_at', 'phoneverif_at', 'created_at', 'updated_at', 'deleted_at', 'baptismdate', 'birthdate', ''];
	protected $casts = [
		'isverifemail' => 'boolean',
		'isverifphone' => 'boolean'
	];
}
