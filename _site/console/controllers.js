/*routerApp.run(['$scope', '$rootscope', function($scope, $rootscope) {

}]); */

/*
routerApp.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeSuccess', function(){
            analytics('send', 'pageview', $location.path());
	        });
});
*/

//IGNORECOMBINE - DO NOT REMOVE THIS LINE, used by combine script to ignore content

routerApp.controller('settingController', ['$scope', '$window', function ($scope, $window) {
    analytics('send', 'pageview', '#settings');

    $scope.$on('$viewContentLoaded', function () {
        if ($('#testDiv').length > 0) {
            $('#testDiv').slimScroll({
                alwaysVisible: true,
                railVisible: true,
                railColor: '#fff',
                railOpacity: 1,
                height: '403px',
                railBorderRadius: 0
            });
        }

        //update_contacts();
    });


}]);

routerApp.controller('headerController', ['$rootScope', '$scope', '$window', '$state', function($rootScope, $scope, $window, $state) {
	if(!$rootScope.loading)
		return;
	$scope.gravatarurl = gravatar($scope.user.email);
}]);

routerApp.controller("NavCtrl", function($scope, $location) {
  $scope.navClass = function(page) {
    var current = $location.path().substring(1);
    return page === current ? "active" : "";
  };
});


routerApp.controller('dashboardController', ['$rootScope', '$scope', '$window', '$state', function($rootScope, $scope, $window, $state) {

    if(!$rootScope.loading)
	return;

    analytics('send', 'pageview', '#dashboard');

	$scope.$on('$viewContentLoaded', function(){
    if ($('#testDiv').length > 0) {
        $('#testDiv').slimScroll({
            alwaysVisible: true,
            railVisible: true,
            railColor: '#fff',
            railOpacity: 1,
            height: '403px',
            railBorderRadius: 0
        });
    }});


    $scope.signuphandler = function(res, o, e) {
    		if(res) {
			analytics('send', 'pageview', '#regsuccessful');
			$state.go('emailsent');
			return;
		}

		if(e == 'EXISTS') {
			$scope.appdata.error = 'Your account already exists, login to continue!';
			$state.go('login');
			return;
		}
		
		$scope.appdata.error = 'Something went wrong, try again later!';
		$scope.$applyAsync();
		return;
    	};
    $scope.appadd = function() {
	 mesibo_appadd(function(res, o, e) {
	 	if(!res) {
			$scope.showAlert("Quata Exceeded", "Quota Exceeded. Please contact support if you need further assistance", 'Ok');
			return;
		 }
	 }, $scope.appdata.appname);	

	 $scope.appdata.appname='';
	 analytics('send', 'event', '#appcreated');
    };
    
    $scope.app_delete = function(app) {
		$scope.showPrompt($window, 'Delete ' + app.name + '?', 'Entire App along with all the users, groups and stats will be deleted. Continue?', 'Delete', function() {
	 		mesibo_appdel(app.token);
		}, 'Cancel');
    };
    
    $scope.regenerate_apptoken = function(app) {
	$scope.showPrompt($window, 'Regenerate APP Token?', 'Your existing APP token will no longer be valid. Continue?', 'Regenerate', function() {
		mesibo_apptoken(app.token);
	}, 'Cancel');

    }

    $scope.regenerate_key = function() {
	
	$scope.showPrompt($window, 'Regenerate API Key?', 'Your existing API key will no longer be valid. Continue?', 'Regenerate', function() {
		mesibo_regenapikey();
	}, 'Cancel');

    }

    // if already loggedin and someone tried to go to login state, take them to dashboard
    if($rootScope.init_state == 'login' && $scope.is_loggedin()) {
	$rootScope.init_state = '';
    }
			
    if($rootScope.init_state != '' && $rootScope.init_state != 'dashboard') {
    	var newstate = $scope.init_state;
	//alert('prevstate: ' + newstate);
    	$rootScope.init_state = '';
	$state.go(newstate);
    }
   
    $rootScope.init_state = ''; 

    $scope.appdata.service_type = 'Free';
    if($scope.user['account'].b_paid) {
    	$scope.appdata.service_type = 'Pay As You Go';
    }
    
}]);

routerApp.controller('appcontroller', ['$scope', '$window', '$state', '$stateParams', function($scope, $window, $state, $stateParams) {
    analytics('send', 'pageview', '#appsetting');

	$scope.$on('$viewContentLoaded', function(){
    if ($('#testDiv').length > 0) {
        $('#testDiv').slimScroll({
            alwaysVisible: true,
            railVisible: true,
            railColor: '#fff',
            railOpacity: 1,
            height: '403px',
            railBorderRadius: 0
        });
    }});

    $scope.appdata.search = '';
    $scope.appdata.message = '';
    $scope.appdata.newuseraddr = '';
    
    $scope.onp = new Array();
    $scope.onp.dbhosterror = '';
    $scope.onp.hosterror = '';

    var name = $stateParams.name;
    mesibo_select_app(name);

    $scope.appdata.showonpenable = true;
    /*

    console.log($scope.user.app);
	*/

   // alert('app: ' + name);
    
    $scope.save_general = function() {
    	 //alert($scope.user.app.name);
	 mesibo_appset($scope.user.app.token, $scope.user.app.name, $scope.user.app.maxusers, $scope.user.app.maxgroups, $scope.user.app.maxmsgs, '', -1, -1, -1);
	 $scope.savetoast();
    };
    
    $scope.save_webhooks = function() {
	 mesibo_appset($scope.user.app.token, '', -1, -1, -1, $scope.user.app.url, $scope.user.app.notify, $scope.user.app.secret, $scope.user.app.ninterval, -1, -1);
	 $scope.savetoast();
    };
    
    $scope.save_fcm = function() {
	 mesibo_appset($scope.user.app.token, '', -1, -1, -1, '', '', '', -1, $scope.user.app.fcm_id, $scope.user.app.fcm_key);
	 $scope.savetoast();
    };
    
    $scope.save_apn = function() {
	 send_http_upload("https://api.mesibo.com/api.php", 'appapn', $scope.user.app.token, 'p12form');
	 $scope.savetoast();
    };
    
    $scope.toggle_webhooks = function() {
	    $scope.user.app.notify ^= 1;
	    $scope.save_webhooks();
    }
    
    $scope.toggle_flag = function(flag) {
	    $scope.user.app.flag ^= flag;
	    mesibo_appflags($scope.user.app.token, $scope.user.app.flag);
    }

    $scope.is_validhost = function(host) {
	var pat = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
	return pat.test(host);
    }

    $scope.validate_onp = function() {
    	$scope.onp.dbhosterror = '';
	$scope.onp.hosterror = '';
	var pass = true;
	if(!$scope.is_validhost($scope.user.onp.dbhost)) {
		if($scope.user.onp.dbhost.length > 0)
			$scope.onp.dbhosterror = 'Invalid Hostname';
		pass = false;
	}
	if(!$scope.is_validhost($scope.user.onp.hostname)) {
		if($scope.user.onp.hostname.length > 0)
			$scope.onp.hosterror = 'Invalid Hostname';
		pass = false;
	}

	if($scope.user.onp.dbname.length == 0 || $scope.user.onp.dbuser.length == 0 || $scope.user.onp.dbpass.length == 0)
		return false;

	return pass;
    }
    
    $scope.save_onp = function() {

	mesibo_onpset($scope.user.app.token, $scope.user.onp.dbhost, $scope.user.onp.dbname, $scope.user.onp.dbuser, $scope.user.onp.dbpass, $scope.user.onp.hostname, $scope.user.onp.sslpath);

    }
    
    $scope.user_add = function() {
    	 //alert($scope.user.app.name);
	 mesibo_useradd($scope.user.app.token, $scope.appdata.newappid, $scope.appdata.newuseraddr, $scope.appdata.newuseractive, $scope.appdata.newuserpin);
	 $scope.appdata.newuseraddr = '';
    };
    
    $scope.group_add = function() {
    	 //alert($scope.user.app.name);
	 mesibo_groupadd($scope.user.app.token, $scope.appdata.newuseraddr, $scope.appdata.newuserpin?'1':'0');	
	$scope.appdata.newuseraddr = '';	 
    };
	
    $scope.send_appmessage = function() {
	 mesibo_message(function(res, o, none) {
			 $scope.appdata.message = '';
			 $scope.appdata.msgfrom = '';
			}, 
			 $scope.appdata.allgroup,$scope.appdata.msgfrom, $scope.user.user.alluser, '', $scope.appdata.message);
			 $scope.sendtoast();
    };
	 
    mesibo_appstats(function(res, o, none) {
    			//if($scope.user.app.server.length == 0 && 0 == ($scope.user.app.flag&256))
		    	//	$scope.appdata.showonpenable = false;
		    }, 
			$scope.user.app.token);
    
}]);

