<?php include('headerLogin.php'); ?>
	<div class="container">
	
		<!-- LOGO Start -->
		<div class="lw-logo">
			<img src="img/logo.png" class="img-responsive" alt=""/>
		</div>
		<!-- LOGO End -->
		
		<!-- LOGIN FORM Start -->
		<div class="login-wrapper">
			<h4>Log in</h4>
			<form>
				<div>
					<input type="text" placeholder="Username">
					<i class="fa fa-user"></i>
				</div>
				<div>
					<input type="password" placeholder="Password">
					<i class="fa fa-lock"></i>
				</div>
				<div class="row">
					<div class="col-md-4 col-sm-4">
						<a href="#" class="forgot-pass">Forgot password?</a>
					</div>
					<div class="col-md-4 col-sm-4">
						<button type="submit">Log in</button>
					</div>
					<div class="col-md-4 col-sm-4 new-account">
						No account? <a href="#">Sign Up</a>
					</div>
				</div>
			</form>
		</div>
		<!-- LOGIN FORM End -->
		
	</div>
<?php include('footer.php');?>