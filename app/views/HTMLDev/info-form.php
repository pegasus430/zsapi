<?php include('headerLogin.php'); ?>
	<div class="container">
	
		<!-- LOGO Start -->
		<div class="fw-logo">
			<img src="img/logo.png" class="img-responsive" alt=""/>
		</div>
		<!-- LOGO End -->
		
		<!-- INFO FORM Start -->
		<div class="form-wrapper">
			<div class="fw-head text-center">
				<span><img src="img/ico_finger.png" alt=""/></span>
				<em>Create Your ZippySpot Account</em>
			</div>

			<form action="" method="post" id="info-form" novalidate="novalidate">
				<div class="form-content">
					<div class="message warning-message">
						<div class="col-md-1"><i><img src="img/ico/ico_warning.svg" alt=""/></i></div> <div class="col-md-2"><strong>Warning!</strong></div> <div class="col-md-9">This email is taken. Please select another.</div>
						<div class="clearfix"></div>
					</div>

					<div class="row">
						<div class="col-md-3"></div>
						<div class="col-md-9">
							<h3>Your Information</h3>
						</div>
					</div>
					<div>
						<div class="row">
							<label class="col-md-3">Your Name</label>
							<div class="col-md-9">
								<div class="row">
									<div class="col-md-6">
										<input type="text" name="firstname" placeholder="First" required>
									</div>
									<div class="col-md-6">
										<input type="text" name="lastname" placeholder="Last" required>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div class="row">
							<label class="col-md-3">Email Address</label>
							<div class="col-md-9">
								<input type="email" name="emailaddress" class="input-email" required>
							</div>
						</div>
					</div>
					<div>
						<div class="row">
							<label class="col-md-3">Password</label>
							<div class="col-md-9">
								<input type="password" name="password" required>
							</div>
						</div>
					</div>
					<div>
						<div class="row">
							<label class="col-md-3">Confirm Password</label>
							<div class="col-md-9">
								<input type="password" name="cpassword" required>
							</div>
						</div>
					</div>
					<button type="submit">Proceed to Email Verification ></button>
				</div>
			</form>
		</div>
		<!-- INFO FORM End -->
		
	</div>


<?php include('footer.php');?>