routerApp.controller('grouplistcontroller', ['$scope', '$window', '$state', '$stateParams', function($scope, $window, $state, $stateParams) {
    analytics('send', 'pageview', '#groups');
    //alert('uc: ');

	$scope.$on('$viewContentLoaded', function(){
    if ($('#testDiv').length > 0) {
        $('#testDiv').slimScroll({
            alwaysVisible: true,
            railVisible: true,
            railColor: '#fff',
            railOpacity: 1,
            height: '403px',
            railBorderRadius: 0
        });
    }});

    $scope.appdata.search = '';
    $scope.appdata.message = '';

    	 //alert($scope.user.app.name);
 	mesibo_groupsget($scope.user.app.token);

    $scope.toggle_group_pin = function(u) {
	 //"uid", "storage", "ssr", "active", "pinned"
	 mesibo_groupset($scope.user.app.token, u.gid, '', -1, (u.pinned^1));
    };
    
    $scope.group_delete = function(u) {
	 //"uid", "storage", "ssr", "active", "pinned"
		$scope.showPrompt($window, 'Delete group ' + u.name + '?', 'Group along with all the memebers will be deleted. Continue?', 'Delete', function() {
	 		mesibo_groupdel($scope.user.app.token, u.gid);
		}, 'Cancel');

    };
    
    var search = '';
    $scope.group_search_change = function() {
	if($scope.appdata.search == '' && search != '') {
		search = '';
	 	mesibo_groupsget($scope.user.app.token, $scope.appdata.search);
	}
    };
    
    $scope.group_search = function() {
	search = $scope.appdata.search;
	if(search.indexOf('*') === -1) {
		search = '*' + search + '*';
	}
 	mesibo_groupsget($scope.user.app.token, search);
    };
    
    $scope.group_refresh = function() {
	$scope.appdata.search = search; //update searchbar with last search
	if(search.indexOf('*') === -1) {
		search += '*';
	}
 	mesibo_groupsget($scope.user.app.token, search);
    };

}]);

routerApp.controller('userlistcontroller', ['$scope', '$window', '$state', '$stateParams', function($scope, $window, $state, $stateParams) {
    analytics('send', 'pageview', '#users');
    //alert('uc: ');

	$scope.$on('$viewContentLoaded', function(){
    if ($('#testDiv').length > 0) {
        $('#testDiv').slimScroll({
            alwaysVisible: true,
            railVisible: true,
            railColor: '#fff',
            railOpacity: 1,
            height: '403px',
            railBorderRadius: 0
        });
    }});

    $scope.appdata.search = '';
    $scope.appdata.message = '';

    	 //alert($scope.user.app.name);
 	mesibo_usersget($scope.user.app.token);

    $scope.toggle_user_pin = function(u) {
	 //"uid", "storage", "ssr", "active", "pinned"
	 mesibo_userset($scope.user.app.token, u.uid, 0, -1, (u.pinned^1));
    };
    
    $scope.toggle_user_activate = function(u) {
	 //"uid", "storage", "ssr", "active", "pinned"
	 mesibo_userset($scope.user.app.token, u.uid, 0, (u.active^1), -1);
    };
    
    $scope.user_delete = function(u) {
	 //"uid", "storage", "ssr", "active", "pinned"
		$scope.showPrompt($window, 'Delete user ' + u.address + '?', 'User will be deleted. Continue?', 'Delete', function() {
	 		mesibo_userdel($scope.user.app.token, u.uid);
		}, 'Cancel');

    };
    
    var search = '';
    $scope.user_search_change = function() {
	if($scope.appdata.search == '' && search != '') {
		search = '';
	 	mesibo_usersget($scope.user.app.token, $scope.appdata.search);
	}
    };
    
    $scope.user_search = function() {
	search = $scope.appdata.search;
	//add wildcard
	if(search.indexOf('*') === -1) {
		search = '*' + search + '*';
	}
 	mesibo_usersget($scope.user.app.token, search);
    };
    
    $scope.user_refresh = function() {
	$scope.appdata.search = search; //update searchbar with last search
	if(search.indexOf('*') === -1) {
		search += '*';
	}
 	mesibo_usersget($scope.user.app.token, search);
    };


}]);

