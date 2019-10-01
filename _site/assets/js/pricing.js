//rates
var r_mau = 0.01;
var r_bw = 0.9;
var r_db = 2.5;
var b_minpay = 0;

//quota
var q_mau = 1000;
var q_db = 1000000000;
var q_bw = 5000000000;

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

function calculate_rate() {
	var mau = document.getElementById("c_mau").value;
	var msg = document.getElementById("c_msg").value;
	var msgsize = document.getElementById("c_msgsize").value;
	var onp = 0;
	var onps = document.getElementsByName("c_onp");

	for(var i = 0; i < onps.length; i++) {
		if(onps[i].checked) {
			onp = onps[i].value;
			break;
		}
	}



	if(mau == '' || msg == '' || msgsize == '') {
		alert("Enter all values to get an estimate");
		return false;
	}
	var amount = 0;

	if(mau > q_mau) {
		amount += parseFloat((mau-q_mau)*r_mau);
	}

	if('1' != onp) {
		var bw = msg*msgsize;
		if(bw > q_bw) {
			amount += parseFloat(((bw-q_bw)/1000000000)*r_bw);
		}
	}

	amount = toFixed(amount, 2);

	document.getElementById("c_val").innerHTML =  amount;
}
