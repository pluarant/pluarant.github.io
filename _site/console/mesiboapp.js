//IGNORECOMBINE - DO NOT REMOVE THIS LINE, used by combine script to ignore content
// app.js
var routerApp = angular.module('routerApp', ['ui.router', 'ui.bootstrap', 'bitsFlag', 'bitsComplementFlag', 'ngProgress', 'chart.js','toastr', 'autocomplete']);

routerApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/dashboard');
    //$urlRouterProvider.otherwise(function($injector, $location){
    //});

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            views: {
                //'': {templateUrl: 'views/loading.html', controller: 'loading'}
                'fullview': {templateUrl: 'views/viewload.html'},
			'contentview@dashboard': {templateUrl: 'views/dashboard.html', controller: 'dashboardController'},
			'leftnavview@dashboard': {templateUrl: 'views/left-nav.html'},
			'headerview@dashboard': {templateUrl: 'views/header.html'}
				
            }
            // templateUrl: 'home.html'
        })
	

	.state('account', {
		url: '/account',
		views: {
		//'': {templateUrl: 'views/loading.html', controller: 'loading'}
			'fullview': {templateUrl: 'views/viewload.html'},
			'contentview@account': {templateUrl: 'views/account.html'},
			'leftnavview@account': {templateUrl: 'views/left-nav.html'},
			'headerview@account': {templateUrl: 'views/header.html'}
		}
	})
		
	.state('account.paymenthistory', {
            url: '/paymenthistory',
            views: {
                'contentview@account': {
		templateUrl: 'views/payment-history.html' , controller: 'paymentHistoryController'
                }
            }
        })
		
	.state('account.billingrecords', {
            url: '/billingrecords',
            views: {
                'contentview@account': {
                    templateUrl: 'views/billing-records.html' , controller: 'billingController'
                }
            }
        })
		
	.state('account.currentcharges', {
            url: '/currentcharges',
            views: {
                'contentview@account': {
                    templateUrl: 'views/current-charges.html'
                }
            }
        })
		
	.state('account.changepassword', {
            url: '/changepassword',
            views: {
                'contentview@account': {
                    templateUrl: 'views/password-change.html', controller: 'passwordController'
                }
            }
        })
				
	.state('application', {
            url: '/application',
            views: {
                //'': {templateUrl: 'views/loading.html', controller: 'loading'}
                'fullview': {templateUrl: 'views/viewload.html'},
			'contentview@application': {templateUrl: 'views/application.html'},
			'leftnavview@application': {templateUrl: 'views/left-nav.html'},
			'headerview@application': {templateUrl: 'views/header.html'}
				
            }
            // templateUrl: 'home.html'
        })
		
	.state('loading', {
            url: '/loading',
            views: {
                'fullview': {templateUrl: 'views/loading.html', controller: 'loadingCtrl'}
            }
        })
		
	.state('pricing', {
            url: '/pricing',
            views: {
                //'': {templateUrl: 'views/loading.html', controller: 'loading'}
                'fullview': {templateUrl: 'views/viewload.html'},
			'contentview@pricing': {templateUrl: 'views/pricing.html', controller: 'pricingController'},
			'leftnavview@pricing': {templateUrl: 'views/left-nav.html'},
			'headerview@pricing': {templateUrl: 'views/header.html'}
				
            }
            // templateUrl: 'home.html'
        })
		
	.state('payment', {
            url: '/payment',
            views: {
                //'': {templateUrl: 'views/loading.html', controller: 'loading'}
                'fullview': {templateUrl: 'views/viewload.html'},
			'contentview@payment': {templateUrl: 'views/payment.html', controller: 'creditcardController'},
			'leftnavview@payment': {templateUrl: 'views/left-nav.html'},
			'headerview@payment': {templateUrl: 'views/header.html'}
				
            }
            // templateUrl: 'home.html'
        })
		
	.state('pricing.payment', {
            url: '/payment',
            views: {
                'contentview@pricing': {
		templateUrl: 'views/payment.html', controller: 'creditcardController'
                }
            }
        })
						
	.state('pricing.payment.paymentsuccess', {
            url: '/paymentsuccess-notinuse',
            views: {
                'contentview@pricing': {
                    templateUrl: 'views/payment-success.html'
                }
            }
        })
		
		.state('pricing.payment.paymentfailed', {
            url: '/paymentfailed',
            views: {
                'contentview@pricing': {
                    templateUrl: 'views/payment-failed.html'
                }
            }
        })

        .state('ps', {
            url: '/ps',
            views: {
                //'': {templateUrl: 'views/loading.html', controller: 'loading'}
                'fullview': {templateUrl: 'views/viewload.html'},
			'contentview@ps': {templateUrl: 'views/payment-success.html'},
			'leftnavview@ps': {templateUrl: 'views/left-nav.html'},
			'headerview@ps': {templateUrl: 'views/header.html'}
				
            }
        })
        .state('pf', {
            url: '/pf',
            views: {
                //'': {templateUrl: 'views/loading.html', controller: 'loading'}
                'fullview': {templateUrl: 'views/viewload.html'},
			'contentview@pf': {templateUrl: 'views/payment-failed.html'},
			'leftnavview@pf': {templateUrl: 'views/left-nav.html'},
			'headerview@pf': {templateUrl: 'views/header.html'}
				
            }
        })
				
	.state('analytics', {
            url: '/analytics',
            views: {
                //'': {templateUrl: 'views/loading.html', controller: 'loading'}
                'fullview': {templateUrl: 'views/viewload.html'},
			'contentview@analytics': {templateUrl: 'views/analytics.html'},
			'leftnavview@analytics': {templateUrl: 'views/left-nav.html'},
			'headerview@analytics': {templateUrl: 'views/header.html'}
				
            }
            // templateUrl: 'home.html'
        })
	
	.state('support', {
            url: '/support',
            views: {
                //'': {templateUrl: 'views/loading.html', controller: 'loading'}
                'fullview': {templateUrl: 'views/viewload.html'},
			'contentview@support': {templateUrl: 'views/support.html'},
			'leftnavview@support': {templateUrl: 'views/left-nav.html'},
			'headerview@support': {templateUrl: 'views/header.html'}
				
            }
            // templateUrl: 'home.html'
        })
				
		
	.state('support.supportthanks', {
            url: '/supportthanks',
            views: {
                //'': {templateUrl: 'views/loading.html', controller: 'loading'}
                'contentview@support': {templateUrl: 'views/support-thanks.html'}
            }
            // templateUrl: 'home.html'
        })
		
		
	.state('appsettings', {
            url: '/appsettings/{name}',
            views: {
                //'': {templateUrl: 'views/loading.html', controller: 'loading'}
                'fullview': {templateUrl: 'views/viewload.html' },
			'contentview@appsettings': {templateUrl: 'views/app-settings.html', controller: 'appcontroller'},
			'leftnavview@appsettings': {templateUrl: 'views/left-nav.html'},
			'headerview@appsettings': {templateUrl: 'views/header.html'},
			'tabcontent@appsettings': {templateUrl: 'views/general.html'}
				
            }
            // templateUrl: 'home.html'
        })
		
		
	.state('appsettings.general', {
            url: '/general',
            views: {
                'tabcontent@appsettings': {
                    templateUrl: 'views/general.html',
                }
            }
        })
						
	.state('appsettings.webhook', {
            url: '/webhook',
            views: {
                'tabcontent@appsettings': {
                    templateUrl: 'views/webhook.html',
                }
            }
        })
		
	.state('appsettings.pushnotifications', {
            url: '/pushnotifications',
            views: {
                'tabcontent@appsettings': {
                    templateUrl: 'views/push-notifications.html',
                }
            }
        })
	.state('appsettings.onpremise', {
            url: '/onpremise',
            views: {
                'tabcontent@appsettings': {
                    templateUrl: 'views/on-premise.html',
                }
            }
        })
		
	.state('appsettings.users', {
            url: '/users',
            views: {
                'tabcontent@appsettings': {
                    templateUrl: 'views/users.html',
                }
            }
        })
		
	.state('edituser', {
            url: '/edituser/{uid}',
            views: {
                //'': {templateUrl: 'views/loading.html', controller: 'loading'}
                'fullview': {templateUrl: 'views/viewload.html'},
				'contentview@edituser': {templateUrl: 'views/edit-user.html'},
				'leftnavview@edituser': {templateUrl: 'views/left-nav.html'},
				'headerview@edituser': {templateUrl: 'views/header.html'}
				
            }
            // templateUrl: 'home.html'
        })
				
		
	.state('appsettings.groups', {
            url: '/groups',
            views: {
                'tabcontent@appsettings': {
                    templateUrl: 'views/groups.html',
                }
            }
        })
		
	.state('editgroup', {
            url: '/editgroup/{gid}',
            views: {
                //'': {templateUrl: 'views/loading.html', controller: 'loading'}
                'fullview': {templateUrl: 'views/viewload.html'},
				'contentview@editgroup': {templateUrl: 'views/edit-group.html'},
				'leftnavview@editgroup': {templateUrl: 'views/left-nav.html'},
				'headerview@editgroup': {templateUrl: 'views/header.html'}
				
            }
            // templateUrl: 'home.html'
        })
		
	.state('appsettings.sendmessage', {
            url: '/sendmessage',
            views: {
                'tabcontent@appsettings': {
                    templateUrl: 'views/send-message.html',
                }
            }
        })
		
	.state('appsettings.stats', {
            url: '/stats',
            views: {
                'tabcontent@appsettings': {
                    templateUrl: 'views/stats.html',
                }
            }
        })
		
        .state('login', {
            url: '/login',
            views: {
                'fullview': {templateUrl: 'views/login.html', controller: 'loginController'}
            }
            // templateUrl: 'login.html'
        })
		
	.state('register', {
				url: '/register',
				views: {
					'fullview': {templateUrl: 'views/register.html'}
				}
				// templateUrl: 'register.html'
			})
		
        .state('emailsent', {
				url: '/emailsent',
				views: {
					'fullview': {templateUrl: 'views/emailsent.html'}
				}
				// templateUrl: 'register.html'
			})		
			
	.state('forgetpassword', {
            url: '/forgetpassword',
            views: {
                'fullview': {templateUrl: 'views/forget-password.html'}
				
            }
            // templateUrl: 'forget.html'
        })
		
	.state('resetpassword', {
            url: '/resetpassword',
            views: {
                'fullview': {templateUrl: 'views/reset-password.html'}
				
            }
            // templateUrl: 'forget.html'
        })
		
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            views: {
                'contentview': {templateUrl: 'views/main.html'}
            }
            // templateUrl: 'home.html'
        })
		
	.state('test', {
            url: '/test',
            views: {
                //'': {templateUrl: 'views/loading.html', controller: 'loading'}
                'fullview': {templateUrl: 'views/viewload.html'},
				'contentview@test': {templateUrl: 'views/test.html'},
				'leftnavview@test': {templateUrl: 'views/left-nav.html'},
				'headerview@test': {templateUrl: 'views/header.html'}
				
            }
            // templateUrl: 'home.html'
        })
		


}]);