routerApp.controller('groupcontroller', ['$scope', '$window', '$state', '$stateParams', function($scope, $window, $state, $stateParams) {
    var gid = $stateParams.gid;
    mesibo_select_group(gid);
    $scope.user.members = new Array();
    $scope.appdata.newuseraddr = '';
    mesibo_groupgetmembers($scope.user.app.token, gid);

    $scope.appdata.newappid = $scope.user.user.appid;
    $scope.appdata.message = '';

    $scope.group_message = function() {
	 mesibo_message(function(res, o, none) {
		 
		 if(res)
		 {
			$scope.appdata.message = '';
			 $scope.appdata.msgfrom = '';
			 $scope.sendtoast();
		 }
		 else
		 {
			 $scope.failedtoast();
		 }			 
	}, 
	$scope.user.app.token, $scope.appdata.msgfrom, '', gid, $scope.appdata.message);		
    };

    $scope.group_save = function() {
	    mesibo_groupset($scope.user.app.token, $scope.user.group.gid, $scope.user.group.name, $scope.user.group.flag, -1, $scope.user.group.expinsec, $scope.user.group.expiryext);
		$scope.savetoast();
    };

    $scope.group_sender_setter = function(value) {
    	if (angular.isDefined(value)) {
		$scope.user.group.flag = ($scope.user.group.flag&~7) | value;
	} else {
		return $scope.user.group.flag&7;
	}
    };
    
    $scope.group_receiver_setter = function(value) {
    	if (angular.isDefined(value)) {
		$scope.user.group.flag = ($scope.user.group.flag&~0x70) | (value << 4);
	} else {
		return ($scope.user.group.flag >> 4)&7;
	}
    };


    $scope.group_selective_send = function() {
	return (1 != ($scope.user.group.flag&7));
    }
    
    $scope.group_selective_recv = function() {
	return (1 != (($scope.user.group.flag >> 4)&7));
    }

    $scope.group_addmember = function() {
		mesibo_groupeditmembers(function(res, o, e) {
					if(!res) {
    						 $scope.showAlert('Failed', "Enter valid user and try again!", 'Ok'); 
							//$scope.warningtoast();
					}
					else
					{
						$scope.addrectoast();
					}
				},
				$scope.user.app.token, gid, $scope.appdata.newuseraddr, 0, 0, 0);	
				 $scope.appdata.newuseraddr = '';				 
    }
   
    $scope.group_delmember = function(addr) {
		mesibo_groupeditmembers($scope.user.app.token, gid, addr, 0, 0, 1);	
    }
    
    $scope.group_member_setsendrecv = function(m) {
		mesibo_groupeditmembers($scope.user.app.token, gid, m.address, m.cansend, m.canrecv, 0);	
    }
    
		
}]);

routerApp.controller('usercontroller', ['$scope', '$window', '$state', '$stateParams', function($scope, $window, $state, $stateParams) {
    var uid = $stateParams.uid;
    mesibo_select_user(uid);

    $scope.appdata.newappid = $scope.user.user.appid;
    $scope.appdata.message = '';
    $scope.appdata.force_create_user = 1;

    $scope.user_gentoken = function() {
	 //"uid", "storage", "ssr", "active", "pinned"
	 mesibo_usertoken($scope.user.app.token, $scope.user.user.uid, $scope.appdata.newappid);
	 $scope.appdata.newappid = '';
    };
	
	$scope.user_regentoken = function() {
	 //"uid", "storage", "ssr", "active", "pinned"
	 $scope.showPrompt($window,'Regenerate API Key?', 'Your existing API key will no longer be valid. Continue?', 'Regenerate', function() {
		mesibo_usertoken($scope.user.app.token, $scope.user.user.uid, $scope.user.user.appid);
	}, 'Cancel');	 
    };
	
    $scope.user_deltoken = function() {
	 //"uid", "storage", "ssr", "active", "pinned"
	 $scope.showPrompt($window,'Delete Token ?', 'Token will be deleted. Continue?','Delete', function() { mesibo_usertoken($scope.user.app.token, $scope.user.user.uid, $scope.user.user.appid, 1);}, 'Cancel');
    };
    
   /*  $scope.user_message = function() {
	 mesibo_message(function(res, o, none) {
			 $scope.appdata.message = '';
			 $scope.appdata.msgfrom = '';
			$scope.sendtoast();
			}, 
			$scope.user.app.token, $scope.appdata.msgfrom, $scope.user.user.address, '', $scope.appdata.message);
			
    }; */
	
	$scope.user_message = function() {
	 mesibo_message(function(res, o, none) {
            if(res)
                     
            {
			 $scope.appdata.message = '';
			 $scope.appdata.msgfrom = '';
			$scope.sendtoast();
			} else {
                     $scope.failedtoast(); 
                     }
           },

			$scope.user.app.token, $scope.appdata.msgfrom, $scope.user.user.address, '', $scope.appdata.message, $scope.appdata.force_create_user);
			
    };

    $scope.user_save = function() {
	    mesibo_userset($scope.user.app.token, $scope.user.user.uid, $scope.user.user.flag);
		$scope.savetoast();
    };

		
}]);

routerApp.controller('loginController', ['$scope', '$window', '$state', function($scope, $window, $state) {
    analytics('send', 'pageview', '#login');

    $scope.doLogin = function() {
	 mesibo_login($scope.appdata.email, $scope.appdata.password, $scope.appdata.remember);
	 $scope.appdata.password = '';
    };

    $scope.signuphandler = function(res, o, e) {
    		if(res) {
			analytics('send', 'pageview', '#regsuccessful');
			$state.go('emailsent');
			return;
		}

		if(e == 'EXISTS') {
			$scope.appdata.error = 'Your account already exists, login to continue!';
			$state.go('login');
			return;
		}
		
		$scope.appdata.error = 'Something went wrong, try again later!';
		$scope.$applyAsync();
		return;
    	};
		
    $scope.dosignup=function(){ 
	mesibo_signup($scope.signuphandler, $scope.appdata.name, $scope.appdata.email, $scope.appdata.password, '');
    };
    
    $scope.doThirdPartyLogin = function(type) {
    	mesibo_login_thirdparty(type);
    };

    $scope.doResetPassword = function() {
	    $scope.appdata.error = '';
	    $scope.appdata.otp = '';
	    $scope.appdata.password = '';
    	mesibo_resetpassword(function(res, o, e) {
			if(res)
				$state.go('resetpassword');
			}, $scope.appdata.email);
    };
    
    $scope.doSavePassword = function() {
	    $scope.appdata.error = '';
    	    mesibo_resetpassword(function(res, o, e) {
				if(res)
					$state.go('login');
				else {
    					$scope.showAlert('Wrong OTP', "Check your OTP and try again!", 'Ok');
				}
			},
			$scope.appdata.email, $scope.appdata.otp, '', $scope.appdata.password);
    };

		
    $window.show_loginfailed = function(message) {
    	$scope.showAlert('Login Failed', "Check your email or password and try again!", 'Ok');
    }

    	$window.show_signupfailed = function(message) {
		    	$scope.showAlert('Account Exists!', "Your account already exists, login with your password to continue.", 'Login Now');
			$state.go('login');
    		}

}]);

