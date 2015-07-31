<?php 
$title = "";
$menuActive = "dash";
include('header.php'); ?>


	<!-- PAGE HEADER Start -->
	<div class="page-head bg-color3">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<h4>Locations</h4>
				</div>
			</div>
		</div>
	</div>
	<!-- PAGE HEADER End -->

	<div class="container locationAdded">
		<div class="row">
			<div class="col-md-12 thumbUp">
				<img src="img/UUIDLocation.png">
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<h2>Confirm your location by UUID</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<p>Please enter the UUID code found on your new iBeacon device.</p>
			</div>
		</div>
		<form class="form">
			<div class="row">
				<div class="col-md-8 col-md-offset-2">
					<input type="text" name="UUID" placeholder="UUID #">
				</div>
			</div>
			<div class="row">
				<div class="col-md-8 col-md-offset-2">
					<button type="submmit">CONFIRM & CREATE NEW LOCATION</button>
				</div>
			</div>
		</form>
		<div class="row">
			<div class="col-md-12">
				<a href="#" class="bottomLink" >What is a UUID code?</a>
				<a href="#" class="bottomLink" >I haven’t recieved my iBeacon</a>
			</div>

		</div>
	</div>

<?php include('footer.php');?>
