<?php 
$title = "";
$menuActive = "greetings";
include('header.php'); ?>
	
	<!-- PAGE HEADER Start -->
	<div class="page-head">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<h4>Greetings</h4>
				</div>
			</div>
		</div>
	</div>
	<!-- PAGE HEADER End -->
	
	<!-- NOTIFY/GREETINGS FORM Start -->
	<div class="container">
		<div class="row content-head">
			<div class="col-md-12 col-sm-12">
				<h4>CREATE NEW GREETING</h4>
			</div>
			
		</div>
		<div class="row">
			<div class="col-md-12">
				<form class="notify-form" action="index.php" method="get">
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
								<div class="cbox"><input type="checkbox"><label>Attach a Campaign?</label></div>
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
					<div class="assign-message">
						<div class="row">
							<label class="col-md-3">Assign to location</label>
							<div class="col-md-9">
								<select class="" >
						          <option value="day">day</option>
						          <option value="week">week</option>
						          <option value="month">month</option>
						        </select>
							</div>
						</div>
					</div>
					<button type="submit">Save Changes</button>
				</form>
			</div>
		</div>
	</div>
	<!-- NOTIFY/GREETINGS FORM End -->

<?php include('footer.php');?>
