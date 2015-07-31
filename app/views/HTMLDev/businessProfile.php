<?php 
$title = "";
$menuActive = "bProfile";
$showTour = '<script src="js/businessTour.js"></script>'; 
include('header.php'); ?>
	
	<!-- PAGE HEADER Start -->
	<div class="page-head bg-color7">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<h4>Business Profile</h4>
				</div>
			</div>
		</div>
	</div>
	<!-- PAGE HEADER End -->
	
	<!-- Business profile FORM Start -->
<form class="business-profile-form form">
	<div class="container">
		<div class="row content-head essentialInfoTitle">
			<div class="col-md-12 col-sm-12">
				<h4>ESSENTIAL INFO</h4>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				
				<div class="">
					<div class="row">
						<label class="col-md-3">NAME OF BUSINESS</label>
						<div class="col-md-9">
							<input type="text" name="businessName" class="businessName" placeholder="">
						</div>
					</div>
				</div>
				<div class="separator"></div>
				<div class="row">
					<label class="col-md-3">PRIMARY ADDRESS</label>
					<div class="col-md-9">
						<input type="text" name="address" class="address" placeholder="">
					</div>
					<div class="field-info">
						<div class="fi-content">
							<p>Individual Locations can overwrite this.</p>
						</div>
					</div>
				</div>
				<div class="row">
					<label class="col-md-3 hidden-xs"></label>
					<div class="col-md-9">
						<input type="text" name="address2" class="address2" placeholder="">
					</div>
				</div>
				<div class="row">
					<label class="col-md-3 hidden-xs"></label>
					<div class="col-md-4">
						<input type="text" name="city" class="city"  placeholder="City">
					</div>
					<div class="col-md-2">
						<select class="extraSpace state fullWidth" name="extraSpace">
						  <option value="State">State</option>
						  <option value="Albana">Albana</option>
						  <option value="Texas">Texas</option>
						  <option value="Alaska">Alaska</option>
						  <option value="Newyork">Newyork</option>
						</select>
						
					</div>
					<div class="col-md-3">
						<input type="text" class="zipCode" name="zipCode" placeholder="Zip Code">
					</div>
				</div>

			</div>
		</div>
	</div>
	<div class="dark-wrap">
		<div class="container logo-image mobileCenterText">
			<div class="row content-head styleOptionsTitle">
				<div class="col-md-12 col-sm-12">
					<h4>STYLE OPTIONS</h4>
				</div>				
			</div>
	    	<div class="row">
	    		<label class="col-md-3 col-sm-12 businessLogo">
					BUSINESS LOGO
				</label>
	    		<div class="col-md-9">
	    			<div class="imgPlaceHolder"><img src="img/ico/ico-image-temp.svg" alt=""></div>
	    		</div>
	    	</div>
			<div class="row">
				<div class=" col-md-offset-3  col-md-9 col-sm-12">
					<span class="document-image-frame">
			            <a href="#" class="upload-campaign-image">CHANGE LOGO</a>
			            <input type="file" accept="image/*" style="display:none" onchange="handleFilesLogo(this)" />
			            <input type="hidden" class="campaignImage logoImage" name="logoImage" value="">
			        </span>
				</div>
	    	</div>
	    	<div class="separator"></div>
	    	<div class="row contPaleteColors">
    			<label class="col-md-3 col-sm-12">
					COLORS DETECTED
				</label>
	    		<div class="col-md-9 paleteColors">
	    			<div class="color" style=""></div>
	    			<div class="color" style=""></div>
					<div class="color" style=""></div>
	    			<div class="color" style=""></div>
	    			<div class="color" style=";"></div>
	    		</div>
	    	</div>
	    	<div class="separator"></div>
	    	<div class="row">
    			<label class="col-md-3 col-sm-12">
					PRIMARY COLOR
				</label>
	    		<div class="col-md-9">
	    			<input type="text" name="businessName" id="colorPicker1" value="#FFF">
	    		</div>
	    	</div>
	    	<div class="separator"></div>
	    	<div class="row">
    			<label class="col-md-3 col-sm-12">
					SECONDARY COLOR
				</label>
	    		<div class="col-md-9">
	    			<input type="text" name="businessName" id="colorPicker2" value="#FFF">
	    		</div>
	    	</div>
	    	<div class="separator"></div>
	    	<div class="row">
    			
	    		<div class=" col-md-offset-3 col-md-9 col-xs-12 preview">
	    			<a href="#preview-popup" class="preview-campaign open-popup-link" >PREVIEW YOUR MOBILE BUSINESS PAGE</a>
	    			
	    		</div>
	    	</div>
		</div>
	</div>
	<div class="container">
		<div class="row content-head socialSettingsTitle">
			<div class="col-md-12 col-sm-12">
				<h4>SOCIAL SETTINGS</h4>
			</div>
		</div>
		<div class="row">
			<div class="col-md-3 ">
				<label>WEBSITE</label>
			</div>
			<div class="col-md-9 ">
				<input type="text" name="website" class="website" placeholder="http://">
			</div>
		</div>
		<div class="row">
			<div class="col-md-3 ">
				<label>TWITTER URL</label>
			</div>
			<div class="col-md-9 ">
				<input type="text" name="twitterUrl" class="twitterUrl" placeholder="http://">
			</div>
		</div>
		<div class="row">
			<div class="col-md-3 ">
				<label>FACEBOOK URL</label>
			</div>
			<div class="col-md-9 ">
				<input type="text" name="facebookUrl" class="facebookUrl" placeholder="http://">
			</div>
		</div>
		
	</div>
	<div class="dark-wrap">
		<div class="container campaign-image">
			<div class="row  content-head integrationsTitle">
				<div class="col-md-3 col-sm-12">
					<h4>INTEGRATIONS</h4>
				</div>
			</div>	
			<div class="row">
				
				<div class="col-md-9 col-md-offset-3 mobileSocialCentered">
					<div class="socialBox">
						<div class="facebookImg" >
							<img src="img/facebook.png">
						</div>
						<a class="connected open-popup-link" href="#share-popup" >Connected</a>
					</div>
					<div class="socialBox">
						<div class="twitterImg" >
							<img src="img/twitter.png">
						</div>
						<a class="connect open-popup-link" href="#share-popup" >Connect</a>
					</div>
					<div class="socialBox">
						<div class="instagramImg" >
							<img src="img/instagram.png">
						</div>
						<a class="connect open-popup-link" href="#share-popup" >Connect</a>
					</div>
					<div class="socialBox">
						<div class="mailchimpImg" >
							<img src="img/mailchimp.png">
						</div>
						<a class="connect open-popup-link" href="#share-popup" >Connect</a>
					</div>
					<div class="socialBox">
						<div class="constantContactImg" >
							<img src="img/constantcontact.png">
						</div>
						<a class="connect open-popup-link" href="#share-popup" >Connect</a>
					</div>
				</div>
			</div>
		
		</div>
		<button>SAVE CHANGES</button>
		<button class="publish">PUBLISH</button>
	</div>
	</form>

	<!-- Business profile FORM End -->

	<!-- Social POPUP! -->
	<div id="share-popup" class="white-popup mfp-hide">
	  	
	  	<div class="container">
	  		<textarea name="shareText">@ZIPPYSPOT is ready to Roll!</textarea>
		</div>
		<div class="footer">
			<div class="facebookBox"></div>
			<div class="twitterBox"></div>
			<button class="share-btn">SHARE NOW!</button>
		</div>
	</div>
	<!-- Social POPUP end -->

	<!-- Preview POPUP! -->
	<div id="preview-popup" class="white-popup mfp-hide">
	  	<div class="container">
	  		<div class="mobileTemplate">
	  			<div class="previewHeader">
	  				<img src="img/ico/ico-image-temp.svg">
	  			</div>
	  			<div class="content">
	  				<h1>ACME Coffee</h1>
	  				<p>123 Sesame St. New York, NY 11211</p>
	  			</div>
	  			<div class="socialFooter">
	  				<a class="chains" href="#"></a>
	  				<a class="facebook" href="#"></a>
	  				<a class="twitter" href="#"></a>
	  			</div>
	  		</div>
		</div>
	</div>
	<!-- Preview POPUP end -->

<?php include('footer.php');?>