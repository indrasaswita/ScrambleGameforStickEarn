<!doctype html>
<html>
<head>
	<title>@yield('title') | jakartabrosur.com</title>
	<meta name="csrf_token" content="{ csrf_token() }" />
	<meta name="title" content="@yield('title')">
	<meta name="description" content="@yield('description')">
	<meta name="keywords" content="@yield('keywords')">
	<meta name="robots" content="@yield('robots')">
	@include('includes.head')
</head>
<body ng-app="is-portfolio">

	<div ng-controller="Godhand" class="inner-body-wrapper">

	@if(Session::has('role'))
		<div ng-init="role('{{Session::get('role')}}','{{Session::get('userid')}}')" hidden></div>
		<!-- buat set role customer apa admin -->
	@endif
	
		@include('includes.header')

		<div id="content" class="content">
			@yield('content')
		</div>

	</div>
</body>
</html>