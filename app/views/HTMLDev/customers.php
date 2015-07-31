<?php 
$title = "";
$menuActive = "customers";
include('header.php'); ?>

	<!-- PAGE HEADER Start -->
	<div class="page-head bg-color8">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<h4>Customers</h4>
				</div>
			</div>
		</div>
	</div>

	

	<div class="container customers">

		<!-- CUSTOMERS start -->
		<div class="row content-head">
			<div class="col-md-8 col-xs-12">
				<h4>Your Customers</h4>
			</div>
			<div class="col-md-2 col-xs-6">
				<a href="#" class="new-cap csv-button import">Import</a>
			</div>
			<div class="col-md-2 col-xs-6">
				<a href="#" class="new-cap open-export-ui csv-button export">Export</a>
				<ul class="export-ui">
					<li><a href="#">Mailchimp</a></li>
					<li><a href="#">Constant Contact</a></li>
					<li><a href="#">CSV</a></li>
				</ul>
			</div>
		</div>

		<div class="row">
			<div class="col-md-6 col-sm-12 campaigns-selector">
				<div class="view">VIEW</div>
				
				<select >
		          <option value="ALL">ALL</option>
		          <option value="Active">Active</option>
		          <option value="Inactive">Inactive</option>
		        </select>
				
			</div>
		</div>

		<div class="table-responsive">
	      <table data-toggle="table" data-toolbar="#custom-toolbar" data-show-columns="false" data-search="false" data-show-refresh="false" data-show-filter="false" data-show-toggle="false" data-show-export="false" data-pagination="true" data-pagination-v-align="both" data-striped="true" class="table table-hover table-condensed table-bordered">
	        <thead>
	          <tr>
	            <th class="first"></th>
	            <th data-align="left" data-sortable="true">ID</th>
	            <th data-align="left" data-sortable="true">Name</i></th>
	            <th data-align="left" data-sortable="true">Email</th>
	            <th data-align="left" data-sortable="true">Points</th>
	          </tr>
	        </thead>
	        <tbody>
	          <tr>
	            <td><span class="circle active"></span></td>
	            <td>1</td>
	            <td>Williford, James</td>
	            <td>email@gmail.com</td>
	            <td>175</td>
	          </tr>
	          <tr>
	            <td><span class="circle disabled"></span></td>
	            <td>2</td>
	            <td>Will, John</td>
	            <td>email@gmail.com</td>
	            <td>15</td>
	          </tr>
	          <tr>
	            <td><span class="circle disabled"></span></td>
	            <td>3</td>
	            <td>Williams, Jessee</td>
	            <td>email@gmail.com</td>
	            <td>2175</td>
	          </tr>
	          <tr>
	            <td><span class="circle disabled"></span></td>
	            <td>4</td>
	            <td>William, James</td>
	            <td>email@gmail.com</td>
	            <td>1500</td>
	          </tr>	          
	          <tr>
	            <td><span class="circle active"></span></td>
	            <td>5</td>
	            <td>Wicke, Jim</td>
	            <td>email@gmail.com</td>
	            <td>1750</td>
	          </tr>
	          <tr>
	            <td><span class="circle active"></span></td>
	            <td>6</td>
	            <td>Wick, Jimmy</td>
	            <td>email@gmail.com</td>
	            <td>1175</td>
	          </tr>
	          <tr>
	            <td><span class="circle active"></span></td>
	            <td>7</td>
	            <td>Wilson, Joy</td>
	            <td>email@gmail.com</td>
	            <td>175</td>
	          </tr>
	          <tr>
	            <td><span class="circle active"></span></td>
	            <td>8</td>
	            <td>Wilton, Josh</td>
	            <td>email@gmail.com</td>
	            <td>1725</td>
	          </tr>	          
	          <tr>
	            <td><span class="circle active"></span></td>
	            <td>9</td>
	            <td>Williford, James</td>
	            <td>email@gmail.com</td>
	            <td>3175</td>
	          </tr>
	          <tr>
	            <td><span class="circle active"></span></td>
	            <td>10</td>
	            <td>Wiles, Jack</td>
	            <td>email@gmail.com</td>
	            <td>1752</td>
	          </tr>
	        </tbody>
	      </table>
      	</div>
	</div>

	<div class="import-customers">
		<div class="container">
			<div class="row content-head">
				<div class="col-md-12 col-xs-12">
					<h4>Your Customers</h4>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3 col-md-offset-0 col-xs-7 col-xs-offset-3">
					<h5>UPLOAD YOUR CVS FILE:</h5>
				</div>
				<div class="col-md-9 col-xs-12">
					<a href="#" class="new-cap open-popup-link csv-button browse">Browse</a>
				</div>
			</div>
		</div>
	</div>

	<div class="container customers">
		<form class="notify-form">
			<div class="row">
				<div class="col-md-12">
					<div class="cbox"><input type="checkbox"></div>
					<div class="cbox"><input type="checkbox"><label>Notify the imported users of the new rewards system?</label></div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<textarea class="form-control" rows="3" placeholder="Tags are available: {FIRST_NAME}, {LAST_NAME}, {EMAIL}, {REWARD_POINTS}, etc."></textarea>
				</div>
				<div class="col-md-12">
					<button type="submit">Send Email</button>
				</div>
			</div>
		</form>
	</div>

		<!-- CUSTOMERS end -->

		<!-- CAMPAIGN CONTENT start -->

		<!-- CAMPAIGN CONTENT End -->



<?php include('footer.php');?>