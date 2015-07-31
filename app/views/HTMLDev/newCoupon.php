<?php 
$title = "";
$menuActive = "campaigns";
include('header.php'); ?>
	
	<!-- PAGE HEADER Start -->
	<div class="page-head bg-color6">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<h4>Campaigns</h4>
				</div>
			</div>
		</div>
	</div>
	<!-- PAGE HEADER End -->
	
	<!-- NOTIFY/GREETINGS FORM Start -->
<form class="campaign-form form">
	<div class="container">
		<div class="row content-head">
			<div class="col-md-12 col-sm-12">
				<h4>CREATE/EDIT A NEW COUPON/SPECIAL</h4>
			</div>
			
		</div>
		<div class="row">
			<div class="col-md-12">
				
				
				<div class="row">
					<label class="col-md-3">COUPON TITLE</label>
					<div class="col-md-9">
						<input type="text" placeholder="ie : Free coffee with 10 points">
					</div>
				</div>
				<div class="separator"></div>
				<div class="row">
					<label class="col-md-3 ">DISCOUNT</label>
					<div class="col-md-9">
						<input type="text" class="input-number input-inline" placeholder="3">
						<select class="mobileFullWidth">
							<option value="Choose">Choose</option>
						  	<option value="percent">percent</option>
						  	<option value="dollars">dollars</option>
						</select>	
					</div>
				</div>
				<div class="separator"></div>
				<div class="row">
					<label class="col-md-3 ">SHARING REWARD</label>
					<div class="col-md-9">
						<input type="text" class="input-number input-inline" placeholder="3">
						  
						<select class="mobileFullWidth">
						  <option value="day">day</option>
						  <option value="week">week</option>
						  <option value="month">month</option>
						</select>
					</div>
				</div>
				<div class="separator"></div>
				<div class="row">
					<label class="col-md-3">VALID LOCATION (S)</label>
					<div class="col-md-9">
						<div class="cbox"><input type="checkbox"><label>Trenton Rd</label></div>
						<div class="cbox"><input type="checkbox"><label>Waybright Ln</label></div>
					</div>
				</div>

			</div>
		</div>
	</div>
	<div class="dark-wrap">
		<div class="container campaign-image">
			<div class="row mobileCenterText">
				<div class="col-md-4 col-sm-12">
					<h4>CAMPAIGN IMAGE</h4>
					<label class="subtitle">* High quality JPG or PNG only</label>
				</div>
				<div class="col-md-8 col-sm-12">
					<span class="document-image-frame">
			            <a href="#" class="upload-campaign-image">Browse</a>
			            <input type="file" accept="image/*" style="display:none" onchange="handleFiles(this)" />
			            <input type="hidden" class="campaignImage" name="campaignImage" value="">
			        </span>
			        <a href="#" class="choose-image">CHOOSE FROM GALLERY</a>
				</div>
	    	</div>
	    	<div class="row tempHideOnMobile">
	    		<div class="col-md-offset-4 col-md-8">
	    			<div class="imgPlaceHolder"><img src="img/img-placeholder.png" alt=""></div>
	    		</div>
	    	</div>
	    	<div class="row tempHideOnMobile">
	    		<div class="col-md-offset-4 col-md-8">
	    			<a href="#crop-image-popup" class="crop-image open-crop-popup-link">CROP ME</a>
	    		</div>
	    	</div>
		</div>
	</div>
	<div class="container">
		<div class="row content-head">
			<div class="col-md-12 col-sm-12">
				<h4>CAMPAIGN SCHEDULE</h4>
			</div>
		</div>
		<div class="row">
			<div class="col-md-3 ">
				<label>STARTS</label>
			</div>
			<div class="col-md-9 ">
				<div class="input-group date">
				  <input type="text"  id="campaignStart" name="campaignStart" class="form-control"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
				</div>
			</div>
		</div>
		<div class="separator"></div>
		<div class="row">
			<div class="col-md-3 ">
				<label>EXPIRES</label>
			</div>
			<div class="col-md-6 "  id="campaignExpires" >
				
				<div class="radio" >
			    	<input type="radio" name="optionsRadios" id="optionsRadios1" value="SpecificDate" checked>
				 	<label for="optionsRadios1">Specific Date</label>
				  	<div class="input-group date">
					  <input type="text" class="form-control"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
					</div>
				</div>
				<div class="radio">
				   <input type="radio" name="optionsRadios" id="optionsRadios2" value="In">
				  <label for="optionsRadios2">
				    In
				  </label>
				  <input type="text" class="input-days" placeholder="3">
				  	<select class="" >
			          <option value="day">day</option>
			          <option value="week">week</option>
			          <option value="month">month</option>
			        </select>
					
				</div>
				<div class="radio allWidth">
				    <input type="radio" name="optionsRadios" id="optionsRadios3" value="Never">
				  <label for="optionsRadios3">
				    Never
				  </label>
				</div>
				
				
			</div>
		</div>
		<div class="separator"></div>
		<div class="row">
			<div class="col-md-3 ">
				<label>DAYS OF WEEK</label>
			</div>
			<div class="col-md-6 "  id="campaignDaysOfWeek">
				<div class="cbox checkbox-inline"><input type="checkbox"><label>S</label></div>
				<div class="cbox checkbox-inline"><input type="checkbox"><label>M</label></div>
				<div class="cbox checkbox-inline"><input type="checkbox"><label>T</label></div>
				<div class="cbox checkbox-inline"><input type="checkbox"><label>W</label></div>
				<div class="cbox checkbox-inline mobileNoLeft"><input type="checkbox"><label>T</label></div>
				<div class="cbox checkbox-inline"><input type="checkbox"><label>F</label></div>
				<div class="cbox checkbox-inline"><input type="checkbox"><label>S</label></div>

			</div>
		</div>
		<div class="separator"></div>
		<div class="row">
			<div class="col-md-3 ">
				<label>VALID WEEKS</label>
			</div>
			<div class="col-md-6 "  id="campaignValidWeeks">
				<div class="cbox checkbox-inline"><input type="checkbox"><label>1st</label></div>
				<div class="cbox checkbox-inline"><input type="checkbox"><label>2nd</label></div>
				<div class="cbox checkbox-inline"><input type="checkbox"><label>3rd</label></div>
				<div class="cbox checkbox-inline mobileNoLeft"><input type="checkbox"><label>4th</label></div>
				<div class="cbox checkbox-inline"><input type="checkbox"><label>5th</label></div>
			</div>
		</div>
		<div class="separator"></div>
		<div class="row">
			
			<div class="col-md-3 ">
				<label>DAYS OF THE MONTH</label>
			</div>
			<div class="col-md-6 daysOfTheMonth"  id="campaignValidDays">
				<div class="radio radio-inline">
				    <input type="radio" name="daysOfMonth" id="EveryDay" value="EveryDay">
				  <label for="EveryDay">
				    Every day
				  </label>
				</div>
				<div class="radio radio-inline">
				    <input type="radio" name="daysOfMonth" id="LastDay" value="LastDay">
				  <label for="LastDay">
				    Last day
				  </label>
				</div>
				<div class="radio radio-inline customDays">
				    <input type="radio" name="daysOfMonth" id="Custom" value="Custom">
				  <label for="Custom">
				    Custom
				  </label>
				</div>
			</div>
			<div class="col-md-3">
				<div class="customDaySelector"></div>
				<input type="hidden" id="customDaySelector_input" />
			</div>
		</div>
		<div class="separator"></div>
		<div class="row timeBetweenContainer">
			<div class="col-md-3 ">
				<label>MIN TIME BETWEEN USE</label>
			</div>
			<div class="col-md-9 timeBetween"  id="campaignTimeBetween" >
				<input type="text" class="input-days input-inline mobileNoTop" placeholder="3">
				<select class="" >
		          <option value="day">day</option>
		          <option value="week">week</option>
		          <option value="month">month</option>
		        </select>
			</div>
		</div>
			
	</div>
	<div class="dark-wrap">
		<div class="container campaign-image">
			<div class="row">
				<div class="col-md-4 col-sm-12">
					<h4>SYNDICATION</h4>
				</div>
				<div class="col-md-5 col-sm-12 mobileSocialCentered">
					<div class="socialBox">
						<label class="facebookImg" for="facebookBox">
						</label>
						<div class="cbox"><input id="facebookBox" type="checkbox" name="facebook"><label class="dark" ></label></div>
					</div>
					<div class="socialBox">
						<label class="twitterImg" for="twitterBox">
						</label>
						<div class="cbox"><input id="twitterBox" type="checkbox" name="twitter"><label class="dark" ></label></div>
					</div>
					<div class="socialBox">
						<label class="instagramImg" for="instagramBox">
						</label>
						<div class="cbox"><input id="instagramBox" type="checkbox" name="instagram"><label class="dark" ></label></div>
					</div>
				</div>
			</div>
		<button type="submit">Save Changes</button>
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
