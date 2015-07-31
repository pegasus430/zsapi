<?php 
$title = "";
$menuActive = "campaign";
include('header.php'); ?>

	<div class="container">

		<!-- CAMPAIGNS start -->
		<div class="row content-head">
			<div class="col-md-4 col-sm-12">
				<h4>Your Campaigns</h4>
			</div>
			<div class="col-md-4 col-sm-6">
				<a href="#new-campaign-popup" class="new-cap open-popup-link">New Campaign</a>
			</div>
			<div class="col-md-4 col-sm-6">
        <select class="fullWidth">
          <option value="Trenton RD">Trenton RD</option>
          <option value="Texas">Texas</option>
          <option value="Alaska">Alaska</option>
          <option value="Newyork">Newyork</option>
        </select>
			</div>
		</div>
		<div class="row">
			<div class="col-md-7 campaigns-selector">
				<div class="view">VIEW</div>
        <select class="selectBox2">
          <option value="ALL">ALL</option>
          <option value="Features">Features</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Inactive">Inactive</option>
        </select>
				
        <select class="selectBox2">
          <option value="Campaigns">Campaigns</option>
          <option value="Coupons">Coupons</option>
          <option value="Rewards">Rewards</option>
          <option value="Specials">Specials</option>
        </select>
				
			</div>
		</div>
    
		<div class="table-responsive">
      <table data-toggle="table" data-toolbar="#custom-toolbar" data-show-columns="false" data-search="false" data-show-refresh="false" data-show-filter="false" data-show-toggle="false" data-show-export="false" data-pagination="true" data-pagination-v-align="both" data-striped="true" class="table table-hover table-condensed table-bordered">
        <thead>
          <tr>
            <th class="first"></th>
            <th data-align="left" data-sortable="true">Title</th>
            <th data-align="left" data-sortable="true">Location</i></th>
            <th data-align="left" data-sortable="true">Valid</th>
            <th data-align="left" data-sortable="true">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="circle blue">R</span></td>
            <td><a href="campaign.php">150 reward points w/ drink</a></td>
            <td>Trenton Rd</td>
            <td>Every Tue & Thu</td>
            <td><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td><span class="circle red">S</span></td>
            <td>BOGO 50% Bear Claws</td>
            <td>All</td>
            <td>April 23rd</td>
            <td><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td><span class="circle green">C</span></td>
            <td>50% off late´s</td>
            <td>All</td>
            <td>May 1st - May 3rd</td>
            <td><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td><span class="circle blue">R</span></td>
            <td>150 reward points w/ drink</td>
            <td>Trenton Rd</td>
            <td>Every Tue & Thu</td>
            <td><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td><span class="circle red">S</span></td>
            <td>BOGO 50% Bear Claws</td>
            <td>All</td>
            <td>April 23rd</td>
            <td><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td><span class="circle green">C</span></td>
            <td>50% off late´s</td>
            <td>All</td>
            <td>May 1st - May 3rd</td>
            <td><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td><span class="circle blue">R</span></td>
            <td><a href="campaign.php">150 reward points w/ drink</a></td>
            <td>Trenton Rd</td>
            <td>Every Tue & Thu</td>
            <td><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td><span class="circle red">S</span></td>
            <td>BOGO 50% Bear Claws</td>
            <td>All</td>
            <td>April 23rd</td>
            <td><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td><span class="circle green">C</span></td>
            <td>50% off late´s</td>
            <td>All</td>
            <td>May 1st - May 3rd</td>
            <td><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td><span class="circle blue">R</span></td>
            <td>150 reward points w/ drink</td>
            <td>Trenton Rd</td>
            <td>Every Tue & Thu</td>
            <td><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td><span class="circle red">S</span></td>
            <td>BOGO 50% Bear Claws</td>
            <td>All</td>
            <td>April 23rd</td>
            <td><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td><span class="circle green">C</span></td>
            <td>50% off late´s</td>
            <td>All</td>
            <td>May 1st - May 3rd</td>
            <td><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
        </tbody>
      </table>
    </div>
		<!-- CAMPAIGNS end -->

		<!-- NEW CAMPAIGNS POPUP! -->

		<div id="new-campaign-popup" class="white-popup mfp-hide new-campaign ro">
			<span class="title">Select a Campaign</span>

		  	<div>
		  		<a href="newCoupon.php">
		  			<img class="percent" src="img/percent.png">
		  			<h4>New Coupon</h4>
		  			<span>Ex: Get 10% Off an Item</span>
		  		</a>
		  	</div>

		  	<div>
		  		<a href="newCampaign.php">
		  			<img class="cup" src="img/cup.png">
		  			<h4>New Reward</h4>
		  			<span>Ex: Redeem your points</span>
		  		</a>
		  	</div>

		  	<div class="last">
		  		<a href="newCoupon.php">
		  			<img class="star" src="img/star.png">
		  			<h4>New Special</h4>
		  			<span>Ex: Half-Price Wednesdays</span>
		  		</a>
		  	</div>
		</div>
		<!-- NEW CAMPAIGNS POPUP end -->

	</div>

	

<?php include('footer.php');?>