routerApp.controller('accountController', ['$rootScope', '$scope', '$window', '$state', function($rootScope, $scope, $window, $state) {
	
    if(!$rootScope.loading)
	return;

    $scope.appdata.service_type = 'Free';
    if($scope.user['account'].b_paid) {
    	$scope.appdata.service_type = 'Pay As You Go';
    }
		
}]);

routerApp.controller('passwordController', ['$rootScope', '$scope', '$window', '$state', function($rootScope, $scope, $window, $state) {
    if(!$rootScope.loading)
	return;

    $scope.change_password = function() {

    	mesibo_resetpassword(function(res, o, e) {
				if(res)
    					$scope.showAlert('Successful', "Password changed!", 'Ok');
				else	
    					$scope.showAlert('Failed', "Check your current password and try again!", 'Ok');

				$scope.appdata.oldpass = '';
				$scope.appdata.password = '';
			}, $scope.user.email, '', $scope.appdata.oldpass, $scope.appdata.password);
    };
    
}]);

routerApp.controller('contentNavController', ['$scope', function($scope) {
		$scope.shortname = $scope.user.name;
		if($scope.user.name.length > 18) {
			$scope.shortname = $scope.user.name.substring(0, 18) + '..';
		}

}]);

// routerApp.controller('conferencecallController', function($rootScope, $scope, $http, $location) {


// });
routerApp.controller('contactListController', ['$scope', '$window', function($scope, $window) {

    $scope.searchText = '';
    $scope.searchVisible = false;

    $scope.addContact = function() {
    	 var c=$scope.vm.createContact;
	 mesibo_addcontact(0, c.name, c.number, c.type);
    };
    
    $scope.toggleSearch = function() {
	if($scope.searchVisible) {
		$scope.searchText = '';
		$scope.searchVisible = false;
	} else {
		$scope.searchVisible = true;
	}
    };
    
    $scope.isSearchVisible = function() {
    	return $scope.searchVisible;
    }
    
    $scope.doRefresh = function() {
    	mesibo_reload();
    }

    /*
    $scope.contactfilter = function(c) {
    	alert(c.name);
	return true;
	//return c.name.substring(0,1).match(/A/gi) && $scope.otherCondition;
    }
    */

}]);

routerApp.controller('accountinformationController',['$rootScope','$scope','$state','$window','$location', function ($rootScope, $scope, $state, $window, $location) {
    		analytics('send', 'pageview', '#account');
		$scope.setpassword = function () {
		//  debugger;
		var oldpassword = $scope.oldpassword;
		var newpassword = $scope.newpassword;
		var confirmpassword = $scope.confirmpassword;
		if (newpassword != confirmpassword) {
		$scope.IsMatch = true;
		return false;
		} else {
		mesibo_setaccount(function(r, o, e) {
				if(r) {
					$scope.showAlert('Password Changed', 'Your password was changed successfully.', 'Ok');
				} else {
					$scope.showAlert('Password not changed', 'Please retype your current password and try again.', 'Ok');
				}
			},
			oldpassword,newpassword, '');
		}
		};
		$scope.IsMatch = false;
    
		$scope.appdata.inprogress = ' (checking bonus)';

    		$scope.update_bonus = function() {
			if($scope.user.bonus == undefined || $scope.user.bonus == '') {
				$scope.appdata.bonus = {};
				$scope.appdata.bonus['amount'] = 0;
				$scope.appdata.bonus['minamount'] = 0;
				$scope.appdata.bonus['expiry'] = '';
				return;
			}

			$scope.appdata.bonus = $scope.user.bonus[0];
    			$scope.appdata.inprogress = '(expiry: ' + $scope.appdata.bonus['expiry'] + ')';
    		};
    
    		$scope.update_bonus();
    		$scope.user.bonus = ''; //clear it else we will have old data even if bonus was expired as api will not send bonus field
    
		mesibo_getbonus(function(res, u, none) {
    			$scope.appdata.inprogress = '';
    			$scope.update_bonus();
			$scope.$apply();
	    	});



		}]);

routerApp.controller('subscriptionController', ['$scope', function($scope) {
		}]);

routerApp.controller('paymentHistoryController',['$rootScope','$scope','$window','$location', function ($rootScope, $scope, $window, $location) {
		$scope.appdata['purchasetype'] = "1";
			
		$scope.show_transactions = function(res, c, e) {
			console.log("show purchase history");
			console.log(c);
			if(null == c)
				return;
			
			if(c['pcount'] == 0) {
				$scope.appdata.purchases = new Array();
				$scope.$applyAsync();
				return;
			}

			$scope.appdata.purchases = c['payments'];
			$scope.$applyAsync();
		}
		
		mesibo_payments($scope.show_transactions);

		$scope.$on('$viewContentLoaded', function () {
			});

		$scope.onPurchaseType = function() {
			//mesibo_payments($scope.show_transactions, $scope.appdata.purchasetype);
		}
}]);

routerApp.controller('billingController',['$rootScope','$scope','$window','$location', function ($rootScope, $scope, $window, $location) {
			
		$scope.show_billing = function(res, c, e) {
			console.log("show billing history");
			console.log(c);
			if(null == c)
				return;
			
			if(c['ic'] == 0) {
				$scope.appdata.billing = new Array();
				$scope.$applyAsync();
				return;
			}

			$scope.appdata.billing = c['i'];
			$scope.$applyAsync();
		}
		
		mesibo_invoices($scope.show_billing);

		$scope.$on('$viewContentLoaded', function () {
			});
}]);

routerApp.controller('pricingController', ['$rootScope', '$scope', '$window', '$state', function($rootScope, $scope, $window, $state) {
    if(!$rootScope.loading)
	return;

}]);

routerApp.controller('paymentController', ['$rootScope', '$scope', '$window', '$state', function($rootScope, $scope, $window, $state) {
	analytics('send', 'pageview', '#payment');
    if(!$rootScope.loading)
	return;
	
	$scope.appdata.navclass = 'payment';
    $scope.payment = mesibo_paymentinfo();
  
    $scope.$on('$viewContentLoaded', function () {
        if ($('#testDiv').length > 0) {
            $('#testDiv').slimScroll({
                alwaysVisible: true,
                railVisible: true,
                railColor: '#fff',
                railOpacity: 1,
                height: '403px',
                railBorderRadius: 0
            });
        }

        //update_contacts();
    });


}]);

