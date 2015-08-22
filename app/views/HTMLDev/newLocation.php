
	
	<!-- NOTIFY/GREETINGS FORM Start -->
<form class="location-form form">
	<div class="container">
		<div class="row content-head">
			<div class="col-md-12 col-sm-12">
				<h4>CREATE/EDIT A LOCATION</h4>
			</div>
			
		</div>
		<div class="row">
			<div class="col-md-12">
				
				
				<div class="row">
					<label class="col-md-3">LOCATION TITLE</label>
					<div class="col-md-9">
						<input type="text" placeholder="ie: 1st St. Market">
					</div>
				</div>
				<div class="separator"></div>
				<div class="row">
					<label class="col-md-3">LOCATION ADDRESS</label>
					<div class="col-md-9">
						<input type="text" placeholder="101 1 St Street W">
					</div>
				</div>
				<div class="row">
					<label class="col-md-3  hidden-xs"></label>
					<div class="col-md-9">
						<input type="text" placeholder="">
					</div>
				</div>
				<div class="row">
					<label class="col-md-3  hidden-xs"></label>
					<div class="col-md-9">
						<div class="row">
							<div class="col-md-5 col-sm-4">
								<input type="text" placeholder="City">
							</div>
							<div class="col-md-7 col-sm-8">
								<div class="row">
									<div class="col-md-6 col-sm-6 mobileMarginBottom">
										<select class="fullWidth state" >
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
				
			</div>
		</div>
	</div>
	<div class="dark-wrap">
		<div class="container">
	
	    	<div class="row content-head selectGreeting">
				<div class="col-md-12 col-sm-12">
					<h4>GREETINGS</h4>
				</div>
				
			</div>
	    	<div class="row">
	    		<label class="col-md-3">SELECT A GREETING</label>
				<div class="col-md-3">
					<select class="fullWidth" id="greetingSelector" >
			          <option value="default">Default Greeting</option>
			          <option value="new">+ Create New…</option>
			        </select>
					
				</div>
			</div>
			<div class="customGreeting">
				<div class="welcome-message">
						<div class="row">
							<label class="col-md-3">Welcome Message</label>
							<div class="col-md-9">
								<input type="text" placeholder="Drank coffee today?">
								<span>Check-in Reward Points</span> <input class="points-input" type="text" name="points-input" placeholder="ie:500"> <span>per</span>
								<select class="" >
						          <option value="day">day</option>
						          <option value="week">week</option>
						          <option value="month">month</option>
						        </select>
							</div>
							<div class="field-info">
								<div class="fi-content">
									<p>For your primary location.<br>Additional Locations can be added later.</p>
								</div>
							</div>
						</div>
					</div>
					<div class="exit-message">
						<div class="row">
							<label class="col-md-3">Exit Message</label>
							<div class="col-md-9">
								<input type="text" placeholder="Have a great day!">
								<div class="cbox"><input type="checkbox" checked="checked" ><label>Attach a Campaign?</label></div>
								<select class="extraSpace" >
						          <option value="day">day</option>
						          <option value="week">week</option>
						          <option value="month">month</option>
						        </select>
								<span>Within</span>
								<div class="withAdvice">
									<input type="text" class="input-days" placeholder="3">
								
									<select class="" >
							          <option value="day">day</option>
							          <option value="week">week</option>
							          <option value="month">month</option>
							        </select>
									<p class="textAdvice">(enter 0 for no restriction)</p>
								</div>
							</div>
							<div class="field-info">
								<div class="fi-content">
									<p>For your primary location.<br>Additional Locations can be added later.</p>
								</div>
							</div>
						</div>
					</div>
				
			</div>
	    	
		</div>
	</div>
	<div class="container">
		<div class="row content-head">
			<div class="col-md-12 col-sm-12">
				<h4>PAYMENT INFORMATION</h4>
			</div>
		</div>
		<div class="row">
			<label class="col-md-3">NAME ON CARD</label>
			<div class="col-md-9">
				<input type="text" placeholder="">
			</div>
		</div>
		<div class="row">
			<label class="col-md-3">CARD NUMBER</label>
			<div class="col-md-9">
				<input type="text" placeholder="">
			</div>
		</div>
		<div class="row">
			<label class="col-md-3">EXP</label>
			<div class="col-md-9">
				<div class="row">
					<div class="col-md-4">
						<input type="text" placeholder="">
					</div>
					<label class="col-md-4">SECURITY CODE</label>
					<div class="col-md-4">
						<input type="text" placeholder="">
					</div>
				</div>
			</div>
		</div>
		<div class="row terms">
			<div class="col-md-offset-3 col-md-6">
				<div class="cbox"><input type="checkbox" checked="checked" ><label>I agree to the ZippySpot Terms and Conditions</label></div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12 payment">
				<span class="paymentText">TOTAL PAYMENT:</span>
				<span class="paymentAmount">$10000</span>
			</div>
		</div>
		<div class="row">
			<div class="col-md-offset-9 col-md-3">
				<button type="submit">PLACE ORDER</button>
			</div>
		</div>
	</div>
	</form>

	<!-- NOTIFY/GREETINGS FORM End -->

	<!-- CROP IMG POPUP! -->
		<div id="crop-image-popup" class="white-popup mfp-hide">
			<span class="title">Crop Image</span>
		  	
		  	<div class="container">
			  <img  src="photo.jpg">
			</div>

			<button class="crop-btn">Crop</button>
		</div>
		<!-- CROP IMG POPUP end -->
<?php include('footer.php');?>
