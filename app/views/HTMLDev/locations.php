<?php 
$title = "";
$menuActive = "location";
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

  <div class="container your-locations">

		<!-- CAMPAIGNS start -->
		<div class="row content-head no-bottom">
			<div class="col-md-12 col-sm-12">
				<h4>Your Locations</h4>
			</div>
		</div>

		<div class="table-responsive">
      <table data-toggle="table" data-toolbar="#custom-toolbar" data-show-columns="false" data-search="false" data-show-refresh="false" data-show-filter="false" data-show-toggle="false" data-show-export="false" data-pagination="true" data-pagination-v-align="both" data-striped="true" class="table table-hover table-condensed table-bordered">
        <a href="newLocation.php" class="new-location new-cap">New Location</a>
        <thead>
          <tr>
            <th data-align="left" data-sortable="true" class="first">ID</th>
            <th data-align="left" data-sortable="true">Title</i></th>
            <th data-align="left" data-sortable="true">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0145</td>
            <td><a href="location.php">Trenton Rd</a></td>
            <td class="last"><a href="newLocation.php" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td>0255</td>
            <td><a href="location.php">Sofia Coppola</a></td>
            <td class="last"><a href="newLocation.php" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td>0500</td>
            <td><a href="location.php">Andrew Lopez</a></td>
            <td class="last"><a href="newLocation.php" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
           <tr>
            <td>0240</td>
            <td><a href="location.php">Robert Smith</a></td>
            <td class="last"><a href="newLocation.php" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td>0100</td>
            <td><a href="location.php">Trenton Rd</a></td>
            <td class="last"><a href="newLocation.php" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td>0380</td>
            <td>Thomas Anderson</td>
            <td class="last"><a href="newLocation.php" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td>0680</td>
            <td>Jessica Simpson</td>
            <td class="last"><a href="newLocation.php" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td>0800</td>
            <td>Christian Robinson</td>
            <td class="last"><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td>0750</td>
            <td>Robert De Niro</td>
            <td class="last"><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td>0950</td>
            <td>Nicolas Smith</td>
            <td class="last"><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td>0915</td>
            <td>Trenton Rd</td>
            <td class="last"><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>
          <tr>
            <td>0975</td>
            <td>Trenton Rd</td>
            <td class="last"><a href="#" class="edit">edit</a><a href="#" class="delete">Delete</a></td>
          </tr>       
        </tbody>
      </table>
    </div>

    <div class="row content-head">
      <div class="col-md-12 col-sm-12">
        <h4>Pending Locations</h4>
      </div>
    </div>

    <div class="table-responsive">
      <table data-toggle="table" data-toolbar="#custom-toolbar" data-show-columns="false" data-search="false" data-show-refresh="false" data-show-filter="false" data-show-toggle="false" data-show-export="false" data-pagination="true" data-pagination-v-align="both" data-striped="true" class="table table-hover table-condensed table-bordered">
        <thead>
          <tr>
            <th data-align="left" data-sortable="true" class="first">ID</th>
            <th data-align="left" data-sortable="true">Title</i></th>
            <th data-align="left" data-sortable="true">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0198</td>
            <td>Trenton Rd</td>
            <td><a href="#">UUID Code</a></td>

          </tr>     
        </tbody>
      </table>
    </div>

    <!-- CAMPAIGNS end -->

	</div>

	

<?php include('footer.php');?>