routerApp.controller('paymentleftController', ['$scope', function($scope) {
    $scope.payment = mesibo_paymentinfo();

}]);

routerApp.controller('creditcardController', ['$rootScope', '$scope', '$window', '$state', function($rootScope, $scope, $window, $state) {
    if(!$rootScope.loading)
	return;
    	
    analytics('send', 'pageview', '#creditcard');
    var p = mesibo_paymentinfo();
    var selindex = parseInt(p['ccsi']);
    $scope.payment = new Array();
    $scope.payment.amounts = p['cca'].slice();
    $scope.payment.amount = $scope.payment.amounts[selindex];
    $scope.payment.tax = p['tax'];
    $scope.payment.taxamount = 0;
    $scope.payment.totalamount = 0;
    $scope.payment.coupon = '';
    $scope.payment.couponinfo = ''; //You Will get 20% Extra Credit With this Coupon
    $scope.payment.ccnum = '';
    $scope.payment.name = '';
    $scope.payment.cvv = '';
    $scope.payment.phone = '';
    $scope.payment.month = 0;
    $scope.payment.year = 0;
    $scope.payment.agree1 = 0;
    $scope.payment.agree2 = 0;

    $scope.payment.ccnumerror = '';
    $scope.payment.dateerror = '';
    $scope.payment.nameerror = '';
    $scope.payment.cvverror = '';
    $scope.payment.phoneerror = '';


    //return true to disable, false to enable
    $scope.checkForm = function() {
    	if($scope.payment.ccnum.trim().length < 16) {
    		$scope.payment.ccnumerror = '';
		return true;
	}

	if(!mesibo_checkcc($scope.payment.ccnum.trim())) {
    		$scope.payment.ccnumerror = 'Invalid Credit Card';
		return true;
	}

    	$scope.payment.ccnumerror = '';
    	
	if($scope.payment.month == 0 || $scope.payment.year == 0) {
    		$scope.payment.dateerror = '';
		return true;
	}

	if(!mesibo_checkccdate($scope.payment.month, $scope.payment.year)) {
    		$scope.payment.dateerror = 'Invalid Expiry Date';
		return true;
	}

    	$scope.payment.dateerror = '';

	var nlen = $scope.payment.name.trim().length;
	var clen = $scope.payment.cvv.trim().length;
	var plen = $scope.payment.phone.trim().length;

	// don't set any error now - let them finish entering entire form
	if(0 == nlen || 0 == clen || 0 == plen || 0 == $scope.payment.agree1) {
		return true;
	}
	
	if($scope.payment.name.trim().length < 3) {
    		$scope.payment.nameerror = 'minimum 3 characters';
		return true;
	}
    	$scope.payment.nameerror = '';
	
	if($scope.payment.cvv.trim().length < 3) {
    		$scope.payment.cvverror = 'minimum 3 characters';
		return true;
	}
    		
	$scope.payment.cvverror = '';
	
	if($scope.payment.phone.trim().length < 7) {
    		$scope.payment.phoneerror = 'invalid';
		return true;
	}
    		
	$scope.payment.phoneerror = '';
	
	if($scope.payment.agree1 == 0)
		return true;
	
	return false;
    }
    
    $scope.amountchanged = function() {
    	$scope.payment.taxamount = toFixed(($scope.payment.amount*$scope.payment.tax)/100, 2);
	$scope.payment.totalamount = toFixed(parseFloat($scope.payment.amount) + parseFloat($scope.payment.taxamount), 2);
    }
    
    $scope.applycoupon = function() {
    	$scope.payment.couponinfo = 'Invalid Coupon Code'; //You Will get 20% Extra Credit With this Coupon
    }

    $scope.paycc = function() {
	var p = $scope.payment;

	//insetad of passing null, we can pass array too with additional parameters (like billing address)
	mesibo_payment_cc(null, p.name, p.ccnum, p.month, p.year, p.cvv, p.coupon, p.totalamount);
    }
    
    $scope.paystripe = function() {
	var p = $scope.payment;

	//insetad of passing null, we can pass array too with additional parameters (like billing address)
	mesibo_payment_stripe(p.totalamount);
    }

    $scope.amountchanged();
    
}]);

function toFixed(value, precision) {
    var precision = precision || 0,
    power = Math.pow(10, precision),
    absValue = Math.abs(Math.round(value * power)),
    result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

    if (precision > 0) {
       var fraction = String(absValue % power),
       padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
       result += '.' + padding + fraction;
    }
    return result;
}

routerApp.controller('paypalController', ['$scope', function($scope) {
    	analytics('send', 'pageview', '#paypal');
    $scope.payment = mesibo_paymentinfo();
    $scope.payment.amount = $scope.payment.ppamounts[0];
    $scope.payment.agree1 = 0;
    $scope.payment.agree2 = 0;
    $scope.payment.fee = 0;
    $scope.payment.total = $scope.payment.amount;

    if($scope.payment.paypalfee > 0) {
    	$scope.payment.fee = $scope.payment.amount*$scope.payment.paypalfee/100;
	$scope.payment.total = parseFloat($scope.payment.amount) + parseFloat($scope.payment.fee);
    	$scope.payment.fee = toFixed($scope.payment.fee, 2);
    	$scope.payment.total = toFixed($scope.payment.total, 2);
    }

    $scope.amountchanged = function() {
    	if($scope.payment.paypalfee > 0) {
    		$scope.payment.fee = $scope.payment.amount*$scope.payment.paypalfee/100;
	    	$scope.payment.total = parseFloat($scope.payment.amount) + parseFloat($scope.payment.fee);
    		$scope.payment.fee = toFixed($scope.payment.fee, 2);
    		$scope.payment.total = toFixed($scope.payment.total, 2);
	}
    }
    
    $scope.applycoupon = function() {
    	$scope.payment.couponinfo = 'Coupons only valid on Credit Card Payments';
    }
    
    $scope.paypp = function() {
	if($scope.payment.agree1 == 0 || $scope.payment.agree2 == 0) {
		$scope.showAlert("Missing Inputs", "You must agree to both the terms.", 'Ok');
		return;
	}

	var p = $scope.payment;
	mesibo_payment_paypal($scope.payment.total);
    }
    
    $scope.checkForm = function() {
	if($scope.payment.agree1 == 0 || $scope.payment.agree2 == 0)
		return true;

	return false;
    }
	
    }]);

