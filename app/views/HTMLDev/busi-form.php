<?php include('headerLogin.php');?> 
	<div class="container">
	
		<!-- LOGO Start -->
		<div class="fw-logo">
			<img src="img/logo.png" class="img-responsive" alt=""/>
		</div>
		<!-- LOGO End -->
		
		<!-- BUSINESS FORM Start -->
		<div class="form-wrapper">
			<div class="fw-head text-center">
				<span><img src="img/ico_finger.png" alt=""/></span>
				<em>Create Your ZippySpot Account</em>

			</div>
			
			<form action="firstDashboard.php"  method="post" id="busi-form" novalidate="novalidate">
				<div class="message warning-message" >
					<div class="col-md-1"><i><img src="img/ico/ico_warning.svg" alt=""/></i></div> <div class="col-md-2"><strong>Warning!</strong></div> <div class="col-md-9">This email is taken. Please select another.</div>
					<div class="clearfix"></div>
				</div>
				<div class="form-content">
					<div class="row">
						<div class="col-md-3"></div>
						<div class="col-md-9">
							<h3>Business Information</h3>
						</div>
					</div>
					<div>
						<div class="row">
							<label class="col-md-3">Name of Business</label>
							<div class="col-md-9">
								<input name="businessname" type="text">
							</div>
						</div>
					</div>
					<div>
						<div class="row">
							<label class="col-md-3">Address</label>
							<div class="col-md-9">
								<input name="address" type="text">
							</div>
							<div class="field-info">
								<div class="fi-content">
									<p>For your primary location.<br>Additional Locations can be added later.</p>
								</div>
							</div>
						</div>
						<div class="row">
							<label class="col-md-3"></label>
							<div class="col-md-9">
								<input type="text">
							</div>
						</div>
						<div class="row">
							<label class="col-md-3"></label>
							<div class="col-md-9">
								<div class="row">
									<div class="col-md-5 col-sm-4">
										<input type="text" placeholder="City">
									</div>
									<div class="col-md-7 col-sm-8">
										<div class="row">
											<div class="col-md-6 col-sm-6 mobileMarginBottom">
												<select class="fullWidth">
												  <option value="State">State</option>
												  <option value="Albana">Albana</option>
												  <option value="Texas">Texas</option>
												  <option value="Alaska">Alaska</option>
												  <option value="Newyork">Newyork</option>
												</select>
											</div>
											<div class="col-md-6 col-sm-6">
												<input type="text" placeholder="Zip Code">
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div class="row">
								<label class="col-md-3">Website</label>
								<div class="col-md-9">
									<input type="url" name="weburl" placeholder="http://">
								</div>
							</div>
						</div>
						<button type="submit">Created and Go</button>
					</div>
				</div>
			</form>
		</div>
		<!-- BUSINESS FORM Start -->
		
	</div>

<?php include('footer.php'); ?>