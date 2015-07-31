<?php 
$title = "";
$menuActive = "dash";
include('header.php'); ?>
	
	<!-- PAGE HEADER Start -->
	<div class="page-head bg-color5">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<h4>Your Account</h4>
				</div>
			</div>
		</div>
	</div>
	<!-- PAGE HEADER End -->
	
	<!-- PROFILE FORM Start -->
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<form class="notify-form profile-form" id="profile-form">
					<div class="row">
						<label class="col-md-3"></label>
						<div class="col-md-9">
							<h3>Edit Your Account</h3>
						</div>
					</div>
					<div class="chg-email">
						<div class="row">
							<label class="col-md-3">Email Address</label>
							<div class="col-md-9">
								<input type="email" name="emailaddress">
								<p>*Note: If you change your email address, you will need to re-confirm it.</p>
							</div>
						</div>
					</div>
					<div class="chg-password">
						<div class="row">
							<label class="col-md-3"></label>
							<div class="col-md-9">
								<p>If you would like to change your password, fill in the following.<br>Otherwise, leave it blank.</p>
							</div>
						</div>
						<div class="row">
							<label class="col-md-3">Change</label>
							<div class="col-md-9">
								<input type="password" name="newpassword">
							</div>
						</div>
						<div class="row">
							<label class="col-md-3">New Password</label>
							<div class="col-md-9">
								<input type="password" name="password">
							</div>
						</div>
						<div class="row">
							<label class="col-md-3 lead">Confirm New<br>Password</label>
							<div class="col-md-9">
								<input type="password" name="cpassword">
							</div>
						</div>
					</div>
					<button type="submit">Save Changes</button>
				</form>
			</div>
		</div>
	</div>
	<!-- PROFILE FORM End -->
	
<?php include('footer.php');?>