routerApp.controller('netbankingController', ['$scope', function($scope) {
    	analytics('send', 'pageview', '#netbanking');
    $scope.payment = mesibo_paymentinfo();
    $scope.payment.amount = $scope.payment.amounts[1];
    $scope.payment.tax = $scope.payment.servicetax;
    $scope.payment.coupon = '';
    $scope.payment.couponinfo = ''; //You Will get 20% Extra Credit With this Coupon
    $scope.payment.bank = $scope.payment.banks[0];
    $scope.payment.agree1 = 0;
    
    $scope.applycoupon = function() {
    	$scope.payment.couponinfo = 'Invalid Coupon Code'; //You Will get 20% Extra Credit With this Coupon
    }

    $scope.paynb = function() {
	var p = $scope.payment;
	mesibo_payment_netbanking(p.bank.id, p.amount);
    }

    $scope.checkForm = function() {
	if($scope.payment.agree1 == 0)
		return true;

	return false;
    }

}]);

routerApp.controller('redeemvoucherController', ['$scope', function($scope) {
    	analytics('send', 'pageview', '#voucher');
    	$scope.payment.agree1 = 0;

	$scope.redeem = function() {
		$scope.showAlert('Invalid Voucher Code', 'Please check and try again later', 'Ok');
		}
    
	$scope.checkForm = function() {
		if($scope.payment.agree1 == 0)
			return true;

		return false;
    	}

}]);

function pad(val) {
            var valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
}


routerApp.directive('header', function () {
		return {
	restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
	replace: true,
	templateUrl: "views/header.html",
	controller: ['$scope', '$filter', function ($scope, $filter) {
		// Your behaviour goes here :)
	}]
	}
});

routerApp.directive('footerUp', function () {
		return {
restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
replace: true,
templateUrl: "views/footer_up.html",
controller: ['$scope', '$filter', function ($scope, $filter) {
// Your behaviour goes here :)
}]
}
});

routerApp.directive('footerDown', function () {
		return {
restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
replace: true,
templateUrl: "views/footer_down.html",
controller: ['$scope', '$filter', function ($scope, $filter) {
// Your behaviour goes here :)
}]
}
});

routerApp.directive('offerStrip', function () {
		return {
restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
replace: true,
templateUrl: "views/offer_strip.html",
controller: ['$scope', '$filter', function ($scope, $filter) {
// Your behaviour goes here :)
}]
}
});

routerApp.controller("progressCtrl", ['$scope', '$rootScope', '$window', '$state', '$location', 'ngProgressFactory', 'ngProgress', function($scope, $rootScope, $window, $state, $location, ngProgressFactory, ngProgress){
		$rootScope.progressbar = ngProgressFactory.createInstance();
		$rootScope.progressbar.setColor('#f00');

}]);	

routerApp.controller("loadingCtrl", ['$scope', '$rootScope', '$window', '$state', '$location', 'ngProgressFactory', 'ngProgress', function($scope, $rootScope, $window, $state, $location, ngProgressFactory, ngProgress){

		// see comments in ready section why we are loading from here
		console.log("mesibo init from loading");
		$rootScope.loading = 1;
		mesibo_init();

}]);	

routerApp.controller("mainCtrl", ['$scope', '$rootScope', '$window', '$state', '$location', '$http', 'toastr', function($scope, $rootScope, $window, $state, $location, $http, toastr){
		
		var absurl = $location.absUrl();
		if(!absurl.startsWith('http://127.0.0.1')) {
			mesibo_setapi("https://api.mesibo.com/api.php");
		}
		mesibo_setapi("https://api.mesibo.com/api.php");
		//mesibo_setapi("https://mesibo.com/develapi/api.php");

		
		$scope.appdata = {email: '', password:'', remember: false, appname:'', newphone:'', message: '', error: '', sentby:'', inprogress: '', navclass: 'call', newappid:'', newuseraddr: '', newuseractive: true, newuserpin: false, search: '', platform: '1', msgfrom:'', message: '', otp: ''};
		$scope.termsagree = false;
		$scope.gravatarurl = 'https://www.gravatar.com/avatar/00000000000000000000000000000000';
		$scope.oldpass = '';
		$scope.strings = strings;
		
		$scope.userprofile = {name: '', day:'', month:'', year:'', gender:'', email:'', city:'', state:'', country:''};
		$scope.appdata.offers = [];
		$scope.appdata.promos = [];
		$scope.appdata.offer = {};
		$scope.appdata.promo = {};
		
		$scope.support = {};
		$scope.support.tickets = [];
		$scope.support.topics = [];
		$scope.support.topic = 0;
		$scope.support.ticket = {};

		$scope.savetoast = function(){
        toastr.success('Changes Made Successfully!');
        };
		
		$scope.sendtoast = function(){
        toastr.success('Message Sent Successfully!');
        };
		
		$scope.failedtoast = function(){
        toastr.warning('Message Failed to Send!');
        };
		
		$scope.warningtoast = function(){
        toastr.warning('Something Went Wrong! Try Again.');
        };
		$scope.addrec = function(){
        toastr.success('Record added Successfully');
        };
		
		$scope.promocall = {title: 'Get Your Free International Call',
				    text: "We understand that you would like to try our services before you buy, so we offer you the first international call up to 2 minutes for free. To prevent misuse of this offer, the free call is limited to certain countries and offered only once per phone number.",
				    buttontext: '',
				    url: '' };

		var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    		// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
		var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		    // At least Safari 3+: "[object HTMLElementConstructor]"
		var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
		var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6

		$scope.appdata.browser = 'unknown';
		if(isChrome)
			$scope.appdata.browser = 'chrome';
		else if(isFirefox)
			$scope.appdata.browser = 'firefox';
		else if(isOpera)
			$scope.appdata.browser = 'opera';
		else if(isSafari)
			$scope.appdata.browser = 'safari';
		else if(isIE)
			$scope.appdata.browser = 'ie';

		//not required
		$rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
				$rootScope.from_state = from;
		});

		$rootScope.init_state = '';
		angular.element(document).ready(function() {
			console.log($state);
			console.log($location);

			/* We have a tricky situation here, due to bad ui-router implementation, current state 
			 * is not visible in ready function (only available after some time). 
			 * Hence, We are not able to get current state name here unless timeout used - some bug
			 * https://github.com/angular-ui/ui-router/issues/1627
			 *
			 * Because of this dashboard is loaded without user object and other initialization. Hence, we 
			 * are using this convoluted logic. After a delay, we get current name which we save and the 
			 * we are going to 'loading' state which does not have any state information. From there 
			 * we are calling mesibo_init which will call either login or dashboard functions. 
			 * If it calls dashboard function, we check if we have to go to some other state and then 
			 * we go there 
			 *
			 * We are also checking $rootScope.loading so that dashboard controller (or any other controller)
			 * can abort loading in intial state
			 * */
			$rootScope.loading = 0;
			
		       setTimeout( () => { 
			       $rootScope.init_state = $state.current.name;
				console.log("going to loading: init state - " + $state.current.name);
				$state.go('loading');

		       		//mesibo_init();
			}, 10);
		});


		$scope.is_loggedin = function() {
			//console.log("loggedin: " + (mesibo_isloggedin()?'yes':'no'));
			return mesibo_isloggedin();
		}
		
		$scope.goto_support = function() {
			if(mesibo_isloggedin()) {
				$state.go('support');
				return;
			}

			$scope.showAlert("Mesibo Support", "Please login to contact our support team.\n\nIf you are unable to login, please send an email to support@tringme.com. Please note that for any issues other than the login problem, you must login and file a support ticket.");
		}
    
		$scope.fromtimer = null;
		$scope.fromusers = [];

		// gives another movie array on change
		$scope.fetch_fromusers = function(typed){
				if(typed.length < 3)
					return;
				
	 			mesibo_usersget(function(res, o, none) {
					if(res) {
						$scope.fromusers = new Array();
						var u = o['users'];
						for(var i=0; i< u.length; i++) {
							// if undefined, then we are in group section
							if(undefined == $scope.user.user.address || u[i].address != $scope.user.user.address)
								$scope.fromusers.push(u[i].address);
						}

					}

				}, $scope.user.app.token, typed + '*');
		}
		
		$scope.update_fromusers = function(typed){
			if($scope.fromtimer != null)
				window.clearTimeout($scope.fromtimer);

			$scope.fromtimer = window.setTimeout(function() {
					$scope.fromtimer = null;
					$scope.fetch_fromusers(typed);
					}, 1000);

		}

		$window.show_connection_progress = function(show) {
			if(typeof $rootScope.progressbar != 'object') {
				return;
			}

			if(show)
				$rootScope.progressbar.start();
			else
				$rootScope.progressbar.complete();
		}
		
		$window.show_connection_error = function(type, message) {
			$scope.showAlert("Connection Failed", message);
		}

    		$window.show_login_page = function(email, error) {
			$rootScope.init_state = '';
			//alert('show login: ' + email + ',' + error);
			var query = $location.search();
			var name = objValue(query, 'name', '');
			if(email == '' || email == undefined)
				email = objValue(query, 'email', '');

			//console.log("show login: " + message + ' q:' + query);
			//console.log(query);
			if(email != '' && name != '') {
				//mesibo_signup(name, email, '', '', '', '');
				$state.go('register');
				return;
			}

			if(email != 'undefined') {
				$scope.appdata.email = email;
			}

			$scope.appdata.password = '';
			$scope.appdata.error = error;
			$scope.$applyAsync();
			$state.go('login');
	    	}
		
		/*
		$scope.showAlertMD = function(title, content, oktitle) {
    			// Appending dialog to document.body to cover sidenav in docs app
		   	var confirm = $mdDialog.alert()
			.clickOutsideToClose(true)
        	  	.content(content)
	          	.title(title)
			.ok(oktitle)

			$mdDialog.show(confirm);
  		};
		*/
		
		$scope.showAlert = function(title, content, oktitle) {
    			// Appending dialog to document.body to cover sidenav in docs app
			//
			/*
			BootstrapDialog.show({
				title: title,
				message: content
			});
			*/

			if(oktitle == null || oktitle == '')
				oktitle = 'Ok';

			$scope.showPrompt(null, title, content, oktitle, null);
  		};

		/*
		$scope.showPromptMD = function(parentobj, title, content, oktitle, callback) {
    			// Appending dialog to document.body to cover sidenav in docs app
		   	var confirm = $mdDialog.confirm()
        	  	.content(content)
	          	.title(title)
          	  	//.targetEvent(ev)
          	  	.ok(oktitle)
          	  	.cancel('Cancel');

			if(parentobj) {
				confirm.parent = parentobj;
			}

			$mdDialog.show(confirm).then(callback, function() {
					//canceled
    			});
  		};
		*/
		
		$scope.showPrompt = function(parentobj, title, content, oktitle, callback, canceltitle) {
			if(oktitle.length < 6)
				oktitle = '&nbsp;' + oktitle + '&nbsp;';

			var buttons = [
					{
					label: 'Cancel',
					action: function(dialoginstance) {
						dialoginstance.close();
					}
					},
					{
					label: oktitle,
					action: function(dialoginstance) {
						dialoginstance.close();
						if(null != callback)
							callback();
						}
					}
				];

			if(typeof canceltitle == 'undefined' || canceltitle == undefined || canceltitle == null || canceltitle == '') {
				buttons.splice(0, 1);
			} else {
				buttons[0].label = canceltitle;
			}

			BootstrapDialog.show({
				title: title,
				message: content,
				cssClass: 'appjs-dialog',
				buttons: buttons
			});
		}

		// since we can not use bitwise operator in angular directives
		$scope.checkFlag = function(value, flag){
			   return value & flag;
		}
		
		$scope.validemail = function() {
			return mesibo_isvalidemail($scope.appdata.email);
		}

		$scope.validurl = function() {
			return mesibo_isvalidurl($scope.user.app.url);
		}
		
		$scope.inetntoa = function(ip) {
			if(0 == ip)
				return 'never logged-in';

			return mesibo_inet_ntoa(ip);
		}
		
		$scope.connection_info = function(ip, online) {
			var info = $scope.inetntoa(ip);
			if(ip > 0 && online == "1") {
				info += ' - online';
			}
			return info;
		}
		
		$scope.connection_status = function(ip, online) {
			if(ip > 0 && online == "1") {
				return 'online';
			}
			return 'offline';
		}

		$scope.logout = function() {
			$rootScope.init_state = '';
    			analytics('send', 'pageview', '#logout');
			mesibo_logout();
			//$state.go('login'); // will be called from show_login
		}

		$scope.update_promos_offers = function() {
		}

		$scope.dashboard = function() {
			$state.go('dashboard');
		}

		$window.show_dashboard= function(u) {
			console.log("show dashboard");
			/*
			$scope.$apply(function(){
				//$scope.user = u;
				//$scope.dashboard();
				});*/
			console.log(u);
			$scope.user = u;
			$scope.dashboard();
		}

		$scope.getHash = function(name) {
			var hash = 0;
			if (name.length == 0) return hash;
			for (i = 0; i < name.length; i++) {
				var c = name.charCodeAt(i);
				hash = ((hash<<5)-hash)+c;
				hash = hash & hash; // Convert to 32bit integer
			}
		       return hash;
		}

		$window.update_offers= function() {
		}

		$window.update_promos = function () {
		}
		
		$window.show_error = function (op, error) {
			$scope.showAlert('Failed', 'Something went wrong, try again later', 'Ok');
		}

		$window.show_verify_phone_page=function(message) {
			$rootScope.init_state = '';
			$state.go('verifyphone');
		};

		$window.show_verify_code_page=function(sentby) {
			$rootScope.init_state = '';
			$scope.appdata.sentby = sentby;
			$state.go('verifycode');
		};

		$window.show_verify_code_popup=function(sentby) {
			$state.go('setting.changephonecode');
		}
    		
		$scope.confirmRedeemBonus = function() {
			var title = 'Redeem Bonus Credits';
			var text = 'Awesome, continue on purchase page to redeem your bonus credits before it expires.';
			$scope.showPrompt(null, title, text, 'Continue', function() {
				$state.go('payment');
			});
   		};
		
		$window.registration_successful=function(type) {
			if(type == 1)
    				analytics('send', 'pageview', '#registered');
			else
    				analytics('send', 'pageview', '#regsuccessful');
		};
		
		$window.update_userinfo= function(u) {
			console.log("update userinfo");
			$scope.user = u;
			$scope.$applyAsync(function(){
					$scope.user = u;
					});
		}

		$window.send_http_request = function(url, postdata, callback, cbdata) {
			var config = {};
			$http.get(url + '?' + postdata)
				.then(function successCallback(response) {
					callback(cbdata, response.data);
  				}, function errorCallback(response) {
					callback(cbdata, null);
  				});
			return true;
		}
		
		$window.send_http_upload = function(url, op, token, formid) {
			var form = document.getElementById(formid);
			if(!form) {
				alert('form error: ' + formid);
				return;
			}
			var fd = new FormData(form);
			fd.append('token', token);
			fd.append('op', op);
			$http.post(url, fd, {
			           transformRequest: angular.identity,
			           headers: {'Content-Type': undefined}
				        })
					        .success(function(){
								        })
						        .error(function(){
									        });

			return true;
		}
	
		/*
		$window.show_call_records = function(u) {
			console.log("show call history");
			$scope.history = '';
			//debugger;
			$scope.$apply(function(){
					for(var i in u) {
					u[i].dur = Math.round(u[i].dur/60)+':'+Math.round(u[i].dur%60);	
					u[i].charge='$'+myToFixed(u[i].charge,2);	
					}
					$scope.history = u;
					//$scope.cont = u;
					});
		}
		*/
		return this;
}]);

angular.module('contactFilter',[])
.filter('contactfilter', function() {
		return function(inputs, search) {
			if (!inputs) return inputs;
			if (!search || search.trim().length == 0) return inputs;
			var query = ('' + search).toLowerCase();
			var result = [];
			angular.forEach(inputs, function(input) {
				if(input) {
					var name = ('' + input.name).toLowerCase();
					if (name.indexOf(query) !== -1 || ('' + input.defnum).indexOf(query) !== -1) {
						result.push(input);
					} else {
						var c = input.c;
						for(var i=0; i< c.length; i++) {
							if(('' + c[i].phone).indexOf(query) !== -1) {
								result.push(input);
								break;
							}
						}

					}
				}
			});
			return result;
			}
		});

function objValue(o, key, defvalue) {
	if(o[key] == 'undefined' || typeof o[key] == 'undefined')
		return defvalue;

	return o[key];
}

function alertObject(p) {
	var shown = false;
	for (var key in p) {
	  if (p.hasOwnProperty(key)) {
		alert(key + " -> " + p[key]);
		shown = true;
	  }
	}
	if(!shown)
		alert('empty object');
}

function Linkify(inputText) {
    //URLs starting with http://, https://, or ftp://
    var replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    var replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with www. (without // before it, or it'd re-link the ones done above)
    var replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    var replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links
    var replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    var replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText
}

routerApp.controller("ChartCtrl", function ($scope) {
	//daily labels
  $scope.dailylabels = ["01-Jul-17", "02-Jul-17", "03-Jul-17", "04-Jul-17", "05-Jul-17", "06-Jul-17", "07-Jul-17","08-Jul-17","09-Jul-17","10-Jul-17","11-Jul-17","12-Jul-17", "13-Jul-17", "14-Jul-17", "15-Jul-17", "16-Jul-17", "17-Jul-17", "18-Jul-17","19-Jul-17","20-Jul-17","21-Jul-17","22-Jul-17","23-Jul-17","24-Jul-17","25-Jul-17","26-Jul-17","27-Jul-17","28-Jul-17","29-Jul-17","30-Jul-17","31-Jul-17"];
  //for daily users
  $scope.dailyuserseries = ['USERS'];
  $scope.dailyuserdata = [
    [65, 59, 80, 81, 56, 55, 40,54,45,56,100,84, 59, 80, 81, 56, 55, 40,54,45,56,100,84, 59, 80, 81, 56, 55, 40,54,45]   
  ];
  //for daily connection
   $scope.dailyconnectionseries = ['CONNECTION'];
  $scope.dailyconnectiondata = [
   [165, 159, 180,181, 156, 155, 140,154,415,156,100,184, 159, 180, 181, 156, 155, 140,154,145,156,100,814, 159, 180, 181, 156, 155, 140,154,415]  
  ];
  
   //for daily message
  $scope.dailymessageseries = ['MESSAGE'];
   $scope.dailymessagedata = [
    [11165, 11159, 11180, 11181, 11156, 11155, 11140,11154,11415,11156,11100,11184,11165, 11159, 11180, 11181, 11156, 11155, 11140,11154,11415,11156,11100,11184, 11159, 11180, 11181, 11156, 11155, 11140,11215]   
  ];
  
  //monthly labels
  $scope.monthlylabels = ["Jan-17", "Feb-17", "Mar-17", "Apr-17", "May-17", "Jun-17", "Jul-17","Aug-17","Sep-17","Oct-17","Nov-17","Dec-17"];
  //for monthly users
  $scope.monthlyuserseries = ['USERS'];
  $scope.monthlyuserdata = [
    [65, 59, 80, 81, 56, 55, 40,54,45,56,100,84]   
  ];
  //for monthly connection
   $scope.monthlyconnectionseries = ['CONNECTION'];
  $scope.monthlyconnectiondata = [
   [165, 159, 180,181, 156, 155, 140,154,415,156,100,184]  
  ];
  
   //for monthly message
  $scope.monthlymessageseries = ['MESSAGE'];
   $scope.monthlymessagedata = [
    [11165, 11159, 11180, 11181, 11156, 11155, 11140,11154,11415,11156,11100,11184]   
  ];
  
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
  };
  
  /*  $scope.labels = ["January", "February", "March", "April", "May", "June", "July","August","September","October","November","December"];
 
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
  }; */
});
              
